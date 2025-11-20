import { ScanResult } from './types';
import { createScan, updateScan, getScan, addXP, checkAndUnlockAchievements, addActivity, createNotification, getNotificationSettings } from './db';
import { scanPorts } from './scanners/port-scanner';
import { detectTechnologies } from './scanners/tech-detector';
import { scanXSS } from './scanners/xss-scanner';
import { scanSQLi } from './scanners/sqli-scanner';

/**
 * Orchestre l'exécution complète d'un scan
 */
export async function executeScan(scanId: string, target: string, userId: string = 'default_user'): Promise<void> {
  try {
    // Initialiser le scan
    createScan(scanId, target, userId);
    updateScan(scanId, {
      status: 'running',
      currentStep: 'Initialisation...',
      progress: 0,
    });

    const results: ScanResult['results'] = {
      ports: [],
      technologies: [],
      vulnerabilities: [],
    };

    // Étape 1: Port Scanning (25%)
    updateScan(scanId, {
      currentStep: 'Scanning ports...',
      progress: 10,
    });

    results.ports = await scanPorts(target);
    updateScan(scanId, {
      results,
      progress: 25,
    });

    // Étape 2: Technology Detection (50%)
    updateScan(scanId, {
      currentStep: 'Detecting technologies...',
      progress: 30,
    });

    results.technologies = await detectTechnologies(target);
    updateScan(scanId, {
      results,
      progress: 50,
    });

    // Étape 3: XSS Scanning (75%)
    updateScan(scanId, {
      currentStep: 'Testing for XSS vulnerabilities...',
      progress: 55,
    });

    const xssVulns = await scanXSS(target);
    results.vulnerabilities = [...(results.vulnerabilities || []), ...xssVulns];
    updateScan(scanId, {
      results,
      progress: 75,
    });

    // Étape 4: SQL Injection Scanning (100%)
    updateScan(scanId, {
      currentStep: 'Testing for SQL injection...',
      progress: 80,
    });

    const sqliVulns = await scanSQLi(target);
    results.vulnerabilities = [...(results.vulnerabilities || []), ...sqliVulns];

    // Finaliser le scan
    updateScan(scanId, {
      status: 'completed',
      currentStep: 'Scan completed',
      progress: 100,
      results,
      completedAt: new Date(),
    });

    // Award XP for completing scan
    const vulnCount = results.vulnerabilities?.length || 0;
    const baseXP = 50; // XP for completing scan
    const vulnXP = vulnCount * 5; // 5 XP per vulnerability found
    const totalXP = baseXP + vulnXP;
    addXP(userId, totalXP);

    // Add activity feed entry
    addActivity(
      userId,
      'scan_completed',
      'Scan Completed',
      `Scan of ${target} completed successfully`,
      {
        scan_id: scanId,
        vulnerabilities_found: vulnCount,
        xp_earned: totalXP
      }
    );

    // Check notification settings and send notification if enabled
    const settings = getNotificationSettings(userId) as any;
    if (settings?.scan_complete) {
      const criticalVulns = results.vulnerabilities?.filter((v: any) => v.severity === 'critical').length || 0;
      const highVulns = results.vulnerabilities?.filter((v: any) => v.severity === 'high').length || 0;

      createNotification(
        userId,
        'scan_complete',
        'Scan Completed',
        vulnCount > 0
          ? `Found ${vulnCount} vulnerabilities (${criticalVulns} critical, ${highVulns} high)`
          : 'No vulnerabilities found - site is secure!',
        `/scan/${scanId}`
      );

      // Send critical vulnerability notification if any
      if (criticalVulns > 0 && settings?.vuln_found) {
        createNotification(
          userId,
          'vulnerability_critical',
          '⚠️ Critical Vulnerabilities Detected',
          `${criticalVulns} critical vulnerabilities found in ${target}`,
          `/scan/${scanId}`
        );
      }
    }

    // Check for new achievements
    const newAchievements = checkAndUnlockAchievements(userId);
    if (newAchievements.length > 0 && settings?.achievement) {
      newAchievements.forEach(achId => {
        createNotification(
          userId,
          'achievement_unlocked',
          '🏆 Achievement Unlocked!',
          `You've unlocked a new achievement: ${achId}`,
          '/profile'
        );
      });
    }

  } catch (error) {
    console.error('Scan error:', error);
    updateScan(scanId, {
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      completedAt: new Date(),
    });

    // Add failed scan activity
    addActivity(
      userId,
      'scan_failed',
      'Scan Failed',
      `Scan of ${target} failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      {
        scan_id: scanId,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    );
  }
}

/**
 * Récupère le statut d'un scan
 */
export function getScanStatus(scanId: string): ScanResult | null {
  return getScan(scanId);
}

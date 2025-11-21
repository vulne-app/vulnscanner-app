// src/scanners/hiddenFiles.ts
import axios from 'axios';
import { HiddenFileVulnerability } from '../types';

// Common sensitive files and directories
const SENSITIVE_PATHS = [
  // Configuration files
  '.env',
  '.git/config',
  '.htaccess',
  '.htpasswd',
  'web.config',
  'config.xml',
  
  // Backup files
  'backup.zip',
  'database.sql',
  'dump.sql',
  'backup.sql',
  
  // IDE files
  '.idea/workspace.xml',
  '.vscode/settings.json',
  
  // Log files
  'logs/error.log',
  'storage/logs/laravel.log',
  
  // Version control
  '.git/HEAD',
  '.svn/entries',
  
  // Admin interfaces
  'admin/',
  'wp-admin/',
  'administrator/',
  'phpmyadmin/',
  
  // Sensitive directories
  '.git/',
  '.svn/',
  '.aws/',
  'backups/',
  'sql/',
  'database/',
];

/**
 * Scans for exposed sensitive files and directories
 */
export async function scanHiddenFiles(target: string): Promise<HiddenFileVulnerability[]> {
  const vulnerabilities: HiddenFileVulnerability[] = [];
  
  try {
    const baseUrl = target.endsWith('/') ? target.slice(0, -1) : target;
    
    for (const path of SENSITIVE_PATHS) {
      const testUrl = `${baseUrl}/${path}`;
      
      try {
        const response = await axios.get(testUrl, {
          timeout: 5000,
          headers: { 'User-Agent': 'VulnScanner/1.0' },
          validateStatus: (status) => status < 500, // Don't treat server errors as vulnerabilities
        });

        // Check if file is accessible and contains content
        if (response.status === 200 && response.data && response.data.length > 0) {
          const severity = getSeverityForPath(path);
          const fileType = getFileType(path);
          
          vulnerabilities.push({
            type: 'information_disclosure',
            severity,
            status: response.status,
            title: `Exposed ${fileType} Found`,
            description: `Sensitive ${fileType} is publicly accessible: ${path}`,
            path: testUrl,
            evidence: `HTTP ${response.status} - File accessible`,
            recommendation: `Restrict access to ${fileType} files using web server configuration or remove them from production environments.`,
          });
        }
      } catch (error) {
        // Ignore connection timeouts and other errors
        continue;
      }
    }
    
  } catch (error) {
    console.error('Error scanning for hidden files:', error);
  }
  
  return vulnerabilities;
}

/**
 * Determines severity based on file type
 */
function getSeverityForPath(path: string): 'low' | 'medium' | 'high' | 'critical' {
  const criticalFiles = ['.env', '.htpasswd', 'database.sql', 'backup.sql'];
  const highFiles = ['.git/config', '.htaccess', 'web.config'];
  const mediumFiles = ['.git/HEAD', 'logs/', 'admin/'];
  
  if (criticalFiles.some(file => path.includes(file))) return 'critical';
  if (highFiles.some(file => path.includes(file))) return 'high';
  if (mediumFiles.some(file => path.includes(file))) return 'medium';
  return 'low';
}

/**
 * Categorizes the file type for better reporting
 */
function getFileType(path: string): string {
  if (path.includes('.env')) return 'Environment Configuration';
  if (path.includes('.git')) return 'Git Repository';
  if (path.includes('.ht')) return 'Apache Configuration';
  if (path.includes('backup') || path.includes('.sql')) return 'Database Backup';
  if (path.includes('log')) return 'Log File';
  if (path.includes('admin')) return 'Administrative Interface';
  if (path.includes('config')) return 'Configuration File';
  return 'Sensitive File';
}
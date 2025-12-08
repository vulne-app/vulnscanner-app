// pages/api/scan/webhook.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { generatePDFReportPdfBuffer } from '../../lib/generateReport'
import { sendReportEmail } from '../../lib/sendEmail';
import { ScanWebhookPayload } from '../../lib/types';
import { ScanResult } from '../../lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const payload = req.body as ScanWebhookPayload;

    if (!payload || !payload.scanId) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    // Only act when completed
    if (payload.status !== 'completed') {
      return res.status(200).json({ ok: true, message: 'Status not completed — ignored' });
    }

    if (!payload.results) {
      return res.status(400).json({ error: 'Missing results in completed payload' });
    }

    // Build PDF
    const scanResults: ScanResult = {
        scanId: payload.scanId,
        scanDate: new Date().toISOString(),
        target: payload.target || 'N/A',
        results: payload.results,
        status: 'running',
        startedAt: new Date(),
        progress: 0
    };

    const pdfBuffer = await generatePDFReportPdfBuffer(scanResults, payload.scanId);

    // Determine recipient
    const recipient = payload.userEmail;
    if (!recipient) {
      // You can extend this: look up scan owner from DB using scanId
      return res.status(400).json({ error: 'Missing userEmail. Cannot send report.' });
    }

    const subject = 'Your TEKTON scan report';
    const text = `Hello,\n\nYour TEKTON scan for ${payload.results} is complete. The report is attached.\n\nRegards,\nTEKTON`;

    await sendReportEmail(recipient, subject, text, pdfBuffer);

    return res.status(200).json({ ok: true, message: 'Report generated and sent' });
  } catch (err: any) {
    console.error('webhook error', err);
    return res.status(500).json({ error: err.message || 'server error' });
  }
}


// // from your server-side scan runner after scan finishes:
// import fetch from 'node-fetch';

// await fetch(`${process.env.BASE_URL}/api/scan/webhook`, {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     scanId: myScanId,
//     status: 'completed',
//     userEmail: user.email,
//     results: scanResults
//   })
// });

import fs from 'fs';
import path from 'path';
import Mail from '@sendgrid/mail';

const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'sendgrid';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'alerts@example.com';
const SENDER_NAME = process.env.SENDER_NAME || `TEKTON <${SENDER_EMAIL}>`;

export async function sendReportEmail_SendGrid(to: string, subject: string, text: string, pdfBuffer: Buffer, filename = 'tekton-scan-report.pdf') {
  if (!process.env.SENDGRID_API_KEY) throw new Error('SENDGRID_API_KEY not configured');
  Mail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to,
    from: SENDER_NAME.includes('<') ? SENDER_EMAIL : SENDER_EMAIL, // from must be a single email string
    subject,
    text,
    html: `<p>${text.replace(/\n/g, '<br/>')}</p>`,
    attachments: [
      {
        content: pdfBuffer.toString('base64'),
        filename,
        type: 'application/pdf',
        disposition: 'attachment',
      },
    ],
  };

  await Mail.send(msg);
}

export async function sendReportEmail_Resend(to: string, subject: string, text: string, pdfBuffer: Buffer, filename = 'tekton-scan-report.pdf') {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error('RESEND_API_KEY not configured');

  const formData = new (require('form-data'))();
  formData.append('from', SENDER_NAME);
  formData.append('to', to);
  formData.append('subject', subject);
  formData.append('text', text);
  formData.append('attachments', pdfBuffer, {
    filename,
    contentType: 'application/pdf',
  });

  const fetch = require('node-fetch');
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend failed: ${res.status} ${body}`);
  }
}

export async function sendReportEmail(to: string, subject: string, text: string, pdfBuffer: Buffer, filename = 'tekton-scan-report.pdf') {
  if (EMAIL_PROVIDER === 'resend') {
    return sendReportEmail_Resend(to, subject, text, pdfBuffer, filename);
  } else {
    return sendReportEmail_SendGrid(to, subject, text, pdfBuffer, filename);
  }
}
import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRID_API_KEY || '';
if (apiKey && apiKey !== 'your_sendgrid_api_key_here') {
  sgMail.setApiKey(apiKey);
}

const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'noreply@bausalty.com';

export interface SendEmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
  attachments?: Array<{
    content: string; // base64 encoded
    filename: string;
    type: string;
    disposition: string;
  }>;
}

/**
 * Sends an email via SendGrid API
 */
export async function sendEmail(options: SendEmailOptions): Promise<boolean> {
  if (!apiKey || apiKey === 'your_sendgrid_api_key_here') {
    console.log('[SendGrid Demo Mode] Email would be sent to:', options.to, 'Subject:', options.subject);
    return true;
  }

  try {
    await sgMail.send({
      to: options.to,
      from: {
        email: fromEmail,
        name: 'Bausalty (بوصلتي) - Tahseen AI',
      },
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    });
    console.log('SendGrid email sent successfully to:', options.to);
    return true;
  } catch (err: unknown) {
    const errorObj = err as { response?: { body?: unknown }; message?: string };
    console.error('SendGrid email delivery error:', errorObj?.response?.body || errorObj?.message || err);
    return false;
  }
}

/**
 * Sends Welcome Email to new user
 */
export async function sendWelcomeEmail(toEmail: string, userName: string): Promise<boolean> {
  const subject = 'Welcome to Bausalty (بوصلتي) | Your Career Discovery Journey';
  
  const html = `
    <div style="font-family: Arial, sans-serif; background-color: #fbf6ea; padding: 24px; color: #3a2f21;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fffdf6; border: 2px solid #3a2f21; border-radius: 18px; padding: 32px; box-shadow: 4px 4px 0px #3a2f21;">
        <h1 style="color: #0d9488; font-size: 24px; margin-bottom: 8px;">Welcome to Bausalty (بوصلتي)!</h1>
        <p style="font-size: 16px; color: #5c4f3a;">Hello <strong>${userName}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.6; color: #3a2f21;">
          Thank you for signing up for Bausalty (بوصلتي)! Welcome to your career discovery journey.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #3a2f21; font-family: 'Amiri', 'Noto Naskh Arabic', serif; direction: rtl; text-align: right;">
          شكراً لتسجيلك في منصة بوصالتي! أهلاً بك في رحلة اكتشاف تخصصك الجامعي الأنسب ومستقبلك المهني بقرارات واثقة متوافقة مع رؤية السعودية 2030.
        </p>
        <div style="margin-top: 24px; padding-top: 20px; border-top: 2px solid #e4dbc8; font-size: 12px; color: #8a7a5f;">
          Bausalty • Tahseen AI Group (مجموعة تحسين للذكاء الاصطناعي)
        </div>
      </div>
    </div>
  `;

  return sendEmail({
    to: toEmail,
    subject,
    text: `Hello ${userName}, Thank you for signing up for Bausalty! Welcome to your career discovery journey.`,
    html,
  });
}

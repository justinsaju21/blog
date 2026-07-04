import nodemailer from 'nodemailer'

const SITE_NAME = 'Echo Blogs'
const SITE_URL = process.env.AUTH_URL ?? 'http://localhost:3000'

// Initialize Nodemailer with simple SMTP configuration
function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

export async function sendApprovalEmail({
  to,
  name,
  articleTitle,
  articleSlug,
}: {
  to: string
  name: string
  articleTitle: string
  articleSlug: string
}): Promise<void> {
  const viewUrl = `${SITE_URL}/blog/${articleSlug}`
  const blogUrl = `${SITE_URL}/blog`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your article is now live</title>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;color:#999;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;">${SITE_NAME}</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 12px;color:#f5f5f5;font-size:28px;font-weight:300;line-height:1.2;">Your article is now live ✦</h1>
              <p style="margin:0 0 8px;color:#999;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;">${articleTitle}</p>
              <p style="margin:0 0 32px;color:#888;font-size:16px;line-height:1.6;">
                Hi ${name}, your article has been reviewed and published to our blog. 
                Thank you for contributing your insights and sharing your knowledge with our readers.
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="${viewUrl}" style="display:inline-block;padding:14px 28px;background:#ffffff;color:#000000;text-decoration:none;font-size:14px;font-weight:500;border-radius:8px;">View Your Article</a>
                  </td>
                  <td>
                    <a href="${blogUrl}" style="display:inline-block;padding:14px 28px;background:transparent;color:#f5f5f5;text-decoration:none;font-size:14px;border:1px solid rgba(255,255,255,0.15);border-radius:8px;">Explore the Blog</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;color:#555;font-size:12px;">${SITE_NAME} · You received this because you submitted an article to our blog.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const transporter = getTransporter()
  
  try {
    await transporter.sendMail({
      from: `"${SITE_NAME}" <${process.env.GMAIL_USER}>`,
      to,
      subject: 'Your article has been published ✦',
      html,
    })
  } catch (error) {
    console.error('[Nodemailer] Failed to send approval email:', error)
    throw error
  }
}

export async function sendRejectionEmail({
  to,
  name,
}: {
  to: string
  name: string
}): Promise<void> {
  const submitUrl = `${SITE_URL}/submit`

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Thank you for your submission</title>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;color:#999;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;">${SITE_NAME}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 24px;color:#f5f5f5;font-size:28px;font-weight:300;line-height:1.2;">Update on your submission</h1>
              <p style="margin:0 0 20px;color:#888;font-size:16px;line-height:1.6;">
                Hi ${name}, thank you for sharing your work with us. We review every submission carefully 
                to ensure our blog maintains its curation standards.
              </p>
              <p style="margin:0 0 20px;color:#888;font-size:16px;line-height:1.6;">
                Unfortunately, your recent article submission has not been accepted for publication at this time.
              </p>
              <p style="margin:0 0 32px;color:#888;font-size:16px;line-height:1.6;">
                We encourage you to keep writing and submit again in the future!
              </p>
              <a href="${submitUrl}" style="display:inline-block;padding:14px 28px;background:#ffffff;color:#000000;text-decoration:none;font-size:14px;font-weight:500;border-radius:8px;">Submit Another Article</a>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;color:#555;font-size:12px;">${SITE_NAME} · You received this because you submitted an article to our blog.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const transporter = getTransporter()

  try {
    await transporter.sendMail({
      from: `"${SITE_NAME}" <${process.env.GMAIL_USER}>`,
      to,
      subject: 'Update on your article submission',
      html,
    })
  } catch (error) {
    console.error('[Nodemailer] Failed to send rejection email:', error)
    throw error
  }
}

export async function sendSubmissionConfirmationEmail({
  to,
  name,
}: {
  to: string
  name: string
}): Promise<void> {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Submission Received</title>
</head>
<body style="margin:0;padding:0;background:#000000;font-family:Inter,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000000;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#0a0a0a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;overflow:hidden;">
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;color:#999;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;">${SITE_NAME}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px;">
              <h1 style="margin:0 0 24px;color:#f5f5f5;font-size:28px;font-weight:300;line-height:1.2;">Submission Received</h1>
              <p style="margin:0 0 20px;color:#888;font-size:16px;line-height:1.6;">
                Hi ${name}, thank you for submitting your article to ${SITE_NAME}. 
              </p>
              <p style="margin:0 0 32px;color:#888;font-size:16px;line-height:1.6;">
                Our editorial team has received your submission and will review it shortly. We will send you another email as soon as a decision is made.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px;border-top:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;color:#555;font-size:12px;">${SITE_NAME} · You received this because you submitted an article to our blog.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()

  const transporter = getTransporter()

  try {
    await transporter.sendMail({
      from: `"${SITE_NAME}" <${process.env.GMAIL_USER}>`,
      to,
      subject: 'We received your article submission',
      html,
    })
  } catch (error) {
    console.error('[Nodemailer] Failed to send submission confirmation email:', error)
    // Don't throw to prevent failing the entire submission process
  }
}

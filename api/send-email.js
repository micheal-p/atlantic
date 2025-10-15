const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { firstName, lastName, email, phone, company, subject, message } = req.body;

  // Validate required fields
  if (!firstName || !lastName || !email || !subject || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create transporter with your cPanel SMTP settings
  const transporter = nodemailer.createTransporter({
    host: 'server366.web-hosting.com',
    port: 465,
    secure: true, // true for 465 (SSL)
    auth: {
      user: 'boyd@ascctc.com',
      pass: 'Boyd@1974', // HARDCODED - REPLACE WITH REAL PASSWORD!
    },
  });

  // Email content
  const mailOptions = {
    from: '"ASCCTC Contact Form" <boyd@ascctc.com>',
    to: 'boyd@ascctc.com',
    replyTo: `${firstName} ${lastName} <${email}>`,
    subject: `New ASCCTC Submission: ${subject}`,
    html: `
      <h2>New Contact Form Message</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
    text: `New Contact Form Message\nName: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCompany: ${company || 'N/A'}\nSubject: ${subject}\nMessage: ${message}`, // Plain text fallback
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
}
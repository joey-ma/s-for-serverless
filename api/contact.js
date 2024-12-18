import { validateForm } from '../lib/utils';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set the CORS header
  res.setHeader('Access-Control-Allow-Origin', process.env.SITE_URL);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check `Origin` header
  const origin = req.headers.origin;
  if (origin !== process.env.SITE_URL) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Handle request// Extract form data from query parameters
  const { name, email, message } = req.query;
  const formData = {
    name,
    email,
    message
  };

  // Backend form validation
  const error = validateForm(formData);
  if (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ error });
  }

  try {
    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: process.env.INBOX,
      subject: `ALERT: joey-ma.github.io received a message from ${name}`,
      text: `from: "${name}" <${email}>, \n\nmessage:\n\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    const success = 'Message sent successfully';
    console.log(success);
    return res.status(200).json({ success });

  } catch (error) {
    console.error('Error sending message:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

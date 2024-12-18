import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Set the CORS header
  res.setHeader('Access-Control-Allow-Origin', process.env.SITE_URL!); // Allow specific origin
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers

  // Allow only POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check `Origin` header
  const origin = req.headers.origin;
  if (origin !== process.env.SITE_URL) {
    return res.status(403).json({ error: 'Access denied' });
  }

  // Handle request
  const { name = 'World' } = req.query
  return res.json({
    message: `Hello ${name}!`,
  })
}
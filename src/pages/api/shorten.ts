import { NextApiRequest, NextApiResponse } from 'next';
import { shortenUrl } from '../../lib/url-shortner';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL required' });
    }

    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    try {
      const result = await shortenUrl(url);
      const protocol = req.headers['x-forwarded-proto'] || 'http';
      const host = req.headers.host;
      const fullShortUrl = `${protocol}://${host}/${result?.shortened}`;
      
      return res.status(200).json({
        original: result?.original,
        shortened: result?.shortened,
        shortUrl: fullShortUrl,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
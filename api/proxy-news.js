// /api/proxy-news.js
export default async function handler(req, res) {
  try {
    const upstream = 'https://berita-indo-api-next.vercel.app/api/cnn-news';

    // Forward optional query params from client if ada
    const url = new URL(upstream);
    Object.keys(req.query || {}).forEach(k => url.searchParams.set(k, req.query[k]));

    const response = await fetch(url.toString());
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      console.error('Upstream error', response.status, text);
      res.status(response.status).send(text || `Upstream returned ${response.status}`);
      return;
    }

    const data = await response.json();

    // Optional: set CORS header if you might call this function cross-origin
    // (not necessary if frontend calls same origin), but safe to include:
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.status(200).json(data);
  } catch (err) {
    console.error('Proxy error', err);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(500).json({ error: 'Gagal mengambil berita (proxy).' });
  }
}

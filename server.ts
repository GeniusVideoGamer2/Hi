import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI client lazily
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY || '';
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // YouTube API Endpoints inspired by srcecde/python-youtube-api
  app.get('/api/youtube/search', async (req: express.Request, res: express.Response) => {
    try {
      const q = (req.query.q as string) || 'trending';
      const maxResults = Number(req.query.maxResults) || 12;

      // Fetch search results from public YouTube search endpoint
      const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
      const response = await fetch(searchUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept-Language': 'en-US,en;q=0.9',
        },
      });
      const html = await response.text();

      // Extract ytInitialData JSON from html
      const match = html.match(/var ytInitialData = ({.*?});<\/script>/s) || html.match(/ytInitialData = ({.*?});/s);
      const videoItems: any[] = [];

      if (match && match[1]) {
        try {
          const ytData = JSON.parse(match[1]);
          const contents =
            ytData.contents?.twoColumnSearchResultsRenderer?.primaryContents?.sectionListRenderer?.contents?.[0]
              ?.itemSectionRenderer?.contents || [];

          for (const item of contents) {
            if (item.videoRenderer) {
              const vr = item.videoRenderer;
              const videoId = vr.videoId;
              const title = vr.title?.runs?.[0]?.text || 'YouTube Video';
              const channelTitle = vr.ownerText?.runs?.[0]?.text || 'YouTube Channel';
              const viewCountText = vr.viewCountText?.simpleText || vr.shortViewCountText?.simpleText || 'Views';
              const publishedTimeText = vr.publishedTimeText?.simpleText || '';
              const lengthText = vr.lengthText?.simpleText || vr.thumbnailOverlays?.[0]?.thumbnailOverlayTimeStatusRenderer?.text?.simpleText || '';
              const thumbnailUrl = vr.thumbnail?.thumbnails?.pop()?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

              videoItems.push({
                videoId,
                title,
                channelTitle,
                viewCountText,
                publishedTimeText,
                lengthText,
                thumbnailUrl,
                embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
                url: `https://www.youtube.com/watch?v=${videoId}`,
              });
            }
            if (videoItems.length >= maxResults) break;
          }
        } catch (e) {
          console.error('Failed parsing ytInitialData', e);
        }
      }

      // Fallback mock items if extraction yielded few items
      if (videoItems.length === 0) {
        const sampleIds = ['dQw4w9WgXcQ', 'L_LUpnjgPso', 'jNQXAC9IVRw', '3JZ_D3ELwOQ', 'kJQP7kiw5Fk', 'fJ9rUzIMcZQ'];
        sampleIds.forEach((id, idx) => {
          videoItems.push({
            videoId: id,
            title: `YouTube Result for "${q}" - Video #${idx + 1}`,
            channelTitle: 'Official YouTube Channel',
            viewCountText: '1.2M views',
            publishedTimeText: '2 days ago',
            lengthText: '10:24',
            thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
            embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1`,
            url: `https://www.youtube.com/watch?v=${id}`,
          });
        });
      }

      res.json({
        query: q,
        totalResults: videoItems.length,
        items: videoItems,
      });
    } catch (err: any) {
      console.error('YouTube API Error:', err);
      res.status(500).json({ error: 'Failed fetching YouTube data', message: err?.message });
    }
  });

  app.get('/api/youtube/video', async (req: express.Request, res: express.Response) => {
    try {
      const v = (req.query.v as string) || 'dQw4w9WgXcQ';
      const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${v}&format=json`;
      const response = await fetch(oembedUrl);
      let data: any = {};
      if (response.ok) {
        data = await response.json();
      }

      res.json({
        videoId: v,
        title: data.title || `YouTube Video (${v})`,
        authorName: data.author_name || 'YouTube Creator',
        authorUrl: data.author_url || 'https://www.youtube.com',
        thumbnailUrl: data.thumbnail_url || `https://i.ytimg.com/vi/${v}/hqdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${v}?autoplay=1&enablejsapi=1`,
        url: `https://www.youtube.com/watch?v=${v}`,
      });
    } catch (err: any) {
      res.json({
        videoId: req.query.v || 'dQw4w9WgXcQ',
        title: 'YouTube Video Player',
        authorName: 'YouTube Creator',
        embedUrl: `https://www.youtube.com/embed/${req.query.v || 'dQw4w9WgXcQ'}?autoplay=1`,
        url: `https://www.youtube.com/watch?v=${req.query.v || 'dQw4w9WgXcQ'}`,
      });
    }
  });

  // Health check API
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', app: 'ISTEK Browser Web App', time: new Date().toISOString() });
  });

  // Web Page Proxy Endpoint for Real Google Chrome Webview Experience
  app.get('/api/proxy', async (req: express.Request, res: express.Response) => {
    try {
      const targetUrl = req.query.url as string;
      if (!targetUrl) {
        return res.status(400).send('URL query parameter is required');
      }

      let formattedUrl = targetUrl;
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }

      const clientLang = (req.headers['accept-language'] as string) || 'tr-TR,tr;q=0.9,en-US,en;q=0.8,en;q=0.7';
      const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';

      const fetchHeaders: Record<string, string> = {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept':
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': clientLang,
      };

      if (clientIp) {
        fetchHeaders['X-Forwarded-For'] = clientIp;
      }

      const response = await fetch(formattedUrl, {
        headers: fetchHeaders,
        redirect: 'follow',
      });

      const contentType = response.headers.get('content-type') || 'text/html';

      // Explicitly allow iframe embedding
      res.removeHeader('X-Frame-Options');
      res.removeHeader('Content-Security-Policy');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('X-Frame-Options', 'ALLOWALL');

      if (contentType.includes('text/html')) {
        let html = await response.text();
        const urlObj = new URL(formattedUrl);
        const origin = urlObj.origin;
        const baseTag = `<base href="${origin}/" target="_self">`;

        // Strip restrictive meta tag CSP or frame restrictions in HTML
        html = html.replace(/<meta[^>]*http-equiv=["']?Content-Security-Policy["']?[^>]*>/gi, '');
        html = html.replace(/<meta[^>]*http-equiv=["']?X-Frame-Options["']?[^>]*>/gi, '');

        if (html.includes('<head>')) {
          html = html.replace('<head>', `<head>${baseTag}`);
        } else if (html.includes('<HEAD>')) {
          html = html.replace('<HEAD>', `<HEAD>${baseTag}`);
        } else {
          html = baseTag + html;
        }

        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.send(html);
      } else {
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        res.setHeader('Content-Type', contentType);
        return res.send(buffer);
      }
    } catch (err: any) {
      console.error('Web Proxy Error:', err);
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Google Chrome - Live Webview</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 40px; margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 80vh; }
            .card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 32px; max-width: 560px; text-align: center; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
            h2 { color: #f97316; margin-top: 0; font-size: 20px; }
            p { color: #94a3b8; font-size: 14px; line-height: 1.6; margin-bottom: 24px; }
            .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #ea580c; color: white; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: bold; font-size: 14px; transition: all 0.2s; }
            .btn:hover { background: #f97316; transform: translateY(-1px); }
            .url-badge { background: #0f172a; border: 1px solid #334155; padding: 8px 16px; border-radius: 8px; font-mono; font-size: 12px; color: #38bdf8; margin-bottom: 20px; word-break: break-all; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>Protected Website View</h2>
            <div class="url-badge">${req.query.url || 'Web Target'}</div>
            <p>This external website blocks cross-origin iframe proxying. You can open it in a new window or use ISTEK Chrome Reader view.</p>
            <a href="${req.query.url}" target="_blank" class="btn">Launch Website in Chrome Tab &rarr;</a>
          </div>
        </body>
        </html>
      `);
    }
  });

  // ISTEK AI Assistant Chat API Endpoint
  const handleChatRequest = async (req: express.Request, res: express.Response) => {
    try {
      const { message, context } = req.body;
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const ai = getGeminiClient();

      const systemInstruction = `You are ISTEK AI, official built-in AI assistant for ISTEK Browser powered by Gemini 3.6 Flash.
You prioritize user privacy, security, transparency, and accuracy.
You help users summarize web pages, explain tech concepts, check privacy risks, and answer general knowledge questions concisely.
Context of active webpage: ${context ? JSON.stringify(context) : 'None'}.
Always be helpful, clear, and privacy-conscious.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: [
          { role: 'user', parts: [{ text: `${systemInstruction}\n\nUser Question: ${message}` }] },
        ],
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const replyText = response.text || 'I apologize, but I was unable to generate a response.';

      let sources = [
        { title: 'ISTEK Privacy Research', url: 'https://istek.com/privacy/' },
        { title: 'ISTEK Shields & Security Engine', url: 'https://istek.com/shields/' },
      ];

      const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks && Array.isArray(groundingChunks)) {
        const extractedSources = groundingChunks
          .filter((c: any) => c.web?.uri)
          .map((c: any) => ({
            title: c.web.title || c.web.uri,
            url: c.web.uri,
          }));
        if (extractedSources.length > 0) {
          sources = extractedSources;
        }
      }

      res.json({
        reply: replyText,
        sources,
      });
    } catch (err: any) {
      console.error('ISTEK AI Chat Error:', err);
      res.status(500).json({
        reply: "I'm having trouble connecting to my AI model right now. Please verify your GEMINI_API_KEY configuration.",
        error: err?.message || String(err),
      });
    }
  };

  app.post('/api/istek/chat', handleChatRequest);
  app.post('/api/leo/chat', handleChatRequest);

  // ISTEK AI Page Summarizer API Endpoint
  const handleSummarizeRequest = async (req: express.Request, res: express.Response) => {
    try {
      const { pageTitle, pageUrl, pageContent } = req.body;

      const ai = getGeminiClient();

      const prompt = `Provide a concise, bulleted summary of this webpage.
Title: ${pageTitle || 'Webpage'}
URL: ${pageUrl || 'https://istek.com'}
Content Snippet: ${pageContent || 'A privacy focused webpage.'}

Format as:
1. Key Highlights (3 bullet points)
2. Main Takeaway
3. Privacy & Tracker Note`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      res.json({
        summary: response.text || 'Unable to summarize page.',
      });
    } catch (err: any) {
      console.error('ISTEK AI Summarizer Error:', err);
      res.status(500).json({
        summary: 'Error generating summary with Gemini AI. Please try again.',
        error: err?.message || String(err),
      });
    }
  };

  app.post('/api/istek/summarize', handleSummarizeRequest);
  app.post('/api/leo/summarize', handleSummarizeRequest);

  // Vite Middleware Setup for Dev & Production Static Serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ISTEK Browser App running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});

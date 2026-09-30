import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 } // 25 MB
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export const N8N_DEFAULT_FORM_URL = 'https://yajeswari.app.n8n.cloud/form/823ef810-eb63-4cd7-8603-9dd5a568e892';

// API: Get Form Metadata
app.get('/api/n8n/info', (_req, res) => {
  res.json({
    targetFormUrl: N8N_DEFAULT_FORM_URL,
    formTitle: 'resume analyze',
    formDescription: 'to got jobs',
    status: 'connected',
    fields: [
      { id: 'field-0', name: 'field-0', label: 'Candidate Name', type: 'text', required: true },
      { id: 'field-1', name: 'field-1', label: 'Email Address', type: 'email', required: true },
      { id: 'field-2', name: 'field-2', label: 'Resume Document(s)', type: 'file', required: true, multiple: true },
    ]
  });
});

// API: Check n8n Connection Ping
app.get('/api/n8n/ping', async (_req, res) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    const response = await fetch(N8N_DEFAULT_FORM_URL, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    res.json({
      online: response.ok,
      status: response.status,
      statusText: response.statusText,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    res.json({
      online: false,
      error: err.message || 'Timeout / unreachable',
      timestamp: new Date().toISOString(),
    });
  }
});

// API: Proxy Submit to n8n Cloud Form
app.post('/api/n8n/submit', upload.array('field-2', 5), async (req, res) => {
  try {
    const name = req.body['field-0'] || req.body.name;
    const email = req.body['field-1'] || req.body.email;
    const files = req.files as Express.Multer.File[] | undefined;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Candidate name is required (field-0).' });
    }
    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({ error: 'Email address is required (field-1).' });
    }
    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'At least one resume file is required (field-2).' });
    }

    // Build standard multipart FormData to post to the n8n form endpoint
    const formData = new FormData();
    formData.append('field-0', name.trim());
    formData.append('field-1', email.trim());

    for (const file of files) {
      const blob = new Blob([new Uint8Array(file.buffer)], { type: file.mimetype || 'application/pdf' });
      formData.append('field-2', blob, file.originalname);
    }

    const targetUrl = (req.body.customUrl && typeof req.body.customUrl === 'string' && req.body.customUrl.startsWith('https://'))
      ? req.body.customUrl
      : N8N_DEFAULT_FORM_URL;

    const response = await fetch(targetUrl, {
      method: 'POST',
      body: formData,
    });

    const responseText = await response.text();
    let responseJson: any = null;
    try {
      responseJson = JSON.parse(responseText);
    } catch {
      // n8n returns HTML or text
    }

    const isSuccess = response.status >= 200 && response.status < 300;

    return res.status(isSuccess ? 200 : response.status).json({
      success: isSuccess,
      status: response.status,
      targetUrl,
      candidate: {
        name: name.trim(),
        email: email.trim(),
      },
      files: files.map(f => ({
        name: f.originalname,
        size: f.size,
        type: f.mimetype,
      })),
      responseSnippet: responseText.slice(0, 500),
      parsedData: responseJson,
      submittedAt: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Error proxying submission to n8n:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to communicate with n8n Cloud webhook.',
    });
  }
});

async function startServer() {
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();

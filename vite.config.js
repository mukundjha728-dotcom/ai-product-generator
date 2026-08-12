import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Minimal plugin to simulate Vercel Serverless Function locally
const apiPlugin = () => ({
  name: 'api-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      if (req.url === '/api/generate' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            // Dynamically import the Vercel handler
            const handlerModule = await import('./api/generate.js');
            // Mock req and res for the handler
            const mockReq = { method: req.method, body: JSON.parse(body || '{}') };
            let statusCode = 200;
            const mockRes = {
              status: (code) => { statusCode = code; return mockRes; },
              json: (data) => {
                res.statusCode = statusCode;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(data));
              }
            };
            await handlerModule.default(mockReq, mockRes);
          } catch (e) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        });
        return;
      }
      next();
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), apiPlugin()],
})

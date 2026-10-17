// Serves the static export (out/) the way GitHub Pages does: gzip, and /dir/ -> dir/index.html.
// Used by `npm run preview` so Lighthouse measures the production build, not `next dev`.
// Usage: node tests/serve-out.cjs [dir=out] [port=4173]
const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const root = path.resolve(process.argv[2] || 'out');
const port = Number(process.argv[3] || 4173);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.txt': 'text/plain',
  '.xml': 'application/xml', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
  '.woff2': 'font/woff2', '.pdf': 'application/pdf' };

http.createServer((req, res) => {
  let file = path.join(root, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!file.startsWith(root)) return res.writeHead(403).end();
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  if (!fs.existsSync(file)) file = path.join(root, '404.html');
  const status = file.endsWith(`${path.sep}404.html`) && !req.url.includes('404') ? 404 : 200;
  const body = fs.readFileSync(file);
  const gzip = /\bgzip\b/.test(req.headers['accept-encoding'] || '');
  res.writeHead(status, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', ...(gzip && { 'Content-Encoding': 'gzip' }) });
  res.end(gzip ? zlib.gzipSync(body) : body);
}).listen(port, () => console.log(`Serving ${root} at http://localhost:${port}/`));

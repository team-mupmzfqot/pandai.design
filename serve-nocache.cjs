// Minimal static server that ALWAYS sends no-store (no browser caching).
// Run: node serve-nocache.cjs   ->  http://localhost:3000
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = 3000;
const TYPES = {
  '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.cjs':'text/javascript; charset=utf-8',
  '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png',
  '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.gif':'image/gif', '.webp':'image/webp',
  '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf', '.ico':'image/x-icon'
};

function send(res, fp, data) {
  res.writeHead(200, {
    'Content-Type': TYPES[path.extname(fp).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    'Pragma': 'no-cache',
    'Expires': '0'
  });
  res.end(data);
}

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const fp = path.normalize(path.join(ROOT, urlPath));
  if (!fp.startsWith(ROOT)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(fp, (err, data) => {
    if (!err) { send(res, fp, data); return; }
    // Fallback: extensionless URL -> try appending .html (e.g. /foo/home -> /foo/home.html)
    if (!path.extname(fp)) {
      fs.readFile(fp + '.html', (err2, data2) => {
        if (!err2) { send(res, fp + '.html', data2); return; }
        res.writeHead(404, { 'Cache-Control': 'no-store' }); res.end('Not found: ' + urlPath);
      });
      return;
    }
    res.writeHead(404, { 'Cache-Control': 'no-store' }); res.end('Not found: ' + urlPath);
  });
}).listen(PORT, () => console.log('no-cache static server -> http://localhost:' + PORT));

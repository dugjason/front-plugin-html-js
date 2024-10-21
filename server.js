const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 8080;

const server = http.createServer((req, res) => {
  // Parse the URL and remove query string
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === '/' || pathname === '/index.html') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else if (pathname === '/index.js') {
    fs.readFile(path.join(__dirname, 'index.js'), (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.js');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(content);
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

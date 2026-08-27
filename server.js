const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const SRC_DIR = path.join(__dirname, "src");

const ROUTE_OVERRIDES = {
  "/js/validation.js": path.join(SRC_DIR, "validation.js"),
};

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function sendFile(response, filePath) {
  const extension = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[extension] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(error.code === "ENOENT" ? 404 : 500);
      response.end(error.code === "ENOENT" ? "Not found" : "Server error");
      return;
    }

    response.writeHead(200, { "Content-Type": contentType });
    response.end(content);
  });
}

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(request.url.split("?")[0]);

  if (ROUTE_OVERRIDES[urlPath]) {
    sendFile(response, ROUTE_OVERRIDES[urlPath]);
    return;
  }

  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(PUBLIC_DIR, safePath === path.sep ? "index.html" : safePath);

  if (filePath.endsWith(path.sep)) {
    filePath = path.join(filePath, "index.html");
  }

  if (!filePath.startsWith(PUBLIC_DIR)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (!error && stats.isDirectory()) {
      sendFile(response, path.join(filePath, "index.html"));
      return;
    }

    if (error) {
      if (urlPath === "/" || urlPath.endsWith(".html")) {
        sendFile(response, path.join(PUBLIC_DIR, "index.html"));
        return;
      }

      response.writeHead(404);
      response.end("Not found");
      return;
    }

    sendFile(response, filePath);
  });
});

server.listen(PORT, () => {
  console.log(`Settings app running at http://localhost:${PORT}`);
});

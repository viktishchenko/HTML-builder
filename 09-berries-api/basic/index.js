import http from "http";

const host = "127.0.0.1";
const port = 8000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text-plain");
  res.end("Привет, Basic!");
});

server.listen(port, host, () => {
  console.log(`Сервер запущен на ${host}: ${port}`);
});

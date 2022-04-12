# berryies-api

<details>
<summary>
basic server
</summary>

- [basic server →](./basic/basic.server.js)

```javascript
import http from "http";

const host = "127.0.0.1";
const port = 8000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text-plain");
  res.end("Привет, Мир!");
});

server.listen(port, host, () => {
  console.log(`Сервер запущен на ${host}: ${port}`);
});
```

</details>

<details>
<summary>
express server
</summary>

- [express server →](./express/express.server.js)

```javascript
import express from "express";

const port = 8000;
const app = express();

app.get("/hello", (req, res) => {
  res.send("Привет, Express!");
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
```

</details>

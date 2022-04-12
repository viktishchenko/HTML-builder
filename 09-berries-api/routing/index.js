import express from "express";

const port = 8000;
const app = express();

/**
 * своего рода middleware
 * post → app.all - /hello → app.post - /hello
 * ВАЖЕН ПОРЯДОК ЗАПРОСОВ СВЕРХУ ВНИЗ
 */
app.all("/hello", (req, res, next) => {
  console.log("ALL");
  next();
});

const cb = (req, res, next) => {
  console.log("CB");
  next();
};

// app.get("/hello", cb, (req, res) => {
//   // "/hel?lo" // hello, helo
//   // "/hel+lo" // hello, hellllo
//   // "/hel*lo" // hello, helo, helfdsflo
//   // "/he(la)?lo" // helo, helalo
//   // "/.*a$/" // qwerta, asdfa
//   res.send("Привет, Routing!");
// });

// выполняется последовательность колбеков
app.get("/hello", [
  cb,
  cb,
  cb,
  (req, res) => {
    res.send("Привет, Routing!");
  },
]);

// одна сущность для разных запросов
app
  .route("/user")
  .get("/hello", (req, res) => {
    res.send("Привет GET!");
  })
  .post("/hello", (req, res) => {
    res.send("Привет POST!");
  });

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

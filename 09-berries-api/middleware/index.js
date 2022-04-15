import express from "express";
import { userRouter } from "./users/users.js";

const port = 8000;
const app = express();

// middleware, например глобальный логгер входящих запросов
app.use((req, res, next) => {
  console.log("Время ", Date.now());
  next();
});

/**
 * Получаем ошибку
 * Ниже располагаем обработчик
 * В результате приложение не падает, а
 * выдает → throw new Error("Уиии, ошибка...");
 */
app.get("/hello", (req, res) => {
  throw new Error("Уиии, ошибка...");
});

/* app.get("/hello", (req, res) => {
  res.send("Привет Middleware!");
  //   res.end();
}); */

app.use("/users", userRouter);

// Добавляем обработчик ошибки после use()
app.use((err, req, res, next) => {
  console.log(err.message);
  // Например, 401 - пользователь не авторизован
  res.status(401).send(err.message);
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost${port}`);
});

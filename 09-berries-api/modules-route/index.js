import express from "express";
import { userRouter } from "./users/users.js";

const port = 8000;
const app = express();

app.get("/hello", (req, res) => {
  //   res.send("Привет, Modules-route!");
  res.end();
});

// модульная система роутов
app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

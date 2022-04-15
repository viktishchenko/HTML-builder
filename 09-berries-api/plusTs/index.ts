/**
 * добавим типы в express (значок DT в npm)
 * означает, что это можно сделать командой
 * npm i -D @types/express
 *
 * restsrt ts server
 * Ctrl+Shift+P → Restart TS server
 */

import express, { Request, Response, NextFunction } from "express";
import { userRouter } from "./users/users.js";

const port = 8000;
const app = express();

app.use((req, res, next) => {
  console.log("Время ", Date.now());
  next();
});

app.get("/hello", (req, res) => {
  throw new Error("Упссс, ошибка...");
});

app.use("/users", userRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(401).send(err.message);
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost${port}`);
});

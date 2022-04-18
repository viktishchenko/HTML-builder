/**
 * добавим типы в express (значок DT в npm)
 * означает, что это можно сделать командой
 * npm i -D @types/express
 *
 * restsrt ts server
 * Ctrl+Shift+P → Restart TS server
 */
import express from "express";

const userRouter = express.Router();

userRouter.use((req, res, next) => {
  console.log("Обработчик users");
  next();
});

userRouter.post("/login", (req, res) => {
  res.send("login page");
});

userRouter.post("/register", (req, res) => {
  res.send("register page");
});

export { userRouter };

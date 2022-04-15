import express from "express";

const userRouter = express.Router();

// middleware - локальный триггер на роуте
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

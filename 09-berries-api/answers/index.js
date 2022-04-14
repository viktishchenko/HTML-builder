import express from "express";

const port = 8000;
const app = express();

// ответы
/* app.get("/hello", (req, res) => {
  //   res.send("Привет, Answers!");
  //   res.status(201).send({ success: true });
  //   res.send({ success: true });
  //   res.json({ success: true });
  //   res.download("./test.pdf", "tessst.pdf"); // путь к файлу, имя для скачивания
  res.redirect(301, "https://example.com");
}); */

// заголовки
/* app.get("/hello", (req, res) => {
  //   res.set("Content-Type", "text/plain");
  //   res.append("Warning", "code");
  //   res.type("application/json");
  //   res.location("");
  //   res.links({
  //    next: 'qwerty'
  // });
  res.send("Приюювеэт!");
}); */

// cookies
/* app.get("/hello", (req, res) => {
  res.cookie("name", "tobi", {
    domain: ".example.com",
    path: "/admin",
    secure: true,
  });
  //   res.clearCookie("name", { path: "/admin" });
  res.clearCookie("name");
  res.send("Привет3!");
}); */

// end - обязательно что-либо отвечать, например res.end()
app.get("/hello", (req, res) => {
  //   res.send("Привет!");
  // бесконечный запрос
  //   res.status(404).end(); // 1 404 end
  res.end(); // 1 200 end
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

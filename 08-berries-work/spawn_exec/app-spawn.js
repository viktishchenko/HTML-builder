// Запуск параллельных процессов

const { spawn } = require("child_process");

const childProcess = spawn("ls");

// console.log("childProcess :>> ", childProcess);

childProcess.stdout.on("data", (data) => {
  console.log(`Stdout: ${data}`);
});

childProcess.stderr.on("data", (data) => {
  console.log(`Stderr: ${data}`);
});

childProcess.on("exit", (code) => {
  console.log(`Код выхода: ${code}`);
});

// Не работает → выход с ошибкой

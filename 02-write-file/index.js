const fs = require("fs");
const path = require("path");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.writeFile(path.join(__dirname, "text.txt"), "", (err) => {
  if (err) throw err;
});

const exitTheProcess = () => {
  process.stdout.write("- See ya, bye-bye!");
  process.exit();
};

rl.output.write("Hi there! Please type something ...\n");
rl.on("line", (data) => {
  if (data.trim().toLowerCase() === "exit") exitTheProcess();

  fs.appendFile(path.join(__dirname, "text.txt"), `${data} `, function (error) {
    if (error) throw error;
  });
});

rl.on("SIGINT", () => {
  exitTheProcess();
});

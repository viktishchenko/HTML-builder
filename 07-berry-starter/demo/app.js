fs = require("fs");

// синхронный блокирует поток!!!
const data = fs.readFileSync("./data.txt");
console.log(data.toString()); // data.toString() :>>  Мама мыла раму.
console.log(data); // data :>>  <Buffer d0 9c d0 b0 d0 bc d0 b0 20 d0 bc d1 8b d0 bb d0 b0 20 d1 80 d0 b0 d0 bc d1 83 2e>

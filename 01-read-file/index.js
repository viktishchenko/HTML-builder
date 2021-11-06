const fs = require("fs");
const path = require("path");
const stdout = process.stdout;
const stream = new fs.ReadStream(path.join(__dirname, "text1.txt"), "utf-8");
stream.on("data", (Data) => stdout.write(Data));

/* stream.on("error", (err) => {
  console.log(`${err.message}`);
}); */

/* const fs = require("fs");
const path = require("path");
const stdout = process.stdout;

async function print(readable) {
  readable.setEncoding("utf8");
  let data = "";
  for await (const chunk of readable) {
    data += chunk;
  }
  stdout.write(data);
}

print(fs.createReadStream(path.join(__dirname, "text1.txt"))).catch(
  console.error
); */

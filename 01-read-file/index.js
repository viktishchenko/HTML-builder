const fs = require("fs");
const path = require("path");
const stdout = process.stdout;
const stream = new fs.ReadStream(path.join(__dirname, "text.txt"), "utf-8");
stream.on("data", (Data) => stdout.write(Data));

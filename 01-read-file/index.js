const fs = require("fs");
const path = require("path");
fs.readFile(path.join(__dirname, "text.txt"), (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data.toString());
});

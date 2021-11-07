const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "styles");
const dist = path.join(__dirname, "project-dist", "bundle.css");

const output = fs.createWriteStream(path.join(dist));

fs.readdir(src, (err, files) => {
  if (err) {
    throw err;
  } else {
    files.forEach((file) => {
      const extname = path.extname(file);
      if (extname === ".css") {
        const stream = fs.createReadStream(path.join(src, file));
        stream.pipe(output);
      }
    });
  }
});

const fs = require("fs");
const path = require("path");
const folder = path.join(__dirname, "secret-folder");

fs.readdir(folder, { withFileTypes: true }, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      if (file.isFile()) {
        const extname = path.extname(file.name).split(".").join("");
        const filename = path.basename(file.name, extname).split(".").join("");
        fs.stat(`${folder}/${file.name}`, (err, stats) => {
          if (err) throw err;
          const fileSize = stats.size / 1000;
          console.log(`${filename} - ${extname} - ${fileSize}kb`);
        });
      }
    });
  }
});

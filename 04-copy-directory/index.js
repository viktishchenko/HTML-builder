const fs = require("fs");
const path = require("path");

const filesPath = path.join(__dirname, "files");
const fileCopyPath = path.join(__dirname, "file-copy");

const copyRecursiveAsync = function (src, dest) {
  fs.stat(src, { withFileTypes: true }, (err, stats) => {
    if (err) throw err;
    else {
      if (stats.isDirectory()) {
        fs.mkdir(dest, { recursive: true }, (err) => {
          if (err) throw err;
        });
        fs.readdir(src, { withFileTypes: true }, (err, files) => {
          if (err) {
            throw err;
          }
          files.forEach((file) => {
            copyRecursiveAsync(
              path.join(src, `${file.name}`),
              path.join(dest, `${file.name}`)
            );
          });
        });
      } else {
        fs.copyFile(src, dest, (err) => {
          if (err) throw err;
        });
      }
    }
  });
};

copyRecursiveAsync(filesPath, fileCopyPath);

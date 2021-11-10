const fs = require("fs");
const path = require("path");

const filesPath = path.join(__dirname, "files");
const fileCopyPath = path.join(__dirname, "file-copy");

const removeDir = async (fileCopyPath) => {
  await fs.promises.rm(fileCopyPath, { force: true, recursive: true });
};

const copyRecursiveAsync = async function (src, dest) {
  const stats = await fs.promises.stat(src, { withFileTypes: true });
  if (stats.isDirectory()) {
    await fs.promises.mkdir(dest, { recursive: true });
    const files = await fs.promises.readdir(src, { withFileTypes: true });
    files.forEach((file) => {
      copyRecursiveAsync(
        path.join(src, `${file.name}`),
        path.join(dest, `${file.name}`)
      );
    });
  } else {
    await fs.promises.copyFile(src, dest);
  }
};

const copyDirectory = async (src, dist) => {
  await removeDir(fileCopyPath);
  await copyRecursiveAsync(filesPath, fileCopyPath);
};

copyDirectory(filesPath, fileCopyPath);

/**
 * This is old version with no remove function and promise
 */

/* const fs = require("fs");
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

copyRecursiveAsync(filesPath, fileCopyPath); */

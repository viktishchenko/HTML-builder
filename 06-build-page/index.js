const fs = require("fs");
const path = require("path");

async function startModuleBuilder() {
  await fs.promises.mkdir(path.join(__dirname, "project-dist"), {
    recursive: true,
  });

  const createIndex = async function () {
    const templateFile = await fs.promises.readFile(
      path.join(__dirname, "template.html")
    );

    await fs.promises.writeFile(
      path.join(__dirname, "project-dist", "index.html"),
      templateFile
    );

    const readIndexFile = await fs.promises.readFile(
      path.resolve(__dirname, "project-dist", "index.html"),
      "utf8"
    );
    return readIndexFile;
  };
  createIndex();

  const findPartialsName = async function () {
    const getIndex = await createIndex();
    return getIndex.match(/{{[a-z]+}}/g);
  };
  findPartialsName();

  const replacePartials = async function () {
    const files = await findPartialsName();
    for (const file of files) {
      const partials = file.replace(/({{)|(}})/g, "");
      const partialsContents = await fs.promises.readFile(
        path.join(__dirname, "components", `${partials}.html`),
        "utf-8"
      );

      const oldIndexHtml = await fs.promises.readFile(
        path.join(__dirname, "project-dist", "index.html"),
        "utf-8"
      );

      const replacePartials = oldIndexHtml.replace(file, partialsContents);

      await fs.promises.writeFile(
        path.join(__dirname, "project-dist", "index.html"),
        replacePartials
      );
    }
  };
  replacePartials();

  async function createCssFile(src, dest) {
    const output = fs.createWriteStream(dest);

    const files = await fs.promises.readdir(src);
    if (files) {
      files.forEach((file) => {
        const extname = path.extname(file);
        if (extname === ".css") {
          const stream = fs.createReadStream(path.join(src, file));
          stream.pipe(output);
        }
      });
    }
  }
  createCssFile(
    path.join(__dirname, "styles"),
    path.join(__dirname, "project-dist", "style.css")
  );

  const copyRecursiveAsync = async function (src, dest) {
    await fs.promises.rm(dest, {
      recursive: true,
      force: true,
    });
    const statFunc = await fs.promises.stat(src, { withFileTypes: true });
    if (statFunc.isDirectory()) {
      await fs.promises.mkdir(dest, { recursive: true });
      const files = await fs.promises.readdir(src, { withFileTypes: true });
      if (files) {
        files.forEach((file) => {
          copyRecursiveAsync(
            path.join(src, `${file.name}`),
            path.join(dest, `${file.name}`)
          );
        });
      }
    } else {
      fs.copyFile(src, dest, (err) => {
        if (err) throw err;
      });
    }
  };

  copyRecursiveAsync(
    path.join(__dirname, "assets"),
    path.join(__dirname, "project-dist", "assets")
  );
}

startModuleBuilder();

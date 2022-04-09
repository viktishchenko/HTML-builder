#!/ust/bin/env node

import { getArgs } from "./helpers/args.js";

const initCli = () => {
  const args = getArgs(process.argv);
  console.log("args:>>", args.s);
  if (args.h) {
    // Вывод help
  }
  if (args.s) {
    // Сохранить город
  }
  if (args.t) {
    // Сохранить токен
  }
  // Вывести погоду
};

initCli();

// import { characters, greet } from "./characters.mjs";
// import char, { characters, greet as hello } from "./characters.mjs";

// import { characters } from "./characters.mjs";

// for (const c of characters) {
//   hello(c);
// }
// for (const c of char.characters) {
//   char.greet(c);
// }
// char(); // log

/**
 * Поздравляю: Фродо
 * Поздравляю: Бильбо
 */

// асинхронный динамический импорт модулей
async function main() {
  try {
    const { characters, greet } = await import("./charactersХУЭКС.mjs");
    for (const c of characters) {
      greet(c);
    }
  } catch (error) {
    console.log("Ошибка");
  }
}
// async function main() {
//   const { characters, greet } = await import("./characters.mjs");
//   for (const c of characters) {
//     greet(c);
//   }
// }

main();

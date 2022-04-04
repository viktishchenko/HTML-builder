// const log = require("./characters.js");

// const { stealRings, characters } = require("./characters.js");

// let myChars = characters;
// myChars = stealRings(characters, "Фродо");

// for (const c of characters) {
//   console.log(c);
//   /**
//    *  { name: 'Фродо', hasRing: true }
//    *  { name: 'Бильбо', hasRing: false }
//    */
// }

// log(); // log

// const a = 1;
// if (a > 0) {
//   const log = require("./characters");
//   log();
//   /**
//    * Загружено characters.js
//    * log
//    */
// } else {
//   console.log("Меньше 0");
// }

const a = 0;
if (a > 0) {
  const log = require("./characters");
  log();
  /**
   * Загружено characters.js
   * log
   */
} else {
  console.log("Меньше 0"); // Меньше 0 !!!
}

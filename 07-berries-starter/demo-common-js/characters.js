/* let characters = [
  { name: "Фродо", hasRing: false },
  { name: "Бильбо", hasRing: false },
];

function stealRings(characters, owner) {
  return characters.map((el) => {
    if (el.name === owner) {
      el.hasRing = true;
    } else {
      el.hasRing = false;
    }
  });
} */

console.log("Загружено characters.js");

// module.exports = { characters, stealRings };
module.exports = function log() {
  console.log("log");
};

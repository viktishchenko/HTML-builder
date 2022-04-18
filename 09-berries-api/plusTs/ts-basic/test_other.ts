/**
 * typeof - проверка на типы, присваивание типа
 * keyof - получение ключей в виде типов для
 * типизации в ключах объектов
 */

// typeof
let as = "Привет";

if (typeof as === "string") {
}

let b: typeof as; // b: string

//keyof
type Coord = {
  lat: number;
  long: number;
};

type P = keyof Coord; // only lat or long

let c: P = "long";
let d: P = "lat";

/**
 * null & optional chaining (?)
 */

function log(a: string | null) {
  // a?.toLowerCase();
  // OR
  if (a === null) {
    return "null";
  } else {
    a.toLowerCase();
  }
}

/**
 * bigint
 * simbol - когда нужно создать
 *  уникальное значение
 */
const bi: bigint = BigInt(100);
const si: symbol = Symbol("qwerty");
const di: symbol = Symbol("qwerty");

let a: number = 5;
let b: string = "4";

let c: number = a + Number(b);

let d = true;

let names: string[] = ["dsf", "sdfwer"];
let ages: number[] = [23, 45];

/**
 * tuple - ограниченный массив, определенной
 * длины, определенных елеменов
 * пушить можем, но достать нет tup[2]→err
 */
let tup: [number, string] = [24, "ewr"];
tup.push("retret");
tup[1];

// functions
function greet(name: string): string {
  return name + "Hi";
}

names.map((x: string) => x);

/**
 * objects - ? - означает что свойство может быть
 * указанного типа или undefined
 */
function coord(coord: { lat: number; long?: number }) {}

// union type
let universalId: number | string = 5;
universalId = "4";

function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

function helloUser(user: string | string[]) {
  if (Array.isArray(user)) {
    console.log(user.join(", ") + "Hi!");
  } else {
    console.log(user + " Hi!");
  }
}

// type
type coords = { lat: number; long: number };

function compute(coord: coords) {}

// and interface
interface ICoord {
  lat: number;
  long: number;
}

function computes(coord: ICoord) {}

// type - может быть использован для простых типов
type ID = number | string;

// extend (расширение типов)
interface Animal {
  name: string;
}

interface Dog extends Animal {
  // необязательное свойство ?
  tail?: boolean;
  //   tail: boolean;
}

const dog: Dog = {
  name: "Sharik",
  //   tail: false,
};

// type extend расширение типов
type Animals = {
  name: string;
};

type Dogs = Animals & {
  tail?: boolean;
};

const cat: Dogs = {
  name: "Murka",
  //    tail: true
};

// merge interface
interface Dogi {
  tail: boolean;
}

interface Dogi {
  name: string;
}

const dogi: Dogi = {
  name: "Shishka",
  tail: false,
};

/**
 * КЛЮЧЕВЫЕ ОТЛИЧИЯ TYPE & INTERFACE
 *
 * Types не могут учавствовать в слиянии определений
 *
 * Interfaces могут определять только объекты, а не примитивы
 *
 * !!! Всегда использовать interface, если только, не нужна
 *     какая-то фича types
 */

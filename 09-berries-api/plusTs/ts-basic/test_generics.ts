/**
 * generics - унверсальные функции для различных
 * типов переменных и аналогичные классы
 */

// Вместо
function logs(obj: string): string {
  console.log(obj);
  return obj;
}
function logs2(obj: number): number {
  console.log(obj);
  return obj;
}

// Используем Generic
function log<T>(obj: T): T {
  // T,F,TYPE
  console.log(obj);
  return obj;
}
log<string>("qwerty");
log<number>(5);

/**
 * Используем Generic (T - абсолютно либой тип или объект)
 * или несколько
 */
function log2<T, K>(obj: T, arr: K[]): K[] {
  console.log(obj);
  return arr;
}
log2<string, number>("qwerty", [1, 2, 3]);

interface HasLength {
  length: number;
}

function log3<T extends HasLength, K>(obj: T, arr: K[]): K[] {
  obj.length;
  console.log(obj);
  return arr;
}

// Вместо
interface IUser {
  name: string;
  age: number;
  //   bid: (sum: number) => boolean;
  bid: <T>(sum: T) => boolean;
}

/*function bid(sum: number) {
  return true;
} */

function bid<T>(sum: T): boolean {
  return true;
}

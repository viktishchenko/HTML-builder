class Coord {
  //   message = "1";
  lat: number;
  long: number;

  protected test() {
    if (this.lat > 0) {
      // do smth
    }
  }

  computeDistance(newLat: number, newLong: number): number {
    //   this.test() // yepp!
    return 0;
  }

  /**
   * "strictPropertyInitialization": false
   * с true без инициализации свойств не работает!
   * ! знак после объявленного свойства позволит
   * продолжить как есть, Н:  lat!: number
   */
  constructor(lat: number, long: number) {
    this.lat = lat;
    this.long = long;
    // console.log(this.message);
  }
}

const point = new Coord(0, 1);
point.lat;
point.long;

// Наследование в классах
class MapLocation extends Coord {
  //   name: string;

  /**
   * Add Getter & Setter
   * Лучше делать приватными исходные значения
   * и видимыми только getter и setter!
   */
  private _name: string;

  get name() {
    return this._name;
  }

  set name(s: string) {
    // можем добавить логику
    this._name = s + "_smth";
  }

  // override method
  override computeDistance(newLat: number, newLong: number): number {
    // console.log(this.name);
    console.log(this._name);
    this.test(); // yepp!
    return 0;
  }

  constructor(lat: number, long: number, name: string) {
    // Не забывать инициализировать super
    super(lat, long);
  }
}

/**
 * Абстрактный интерфейс описывает работу класса
 * Или может быть, например, адаптером связывающим работу
 * двух или нескольких классов
 */
interface LoggerService {
  log: (s: string) => void;
}

// Реализация класса имплементирующего методы интерфейса
class Logger implements LoggerService {
  log(s: string) {
    console.log(s);
  }
}

/**
 * Модификаторы public
 * private - доступен только в текущем классе
 * не не в наследнике
 * protected - доступен в классе и наследнике,
 * но не в инстансе наследника, т.е
 *
 * const loc = new MapLocation(0, 1, "qwerty");
 * loc.test() // nope!
 */

class Loggers implements LoggerService {
  public log(s: string) {
    console.log(s);
  }
  private secret(info: string) {
    console.log(info);
  }
  private a = "qwertyA";
  b = "qwertyB";
}

const s = new Loggers();
s.log; // yepp!
// s.secret // nope!
s.b; // yepp!
// s.a // nope!

/**
 * let's static
 * не нужно создавать инстанс класса,
 * можно обращаться напрямую!
 */

class MyClass {
  static a = "1";
}

MyClass.a; // yepp!

// Class und generic

class MyNewClass<T> {
  b: T;
}

const c = new MyNewClass<string>();
// будет строкой
c.b; // yepp! b: string

/**
 * Abstract class - не можем создать инстранс,
 * но можем создать наследника. Существует только
 * в компайл тайм, в коде ничего не будет!
 */

abstract class Base {
  print(s: string) {
    console.log(s);
  }
  // Абстрактный метод
  abstract error(s: string): void;
}

/**
 * const res = new Base() // Нельзя создать инстанс
 * абстрактного класса, но можно наследоваться (extends)
 */

class BaseExtended extends Base {
  a: string;
  error(s: string): void {
    console.log("Обязателен в наследнике!");
  }
}

const bs = new BaseExtended();
bs.a;
bs.print("qwerty");

// Сужение класса

class Animal {
  name: string;
}

class Dog {
  name: string;
  tail: boolean;
}

const puppy: Animal = new Dog();
puppy.name; // Наследутся только имя, т.е. класс сужен

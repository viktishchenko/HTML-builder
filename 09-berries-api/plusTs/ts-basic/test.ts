// Собственно декоратор
/* function Component(target: Function) {
  console.log("init");
} */

// Объявляем декоратор
/* @Component
export class User {
  id: number;

  updateId(newId: number) {
    this.id = newId;
    return this.id;
  }
} */

//--------------res-------------
// [class User]

/**
 * Перепишем декоратор для передачи
 * данных, Н: (id)
 */

/* function Component(id: number) {
  console.log("init component");
  return (target: Function) => {
    console.log("run component");
    target.prototype.id = id;
  };
}

// Добавим еще один декоратор
function Logger() {
  console.log("init logger");
  return (target: Function) => {
    console.log("run logger");
  };
} */

/* @Logger()
@Component(1)
export class User {
  id: number;

  updateId(newId: number) {
    this.id = newId;
    return this.id;
  }
}

console.log(new User().id); */

//------------res----------
/**
 * init component
 * run component
 * 1
 */

//------------res2---------
/**
 * Последовательность выполнения:
 * ВЫЗОВ: СНИЗУ ВВЕРХ
 * ИСПОЛНЕНИЕ: СВЕРХУ ВНИЗ
 *
 * init logger
 * init component
 * run component
 * run logger
 * 1
 */

// Декорирование методов

/* function Component(id: number) {
  console.log("init component");
  return (target: Function) => {
    console.log("run component");
    target.prototype.id = id;
  };
}

// Добавим еще один декоратор
function Logger() {
  console.log("init logger");
  return (target: Function) => {
    console.log("run logger");
  };
} */

// Декоратор для функции
/* function Method(
  target: Object,
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor
) {
  console.log(propertyKey);
  // const oldValue = propertyDescriptor.value;
  propertyDescriptor.value = function (...args: any[]) {
    return args[0] * 10;
  };
}
 */
/* @Logger()
@Component(1)
export class User {
  id: number;

  @Method // propertyKey
  updateId(newId: number) {
    this.id = newId;
    return this.id;
  }
} */

// console.log(new User().id);
//------------res---------
/**
 * updateId
 * init logger
 * init component
 * run component
 * run logger
 * 1
 */

// console.log(new User().id);

// console.log(new User().updateId(2)); // 20

/* function Component(id: number) {
  console.log("init component");
  return (target: Function) => {
    console.log("run component");
    target.prototype.id = id;
  };
}

// Добавим еще один декоратор
function Logger() {
  console.log("init logger");
  return (target: Function) => {
    console.log("run logger");
  };
}

// Декоратор для функции
function Method(
  target: Object,
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor
) {
  console.log(propertyKey);
  // const oldValue = propertyDescriptor.value;
  propertyDescriptor.value = function (...args: any[]) {
    return args[0] * 10;
  };
}

// Декоратор для свойства
function Prop(target: Object, propertyKey: string) {
  let value: number;

  const getter = () => {
    console.log("get Prop");
    return value;
  };
  const setter = (newValue: number) => {
    console.log("set Prop");
    return (value = newValue);
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
}

@Logger()
@Component(1)
export class User {
  // id: number;
  @Prop id: number;

  @Method // propertyKey
  updateId(newId: number) {
    this.id = newId;
    return this.id;
  }
}

console.log(new User().id);
console.log(new User().updateId(2)); */

//------------res2---------
/**
 * updateId
 * init logger
 * init component
 * run component
 * set Prop
 * run logger
 * get Prop
 * 1
 * 20
 */

function Component(id: number) {
  console.log("init component");
  return (target: Function) => {
    console.log("run component");
    target.prototype.id = id;
  };
}

// Добавим еще один декоратор
function Logger() {
  console.log("init logger");
  return (target: Function) => {
    console.log("run logger");
  };
}

// Декоратор для функции
function Method(
  target: Object,
  propertyKey: string,
  propertyDescriptor: PropertyDescriptor
) {
  console.log(propertyKey);
  // const oldValue = propertyDescriptor.value;
  propertyDescriptor.value = function (...args: any[]) {
    return args[0] * 10;
  };
}

// Декоратор для свойства
function Prop(target: Object, propertyKey: string) {
  let value: number;

  const getter = () => {
    console.log("get Prop");
    return value;
  };
  const setter = (newValue: number) => {
    console.log("set Prop");
    return (value = newValue);
  };

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
  });
}

// Декоратор параметров
function Param(target: Object, propertyKey: string, index: number) {
  console.log(propertyKey, index, "<< Param");
  //---------res--------
  // updateId 0 << Param
}

@Logger()
@Component(1)
export class User {
  // id: number;
  @Prop id: number;

  @Method // propertyKey
  updateId(@Param newId: number) {
    this.id = newId;
    return this.id;
  }
}

console.log(new User().id);
console.log(new User().updateId(2));

/**
 * EventEmitter
 */

const EventEmitter = require("events");

const myEmitter = new EventEmitter();

const logDbConnection = () => {
  console.log("DB connected");
};

// добавляем слушателя (подписчик события)
myEmitter.addListener("connected", logDbConnection);
// добавляем событе
myEmitter.emit("connected");

// для предотвращения утечки памяти через слушателей удаляем их
// конкретного
myEmitter.removeListener("connected", logDbConnection);
// или
// myEmitter.off("connected", logDbConnection);
// удаляем всех слушателей (принимает только ивенты)
// myEmitter.removeAllListeners("connected");

/**
 * добавляем событие, видим в консоле только лог первого события,
 * если залочить удаление слушателя, то их будет два
 */
myEmitter.emit("connected");

// другой вариант подключения слушателя
myEmitter.on("msg", (data) => {
  console.log("Ответ: " + data);
});

myEmitter.on("msg", (data) => {
  console.log("А ВОТ ЕЩЁ! Получи сообщение!");
});

/**
 * Возможность поставить слушателя выше других:
 * prependListener
 */

myEmitter.prependListener("msg", () => {
  console.log("Prepend →");
});

myEmitter.emit("msg", "Привет! Получи сообщение!");

// слушатель, который подключается однажды и удаляется сам

myEmitter.once("check", () => {
  console.log("call ones");
});

myEmitter.emit("check"); // call ones
myEmitter.emit("check"); // absolutley nothing

/**
 * Можем добавить ограничение по колличеству слушателей
 * (по умолчанию их 10)
 * и по его достижению получить ворнинг
 */

console.log(myEmitter.getMaxListeners()); // 10
myEmitter.setMaxListeners(3);
console.log(myEmitter.getMaxListeners()); // 3

/**
 * Можем посчитаем колличество слушателей
 */
console.log(myEmitter.listenerCount("msg")); // 3 (продолжает существовать)
console.log(myEmitter.listenerCount("check")); // 0 (удалили запустив однажды - once)

/**
 * Можем получить массив слушателей по мере появления в коде
 */

console.log(myEmitter.listeners("msg")); // [[Function(anonymous)], [Function(anonymous)]];

/**
 * Можем получить массив имен слушателей на ивент эмиттере (myEmitter)
 */

console.log(myEmitter.eventNames()); // ['msg']

/**
 * Можем добавить обработчик ошибок
 */

myEmitter.on("error", (err) => {
  console.log(`Произошла ошибка: ${err.message}`);
});

myEmitter.emit("error", new Error("Это сообщени об ошибке!")); //error fatal vs // Произошла ошибка: Это сообщени об ошибке!

/**
 * EventTarget
 */

const target = new EventTarget();

const logTarget = () => {
  console.log("Connected to target");
};

// Добавляем слушатель и обработчик
target.addEventListener("connected", logTarget);
// Вызываем ивент-таргет
target.dispatchEvent(new Event("connected"));

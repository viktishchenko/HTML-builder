// Таймеры

// const start = performance.now();
// setTimeout(() => {
//   console.log(performance.now() - start);
//   console.log("Прошла секунда");
// }, 1000);

/* 
    1006.79390001297
    Прошла секунда

*/

// function myFunc(args) {
//   return console.log(`Аргумент => ${args}`);
// }

// setTimeout(myFunc, 1200, "Зеленый");

/* 
Аргумент => Зеленый
*/

// const timerId = setTimeout(() => {
//   console.log("Время вышло!"); // Время вышло!
// }, 5000);

// setTimeout(() => {
//   clearTimeout(timerId);
//   console.log("Успели!"); // Успели!
// }, 1000);

// Интервалы

// const intervalId = setInterval(() => {
//   console.log(performance.now());
// }, 1000);

// setTimeout(() => {
//   clearInterval(intervalId);
//   console.log("Очищено!"); // Очищено!
// }, 5000);

// Set immediate

// console.log("Перед");

// setImmediate(() => {
//   console.log("После всего!");
// });

// console.log("После");

const timerId = setTimeout(() => {
  console.log("Время вышло!"); // Время вышло!
}, 5000);

timerId.unref(); // Удаляем ссылку на таймер из стека вызовов

setImmediate(() => {
  timerId.ref(); // Ставим таймер на место после опустошения стека вызовов
});

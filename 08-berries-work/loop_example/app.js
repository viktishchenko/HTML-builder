/**
 * Фазы
 *  // nextTick, microtaskQueue
 * -- таймеры
 *  // nextTick, microtaskQueue
 * -- pending callbacks
 *  // nextTick, microtaskQueue
 * -- idle, prepare
 *  // nextTick, microtaskQueue
 * -- poll
 *  // nextTick, microtaskQueue
 * -- check
 *  // nextTick, microtaskQueue
 * -- close callback
 *
 * --- проверка на окончание
 */

const fs = require("fs");

console.log("Init 1"); // 1

setTimeout(() => {
  console.log(performance.now(), "Timer 5"); // 5
}, 100);

setImmediate(() => {
  console.log("Immediate 3"); // 3
});

fs.readFile(__filename, () => {
  console.log("File readed 4"); // 4
});

// наглухо блокируем поток
setTimeout(() => {
  for (let i = 0; i < 100000000; i++) {} // 1e10
  console.log("Done");
  Promise.resolve().then(() => {
    console.log("Promise from block sream");
  });
  process.nextTick(() => {
    console.log("tick from block sream");
  });
}, 0);

/* 
Init 1
Final 2
Done
Immediate 3
11758.004099994898 Timer 5 // ~ 12sec!!!
File readed 4

*/

Promise.resolve().then(() => {
  console.log("Promise");
});

/* 
Init 1
Final 2
Promise // !!!
Done
Immediate 3
181.3235999941826 Timer 5
File readed 4
*/

/* 

// С промисом в блокинующем потоке

Init 1
Final 2
Promise
Done
Promise from block sream
Immediate 3
147.58149999380112 Timer 5
File readed 4
*/

// Добавляе nextTick

process.nextTick(() => {
  console.log("tick");
});

/*

Init 1
Final 2
tick
Promise
Done
Promise from block sream
Immediate 3
146.43590000271797 Timer 5
File readed 4

*/

/* 

// С тиком внутри блокинующего стрим таймаута

Init 1
Final 2
tick   
Promise
Done
tick from block sream
Promise from block sream
Immediate 3
149.145300000906 Timer 5
File readed 4

*/

console.log("Final 2"); // 2

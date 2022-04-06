# нода

<details>
<summary>
node
</summary>

![работа ивент-луп в ноде](./assets/node_event_loop.jpg)

![работа ивент-луп в ноде](./assets/event_loop_phase.jpg)

![работа ивент-луп в ноде](./assets/other_events.jpg)

![работа ивент-луп в ноде](./assets/full_picture.jpg)

</details>

<details>
<summary>
timers
</summary>

```javascript
// Таймеры

const start = performance.now();
setTimeout(() => {
  console.log(performance.now() - start);
  console.log("Прошла секунда");
}, 1000);

/* 
    1006.79390001297
    Прошла секунда

*/

function myFunc(args) {
  return console.log(`Аргумент => ${args}`);
}

setTimeout(myFunc, 1200, "Зеленый");

/* 
Аргумент => Зеленый
*/

const timerId = setTimeout(() => {
  console.log("Время вышло!"); // Время вышло!
}, 5000);

setTimeout(() => {
  clearTimeout(timerId);
  console.log("Успели!"); // Успели!
}, 1000);

// Интервалы

const intervalId = setInterval(() => {
  console.log(performance.now());
}, 1000);

setTimeout(() => {
  clearInterval(intervalId);
  console.log("Очищено!"); // Очищено!
}, 5000);

//  Set immediate

console.log("Перед");

setImmediate(() => {
  console.log("После всего!");
});

console.log("После");

const timerId = setTimeout(() => {
  console.log("Время вышло!"); // Время вышло!
}, 5000);

timerId.unref(); // Удаляем ссылку на таймер из стека вызовов

setImmediate(() => {
  timerId.ref(); // Ставим таймер на место после опустошения стека вызовов
});
```

</details>

<details>
<summary>
loop examples
</summary>

```javascript
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
```

</details>

<details>

<summary>
worker_threadpool
</summary>

![worker_threadpool](./assets/worker_simple.jpg)

![worker_threadpool](./assets/worker_treads.jpg)

![worker_threadpool](./assets/worker_tread_how.jpg)

```javascript
const crypto = require("crypto");
const https = require("https");
const start = performance.now();

// По умолчанию threadpool 4
// Расширяем threadpool до 8 (Добавляем количество ядер(если есть 😀))
// process.env.UV_THREADPOOL_SIZE = 8;

for (let i = 0; i < 50; i++) {
  crypto.pbkdf2("test", "salt", 100000, 64, "sha512", () => {
    console.log(performance.now() - start);
  });
}

/* 
Результат выполнения 6!? потов, хотя ядер 4!!!
96.38879999518394
295.51719999313354
327.93819999694824
334.14139997959137
366.3380999863148
373.32580000162125
402.23960000276566
414.2436999976635
437.37869998812675
451.6803999841213
481.2057999968529
488.104699999094
519.1632999777794
523.1061999797821
554.6812999844551
581.9551999866962
595.3499999940395
598.2703999876976
623.1340000033379
631.7367999851704
633.043399989605
640.0837000012398
659.092099994421
667.0776000022888
737.974799990654
751.0632999837399
773.0710999965668
790.9574999809265
845.9365999996662
849.981299996376
866.9361999928951
898.9300000071526
956.9696999788284
965.9804999828339
972.8725999891758
1005.860799998045
1062.868900001049
1084.2096000015736
1090.901699990034
1117.9384000003338
1168.8398000001907
1187.8264999985695
1202.804699987173
1236.8134999871254
1279.7967999875546
1293.3057999908924
1316.1898999810219
1332.349900007248
1373.7769999802113
1382.5825999975204
*/

// Запросы, которые не влияют на threadpool

for (let i = 0; i < 50; i++) {
  https.get("https://yandex.ru", (res) => {
    res.on("data", () => {});
    res.on("end", () => {
      console.log(performance.now() - start);
    });
  });
}

/* 
458.00110000371933
463.1627999842167
493.9855000078678
495.46829998493195
496.70120000839233
497.69319999217987
499.7964000105858
500.5945999920368
501.8966999948025
503.07039999961853
503.98859998583794
504.87770000100136
505.6139000058174
506.74090000987053
507.82289999723434
508.83640000224113
509.7669000029564
510.71540001034737
512.2694999873638
513.254399985075
513.9889000058174
518.5178999900818
519.1917999982834
519.8768999874592
520.8673999905586
521.8348000049591
522.7111999988556
523.731299996376
524.6802999973297
525.6238999962807
529.4460000097752
530.277999997139
531.6762999892235
532.4494999945164
533.243900001049
533.9716999828815
534.6845000088215
535.4000000059605
537.6881999969482
538.3549999892712
539.0787000060081
540.1184000074863
542.2148000001907
543.8838999867439
544.4783000051975
551.4601999819279
552.4876999855042
553.1699000000954
553.8366000056267
561.3499999940395
*/
```

</details>

<details>
<summary>
check performance
</summary>

```javascript
/**
 * Измеряем производительность
 */

function slow() {
  // mark start
  performance.mark("start");
  const arr = [];
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i);
  }
  //   mark end
  performance.mark("end");
  //   сравнение: имя,старт,конец
  performance.measure("slowpok", "start", "end");
  console.log(performance.getEntriesByName("slowpok"));
}

slow();

/* 
[
  PerformanceMeasure {
    name: 'slowpok',
    entryType: 'measure',        
    startTime: 36.49810001254082,
    duration: 1380.7465000152588,
    detail: null
  }
]

*/

/**
 * Добавляем хук
 */

const perf_hooks = require("perf_hooks");

// Добавляем измерение функции
test = perf_hooks.performance.timerify(test);

// hook
const performanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    console.log(items.getEntries());
    const entry = items.getEntriesByName("slowpok").pop();
    console.log(`${entry.name}: ${entry.duration}`);
    observer.disconnect();
  }
);

// Запускаем обозреватель
performanceObserver.observe({ entryTypes: ["measure", "function"] });

// измеряемая функции
function test() {
  const arr = [];
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i);
  }
}

function slow() {
  // mark start
  performance.mark("start");
  const arr = [];
  for (let i = 0; i < 100000000; i++) {
    arr.push(i * i);
  }
  //   mark end
  performance.mark("end");
  //   сравнение: имя,старт,конец
  performance.measure("slowpok", "start", "end");
}

slow();
test();

/* 
[
  PerformanceMeasure {
    name: 'slowpok',
    entryType: 'measure',
    startTime: 39.90760001540184, 
    duration: 1416.0884000062943, 
    detail: null
  },
  PerformanceEntry {
    name: 'test',
    entryType: 'function',        
    startTime: 1456.9886000156403,
    duration: 1429.3267999887466, 
    detail: []
  }
]
slowpok: 1416.0884000062943

*/
```

</details>

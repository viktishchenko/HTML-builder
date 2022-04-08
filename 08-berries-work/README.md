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

<details>
<summary>
threadpool performance
</summary>

## [without workers →](./threadpool/app.js)

```javascript

PerformanceMeasure {
  name: 'main',
  entryType: 'measure',
  startTime: 42.00750000006519,
  duration: 1241.6738999998197, // look ta this ...
  detail: null
}

// with timeout
console.log(

[
  [
    1.5511210043330986e+25,
    2432902008176640000,
    121645100408832000,
    1.2413915592536073e+61,
    2.6525285981219103e+32,
    3.0414093201713376e+64
  ],
  [
    1.5511210043330986e+25,
    2432902008176640000,
    121645100408832000,
    1.2413915592536073e+61,
    2.6525285981219103e+32,
    3.0414093201713376e+64
  ],
  [
    1.5511210043330986e+25,
    2432902008176640000,
    121645100408832000,
    1.2413915592536073e+61,
    2.6525285981219103e+32,
    3.0414093201713376e+64
  ],
  [
    1.5511210043330986e+25,
    2432902008176640000,
    121645100408832000,
    1.2413915592536073e+61,
    2.6525285981219103e+32,
    3.0414093201713376e+64
  ]
]
PerformanceMeasure {
  name: 'main',
  entryType: 'measure',
  startTime: 41.319200000027195,
  duration: 1213.412200000137,
  detail: null
}

:>>> timeout200msec // поток блокируется!!!

)

```

## [with workers →](./threadpool/app-worker.js)

```javascript

PerformanceMeasure {
  name: 'main',
  entryType: 'measure',
  startTime: 40.57039999985136,
  duration: 393.6186000001617, // a!? you see how it's work ☜(ﾟヮﾟ☜)
  detail: null
}

// with timeout
console.log(

:>>> timeout200msec   // поток не блокируется!!!

это цё thread:>> 1
это цё thread:>> 4
это цё thread:>> 2
это цё thread:>> 3
[
  [
    1.5511210043330986e+25,
    2432902008176640000,
    121645100408832000,
    1.2413915592536073e+61,
    2.6525285981219103e+32,
    3.0414093201713376e+64
  ],
  [
    1.5511210043330986e+25,
    2432902008176640000,
    121645100408832000,
    1.2413915592536073e+61,
    2.6525285981219103e+32,
    3.0414093201713376e+64
  ],
  [
    1.5511210043330986e+25,
    2432902008176640000,
    121645100408832000,
    1.2413915592536073e+61,
    2.6525285981219103e+32,
    3.0414093201713376e+64
  ],
  [
    1.5511210043330986e+25,
    2432902008176640000,
    121645100408832000,
    1.2413915592536073e+61,
    2.6525285981219103e+32,
    3.0414093201713376e+64
  ]
]
PerformanceMeasure {
  name: 'main',
  entryType: 'measure',
  startTime: 40.88679999997839,
  duration: 364.01010000007227,
  detail: null
}
Завершил работу
Завершил работу
Завершил работу
Завершил работу

)

```

</details>

<details>
<summary>
spawn & exec & fork
</summary>

### [exec →](./spawn_exec/app.js)

```javascript
// Запуск параллельных процессов

const { exec } = require("child_process");

const childProcess = exec("dir", (err, stdout, stderr) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});

childProcess.on("exit", (code) => {
  console.log(`Код выхода: ${code}`);
});

/* 
Кодировка в консоли: chcp
Варианты: 866 (русский в DOS) | 1251 (Windows-1251) | 65001 (UTF-8)
Например: chcp 65001

Код выхода: 0
stdout:  Volume in drive C has no label.
 Volume Serial Number is ...

 Directory of C:\Users\...\spawn_exec

07.04.2022  10:45    <DIR>          .
07.04.2022  10:45    <DIR>          ..
07.04.2022  10:33               429 app.js
07.04.2022  10:45                30 example1.js
07.04.2022  10:45                31 example2.js
               3 File(s)            490 bytes
               2 Dir(s)  526 686 638 080 bytes free

stderr:

*/
```

### [app-spawn →](./spawn_exec/app-spawn.js)

```javascript
// Запуск параллельных процессов

const { spawn } = require("child_process");

const childProcess = spawn("ls");

// console.log("childProcess :>> ", childProcess);

childProcess.stdout.on("data", (data) => {
  console.log(`Stdout: ${data}`);
});

childProcess.stderr.on("data", (data) => {
  console.log(`Stderr: ${data}`);
});

childProcess.on("exit", (code) => {
  console.log(`Код выхода: ${code}`);
});

// Не работает → выход с ошибкой
```

### [app-fork →](./spawn_exec/app-fork.js)

`app-fork.js`

```javascript
// Запуск параллельных процессов

const { fork } = require("child_process");

const forkProcess = fork("./fork.js");

forkProcess.on("message", (msg) => {
  console.log(`Получено сообщение: ${msg}`);
});

forkProcess.on("close", (code) => {
  console.log(`Exited: ${code}`);
});

forkProcess.send("Ping");
forkProcess.send("disconnect");
```

`fork.js`

```javascript
process.on("message", (msg) => {
  if (msg === "disconnect") {
    process.disconnect();
    return;
  }
  console.log(`Клиент получил: ${msg}`);
  process.send("Pong!");
});

/* 

Клиент получил: Ping
Получено сообщение: Pong!
Exited: 0

*/
```

</details>

<details>
<summary>
thread performance
</summary>

### [thread performance →](./thread_perform/app.js)

```javascript
const { Worker } = require("worker_threads");
const { performance, PerformanceObserver } = require("perf_hooks");
const { fork } = require("child_process");

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(`${entry.name}: ${entry.duration}`);
  });
});

// что будем обозревать
performanceObserver.observe({ entryTypes: ["measure"] });

const workerFunction = (array) => {
  return new Promise((resolve, reject) => {
    performance.mark("worker start");

    const worker = new Worker("./worker.js", {
      workerData: { array },
    });

    worker.on("message", (msg) => {
      performance.mark("worker end");
      performance.measure("worker", "worker start", "worker end");
      resolve(msg);
    });
  });
};

const forkFunction = (array) => {
  return new Promise((resolve, reject) => {
    performance.mark("fork start");

    const forkProcess = fork("./fork.js");
    forkProcess.send({ array });
    forkProcess.on("message", (msg) => {
      performance.mark("fork end");
      performance.measure("fork", "fork start", "fork end");
      resolve(msg);
    });
  });
};

const main = async () => {
  await workerFunction([25, 20, 19, 48, 30]);
  await forkFunction([25, 20, 19, 48, 30]);
};

main();

/* 

worker: 260.06650000065565
fork: 262.4112999998033

*/

// with file.mp4 😵

/* 

worker: 397.77790001034737
fork: 13684.067000001669

*/
```

![worker_vs_fork](./assets/worker_vs_fork.jpg)

![worker_vs_fork](./assets/worker_und_fork.jpg)

### conclusion: use worker (╯°□°）╯︵ ┻━┻

</details>

<details>
<summary>
v8
</summary>

![v8](./assets/v8.jpg)

![abstract syntax tree](./assets/ast.jpg)

![bytecode](./assets/bytecode.jpg)

![compiler](./assets/compiler.jpg)

![broke optimisation](./assets/broke_optimisation.jpg)

![how optimize](./assets/how_optimize.jpg)

![garbage](./assets/garbage.jpg)

![how clean](./assets/how_clean.jpg)

![may clean](./assets/may_clean.jpg)

![may not clean](./assets/may_not_clean.jpg)

![can clean](./assets/can_clean.jpg)

![tri color mark](./assets/tri_color_mark.jpg)

![tri color mark how](./assets/tri_color_mark_how.jpg)

![memory](./assets/memory.jpg)

![stop copy](./assets/stop_copy.jpg)

![is stop](./assets/is_stop.jpg)

![v8 plus](./assets/v8_plus.jpg)

![v8 plus how](./assets/v8_plus_how.jpg)

![clinic doctor](./assets/clinic_doctor.jpg)

```javascript
let outer = null;
let run = function () {
  let inner = outer;
  let unused = function () {
    if (inner) {
      console.log("hi");
    }
  };
  outer = {
    longStr: new Array(1000000).join("*"),
  };
};

setInterval(run, 1000);
```

</details>

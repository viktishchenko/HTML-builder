/**
 * Измеряем производительность
 */

/* function slow() {
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

slow(); */

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

const { Worker } = require("worker_threads");
const { performance, PerformanceObserver } = require("perf_hooks");
const { fork } = require("child_process");
const { readFileSync } = require("fs");

// Добавим файл
const file = readFileSync("../assets/file.mp4");

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
      // Добавим файл в дату
      workerData: { array, file },
      //   workerData: { array },
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
    // Добавим файл и сюда
    forkProcess.send({ array, file });
    // forkProcess.send({ array });
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

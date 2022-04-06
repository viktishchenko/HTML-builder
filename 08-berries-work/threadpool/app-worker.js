/**
 * Предеделываем app в асинхронный воркер
 */

const { Worker } = require("worker_threads");

const compute = (array) => {
  return new Promise((resolve, reject) => {
    /**
     * На веб-сервере число воркеров НУЖНО ограниничивать, иначе легко задидосить такой сервак
     */
    const worker = new Worker("./worker.js", {
      workerData: {
        array,
      },
    });

    worker.on("message", (msg) => {
      console.log("это цё thread:>>", worker.threadId);
      resolve(msg);
    });

    worker.on("error", (err) => {
      reject(err);
    });

    worker.on("exit", () => {
      console.log(`Завершил работу`);
    });
  });
};

const main = async () => {
  // добавим обработчик ошибок
  try {
    performance.mark("start");
    const result = await Promise.all([
      compute([25, 20, 19, 48, 30, 50]),
      compute([25, 20, 19, 48, 30, 50]),
      compute([25, 20, 19, 48, 30, 50]),
      compute([25, 20, 19, 48, 30, 50]),
    ]);

    console.log(result);

    performance.mark("end");
    performance.measure("main", "start", "end");
    console.log(performance.getEntriesByName("main").pop());
  } catch (error) {
    console.log(error.message);
  }
};

// setTimeout(() => {
//   console.log(":>>> timeout200msec");
// }, 200);

main();

/* 

это цё thread:>> 1
это цё thread:>> 3
это цё thread:>> 2
это цё thread:>> 4
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
  startTime: 40.293699999921955,
  duration: 127.6889000000665,
  detail: null
}
Завершил работу
Завершил работу
Завершил работу
Завершил работу

*/

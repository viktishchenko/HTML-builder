const { parentPort, workerData } = require("worker_threads");
const factorial = require("./factorial.js");

const compute = ({ array }) => {
  // утяжеляем
  const arr = [];
  for (let i = 0; i < 10000000; i++) {
    arr.push(i * i);
  }
  // вычисления
  return array.map((el) => factorial(el));
};

parentPort.postMessage(compute(workerData)); // workerData.array

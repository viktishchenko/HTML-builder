const factorial = require("./factorial.js");

const compute = (array) => {
  // утяжеляем
  const arr = [];
  for (let i = 0; i < 10000000; i++) {
    arr.push(i * i);
  }
  // вычисления
  return array.map((el) => factorial(el));
};

const main = () => {
  performance.mark("start");

  const result = [
    compute([25, 20, 19, 48, 30, 50]),
    compute([25, 20, 19, 48, 30, 50]),
    compute([25, 20, 19, 48, 30, 50]),
    compute([25, 20, 19, 48, 30, 50]),
  ];

  console.log(result);

  performance.mark("end");
  performance.measure("main", "start", "end");
  console.log(performance.getEntriesByName("main").pop());
};

// setTimeout(() => {
//   console.log(":>>> timeout200msec");
// }, 200);

main();

/* 
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
  startTime: 38.98170000000391,
  duration: 150.35419999994338,
  detail: null
}

*/

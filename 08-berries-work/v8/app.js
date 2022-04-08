/**
 *  node --print-bytecode app.js
 */

// const main = () => {
//   const a = 5;
//   return a * 7;
// };

// main();

/**
 * node --expose-gc --trace_gc_verbose app.js
 */

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

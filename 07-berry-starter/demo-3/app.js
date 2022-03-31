console.log(__dirname); // C:\Users\...\HTML-builder\07-berry-starter\demo-3
console.log(__filename); // C:\Users\...\HTML-builder\07-berry-starter\demo-3\app.js
console.log(global);
/* 
<ref *1> Object [global] {
  global: [Circular *1],  
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  performance: Performance {
    nodeTiming: PerformanceNodeTiming {
      name: 'node',
      entryType: 'node',
      startTime: 0,
      duration: 72.86290001869202,
      nodeStart: 0.7399001121520996,
      v8Start: 2.552299976348877,
      bootstrapComplete: 29.82860016822815,
      environment: 14.62059998512268,
      loopStart: -1,
      loopExit: -1,
      idleTime: 0
    },
    timeOrigin: 1648736247353.96
  },
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  }
}
*/
console.log(module);
/* 
Module {
  id: '.',
  path: 'C:\\Users\\...\\HTML-builder\\07-berry-starter\\demo-3',
  exports: {},
  filename: 'C:\\Users\\...\\HTML-builder\\07-berry-starter\\demo-3\\app.js',
  loaded: false,
  children: [],
  paths: [
    'C:\\Users\\...\\HTML-builder\\07-berry-starter\\demo-3\\node_modules',
    'C:\\Users\\...\\HTML-builder\\07-berry-starter\\node_modules',
    'C:\\Users\\...\\HTML-builder\\node_modules',
    'C:\\Users\\...\\node_modules',
    'C:\\Users\\...\\node_modules',
    'C:\\Users\\...\\node_modules',
    'C:\\Users\\...\\node_modules',
    'C:\\Users\\node_modules',
    'C:\\node_modules'
  ]
}
*/
// console.log(exports); // {}
console.log(require);
/* 
[Function: require] {
  resolve: [Function: resolve] { paths: [Function: paths] },
  main: Module {
    id: '.',
    path: 'C:\\Users\\...\\07-berry-starter\\demo-3',
    exports: {},
    filename: 'C:\\Users\\...\\07-berry-starter\\demo-3\\app.js',
    loaded: false,
    children: [],
    paths: [
      'C:\\Users\\...\\07-berry-starter\\demo-3\\node_modules',  
      'C:\\Users\\...\\07-berry-starter\\node_modules',
      'C:\\Users\\...\\node_modules',
      'C:\\Users\\...\\node_modules',
      'C:\\Users\\...\\node_modules',
      'C:\\Users\\...\\node_modules',
      'C:\\Users\\...\\node_modules',
      'C:\\Users\\node_modules',
      'C:\\node_modules'
    ]
  },
  extensions: [Object: null prototype] {
    '.js': [Function (anonymous)],
    '.json': [Function (anonymous)],
    '.node': [Function (anonymous)]
  },
  cache: [Object: null prototype] {
    'C:\\Users\\...\\07-berry-starter\\demo-3\\app.js': Module {
      id: '.',
      path: 'C:\\Users\\...\\07-berry-starter\\demo-3',
      exports: {},
      filename: 'C:\\Users\\...\\07-berry-starter\\demo-3\\app.js',
      loaded: false,
      children: [],
      paths: [Array]
    }
  }
}
*/

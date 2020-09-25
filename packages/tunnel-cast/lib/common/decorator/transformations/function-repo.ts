export const functionsRepo = {
    "math-floor": function mathFloor(value) { return  Math.floor(value) },
    "math-ceil": function mathCeil(value) { return  Math.ceil(value) },
    "parse-int":  function parseInt(value) { return  global.parseInt(value)  },
    "parse-float":  function parseFloat(value) { return  global.parseFloat(value)  }
}
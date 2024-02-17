define("discourse/plugins/poll/lib/even-round", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  // works as described on http://stackoverflow.com/a/13483710
  function sumsUpTo100(percentages) {
    return percentages.map(p => Math.floor(p)).reduce((a, b) => a + b) === 100;
  }
  function _default(percentages) {
    let decimals = percentages.map(a => a % 1);
    const sumOfDecimals = Math.ceil(decimals.reduce((a, b) => a + b));
    // compensate error by adding 1 to n items with the greatest decimal part
    for (let i = 0, max = decimals.length; i < sumOfDecimals && i < max; i++) {
      // find the greatest item in the decimals array, set it to 0,
      // and increase the corresponding item in the percentages array by 1
      let greatest = 0;
      let index = 0;
      for (let j = 0; j < decimals.length; j++) {
        if (decimals[j] > greatest) {
          index = j;
          greatest = decimals[j];
        }
      }
      ++percentages[index];
      decimals[index] = 0;
      // quit early when there is a rounding issue
      if (sumsUpTo100(percentages)) {
        break;
      }
    }
    return percentages.map(p => Math.floor(p));
  }
});
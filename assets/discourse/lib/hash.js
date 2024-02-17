define("discourse/lib/hash", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hashString = hashString;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  /*eslint no-bitwise:0 */

  // Note: before changing this be aware the same algorithm is used server side for avatars.
  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash;
  }
});
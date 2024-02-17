define("discourse/helpers/float", ["discourse-common/lib/helpers"], function (_helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("float", function (n) {
    return parseFloat(n).toFixed(1);
  });
});
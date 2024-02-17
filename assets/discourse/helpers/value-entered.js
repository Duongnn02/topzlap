define("discourse/helpers/value-entered", ["discourse-common/lib/helpers"], function (_helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("value-entered", function (value) {
    if (!value) {
      return "";
    } else if (value.length > 0) {
      return "value-entered";
    } else {
      return "";
    }
  });
});
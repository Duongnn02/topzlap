define("discourse/helpers/inline-date", ["discourse-common/lib/helpers", "discourse/lib/formatter"], function (_helpers, _formatter) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers",0,"discourse/lib/formatter"eaimeta@70e063a35619d71f
  (0, _helpers.registerHelper)("inline-date", function (_ref) {
    let [dt] = _ref;
    // TODO: Remove this in 1.13 or greater
    if (dt.value) {
      dt = dt.value();
    }
    return (0, _formatter.relativeAge)(new Date(dt));
  });
});
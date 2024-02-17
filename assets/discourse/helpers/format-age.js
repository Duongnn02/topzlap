define("discourse/helpers/format-age", ["discourse/lib/formatter", "@ember/template", "discourse-common/lib/helpers"], function (_formatter, _template, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/lib/formatter",0,"@ember/template",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("format-age", function (dt) {
    dt = new Date(dt);
    return (0, _template.htmlSafe)((0, _formatter.autoUpdatingRelativeAge)(dt));
  });
  (0, _helpers.registerUnbound)("format-duration", function (seconds) {
    return (0, _template.htmlSafe)((0, _formatter.durationTiny)(seconds));
  });
});
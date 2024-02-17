define("discourse-common/helpers/html-safe", ["@ember/template", "discourse-common/lib/helpers"], function (_template, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/template",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("html-safe", function (string) {
    return (0, _template.htmlSafe)(string);
  });
});
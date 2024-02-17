define("discourse-common/helpers/d-icon", ["@ember/template", "discourse-common/lib/helpers", "discourse-common/lib/icon-library"], function (_template, _helpers, _iconLibrary) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/template",0,"discourse-common/lib/helpers",0,"discourse-common/lib/icon-library"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("d-icon", function (id, params) {
    return (0, _template.htmlSafe)((0, _iconLibrary.renderIcon)("string", id, params));
  });
});
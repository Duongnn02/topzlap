define("discourse-common/helpers/get-url", ["discourse-common/lib/deprecated", "discourse-common/lib/get-url", "discourse-common/lib/helpers"], function (_deprecated, _getUrl, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/deprecated",0,"discourse-common/lib/get-url",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("get-url", value => (0, _getUrl.default)(value));
  (0, _helpers.registerUnbound)("base-url", () => {
    (0, _deprecated.default)("Use `{{base-path}}` instead of `{{base-url}}`");
    return (0, _getUrl.default)("");
  });
  (0, _helpers.registerUnbound)("base-path", () => (0, _getUrl.default)(""));
});
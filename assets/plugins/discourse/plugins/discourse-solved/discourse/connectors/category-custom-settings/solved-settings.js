define("discourse/plugins/discourse-solved/discourse/connectors/category-custom-settings/solved-settings", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    actions: {
      onChangeSetting(value) {
        this.set("category.custom_fields.enable_accepted_answers", value ? "true" : "false");
      }
    }
  };
  _exports.default = _default;
});
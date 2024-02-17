define("select-kit/components/multi-select/format-selected-content", ["exports", "@ember/component", "@ember/object", "select-kit/templates/components/multi-select/format-selected-content", "discourse-common/lib/helpers", "select-kit/mixins/utils"], function (_exports, _component, _object, _formatSelectedContent, _helpers, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"@ember/object",0,"select-kit/templates/components/multi-select/format-selected-content",0,"discourse-common/lib/helpers",0,"select-kit/mixins/utils"eaimeta@70e063a35619d71f
  var _default = _component.default.extend(_utils.default, {
    tagName: "",
    layout: _formatSelectedContent.default,
    content: null,
    selectKit: null,
    formattedContent: (0, _object.computed)("content", function () {
      if (this.content) {
        return (0, _helpers.makeArray)(this.content).map(c => this.getName(c)).join(", ");
      } else {
        return this.getName(this.selectKit.noneItem);
      }
    })
  });
  _exports.default = _default;
});
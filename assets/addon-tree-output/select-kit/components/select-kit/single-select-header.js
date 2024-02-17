define("select-kit/components/select-kit/single-select-header", ["exports", "@ember/object", "@ember/object/computed", "select-kit/components/select-kit/select-kit-header", "select-kit/mixins/utils", "select-kit/templates/components/select-kit/single-select-header", "I18n"], function (_exports, _object, _computed, _selectKitHeader, _utils, _singleSelectHeader, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/object/computed",0,"select-kit/components/select-kit/select-kit-header",0,"select-kit/mixins/utils",0,"select-kit/templates/components/select-kit/single-select-header",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _selectKitHeader.default.extend(_utils.default, {
    tagName: "summary",
    layout: _singleSelectHeader.default,
    classNames: ["single-select-header"],
    attributeBindings: ["name", "ariaLabel:aria-label"],
    ariaLabel: (0, _computed.or)("selectKit.options.headerAriaLabel", "name"),
    focusIn(event) {
      event.stopImmediatePropagation();
      document.querySelectorAll(".select-kit-header").forEach(header => {
        if (header !== event.target) {
          header.parentNode.open = false;
        }
      });
    },
    name: (0, _object.computed)("selectedContent.name", function () {
      if (this.selectedContent) {
        return _I18n.default.t("select_kit.filter_by", {
          name: this.getName(this.selectedContent)
        });
      } else {
        return _I18n.default.t("select_kit.select_to_filter");
      }
    })
  });
  _exports.default = _default;
});
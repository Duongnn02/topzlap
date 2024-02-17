define("select-kit/components/single-select", ["exports", "select-kit/components/select-kit", "@ember/object", "@ember/utils", "select-kit/templates/components/single-select"], function (_exports, _selectKit, _object, _utils, _singleSelect) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/select-kit",0,"@ember/object",0,"@ember/utils",0,"select-kit/templates/components/single-select"eaimeta@70e063a35619d71f
  var _default = _selectKit.default.extend({
    pluginApiIdentifiers: ["single-select"],
    layout: _singleSelect.default,
    classNames: ["single-select"],
    singleSelect: true,
    selectKitOptions: {
      headerComponent: "select-kit/single-select-header"
    },
    selectedContent: (0, _object.computed)("value", "content.[]", "selectKit.noneItem", function () {
      if (!(0, _utils.isEmpty)(this.value)) {
        let content;
        const value = this.selectKit.options.castInteger && this._isNumeric(this.value) ? Number(this.value) : this.value;
        if (this.selectKit.valueProperty) {
          content = (this.content || []).findBy(this.selectKit.valueProperty, value);
          return this.selectKit.modifySelection(content || this.defaultItem(value, value));
        } else {
          return this.selectKit.modifySelection((this.content || []).filter(c => c === value));
        }
      } else {
        return this.selectKit.noneItem;
      }
    })
  });
  _exports.default = _default;
});
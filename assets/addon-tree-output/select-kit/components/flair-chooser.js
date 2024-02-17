define("select-kit/components/flair-chooser", ["exports", "@ember/object", "select-kit/components/combo-box"], function (_exports, _object, _comboBox) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"select-kit/components/combo-box"eaimeta@70e063a35619d71f
  var _default = _comboBox.default.extend({
    pluginApiIdentifiers: ["flair-chooser"],
    classNames: ["flair-chooser"],
    selectKitOptions: {
      selectedNameComponent: "selected-flair"
    },
    modifyComponentForRow() {
      return "flair-row";
    },
    selectedContent: (0, _object.computed)("value", "content.[]", "selectKit.noneItem", function () {
      const content = (this.content || []).findBy(this.selectKit.valueProperty, this.value);
      if (content) {
        return this.selectKit.modifySelection(content);
      } else {
        return this.selectKit.noneItem;
      }
    })
  });
  _exports.default = _default;
});
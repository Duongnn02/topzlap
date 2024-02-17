define("select-kit/components/selected-choice", ["exports", "@ember/object/internals", "@ember/component", "@ember/object", "select-kit/templates/components/selected-choice", "select-kit/mixins/utils"], function (_exports, _internals, _component, _object, _selectedChoice, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/internals",0,"@ember/component",0,"@ember/object",0,"select-kit/templates/components/selected-choice",0,"select-kit/mixins/utils"eaimeta@70e063a35619d71f
  var _default = _component.default.extend(_utils.default, {
    tagName: "",
    layout: _selectedChoice.default,
    item: null,
    selectKit: null,
    extraClass: null,
    id: null,
    init() {
      this._super(...arguments);
      this.set("id", (0, _internals.guidFor)(this));
    },
    itemValue: (0, _object.computed)("item", function () {
      return this.getValue(this.item);
    }),
    itemName: (0, _object.computed)("item", function () {
      return this.getName(this.item);
    })
  });
  _exports.default = _default;
});
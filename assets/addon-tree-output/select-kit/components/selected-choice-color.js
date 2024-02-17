define("select-kit/components/selected-choice-color", ["exports", "discourse/lib/utilities", "select-kit/components/selected-choice", "@ember/runloop", "@ember/object"], function (_exports, _utilities, _selectedChoice, _runloop, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/utilities",0,"select-kit/components/selected-choice",0,"@ember/runloop",0,"@ember/object"eaimeta@70e063a35619d71f
  var _default = _selectedChoice.default.extend({
    tagName: "",
    extraClass: "selected-choice-color",
    escapedColor: (0, _object.computed)("item", function () {
      const color = `${(0, _utilities.escapeExpression)(this.item?.name || this.item)}`;
      return color.startsWith("#") ? color : `#${color}`;
    }),
    didInsertElement() {
      this._super(...arguments);
      (0, _runloop.schedule)("afterRender", () => {
        const element = document.querySelector(`#${this.selectKit.uniqueID} #${this.id}-choice`);
        if (!element) {
          return;
        }
        element.style.borderBottomColor = this.escapedColor;
      });
    }
  });
  _exports.default = _default;
});
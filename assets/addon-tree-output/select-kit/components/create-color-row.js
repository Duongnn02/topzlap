define("select-kit/components/create-color-row", ["exports", "select-kit/components/select-kit/select-kit-row", "discourse/lib/utilities", "select-kit/templates/components/create-color-row", "@ember/runloop"], function (_exports, _selectKitRow, _utilities, _createColorRow, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/select-kit/select-kit-row",0,"discourse/lib/utilities",0,"select-kit/templates/components/create-color-row",0,"@ember/runloop"eaimeta@70e063a35619d71f
  var _default = _selectKitRow.default.extend({
    layout: _createColorRow.default,
    classNames: ["create-color-row"],
    didReceiveAttrs() {
      this._super(...arguments);
      (0, _runloop.schedule)("afterRender", () => {
        const color = (0, _utilities.escapeExpression)(this.rowValue);
        this.element.style.borderLeftColor = color.startsWith("#") ? color : `#${color}`;
      });
    }
  });
  _exports.default = _default;
});
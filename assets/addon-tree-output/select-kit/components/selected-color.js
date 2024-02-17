define("select-kit/components/selected-color", ["exports", "select-kit/components/selected-name", "discourse/lib/utilities", "@ember/runloop"], function (_exports, _selectedName, _utilities, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/selected-name",0,"discourse/lib/utilities",0,"@ember/runloop"eaimeta@70e063a35619d71f
  var _default = _selectedName.default.extend({
    classNames: ["select-kit-selected-color"],
    didInsertElement() {
      this._super(...arguments);
      (0, _runloop.schedule)("afterRender", () => {
        const element = document.querySelector(`#${this.selectKit.uniqueID} #${this.id}`);
        if (!element) {
          return;
        }
        element.style.borderBottom = "2px solid transparent";
        const color = (0, _utilities.escapeExpression)(this.name);
        element.style.borderBottomColor = `#${color}`;
      });
    }
  });
  _exports.default = _default;
});
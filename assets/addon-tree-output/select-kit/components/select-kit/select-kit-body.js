define("select-kit/components/select-kit/select-kit-body", ["exports", "@ember/component", "@ember/runloop", "@ember/object", "select-kit/templates/components/select-kit/select-kit-body"], function (_exports, _component, _runloop, _object, _selectKitBody) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"@ember/runloop",0,"@ember/object",0,"select-kit/templates/components/select-kit/select-kit-body"eaimeta@70e063a35619d71f
  var _default = _component.default.extend({
    layout: _selectKitBody.default,
    classNames: ["select-kit-body"],
    classNameBindings: ["emptyBody:empty-body"],
    emptyBody: (0, _object.computed)("selectKit.{filter,hasNoContent}", function () {
      return false;
    }),
    rootEventType: "click",
    init() {
      this._super(...arguments);
      this.handleRootMouseDownHandler = (0, _runloop.bind)(this, this.handleRootMouseDown);
    },
    didInsertElement() {
      this._super(...arguments);
      this.element.style.position = "relative";
      document.addEventListener(this.rootEventType, this.handleRootMouseDownHandler, true);
    },
    willDestroyElement() {
      this._super(...arguments);
      document.removeEventListener(this.rootEventType, this.handleRootMouseDownHandler, true);
    },
    handleRootMouseDown(event) {
      if (!this.selectKit.isExpanded) {
        return;
      }
      const headerElement = document.querySelector(`#${this.selectKit.uniqueID}-header`);
      if (headerElement && headerElement.contains(event.target)) {
        return;
      }
      if (this.element.contains(event.target)) {
        return;
      }
      if (this.selectKit.mainElement()) {
        this.selectKit.close(event);
      }
    }
  });
  _exports.default = _default;
});
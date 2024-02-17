define("discourse/mixins/add-archetype-class", ["exports", "discourse-common/utils/decorators"], function (_exports, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // Mix this in to a view that has a `archetype` property to automatically
  // add it to the body as the view is entered / left / model is changed.
  // This is used for keeping the `body` style in sync for the background image.
  var _default = (_dec = (0, _decorators.observes)("archetype"), _dec2 = (0, _decorators.on)("init"), (_obj = {
    _cleanUp() {
      document.body.classList.forEach(name => {
        if (/\barchetype-\S+/g.test(name)) {
          document.body.classList.remove(name);
        }
      });
    },
    _archetypeChanged() {
      this._cleanUp();
      if (this.archetype) {
        document.body.classList.add(`archetype-${this.archetype}`);
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      this._cleanUp();
    }
  }, (_applyDecoratedDescriptor(_obj, "_archetypeChanged", [_dec, _dec2], Object.getOwnPropertyDescriptor(_obj, "_archetypeChanged"), _obj)), _obj));
  _exports.default = _default;
});
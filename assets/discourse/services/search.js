define("discourse/services/search", ["exports", "@ember/service", "discourse-common/utils/decorators"], function (_exports, _service, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _service.default.extend((_dec = (0, _decorators.default)("searchContext"), (_obj = {
    searchContextEnabled: false,
    // checkbox to scope search
    searchContext: null,
    highlightTerm: null,
    contextType: {
      get(searchContext) {
        return searchContext?.type;
      },
      set(value, searchContext) {
        this.set("searchContext", {
          ...searchContext,
          type: value
        });
        return value;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "contextType", [_dec], (_init = Object.getOwnPropertyDescriptor(_obj, "contextType"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj)), _obj)));
  _exports.default = _default;
});
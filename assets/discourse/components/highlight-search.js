define("discourse/components/highlight-search", ["exports", "discourse-common/utils/decorators", "@ember/component", "discourse/lib/highlight-search"], function (_exports, _decorators, _component, _highlightSearch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"@ember/component",0,"discourse/lib/highlight-search"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend((_dec = (0, _decorators.on)("didInsertElement"), _dec2 = (0, _decorators.observes)("highlight"), (_obj = {
    tagName: "span",
    _highlightOnInsert() {
      const term = this.highlight;
      (0, _highlightSearch.default)(this.element, term);
    }
  }, (_applyDecoratedDescriptor(_obj, "_highlightOnInsert", [_dec, _dec2], Object.getOwnPropertyDescriptor(_obj, "_highlightOnInsert"), _obj)), _obj)));
  _exports.default = _default;
});
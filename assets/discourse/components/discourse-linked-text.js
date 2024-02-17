define("discourse/components/discourse-linked-text", ["exports", "@ember/component", "@ember/template-factory", "I18n", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _I18n, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{html-safe this.translatedText}}
  */
  {
    "id": "DQBQg4Aa",
    "block": "[[[1,[28,[35,0],[[30,0,[\"translatedText\"]]],null]]],[],false,[\"html-safe\"]]",
    "moduleName": "discourse/components/discourse-linked-text.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("text", "textParams"), (_obj = {
    tagName: "span",
    translatedText(text) {
      if (text) {
        return _I18n.default.t(...arguments);
      }
    },
    click(event) {
      if (event.target.tagName.toUpperCase() === "A") {
        this.action(this.actionParam);
      }
      return false;
    }
  }, (_applyDecoratedDescriptor(_obj, "translatedText", [_dec], Object.getOwnPropertyDescriptor(_obj, "translatedText"), _obj)), _obj))));
  _exports.default = _default;
});
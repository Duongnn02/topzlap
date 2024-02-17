define("discourse/components/modal-tab", ["exports", "@ember/component", "@ember/template-factory", "I18n", "discourse-common/utils/decorators", "@ember/object/computed", "discourse/lib/computed"], function (_exports, _component, _templateFactory, _I18n, _decorators, _computed, _computed2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{this.title}}
  */
  {
    "id": "ud88QZyP",
    "block": "[[[1,[30,0,[\"title\"]]]],[],false,[]]",
    "moduleName": "discourse/components/modal-tab.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("panel.title", "panel.rawTitle"), (_obj = {
    tagName: "li",
    classNames: ["modal-tab"],
    panel: null,
    selectedPanel: null,
    panelsLength: null,
    classNameBindings: ["isActive", "singleTab", "panel.id"],
    singleTab: (0, _computed.equal)("panelsLength", 1),
    isActive: (0, _computed2.propertyEqual)("panel.id", "selectedPanel.id"),
    title(title, rawTitle) {
      return title ? _I18n.default.t(title) : rawTitle;
    },
    click() {
      this.set("selectedPanel", this.panel);
      if (this.onSelectPanel) {
        this.onSelectPanel(this.panel);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "title", [_dec], Object.getOwnPropertyDescriptor(_obj, "title"), _obj)), _obj))));
  _exports.default = _default;
});
define("discourse/components/popup-input-tip", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "discourse-common/utils/decorators", "@ember/template", "@ember/service"], function (_exports, _component, _templateFactory, _computed, _decorators, _template, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"@ember/component",0,"@ember/template",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{this.tipReason}} {{d-icon "times-circle"}}
  */
  {
    "id": "3kGtAn2e",
    "block": "[[[1,[30,0,[\"tipReason\"]]],[1,\" \"],[1,[28,[35,0],[\"times-circle\"],null]]],[],false,[\"d-icon\"]]",
    "moduleName": "discourse/components/popup-input-tip.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("bad"), _dec2 = (0, _decorators.default)("validation.reason"), (_obj = {
    composer: (0, _service.inject)(),
    tagName: "a",
    classNameBindings: [":popup-tip", "good", "bad", "lastShownAt::hide"],
    attributeBindings: ["role", "ariaLabel", "tabindex"],
    tipReason: null,
    lastShownAt: (0, _computed.or)("shownAt", "validation.lastShownAt"),
    bad: (0, _computed.reads)("validation.failed"),
    good: (0, _computed.not)("bad"),
    tabindex: "0",
    role(bad) {
      if (bad) {
        return "alert";
      }
    },
    ariaLabel(reason) {
      return reason?.replace(/(<([^>]+)>)/gi, "");
    },
    dismiss() {
      this.set("shownAt", null);
      this.composer.clearLastValidatedAt();
      this.element.previousElementSibling?.focus();
    },
    click() {
      this.dismiss();
    },
    keyDown(event) {
      if (event.key === "Enter") {
        this.dismiss();
      }
    },
    didReceiveAttrs() {
      this._super(...arguments);
      let reason = this.get("validation.reason");
      if (reason) {
        this.set("tipReason", (0, _template.htmlSafe)(`${reason}`));
      } else {
        this.set("tipReason", null);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "role", [_dec], Object.getOwnPropertyDescriptor(_obj, "role"), _obj), _applyDecoratedDescriptor(_obj, "ariaLabel", [_dec2], Object.getOwnPropertyDescriptor(_obj, "ariaLabel"), _obj)), _obj))));
  _exports.default = _default;
});
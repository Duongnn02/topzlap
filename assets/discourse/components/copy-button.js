define("discourse/components/copy-button", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse-common/lib/debounce", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _object, _debounce, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"discourse-common/lib/debounce",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <DButton
    @class={{this.copyClass}}
    @icon={{this.copyIcon}}
    @action={{action "copy"}}
  />
  */
  {
    "id": "wdmdMUSu",
    "block": "[[[8,[39,0],null,[[\"@class\",\"@icon\",\"@action\"],[[30,0,[\"copyClass\"]],[30,0,[\"copyIcon\"]],[28,[37,1],[[30,0],\"copy\"],null]]],null]],[],false,[\"d-button\",\"action\"]]",
    "moduleName": "discourse/components/copy-button.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    tagName: "",
    copyIcon: "copy",
    copyClass: "btn-primary",
    _restoreButton() {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      this.set("copyIcon", "copy");
      this.set("copyClass", "btn-primary");
    },
    copy() {
      const target = document.querySelector(this.selector);
      target.select();
      target.setSelectionRange(0, target.value.length);
      try {
        document.execCommand("copy");
        if (this.copied) {
          this.copied();
        }
        this.set("copyIcon", "check");
        this.set("copyClass", "btn-primary ok");
        (0, _debounce.default)(this._restoreButton, 3000);
      } catch (err) {}
    }
  }, (_applyDecoratedDescriptor(_obj, "_restoreButton", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_restoreButton"), _obj), _applyDecoratedDescriptor(_obj, "copy", [_object.action], Object.getOwnPropertyDescriptor(_obj, "copy"), _obj)), _obj)));
  _exports.default = _default;
});
define("discourse/components/topic-navigation-popup", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _object, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.hidden}}
    <div class="topic-navigation-popup">
      <DButton @action={{action "close"}} @class="close btn-flat" @icon="times" />
      {{yield}}
    </div>
  {{/unless}}
  */
  {
    "id": "y/HO+wo9",
    "block": "[[[41,[51,[30,0,[\"hidden\"]]],[[[1,\"  \"],[10,0],[14,0,\"topic-navigation-popup\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@action\",\"@class\",\"@icon\"],[[28,[37,2],[[30,0],\"close\"],null],\"close btn-flat\",\"times\"]],null],[1,\"\\n    \"],[18,1,null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"&default\"],false,[\"unless\",\"d-button\",\"action\",\"yield\"]]",
    "moduleName": "discourse/components/topic-navigation-popup.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("popupId"), (_obj = {
    tagName: "",
    popupId: null,
    hidden: false,
    init() {
      this._super(...arguments);
      if (this.popupKey) {
        const value = this.keyValueStore.getItem(this.popupKey);
        if (value === true || value > +new Date()) {
          this.set("hidden", true);
        } else {
          this.keyValueStore.removeItem(this.popupKey);
        }
      }
    },
    popupKey(popupId) {
      if (popupId) {
        return `dismiss_topic_nav_popup_${popupId}`;
      }
    },
    close() {
      this.set("hidden", true);
      if (this.popupKey) {
        if (this.dismissDuration) {
          const expiry = +new Date() + this.dismissDuration;
          this.keyValueStore.setItem(this.popupKey, expiry);
        } else {
          this.keyValueStore.setItem(this.popupKey, true);
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "popupKey", [_dec], Object.getOwnPropertyDescriptor(_obj, "popupKey"), _obj), _applyDecoratedDescriptor(_obj, "close", [_object.action], Object.getOwnPropertyDescriptor(_obj, "close"), _obj)), _obj))));
  _exports.default = _default;
});
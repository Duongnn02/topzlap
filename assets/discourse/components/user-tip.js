define("discourse/components/user-tip", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "@ember/service", "@glimmer/component", "discourse/lib/user-tips", "I18n"], function (_exports, _component, _templateFactory, _object, _service, _component2, _userTips, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"@ember/service",0,"@glimmer/component",0,"discourse/lib/user-tips",0,"I18n"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <span {{did-insert this.showUserTip}}></span>
  */
  {
    "id": "DWofSEqm",
    "block": "[[[11,1],[4,[38,0],[[30,0,[\"showUserTip\"]]],null],[12],[13]],[],false,[\"did-insert\"]]",
    "moduleName": "discourse/components/user-tip.hbs",
    "isStrictMode": false
  });
  let UserTip = (_class = class UserTip extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "currentUser", _descriptor, this);
    }
    showUserTip(element) {
      if (!this.currentUser) {
        return;
      }
      const {
        id,
        selector,
        content,
        placement
      } = this.args;
      this.currentUser.showUserTip({
        id,
        titleText: _I18n.default.t(`user_tips.${id}.title`),
        contentText: content || _I18n.default.t(`user_tips.${id}.content`),
        reference: selector ? element.parentElement.querySelector(selector) || element.parentElement : element,
        appendTo: element.parentElement,
        placement: placement || "top"
      });
    }
    willDestroy() {
      (0, _userTips.hideUserTip)(this.args.id);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "showUserTip", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "showUserTip"), _class.prototype)), _class);
  _exports.default = UserTip;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserTip);
});
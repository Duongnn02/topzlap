define("discourse/components/user-nav/dropdown-list", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/object", "@ember/service", "@glimmer/tracking", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _component2, _object, _service, _tracking, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.DROPDOWN_BUTTON_CSS_CLASS = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/object",0,"@ember/service",0,"@glimmer/tracking",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <li class={{concat @class " user-nav-dropdown-list-item"}}>
    <button
      type="button"
      class={{this.buttonClass}}
      {{on "click" this.toggleList}}
    >
      {{d-icon @icon}}
      <span>{{@text}}</span>
      {{d-icon this.chevron class="user-nav-dropdown-chevron"}}
    </button>
  
    {{#if (and (has-block "submenu") this.displayList)}}
      <div
        class="user-nav-dropdown-submenu-wrapper"
        {{did-insert this.registerClickListener}}
        {{will-destroy this.deregisterClickListener}}
      >
  
        <ul class={{concat @submenuClass " user-nav-dropdown-submenu"}}>
          {{yield to="submenu"}}
        </ul>
      </div>
    {{/if}}
  </li>
  */
  {
    "id": "DpNF83Z3",
    "block": "[[[10,\"li\"],[15,0,[28,[37,0],[[30,1],\" user-nav-dropdown-list-item\"],null]],[12],[1,\"\\n  \"],[11,\"button\"],[16,0,[30,0,[\"buttonClass\"]]],[24,4,\"button\"],[4,[38,1],[\"click\",[30,0,[\"toggleList\"]]],null],[12],[1,\"\\n    \"],[1,[28,[35,2],[[30,2]],null]],[1,\"\\n    \"],[10,1],[12],[1,[30,3]],[13],[1,\"\\n    \"],[1,[28,[35,2],[[30,0,[\"chevron\"]]],[[\"class\"],[\"user-nav-dropdown-chevron\"]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[28,[37,4],[[48,[30,5]],[30,0,[\"displayList\"]]],null],[[[1,\"    \"],[11,0],[24,0,\"user-nav-dropdown-submenu-wrapper\"],[4,[38,6],[[30,0,[\"registerClickListener\"]]],null],[4,[38,7],[[30,0,[\"deregisterClickListener\"]]],null],[12],[1,\"\\n\\n      \"],[10,\"ul\"],[15,0,[28,[37,0],[[30,4],\" user-nav-dropdown-submenu\"],null]],[12],[1,\"\\n        \"],[18,5,null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[\"@class\",\"@icon\",\"@text\",\"@submenuClass\",\"&submenu\"],false,[\"concat\",\"on\",\"d-icon\",\"if\",\"and\",\"has-block\",\"did-insert\",\"will-destroy\",\"yield\"]]",
    "moduleName": "discourse/components/user-nav/dropdown-list.hbs",
    "isStrictMode": false
  });
  const DROPDOWN_BUTTON_CSS_CLASS = "user-nav-dropdown-button";
  _exports.DROPDOWN_BUTTON_CSS_CLASS = DROPDOWN_BUTTON_CSS_CLASS;
  let UserNavDropdownList = (_class = class UserNavDropdownList extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "site", _descriptor, this);
      _initializerDefineProperty(this, "displayList", _descriptor2, this);
    }
    get chevron() {
      return this.displayList ? "chevron-up" : "chevron-down";
    }
    get defaultButtonClass() {
      return DROPDOWN_BUTTON_CSS_CLASS;
    }
    get buttonClass() {
      const props = [this.defaultButtonClass];
      if (this.args.isActive) {
        props.push("active");
      }
      return props.join(" ");
    }
    toggleList() {
      this.displayList = !this.displayList;
    }
    collapseList(e) {
      const isClickOnButton = e.composedPath().some(element => {
        if (element?.classList?.contains(this.defaultButtonClass)) {
          return true;
        }
      });
      if (!isClickOnButton) {
        this.displayList = false;
      }
    }
    registerClickListener() {
      document.addEventListener("click", this.collapseList);
    }
    deregisterClickListener() {
      document.removeEventListener("click", this.collapseList);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "site", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "displayList", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return this.site.mobileView && this.args.isActive;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "toggleList", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleList"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "collapseList", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "collapseList"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "registerClickListener", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "registerClickListener"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "deregisterClickListener", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "deregisterClickListener"), _class.prototype)), _class);
  _exports.default = UserNavDropdownList;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserNavDropdownList);
});
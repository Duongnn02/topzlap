define("discourse/components/user-menu/items-list", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@glimmer/tracking", "@ember/object", "discourse/models/session"], function (_exports, _component, _templateFactory, _component2, _tracking, _object, _session) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _load, _getCachedItems, _setCachedItems;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@glimmer/tracking",0,"@ember/object",0,"discourse/models/session"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.loading}}
    <div class="spinner-container">
      <div class="spinner"></div>
    </div>
  {{else if this.items.length}}
    <ul aria-labelledby={{@ariaLabelledby}}>
      {{#each this.items as |item|}}
        <UserMenu::MenuItem @item={{item}} @closeUserMenu={{@closeUserMenu}} />
      {{/each}}
    </ul>
    <div class="panel-body-bottom">
      {{#if this.showAllHref}}
        <a
          class="btn btn-default btn-icon no-text show-all"
          href={{this.showAllHref}}
          title={{this.showAllTitle}}
        >
          {{d-icon "chevron-down" aria-label=this.showAllTitle}}
        </a>
      {{/if}}
      {{#if this.showDismiss}}
        <button
          type="button"
          class="btn btn-default notifications-dismiss btn-icon-text"
          title={{this.dismissTitle}}
          {{on "click" this.dismissButtonClick}}
        >
          {{d-icon "check"}}
          {{i18n "user.dismiss"}}
        </button>
      {{/if}}
    </div>
  {{else}}
    {{component this.emptyStateComponent}}
  {{/if}}
  */
  {
    "id": "vh1yjRvz",
    "block": "[[[41,[30,0,[\"loading\"]],[[[1,\"  \"],[10,0],[14,0,\"spinner-container\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"spinner\"],[12],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"items\",\"length\"]],[[[1,\"  \"],[10,\"ul\"],[15,\"aria-labelledby\",[30,1]],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"items\"]]],null]],null],null,[[[1,\"      \"],[8,[39,3],null,[[\"@item\",\"@closeUserMenu\"],[[30,2],[30,3]]],null],[1,\"\\n\"]],[2]],null],[1,\"  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"panel-body-bottom\"],[12],[1,\"\\n\"],[41,[30,0,[\"showAllHref\"]],[[[1,\"      \"],[10,3],[14,0,\"btn btn-default btn-icon no-text show-all\"],[15,6,[30,0,[\"showAllHref\"]]],[15,\"title\",[30,0,[\"showAllTitle\"]]],[12],[1,\"\\n        \"],[1,[28,[35,4],[\"chevron-down\"],[[\"aria-label\"],[[30,0,[\"showAllTitle\"]]]]]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showDismiss\"]],[[[1,\"      \"],[11,\"button\"],[24,0,\"btn btn-default notifications-dismiss btn-icon-text\"],[16,\"title\",[30,0,[\"dismissTitle\"]]],[24,4,\"button\"],[4,[38,5],[\"click\",[30,0,[\"dismissButtonClick\"]]],null],[12],[1,\"\\n        \"],[1,[28,[35,4],[\"check\"],null]],[1,\"\\n        \"],[1,[28,[35,6],[\"user.dismiss\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[46,[30,0,[\"emptyStateComponent\"]],null,null,null],[1,\"\\n\"]],[]]]],[]]]],[\"@ariaLabelledby\",\"item\",\"@closeUserMenu\"],false,[\"if\",\"each\",\"-track-array\",\"user-menu/menu-item\",\"d-icon\",\"on\",\"i18n\",\"component\"]]",
    "moduleName": "discourse/components/user-menu/items-list.hbs",
    "isStrictMode": false
  });
  let UserMenuItemsList = (_class = (_load = /*#__PURE__*/new WeakSet(), _getCachedItems = /*#__PURE__*/new WeakSet(), _setCachedItems = /*#__PURE__*/new WeakSet(), class UserMenuItemsList extends _component2.default {
    constructor() {
      super(...arguments);
      _classPrivateMethodInitSpec(this, _setCachedItems);
      _classPrivateMethodInitSpec(this, _getCachedItems);
      _classPrivateMethodInitSpec(this, _load);
      _initializerDefineProperty(this, "loading", _descriptor, this);
      _initializerDefineProperty(this, "items", _descriptor2, this);
      _classPrivateMethodGet(this, _load, _load2).call(this);
    }
    get itemsCacheKey() {}
    get showAllHref() {}
    get showAllTitle() {}
    get showDismiss() {
      return false;
    }
    get dismissTitle() {}
    get emptyStateComponent() {
      return "user-menu/items-list-empty-state";
    }
    async fetchItems() {
      throw new Error(`the fetchItems method must be implemented in ${this.constructor.name}`);
    }
    async refreshList() {
      await _classPrivateMethodGet(this, _load, _load2).call(this);
    }
    dismissWarningModal() {
      return null;
    }
    dismissButtonClick() {
      throw new Error(`dismissButtonClick must be implemented in ${this.constructor.name}.`);
    }
  }), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "loading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "items", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return [];
    }
  }), _applyDecoratedDescriptor(_class.prototype, "dismissButtonClick", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "dismissButtonClick"), _class.prototype)), _class);
  _exports.default = UserMenuItemsList;
  async function _load2() {
    const cached = _classPrivateMethodGet(this, _getCachedItems, _getCachedItems2).call(this);
    if (cached?.length) {
      this.items = cached;
    } else {
      this.loading = true;
    }
    try {
      const items = await this.fetchItems();
      _classPrivateMethodGet(this, _setCachedItems, _setCachedItems2).call(this, items);
      this.items = items;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(`an error occurred when loading items for ${this.constructor.name}`, err);
    } finally {
      this.loading = false;
    }
  }
  function _getCachedItems2() {
    const key = this.itemsCacheKey;
    if (key) {
      return _session.default.currentProp(`user-menu-items:${key}`);
    }
  }
  function _setCachedItems2(newItems) {
    const key = this.itemsCacheKey;
    if (key) {
      _session.default.currentProp(`user-menu-items:${key}`, newItems);
    }
  }
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserMenuItemsList);
});
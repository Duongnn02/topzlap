define("discourse/components/user-menu/menu-item", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "discourse/lib/text", "discourse/lib/utilities", "@ember/template", "@ember/object"], function (_exports, _component, _templateFactory, _component2, _text, _utilities, _template, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _item;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"discourse/lib/text",0,"discourse/lib/utilities",0,"@ember/template",0,"@ember/object"eaimeta@70e063a35619d71f
  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <li class={{this.className}}>
    <a
      href={{this.linkHref}}
      title={{this.linkTitle}}
      {{on "click" this.onClick}}
    >
      {{d-icon this.icon}}
      <div>
        {{#if this.label}}
          <span class={{concat "item-label " this.labelClass}}>
            {{this.label}}
          </span>
        {{/if}}
        {{#if this.description}}
          <span
            class={{concat "item-description " this.descriptionClass}}
            data-topic-id={{this.topicId}}
          >
            {{this.description}}
          </span>
        {{/if}}
      </div>
    </a>
  </li>
  */
  {
    "id": "mt3OXDSZ",
    "block": "[[[10,\"li\"],[15,0,[30,0,[\"className\"]]],[12],[1,\"\\n  \"],[11,3],[16,6,[30,0,[\"linkHref\"]]],[16,\"title\",[30,0,[\"linkTitle\"]]],[4,[38,0],[\"click\",[30,0,[\"onClick\"]]],null],[12],[1,\"\\n    \"],[1,[28,[35,1],[[30,0,[\"icon\"]]],null]],[1,\"\\n    \"],[10,0],[12],[1,\"\\n\"],[41,[30,0,[\"label\"]],[[[1,\"        \"],[10,1],[15,0,[28,[37,3],[\"item-label \",[30,0,[\"labelClass\"]]],null]],[12],[1,\"\\n          \"],[1,[30,0,[\"label\"]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"description\"]],[[[1,\"        \"],[10,1],[15,0,[28,[37,3],[\"item-description \",[30,0,[\"descriptionClass\"]]],null]],[15,\"data-topic-id\",[30,0,[\"topicId\"]]],[12],[1,\"\\n          \"],[1,[30,0,[\"description\"]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"on\",\"d-icon\",\"if\",\"concat\"]]",
    "moduleName": "discourse/components/user-menu/menu-item.hbs",
    "isStrictMode": false
  });
  let UserMenuItem = (_class = (_item = /*#__PURE__*/new WeakMap(), class UserMenuItem extends _component2.default {
    constructor() {
      super(...arguments);
      _classPrivateFieldInitSpec(this, _item, {
        get: _get_item,
        set: void 0
      });
    }
    get className() {
      return _classPrivateFieldGet(this, _item).className;
    }
    get linkHref() {
      return _classPrivateFieldGet(this, _item).linkHref;
    }
    get linkTitle() {
      return _classPrivateFieldGet(this, _item).linkTitle;
    }
    get icon() {
      return _classPrivateFieldGet(this, _item).icon;
    }
    get label() {
      return _classPrivateFieldGet(this, _item).label;
    }
    get labelClass() {
      return _classPrivateFieldGet(this, _item).labelClass;
    }
    get description() {
      const description = _classPrivateFieldGet(this, _item).description;
      if (description) {
        if (typeof description === "string") {
          // do emoji unescape on all items
          return (0, _template.htmlSafe)((0, _text.emojiUnescape)((0, _utilities.escapeExpression)(description)));
        }
        // it's probably an htmlSafe object, don't try to unescape emojis
        return description;
      }
    }
    get descriptionClass() {
      return _classPrivateFieldGet(this, _item).descriptionClass;
    }
    get topicId() {
      return _classPrivateFieldGet(this, _item).topicId;
    }
    onClick(event) {
      return _classPrivateFieldGet(this, _item).onClick({
        event,
        closeUserMenu: this.args.closeUserMenu
      });
    }
  }), (_applyDecoratedDescriptor(_class.prototype, "onClick", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onClick"), _class.prototype)), _class);
  _exports.default = UserMenuItem;
  function _get_item() {
    return this.args.item;
  }
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserMenuItem);
});
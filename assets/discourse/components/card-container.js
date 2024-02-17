define("discourse/components/card-container", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service", "@ember/controller", "@ember/object", "discourse/lib/url"], function (_exports, _component, _templateFactory, _component2, _service, _controller, _object, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service",0,"@ember/controller",0,"@ember/object",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.site.mobileView}}
    <div class="card-cloak hidden"></div>
  {{/if}}
  
  <UserCardContents
    @topic={{this.topic.model}}
    @showUser={{this.showUser}}
    @filterPosts={{this.filterPosts}}
    @composePrivateMessage={{route-action "composePrivateMessage"}}
    @createNewMessageViaParams={{route-action "createNewMessageViaParams"}}
    role="dialog"
    aria-labelledby="discourse-user-card-title"
  />
  
  <GroupCardContents
    @topic={{this.topic.model}}
    @showUser={{this.showUser}}
    @showGroup={{this.showGroup}}
    @createNewMessageViaParams={{route-action "createNewMessageViaParams"}}
  />
  */
  {
    "id": "JPkwS8PY",
    "block": "[[[41,[30,0,[\"site\",\"mobileView\"]],[[[1,\"  \"],[10,0],[14,0,\"card-cloak hidden\"],[12],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[8,[39,1],[[24,\"role\",\"dialog\"],[24,\"aria-labelledby\",\"discourse-user-card-title\"]],[[\"@topic\",\"@showUser\",\"@filterPosts\",\"@composePrivateMessage\",\"@createNewMessageViaParams\"],[[30,0,[\"topic\",\"model\"]],[30,0,[\"showUser\"]],[30,0,[\"filterPosts\"]],[28,[37,2],[\"composePrivateMessage\"],null],[28,[37,2],[\"createNewMessageViaParams\"],null]]],null],[1,\"\\n\\n\"],[8,[39,3],null,[[\"@topic\",\"@showUser\",\"@showGroup\",\"@createNewMessageViaParams\"],[[30,0,[\"topic\",\"model\"]],[30,0,[\"showUser\"]],[30,0,[\"showGroup\"]],[28,[37,2],[\"createNewMessageViaParams\"],null]]],null]],[],false,[\"if\",\"user-card-contents\",\"route-action\",\"group-card-contents\"]]",
    "moduleName": "discourse/components/card-container.hbs",
    "isStrictMode": false
  });
  let CardWrapper = (_class = class CardWrapper extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "site", _descriptor, this);
      _initializerDefineProperty(this, "topic", _descriptor2, this);
    }
    filterPosts(user) {
      const topicController = this.topic;
      topicController.send("filterParticipant", user);
    }
    showUser(user) {
      _url.default.routeTo((0, _url.userPath)(user.username_lower));
    }
    showGroup(group) {
      _url.default.routeTo((0, _url.groupPath)(group.name));
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "site", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "topic", [_controller.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "filterPosts", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "filterPosts"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "showUser", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "showUser"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "showGroup", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "showGroup"), _class.prototype)), _class);
  _exports.default = CardWrapper;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, CardWrapper);
});
define("discourse/components/welcome-topic-banner", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/object", "discourse-common/lib/get-owner", "discourse/models/topic", "discourse/models/composer", "@ember/service"], function (_exports, _component, _templateFactory, _component2, _object, _getOwner, _topic, _composer, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/object",0,"discourse-common/lib/get-owner",0,"discourse/models/topic",0,"discourse/models/composer",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="welcome-cta">
    <div class="welcome-cta__content">
      <h1 class="welcome-cta__title">{{i18n "welcome_topic_banner.title"}}</h1>
      <p class="welcome-cta__description">{{i18n
          "welcome_topic_banner.description"
        }}</p>
    </div>
    <DButton
      @class="btn-primary welcome-cta__button"
      @action={{action "editWelcomeTopic"}}
      @label="welcome_topic_banner.button_title"
      @icon="pencil-alt"
    />
  </div>
  */
  {
    "id": "HM8XowTW",
    "block": "[[[10,0],[14,0,\"welcome-cta\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"welcome-cta__content\"],[12],[1,\"\\n    \"],[10,\"h1\"],[14,0,\"welcome-cta__title\"],[12],[1,[28,[35,0],[\"welcome_topic_banner.title\"],null]],[13],[1,\"\\n    \"],[10,2],[14,0,\"welcome-cta__description\"],[12],[1,[28,[35,0],[\"welcome_topic_banner.description\"],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[8,[39,1],null,[[\"@class\",\"@action\",\"@label\",\"@icon\"],[\"btn-primary welcome-cta__button\",[28,[37,2],[[30,0],\"editWelcomeTopic\"],null],\"welcome_topic_banner.button_title\",\"pencil-alt\"]],null],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/components/welcome-topic-banner.hbs",
    "isStrictMode": false
  });
  let WelcomeTopicBanner = (_class = class WelcomeTopicBanner extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "siteSettings", _descriptor, this);
      _initializerDefineProperty(this, "store", _descriptor2, this);
    }
    editWelcomeTopic() {
      const topicController = (0, _getOwner.getOwner)(this).lookup("controller:topic");
      _topic.default.find(this.siteSettings.welcome_topic_id, {}).then(topic => {
        this.store.createRecord("topic", {
          id: topic.id,
          slug: topic.slug
        }).postStream.loadPostByPostNumber(1).then(post => {
          post.topic.setProperties({
            draft_key: _composer.default.EDIT,
            "details.can_edit": true
          });
          topicController.send("editPost", post);
        });
      });
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "store", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "editWelcomeTopic", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "editWelcomeTopic"), _class.prototype)), _class);
  _exports.default = WelcomeTopicBanner;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, WelcomeTopicBanner);
});
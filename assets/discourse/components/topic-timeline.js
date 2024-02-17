define("discourse/components/topic-timeline", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@glimmer/tracking", "discourse/lib/optional-service", "@ember/service", "discourse-common/utils/decorators", "I18n", "@ember/object"], function (_exports, _component, _templateFactory, _component2, _tracking, _optionalService, _service, _decorators, _I18n, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@glimmer/tracking",0,"discourse/lib/optional-service",0,"@ember/service",0,"discourse-common/utils/decorators",0,"I18n",0,"@ember/object"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div
    class={{concat-class "timeline-container" this.classes}}
    {{did-insert this.addShowClass}}
  >
    <div class="topic-timeline" {{did-insert this.addUserTip}}>
      <TopicTimeline::Container
        @model={{@model}}
        @enteredIndex={{this.enteredIndex}}
        @jumpTop={{@jumpTop}}
        @jumpBottom={{@jumpBottom}}
        @jumpEnd={{@jumpEnd}}
        @jumpToIndex={{@jumpToIndex}}
        @jumpToPostPrompt={{@jumpToPostPrompt}}
        @fullscreen={{@fullscreen}}
        @mobileView={{@mobileView}}
        @toggleMultiSelect={{@toggleMultiSelect}}
        @showTopicSlowModeUpdate={{@showTopicSlowModeUpdate}}
        @showSummary={{@showSummary}}
        @deleteTopic={{@deleteTopic}}
        @recoverTopic={{@recoverTopic}}
        @toggleClosed={{@toggleClosed}}
        @toggleArchived={{@toggleArchived}}
        @toggleVisibility={{@toggleVisibility}}
        @showTopicTimerModal={{@showTopicTimerModal}}
        @showFeatureTopic={{@showFeatureTopic}}
        @showChangeTimestamp={{@showChangeTimestamp}}
        @resetBumpDate={{@resetBumpDate}}
        @convertToPublicTopic={{@convertToPublicTopic}}
        @convertToPrivateMessage={{@convertToPrivateMessage}}
        @replyToPost={{@replyToPost}}
        @setDocked={{this.setDocked}}
        @setDockedBottom={{this.setDockedBottom}}
      />
    </div>
  </div>
  */
  {
    "id": "Bg5CGrZr",
    "block": "[[[11,0],[16,0,[28,[37,0],[\"timeline-container\",[30,0,[\"classes\"]]],null]],[4,[38,1],[[30,0,[\"addShowClass\"]]],null],[12],[1,\"\\n  \"],[11,0],[24,0,\"topic-timeline\"],[4,[38,1],[[30,0,[\"addUserTip\"]]],null],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@model\",\"@enteredIndex\",\"@jumpTop\",\"@jumpBottom\",\"@jumpEnd\",\"@jumpToIndex\",\"@jumpToPostPrompt\",\"@fullscreen\",\"@mobileView\",\"@toggleMultiSelect\",\"@showTopicSlowModeUpdate\",\"@showSummary\",\"@deleteTopic\",\"@recoverTopic\",\"@toggleClosed\",\"@toggleArchived\",\"@toggleVisibility\",\"@showTopicTimerModal\",\"@showFeatureTopic\",\"@showChangeTimestamp\",\"@resetBumpDate\",\"@convertToPublicTopic\",\"@convertToPrivateMessage\",\"@replyToPost\",\"@setDocked\",\"@setDockedBottom\"],[[30,1],[30,0,[\"enteredIndex\"]],[30,2],[30,3],[30,4],[30,5],[30,6],[30,7],[30,8],[30,9],[30,10],[30,11],[30,12],[30,13],[30,14],[30,15],[30,16],[30,17],[30,18],[30,19],[30,20],[30,21],[30,22],[30,23],[30,0,[\"setDocked\"]],[30,0,[\"setDockedBottom\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"@model\",\"@jumpTop\",\"@jumpBottom\",\"@jumpEnd\",\"@jumpToIndex\",\"@jumpToPostPrompt\",\"@fullscreen\",\"@mobileView\",\"@toggleMultiSelect\",\"@showTopicSlowModeUpdate\",\"@showSummary\",\"@deleteTopic\",\"@recoverTopic\",\"@toggleClosed\",\"@toggleArchived\",\"@toggleVisibility\",\"@showTopicTimerModal\",\"@showFeatureTopic\",\"@showChangeTimestamp\",\"@resetBumpDate\",\"@convertToPublicTopic\",\"@convertToPrivateMessage\",\"@replyToPost\"],false,[\"concat-class\",\"did-insert\",\"topic-timeline/container\"]]",
    "moduleName": "discourse/components/topic-timeline.hbs",
    "isStrictMode": false
  });
  let TopicTimeline = (_class = class TopicTimeline extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "siteSettings", _descriptor, this);
      _initializerDefineProperty(this, "currentUser", _descriptor2, this);
      _initializerDefineProperty(this, "enteredIndex", _descriptor3, this);
      _initializerDefineProperty(this, "docked", _descriptor4, this);
      _initializerDefineProperty(this, "dockedBottom", _descriptor5, this);
      _defineProperty(this, "adminTools", (0, _optionalService.default)());
      if (this.args.prevEvent) {
        this.enteredIndex = this.args.prevEvent.postIndex - 1;
      }
    }
    get createdAt() {
      return new Date(this.args.model.created_at);
    }
    get classes() {
      const classes = [];
      if (this.args.fullscreen) {
        classes.push("timeline-fullscreen");
      }
      if (this.docked) {
        classes.push("timeline-docked");
        if (this.dockedBottom) {
          classes.push("timeline-docked-bottom");
        }
      }
      return classes.join(" ");
    }
    addShowClass(element) {
      if (this.args.fullscreen && !this.args.addShowClass) {
        element.classList.add("show");
      }
    }
    addUserTip(element) {
      if (!this.currentUser) {
        return;
      }
      this.currentUser.showUserTip({
        id: "topic_timeline",
        titleText: _I18n.default.t("user_tips.topic_timeline.title"),
        contentText: _I18n.default.t("user_tips.topic_timeline.content"),
        reference: document.querySelector("div.timeline-scrollarea-wrapper"),
        appendTo: element,
        placement: "left"
      });
    }
    setDocked(value) {
      if (this.docked !== value) {
        this.docked = value;
      }
    }
    setDockedBottom(value) {
      if (this.dockedBottom !== value) {
        this.dockedBottom = value;
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "enteredIndex", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return this.args.enteredIndex;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "docked", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "dockedBottom", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "addShowClass", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "addShowClass"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "addUserTip", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "addUserTip"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setDocked", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "setDocked"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setDockedBottom", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "setDockedBottom"), _class.prototype)), _class);
  _exports.default = TopicTimeline;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, TopicTimeline);
});
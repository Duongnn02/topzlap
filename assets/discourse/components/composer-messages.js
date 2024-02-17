define("discourse/components/composer-messages", ["exports", "@ember/component", "@ember/template-factory", "@ember-decorators/component", "@ember/object", "I18n", "discourse/lib/link-lookup", "@ember/object/computed", "discourse/lib/show-modal", "discourse/lib/ajax"], function (_exports, _component, _templateFactory, _component2, _object, _I18n, _linkLookup, _computed, _showModal, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _class, _class2, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember-decorators/component",0,"@ember/object",0,"I18n",0,"discourse/lib/link-lookup",0,"@ember/object/computed",0,"discourse/lib/show-modal",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each this.messages as |message|}}
    <ComposerMessage
      @message={{message}}
      @closeMessage={{action "closeMessage"}}
      @shareModal={{action "shareModal"}}
      @switchPM={{action "switchPM"}}
    />
  {{/each}}
  */
  {
    "id": "anoXsWEc",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,0,[\"messages\"]]],null]],null],null,[[[1,\"  \"],[8,[39,2],null,[[\"@message\",\"@closeMessage\",\"@shareModal\",\"@switchPM\"],[[30,1],[28,[37,3],[[30,0],\"closeMessage\"],null],[28,[37,3],[[30,0],\"shareModal\"],null],[28,[37,3],[[30,0],\"switchPM\"],null]]],null],[1,\"\\n\"]],[1]],null]],[\"message\"],false,[\"each\",\"-track-array\",\"composer-message\",\"action\"]]",
    "moduleName": "discourse/components/composer-messages.hbs",
    "isStrictMode": false
  });
  let _messagesCache = {};
  let _recipient_names = [];
  let ComposerMessages = (_dec = (0, _component2.classNameBindings)(":composer-popup-container", "hidden"), _dec2 = (0, _computed.not)("composer.viewOpenOrFullscreen"), _dec(_class = (_class2 = class ComposerMessages extends _component.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "checkedMessages", false);
      _defineProperty(this, "messages", null);
      _defineProperty(this, "messagesByTemplate", null);
      _defineProperty(this, "queuedForTyping", null);
      _defineProperty(this, "similarTopics", null);
      _defineProperty(this, "usersNotSeen", null);
      _initializerDefineProperty(this, "hidden", _descriptor, this);
      _defineProperty(this, "_lastSimilaritySearch", null);
      _defineProperty(this, "_similarTopicsMessage", null);
    }
    didInsertElement() {
      super.didInsertElement(...arguments);
      this.appEvents.on("composer:typed-reply", this, this._typedReply);
      this.appEvents.on("composer:opened", this, this._findMessages);
      this.appEvents.on("composer:find-similar", this, this._findSimilar);
      this.appEvents.on("composer-messages:close", this, this._closeTop);
      this.appEvents.on("composer-messages:create", this, this._create);
      this.reset();
    }
    willDestroyElement() {
      super.willDestroyElement(...arguments);
      this.appEvents.off("composer:typed-reply", this, this._typedReply);
      this.appEvents.off("composer:opened", this, this._findMessages);
      this.appEvents.off("composer:find-similar", this, this._findSimilar);
      this.appEvents.off("composer-messages:close", this, this._closeTop);
      this.appEvents.off("composer-messages:create", this, this._create);
    }
    _closeTop() {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      this.messages.popObject();
      this.set("messageCount", this.messages.length);
    }
    _removeMessage(message) {
      this.messages.removeObject(message);
      this.set("messageCount", this.messages.length);
    }
    _create(info) {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      this.reset();
      this.popup(_object.default.create(info));
    }

    // Resets all active messages.
    // For example if composing a new post.
    reset() {
      this.setProperties({
        messages: [],
        messagesByTemplate: {},
        queuedForTyping: [],
        checkedMessages: false,
        similarTopics: []
      });
    }

    // Called after the user has typed a reply.
    // Some messages only get shown after being typed.
    async _typedReply() {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      for (const msg of this.queuedForTyping) {
        if (this.composer.whisper && msg.hide_if_whisper) {
          return;
        }
        this.popup(msg);
      }
      if (this.composer.privateMessage) {
        if (this.composer.targetRecipientsArray.length > 0 && this.composer.targetRecipientsArray.every(r => r.name === this.currentUser.username)) {
          const message = this.composer.store.createRecord("composer-message", {
            id: "yourself_confirm",
            templateName: "education",
            title: _I18n.default.t("composer.yourself_confirm.title"),
            body: _I18n.default.t("composer.yourself_confirm.body")
          });
          this.popup(message);
        }
        const recipient_names = this.composer.targetRecipientsArray.filter(r => r.type === "user").map(_ref => {
          let {
            name
          } = _ref;
          return name;
        });
        if (recipient_names.length > 0 && recipient_names.length !== _recipient_names.length && !recipient_names.every((v, i) => v === _recipient_names[i])) {
          _recipient_names = recipient_names;
          const response = await (0, _ajax.ajax)(`/composer_messages/user_not_seen_in_a_while`, {
            type: "GET",
            data: {
              usernames: recipient_names
            }
          });
          if (this.isDestroying || this.isDestroyed) {
            return;
          }
          if (response.user_count > 0 && this.usersNotSeen !== response.usernames.join("-")) {
            this.set("usersNotSeen", response.usernames.join("-"));
            this.messagesByTemplate["education"] = undefined;
            let usernames = [];
            response.usernames.forEach((username, index) => {
              usernames[index] = `<a class='mention' href='/u/${username}'>@${username}</a>`;
            });
            let body_key;
            if (response.user_count === 1) {
              body_key = "composer.user_not_seen_in_a_while.single";
            } else {
              body_key = "composer.user_not_seen_in_a_while.multiple";
            }
            const message = this.composer.store.createRecord("composer-message", {
              id: "user-not-seen",
              templateName: "education",
              body: _I18n.default.t(body_key, {
                usernames: usernames.join(", "),
                time_ago: response.time_ago
              })
            });
            this.popup(message);
          }
        }
      }
    }
    async _findSimilar() {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }

      // We don't care about similar topics unless creating a topic
      if (!this.composer.creatingTopic) {
        return;
      }

      // TODO: pass the 200 in from somewhere
      const raw = (this.composer.reply || "").slice(0, 200);
      const title = this.composer.title || "";

      // Ensure we have at least a title
      if (title.length < this.siteSettings.min_title_similar_length) {
        return;
      }

      // Don't search over and over
      const concat = title + raw;
      if (concat === this._lastSimilaritySearch) {
        return;
      }
      this._lastSimilaritySearch = concat;
      this._similarTopicsMessage ||= this.composer.store.createRecord("composer-message", {
        id: "similar_topics",
        templateName: "similar-topics",
        extraClass: "similar-topics"
      });
      const topics = await this.composer.store.find("similar-topic", {
        title,
        raw
      });
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      this.similarTopics.clear();
      this.similarTopics.pushObjects(topics.content);
      if (this.similarTopics.length > 0) {
        this._similarTopicsMessage.set("similarTopics", this.similarTopics);
        this.popup(this._similarTopicsMessage);
      } else if (this._similarTopicsMessage) {
        this.hideMessage(this._similarTopicsMessage);
      }
    }

    // Figure out if there are any messages that should be displayed above the composer.
    async _findMessages() {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      if (this.checkedMessages) {
        return;
      }
      const args = {
        composer_action: this.composer.action
      };
      const topicId = this.composer.topic?.id;
      const postId = this.composer.post?.id;
      if (topicId) {
        args.topic_id = topicId;
      }
      if (postId) {
        args.post_id = postId;
      }
      const cacheKey = `${args.composer_action}${args.topic_id}${args.post_id}`;
      let messages;
      if (_messagesCache.cacheKey === cacheKey) {
        messages = _messagesCache.messages;
      } else {
        messages = await this.composer.store.find("composer-message", args);
        if (this.isDestroying || this.isDestroyed) {
          return;
        }
        _messagesCache = {
          messages,
          cacheKey
        };
      }

      // Checking composer messages on replies can give us a list of links to check for
      // duplicates
      if (messages.extras?.duplicate_lookup) {
        this.addLinkLookup(new _linkLookup.default(messages.extras.duplicate_lookup));
      }
      this.set("checkedMessages", true);
      messages.forEach(msg => {
        if (msg.wait_for_typing) {
          this.queuedForTyping.addObject(msg);
        } else {
          this.popup(msg);
        }
      });
    }
    closeMessage(message, event) {
      event?.preventDefault();
      this._removeMessage(message);
    }
    hideMessage(message) {
      this._removeMessage(message);

      // kind of hacky but the visibility depends on this
      this.messagesByTemplate[message.templateName] = undefined;
    }
    popup(message) {
      if (!this.messagesByTemplate[message.templateName]) {
        this.messages.pushObject(message);
        this.set("messageCount", this.messages.length);
        this.messagesByTemplate[message.templateName] = message;
      }
    }
    shareModal() {
      const {
        topic
      } = this.composer;
      const controller = (0, _showModal.default)("share-topic", {
        model: topic.category
      });
      controller.setProperties({
        allowInvites: topic.details.can_invite_to && !topic.archived && !topic.closed && !topic.deleted,
        topic
      });
    }
    switchPM(message) {
      this.composer.set("action", "privateMessage");
      this.composer.set("targetRecipients", message.reply_username);
      this._removeMessage(message);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hidden", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class2.prototype, "closeMessage", [_object.action], Object.getOwnPropertyDescriptor(_class2.prototype, "closeMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hideMessage", [_object.action], Object.getOwnPropertyDescriptor(_class2.prototype, "hideMessage"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "popup", [_object.action], Object.getOwnPropertyDescriptor(_class2.prototype, "popup"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "shareModal", [_object.action], Object.getOwnPropertyDescriptor(_class2.prototype, "shareModal"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "switchPM", [_object.action], Object.getOwnPropertyDescriptor(_class2.prototype, "switchPM"), _class2.prototype)), _class2)) || _class);
  _exports.default = ComposerMessages;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ComposerMessages);
});
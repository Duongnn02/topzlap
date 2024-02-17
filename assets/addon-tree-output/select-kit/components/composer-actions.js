define("select-kit/components/composer-actions", ["exports", "discourse/models/composer", "discourse-common/utils/decorators", "discourse/models/draft", "select-kit/components/dropdown-select-box", "I18n", "@ember/string", "@ember/object/computed", "@ember/utils", "@ember/service"], function (_exports, _composer, _decorators, _draft, _dropdownSelectBox, _I18n, _string, _computed, _utils, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports._clearSnapshots = _clearSnapshots;
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/composer",0,"discourse-common/utils/decorators",0,"discourse/models/draft",0,"select-kit/components/dropdown-select-box",0,"I18n",0,"@ember/string",0,"@ember/object/computed",0,"@ember/utils",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // Component can get destroyed and lose state
  let _topicSnapshot = null;
  let _postSnapshot = null;
  let _actionSnapshot = null;
  function _clearSnapshots() {
    _topicSnapshot = null;
    _postSnapshot = null;
    _actionSnapshot = null;
  }
  var _default = _dropdownSelectBox.default.extend((_dec = (0, _decorators.default)("isEditing", "action", "whisper", "noBump", "isInSlowMode"), _dec2 = (0, _decorators.default)("seq"), (_obj = {
    dialog: (0, _service.inject)(),
    seq: 0,
    pluginApiIdentifiers: ["composer-actions"],
    classNames: ["composer-actions"],
    isEditing: (0, _computed.equal)("action", _composer.EDIT),
    isInSlowMode: (0, _computed.gt)("topic.slow_mode_seconds", 0),
    selectKitOptions: {
      icon: "iconForComposerAction",
      filterable: false,
      showFullTitle: false,
      preventHeaderFocus: true,
      customStyle: true
    },
    iconForComposerAction(isEditing, action, whisper, noBump, isInSlowMode) {
      if (action === _composer.CREATE_TOPIC) {
        return "plus";
      } else if (action === _composer.PRIVATE_MESSAGE) {
        return "envelope";
      } else if (action === _composer.CREATE_SHARED_DRAFT) {
        return "far-clipboard";
      } else if (whisper) {
        return "far-eye-slash";
      } else if (noBump) {
        return "anchor";
      } else if (isInSlowMode) {
        return "hourglass-start";
      } else if (isEditing) {
        return "pencil-alt";
      } else {
        return "share";
      }
    },
    contentChanged() {
      this.set("seq", this.seq + 1);
    },
    didReceiveAttrs() {
      this._super(...arguments);
      let changeContent = false;

      // if we change topic we want to change both snapshots
      if (this.topic && (!_topicSnapshot || this.topic.id !== _topicSnapshot.id)) {
        _topicSnapshot = this.topic;
        _postSnapshot = this.post;
        changeContent = true;
      }

      // if we hit reply on a different post we want to change postSnapshot
      if (this.post && (!_postSnapshot || this.post.id !== _postSnapshot.id)) {
        _postSnapshot = this.post;
        changeContent = true;
      }
      if (this.action !== _actionSnapshot) {
        _actionSnapshot = this.action;
        changeContent = true;
      }
      if (changeContent) {
        this.contentChanged();
      }
      this.set("selectKit.isHidden", (0, _utils.isEmpty)(this.content));
    },
    modifySelection() {
      return {};
    },
    content() {
      let items = [];
      if (this.action === _composer.REPLY && this.topic && this.topic.isPrivateMessage && this.topic.details && (this.topic.details.allowed_users.length > 1 || this.topic.details.allowed_groups.length > 0) && !this.isEditing && _topicSnapshot) {
        items.push({
          name: _I18n.default.t("composer.composer_actions.reply_as_new_group_message.label"),
          description: _I18n.default.t("composer.composer_actions.reply_as_new_group_message.desc"),
          icon: "plus",
          id: "reply_as_new_group_message"
        });
      }
      if (this.action !== _composer.CREATE_TOPIC && this.action !== _composer.CREATE_SHARED_DRAFT && this.action === _composer.REPLY && this.topic && !this.topic.isPrivateMessage && !this.isEditing && _topicSnapshot) {
        items.push({
          name: _I18n.default.t("composer.composer_actions.reply_as_new_topic.label"),
          description: _I18n.default.t("composer.composer_actions.reply_as_new_topic.desc"),
          icon: "plus",
          id: "reply_as_new_topic"
        });
      }
      if (this.action !== _composer.REPLY && _postSnapshot || this.action === _composer.REPLY && _postSnapshot && !(this.replyOptions.userAvatar && this.replyOptions.userLink)) {
        items.push({
          name: _I18n.default.t("composer.composer_actions.reply_to_post.label", {
            postUsername: _postSnapshot.username
          }),
          description: _I18n.default.t("composer.composer_actions.reply_to_post.desc"),
          icon: "share",
          id: "reply_to_post"
        });
      }
      if (!this.isEditing && (this.action !== _composer.REPLY && _topicSnapshot || this.action === _composer.REPLY && _topicSnapshot && this.replyOptions.userAvatar && this.replyOptions.userLink && this.replyOptions.topicLink)) {
        items.push({
          name: _I18n.default.t("composer.composer_actions.reply_to_topic.label"),
          description: _I18n.default.t("composer.composer_actions.reply_to_topic.desc"),
          icon: "share",
          id: "reply_to_topic"
        });
      }

      // if answered post is a whisper, we can only answer with a whisper so no need for toggle
      if (this.canWhisper && (!this.replyOptions.postLink || !_postSnapshot || _postSnapshot.post_type !== this.site.post_types.whisper)) {
        items.push({
          name: _I18n.default.t("composer.composer_actions.toggle_whisper.label"),
          description: _I18n.default.t("composer.composer_actions.toggle_whisper.desc"),
          icon: "far-eye-slash",
          id: "toggle_whisper"
        });
      }
      if (this.action === _composer.CREATE_TOPIC) {
        if (this.site.shared_drafts_category_id) {
          // Shared Drafts Choice
          items.push({
            name: _I18n.default.t("composer.composer_actions.shared_draft.label"),
            description: _I18n.default.t("composer.composer_actions.shared_draft.desc"),
            icon: "far-clipboard",
            id: "shared_draft"
          });
        }
      }
      const showToggleTopicBump = this.get("currentUser.staff") || this.get("currentUser.trust_level") === 4;
      if (this.action === _composer.REPLY && showToggleTopicBump) {
        items.push({
          name: _I18n.default.t("composer.composer_actions.toggle_topic_bump.label"),
          description: _I18n.default.t("composer.composer_actions.toggle_topic_bump.desc"),
          icon: "anchor",
          id: "toggle_topic_bump"
        });
      }
      if (items.length === 0) {
        items.push({
          name: _I18n.default.t("composer.composer_actions.create_topic.label"),
          description: _I18n.default.t("composer.composer_actions.reply_as_new_topic.desc"),
          icon: "share",
          id: "create_topic"
        });
      }
      return items;
    },
    _replyFromExisting(options, post, topic) {
      this.closeComposer();
      this.openComposer(options, post, topic);
    },
    _openComposer(options) {
      this.closeComposer();
      this.openComposer(options);
    },
    toggleWhisperSelected(options, model) {
      model.toggleProperty("whisper");
    },
    toggleTopicBumpSelected(options, model) {
      model.toggleProperty("noBump");
    },
    replyAsNewGroupMessageSelected(options) {
      const recipients = [];
      const details = this.topic.details;
      details.allowed_users.forEach(u => recipients.push(u.username));
      details.allowed_groups.forEach(g => recipients.push(g.name));
      options.action = _composer.PRIVATE_MESSAGE;
      options.recipients = recipients.join(",");
      options.archetypeId = "private_message";
      options.skipDraftCheck = true;
      this._replyFromExisting(options, _postSnapshot, _topicSnapshot);
    },
    replyToTopicSelected(options) {
      options.action = _composer.REPLY;
      options.topic = _topicSnapshot;
      options.skipDraftCheck = true;
      this._openComposer(options);
    },
    replyToPostSelected(options) {
      options.action = _composer.REPLY;
      options.post = _postSnapshot;
      options.skipDraftCheck = true;
      this._openComposer(options);
    },
    replyAsNewTopicSelected(options) {
      _draft.default.get("new_topic").then(response => {
        if (response.draft) {
          this.dialog.confirm({
            message: _I18n.default.t("composer.composer_actions.reply_as_new_topic.confirm"),
            confirmButtonLabel: "composer.ok_proceed",
            didConfirm: () => this._replyAsNewTopicSelect(options)
          });
        } else {
          this._replyAsNewTopicSelect(options);
        }
      });
    },
    _replyAsNewTopicSelect(options) {
      options.action = _composer.CREATE_TOPIC;
      options.categoryId = this.get("composerModel.topic.category.id");
      options.disableScopedCategory = true;
      options.skipDraftCheck = true;
      this._replyFromExisting(options, _postSnapshot, _topicSnapshot);
    },
    replyAsPrivateMessageSelected(options) {
      let usernames;
      if (_postSnapshot && !_postSnapshot.get("yours")) {
        const postUsername = _postSnapshot.get("username");
        if (postUsername) {
          usernames = postUsername;
        }
      } else if (this.get("composerModel.topic")) {
        const stream = this.get("composerModel.topic.postStream");
        if (stream.get("firstPostPresent")) {
          const post = stream.get("posts.firstObject");
          if (post && !post.get("yours") && post.get("username")) {
            usernames = post.get("username");
          }
        }
      }
      options.action = _composer.PRIVATE_MESSAGE;
      options.recipients = usernames;
      options.archetypeId = "private_message";
      options.skipDraftCheck = true;
      this._replyFromExisting(options, _postSnapshot, _topicSnapshot);
    },
    _switchCreate(options, action) {
      options.action = action;
      options.categoryId = this.get("composerModel.categoryId");
      options.topicTitle = this.get("composerModel.title");
      options.tags = this.get("composerModel.tags");
      options.skipDraftCheck = true;
      this._openComposer(options);
    },
    createTopicSelected(options) {
      this._switchCreate(options, _composer.CREATE_TOPIC);
    },
    sharedDraftSelected(options) {
      this._switchCreate(options, _composer.CREATE_SHARED_DRAFT);
    },
    actions: {
      onChange(value) {
        const action = `${(0, _string.camelize)(value)}Selected`;
        if (this[action]) {
          this[action](this.composerModel.getProperties("draftKey", "draftSequence", "title", "reply", "disableScopedCategory"), this.composerModel);
          this.contentChanged();
        } else {
          // eslint-disable-next-line no-console
          console.error(`No method '${action}' found`);
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "iconForComposerAction", [_dec], Object.getOwnPropertyDescriptor(_obj, "iconForComposerAction"), _obj), _applyDecoratedDescriptor(_obj, "content", [_dec2], Object.getOwnPropertyDescriptor(_obj, "content"), _obj)), _obj)));
  _exports.default = _default;
});
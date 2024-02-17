define("discourse/plugins/discourse-presence/discourse/components/composer-presence-display", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/object/computed", "@ember/service"], function (_exports, _component, _templateFactory, _decorators, _computed, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"@ember/component",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.shouldDisplay}}
    <div class="presence-users">
      <div class="presence-avatars">
        {{#each this.presenceUsers as |user|}}
          {{avatar user imageSize="small"}}
        {{/each}}
      </div>
      <span class="presence-text">
        <span class="description">
          {{#if this.isReply~}}
            {{i18n "presence.replying" count=this.presenceUsers.length}}
          {{~else~}}
            {{i18n "presence.editing" count=this.presenceUsers.length}}
          {{~/if}}
          {{~""~}}
        </span>
        {{~""~}}
        <span class="wave">
          {{~""~}}
          <span class="dot">.</span>{{~""~}}
          <span class="dot">.</span>{{~""~}}
          <span class="dot">.</span>{{~""~}}
        </span>
      </span>
    </div>
  {{/if}}
  */
  {
    "id": "qNZjYTNd",
    "block": "[[[41,[30,0,[\"shouldDisplay\"]],[[[1,\"  \"],[10,0],[14,0,\"presence-users\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"presence-avatars\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"presenceUsers\"]]],null]],null],null,[[[1,\"        \"],[1,[28,[35,3],[[30,1]],[[\"imageSize\"],[\"small\"]]]],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n    \"],[10,1],[14,0,\"presence-text\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"description\"],[12],[1,\"\\n\"],[41,[30,0,[\"isReply\"]],[[[1,[28,[35,4],[\"presence.replying\"],[[\"count\"],[[30,0,[\"presenceUsers\",\"length\"]]]]]]],[]],[[[1,[28,[35,4],[\"presence.editing\"],[[\"count\"],[[30,0,[\"presenceUsers\",\"length\"]]]]]]],[]]],[1,\"\"],[13],[1,\"\"],[10,1],[14,0,\"wave\"],[12],[1,\"\"],[10,1],[14,0,\"dot\"],[12],[1,\".\"],[13],[1,\"\"],[10,1],[14,0,\"dot\"],[12],[1,\".\"],[13],[1,\"\"],[10,1],[14,0,\"dot\"],[12],[1,\".\"],[13],[1,\"\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"user\"],false,[\"if\",\"each\",\"-track-array\",\"avatar\",\"i18n\"]]",
    "moduleName": "discourse/plugins/discourse-presence/discourse/components/composer-presence-display.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("model.replyingToTopic", "model.editingPost", "model.whisper", "model.composerOpened"), _dec2 = (0, _decorators.default)("model.topic.id", "isReply", "isWhisper"), _dec3 = (0, _decorators.default)("model.topic.id", "isReply", "isWhisper"), _dec4 = (0, _decorators.default)("isEdit", "model.post.id"), _dec5 = (0, _decorators.observes)("replyChannelName", "whisperChannelName", "editChannelName"), _dec6 = (0, _decorators.default)("isReply", "replyingUsers.[]", "editingUsers.[]"), _dec7 = (0, _decorators.on)("didInsertElement"), _dec8 = (0, _decorators.observes)("model.reply", "state", "model.post.id", "model.topic.id"), _dec9 = (0, _decorators.on)("willDestroyElement"), (_obj = {
    tagName: "",
    presence: (0, _service.inject)(),
    composerPresenceManager: (0, _service.inject)(),
    state(replyingToTopic, editingPost, whisper, composerOpen) {
      if (!composerOpen) {
        return;
      } else if (editingPost) {
        return "edit";
      } else if (whisper) {
        return "whisper";
      } else if (replyingToTopic) {
        return "reply";
      }
    },
    isReply: (0, _computed.equal)("state", "reply"),
    isEdit: (0, _computed.equal)("state", "edit"),
    isWhisper: (0, _computed.equal)("state", "whisper"),
    replyChannelName(topicId, isReply, isWhisper) {
      if (topicId && (isReply || isWhisper)) {
        return `/discourse-presence/reply/${topicId}`;
      }
    },
    whisperChannelName(topicId, isReply, isWhisper) {
      if (topicId && this.currentUser.whisperer && (isReply || isWhisper)) {
        return `/discourse-presence/whisper/${topicId}`;
      }
    },
    editChannelName(isEdit, postId) {
      if (isEdit) {
        return `/discourse-presence/edit/${postId}`;
      }
    },
    _setupChannel(channelKey, name) {
      if (this[channelKey]?.name !== name) {
        this[channelKey]?.unsubscribe();
        if (name) {
          this.set(channelKey, this.presence.getChannel(name));
          this[channelKey].subscribe();
        } else if (this[channelKey]) {
          this.set(channelKey, null);
        }
      }
    },
    _setupChannels() {
      this._setupChannel("replyChannel", this.replyChannelName);
      this._setupChannel("whisperChannel", this.whisperChannelName);
      this._setupChannel("editChannel", this.editChannelName);
    },
    _cleanupChannels() {
      this._setupChannel("replyChannel", null);
      this._setupChannel("whisperChannel", null);
      this._setupChannel("editChannel", null);
    },
    replyingUsers: (0, _computed.union)("replyChannel.users", "whisperChannel.users"),
    editingUsers: (0, _computed.readOnly)("editChannel.users"),
    presenceUsers(isReply, replyingUsers, editingUsers) {
      const users = isReply ? replyingUsers : editingUsers;
      return users?.filter(u => u.id !== this.currentUser.id)?.slice(0, this.siteSettings.presence_max_users_shown);
    },
    shouldDisplay: (0, _computed.gt)("presenceUsers.length", 0),
    subscribe() {
      this._setupChannels();
    },
    _contentChanged() {
      if (this.model.reply === "") {
        return;
      }
      const entity = this.state === "edit" ? this.model?.post : this.model?.topic;
      this.composerPresenceManager.notifyState(this.state, entity?.id);
    },
    closeComposer() {
      this._cleanupChannels();
      this.composerPresenceManager.leave();
    }
  }, (_applyDecoratedDescriptor(_obj, "state", [_dec], Object.getOwnPropertyDescriptor(_obj, "state"), _obj), _applyDecoratedDescriptor(_obj, "replyChannelName", [_dec2], Object.getOwnPropertyDescriptor(_obj, "replyChannelName"), _obj), _applyDecoratedDescriptor(_obj, "whisperChannelName", [_dec3], Object.getOwnPropertyDescriptor(_obj, "whisperChannelName"), _obj), _applyDecoratedDescriptor(_obj, "editChannelName", [_dec4], Object.getOwnPropertyDescriptor(_obj, "editChannelName"), _obj), _applyDecoratedDescriptor(_obj, "_setupChannels", [_dec5], Object.getOwnPropertyDescriptor(_obj, "_setupChannels"), _obj), _applyDecoratedDescriptor(_obj, "presenceUsers", [_dec6], Object.getOwnPropertyDescriptor(_obj, "presenceUsers"), _obj), _applyDecoratedDescriptor(_obj, "subscribe", [_dec7], Object.getOwnPropertyDescriptor(_obj, "subscribe"), _obj), _applyDecoratedDescriptor(_obj, "_contentChanged", [_dec8], Object.getOwnPropertyDescriptor(_obj, "_contentChanged"), _obj), _applyDecoratedDescriptor(_obj, "closeComposer", [_dec9], Object.getOwnPropertyDescriptor(_obj, "closeComposer"), _obj)), _obj))));
  _exports.default = _default;
});
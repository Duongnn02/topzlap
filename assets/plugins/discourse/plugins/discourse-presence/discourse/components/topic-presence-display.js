define("discourse/plugins/discourse-presence/discourse/components/topic-presence-display", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/object/computed", "@ember/service"], function (_exports, _component, _templateFactory, _decorators, _computed, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/component",0,"@ember/object/computed",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.shouldDisplay}}
    <div class="presence-users">
      <div class="presence-avatars">
        {{#each this.users as |user|}}
          <UserLink @user={{user}}>
            {{avatar user imageSize="small"}}
          </UserLink>
        {{/each}}
      </div>
      <span class="presence-text">
        <span class="description">
          {{i18n "presence.replying_to_topic" count=this.users.length}}
        </span>
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
    "id": "Q0K+9CNI",
    "block": "[[[41,[30,0,[\"shouldDisplay\"]],[[[1,\"  \"],[10,0],[14,0,\"presence-users\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"presence-avatars\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"users\"]]],null]],null],null,[[[1,\"        \"],[8,[39,3],null,[[\"@user\"],[[30,1]]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,4],[[30,1]],[[\"imageSize\"],[\"small\"]]]],[1,\"\\n        \"]],[]]]]],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n    \"],[10,1],[14,0,\"presence-text\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"description\"],[12],[1,\"\\n        \"],[1,[28,[35,5],[\"presence.replying_to_topic\"],[[\"count\"],[[30,0,[\"users\",\"length\"]]]]]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,1],[14,0,\"wave\"],[12],[1,\"\"],[10,1],[14,0,\"dot\"],[12],[1,\".\"],[13],[1,\"\"],[10,1],[14,0,\"dot\"],[12],[1,\".\"],[13],[1,\"\"],[10,1],[14,0,\"dot\"],[12],[1,\".\"],[13],[1,\"\"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"user\"],false,[\"if\",\"each\",\"-track-array\",\"user-link\",\"avatar\",\"i18n\"]]",
    "moduleName": "discourse/plugins/discourse-presence/discourse/components/topic-presence-display.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("replyChannel.users.[]"), _dec2 = (0, _decorators.default)("whisperChannel.users.[]"), _dec3 = (0, _decorators.default)("topic.id"), _dec4 = (0, _decorators.default)("topic.id"), _dec5 = (0, _decorators.on)("willDestroyElement"), (_obj = {
    topic: null,
    presence: (0, _service.inject)(),
    replyChannel: null,
    whisperChannel: null,
    replyUsers(users) {
      return users?.filter(u => u.id !== this.currentUser.id);
    },
    whisperUsers(users) {
      return users?.filter(u => u.id !== this.currentUser.id);
    },
    users: (0, _computed.union)("replyUsers", "whisperUsers"),
    replyChannelName(id) {
      return `/discourse-presence/reply/${id}`;
    },
    whisperChannelName(id) {
      return `/discourse-presence/whisper/${id}`;
    },
    shouldDisplay: (0, _computed.gt)("users.length", 0),
    didReceiveAttrs() {
      this._super(...arguments);
      if (this.replyChannel?.name !== this.replyChannelName) {
        this.replyChannel?.unsubscribe();
        this.set("replyChannel", this.presence.getChannel(this.replyChannelName));
        this.replyChannel.subscribe();
      }
      if (this.currentUser.staff && this.whisperChannel?.name !== this.whisperChannelName) {
        this.whisperChannel?.unsubscribe();
        this.set("whisperChannel", this.presence.getChannel(this.whisperChannelName));
        this.whisperChannel.subscribe();
      }
    },
    _destroyed() {
      this.replyChannel?.unsubscribe();
      this.whisperChannel?.unsubscribe();
    }
  }, (_applyDecoratedDescriptor(_obj, "replyUsers", [_dec], Object.getOwnPropertyDescriptor(_obj, "replyUsers"), _obj), _applyDecoratedDescriptor(_obj, "whisperUsers", [_dec2], Object.getOwnPropertyDescriptor(_obj, "whisperUsers"), _obj), _applyDecoratedDescriptor(_obj, "replyChannelName", [_dec3], Object.getOwnPropertyDescriptor(_obj, "replyChannelName"), _obj), _applyDecoratedDescriptor(_obj, "whisperChannelName", [_dec4], Object.getOwnPropertyDescriptor(_obj, "whisperChannelName"), _obj), _applyDecoratedDescriptor(_obj, "_destroyed", [_dec5], Object.getOwnPropertyDescriptor(_obj, "_destroyed"), _obj)), _obj))));
  _exports.default = _default;
});
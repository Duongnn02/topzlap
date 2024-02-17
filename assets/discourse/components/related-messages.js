define("discourse/components/related-messages", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "discourse-common/lib/get-url"], function (_exports, _component, _templateFactory, _decorators, _getUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div
    id="related-messages"
    class="suggested-topics"
    role="complementary"
    aria-labelledby="related-messages-title"
  >
    <h3 class="suggested-topics-title" id="related-messages-title">
      {{i18n "related_messages.title"}}
    </h3>
  
    <div class="topics">
      <BasicTopicList
        @hideCategory="true"
        @showPosters="true"
        @topics={{this.topic.relatedMessages}}
      />
    </div>
  
    {{#if this.targetUser}}
      <h3 class="see-all-pms-message">
        {{html-safe
          (i18n
            "related_messages.see_all"
            path=this.searchLink
            username=this.targetUser.username
          )
        }}
      </h3>
    {{/if}}
  </div>
  */
  {
    "id": "cYc+Lrud",
    "block": "[[[10,0],[14,1,\"related-messages\"],[14,0,\"suggested-topics\"],[14,\"role\",\"complementary\"],[14,\"aria-labelledby\",\"related-messages-title\"],[12],[1,\"\\n  \"],[10,\"h3\"],[14,0,\"suggested-topics-title\"],[14,1,\"related-messages-title\"],[12],[1,\"\\n    \"],[1,[28,[35,0],[\"related_messages.title\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"topics\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@hideCategory\",\"@showPosters\",\"@topics\"],[\"true\",\"true\",[30,0,[\"topic\",\"relatedMessages\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"targetUser\"]],[[[1,\"    \"],[10,\"h3\"],[14,0,\"see-all-pms-message\"],[12],[1,\"\\n      \"],[1,[28,[35,3],[[28,[37,0],[\"related_messages.see_all\"],[[\"path\",\"username\"],[[30,0,[\"searchLink\"]],[30,0,[\"targetUser\",\"username\"]]]]]],null]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[],false,[\"i18n\",\"basic-topic-list\",\"if\",\"html-safe\"]]",
    "moduleName": "discourse/components/related-messages.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("topic"), (_obj = {
    tagName: "",
    targetUser(topic) {
      if (!topic || !topic.isPrivateMessage) {
        return;
      }
      const allowedUsers = topic.details.allowed_users;
      if (topic.relatedMessages && topic.relatedMessages.length >= 5 && allowedUsers.length === 2 && topic.details.allowed_groups.length === 0 && allowedUsers.find(u => u.username === this.currentUser.username)) {
        return allowedUsers.find(u => u.username !== this.currentUser.username);
      }
    },
    searchLink() {
      return (0, _getUrl.default)(`/search?expanded=true&q=%40${this.targetUser.username}%20in%3Apersonal-direct`);
    }
  }, (_applyDecoratedDescriptor(_obj, "targetUser", [_dec], Object.getOwnPropertyDescriptor(_obj, "targetUser"), _obj), _applyDecoratedDescriptor(_obj, "searchLink", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "searchLink"), _obj)), _obj))));
  _exports.default = _default;
});
define("discourse/components/choose-message", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "@ember/utils", "@ember/runloop", "discourse-common/utils/decorators", "discourse/lib/search"], function (_exports, _component, _templateFactory, _object, _utils, _runloop, _decorators, _search) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"@ember/utils",0,"@ember/runloop",0,"discourse-common/utils/decorators",0,"discourse/lib/search"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <label for="choose-message-title">{{i18n "choose_message.title.search"}}</label>
  
  <TextField
    @value={{this.messageTitle}}
    @placeholderKey="choose_message.title.placeholder"
    @id="choose-message-title"
  />
  
  {{#if this.loading}}
    <p>{{i18n "loading"}}</p>
  {{else}}
    {{#if this.noResults}}
      <p>{{i18n "choose_message.none_found"}}</p>
    {{else}}
      {{#each this.messages as |m|}}
        <div class="controls existing-message">
          <label class="radio">
            <input
              id="choose-message-{{m.id}}"
              {{on "click" (fn this.chooseMessage m)}}
              type="radio"
              name="choose_message_id"
            />
            <span class="message-title">
              {{m.title}}
            </span>
          </label>
        </div>
      {{/each}}
    {{/if}}
  {{/if}}
  */
  {
    "id": "vpQ4YaL5",
    "block": "[[[10,\"label\"],[14,\"for\",\"choose-message-title\"],[12],[1,[28,[35,0],[\"choose_message.title.search\"],null]],[13],[1,\"\\n\\n\"],[8,[39,1],null,[[\"@value\",\"@placeholderKey\",\"@id\"],[[30,0,[\"messageTitle\"]],\"choose_message.title.placeholder\",\"choose-message-title\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"loading\"]],[[[1,\"  \"],[10,2],[12],[1,[28,[35,0],[\"loading\"],null]],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"noResults\"]],[[[1,\"    \"],[10,2],[12],[1,[28,[35,0],[\"choose_message.none_found\"],null]],[13],[1,\"\\n\"]],[]],[[[42,[28,[37,4],[[28,[37,4],[[30,0,[\"messages\"]]],null]],null],null,[[[1,\"      \"],[10,0],[14,0,\"controls existing-message\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"radio\"],[12],[1,\"\\n          \"],[11,\"input\"],[16,1,[29,[\"choose-message-\",[30,1,[\"id\"]]]]],[24,3,\"choose_message_id\"],[24,4,\"radio\"],[4,[38,5],[\"click\",[28,[37,6],[[30,0,[\"chooseMessage\"]],[30,1]],null]],null],[12],[13],[1,\"\\n          \"],[10,1],[14,0,\"message-title\"],[12],[1,\"\\n            \"],[1,[30,1,[\"title\"]]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[1]],null]],[]]]],[]]]],[\"m\"],false,[\"i18n\",\"text-field\",\"if\",\"each\",\"-track-array\",\"on\",\"fn\"]]",
    "moduleName": "discourse/components/choose-message.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.observes)("messageTitle"), _dec2 = (0, _decorators.observes)("messages"), _dec3 = (0, _decorators.debounce)(300), (_obj = {
    loading: null,
    noResults: null,
    messages: null,
    messageTitleChanged() {
      this.setProperties({
        loading: true,
        noResults: true,
        selectedTopicId: null
      });
      this.search(this.messageTitle);
    },
    messagesChanged() {
      const messages = this.messages;
      if (messages) {
        this.set("noResults", messages.length === 0);
      }
      this.set("loading", false);
    },
    search(title) {
      if ((0, _utils.isEmpty)(title)) {
        this.setProperties({
          messages: null,
          loading: false
        });
        return;
      }
      (0, _search.searchForTerm)(title, {
        typeFilter: "private_messages",
        searchForId: true,
        restrictToArchetype: "private_message"
      }).then(results => {
        if (results?.posts?.length) {
          this.set("messages", results.posts.mapBy("topic").filter(t => t.get("id") !== this.currentTopicId));
        } else {
          this.setProperties({
            messages: null,
            loading: false
          });
        }
      });
    },
    chooseMessage(message, event) {
      event?.preventDefault();
      const messageId = (0, _object.get)(message, "id");
      this.set("selectedTopicId", messageId);
      (0, _runloop.next)(() => $(`#choose-message-${messageId}`).prop("checked", "true"));
    }
  }, (_applyDecoratedDescriptor(_obj, "messageTitleChanged", [_dec], Object.getOwnPropertyDescriptor(_obj, "messageTitleChanged"), _obj), _applyDecoratedDescriptor(_obj, "messagesChanged", [_dec2], Object.getOwnPropertyDescriptor(_obj, "messagesChanged"), _obj), _applyDecoratedDescriptor(_obj, "search", [_dec3], Object.getOwnPropertyDescriptor(_obj, "search"), _obj), _applyDecoratedDescriptor(_obj, "chooseMessage", [_object.action], Object.getOwnPropertyDescriptor(_obj, "chooseMessage"), _obj)), _obj))));
  _exports.default = _default;
});
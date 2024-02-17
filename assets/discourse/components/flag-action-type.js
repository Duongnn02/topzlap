define("discourse/components/flag-action-type", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "I18n", "discourse/models/post-action-type", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _computed, _I18n, _postActionType, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object/computed",0,"@ember/component",0,"I18n",0,"discourse/models/post-action-type",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.isNotifyUser}}
    <h3>{{this.formattedName}}</h3>
    <div class="controls">
      <label class="radio">
        <input
          id="radio_{{this.flag.name_key}}"
          {{on "click" (action "changePostActionType" this.flag)}}
          type="radio"
          name="post_action_type_index"
        />
  
        <div class="flag-action-type-details">
          <span class="description">{{html-safe this.flag.description}}</span>
          {{#if this.showMessageInput}}
            <Textarea
              name="message"
              class="flag-message"
              placeholder={{this.customPlaceholder}}
              aria-label={{i18n "flagging.notify_user_textarea_label"}}
              @value={{this.message}}
            />
            <div
              class="custom-message-length {{this.customMessageLengthClasses}}"
            >{{this.customMessageLength}}</div>
          {{/if}}
        </div>
      </label>
    </div>
    {{#if this.staffFlagsAvailable}}
      <hr />
      <h3>{{i18n "flagging.notify_staff"}}</h3>
    {{/if}}
  {{else}}
    <div class="controls {{this.flag.name_key}}">
      <label class="radio">
        <input
          id="radio_{{this.flag.name_key}}"
          {{on "click" (action "changePostActionType" this.flag)}}
          type="radio"
          name="post_action_type_index"
        />
        <div class="flag-action-type-details">
          <strong>{{this.formattedName}}</strong>
          {{#if this.showDescription}}
            <div class="description">{{html-safe this.description}}</div>
          {{/if}}
          {{#if this.showMessageInput}}
            <Textarea
              name="message"
              class="flag-message"
              placeholder={{this.customPlaceholder}}
              aria-label={{i18n "flagging.notify_moderators_textarea_label"}}
              @value={{this.message}}
            />
            <div
              class="custom-message-length {{this.customMessageLengthClasses}}"
            >{{this.customMessageLength}}</div>
          {{/if}}
        </div>
      </label>
    </div>
  {{/if}}
  */
  {
    "id": "INCMEpb3",
    "block": "[[[41,[30,0,[\"isNotifyUser\"]],[[[1,\"  \"],[10,\"h3\"],[12],[1,[30,0,[\"formattedName\"]]],[13],[1,\"\\n  \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"radio\"],[12],[1,\"\\n      \"],[11,\"input\"],[16,1,[29,[\"radio_\",[30,0,[\"flag\",\"name_key\"]]]]],[24,3,\"post_action_type_index\"],[24,4,\"radio\"],[4,[38,1],[\"click\",[28,[37,2],[[30,0],\"changePostActionType\",[30,0,[\"flag\"]]],null]],null],[12],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"flag-action-type-details\"],[12],[1,\"\\n        \"],[10,1],[14,0,\"description\"],[12],[1,[28,[35,3],[[30,0,[\"flag\",\"description\"]]],null]],[13],[1,\"\\n\"],[41,[30,0,[\"showMessageInput\"]],[[[1,\"          \"],[8,[39,4],[[24,3,\"message\"],[24,0,\"flag-message\"],[16,\"placeholder\",[30,0,[\"customPlaceholder\"]]],[16,\"aria-label\",[28,[37,5],[\"flagging.notify_user_textarea_label\"],null]]],[[\"@value\"],[[30,0,[\"message\"]]]],null],[1,\"          \"],[10,0],[15,0,[29,[\"custom-message-length \",[30,0,[\"customMessageLengthClasses\"]]]]],[12],[1,[30,0,[\"customMessageLength\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[41,[30,0,[\"staffFlagsAvailable\"]],[[[1,\"    \"],[10,\"hr\"],[12],[13],[1,\"\\n    \"],[10,\"h3\"],[12],[1,[28,[35,5],[\"flagging.notify_staff\"],null]],[13],[1,\"\\n\"]],[]],null]],[]],[[[1,\"  \"],[10,0],[15,0,[29,[\"controls \",[30,0,[\"flag\",\"name_key\"]]]]],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"radio\"],[12],[1,\"\\n      \"],[11,\"input\"],[16,1,[29,[\"radio_\",[30,0,[\"flag\",\"name_key\"]]]]],[24,3,\"post_action_type_index\"],[24,4,\"radio\"],[4,[38,1],[\"click\",[28,[37,2],[[30,0],\"changePostActionType\",[30,0,[\"flag\"]]],null]],null],[12],[13],[1,\"\\n      \"],[10,0],[14,0,\"flag-action-type-details\"],[12],[1,\"\\n        \"],[10,\"strong\"],[12],[1,[30,0,[\"formattedName\"]]],[13],[1,\"\\n\"],[41,[30,0,[\"showDescription\"]],[[[1,\"          \"],[10,0],[14,0,\"description\"],[12],[1,[28,[35,3],[[30,0,[\"description\"]]],null]],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showMessageInput\"]],[[[1,\"          \"],[8,[39,4],[[24,3,\"message\"],[24,0,\"flag-message\"],[16,\"placeholder\",[30,0,[\"customPlaceholder\"]]],[16,\"aria-label\",[28,[37,5],[\"flagging.notify_moderators_textarea_label\"],null]]],[[\"@value\"],[[30,0,[\"message\"]]]],null],[1,\"          \"],[10,0],[15,0,[29,[\"custom-message-length \",[30,0,[\"customMessageLengthClasses\"]]]]],[12],[1,[30,0,[\"customMessageLength\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]],[],false,[\"if\",\"on\",\"action\",\"html-safe\",\"textarea\",\"i18n\"]]",
    "moduleName": "discourse/components/flag-action-type.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("flag.name_key"), _dec2 = (0, _decorators.default)("flag.name", "flag.name_key", "flag.is_custom_flag", "username"), _dec3 = (0, _decorators.default)("flag", "selectedFlag"), _dec4 = (0, _decorators.default)("flag.description", "flag.short_description"), _dec5 = (0, _decorators.default)("message.length"), _dec6 = (0, _decorators.default)("message.length"), (_obj = {
    classNames: ["flag-action-type"],
    customPlaceholder(nameKey) {
      return _I18n.default.t("flagging.custom_placeholder_" + nameKey);
    },
    formattedName(name, nameKey, isCustomFlag, username) {
      if (isCustomFlag) {
        return name.replace(/{{username}}|%{username}/, username);
      } else {
        return _I18n.default.t("flagging.formatted_name." + nameKey);
      }
    },
    selected(flag, selectedFlag) {
      return flag === selectedFlag;
    },
    showMessageInput: (0, _computed.and)("flag.is_custom_flag", "selected"),
    showDescription: (0, _computed.not)("showMessageInput"),
    isNotifyUser: (0, _computed.equal)("flag.name_key", "notify_user"),
    description(long_description, short_description) {
      return this.site.mobileView ? short_description : long_description;
    },
    customMessageLengthClasses(messageLength) {
      return messageLength < this.siteSettings.min_personal_message_post_length ? "too-short" : "ok";
    },
    customMessageLength(messageLength) {
      const len = messageLength || 0;
      const minLen = this.siteSettings.min_personal_message_post_length;
      if (len === 0) {
        return _I18n.default.t("flagging.custom_message.at_least", {
          count: minLen
        });
      } else if (len < minLen) {
        return _I18n.default.t("flagging.custom_message.more", {
          count: minLen - len
        });
      } else {
        return _I18n.default.t("flagging.custom_message.left", {
          count: _postActionType.MAX_MESSAGE_LENGTH - len
        });
      }
    },
    actions: {
      changePostActionType(at) {
        this.changePostActionType(at);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "customPlaceholder", [_dec], Object.getOwnPropertyDescriptor(_obj, "customPlaceholder"), _obj), _applyDecoratedDescriptor(_obj, "formattedName", [_dec2], Object.getOwnPropertyDescriptor(_obj, "formattedName"), _obj), _applyDecoratedDescriptor(_obj, "selected", [_dec3], Object.getOwnPropertyDescriptor(_obj, "selected"), _obj), _applyDecoratedDescriptor(_obj, "description", [_dec4], Object.getOwnPropertyDescriptor(_obj, "description"), _obj), _applyDecoratedDescriptor(_obj, "customMessageLengthClasses", [_dec5], Object.getOwnPropertyDescriptor(_obj, "customMessageLengthClasses"), _obj), _applyDecoratedDescriptor(_obj, "customMessageLength", [_dec6], Object.getOwnPropertyDescriptor(_obj, "customMessageLength"), _obj)), _obj))));
  _exports.default = _default;
});
define("discourse/models/user-draft", ["exports", "discourse/models/composer", "I18n", "discourse/models/rest", "discourse/models/user", "discourse-common/utils/decorators", "discourse/lib/utilities", "discourse/lib/url"], function (_exports, _composer, _I18n, _rest, _user, _decorators, _utilities, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/composer",0,"I18n",0,"discourse/models/rest",0,"discourse/models/user",0,"discourse-common/utils/decorators",0,"discourse/lib/utilities",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _rest.default.extend((_dec = (0, _decorators.default)("draft_username"), _dec2 = (0, _decorators.default)("username_lower"), _dec3 = (0, _decorators.default)("topic_id"), _dec4 = (0, _decorators.default)("draft_key"), (_obj = {
    editableDraft(draftUsername) {
      return draftUsername === _user.default.currentProp("username");
    },
    userUrl(usernameLower) {
      return (0, _url.userPath)(usernameLower);
    },
    postUrl(topicId) {
      if (!topicId) {
        return;
      }
      return (0, _utilities.postUrl)(this.slug, this.topic_id, this.post_number);
    },
    draftType(draftKey) {
      switch (draftKey) {
        case _composer.NEW_TOPIC_KEY:
          return _I18n.default.t("drafts.new_topic");
        case _composer.NEW_PRIVATE_MESSAGE_KEY:
          return _I18n.default.t("drafts.new_private_message");
        default:
          return false;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "editableDraft", [_dec], Object.getOwnPropertyDescriptor(_obj, "editableDraft"), _obj), _applyDecoratedDescriptor(_obj, "userUrl", [_dec2], Object.getOwnPropertyDescriptor(_obj, "userUrl"), _obj), _applyDecoratedDescriptor(_obj, "postUrl", [_dec3], Object.getOwnPropertyDescriptor(_obj, "postUrl"), _obj), _applyDecoratedDescriptor(_obj, "draftType", [_dec4], Object.getOwnPropertyDescriptor(_obj, "draftType"), _obj)), _obj)));
  _exports.default = _default;
});
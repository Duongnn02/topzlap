define("discourse/routes/user-activity-replies", ["exports", "discourse/models/user-action", "discourse/routes/user-activity-stream", "I18n", "@ember/object", "@ember/template", "discourse-common/lib/get-url"], function (_exports, _userAction, _userActivityStream, _I18n, _object, _template, _getUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/user-action",0,"discourse/routes/user-activity-stream",0,"I18n",0,"@ember/object",0,"@ember/template",0,"discourse-common/lib/get-url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _userActivityStream.default.extend((_obj = {
    userActionType: _userAction.default.TYPES["posts"],
    emptyState() {
      const user = this.modelFor("user");
      let title, body;
      if (this.isCurrentUser(user)) {
        title = _I18n.default.t("user_activity.no_replies_title");
        body = (0, _template.htmlSafe)(_I18n.default.t("user_activity.no_replies_body", {
          searchUrl: (0, _getUrl.default)("/search")
        }));
      } else {
        title = _I18n.default.t("user_activity.no_replies_title_others", {
          username: user.username
        });
        body = "";
      }
      return {
        title,
        body
      };
    },
    titleToken() {
      return _I18n.default.t("user_action_groups.5");
    },
    didTransition() {
      this.controllerFor("application").set("showFooter", true);
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  _exports.default = _default;
});
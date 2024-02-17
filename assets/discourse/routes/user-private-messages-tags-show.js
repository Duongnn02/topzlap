define("discourse/routes/user-private-messages-tags-show", ["exports", "discourse/routes/build-private-messages-route", "I18n"], function (_exports, _buildPrivateMessagesRoute, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/build-private-messages-route",0,"I18n"eaimeta@70e063a35619d71f
  var _default = (0, _buildPrivateMessagesRoute.default)("tags", "private-messages-tags").extend({
    titleToken() {
      return [this.get("tagId"), _I18n.default.t("tagging.tags"), _I18n.default.t("user.private_messages")];
    },
    model(params) {
      this.controllerFor("user-private-messages").set("tagId", params.id);
      this.controllerFor("user-private-messages-tags").set("tagName", params.id);
      const username = this.modelFor("user").get("username_lower");
      this.set("tagId", params.id);
      return this.store.findFiltered("topicList", {
        filter: `topics/private-messages-tags/${username}/${params.id}`
      });
    }
  });
  _exports.default = _default;
});
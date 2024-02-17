define("discourse/routes/user-private-messages-tags-index", ["exports", "discourse/routes/discourse", "@ember/object", "I18n", "discourse/lib/ajax", "discourse/lib/ajax-error"], function (_exports, _discourse, _object, _I18n, _ajax, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"@ember/object",0,"I18n",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    model() {
      const username = this.modelFor("user").get("username_lower");
      return (0, _ajax.ajax)(`/tags/personal_messages/${username}`).then(result => {
        return result.tags.map(tag => _object.default.create(tag));
      }).catch(_ajaxError.popupAjaxError);
    },
    titleToken() {
      return [_I18n.default.t("tagging.tags"), _I18n.default.t("user.private_messages")];
    },
    setupController(controller, model) {
      controller.setProperties({
        model,
        sortProperties: this.siteSettings.tags_sort_alphabetically ? ["id"] : ["count:desc", "id"],
        tagsForUser: this.modelFor("user").get("username_lower")
      });
      this.controllerFor("user-topics-list").setProperties({
        showToggleBulkSelect: false,
        selected: []
      });
    }
  });
  _exports.default = _default;
});
define("discourse/plugins/discourse-assign/discourse-assign/routes/user-activity-assigned", ["exports", "I18n", "discourse/routes/user-topic-list", "discourse/lib/cookie", "@ember/object"], function (_exports, _I18n, _userTopicList, _cookie, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/routes/user-topic-list",0,"discourse/lib/cookie",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _userTopicList.default.extend((_obj = {
    userActionType: 16,
    noContentHelpKey: "discourse_assigns.no_assigns",
    beforeModel() {
      if (this.currentUser === undefined) {
        (0, _cookie.default)("destination_url", window.location.href);
        this.transitionTo("login");
      }
    },
    model(params) {
      return this.store.findFiltered("topicList", {
        filter: `topics/messages-assigned/${this.modelFor("user").get("username_lower")}`,
        params: {
          // core is a bit odd here and is not sending an array, should be fixed
          exclude_category_ids: [-1],
          order: params.order,
          ascending: params.ascending,
          search: params.search
        }
      });
    },
    titleToken() {
      return _I18n.default.t("discourse_assign.assigned");
    },
    renderTemplate() {
      this.render("user-activity-assigned");
      this.render("user-assigned-topics", {
        into: "user-activity-assigned"
      });
    },
    setupController(controller, model) {
      this._super(controller, model);
      controller.set("model", model);
    },
    changeAssigned() {
      this.refresh();
    }
  }, (_applyDecoratedDescriptor(_obj, "changeAssigned", [_object.action], Object.getOwnPropertyDescriptor(_obj, "changeAssigned"), _obj)), _obj));
  _exports.default = _default;
});
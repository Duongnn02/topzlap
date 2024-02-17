define("discourse/routes/users", ["exports", "discourse/routes/discourse", "I18n", "discourse/lib/ajax", "discourse/lib/ajax-error", "rsvp", "@ember/object"], function (_exports, _discourse, _I18n, _ajax, _ajaxError, _rsvp, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error",0,"rsvp",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    queryParams: {
      period: {
        refreshModel: true
      },
      order: {
        refreshModel: true
      },
      asc: {
        refreshModel: true
      },
      name: {
        refreshModel: false,
        replace: true
      },
      group: {
        refreshModel: true
      },
      exclude_usernames: {
        refreshModel: true
      }
    },
    titleToken() {
      return _I18n.default.t("directory.title");
    },
    resetController(controller, isExiting) {
      if (isExiting) {
        controller.setProperties({
          period: "weekly",
          order: "likes_received",
          asc: null,
          name: "",
          group: null,
          exclude_usernames: null,
          lastUpdatedAt: null
        });
      }
    },
    beforeModel() {
      if (this.siteSettings.hide_user_profiles_from_public && !this.currentUser) {
        this.replaceWith("discovery");
      }
    },
    model(params) {
      return (0, _ajax.ajax)("/directory-columns.json").then(response => {
        params.order = params.order || response.directory_columns[0].name;
        return {
          params,
          columns: response.directory_columns
        };
      }).catch(_ajaxError.popupAjaxError);
    },
    setupController(controller, model) {
      controller.set("columns", model.columns);
      return _rsvp.Promise.all([controller.loadGroups(), controller.loadUsers(model.params)]);
    },
    didTransition() {
      this.controllerFor("users")._showFooter();
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  _exports.default = _default;
});
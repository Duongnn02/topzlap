define("discourse/routes/user-invited-show", ["exports", "discourse/routes/discourse", "discourse/models/invite", "@ember/object", "I18n"], function (_exports, _discourse, _invite, _object, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/models/invite",0,"@ember/object",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    model(params) {
      this.inviteFilter = params.filter;
      return _invite.default.findInvitedBy(this.modelFor("user"), params.filter);
    },
    afterModel(model) {
      if (!model.can_see_invite_details) {
        this.replaceWith("userInvited.show", "redeemed");
      }
      this.controllerFor("user.invited").setProperties({
        invitesCount: model.counts
      });
    },
    setupController(controller, model) {
      controller.setProperties({
        model,
        invitesCount: model.counts,
        user: this.controllerFor("user").get("model"),
        filter: this.inviteFilter,
        searchTerm: ""
      });
    },
    titleToken() {
      return _I18n.default.t("user.invited." + this.inviteFilter + "_tab");
    },
    triggerRefresh() {
      this.refresh();
    }
  }, (_applyDecoratedDescriptor(_obj, "triggerRefresh", [_object.action], Object.getOwnPropertyDescriptor(_obj, "triggerRefresh"), _obj)), _obj));
  _exports.default = _default;
});
define("discourse/routes/group-index", ["exports", "discourse/routes/discourse", "I18n", "@ember/object", "discourse/lib/show-modal"], function (_exports, _discourse, _I18n, _object, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n",0,"@ember/object",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    titleToken() {
      return _I18n.default.t("groups.members.title");
    },
    model(params) {
      this._params = params;
      return this.modelFor("group");
    },
    setupController(controller, model) {
      controller.setProperties({
        model,
        filterInput: this._params.filter,
        showing: "members"
      });
      controller.reloadMembers(true);
    },
    showAddMembersModal() {
      (0, _showModal.default)("group-add-members", {
        model: this.modelFor("group")
      });
    },
    showInviteModal() {
      const model = this.modelFor("group");
      const controller = (0, _showModal.default)("create-invite");
      controller.buffered.set("groupIds", [model.id]);
    },
    didTransition() {
      this.controllerFor("group-index").set("filterInput", this._params.filter);
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "showAddMembersModal", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showAddMembersModal"), _obj), _applyDecoratedDescriptor(_obj, "showInviteModal", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showInviteModal"), _obj), _applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  _exports.default = _default;
});
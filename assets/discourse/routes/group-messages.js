define("discourse/routes/group-messages", ["exports", "discourse/routes/discourse", "I18n", "@ember/object"], function (_exports, _discourse, _I18n, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"I18n",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    titleToken() {
      return _I18n.default.t("groups.messages");
    },
    model() {
      return this.modelFor("group");
    },
    afterModel(group) {
      if (!group.get("is_group_user") && !(this.currentUser && this.currentUser.admin)) {
        this.transitionTo("group.members", group);
      }
    },
    triggerRefresh() {
      this.refresh();
    }
  }, (_applyDecoratedDescriptor(_obj, "triggerRefresh", [_object.action], Object.getOwnPropertyDescriptor(_obj, "triggerRefresh"), _obj)), _obj));
  _exports.default = _default;
});
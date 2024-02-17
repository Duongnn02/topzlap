define("discourse/plugins/discourse-assign/discourse-assign/routes/group-assigned", ["exports", "discourse/routes/discourse", "discourse/lib/ajax", "@ember/object"], function (_exports, _discourse, _ajax, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/lib/ajax",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    model() {
      return (0, _ajax.ajax)(`/assign/members/${this.modelFor("group").get("name")}`);
    },
    setupController(controller, model) {
      controller.setProperties({
        model,
        members: [],
        group: this.modelFor("group")
      });
      controller.group.setProperties({
        assignment_count: model.assignment_count,
        group_assignment_count: model.group_assignment_count
      });
      controller.findMembers(true);
    },
    redirect(model, transition) {
      if (transition.to.params.hasOwnProperty("filter")) {
        this.transitionTo("group.assigned.show", transition.to.params.filter);
      } else {
        this.transitionTo("group.assigned.show", "everyone");
      }
    },
    changeAssigned() {
      this.refresh();
    }
  }, (_applyDecoratedDescriptor(_obj, "changeAssigned", [_object.action], Object.getOwnPropertyDescriptor(_obj, "changeAssigned"), _obj)), _obj));
  _exports.default = _default;
});
define("discourse/plugins/discourse-assign/discourse/services/task-actions", ["exports", "@ember/service", "discourse/lib/ajax", "discourse/lib/show-modal"], function (_exports, _service, _ajax, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"discourse/lib/ajax",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  var _default = _service.default.extend({
    i18nSuffix(targetType) {
      switch (targetType) {
        case "Post":
          return "_post_modal";
        case "Topic":
          return "_modal";
      }
    },
    unassign(targetId) {
      let targetType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Topic";
      return (0, _ajax.ajax)("/assign/unassign", {
        type: "PUT",
        data: {
          target_id: targetId,
          target_type: targetType
        }
      });
    },
    assign(target) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        isAssigned: false,
        targetType: "Topic"
      };
      return (0, _showModal.default)("assign-user", {
        title: "discourse_assign.assign" + this.i18nSuffix(options.targetType) + `.${options.isAssigned ? "reassign_title" : "title"}`,
        model: {
          reassign: options.isAssigned,
          username: target.assigned_to_user?.username,
          group_name: target.assigned_to_group?.name,
          target,
          targetType: options.targetType,
          status: target.assignment_status
        }
      });
    },
    reassignUserToTopic(user, target) {
      let targetType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Topic";
      return (0, _ajax.ajax)("/assign/assign", {
        type: "PUT",
        data: {
          username: user.username,
          target_id: target.id,
          target_type: targetType,
          status: target.assignment_status
        }
      });
    }
  });
  _exports.default = _default;
});
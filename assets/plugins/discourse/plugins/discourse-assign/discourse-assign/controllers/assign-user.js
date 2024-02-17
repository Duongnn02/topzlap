define("discourse/plugins/discourse-assign/discourse-assign/controllers/assign-user", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "@ember/object", "discourse-common/utils/decorators", "@ember/object/computed", "@ember/service", "@ember/utils", "discourse/lib/ajax", "discourse/lib/ajax-error"], function (_exports, _controller, _modalFunctionality, _object, _decorators, _computed, _service, _utils, _ajax, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"@ember/object",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"@ember/service",0,"@ember/utils",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("siteSettings.enable_assign_status"), _dec2 = (0, _decorators.default)("siteSettings.assign_statuses"), _dec3 = (0, _decorators.default)("siteSettings.assign_statuses", "model.status"), (_obj = {
    topicBulkActions: (0, _controller.inject)(),
    assignSuggestions: null,
    allowedGroups: null,
    taskActions: (0, _service.inject)(),
    autofocus: (0, _computed.not)("capabilities.touch"),
    assigneeName: (0, _computed.or)("model.username", "model.group_name"),
    assigneeError: false,
    init() {
      this._super(...arguments);
      this.set("allowedGroups", []);
      this.set("assigneeError", false);
      (0, _ajax.ajax)("/assign/suggestions").then(data => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }
        this.set("assignSuggestions", data.suggestions);
        this.set("allowedGroups", data.assign_allowed_on_groups);
        this.set("allowedGroupsForAssignment", data.assign_allowed_for_groups);
      });
    },
    onShow() {
      this.set("assigneeError", false);
    },
    onClose() {
      if (this.get("model.onClose") && this.get("model.username")) {
        this.get("model.onClose")(this.get("model.username"));
      }
    },
    bulkAction(username) {
      return this.topicBulkActions.performAndRefresh({
        type: "assign",
        username
      });
    },
    statusEnabled() {
      return this.siteSettings.enable_assign_status;
    },
    availableStatuses() {
      return this.siteSettings.assign_statuses.split("|").map(status => {
        return {
          id: status,
          name: status
        };
      });
    },
    status() {
      return this.model.status || this.model.target.assignment_status || this.siteSettings.assign_statuses.split("|")[0];
    },
    handleTextAreaKeydown(event) {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        this.assign();
      }
    },
    assign() {
      if (this.isBulkAction) {
        return this.bulkAction(this.model.username);
      }
      if (!this.assigneeName) {
        this.set("assigneeError", true);
        return;
      }
      let path = "/assign/assign";
      if ((0, _utils.isEmpty)(this.get("model.username"))) {
        this.model.target.set("assigned_to_user", null);
      }
      if ((0, _utils.isEmpty)(this.get("model.group_name"))) {
        this.model.target.set("assigned_to_group", null);
      }
      if ((0, _utils.isEmpty)(this.get("model.username")) && (0, _utils.isEmpty)(this.get("model.group_name"))) {
        path = "/assign/unassign";
      }
      this.send("closeModal");
      return (0, _ajax.ajax)(path, {
        type: "PUT",
        data: {
          username: this.get("model.username"),
          group_name: this.get("model.group_name"),
          target_id: this.get("model.target.id"),
          target_type: this.get("model.targetType"),
          note: this.get("model.note"),
          status: this.get("model.status")
        }
      }).then(() => {
        this.get("model.onSuccess")?.();
      }).catch(_ajaxError.popupAjaxError);
    },
    assignUser(name) {
      if (this.isBulkAction) {
        return this.bulkAction(name);
      }
      this.setGroupOrUser(name);
      if (name) {
        return this.assign();
      }
    },
    assignUsername(selected) {
      if (this.isBulkAction) {
        return this.bulkAction(selected.firstObject);
      }
      this.setGroupOrUser(selected.firstObject);
    },
    setGroupOrUser(name) {
      this.set("assigneeError", false);
      if (this.allowedGroupsForAssignment.includes(name)) {
        this.setProperties({
          "model.username": null,
          "model.group_name": name,
          "model.allowedGroups": this.taskActions.allowedGroups
        });
      } else {
        this.setProperties({
          "model.username": name,
          "model.group_name": null,
          "model.allowedGroups": this.taskActions.allowedGroups
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "statusEnabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "statusEnabled"), _obj), _applyDecoratedDescriptor(_obj, "availableStatuses", [_dec2], Object.getOwnPropertyDescriptor(_obj, "availableStatuses"), _obj), _applyDecoratedDescriptor(_obj, "status", [_dec3], Object.getOwnPropertyDescriptor(_obj, "status"), _obj), _applyDecoratedDescriptor(_obj, "handleTextAreaKeydown", [_object.action], Object.getOwnPropertyDescriptor(_obj, "handleTextAreaKeydown"), _obj), _applyDecoratedDescriptor(_obj, "assign", [_object.action], Object.getOwnPropertyDescriptor(_obj, "assign"), _obj), _applyDecoratedDescriptor(_obj, "assignUser", [_object.action], Object.getOwnPropertyDescriptor(_obj, "assignUser"), _obj), _applyDecoratedDescriptor(_obj, "assignUsername", [_object.action], Object.getOwnPropertyDescriptor(_obj, "assignUsername"), _obj)), _obj)));
  _exports.default = _default;
});
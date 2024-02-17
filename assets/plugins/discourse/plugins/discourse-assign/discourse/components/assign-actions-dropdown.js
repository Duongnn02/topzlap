define("discourse/plugins/discourse-assign/discourse/components/assign-actions-dropdown", ["exports", "I18n", "select-kit/components/dropdown-select-box", "@ember/object"], function (_exports, _I18n, _dropdownSelectBox, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"select-kit/components/dropdown-select-box",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _dropdownSelectBox.default.extend((_obj = {
    classNames: ["assign-actions-dropdown"],
    headerIcon: null,
    allowInitialValueMutation: false,
    showFullTitle: true,
    selectKitOptions: {
      icon: null,
      translatedNone: "...",
      showFullTitle: true
    },
    computeContent() {
      let options = [];
      if (this.assignee) {
        options = options.concat([{
          id: "unassign",
          icon: this.group ? "group-times" : "user-times",
          name: _I18n.default.t("discourse_assign.unassign.title"),
          description: _I18n.default.t("discourse_assign.unassign.help", {
            username: this.assignee
          })
        }, {
          id: "reassign",
          icon: "users",
          name: _I18n.default.t("discourse_assign.reassign.title"),
          description: _I18n.default.t("discourse_assign.reassign.help")
        }]);
      }
      if (this.topic.indirectly_assigned_to) {
        Object.entries(this.topic.indirectly_assigned_to).forEach(entry => {
          const [postId, assignment_map] = entry;
          const assignee = assignment_map.assigned_to;
          options = options.concat({
            id: `unassign_post_${postId}`,
            icon: assignee.username ? "user-times" : "group-times",
            name: _I18n.default.t("discourse_assign.unassign_post.title"),
            description: _I18n.default.t("discourse_assign.unassign_post.help", {
              username: assignee.username || assignee.name
            })
          });
        });
      }
      return options;
    },
    onSelect(id) {
      switch (id) {
        case "unassign":
          this.unassign(this.topic.id);
          break;
        case "reassign":
          this.reassign(this.topic, this.assignee);
          break;
      }
      const postId = id.match(/unassign_post_(\d+)/)?.[1];
      if (postId) {
        this.unassign(postId, "Post");
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "onSelect", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onSelect"), _obj)), _obj));
  _exports.default = _default;
});
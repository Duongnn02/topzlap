define("discourse/controllers/users", ["exports", "@ember/controller", "discourse/models/group", "@ember/object", "discourse-common/lib/debounce", "discourse/lib/show-modal", "@ember/object/computed", "discourse/lib/formatter", "discourse-common/utils/decorators"], function (_exports, _controller, _group, _object, _debounce, _showModal, _computed, _formatter, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/models/group",0,"@ember/object",0,"discourse-common/lib/debounce",0,"discourse/lib/show-modal",0,"@ember/object/computed",0,"discourse/lib/formatter",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.observes)("model.canLoadMore"), (_obj = {
    application: (0, _controller.inject)(),
    queryParams: ["period", "order", "asc", "name", "group", "exclude_usernames"],
    period: "weekly",
    order: "",
    asc: null,
    name: "",
    group: null,
    nameInput: null,
    exclude_usernames: null,
    isLoading: false,
    columns: null,
    groupOptions: null,
    params: null,
    showGroupFilter: (0, _computed.and)("currentUser", "groupOptions"),
    showTimeRead: (0, _computed.equal)("period", "all"),
    loadUsers() {
      let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (params) {
        this.set("params", params);
      }
      this.setProperties({
        isLoading: true,
        nameInput: this.params.name,
        order: this.params.order
      });
      const userFieldIds = this.columns.filter(c => c.type === "user_field").map(c => c.user_field_id).join("|");
      const pluginColumnIds = this.columns.filter(c => c.type === "plugin").map(c => c.id).join("|");
      return this.store.find("directoryItem", Object.assign(this.params, {
        user_field_ids: userFieldIds,
        plugin_column_ids: pluginColumnIds
      })).then(model => {
        const lastUpdatedAt = model.get("resultSetMeta.last_updated_at");
        this.setProperties({
          model,
          lastUpdatedAt: lastUpdatedAt ? (0, _formatter.longDate)(lastUpdatedAt) : null,
          period: this.params.period
        });
      }).finally(() => {
        this.set("isLoading", false);
      });
    },
    loadGroups() {
      if (this.currentUser) {
        return _group.default.findAll({
          ignore_automatic: true
        }).then(groups => {
          const groupOptions = groups.filter(group => group.can_see_members).map(group => {
            return {
              name: group.full_name || group.name,
              id: group.name
            };
          });
          this.set("groupOptions", groupOptions);
        });
      }
    },
    groupChanged(_, groupAttrs) {
      // First param is the group name, which include none or 'all groups'. Ignore this and look at second param.
      this.set("group", groupAttrs?.id);
    },
    showEditColumnsModal() {
      (0, _showModal.default)("edit-user-directory-columns");
    },
    onUsernameFilterChanged(filter) {
      (0, _debounce.default)(this, this._setUsernameFilter, filter, 500);
    },
    _setUsernameFilter(username) {
      this.setProperties({
        name: username,
        "params.name": username
      });
      this.loadUsers();
    },
    _showFooter() {
      this.set("application.showFooter", !this.get("model.canLoadMore"));
    },
    loadMore() {
      this.model.loadMore();
    }
  }, (_applyDecoratedDescriptor(_obj, "groupChanged", [_object.action], Object.getOwnPropertyDescriptor(_obj, "groupChanged"), _obj), _applyDecoratedDescriptor(_obj, "showEditColumnsModal", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showEditColumnsModal"), _obj), _applyDecoratedDescriptor(_obj, "onUsernameFilterChanged", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onUsernameFilterChanged"), _obj), _applyDecoratedDescriptor(_obj, "_showFooter", [_dec], Object.getOwnPropertyDescriptor(_obj, "_showFooter"), _obj), _applyDecoratedDescriptor(_obj, "loadMore", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadMore"), _obj)), _obj)));
  _exports.default = _default;
});
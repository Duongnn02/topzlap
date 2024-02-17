define("discourse/plugins/discourse-assign/discourse-assign/controllers/user-activity-assigned", ["exports", "discourse/controllers/user-topics-list", "discourse-common/utils/decorators", "discourse-common/lib/debounce", "discourse-common/config/environment", "@ember/controller", "@ember/service", "@ember/object", "discourse-common/lib/get-url", "discourse-common/lib/icon-library", "I18n", "@ember/template"], function (_exports, _userTopicsList, _decorators, _debounce, _environment, _controller, _service, _object, _getUrl, _iconLibrary, _I18n, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/controllers/user-topics-list",0,"discourse-common/utils/decorators",0,"discourse-common/lib/debounce",0,"discourse-common/config/environment",0,"@ember/controller",0,"@ember/service",0,"@ember/object",0,"discourse-common/lib/get-url",0,"discourse-common/lib/icon-library",0,"I18n",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _userTopicsList.default.extend((_dec = (0, _decorators.default)("model.topics.length", "search"), (_obj = {
    user: (0, _controller.inject)(),
    taskActions: (0, _service.inject)(),
    queryParams: ["order", "ascending", "search"],
    order: "",
    ascending: false,
    search: "",
    _setSearchTerm(searchTerm) {
      this.set("search", searchTerm);
      this.refreshModel();
    },
    doesntHaveAssignments(topicsLength, search) {
      return !search && !topicsLength;
    },
    emptyStateBody() {
      return (0, _template.htmlSafe)(_I18n.default.t("user.no_assignments_body", {
        preferencesUrl: (0, _getUrl.default)("/my/preferences/notifications"),
        icon: (0, _iconLibrary.iconHTML)("user-plus")
      }));
    },
    refreshModel() {
      this.set("loading", true);
      this.store.findFiltered("topicList", {
        filter: this.model.filter,
        params: {
          order: this.order,
          ascending: this.ascending,
          search: this.search
        }
      }).then(result => this.set("model", result)).finally(() => {
        this.set("loading", false);
      });
    },
    unassign(targetId) {
      let targetType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Topic";
      this.taskActions.unassign(targetId, targetType).then(() => this.send("changeAssigned"));
    },
    reassign(topic) {
      this.taskActions.assign(topic).set("model.onSuccess", () => this.send("changeAssigned"));
    },
    changeSort(sortBy) {
      if (sortBy === this.order) {
        this.toggleProperty("ascending");
        this.refreshModel();
      } else {
        this.setProperties({
          order: sortBy,
          ascending: false
        });
        this.refreshModel();
      }
    },
    onChangeFilter(value) {
      (0, _debounce.default)(this, this._setSearchTerm, value, _environment.INPUT_DELAY * 2);
    }
  }, (_applyDecoratedDescriptor(_obj, "doesntHaveAssignments", [_dec], Object.getOwnPropertyDescriptor(_obj, "doesntHaveAssignments"), _obj), _applyDecoratedDescriptor(_obj, "emptyStateBody", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "emptyStateBody"), _obj), _applyDecoratedDescriptor(_obj, "unassign", [_object.action], Object.getOwnPropertyDescriptor(_obj, "unassign"), _obj), _applyDecoratedDescriptor(_obj, "reassign", [_object.action], Object.getOwnPropertyDescriptor(_obj, "reassign"), _obj), _applyDecoratedDescriptor(_obj, "changeSort", [_object.action], Object.getOwnPropertyDescriptor(_obj, "changeSort"), _obj), _applyDecoratedDescriptor(_obj, "onChangeFilter", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeFilter"), _obj)), _obj)));
  _exports.default = _default;
});
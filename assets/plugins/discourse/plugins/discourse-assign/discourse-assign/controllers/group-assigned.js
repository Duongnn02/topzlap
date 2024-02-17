define("discourse/plugins/discourse-assign/discourse-assign/controllers/group-assigned", ["exports", "@ember/service", "@ember/controller", "@ember/object", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse-common/lib/debounce", "discourse-common/config/environment"], function (_exports, _service, _controller, _object, _ajax, _decorators, _debounce, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"@ember/controller",0,"@ember/object",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse-common/lib/debounce",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("router.currentRoute.queryParams.order"), _dec2 = (0, _decorators.default)("router.currentRoute.queryParams.ascending"), _dec3 = (0, _decorators.default)("router.currentRoute.queryParams.search"), _dec4 = (0, _decorators.default)("site.mobileView"), (_obj = {
    router: (0, _service.inject)(),
    application: (0, _controller.inject)(),
    loading: false,
    offset: 0,
    filterName: "",
    filter: "",
    order(order) {
      return order || "";
    },
    ascending(ascending) {
      return ascending || false;
    },
    search(search) {
      return search || "";
    },
    isDesktop(mobileView) {
      return !mobileView;
    },
    _setFilter(filter) {
      this.set("loading", true);
      this.set("offset", 0);
      this.set("filter", filter);
      const groupName = this.group.name;
      (0, _ajax.ajax)(`/assign/members/${groupName}`, {
        type: "GET",
        data: {
          filter: this.filter,
          offset: this.offset
        }
      }).then(result => {
        if (this.router.currentRoute.params.filter !== "everyone") {
          this.transitionToRoute("group.assigned.show", groupName, "everyone");
        }
        this.set("members", result.members);
      }).finally(() => {
        this.set("loading", false);
      });
    },
    findMembers(refresh) {
      if (refresh) {
        this.set("members", this.model.members);
        return;
      }
      if (this.loading || !this.model) {
        return;
      }
      if (this.model.members.length >= this.offset + 50) {
        this.set("loading", true);
        this.set("offset", this.offset + 50);
        (0, _ajax.ajax)(`/assign/members/${this.group.name}`, {
          type: "GET",
          data: {
            filter: this.filter,
            offset: this.offset
          }
        }).then(result => {
          this.members.pushObjects(result.members);
        }).finally(() => this.set("loading", false));
      }
    },
    loadMore() {
      this.findMembers();
    },
    onChangeFilterName(value) {
      (0, _debounce.default)(this, this._setFilter, value, _environment.INPUT_DELAY * 2);
    }
  }, (_applyDecoratedDescriptor(_obj, "order", [_dec], Object.getOwnPropertyDescriptor(_obj, "order"), _obj), _applyDecoratedDescriptor(_obj, "ascending", [_dec2], Object.getOwnPropertyDescriptor(_obj, "ascending"), _obj), _applyDecoratedDescriptor(_obj, "search", [_dec3], Object.getOwnPropertyDescriptor(_obj, "search"), _obj), _applyDecoratedDescriptor(_obj, "isDesktop", [_dec4], Object.getOwnPropertyDescriptor(_obj, "isDesktop"), _obj), _applyDecoratedDescriptor(_obj, "loadMore", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadMore"), _obj), _applyDecoratedDescriptor(_obj, "onChangeFilterName", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeFilterName"), _obj)), _obj)));
  _exports.default = _default;
});
define("discourse/controllers/group-requests", ["exports", "@ember/controller", "discourse-common/utils/decorators", "discourse/lib/ajax", "discourse/lib/ajax-error"], function (_exports, _controller, _decorators, _ajax, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.observes)("filterInput"), _dec2 = (0, _decorators.debounce)(500), _dec3 = (0, _decorators.observes)("order", "asc", "filter"), _dec4 = (0, _decorators.default)("order", "asc", "filter"), _dec5 = (0, _decorators.default)("model.requesters.[]"), (_obj = {
    application: (0, _controller.inject)(),
    queryParams: ["order", "asc", "filter"],
    order: "",
    asc: null,
    filter: null,
    filterInput: null,
    loading: false,
    filterInputChanged() {
      this._setFilter();
    },
    _setFilter() {
      this.set("filter", this.filterInput);
    },
    _filtersChanged() {
      this.findRequesters(true);
    },
    findRequesters(refresh) {
      if (this.loading) {
        return;
      }
      const model = this.model;
      if (!model) {
        return;
      }
      if (!refresh && model.requesters.length >= model.user_count) {
        this.set("application.showFooter", true);
        return;
      }
      this.set("loading", true);
      model.findRequesters(this.memberParams, refresh).finally(() => {
        this.set("application.showFooter", model.requesters.length >= model.user_count);
        this.set("loading", false);
      });
    },
    memberParams(order, asc, filter) {
      return {
        order,
        asc,
        filter
      };
    },
    hasRequesters(requesters) {
      return requesters && requesters.length > 0;
    },
    filterPlaceholder() {
      if (this.currentUser && this.currentUser.admin) {
        return "groups.members.filter_placeholder_admin";
      } else {
        return "groups.members.filter_placeholder";
      }
    },
    handleRequest(data) {
      (0, _ajax.ajax)(`/groups/${this.get("model.id")}/handle_membership_request.json`, {
        data,
        type: "PUT"
      }).catch(_ajaxError.popupAjaxError);
    },
    actions: {
      loadMore() {
        this.findRequesters();
      },
      acceptRequest(user) {
        this.handleRequest({
          user_id: user.get("id"),
          accept: true
        });
        user.setProperties({
          request_accepted: true,
          request_denied: false
        });
      },
      undoAcceptRequest(user) {
        (0, _ajax.ajax)("/groups/" + this.get("model.id") + "/members.json", {
          type: "DELETE",
          data: {
            user_id: user.get("id")
          }
        }).then(() => {
          user.set("request_undone", true);
        });
      },
      denyRequest(user) {
        this.handleRequest({
          user_id: user.get("id")
        });
        user.setProperties({
          request_accepted: false,
          request_denied: true
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "filterInputChanged", [_dec], Object.getOwnPropertyDescriptor(_obj, "filterInputChanged"), _obj), _applyDecoratedDescriptor(_obj, "_setFilter", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_setFilter"), _obj), _applyDecoratedDescriptor(_obj, "_filtersChanged", [_dec3], Object.getOwnPropertyDescriptor(_obj, "_filtersChanged"), _obj), _applyDecoratedDescriptor(_obj, "memberParams", [_dec4], Object.getOwnPropertyDescriptor(_obj, "memberParams"), _obj), _applyDecoratedDescriptor(_obj, "hasRequesters", [_dec5], Object.getOwnPropertyDescriptor(_obj, "hasRequesters"), _obj), _applyDecoratedDescriptor(_obj, "filterPlaceholder", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "filterPlaceholder"), _obj)), _obj)));
  _exports.default = _default;
});
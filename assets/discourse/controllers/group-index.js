define("discourse/controllers/group-index", ["exports", "@ember/controller", "discourse-common/utils/decorators", "@ember/object", "discourse/lib/ajax", "@ember/object/computed", "discourse/lib/ajax-error"], function (_exports, _controller, _decorators, _object, _ajax, _computed, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse-common/utils/decorators",0,"@ember/object",0,"discourse/lib/ajax",0,"@ember/object/computed",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.observes)("filterInput"), _dec2 = (0, _decorators.debounce)(500), _dec3 = (0, _decorators.observes)("order", "asc", "filter"), _dec4 = (0, _decorators.default)("order", "asc", "filter"), _dec5 = (0, _decorators.default)("model"), _dec6 = (0, _decorators.default)("filter", "members", "model.can_see_members"), (_obj = {
    application: (0, _controller.inject)(),
    queryParams: ["order", "asc", "filter"],
    order: "",
    asc: true,
    filter: null,
    filterInput: null,
    loading: false,
    isBulk: false,
    showActions: false,
    bulkSelection: null,
    filterInputChanged() {
      this._setFilter();
    },
    _setFilter() {
      this.set("filter", this.filterInput);
    },
    _filtersChanged() {
      this.reloadMembers(true);
    },
    reloadMembers(refresh) {
      if (this.loading || !this.model) {
        return;
      }
      if (!refresh && this.model.members.length >= this.model.user_count) {
        this.set("application.showFooter", true);
        return;
      }
      this.set("loading", true);
      this.model.reloadMembers(this.memberParams, refresh).finally(() => {
        this.setProperties({
          "application.showFooter": this.model.members.length >= this.model.user_count,
          loading: false
        });
        if (this.refresh) {
          this.set("bulkSelection", []);
        }
      });
    },
    memberParams(order, asc, filter) {
      return {
        order,
        asc,
        filter
      };
    },
    hasMembers: (0, _computed.gt)("model.members.length", 0),
    canManageGroup(model) {
      return this.currentUser && this.currentUser.canManageGroup(model);
    },
    filterPlaceholder() {
      if (this.currentUser && this.currentUser.admin) {
        return "groups.members.filter_placeholder_admin";
      } else {
        return "groups.members.filter_placeholder";
      }
    },
    emptyMessageKey(filter, members, canSeeMembers) {
      if (!canSeeMembers) {
        return "groups.members.forbidden";
      } else if (filter) {
        return "groups.members.no_filter_matches";
      } else {
        return "groups.empty.members";
      }
    },
    loadMore() {
      this.reloadMembers();
    },
    toggleActions() {
      this.toggleProperty("showActions");
    },
    actOnGroup(member, actionId) {
      switch (actionId) {
        case "removeMember":
          this.removeMember(member);
          break;
        case "makeOwner":
          this.makeOwner(member.username);
          break;
        case "removeOwner":
          this.removeOwner(member);
          break;
        case "makePrimary":
          member.setPrimaryGroup(this.model.id).then(() => member.set("primary", true));
          break;
        case "removePrimary":
          member.setPrimaryGroup(null).then(() => member.set("primary", false));
          break;
      }
    },
    actOnSelection(selection, actionId) {
      if (!selection || selection.length === 0) {
        return;
      }
      switch (actionId) {
        case "removeMembers":
          return (0, _ajax.ajax)(`/groups/${this.model.id}/members.json`, {
            type: "DELETE",
            data: {
              user_ids: selection.mapBy("id").join(",")
            }
          }).then(() => {
            this.model.reloadMembers(this.memberParams, true);
            this.set("isBulk", false);
          });
        case "makeOwners":
          return (0, _ajax.ajax)(`/groups/${this.model.id}/owners.json`, {
            type: "PUT",
            data: {
              usernames: selection.mapBy("username").join(",")
            }
          }).then(() => {
            selection.forEach(s => s.set("owner", true));
            this.set("isBulk", false);
          });
        case "removeOwners":
          return (0, _ajax.ajax)(`/admin/groups/${this.model.id}/owners.json`, {
            type: "DELETE",
            data: {
              group: {
                usernames: selection.map(u => u.username).join(",")
              }
            }
          }).then(() => {
            selection.forEach(s => s.set("owner", false));
            this.set("isBulk", false);
          });
        case "setPrimary":
        case "unsetPrimary":
          const primary = actionId === "setPrimary";
          return (0, _ajax.ajax)(`/admin/groups/${this.model.id}/primary.json`, {
            type: "PUT",
            data: {
              group: {
                usernames: selection.map(u => u.username).join(",")
              },
              primary
            }
          }).then(() => {
            selection.forEach(s => s.set("primary", primary));
            this.set("isBulk", false);
          });
      }
    },
    removeMember(user) {
      this.model.removeMember(user, this.memberParams);
    },
    makeOwner(username) {
      this.model.addOwners(username);
    },
    removeOwner(user) {
      this.model.removeOwner(user);
    },
    addMembers() {
      if (this.usernames && this.usernames.length > 0) {
        this.model.addMembers(this.usernames).then(() => this.set("usernames", [])).catch(_ajaxError.popupAjaxError);
      }
    },
    toggleBulkSelect() {
      this.setProperties({
        isBulk: !this.isBulk,
        bulkSelection: []
      });
    },
    bulkSelectAll() {
      document.querySelectorAll("input.bulk-select:not(:checked)").forEach(checkbox => {
        if (!checkbox.checked) {
          checkbox.click();
        }
      });
    },
    bulkClearAll() {
      document.querySelectorAll("input.bulk-select:checked").forEach(checkbox => {
        if (checkbox.checked) {
          checkbox.click();
        }
      });
    },
    selectMember(member, e) {
      this.set("bulkSelection", this.bulkSelection || []);
      if (e.target.checked) {
        this.bulkSelection.pushObject(member);
      } else {
        this.bulkSelection.removeObject(member);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "filterInputChanged", [_dec], Object.getOwnPropertyDescriptor(_obj, "filterInputChanged"), _obj), _applyDecoratedDescriptor(_obj, "_setFilter", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_setFilter"), _obj), _applyDecoratedDescriptor(_obj, "_filtersChanged", [_dec3], Object.getOwnPropertyDescriptor(_obj, "_filtersChanged"), _obj), _applyDecoratedDescriptor(_obj, "memberParams", [_dec4], Object.getOwnPropertyDescriptor(_obj, "memberParams"), _obj), _applyDecoratedDescriptor(_obj, "canManageGroup", [_dec5], Object.getOwnPropertyDescriptor(_obj, "canManageGroup"), _obj), _applyDecoratedDescriptor(_obj, "filterPlaceholder", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "filterPlaceholder"), _obj), _applyDecoratedDescriptor(_obj, "emptyMessageKey", [_dec6], Object.getOwnPropertyDescriptor(_obj, "emptyMessageKey"), _obj), _applyDecoratedDescriptor(_obj, "loadMore", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadMore"), _obj), _applyDecoratedDescriptor(_obj, "toggleActions", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleActions"), _obj), _applyDecoratedDescriptor(_obj, "actOnGroup", [_object.action], Object.getOwnPropertyDescriptor(_obj, "actOnGroup"), _obj), _applyDecoratedDescriptor(_obj, "actOnSelection", [_object.action], Object.getOwnPropertyDescriptor(_obj, "actOnSelection"), _obj), _applyDecoratedDescriptor(_obj, "removeMember", [_object.action], Object.getOwnPropertyDescriptor(_obj, "removeMember"), _obj), _applyDecoratedDescriptor(_obj, "makeOwner", [_object.action], Object.getOwnPropertyDescriptor(_obj, "makeOwner"), _obj), _applyDecoratedDescriptor(_obj, "removeOwner", [_object.action], Object.getOwnPropertyDescriptor(_obj, "removeOwner"), _obj), _applyDecoratedDescriptor(_obj, "addMembers", [_object.action], Object.getOwnPropertyDescriptor(_obj, "addMembers"), _obj), _applyDecoratedDescriptor(_obj, "toggleBulkSelect", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleBulkSelect"), _obj), _applyDecoratedDescriptor(_obj, "bulkSelectAll", [_object.action], Object.getOwnPropertyDescriptor(_obj, "bulkSelectAll"), _obj), _applyDecoratedDescriptor(_obj, "bulkClearAll", [_object.action], Object.getOwnPropertyDescriptor(_obj, "bulkClearAll"), _obj), _applyDecoratedDescriptor(_obj, "selectMember", [_object.action], Object.getOwnPropertyDescriptor(_obj, "selectMember"), _obj)), _obj)));
  _exports.default = _default;
});
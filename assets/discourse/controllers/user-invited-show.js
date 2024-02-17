define("discourse/controllers/user-invited-show", ["exports", "@ember/controller", "@ember/object", "@ember/object/computed", "discourse-common/config/environment", "discourse-common/utils/decorators", "discourse/lib/ajax-error", "discourse/lib/show-modal", "discourse/models/invite", "I18n", "@ember/service"], function (_exports, _controller, _object, _computed, _environment, _decorators, _ajaxError, _showModal, _invite, _I18n, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@ember/object/computed",0,"discourse-common/config/environment",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error",0,"discourse/lib/show-modal",0,"discourse/models/invite",0,"I18n",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.observes)("searchTerm"), _dec2 = (0, _decorators.debounce)(_environment.INPUT_DELAY), _dec3 = (0, _decorators.default)("model"), _dec4 = (0, _decorators.default)("filter"), _dec5 = (0, _decorators.default)("invitesCount", "filter"), (_obj = {
    dialog: (0, _service.inject)(),
    user: null,
    model: null,
    filter: null,
    invitesCount: null,
    canLoadMore: true,
    invitesLoading: false,
    reinvitedAll: false,
    removedAll: false,
    searchTerm: null,
    init() {
      this._super(...arguments);
      this.set("searchTerm", "");
    },
    searchTermChanged() {
      this._searchTermChanged();
    },
    _searchTermChanged() {
      _invite.default.findInvitedBy(this.user, this.filter, this.searchTerm).then(invites => this.set("model", invites));
    },
    inviteRedeemed: (0, _computed.equal)("filter", "redeemed"),
    inviteExpired: (0, _computed.equal)("filter", "expired"),
    invitePending: (0, _computed.equal)("filter", "pending"),
    hasEmailInvites(model) {
      return model.invites.some(invite => {
        return invite.email;
      });
    },
    showBulkActionButtons(filter) {
      return filter === "pending" && this.model.invites.length > 0 && this.currentUser.staff;
    },
    canInviteToForum: (0, _computed.reads)("currentUser.can_invite_to_forum"),
    canBulkInvite: (0, _computed.reads)("currentUser.admin"),
    showSearch(invitesCount, filter) {
      return invitesCount[filter] > 5;
    },
    createInvite() {
      const controller = (0, _showModal.default)("create-invite");
      controller.set("invites", this.model.invites);
    },
    createInviteCsv() {
      (0, _showModal.default)("create-invite-bulk");
    },
    editInvite(invite) {
      const controller = (0, _showModal.default)("create-invite");
      controller.set("editing", true);
      controller.setInvite(invite);
    },
    destroyInvite(invite) {
      invite.destroy();
      this.model.invites.removeObject(invite);
    },
    destroyAllExpired() {
      this.dialog.deleteConfirm({
        message: _I18n.default.t("user.invited.remove_all_confirm"),
        didConfirm: () => {
          return _invite.default.destroyAllExpired().then(() => {
            this.set("removedAll", true);
            this.send("triggerRefresh");
          }).catch(_ajaxError.popupAjaxError);
        }
      });
    },
    reinvite(invite) {
      invite.reinvite();
      return false;
    },
    reinviteAll() {
      this.dialog.yesNoConfirm({
        message: _I18n.default.t("user.invited.reinvite_all_confirm"),
        didConfirm: () => {
          return _invite.default.reinviteAll().then(() => this.set("reinvitedAll", true)).catch(_ajaxError.popupAjaxError);
        }
      });
    },
    loadMore() {
      const model = this.model;
      if (this.canLoadMore && !this.invitesLoading) {
        this.set("invitesLoading", true);
        _invite.default.findInvitedBy(this.user, this.filter, this.searchTerm, model.invites.length).then(invite_model => {
          this.set("invitesLoading", false);
          model.invites.pushObjects(invite_model.invites);
          if (invite_model.invites.length === 0 || invite_model.invites.length < this.siteSettings.invites_per_page) {
            this.set("canLoadMore", false);
          }
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "searchTermChanged", [_dec], Object.getOwnPropertyDescriptor(_obj, "searchTermChanged"), _obj), _applyDecoratedDescriptor(_obj, "_searchTermChanged", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_searchTermChanged"), _obj), _applyDecoratedDescriptor(_obj, "hasEmailInvites", [_dec3], Object.getOwnPropertyDescriptor(_obj, "hasEmailInvites"), _obj), _applyDecoratedDescriptor(_obj, "showBulkActionButtons", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showBulkActionButtons"), _obj), _applyDecoratedDescriptor(_obj, "showSearch", [_dec5], Object.getOwnPropertyDescriptor(_obj, "showSearch"), _obj), _applyDecoratedDescriptor(_obj, "createInvite", [_object.action], Object.getOwnPropertyDescriptor(_obj, "createInvite"), _obj), _applyDecoratedDescriptor(_obj, "createInviteCsv", [_object.action], Object.getOwnPropertyDescriptor(_obj, "createInviteCsv"), _obj), _applyDecoratedDescriptor(_obj, "editInvite", [_object.action], Object.getOwnPropertyDescriptor(_obj, "editInvite"), _obj), _applyDecoratedDescriptor(_obj, "destroyInvite", [_object.action], Object.getOwnPropertyDescriptor(_obj, "destroyInvite"), _obj), _applyDecoratedDescriptor(_obj, "destroyAllExpired", [_object.action], Object.getOwnPropertyDescriptor(_obj, "destroyAllExpired"), _obj), _applyDecoratedDescriptor(_obj, "reinvite", [_object.action], Object.getOwnPropertyDescriptor(_obj, "reinvite"), _obj), _applyDecoratedDescriptor(_obj, "reinviteAll", [_object.action], Object.getOwnPropertyDescriptor(_obj, "reinviteAll"), _obj), _applyDecoratedDescriptor(_obj, "loadMore", [_object.action], Object.getOwnPropertyDescriptor(_obj, "loadMore"), _obj)), _obj)));
  _exports.default = _default;
});
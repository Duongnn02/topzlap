define("discourse/controllers/group-add-members", ["exports", "@ember/controller", "@ember/object", "@ember/utils", "discourse-common/utils/decorators", "discourse/lib/ajax-error", "discourse/lib/utilities", "discourse/mixins/modal-functionality", "I18n"], function (_exports, _controller, _object, _utils, _decorators, _ajaxError, _utilities, _modalFunctionality, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@ember/utils",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error",0,"discourse/lib/utilities",0,"discourse/mixins/modal-functionality",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("model.name", "model.full_name"), _dec2 = (0, _decorators.default)("usernamesAndEmails.[]"), _dec3 = (0, _decorators.default)("usernamesAndEmails.[]"), (_obj = {
    loading: false,
    usernamesAndEmails: null,
    setOwner: false,
    notifyUsers: false,
    onShow() {
      this.setProperties({
        loading: false,
        setOwner: false,
        notifyUsers: false,
        usernamesAndEmails: []
      });
    },
    rawTitle(name, fullName) {
      return _I18n.default.t("groups.add_members.title", {
        group_name: fullName || name
      });
    },
    usernames(usernamesAndEmails) {
      return usernamesAndEmails.reject(_utilities.emailValid).join(",");
    },
    emails(usernamesAndEmails) {
      return usernamesAndEmails.filter(_utilities.emailValid).join(",");
    },
    setUsernamesAndEmails(usernamesAndEmails) {
      this.set("usernamesAndEmails", usernamesAndEmails);
      if (this.emails) {
        if (!this.usernames) {
          this.set("notifyUsers", false);
        }
        this.set("setOwner", false);
      }
    },
    addMembers() {
      if ((0, _utils.isEmpty)(this.usernamesAndEmails)) {
        return;
      }
      this.set("loading", true);
      const promise = this.setOwner ? this.model.addOwners(this.usernames, true, this.notifyUsers) : this.model.addMembers(this.usernames, true, this.notifyUsers, this.emails);
      promise.then(() => {
        this.transitionToRoute("group.members", this.get("model.name"), {
          queryParams: this.usernames ? {
            filter: this.usernames
          } : {}
        });
        this.send("closeModal");
      }).catch((0, _ajaxError.flashAjaxError)(this)).finally(() => this.set("loading", false));
    }
  }, (_applyDecoratedDescriptor(_obj, "rawTitle", [_dec], Object.getOwnPropertyDescriptor(_obj, "rawTitle"), _obj), _applyDecoratedDescriptor(_obj, "usernames", [_dec2], Object.getOwnPropertyDescriptor(_obj, "usernames"), _obj), _applyDecoratedDescriptor(_obj, "emails", [_dec3], Object.getOwnPropertyDescriptor(_obj, "emails"), _obj), _applyDecoratedDescriptor(_obj, "setUsernamesAndEmails", [_object.action], Object.getOwnPropertyDescriptor(_obj, "setUsernamesAndEmails"), _obj), _applyDecoratedDescriptor(_obj, "addMembers", [_object.action], Object.getOwnPropertyDescriptor(_obj, "addMembers"), _obj)), _obj)));
  _exports.default = _default;
});
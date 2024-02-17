define("discourse/controllers/user-activity", ["exports", "@ember/controller", "I18n", "@ember/object/computed", "discourse/lib/export-csv", "@ember/service", "discourse-common/utils/decorators"], function (_exports, _controller, _I18n, _computed, _exportCsv, _service, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"@ember/object/computed",0,"discourse/lib/export-csv",0,"@ember/service",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.observes)("userActionType", "model.stream.itemsLoaded"), _dec2 = (0, _decorators.default)("currentUser.draft_count"), _dec3 = (0, _decorators.default)("model.pending_posts_count"), (_obj = {
    dialog: (0, _service.inject)(),
    application: (0, _controller.inject)(),
    user: (0, _controller.inject)(),
    userActionType: null,
    canDownloadPosts: (0, _computed.alias)("user.viewingSelf"),
    _showFooter() {
      let showFooter;
      if (this.userActionType) {
        const stat = (this.get("model.stats") || []).find(s => s.action_type === this.userActionType);
        showFooter = stat && stat.count <= this.get("model.stream.itemsLoaded");
      } else {
        showFooter = this.get("model.statsCountNonPM") <= this.get("model.stream.itemsLoaded");
      }
      this.set("application.showFooter", showFooter);
    },
    draftLabel(count) {
      return count > 0 ? _I18n.default.t("drafts.label_with_count", {
        count
      }) : _I18n.default.t("drafts.label");
    },
    pendingLabel(count) {
      return count > 0 ? _I18n.default.t("pending_posts.label_with_count", {
        count
      }) : _I18n.default.t("pending_posts.label");
    },
    actions: {
      exportUserArchive() {
        this.dialog.yesNoConfirm({
          message: _I18n.default.t("user.download_archive.confirm"),
          didConfirm: () => (0, _exportCsv.exportUserArchive)()
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_showFooter", [_dec], Object.getOwnPropertyDescriptor(_obj, "_showFooter"), _obj), _applyDecoratedDescriptor(_obj, "draftLabel", [_dec2], Object.getOwnPropertyDescriptor(_obj, "draftLabel"), _obj), _applyDecoratedDescriptor(_obj, "pendingLabel", [_dec3], Object.getOwnPropertyDescriptor(_obj, "pendingLabel"), _obj)), _obj)));
  _exports.default = _default;
});
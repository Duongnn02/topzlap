define("discourse/controllers/grant-badge", ["exports", "@ember/controller", "discourse/models/badge", "discourse/mixins/grant-badge-controller", "I18n", "discourse/mixins/modal-functionality", "discourse/models/user-badge", "rsvp", "discourse-common/utils/decorators", "discourse/lib/ajax-error"], function (_exports, _controller, _badge, _grantBadgeController, _I18n, _modalFunctionality, _userBadge, _rsvp, _decorators, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/models/badge",0,"discourse/mixins/grant-badge-controller",0,"I18n",0,"discourse/mixins/modal-functionality",0,"discourse/models/user-badge",0,"rsvp",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, _grantBadgeController.default, (_dec = (0, _decorators.default)("topicController.selectedPosts"), _dec2 = (0, _decorators.default)("post"), _dec3 = (0, _decorators.default)("saving", "selectedBadgeGrantable"), (_obj = {
    topicController: (0, _controller.inject)("topic"),
    loading: true,
    saving: false,
    selectedBadgeId: null,
    init() {
      this._super(...arguments);
      this.allBadges = [];
      this.userBadges = [];
    },
    post() {
      return this.get("topicController.selectedPosts")[0];
    },
    badgeReason(post) {
      const url = post.get("url");
      const protocolAndHost = window.location.protocol + "//" + window.location.host;
      return url.startsWith("/") ? protocolAndHost + url : url;
    },
    buttonDisabled(saving, selectedBadgeGrantable) {
      return saving || !selectedBadgeGrantable;
    },
    onShow() {
      this.set("loading", true);
      (0, _rsvp.all)([_badge.default.findAll(), _userBadge.default.findByUsername(this.get("post.username"))]).then(_ref => {
        let [allBadges, userBadges] = _ref;
        this.setProperties({
          allBadges,
          userBadges,
          loading: false
        });
      });
    },
    actions: {
      grantBadge() {
        this.set("saving", true);
        this.grantBadge(this.selectedBadgeId, this.get("post.username"), this.badgeReason).then(newBadge => {
          this.set("selectedBadgeId", null);
          this.flash(_I18n.default.t("badges.successfully_granted", {
            username: this.get("post.username"),
            badge: newBadge.get("badge.name")
          }), "success");
        }, (0, _ajaxError.flashAjaxError)(this)).finally(() => this.set("saving", false));
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "post", [_dec], Object.getOwnPropertyDescriptor(_obj, "post"), _obj), _applyDecoratedDescriptor(_obj, "badgeReason", [_dec2], Object.getOwnPropertyDescriptor(_obj, "badgeReason"), _obj), _applyDecoratedDescriptor(_obj, "buttonDisabled", [_dec3], Object.getOwnPropertyDescriptor(_obj, "buttonDisabled"), _obj)), _obj)));
  _exports.default = _default;
});
define("discourse/controllers/feature-topic", ["exports", "@ember/controller", "@ember/object", "I18n", "discourse/mixins/modal-functionality", "discourse/lib/ajax", "discourse/helpers/category-link", "discourse-common/utils/decorators", "@ember/service"], function (_exports, _controller, _object, _I18n, _modalFunctionality, _ajax, _categoryLink, _decorators, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"I18n",0,"discourse/mixins/modal-functionality",0,"discourse/lib/ajax",0,"discourse/helpers/category-link",0,"discourse-common/utils/decorators",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("model.category"), _dec2 = (0, _decorators.default)("categoryLink", "model.pinned_globally", "model.pinned_until"), _dec3 = (0, _decorators.default)("model.details.can_pin_unpin_topic"), _dec4 = (0, _decorators.default)("categoryLink"), _dec5 = (0, _decorators.default)("categoryLink", "pinnedInCategoryCount"), _dec6 = (0, _decorators.default)("parsedPinnedInCategoryUntil"), _dec7 = (0, _decorators.default)("parsedPinnedGloballyUntil"), _dec8 = (0, _decorators.default)("model.pinnedInCategoryUntil"), _dec9 = (0, _decorators.default)("model.pinnedGloballyUntil"), _dec10 = (0, _decorators.default)("pinDisabled"), _dec11 = (0, _decorators.default)("pinGloballyDisabled"), (_obj = {
    topicController: (0, _controller.inject)("topic"),
    dialog: (0, _service.inject)(),
    loading: true,
    pinnedInCategoryCount: 0,
    pinnedGloballyCount: 0,
    bannerCount: 0,
    reset() {
      this.setProperties({
        "model.pinnedInCategoryUntil": null,
        "model.pinnedGloballyUntil": null,
        pinInCategoryTipShownAt: false,
        pinGloballyTipShownAt: false
      });
    },
    categoryLink(category) {
      return (0, _categoryLink.categoryLinkHTML)(category, {
        allowUncategorized: true
      });
    },
    unPinMessage(categoryLink, pinnedGlobally, pinnedUntil) {
      let name = "topic.feature_topic.unpin";
      if (pinnedGlobally) {
        name += "_globally";
      }
      if (moment(pinnedUntil) > moment()) {
        name += "_until";
      }
      const until = moment(pinnedUntil).format("LL");
      return _I18n.default.t(name, {
        categoryLink,
        until
      });
    },
    canPinGlobally(canPinUnpinTopic) {
      return this.currentUser.canManageTopic && canPinUnpinTopic;
    },
    pinMessage(categoryLink) {
      return _I18n.default.t("topic.feature_topic.pin", {
        categoryLink
      });
    },
    alreadyPinnedMessage(categoryLink, count) {
      const key = count === 0 ? "topic.feature_topic.not_pinned" : "topic.feature_topic.already_pinned";
      return _I18n.default.t(key, {
        categoryLink,
        count
      });
    },
    pinDisabled(parsedPinnedInCategoryUntil) {
      return !this._isDateValid(parsedPinnedInCategoryUntil);
    },
    pinGloballyDisabled(parsedPinnedGloballyUntil) {
      return !this._isDateValid(parsedPinnedGloballyUntil);
    },
    parsedPinnedInCategoryUntil(pinnedInCategoryUntil) {
      return this._parseDate(pinnedInCategoryUntil);
    },
    parsedPinnedGloballyUntil(pinnedGloballyUntil) {
      return this._parseDate(pinnedGloballyUntil);
    },
    pinInCategoryValidation(pinDisabled) {
      if (pinDisabled) {
        return _object.default.create({
          failed: true,
          reason: _I18n.default.t("topic.feature_topic.pin_validation")
        });
      }
    },
    pinGloballyValidation(pinGloballyDisabled) {
      if (pinGloballyDisabled) {
        return _object.default.create({
          failed: true,
          reason: _I18n.default.t("topic.feature_topic.pin_validation")
        });
      }
    },
    _parseDate(date) {
      return moment(date, ["YYYY-MM-DD", "YYYY-MM-DD HH:mm"]);
    },
    _isDateValid(parsedDate) {
      return parsedDate.isValid() && parsedDate > moment();
    },
    onShow() {
      this.set("loading", true);
      return (0, _ajax.ajax)("/topics/feature_stats.json", {
        data: {
          category_id: this.get("model.category.id")
        }
      }).then(result => {
        if (result) {
          this.setProperties({
            pinnedInCategoryCount: result.pinned_in_category_count,
            pinnedGloballyCount: result.pinned_globally_count,
            bannerCount: result.banner_count
          });
        }
      }).finally(() => this.set("loading", false));
    },
    _forwardAction(name) {
      this.topicController.send(name);
      this.send("closeModal");
    },
    _confirmBeforePinningGlobally() {
      const count = this.pinnedGloballyCount;
      if (count < 4) {
        this._forwardAction("pinGlobally");
      } else {
        this.send("hideModal");
        this.dialog.yesNoConfirm({
          message: _I18n.default.t("topic.feature_topic.confirm_pin_globally", {
            count
          }),
          didConfirm: () => this._forwardAction("pinGlobally"),
          didCancel: () => this.send("reopenModal")
        });
      }
    },
    actions: {
      pin() {
        if (this.pinDisabled) {
          this.set("pinInCategoryTipShownAt", Date.now());
        } else {
          this._forwardAction("togglePinned");
        }
      },
      pinGlobally() {
        if (this.pinGloballyDisabled) {
          this.set("pinGloballyTipShownAt", Date.now());
        } else {
          this._confirmBeforePinningGlobally();
        }
      },
      unpin() {
        this._forwardAction("togglePinned");
      },
      makeBanner() {
        this._forwardAction("makeBanner");
      },
      removeBanner() {
        this._forwardAction("removeBanner");
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "categoryLink", [_dec], Object.getOwnPropertyDescriptor(_obj, "categoryLink"), _obj), _applyDecoratedDescriptor(_obj, "unPinMessage", [_dec2], Object.getOwnPropertyDescriptor(_obj, "unPinMessage"), _obj), _applyDecoratedDescriptor(_obj, "canPinGlobally", [_dec3], Object.getOwnPropertyDescriptor(_obj, "canPinGlobally"), _obj), _applyDecoratedDescriptor(_obj, "pinMessage", [_dec4], Object.getOwnPropertyDescriptor(_obj, "pinMessage"), _obj), _applyDecoratedDescriptor(_obj, "alreadyPinnedMessage", [_dec5], Object.getOwnPropertyDescriptor(_obj, "alreadyPinnedMessage"), _obj), _applyDecoratedDescriptor(_obj, "pinDisabled", [_dec6], Object.getOwnPropertyDescriptor(_obj, "pinDisabled"), _obj), _applyDecoratedDescriptor(_obj, "pinGloballyDisabled", [_dec7], Object.getOwnPropertyDescriptor(_obj, "pinGloballyDisabled"), _obj), _applyDecoratedDescriptor(_obj, "parsedPinnedInCategoryUntil", [_dec8], Object.getOwnPropertyDescriptor(_obj, "parsedPinnedInCategoryUntil"), _obj), _applyDecoratedDescriptor(_obj, "parsedPinnedGloballyUntil", [_dec9], Object.getOwnPropertyDescriptor(_obj, "parsedPinnedGloballyUntil"), _obj), _applyDecoratedDescriptor(_obj, "pinInCategoryValidation", [_dec10], Object.getOwnPropertyDescriptor(_obj, "pinInCategoryValidation"), _obj), _applyDecoratedDescriptor(_obj, "pinGloballyValidation", [_dec11], Object.getOwnPropertyDescriptor(_obj, "pinGloballyValidation"), _obj)), _obj)));
  _exports.default = _default;
});
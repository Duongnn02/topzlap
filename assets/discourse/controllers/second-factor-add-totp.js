define("discourse/controllers/second-factor-add-totp", ["exports", "@ember/controller", "@ember/object", "I18n", "discourse/mixins/modal-functionality"], function (_exports, _controller, _object, _I18n, _modalFunctionality) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"I18n",0,"discourse/mixins/modal-functionality"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_obj = {
    loading: false,
    secondFactorImage: null,
    secondFactorKey: null,
    showSecondFactorKey: false,
    errorMessage: null,
    onShow() {
      this.setProperties({
        errorMessage: null,
        secondFactorKey: null,
        secondFactorName: null,
        secondFactorToken: null,
        showSecondFactorKey: false,
        secondFactorImage: null,
        loading: true
      });
      this.model.createSecondFactorTotp().then(response => {
        if (response.error) {
          this.set("errorMessage", response.error);
          return;
        }
        this.setProperties({
          errorMessage: null,
          secondFactorKey: response.key,
          secondFactorImage: response.qr
        });
      }).catch(error => {
        this.send("closeModal");
        this.onError(error);
      }).finally(() => this.set("loading", false));
    },
    enableShowSecondFactorKey(event) {
      event?.preventDefault();
      this.set("showSecondFactorKey", true);
    },
    actions: {
      showSecondFactorKey() {
        this.enableShowSecondFactorKey();
      },
      enableSecondFactor() {
        if (!this.secondFactorToken || !this.secondFactorName) {
          this.set("errorMessage", _I18n.default.t("user.second_factor.totp.name_and_code_required_error"));
          return;
        }
        this.set("loading", true);
        this.model.enableSecondFactorTotp(this.secondFactorToken, this.secondFactorName).then(response => {
          if (response.error) {
            this.set("errorMessage", response.error);
            return;
          }
          this.markDirty();
          this.set("errorMessage", null);
          this.send("closeModal");
        }).catch(error => this.onError(error)).finally(() => this.set("loading", false));
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "enableShowSecondFactorKey", [_object.action], Object.getOwnPropertyDescriptor(_obj, "enableShowSecondFactorKey"), _obj)), _obj));
  _exports.default = _default;
});
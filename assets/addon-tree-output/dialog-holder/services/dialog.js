define("dialog-holder/services/dialog", ["exports", "@ember/service", "a11y-dialog", "discourse-common/utils/decorators"], function (_exports, _service, _a11yDialog, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/service",0,"a11y-dialog",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _service.default.extend((_obj = {
    dialogInstance: null,
    message: null,
    title: null,
    titleElementId: null,
    type: null,
    bodyComponent: null,
    bodyComponentModel: null,
    confirmButtonIcon: null,
    confirmButtonLabel: null,
    confirmButtonClass: null,
    confirmButtonDisabled: false,
    cancelButtonLabel: null,
    cancelButtonClass: null,
    shouldDisplayCancel: null,
    didConfirm: null,
    didCancel: null,
    buttons: null,
    class: null,
    _confirming: false,
    dialog(params) {
      const {
        message,
        bodyComponent,
        bodyComponentModel,
        type,
        title,
        confirmButtonClass = "btn-primary",
        confirmButtonIcon,
        confirmButtonLabel = "ok_value",
        confirmButtonDisabled = false,
        cancelButtonClass = "btn-default",
        cancelButtonLabel = "cancel_value",
        shouldDisplayCancel,
        didConfirm,
        didCancel,
        buttons
      } = params;
      const element = document.getElementById("dialog-holder");
      this.setProperties({
        message,
        bodyComponent,
        bodyComponentModel,
        type,
        dialogInstance: new _a11yDialog.default(element),
        title,
        titleElementId: title !== null ? "dialog-title" : null,
        confirmButtonClass,
        confirmButtonDisabled,
        confirmButtonIcon,
        confirmButtonLabel,
        cancelButtonClass,
        cancelButtonLabel,
        shouldDisplayCancel,
        didConfirm,
        didCancel,
        buttons,
        class: params.class
      });
      this.dialogInstance.show();
      this.dialogInstance.on("hide", () => {
        if (!this._confirming && this.didCancel) {
          this.didCancel();
        }
        this.reset();
      });
    },
    alert(params) {
      // support string param for easier porting of bootbox.alert
      if (typeof params === "string") {
        return this.dialog({
          message: params,
          type: "alert"
        });
      }
      return this.dialog({
        ...params,
        type: "alert"
      });
    },
    confirm(params) {
      return this.dialog({
        ...params,
        shouldDisplayCancel: true,
        buttons: null,
        type: "confirm"
      });
    },
    notice(message) {
      return this.dialog({
        message,
        type: "notice"
      });
    },
    yesNoConfirm(params) {
      return this.confirm({
        ...params,
        confirmButtonLabel: "yes_value",
        cancelButtonLabel: "no_value"
      });
    },
    deleteConfirm(params) {
      return this.confirm({
        ...params,
        confirmButtonClass: "btn-danger",
        confirmButtonLabel: params.confirmButtonLabel || "delete"
      });
    },
    reset() {
      this.setProperties({
        message: null,
        bodyComponent: null,
        bodyComponentModel: null,
        type: null,
        dialogInstance: null,
        title: null,
        titleElementId: null,
        confirmButtonDisabled: false,
        confirmButtonIcon: null,
        confirmButtonLabel: null,
        cancelButtonClass: null,
        cancelButtonLabel: null,
        shouldDisplayCancel: null,
        didConfirm: null,
        didCancel: null,
        buttons: null,
        class: null,
        _confirming: false
      });
    },
    willDestroy() {
      this.dialogInstance?.destroy();
      this.reset();
    },
    didConfirmWrapped() {
      if (this.didConfirm) {
        this.didConfirm();
      }
      this._confirming = true;
      this.dialogInstance.hide();
    },
    cancel() {
      this.dialogInstance.hide();
    },
    enableConfirmButton() {
      this.set("confirmButtonDisabled", false);
    }
  }, (_applyDecoratedDescriptor(_obj, "didConfirmWrapped", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "didConfirmWrapped"), _obj), _applyDecoratedDescriptor(_obj, "cancel", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "cancel"), _obj), _applyDecoratedDescriptor(_obj, "enableConfirmButton", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "enableConfirmButton"), _obj)), _obj));
  _exports.default = _default;
});
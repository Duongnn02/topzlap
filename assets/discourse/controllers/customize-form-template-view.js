define("discourse/controllers/customize-form-template-view", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "@ember/object", "@ember/service", "I18n", "discourse/lib/ajax-error", "discourse/lib/ajax", "@glimmer/tracking"], function (_exports, _controller, _modalFunctionality, _object, _service, _I18n, _ajaxError, _ajax, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"@ember/object",0,"@ember/service",0,"I18n",0,"discourse/lib/ajax-error",0,"discourse/lib/ajax",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let AdminCustomizeFormTemplateView = (_class = class AdminCustomizeFormTemplateView extends _controller.default.extend(_modalFunctionality.default) {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "router", _descriptor, this);
      _initializerDefineProperty(this, "dialog", _descriptor2, this);
      _initializerDefineProperty(this, "showPreview", _descriptor3, this);
    }
    togglePreview() {
      this.showPreview = !this.showPreview;
    }
    editTemplate() {
      this.router.transitionTo("adminCustomizeFormTemplates.edit", this.model);
    }
    deleteTemplate() {
      return this.dialog.yesNoConfirm({
        message: _I18n.default.t("admin.form_templates.delete_confirm", {
          template_name: this.model.name
        }),
        didConfirm: () => {
          (0, _ajax.ajax)(`/admin/customize/form-templates/${this.model.id}.json`, {
            type: "DELETE"
          }).then(() => {
            this.refreshModel();
          }).catch(_ajaxError.popupAjaxError);
        }
      });
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "dialog", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "showPreview", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "togglePreview", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "togglePreview"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "editTemplate", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "editTemplate"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "deleteTemplate", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "deleteTemplate"), _class.prototype)), _class);
  _exports.default = AdminCustomizeFormTemplateView;
});
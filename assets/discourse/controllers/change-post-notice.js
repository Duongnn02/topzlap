define("discourse/controllers/change-post-notice", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "@ember/object", "discourse/lib/text", "discourse-common/utils/decorators", "@ember/utils"], function (_exports, _controller, _modalFunctionality, _object, _text, _decorators, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"@ember/object",0,"discourse/lib/text",0,"discourse-common/utils/decorators",0,"@ember/utils"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("saving", "notice"), (_obj = {
    post: null,
    resolve: null,
    reject: null,
    notice: null,
    saving: false,
    disabled(saving, notice) {
      return saving || (0, _utils.isEmpty)(notice);
    },
    onShow() {
      this.setProperties({
        notice: "",
        saving: false
      });
    },
    onClose() {
      if (this.reject) {
        this.reject();
      }
    },
    setNotice(notice) {
      const {
        resolve,
        reject
      } = this;
      this.setProperties({
        saving: true,
        resolve: null,
        reject: null
      });
      this.model.updatePostField("notice", notice).then(() => {
        if (notice) {
          return (0, _text.cookAsync)(notice, {
            features: {
              onebox: false
            }
          });
        }
      }).then(cooked => this.model.set("notice", cooked ? {
        type: "custom",
        raw: notice,
        cooked: cooked.string
      } : null)).then(resolve, reject).finally(() => this.send("closeModal"));
    }
  }, (_applyDecoratedDescriptor(_obj, "disabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "disabled"), _obj), _applyDecoratedDescriptor(_obj, "setNotice", [_object.action], Object.getOwnPropertyDescriptor(_obj, "setNotice"), _obj)), _obj)));
  _exports.default = _default;
});
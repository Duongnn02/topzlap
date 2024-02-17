define("discourse/components/avatar-flair", ["exports", "discourse/components/mount-widget", "discourse-common/utils/decorators"], function (_exports, _mountWidget, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/components/mount-widget",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _mountWidget.default.extend((_dec = (0, _decorators.observes)("flairName", "flairUrl", "flairBgColor", "flairColor"), (_obj = {
    widget: "avatar-flair",
    _rerender() {
      this.queueRerender();
    },
    buildArgs() {
      return {
        flair_name: this.flairName,
        flair_url: this.flairUrl,
        flair_bg_color: this.flairBgColor,
        flair_color: this.flairColor
      };
    }
  }, (_applyDecoratedDescriptor(_obj, "_rerender", [_dec], Object.getOwnPropertyDescriptor(_obj, "_rerender"), _obj)), _obj)));
  _exports.default = _default;
});
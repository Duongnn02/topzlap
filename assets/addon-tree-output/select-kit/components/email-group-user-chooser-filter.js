define("select-kit/components/email-group-user-chooser-filter", ["exports", "select-kit/components/multi-select/multi-select-filter", "@ember/object"], function (_exports, _multiSelectFilter, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/multi-select/multi-select-filter",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _multiSelectFilter.default.extend((_obj = {
    classNames: ["email-group-user-chooser-filter"],
    onPaste(event) {
      if (this.selectKit.options.maximum === 1) {
        return;
      }
      const data = event?.clipboardData;
      if (!data) {
        return;
      }
      const recipients = [];
      data.getData("text").split(/[, \n]+/).forEach(recipient => {
        recipient = recipient.replace(/^@+/, "").trim();
        if (recipient.length > 0) {
          recipients.push(recipient);
        }
      });
      if (recipients.length > 0) {
        event.stopPropagation();
        event.preventDefault();
        this.selectKit.append(recipients);
        return false;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "onPaste", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onPaste"), _obj)), _obj));
  _exports.default = _default;
});
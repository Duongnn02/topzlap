define("select-kit/components/pinned-button", ["exports", "@ember/component", "I18n", "discourse-common/utils/decorators", "select-kit/templates/components/pinned-button"], function (_exports, _component, _I18n, _decorators, _pinnedButton) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators",0,"select-kit/templates/components/pinned-button"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend((_dec = (0, _decorators.default)("topic.pinned_globally", "pinned"), _dec2 = (0, _decorators.default)("pinned", "topic.deleted", "topic.unpinned"), (_obj = {
    pluginApiIdentifiers: ["pinned-button"],
    descriptionKey: "help",
    classNames: "pinned-button",
    classNameBindings: ["isHidden"],
    layout: _pinnedButton.default,
    reasonText(pinnedGlobally, pinned) {
      const globally = pinnedGlobally ? "_globally" : "";
      const pinnedKey = pinned ? `pinned${globally}` : "unpinned";
      const key = `topic_statuses.${pinnedKey}.help`;
      return _I18n.default.t(key);
    },
    isHidden(pinned, deleted, unpinned) {
      return deleted || !pinned && !unpinned;
    }
  }, (_applyDecoratedDescriptor(_obj, "reasonText", [_dec], Object.getOwnPropertyDescriptor(_obj, "reasonText"), _obj), _applyDecoratedDescriptor(_obj, "isHidden", [_dec2], Object.getOwnPropertyDescriptor(_obj, "isHidden"), _obj)), _obj)));
  _exports.default = _default;
});
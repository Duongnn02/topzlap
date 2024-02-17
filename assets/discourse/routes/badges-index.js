define("discourse/routes/badges-index", ["exports", "discourse/models/badge", "discourse/routes/discourse", "I18n", "discourse/lib/preload-store", "discourse/mixins/scroll-top", "@ember/object"], function (_exports, _badge, _discourse, _I18n, _preloadStore, _scrollTop, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/badge",0,"discourse/routes/discourse",0,"I18n",0,"discourse/lib/preload-store",0,"discourse/mixins/scroll-top",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _discourse.default.extend((_obj = {
    model() {
      if (_preloadStore.default.get("badges")) {
        return _preloadStore.default.getAndRemove("badges").then(json => _badge.default.createFromJson(json));
      } else {
        return _badge.default.findAll({
          onlyListable: true
        });
      }
    },
    titleToken() {
      return _I18n.default.t("badges.title");
    },
    didTransition() {
      this.controllerFor("application").set("showFooter", true);
      (0, _scrollTop.scrollTop)();
      return true;
    }
  }, (_applyDecoratedDescriptor(_obj, "didTransition", [_object.action], Object.getOwnPropertyDescriptor(_obj, "didTransition"), _obj)), _obj));
  _exports.default = _default;
});
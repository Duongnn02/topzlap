define("discourse/mixins/load-more", ["exports", "discourse/lib/eyeline", "@ember/object/mixin", "discourse/mixins/scrolling", "discourse-common/utils/decorators"], function (_exports, _eyeline, _mixin, _scrolling, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/eyeline",0,"@ember/object/mixin",0,"discourse/mixins/scrolling",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // Provides the ability to load more items for a view which is scrolled to the bottom.
  var _default = _mixin.default.create(_scrolling.default, (_dec = (0, _decorators.on)("didInsertElement"), _dec2 = (0, _decorators.on)("willDestroyElement"), (_obj = {
    scrolled() {
      return this.eyeline?.update();
    },
    loadMoreUnlessFull() {
      if (this.screenNotFull()) {
        this.send("loadMore");
      }
    },
    _bindEyeline() {
      const eyeline = _eyeline.default.create({
        selector: `${this.eyelineSelector}:last`
      });
      this.set("eyeline", eyeline);
      eyeline.on("sawBottom", () => this.send("loadMore"));
      eyeline.update(); // update once to consider current position

      this.bindScrolling();
    },
    _removeEyeline() {
      this.unbindScrolling();
    }
  }, (_applyDecoratedDescriptor(_obj, "_bindEyeline", [_dec], Object.getOwnPropertyDescriptor(_obj, "_bindEyeline"), _obj), _applyDecoratedDescriptor(_obj, "_removeEyeline", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_removeEyeline"), _obj)), _obj)));
  _exports.default = _default;
});
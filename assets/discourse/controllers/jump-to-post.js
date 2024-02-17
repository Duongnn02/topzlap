define("discourse/controllers/jump-to-post", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "@ember/object/computed", "@ember/object"], function (_exports, _controller, _modalFunctionality, _computed, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"@ember/object/computed",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_obj = {
    model: null,
    postNumber: null,
    postDate: null,
    filteredPostsCount: (0, _computed.reads)("topic.postStream.filteredPostsCount"),
    jump() {
      if (this.postNumber) {
        this._jumpToIndex(this.filteredPostsCount, this.postNumber);
      } else if (this.postDate) {
        this._jumpToDate(this.postDate);
      }
    },
    _jumpToIndex(postsCounts, postNumber) {
      const where = Math.min(postsCounts, Math.max(1, parseInt(postNumber, 10)));
      this.jumpToIndex(where);
      this._close();
    },
    _jumpToDate(date) {
      this.jumpToDate(date);
      this._close();
    },
    _close() {
      this.setProperties({
        postNumber: null,
        postDate: null
      });
      this.send("closeModal");
    }
  }, (_applyDecoratedDescriptor(_obj, "jump", [_object.action], Object.getOwnPropertyDescriptor(_obj, "jump"), _obj)), _obj));
  _exports.default = _default;
});
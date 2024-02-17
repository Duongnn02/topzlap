define("discourse/lib/posts-with-placeholders", ["exports", "@ember/array", "@ember/object", "discourse-common/utils/decorators"], function (_exports, _array, _object, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Placeholder = Placeholder;
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/array",0,"@ember/object",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function Placeholder(viewName) {
    this.viewName = viewName;
  }
  var _default = _object.default.extend(_array.default, (_obj = {
    posts: null,
    _appendingIds: null,
    init() {
      this._appendingIds = {};
    },
    length() {
      return this.get("posts.length") + Object.keys(this._appendingIds || {}).length;
    },
    nextObject(index) {
      return this.objectAt(index);
    },
    _changeArray(cb, offset, removed, inserted) {
      this.arrayContentWillChange(offset, removed, inserted);
      cb();
      this.arrayContentDidChange(offset, removed, inserted);
      this.notifyPropertyChange("length");
    },
    clear(cb) {
      this._changeArray(cb, 0, this.get("posts.length"), 0);
    },
    appendPost(cb) {
      this._changeArray(cb, this.get("posts.length"), 0, 1);
    },
    removePost(cb) {
      this._changeArray(cb, this.get("posts.length") - 1, 1, 0);
    },
    refreshAll(cb) {
      const length = this.get("posts.length");
      this._changeArray(cb, 0, length, length);
    },
    appending(postIds) {
      this._changeArray(() => {
        const appendingIds = this._appendingIds;
        postIds.forEach(pid => appendingIds[pid] = true);
      }, this.length, 0, postIds.length);
    },
    finishedAppending(postIds) {
      this._changeArray(() => {
        const appendingIds = this._appendingIds;
        postIds.forEach(pid => delete appendingIds[pid]);
      }, this.get("posts.length") - postIds.length, postIds.length, postIds.length);
    },
    finishedPrepending(postIds) {
      this._changeArray(function () {}, 0, 0, postIds.length);
    },
    objectAt(index) {
      const posts = this.posts;
      return index < posts.length ? posts[index] : new Placeholder("post-placeholder");
    }
  }, (_applyDecoratedDescriptor(_obj, "length", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "length"), _obj)), _obj));
  _exports.default = _default;
});
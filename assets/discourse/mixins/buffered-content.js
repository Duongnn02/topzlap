define("discourse/mixins/buffered-content", ["exports", "ember-buffered-proxy/proxy", "@ember/object/mixin", "@ember/object"], function (_exports, _proxy, _mixin, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.bufferedProperty = bufferedProperty;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-buffered-proxy/proxy",0,"@ember/object/mixin",0,"@ember/object"eaimeta@70e063a35619d71f
  function bufferedProperty(property) {
    const mixin = {
      buffered: (0, _object.computed)(property, function () {
        return _proxy.default.create({
          content: this.get(property)
        });
      }),
      rollbackBuffer() {
        this.buffered.discardBufferedChanges();
      },
      commitBuffer() {
        this.buffered.applyBufferedChanges();
      }
    };

    // It's a good idea to null out fields when declaring objects
    mixin.property = null;
    return _mixin.default.create(mixin);
  }
  var _default = bufferedProperty("content");
  _exports.default = _default;
});
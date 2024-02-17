define("@ember/-internals/runtime/lib/system/object", ["exports", "@ember/-internals/container", "@ember/-internals/utils", "@ember/-internals/metal", "@ember/-internals/runtime/lib/system/core_object", "@ember/-internals/runtime/lib/mixins/observable", "@ember/debug"], function (_exports, _container, _utils, _metal, _core_object, _observable, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.FrameworkObject = void 0;
  /**
  @module @ember/object
  */

  /**
    `EmberObject` is the main base class for all Ember objects. It is a subclass
    of `CoreObject` with the `Observable` mixin applied. For details,
    see the documentation for each of these.
  
    @class EmberObject
    @extends CoreObject
    @uses Observable
    @public
  */

  class EmberObject extends _core_object.default {
    get _debugContainerKey() {
      var factory = (0, _container.getFactoryFor)(this);
      return factory !== undefined && factory.fullName;
    }
  }
  _exports.default = EmberObject;
  _observable.default.apply(EmberObject.prototype);
  var FrameworkObject;
  _exports.FrameworkObject = FrameworkObject;
  _exports.FrameworkObject = FrameworkObject = class FrameworkObject extends _core_object.default {
    get _debugContainerKey() {
      var factory = (0, _container.getFactoryFor)(this);
      return factory !== undefined && factory.fullName;
    }
  };
  _observable.default.apply(FrameworkObject.prototype);
  if (false /* DEBUG */) {
    var INIT_WAS_CALLED = (0, _utils.symbol)('INIT_WAS_CALLED');
    var ASSERT_INIT_WAS_CALLED = (0, _utils.symbol)('ASSERT_INIT_WAS_CALLED');
    _exports.FrameworkObject = FrameworkObject = class DebugFrameworkObject extends EmberObject {
      init() {
        super.init(...arguments);
        this[INIT_WAS_CALLED] = true;
      }
      [ASSERT_INIT_WAS_CALLED]() {
        (false && !(this[INIT_WAS_CALLED]) && (0, _debug.assert)(`You must call \`super.init(...arguments);\` or \`this._super(...arguments)\` when overriding \`init\` on a framework object. Please update ${this} to call \`super.init(...arguments);\` from \`init\` when using native classes or \`this._super(...arguments)\` when using \`EmberObject.extend()\`.`, this[INIT_WAS_CALLED]));
      }
    };
    (0, _metal.addListener)(FrameworkObject.prototype, 'init', null, ASSERT_INIT_WAS_CALLED);
  }
});
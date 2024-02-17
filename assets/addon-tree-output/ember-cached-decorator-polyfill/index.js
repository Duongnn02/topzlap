define("ember-cached-decorator-polyfill/index", ["exports", "@glimmer/tracking/primitives/cache", "@ember/debug"], function (_exports, _cache, _debug) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.cached = cached;
  function cached() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const [target, key, descriptor] = args;

    // Error on `@cached()`, `@cached(...args)`, and `@cached propName = value;`
    (false && !(target !== undefined) && (0, _debug.assert)('You attempted to use @cached(), which is not necessary nor supported. Remove the parentheses and you will be good to go!', target !== undefined));
    (false && !(typeof target === 'object' && typeof key === 'string' && typeof descriptor === 'object' && args.length === 3) && (0, _debug.assert)(`You attempted to use @cached on with ${args.length > 1 ? 'arguments' : 'an argument'} ( @cached(${args.map(d => `'${d}'`).join(', ')}), which is not supported. Dependencies are automatically tracked, so you can just use ${'`@cached`'}`, typeof target === 'object' && typeof key === 'string' && typeof descriptor === 'object' && args.length === 3));
    (false && !(typeof descriptor.get == 'function') && (0, _debug.assert)(`The @cached decorator must be applied to getters. '${key}' is not a getter.`, typeof descriptor.get == 'function'));
    const caches = new WeakMap();
    const getter = descriptor.get;
    descriptor.get = function () {
      if (!caches.has(this)) caches.set(this, (0, _cache.createCache)(getter.bind(this)));
      return (0, _cache.getValue)(caches.get(this));
    };
  }
});
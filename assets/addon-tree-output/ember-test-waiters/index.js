define("ember-test-waiters/index", ["exports", "@ember/debug", "@ember/test-waiters"], function (_exports, _debug, _testWaiters) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.keys(_testWaiters).forEach(function (key) {
    if (key === "default" || key === "__esModule") return;
    if (key in _exports && _exports[key] === _testWaiters[key]) return;
    Object.defineProperty(_exports, key, {
      enumerable: true,
      get: function () {
        return _testWaiters[key];
      }
    });
  });
  (true && !(false) && (0, _debug.deprecate)('Importing from ember-test-waiters is deprecated. Please import from @ember/test-waiters', false, {
    id: 'ember-test-waiters-legacy-module-name',
    until: '3.0.0',
    for: 'ember-test-waiters',
    since: {
      enabled: '2.2.0'
    }
  }));
});
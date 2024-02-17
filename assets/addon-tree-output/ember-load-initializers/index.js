define("ember-load-initializers/index", ["exports", "require"], function (_exports, _require) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = loadInitializers;
  function resolveInitializer(moduleName) {
    var module = (0, _require.default)(moduleName, null, null, true);
    if (!module) {
      throw new Error(moduleName + ' must export an initializer.');
    }
    var initializer = module['default'];
    if (!initializer) {
      throw new Error(moduleName + ' must have a default export');
    }
    if (!initializer.name) {
      initializer.name = moduleName.slice(moduleName.lastIndexOf('/') + 1);
    }
    return initializer;
  }
  function registerInitializers(app, moduleNames) {
    for (var i = 0; i < moduleNames.length; i++) {
      app.initializer(resolveInitializer(moduleNames[i]));
    }
  }
  function registerInstanceInitializers(app, moduleNames) {
    for (var i = 0; i < moduleNames.length; i++) {
      app.instanceInitializer(resolveInitializer(moduleNames[i]));
    }
  }
  function _endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  }

  /**
   * Configure your application as it boots
   */
  function loadInitializers(app, prefix) {
    var initializerPrefix = prefix + '/initializers/';
    var instanceInitializerPrefix = prefix + '/instance-initializers/';
    var initializers = [];
    var instanceInitializers = [];
    // this is 2 pass because generally the first pass is the problem
    // and is reduced, and resolveInitializer has potential to deopt
    var moduleNames = Object.keys(requirejs._eak_seen);
    for (var i = 0; i < moduleNames.length; i++) {
      var moduleName = moduleNames[i];
      if (moduleName.lastIndexOf(initializerPrefix, 0) === 0) {
        if (!_endsWith(moduleName, '-test')) {
          initializers.push(moduleName);
        }
      } else if (moduleName.lastIndexOf(instanceInitializerPrefix, 0) === 0) {
        if (!_endsWith(moduleName, '-test')) {
          instanceInitializers.push(moduleName);
        }
      }
    }
    registerInitializers(app, initializers);
    registerInstanceInitializers(app, instanceInitializers);
  }
});
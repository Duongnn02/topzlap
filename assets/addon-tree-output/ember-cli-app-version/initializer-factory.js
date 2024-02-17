define("ember-cli-app-version/initializer-factory", ["exports", "ember"], function (_exports, _ember) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = initializerFactory;
  const {
    libraries
  } = _ember.default;
  function initializerFactory(name, version) {
    let registered = false;
    return function () {
      if (!registered && name && version) {
        libraries.register(name, version);
        registered = true;
      }
    };
  }
});
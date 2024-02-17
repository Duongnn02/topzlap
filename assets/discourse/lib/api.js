define("discourse/lib/api", ["exports", "discourse/lib/plugin-api"], function (_exports, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.apiInitializer = apiInitializer;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/plugin-api"eaimeta@70e063a35619d71f
  /**
   * apiInitializer(version, apiCodeCallback, opts)
   *
   * An API to simplify the creation of initializers for plugins/themes by removing
   * some of the boilerplate.
   */
  let _apiInitializerId = 0;
  function apiInitializer(version, cb, opts) {
    return {
      name: `api-initializer${_apiInitializerId++}`,
      after: "inject-objects",
      initialize() {
        return (0, _pluginApi.withPluginApi)(version, cb, opts);
      }
    };
  }
});
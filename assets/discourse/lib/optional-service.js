define("discourse/lib/optional-service", ["exports", "@ember/object", "@ember/application", "@ember/string"], function (_exports, _object, _application, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/application",0,"@ember/string"eaimeta@70e063a35619d71f
  function _default(name) {
    return (0, _object.computed)(function (defaultName) {
      return (0, _application.getOwner)(this).lookup(`service:${name || (0, _string.dasherize)(defaultName)}`);
    });
  }
});
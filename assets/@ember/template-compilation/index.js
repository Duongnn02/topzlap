define("@ember/template-compilation/index", ["exports", "ember-template-compiler"], function (_exports, _emberTemplateCompiler) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "compileTemplate", {
    enumerable: true,
    get: function () {
      return _emberTemplateCompiler.compile;
    }
  });
  _exports.precompileTemplate = void 0;
  var precompileTemplate;
  _exports.precompileTemplate = precompileTemplate;
  if (false /* DEBUG */) {
    _exports.precompileTemplate = precompileTemplate = () => {
      throw new Error('Attempted to call `precompileTemplate` at runtime, but this API is meant to be used at compile time. You should use `compileTemplate` instead.');
    };
  }
});
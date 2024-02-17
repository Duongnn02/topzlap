define("discourse/lib/hashtag-types/base", ["exports", "@ember/application"], function (_exports, _application) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/application"eaimeta@70e063a35619d71f
  class HashtagTypeBase {
    constructor(container) {
      (0, _application.setOwner)(this, container);
    }
    get type() {
      throw "not implemented";
    }
    get preloadedData() {
      throw "not implemented";
    }
    generateColorCssClasses() {
      throw "not implemented";
    }
  }
  _exports.default = HashtagTypeBase;
});
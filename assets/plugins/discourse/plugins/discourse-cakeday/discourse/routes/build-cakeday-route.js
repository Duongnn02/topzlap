define("discourse/plugins/discourse-cakeday/discourse/routes/build-cakeday-route", ["exports", "discourse/routes/discourse"], function (_exports, _discourse) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse"eaimeta@70e063a35619d71f
  var _default = (storeName, filter) => {
    return _discourse.default.extend({
      model(params) {
        if (filter) {
          params.filter = filter;
        }
        return this.store.find(storeName, params);
      }
    });
  };
  _exports.default = _default;
});
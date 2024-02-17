define("discourse/plugins/discourse-cakeday/discourse/routes/cakeday-birthdays-all", ["exports", "discourse/plugins/discourse-cakeday/discourse/routes/build-cakeday-route"], function (_exports, _buildCakedayRoute) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/plugins/discourse-cakeday/discourse/routes/build-cakeday-route"eaimeta@70e063a35619d71f
  var _default = (0, _buildCakedayRoute.default)("birthday").extend({
    queryParams: {
      month: {
        refreshModel: true
      }
    },
    refreshQueryWithoutTransition: true
  });
  _exports.default = _default;
});
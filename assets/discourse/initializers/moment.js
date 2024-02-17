define("discourse/initializers/moment", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    name: "moment",
    after: "message-bus",
    initialize() {
      moment.tz.link(["Asia/Kolkata|IST", "Asia/Seoul|KST", "Asia/Tokyo|JST"]);
      delete moment.tz._links["us_pacific-new"];
    }
  };
  _exports.default = _default;
});
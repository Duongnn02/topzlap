define("discourse-common/config/environment", ["exports", "discourse-common/lib/deprecated"], function (_exports, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.INPUT_DELAY = void 0;
  _exports.isDevelopment = isDevelopment;
  _exports.isLegacyEmber = isLegacyEmber;
  _exports.isProduction = isProduction;
  _exports.isTesting = isTesting;
  _exports.setEnvironment = setEnvironment;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  const INPUT_DELAY = 250;
  _exports.INPUT_DELAY = INPUT_DELAY;
  let environment = "unknown";
  function setEnvironment(e) {
    if (isTesting()) {
      environment = "testing";
    } else {
      environment = e;
    }
  }
  function isTesting() {
    return environment === "testing";
  }

  // Generally means "before we migrated to Ember CLI"
  function isLegacyEmber() {
    (0, _deprecated.default)("`isLegacyEmber()` is now deprecated and always returns false", {
      id: "discourse.is-legacy-ember",
      dropFrom: "3.0.0.beta1"
    });
    return false;
  }
  function isDevelopment() {
    return environment === "development";
  }
  function isProduction() {
    return environment === "production";
  }
});
define("discourse/lib/logout", ["exports", "discourse-common/lib/get-url", "discourse-common/lib/helpers", "@ember/utils"], function (_exports, _getUrl, _helpers, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = logout;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/get-url",0,"discourse-common/lib/helpers",0,"@ember/utils"eaimeta@70e063a35619d71f
  function logout() {
    let {
      redirect
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const ctx = (0, _helpers.helperContext)();
    let keyValueStore = ctx.keyValueStore;
    keyValueStore.abandonLocal();
    if (!(0, _utils.isEmpty)(redirect)) {
      window.location.href = redirect;
      return;
    }
    window.location.href = (0, _getUrl.default)("/");
  }
});
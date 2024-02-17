define("discourse/initializers/mobile", ["exports", "discourse/lib/mobile", "discourse-common/resolver"], function (_exports, _mobile, _resolver) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/mobile",0,"discourse-common/resolver"eaimeta@70e063a35619d71f
  // Initializes the `Mobile` helper object.
  var _default = {
    name: "mobile",
    after: "inject-objects",
    initialize(container) {
      _mobile.default.init();
      const site = container.lookup("service:site");
      site.set("mobileView", _mobile.default.mobileView);
      site.set("desktopView", !_mobile.default.mobileView);
      site.set("isMobileDevice", _mobile.default.isMobileDevice);
      (0, _resolver.setResolverOption)("mobileView", _mobile.default.mobileView);
    }
  };
  _exports.default = _default;
});
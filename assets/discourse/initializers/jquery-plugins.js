define("discourse/initializers/jquery-plugins", ["exports", "discourse/lib/autocomplete", "bootbox", "discourse-common/lib/get-owner", "discourse-common/lib/deprecated"], function (_exports, _autocomplete, _bootbox, _getOwner, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/autocomplete",0,"bootbox",0,"discourse-common/lib/get-owner",0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  let jqueryPluginsConfigured = false;
  var _default = {
    name: "jquery-plugins",
    initialize() {
      if (jqueryPluginsConfigured) {
        return;
      }

      // Settings for bootbox
      _bootbox.default.animate(false);
      _bootbox.default.backdrop(true);

      // Monkey-patching simple alerts
      const originalAlert = _bootbox.default.alert;
      _bootbox.default.alert = function () {
        if (arguments.length === 1) {
          const dialog = (0, _getOwner.getOwner)(this).lookup("service:dialog");
          if (dialog) {
            (0, _deprecated.default)("`bootbox.alert` is deprecated, please use the dialog service instead.", {
              id: "discourse.bootbox",
              dropFrom: "3.1.0.beta5",
              url: "https://meta.discourse.org/t/244902"
            });
            return dialog.alert(arguments[0]);
          }
        }
        return originalAlert(...arguments);
      };

      // adding deprecation notice for all other dialogs
      const originalDialog = _bootbox.default.dialog;
      _bootbox.default.dialog = function () {
        (0, _deprecated.default)("`bootbox` is now deprecated, please use the dialog service instead.", {
          id: "discourse.bootbox",
          dropFrom: "3.1.0.beta5",
          url: "https://meta.discourse.org/t/244902"
        });
        return originalDialog(...arguments);
      };

      // Initialize the autocomplete tool
      $.fn.autocomplete = _autocomplete.default;
      jqueryPluginsConfigured = true;
    }
  };
  _exports.default = _default;
});
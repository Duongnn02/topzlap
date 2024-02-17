define("discourse/lib/export-result", ["exports", "I18n", "discourse-common/lib/get-owner"], function (_exports, _I18n, _getOwner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.outputExportResult = outputExportResult;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse-common/lib/get-owner"eaimeta@70e063a35619d71f
  function outputExportResult(result) {
    const dialog = (0, _getOwner.getOwner)(this).lookup("service:dialog");
    if (result.success) {
      dialog.alert(_I18n.default.t("admin.export_csv.success"));
    } else {
      dialog.alert(_I18n.default.t("admin.export_csv.failed"));
    }
  }
});
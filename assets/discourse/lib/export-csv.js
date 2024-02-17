define("discourse/lib/export-csv", ["exports", "I18n", "discourse/lib/ajax", "discourse/lib/ajax-error", "discourse-common/lib/get-owner"], function (_exports, _I18n, _ajax, _ajaxError, _getOwner) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.exportEntity = exportEntity;
  _exports.exportUserArchive = exportUserArchive;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/ajax",0,"discourse/lib/ajax-error",0,"discourse-common/lib/get-owner"eaimeta@70e063a35619d71f
  function exportEntityByType(type, entity, args) {
    return (0, _ajax.ajax)("/export_csv/export_entity.json", {
      type: "POST",
      data: {
        entity,
        args
      }
    });
  }
  function exportUserArchive() {
    const dialog = (0, _getOwner.getOwner)(this).lookup("service:dialog");
    return exportEntityByType("user", "user_archive").then(function () {
      dialog.alert(_I18n.default.t("user.download_archive.success"));
    }).catch(_ajaxError.popupAjaxError);
  }
  function exportEntity(entity, args) {
    return exportEntityByType("admin", entity, args);
  }
});
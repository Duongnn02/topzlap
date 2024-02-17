define("discourse/components/tags-admin-dropdown", ["exports", "select-kit/components/dropdown-select-box", "I18n", "@ember/object"], function (_exports, _dropdownSelectBox, _I18n, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/dropdown-select-box",0,"I18n",0,"@ember/object"eaimeta@70e063a35619d71f
  var _default = _dropdownSelectBox.default.extend({
    pluginApiIdentifiers: ["tags-admin-dropdown"],
    classNames: ["tags-admin-dropdown"],
    actionsMapping: null,
    selectKitOptions: {
      icons: ["wrench", "caret-down"],
      showFullTitle: false
    },
    content: (0, _object.computed)(function () {
      return [{
        id: "manageGroups",
        name: _I18n.default.t("tagging.manage_groups"),
        description: _I18n.default.t("tagging.manage_groups_description"),
        icon: "tags"
      }, {
        id: "uploadTags",
        name: _I18n.default.t("tagging.upload"),
        description: _I18n.default.t("tagging.upload_description"),
        icon: "upload"
      }, {
        id: "deleteUnusedTags",
        name: _I18n.default.t("tagging.delete_unused"),
        description: _I18n.default.t("tagging.delete_unused_description"),
        icon: "trash-alt"
      }];
    }),
    actions: {
      onChange(id) {
        const action = this.actionsMapping[id];
        if (action) {
          action();
        }
      }
    }
  });
  _exports.default = _default;
});
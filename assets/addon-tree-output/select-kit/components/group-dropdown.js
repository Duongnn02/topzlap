define("select-kit/components/group-dropdown", ["exports", "@ember/object/computed", "select-kit/components/combo-box", "discourse/lib/url", "I18n", "@ember/object", "discourse/lib/computed"], function (_exports, _computed, _comboBox, _url, _I18n, _object, _computed2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/computed",0,"select-kit/components/combo-box",0,"discourse/lib/url",0,"I18n",0,"@ember/object",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  var _default = _comboBox.default.extend({
    pluginApiIdentifiers: ["group-dropdown"],
    classNames: ["group-dropdown"],
    content: (0, _computed.reads)("groupsWithShortcut"),
    valueProperty: null,
    nameProperty: null,
    hasManyGroups: (0, _computed.gte)("content.length", 10),
    enableGroupDirectory: (0, _computed2.setting)("enable_group_directory"),
    selectKitOptions: {
      caretDownIcon: "caret-right",
      caretUpIcon: "caret-down",
      filterable: "hasManyGroups"
    },
    groupsWithShortcut: (0, _object.computed)("groups.[]", function () {
      const shortcuts = [];
      if (this.enableGroupDirectory || this.get("currentUser.staff")) {
        shortcuts.push(_I18n.default.t("groups.index.all"));
      }
      return shortcuts.concat(this.groups);
    }),
    actions: {
      onChange(groupName) {
        if ((this.groups || []).includes(groupName)) {
          _url.default.routeToUrl(`/g/${groupName}`);
        } else {
          _url.default.routeToUrl(`/g`);
        }
      }
    }
  });
  _exports.default = _default;
});
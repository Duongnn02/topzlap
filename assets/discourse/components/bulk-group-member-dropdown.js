define("discourse/components/bulk-group-member-dropdown", ["exports", "select-kit/components/dropdown-select-box", "I18n", "@ember/object"], function (_exports, _dropdownSelectBox, _I18n, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/dropdown-select-box",0,"I18n",0,"@ember/object"eaimeta@70e063a35619d71f
  var _default = _dropdownSelectBox.default.extend({
    pluginApiIdentifiers: ["bulk-group-member-dropdown"],
    classNames: ["bulk-group-member-dropdown"],
    selectKitOptions: {
      icon: "cog",
      showFullTitle: false
    },
    content: (0, _object.computed)("bulkSelection.[]", function () {
      const items = [];
      items.push({
        id: "removeMembers",
        name: _I18n.default.t("groups.members.remove_members"),
        description: _I18n.default.t("groups.members.remove_members_description"),
        icon: "user-times"
      });
      if (this.bulkSelection.some(m => !m.owner)) {
        items.push({
          id: "makeOwners",
          name: _I18n.default.t("groups.members.make_owners"),
          description: _I18n.default.t("groups.members.make_owners_description"),
          icon: "shield-alt"
        });
      }
      if (this.bulkSelection.some(m => m.owner)) {
        items.push({
          id: "removeOwners",
          name: _I18n.default.t("groups.members.remove_owners"),
          description: _I18n.default.t("groups.members.remove_owners_description"),
          icon: "shield-alt"
        });
      }
      if (this.currentUser.staff) {
        if (this.bulkSelection.some(m => !m.primary)) {
          items.push({
            id: "setPrimary",
            name: _I18n.default.t("groups.members.make_all_primary"),
            description: _I18n.default.t("groups.members.make_all_primary_description"),
            icon: "id-card"
          });
        }
        if (this.bulkSelection.some(m => m.primary)) {
          items.push({
            id: "unsetPrimary",
            name: _I18n.default.t("groups.members.remove_all_primary"),
            description: _I18n.default.t("groups.members.remove_all_primary_description"),
            icon: "id-card"
          });
        }
      }
      return items;
    })
  });
  _exports.default = _default;
});
define("discourse/components/group-member-dropdown", ["exports", "select-kit/components/dropdown-select-box", "I18n", "@ember/object"], function (_exports, _dropdownSelectBox, _I18n, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/dropdown-select-box",0,"I18n",0,"@ember/object"eaimeta@70e063a35619d71f
  var _default = _dropdownSelectBox.default.extend({
    pluginApiIdentifiers: ["group-member-dropdown"],
    classNames: ["group-member-dropdown"],
    selectKitOptions: {
      icon: "wrench",
      showFullTitle: false
    },
    content: (0, _object.computed)("member.owner", "member.primary", function () {
      const items = [{
        id: "removeMember",
        name: _I18n.default.t("groups.members.remove_member"),
        description: _I18n.default.t("groups.members.remove_member_description", {
          username: this.get("member.username")
        }),
        icon: "user-times"
      }];
      if (this.canAdminGroup) {
        if (this.member.owner) {
          items.push({
            id: "removeOwner",
            name: _I18n.default.t("groups.members.remove_owner"),
            description: _I18n.default.t("groups.members.remove_owner_description", {
              username: this.get("member.username")
            }),
            icon: "shield-alt"
          });
        } else {
          items.push({
            id: "makeOwner",
            name: _I18n.default.t("groups.members.make_owner"),
            description: _I18n.default.t("groups.members.make_owner_description", {
              username: this.get("member.username")
            }),
            icon: "shield-alt"
          });
        }
      } else if (this.canEditGroup && !this.member.owner) {
        items.push({
          id: "makeOwner",
          name: _I18n.default.t("groups.members.make_owner"),
          description: _I18n.default.t("groups.members.make_owner_description", {
            username: this.get("member.username")
          }),
          icon: "shield-alt"
        });
      }
      if (this.currentUser.staff) {
        if (this.member.primary) {
          items.push({
            id: "removePrimary",
            name: _I18n.default.t("groups.members.remove_primary"),
            description: _I18n.default.t("groups.members.remove_primary_description", {
              username: this.get("member.username")
            }),
            icon: "id-card"
          });
        } else {
          items.push({
            id: "makePrimary",
            name: _I18n.default.t("groups.members.make_primary"),
            description: _I18n.default.t("groups.members.make_primary_description", {
              username: this.get("member.username")
            }),
            icon: "id-card"
          });
        }
      }
      return items;
    })
  });
  _exports.default = _default;
});
define("discourse/plugins/discourse-assign/discourse-assign/connectors/groups-interaction-custom-options/assignable-interaction-fields", ["exports", "I18n", "@ember/object/computed", "@ember/object"], function (_exports, _I18n, _computed, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"@ember/object/computed",0,"@ember/object"eaimeta@70e063a35619d71f
  var _default = {
    name: "assignable-interaction-fields",
    setupComponent(args, component) {
      this.assignableLevelOptions = [{
        name: _I18n.default.t("groups.alias_levels.nobody"),
        value: 0
      }, {
        name: _I18n.default.t("groups.alias_levels.only_admins"),
        value: 1
      }, {
        name: _I18n.default.t("groups.alias_levels.mods_and_admins"),
        value: 2
      }, {
        name: _I18n.default.t("groups.alias_levels.members_mods_and_admins"),
        value: 3
      }, {
        name: _I18n.default.t("groups.alias_levels.owners_mods_and_admins"),
        value: 4
      }, {
        name: _I18n.default.t("groups.alias_levels.everyone"),
        value: 99
      }];
      (0, _object.defineProperty)(component, "assignableLevel", (0, _computed.or)("model.assignable_level", "assignableLevelOptions.firstObject.value"));
    }
  };
  _exports.default = _default;
});
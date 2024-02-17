define("select-kit/components/list-setting", ["exports", "select-kit/components/select-kit", "select-kit/components/multi-select", "@ember/object", "discourse-common/lib/helpers", "@ember/object/computed"], function (_exports, _selectKit, _multiSelect, _object, _helpers, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/select-kit",0,"select-kit/components/multi-select",0,"@ember/object",0,"discourse-common/lib/helpers",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  var _default = _multiSelect.default.extend({
    pluginApiIdentifiers: ["list-setting"],
    classNames: ["list-setting"],
    choices: null,
    nameProperty: null,
    valueProperty: null,
    content: (0, _computed.readOnly)("choices"),
    selectKitOptions: {
      filterable: true,
      selectedChoiceComponent: "selectedChoiceComponent"
    },
    modifyComponentForRow(collection) {
      if (collection === _selectKit.MAIN_COLLECTION && this.settingName?.includes("color")) {
        return "create-color-row";
      }
    },
    selectedChoiceComponent: (0, _object.computed)("settingName", function () {
      if (this.settingName?.includes("color")) {
        return "selected-choice-color";
      } else {
        return "selected-choice";
      }
    }),
    deselect(value) {
      this.onChangeChoices && this.onChangeChoices([...new Set([value, ...(0, _helpers.makeArray)(this.choices)])]);
      this._super(...arguments);
    }
  });
  _exports.default = _default;
});
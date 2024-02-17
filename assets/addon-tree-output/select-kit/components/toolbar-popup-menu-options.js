define("select-kit/components/toolbar-popup-menu-options", ["exports", "select-kit/components/dropdown-select-box", "I18n"], function (_exports, _dropdownSelectBox, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/dropdown-select-box",0,"I18n"eaimeta@70e063a35619d71f
  var _default = _dropdownSelectBox.default.extend({
    pluginApiIdentifiers: ["toolbar-popup-menu-options"],
    classNames: ["toolbar-popup-menu-options"],
    selectKitOptions: {
      showFullTitle: false,
      filterable: false,
      autoFilterable: false,
      preventHeaderFocus: true,
      customStyle: true
    },
    modifyContent(contents) {
      return contents.map(content => {
        if (content.condition) {
          return {
            icon: content.icon,
            name: _I18n.default.t(content.label),
            id: content.action
          };
        }
      }).filter(Boolean);
    }
  });
  _exports.default = _default;
});
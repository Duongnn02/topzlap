define("select-kit/components/color-palettes/color-palettes-row", ["exports", "select-kit/components/select-kit/select-kit-row", "@ember/object", "select-kit/templates/components/color-palettes/color-palettes-row", "@ember/template"], function (_exports, _selectKitRow, _object, _colorPalettesRow, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/select-kit/select-kit-row",0,"@ember/object",0,"select-kit/templates/components/color-palettes/color-palettes-row",0,"@ember/template"eaimeta@70e063a35619d71f
  var _default = _selectKitRow.default.extend({
    classNames: ["color-palettes-row"],
    layout: _colorPalettesRow.default,
    palettes: (0, _object.computed)("item.colors.[]", function () {
      return (0, _template.htmlSafe)((this.item.colors || []).filter(color => color.name !== "secondary").map(color => `#${escape(color.hex)}`).map(hex => `<span class="palette" style="background-color:${hex}"></span>`).join(""));
    }),
    backgroundColor: (0, _object.computed)("item.colors.[]", function () {
      const secondary = (this.item.colors || []).findBy("name", "secondary");
      if (secondary && secondary.hex) {
        return (0, _template.htmlSafe)(`background-color:#${escape(secondary.hex)}`);
      } else {
        return "";
      }
    })
  });
  _exports.default = _default;
});
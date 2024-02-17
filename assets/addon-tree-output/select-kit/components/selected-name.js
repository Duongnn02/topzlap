define("select-kit/components/selected-name", ["exports", "@ember/object/internals", "@ember/object", "@ember/component", "select-kit/mixins/utils", "select-kit/templates/components/selected-name", "discourse-common/lib/helpers", "@ember/object/computed"], function (_exports, _internals, _object, _component, _utils, _selectedName, _helpers, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/internals",0,"@ember/object",0,"@ember/component",0,"select-kit/mixins/utils",0,"select-kit/templates/components/selected-name",0,"discourse-common/lib/helpers",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  var _default = _component.default.extend(_utils.default, {
    tagName: "",
    layout: _selectedName.default,
    name: null,
    value: null,
    headerTitle: null,
    headerLang: null,
    headerLabel: null,
    id: null,
    init() {
      this._super(...arguments);
      this.set("id", (0, _internals.guidFor)(this));
    },
    didReceiveAttrs() {
      this._super(...arguments);

      // we can't listen on `item.nameProperty` given it's variable
      this.setProperties({
        headerLabel: this.getProperty(this.item, "labelProperty"),
        headerTitle: this.getProperty(this.item, "titleProperty"),
        headerLang: this.getProperty(this.item, "langProperty"),
        name: this.getName(this.item),
        value: this.item === this.selectKit.noneItem ? null : this.getValue(this.item)
      });
    },
    lang: (0, _computed.reads)("headerLang"),
    ariaLabel: (0, _object.computed)("item", "sanitizedTitle", function () {
      return this._safeProperty("ariaLabel", this.item) || this.sanitizedTitle;
    }),
    // this might need a more advanced solution
    // but atm it's the only case we have to handle
    sanitizedTitle: (0, _object.computed)("title", function () {
      return String(this.title).replace("&hellip;", "");
    }),
    title: (0, _object.computed)("headerTitle", "item", function () {
      return this.headerTitle || this._safeProperty("title", this.item) || this.name || "";
    }),
    label: (0, _object.computed)("headerLabel", "title", "name", function () {
      return this.headerLabel || this._safeProperty("label", this.item) || this.title || this.name;
    }),
    icons: (0, _object.computed)("item.{icon,icons}", function () {
      const icon = (0, _helpers.makeArray)(this._safeProperty("icon", this.item));
      const icons = (0, _helpers.makeArray)(this._safeProperty("icons", this.item));
      return icon.concat(icons).filter(Boolean);
    }),
    _safeProperty(name, content) {
      if (!content) {
        return null;
      }
      return (0, _object.get)(content, name);
    }
  });
  _exports.default = _default;
});
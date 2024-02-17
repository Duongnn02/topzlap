define("select-kit/components/icon-picker", ["exports", "discourse-common/lib/icon-library", "select-kit/components/multi-select", "@ember/object", "discourse-common/config/environment", "discourse-common/lib/helpers", "discourse/lib/ajax"], function (_exports, _iconLibrary, _multiSelect, _object, _environment, _helpers, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/icon-library",0,"select-kit/components/multi-select",0,"@ember/object",0,"discourse-common/config/environment",0,"discourse-common/lib/helpers",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  var _default = _multiSelect.default.extend({
    pluginApiIdentifiers: ["icon-picker"],
    classNames: ["icon-picker"],
    init() {
      this._super(...arguments);
      this._cachedIconsList = null;
      if ((0, _environment.isDevelopment)()) {
        (0, _iconLibrary.disableMissingIconWarning)();
      }
    },
    content: (0, _object.computed)("value.[]", function () {
      return (0, _helpers.makeArray)(this.value).map(this._processIcon);
    }),
    search() {
      let filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      if (filter === "" && this._cachedIconsList && this._cachedIconsList.length) {
        return this._cachedIconsList;
      } else {
        return (0, _ajax.ajax)("/svg-sprite/picker-search", {
          data: {
            filter,
            only_available: this.onlyAvailable
          }
        }).then(icons => {
          icons = icons.map(this._processIcon);
          if (filter === "") {
            this._cachedIconsList = icons;
          }
          return icons;
        });
      }
    },
    _processIcon(icon) {
      const iconName = typeof icon === "object" ? icon.id : icon,
        strippedIconName = (0, _iconLibrary.convertIconClass)(iconName);
      const spriteEl = "#svg-sprites",
        holder = "ajax-icon-holder";
      if (typeof icon === "object") {
        if ($(`${spriteEl} .${holder}`).length === 0) {
          $(spriteEl).append(`<div class="${holder}" style='display: none;'></div>`);
        }
        if (!$(`${spriteEl} symbol#${strippedIconName}`).length) {
          $(`${spriteEl} .${holder}`).append(`<svg xmlns='http://www.w3.org/2000/svg'>${icon.symbol}</svg>`);
        }
      }
      return {
        id: iconName,
        name: iconName,
        icon: strippedIconName
      };
    },
    willDestroyElement() {
      $("#svg-sprites .ajax-icon-holder").remove();
      this._super(...arguments);
      this._cachedIconsList = null;
      if ((0, _environment.isDevelopment)()) {
        (0, _iconLibrary.enableMissingIconWarning)();
      }
    },
    actions: {
      onChange(value, item) {
        if (this.selectKit.options.maximum === 1) {
          value = value.length ? value[0] : null;
          item = item.length ? item[0] : null;
        }
        this.attrs.onChange && this.attrs.onChange(value, item);
      }
    }
  });
  _exports.default = _default;
});
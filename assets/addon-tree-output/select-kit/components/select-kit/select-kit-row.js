define("select-kit/components/select-kit/select-kit-row", ["exports", "@ember/object", "@ember/component", "I18n", "select-kit/mixins/utils", "@ember/object/internals", "select-kit/templates/components/select-kit/select-kit-row", "discourse-common/lib/helpers", "@ember/object/computed", "@ember/string"], function (_exports, _object, _component, _I18n, _utils, _internals, _selectKitRow, _helpers, _computed, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/component",0,"I18n",0,"select-kit/mixins/utils",0,"@ember/object/internals",0,"select-kit/templates/components/select-kit/select-kit-row",0,"discourse-common/lib/helpers",0,"@ember/object/computed",0,"@ember/string"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend(_utils.default, (_obj = {
    layout: _selectKitRow.default,
    classNames: ["select-kit-row"],
    tagName: "li",
    tabIndex: 0,
    attributeBindings: ["tabIndex", "title", "rowValue:data-value", "rowName:data-name", "index:data-index", "role", "ariaChecked:aria-checked", "guid:data-guid", "rowLang:lang"],
    classNameBindings: ["isHighlighted", "isSelected", "isNone", "isNone:none", "item.classNames"],
    index: 0,
    role: "menuitemradio",
    didInsertElement() {
      this._super(...arguments);
      if (!this.site.mobileView) {
        this.element.addEventListener("mouseenter", this.handleMouseEnter);
        this.element.addEventListener("focus", this.handleMouseEnter);
        this.element.addEventListener("blur", this.handleBlur);
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      if (!this.site.mobileView) {
        this.element.removeEventListener("mouseenter", this.handleBlur);
        this.element.removeEventListener("focus", this.handleMouseEnter);
        this.element.removeEventListener("blur", this.handleMouseEnter);
      }
    },
    isNone: (0, _object.computed)("rowValue", function () {
      return this.rowValue === this.getValue(this.selectKit.noneItem);
    }),
    guid: (0, _object.computed)("item", function () {
      return (0, _internals.guidFor)(this.item);
    }),
    lang: (0, _computed.reads)("item.lang"),
    ariaChecked: (0, _object.computed)("isSelected", function () {
      return this.isSelected ? "true" : "false";
    }),
    title: (0, _object.computed)("rowTitle", "item.title", "rowName", function () {
      return this.rowTitle || this.getProperty(this.item, "title") || this.rowName;
    }),
    dasherizedTitle: (0, _object.computed)("title", function () {
      return (0, _string.dasherize)((this.title || "").replace(".", "-"));
    }),
    label: (0, _object.computed)("rowLabel", "item.label", "title", "rowName", function () {
      const label = this.rowLabel || this.getProperty(this.item, "label") || this.title || this.rowName;
      if (this.selectKit.options.allowAny && this.rowValue === this.selectKit.filter && this.getName(this.selectKit.noneItem) !== this.rowName && this.getName(this.selectKit.newItem) === this.rowName) {
        return _I18n.default.t("select_kit.create", {
          content: label
        });
      }
      return label;
    }),
    didReceiveAttrs() {
      this._super(...arguments);
      this.setProperties({
        rowName: this.getName(this.item),
        rowValue: this.getValue(this.item),
        rowLabel: this.getProperty(this.item, "labelProperty"),
        rowTitle: this.getProperty(this.item, "titleProperty"),
        rowLang: this.getProperty(this.item, "langProperty")
      });
    },
    icons: (0, _object.computed)("item.{icon,icons}", function () {
      const icon = (0, _helpers.makeArray)(this.getProperty(this.item, "icon"));
      const icons = (0, _helpers.makeArray)(this.getProperty(this.item, "icons"));
      return icon.concat(icons).filter(Boolean);
    }),
    highlightedValue: (0, _object.computed)("selectKit.highlighted", function () {
      return this.getValue(this.selectKit.highlighted);
    }),
    isHighlighted: (0, _object.computed)("rowValue", "highlightedValue", function () {
      return this.rowValue === this.highlightedValue;
    }),
    isSelected: (0, _object.computed)("rowValue", "value", function () {
      return this.rowValue === this.value;
    }),
    handleMouseEnter() {
      if (!this.isDestroying || !this.isDestroyed) {
        this.selectKit.onHover(this.rowValue, this.item);
      }
      return false;
    },
    handleBlur(event) {
      if ((!this.isDestroying || !this.isDestroyed) && event.target && this.selectKit.mainElement()) {
        if (!this.selectKit.mainElement().contains(event.target)) {
          this.selectKit.close(event);
        }
      }
      return false;
    },
    click(event) {
      event.preventDefault();
      event.stopPropagation();
      this.selectKit.select(this.rowValue, this.item);
      return false;
    },
    mouseDown(event) {
      if (this.selectKit.options.preventHeaderFocus) {
        event.preventDefault();
      }
    },
    focusIn(event) {
      event.stopImmediatePropagation();
    },
    keyDown(event) {
      if (this.selectKit.isExpanded) {
        if (event.key === "Backspace") {
          if (this.selectKit.isFilterExpanded) {
            this.selectKit.set("filter", this.selectKit.filter.slice(0, -1));
            this.selectKit.triggerSearch();
            this.selectKit.focusFilter();
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
        } else if (event.key === "ArrowUp") {
          this.selectKit.highlightPrevious();
          return false;
        } else if (event.key === "ArrowDown") {
          this.selectKit.highlightNext();
          return false;
        } else if (event.key === "Enter") {
          event.stopImmediatePropagation();
          this.selectKit.select(this.getValue(this.selectKit.highlighted), this.selectKit.highlighted);
          return false;
        } else if (event.key === "Escape") {
          this.selectKit.close(event);
          this.selectKit.headerElement().focus();
        } else {
          if (this.isValidInput(event.key)) {
            this.selectKit.set("filter", event.key);
            this.selectKit.triggerSearch();
            this.selectKit.focusFilter();
            event.preventDefault();
            event.stopPropagation();
          }
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "handleMouseEnter", [_object.action], Object.getOwnPropertyDescriptor(_obj, "handleMouseEnter"), _obj), _applyDecoratedDescriptor(_obj, "handleBlur", [_object.action], Object.getOwnPropertyDescriptor(_obj, "handleBlur"), _obj)), _obj));
  _exports.default = _default;
});
define("select-kit/components/select-kit/select-kit-header", ["exports", "@ember/component", "select-kit/mixins/utils", "@ember/object", "discourse-common/lib/helpers"], function (_exports, _component, _utils, _object, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"select-kit/mixins/utils",0,"@ember/object",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  var _default = _component.default.extend(_utils.default, {
    classNames: ["select-kit-header"],
    classNameBindings: ["isFocused"],
    attributeBindings: ["role", "tabindex", "selectedValue:data-value", "selectedNames:data-name", "buttonTitle:title", "selectKit.options.autofocus:autofocus"],
    selectKit: null,
    role: "listbox",
    tabindex: 0,
    selectedValue: (0, _object.computed)("value", function () {
      return this.value === this.getValue(this.selectKit.noneItem) ? null : (0, _helpers.makeArray)(this.value).join(",");
    }),
    selectedNames: (0, _object.computed)("selectedContent.[]", function () {
      return (0, _helpers.makeArray)(this.selectedContent).map(s => this.getName(s)).join(",");
    }),
    buttonTitle: (0, _object.computed)("value", "selectKit.noneItem", function () {
      if (!this.value && this.selectKit.noneItem && !this.selectKit.options.showFullTitle) {
        return this.selectKit.noneItem.title || this.selectKit.noneItem.name;
      }
    }),
    icons: (0, _object.computed)("selectKit.options.{icon,icons}", function () {
      const icon = (0, _helpers.makeArray)(this.selectKit.options.icon);
      const icons = (0, _helpers.makeArray)(this.selectKit.options.icons);
      return icon.concat(icons).filter(Boolean);
    }),
    didInsertElement() {
      this._super(...arguments);
      if (this.selectKit.options.autofocus) {
        this.set("isFocused", true);
      }
    },
    mouseDown() {
      return false;
    },
    click(event) {
      event.preventDefault();
      event.stopPropagation();
      this.selectKit.toggle(event);
    },
    keyUp(event) {
      if (event.key === " ") {
        event.preventDefault();
      }
    },
    keyDown(event) {
      if (this.selectKit.isDisabled || this.selectKit.options.disabled) {
        return;
      }
      if (!this.selectKit.onKeydown(event)) {
        return false;
      }
      const onlyShiftKey = event.shiftKey && event.key === "Shift";
      if (event.metaKey || onlyShiftKey) {
        return;
      }
      if (event.key === "Enter") {
        event.stopPropagation();
        if (this.selectKit.isExpanded) {
          if (this.selectKit.highlighted) {
            this.selectKit.select(this.getValue(this.selectKit.highlighted), this.selectKit.highlighted);
            return false;
          }
        } else {
          this.selectKit.close(event);
        }
      } else if (event.key === "ArrowUp") {
        event.stopPropagation();
        if (this.selectKit.isExpanded) {
          this.selectKit.highlightPrevious();
        } else {
          this.selectKit.open(event);
        }
        return false;
      } else if (event.key === "ArrowDown") {
        event.stopPropagation();
        if (this.selectKit.isExpanded) {
          this.selectKit.highlightNext();
        } else {
          this.selectKit.open(event);
        }
        return false;
      } else if (event.key === " ") {
        event.stopPropagation();
        event.preventDefault(); // prevents the space to trigger a scroll page-next
        this.selectKit.open(event);
      } else if (event.key === "Escape") {
        event.stopPropagation();
        if (this.selectKit.isExpanded) {
          this.selectKit.close(event);
        } else {
          this.element.blur();
        }
      } else if (event.key === "Tab") {
        return true;
      } else if (event.key === "Backspace") {
        this._focusFilterInput();
      } else if (this.selectKit.options.filterable || this.selectKit.options.autoFilterable || this.selectKit.options.allowAny) {
        if (this.selectKit.isExpanded) {
          this._focusFilterInput();
        } else {
          if (this.isValidInput(event.key)) {
            this.selectKit.set("filter", event.key);
            this.selectKit.open(event);
            event.preventDefault();
            event.stopPropagation();
          }
        }
      } else {
        if (this.selectKit.isExpanded) {
          return false;
        } else {
          return true;
        }
      }
    },
    _focusFilterInput() {
      const filterContainer = document.querySelector(`#${this.selectKit.uniqueID}-filter`);
      if (filterContainer) {
        filterContainer.style.display = "flex";
        const filterInput = filterContainer.querySelector(".filter-input");
        filterInput && filterInput.focus();
      }
    }
  });
  _exports.default = _default;
});
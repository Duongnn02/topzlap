define("select-kit/components/multi-select", ["exports", "select-kit/components/select-kit", "@ember/object", "@ember/utils", "@ember/runloop", "select-kit/templates/components/multi-select", "discourse-common/lib/helpers"], function (_exports, _selectKit, _object, _utils, _runloop, _multiSelect, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"select-kit/components/select-kit",0,"@ember/object",0,"@ember/utils",0,"@ember/runloop",0,"select-kit/templates/components/multi-select",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  var _default = _selectKit.default.extend({
    pluginApiIdentifiers: ["multi-select"],
    layout: _multiSelect.default,
    classNames: ["multi-select"],
    multiSelect: true,
    selectKitOptions: {
      none: "select_kit.default_header_text",
      clearable: true,
      filterable: true,
      filterIcon: null,
      closeOnChange: false,
      autoInsertNoneItem: false,
      headerComponent: "multi-select/multi-select-header",
      filterComponent: "multi-select/multi-select-filter",
      autoFilterable: true,
      caretDownIcon: "caretIcon",
      caretUpIcon: "caretIcon"
    },
    caretIcon: (0, _object.computed)("value.[]", function () {
      const maximum = this.selectKit.options.maximum;
      return maximum && (0, _helpers.makeArray)(this.value).length >= parseInt(maximum, 10) ? null : "plus";
    }),
    search(filter) {
      return this._super(filter).filter(content => !(0, _helpers.makeArray)(this.selectedContent).includes(content));
    },
    append(values) {
      const existingItems = values.map(value => {
        const defaultItem = this.defaultItem(value, value);
        const existingItem = this.findValue(this.mainCollection, defaultItem) || this.findName(this.mainCollection, defaultItem);
        if (!existingItem) {
          if (this.validateCreate(value, this.content)) {
            return value;
          }
        } else if (this.validateSelect(existingItem)) {
          return this.getValue(existingItem);
        }
      }).filter(Boolean);
      const newValues = (0, _helpers.makeArray)(this.value).concat(existingItems);
      const newContent = (0, _helpers.makeArray)(this.selectedContent).concat((0, _helpers.makeArray)(existingItems));
      this.selectKit.change(newValues, newContent);
    },
    deselect(item) {
      this.clearErrors();
      const newContent = this.selectedContent.filter(content => this.getValue(item) !== this.getValue(content));
      this.selectKit.change(this.valueProperty ? newContent.mapBy(this.valueProperty) : newContent, newContent);
    },
    select(value, item) {
      if (this.selectKit.hasSelection && this.selectKit.options.maximum === 1) {
        this.selectKit.deselectByValue(this.getValue(this.selectedContent.firstObject));
        (0, _runloop.next)(() => {
          this.selectKit.select(value, item);
        });
        return;
      }
      if (!(0, _utils.isPresent)(value)) {
        if (!this.validateSelect(this.selectKit.highlighted)) {
          return;
        }
        this.selectKit.change((0, _helpers.makeArray)(this.value).concat((0, _helpers.makeArray)(this.getValue(this.selectKit.highlighted))), (0, _helpers.makeArray)(this.selectedContent).concat((0, _helpers.makeArray)(this.selectKit.highlighted)));
      } else {
        const existingItem = this.findValue(this.mainCollection, this.selectKit.valueProperty ? item : value);
        if (existingItem) {
          if (!this.validateSelect(item)) {
            return;
          }
        }
        const newValues = (0, _helpers.makeArray)(this.value).concat((0, _helpers.makeArray)(value));
        const newContent = (0, _helpers.makeArray)(this.selectedContent).concat((0, _helpers.makeArray)(item));
        this.selectKit.change([...new Set(newValues)], newContent.length ? newContent : (0, _helpers.makeArray)(this.defaultItem(value, value)));
      }
    },
    selectedContent: (0, _object.computed)("value.[]", "content.[]", "selectKit.noneItem", function () {
      const value = (0, _helpers.makeArray)(this.value).map(v => this.selectKit.options.castInteger && this._isNumeric(v) ? Number(v) : v);
      if (value.length) {
        let content = [];
        value.forEach(v => {
          if (this.selectKit.valueProperty) {
            const c = (0, _helpers.makeArray)(this.content).findBy(this.selectKit.valueProperty, v);
            if (c) {
              content.push(c);
            }
          } else {
            if ((0, _helpers.makeArray)(this.content).includes(v)) {
              content.push(v);
            }
          }
        });
        return this.selectKit.modifySelection(content);
      }
      return null;
    }),
    _onKeydown(event) {
      if (event.code === "Enter" && event.target.classList.contains("selected-name")) {
        event.stopPropagation();
        this.selectKit.deselectByValue(event.target.dataset.value);
        return false;
      }
      if (event.code === "Backspace") {
        event.stopPropagation();
        const input = this.getFilterInput();
        if (input && input.value.length === 0) {
          const selected = this.element.querySelectorAll(".select-kit-header .choice.select-kit-selected-name");
          if (selected.length) {
            const lastSelected = selected[selected.length - 1];
            if (lastSelected) {
              if (lastSelected === document.activeElement) {
                this.deselect(this.selectedContent.lastObject);
              } else {
                lastSelected.focus();
              }
            }
          }
        }
      }
      return true;
    }
  });
  _exports.default = _default;
});
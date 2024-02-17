define("discourse/controllers/edit-user-directory-columns", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "discourse/lib/ajax", "@ember/object", "discourse/lib/ajax-error", "discourse/helpers/page-reloader"], function (_exports, _controller, _modalFunctionality, _ajax, _object, _ajaxError, _pageReloader) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"discourse/lib/ajax",0,"@ember/object",0,"discourse/lib/ajax-error",0,"discourse/helpers/page-reloader"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const UP = "up";
  const DOWN = "down";
  var _default = _controller.default.extend(_modalFunctionality.default, (_obj = {
    loading: true,
    columns: null,
    labelKey: null,
    onShow() {
      (0, _ajax.ajax)("edit-directory-columns.json").then(response => {
        this.setProperties({
          loading: false,
          columns: response.directory_columns.sort((a, b) => a.position > b.position ? 1 : -1).map(c => _object.default.create(c))
        });
      }).catch(_ajaxError.popupAjaxError);
    },
    save() {
      this.set("loading", true);
      const data = {
        directory_columns: this.columns.map(c => c.getProperties("id", "enabled", "position"))
      };
      (0, _ajax.ajax)("edit-directory-columns.json", {
        type: "PUT",
        data
      }).then(() => {
        (0, _pageReloader.reload)();
      }).catch(e => {
        this.set("loading", false);
        this.flash((0, _ajaxError.extractError)(e), "error");
      });
    },
    resetToDefault() {
      let resetColumns = this.columns;
      resetColumns.sort((a, b) => {
        const a1 = a.automatic_position || (a.user_field?.position || 0) + 1000;
        const b1 = b.automatic_position || (b.user_field?.position || 0) + 1000;
        if (a1 === b1) {
          return a.name.localeCompare(b.name);
        } else {
          return a1 > b1 ? 1 : -1;
        }
      }).forEach((column, index) => {
        column.setProperties({
          position: column.automatic_position || index + 1,
          enabled: column.type === "automatic"
        });
      });
      this.set("columns", resetColumns);
      this.notifyPropertyChange("columns");
    },
    moveUp(column) {
      this._moveColumn(UP, column);
    },
    moveDown(column) {
      this._moveColumn(DOWN, column);
    },
    _moveColumn(direction, column) {
      if (direction === UP && column.position === 1 || direction === DOWN && column.position === this.columns.length) {
        return;
      }
      const positionOnClick = column.position;
      const newPosition = direction === UP ? positionOnClick - 1 : positionOnClick + 1;
      const previousColumn = this.columns.find(c => c.position === newPosition);
      column.set("position", newPosition);
      previousColumn.set("position", positionOnClick);
      this.set("columns", this.columns.sort((a, b) => a.position > b.position ? 1 : -1));
      this.notifyPropertyChange("columns");
    }
  }, (_applyDecoratedDescriptor(_obj, "save", [_object.action], Object.getOwnPropertyDescriptor(_obj, "save"), _obj), _applyDecoratedDescriptor(_obj, "resetToDefault", [_object.action], Object.getOwnPropertyDescriptor(_obj, "resetToDefault"), _obj), _applyDecoratedDescriptor(_obj, "moveUp", [_object.action], Object.getOwnPropertyDescriptor(_obj, "moveUp"), _obj), _applyDecoratedDescriptor(_obj, "moveDown", [_object.action], Object.getOwnPropertyDescriptor(_obj, "moveDown"), _obj)), _obj));
  _exports.default = _default;
});
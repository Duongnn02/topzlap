define("discourse/controllers/user-status", ["exports", "@ember/controller", "discourse/mixins/modal-functionality", "@ember/object", "discourse/lib/ajax-error", "discourse-common/utils/decorators", "@discourse/itsatrap", "discourse/lib/time-shortcut"], function (_exports, _controller, _modalFunctionality, _object, _ajaxError, _decorators, _itsatrap, _timeShortcut) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/mixins/modal-functionality",0,"@ember/object",0,"discourse/lib/ajax-error",0,"discourse-common/utils/decorators",0,"@discourse/itsatrap",0,"discourse/lib/time-shortcut"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("status.emoji", "status.description"), (_obj = {
    showDeleteButton: false,
    prefilledDateTime: null,
    timeShortcuts: null,
    _itsatrap: null,
    onShow() {
      const currentStatus = {
        ...this.model.status
      };
      this.setProperties({
        status: currentStatus,
        hidePauseNotifications: this.model.hidePauseNotifications,
        pauseNotifications: this.model.pauseNotifications,
        showDeleteButton: !!this.model.status,
        timeShortcuts: this._buildTimeShortcuts(),
        prefilledDateTime: currentStatus?.ends_at
      });
      this.set("_itsatrap", new _itsatrap.default());
    },
    onClose() {
      this._itsatrap.destroy();
      this.set("_itsatrap", null);
      this.set("timeShortcuts", null);
    },
    statusIsSet(emoji, description) {
      return !!emoji && !!description;
    },
    customTimeShortcutLabels() {
      const labels = {};
      labels[_timeShortcut.TIME_SHORTCUT_TYPES.NONE] = "time_shortcut.never";
      return labels;
    },
    hiddenTimeShortcutOptions() {
      return [_timeShortcut.TIME_SHORTCUT_TYPES.LAST_CUSTOM];
    },
    delete() {
      Promise.resolve(this.model.deleteAction()).then(() => this.send("closeModal")).catch(e => this._handleError(e));
    },
    onTimeSelected(_, time) {
      this.set("status.endsAt", time);
    },
    saveAndClose() {
      const newStatus = {
        description: this.status.description,
        emoji: this.status.emoji,
        ends_at: this.status.endsAt?.toISOString()
      };
      Promise.resolve(this.model.saveAction(newStatus, this.pauseNotifications)).then(() => this.send("closeModal")).catch(e => this._handleError(e));
    },
    _handleError(e) {
      if (typeof e === "string") {
        this.dialog.alert(e);
      } else {
        (0, _ajaxError.popupAjaxError)(e);
      }
    },
    _buildTimeShortcuts() {
      const timezone = this.currentUser.user_option.timezone;
      const shortcuts = (0, _timeShortcut.timeShortcuts)(timezone);
      return [shortcuts.oneHour(), shortcuts.twoHours(), shortcuts.tomorrow()];
    }
  }, (_applyDecoratedDescriptor(_obj, "statusIsSet", [_dec], Object.getOwnPropertyDescriptor(_obj, "statusIsSet"), _obj), _applyDecoratedDescriptor(_obj, "customTimeShortcutLabels", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "customTimeShortcutLabels"), _obj), _applyDecoratedDescriptor(_obj, "hiddenTimeShortcutOptions", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "hiddenTimeShortcutOptions"), _obj), _applyDecoratedDescriptor(_obj, "delete", [_object.action], Object.getOwnPropertyDescriptor(_obj, "delete"), _obj), _applyDecoratedDescriptor(_obj, "onTimeSelected", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onTimeSelected"), _obj), _applyDecoratedDescriptor(_obj, "saveAndClose", [_object.action], Object.getOwnPropertyDescriptor(_obj, "saveAndClose"), _obj)), _obj)));
  _exports.default = _default;
});
define("discourse/mixins/rerender-on-do-not-disturb-change", ["exports", "@ember/runloop", "discourse-common/lib/later", "@ember/object/mixin", "discourse-common/config/environment"], function (_exports, _runloop, _later, _mixin, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"discourse-common/lib/later",0,"@ember/object/mixin",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  var _default = _mixin.default.create({
    _listenToDoNotDisturbLoop: null,
    listenForDoNotDisturbChanges() {
      if (this.currentUser && !this.currentUser.isInDoNotDisturb()) {
        this.queueRerender();
      } else {
        (0, _runloop.cancel)(this._listenToDoNotDisturbLoop);
        this._listenToDoNotDisturbLoop = (0, _later.default)(this, () => {
          this.listenForDoNotDisturbChanges();
        }, 10000);
      }
    },
    didInsertElement() {
      this._super(...arguments);
      this.appEvents.on("do-not-disturb:changed", () => this.queueRerender());
      if (!(0, _environment.isTesting)()) {
        this.listenForDoNotDisturbChanges();
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      (0, _runloop.cancel)(this._listenToDoNotDisturbLoop);
    }
  });
  _exports.default = _default;
});
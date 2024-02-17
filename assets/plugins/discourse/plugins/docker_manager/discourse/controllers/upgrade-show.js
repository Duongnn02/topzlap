define("discourse/plugins/docker_manager/discourse/controllers/upgrade-show", ["exports", "discourse/plugins/docker_manager/discourse/models/repo", "@ember/controller", "@ember/service", "@ember/object", "I18n", "discourse-common/lib/helpers"], function (_exports, _repo, _controller, _service, _object, _I18n, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"discourse/plugins/docker_manager/discourse/models/repo",0,"@ember/controller",0,"@ember/service",0,"@ember/object",0,"I18n",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let UpgradeShow = (_class = class UpgradeShow extends _controller.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "messageBus", _descriptor, this);
      _initializerDefineProperty(this, "dialog", _descriptor2, this);
      _initializerDefineProperty(this, "upgradeStore", _descriptor3, this);
    }
    get complete() {
      return this.upgradeStore.upgradeStatus === "complete";
    }
    get failed() {
      return this.upgradeStore.upgradeStatus === "failed";
    }
    get multiUpgrade() {
      return this.model.length > 1;
    }
    get title() {
      if (this.multiUpgrade) {
        return _I18n.default.t("admin.docker.upgrade_everything");
      } else {
        return _I18n.default.t("admin.docker.upgrade_repo", {
          name: this.model.name
        });
      }
    }
    get isUpToDate() {
      return (0, _helpers.makeArray)(this.model).every(repo => repo.upToDate);
    }
    get upgrading() {
      return (0, _helpers.makeArray)(this.model).some(repo => repo.upgrading);
    }
    start() {
      this.upgradeStore.reset();
      if (this.multiUpgrade) {
        for (const repo of this.model) {
          if (!repo.upToDate) {
            repo.upgrading = true;
          }
        }
        return _repo.default.upgradeAll();
      }
      if (this.model.upgrading) {
        return;
      }
      return this.model.startUpgrade();
    }
    resetUpgrade() {
      this.dialog.confirm({
        message: _I18n.default.t("admin.docker.reset_warning"),
        didConfirm: async () => {
          if (this.multiUpgrade) {
            try {
              await _repo.default.resetAll(this.model.filter(repo => !repo.upToDate));
            } finally {
              this.upgradeStore.reset();
              for (const repo of this.model) {
                repo.upgrading = false;
              }
              return;
            }
          }
          await this.model.resetUpgrade();
          this.upgradeStore.reset();
        }
      });
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "messageBus", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "dialog", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "upgradeStore", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "start", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "start"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "resetUpgrade", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "resetUpgrade"), _class.prototype)), _class);
  _exports.default = UpgradeShow;
});
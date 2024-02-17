define("discourse/plugins/docker_manager/discourse/routes/upgrade", ["exports", "@ember/routing/route", "discourse-common/utils/decorators", "@ember/service", "discourse/plugins/docker_manager/discourse/models/repo", "I18n"], function (_exports, _route, _decorators, _service, _repo, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"@ember/routing/route",0,"discourse-common/utils/decorators",0,"@ember/service",0,"discourse/plugins/docker_manager/discourse/models/repo",0,"I18n"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let Upgrade = (_class = class Upgrade extends _route.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "messageBus", _descriptor, this);
      _initializerDefineProperty(this, "upgradeStore", _descriptor2, this);
    }
    model() {
      return _repo.default.findAll();
    }
    activate() {
      this.messageBus.subscribe("/docker/upgrade", this.onUpgradeMessage);
    }
    deactivate() {
      this.messageBus.unsubscribe("/docker/upgrade", this.onUpgradeMessage);
    }
    setupController(controller, model) {
      const discourse = model.find(repo => repo.id === "discourse");
      if (discourse?.branch === "origin/main") {
        // Special case: If the branch is "main" warn user
        controller.appendBannerHtml(_I18n.default.t("admin.docker.main_branch_warning", {
          url: "https://meta.discourse.org/t/17014"
        }));
      }
    }
    onUpgradeMessage(msg) {
      switch (msg.type) {
        case "log":
          this.upgradeStore.consoleOutput = this.upgradeStore.consoleOutput + msg.value + "\n";
          break;
        case "percent":
          this.upgradeStore.progressPercentage = msg.value;
          break;
        case "status":
          this.upgradeStore.upgradeStatus = msg.value;
          // Get the resolved model
          const model = this.modelFor("upgrade");
          if (msg.value === "complete") {
            for (const repo of model) {
              if (repo.upgrading) {
                repo.version = repo.latest?.version;
              }
            }
            this.session.requiresRefresh = true;
          }
          if (msg.value === "complete" || msg.value === "failed") {
            for (const repo of model) {
              repo.upgrading = false;
            }
          }
          break;
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "messageBus", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "upgradeStore", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "onUpgradeMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "onUpgradeMessage"), _class.prototype)), _class);
  _exports.default = Upgrade;
});
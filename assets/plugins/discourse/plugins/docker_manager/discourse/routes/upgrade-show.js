define("discourse/plugins/docker_manager/discourse/routes/upgrade-show", ["exports", "discourse/plugins/docker_manager/discourse/models/repo", "@ember/routing/route", "@ember/service"], function (_exports, _repo2, _route, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"discourse/plugins/docker_manager/discourse/models/repo",0,"@ember/routing/route",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let UpgradeShow = (_class = class UpgradeShow extends _route.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "upgradeStore", _descriptor, this);
    }
    model(params) {
      if (params.id === "all") {
        return _repo2.default.findAll();
      }
      return _repo2.default.find(params.id);
    }
    async afterModel(model) {
      if (Array.isArray(model)) {
        const repos = await _repo2.default.findLatestAll();
        for (const repoData of repos) {
          const repo = model.find(_repo => _repo.path === repoData.path);
          if (!repo) {
            return;
          }
          delete repoData.path;
          for (const [key, value] of Object.entries(repoData)) {
            repo.latest[key] = value;
          }
        }
        const progress = await _repo2.default.findAllProgress(model.filter(repo => !repo.upToDate));
        this.upgradeStore.reset({
          consoleOutput: progress.logs,
          progressPercentage: progress.percentage,
          upgradeStatus: progress.status,
          repos
        });
        return;
      }
      await _repo2.default.findUpgrading();
      await model.findLatest();
      const progress = await model.findProgress();
      this.upgradeStore.reset({
        consoleOutput: progress.logs,
        progressPercentage: progress.percentage,
        upgradeStatus: progress.status,
        repos: [model.id]
      });
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "upgradeStore", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = UpgradeShow;
});
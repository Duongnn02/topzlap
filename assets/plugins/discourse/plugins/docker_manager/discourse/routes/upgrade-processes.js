define("discourse/plugins/docker_manager/discourse/routes/upgrade-processes", ["exports", "discourse/plugins/docker_manager/discourse/models/process-list", "@ember/routing/route", "discourse-common/utils/decorators", "discourse-common/lib/later", "@ember/runloop"], function (_exports, _processList, _route, _decorators, _later, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class;
  0; //eaimeta@70e063a35619d71f0,"discourse/plugins/docker_manager/discourse/models/process-list",0,"@ember/routing/route",0,"discourse-common/utils/decorators",0,"discourse-common/lib/later",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const REFRESH_INTERVAL = 5000;
  let UpgradeProcesses = (_class = class UpgradeProcesses extends _route.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "processes", null);
      _defineProperty(this, "refreshTimer", null);
      _defineProperty(this, "autoRefresh", false);
    }
    model() {
      this.processes = new _processList.default();
      this.autoRefresh = true;
      this.refresh();
      return this.processes;
    }
    deactivate() {
      this.autoRefresh = false;
    }
    async refresh() {
      if (this.autoRefresh) {
        await this.processes.refresh();
        this.refreshTimer = (0, _later.default)(this.refresh, REFRESH_INTERVAL);
      } else {
        (0, _runloop.cancel)(this.refreshTimer);
      }
    }
  }, (_applyDecoratedDescriptor(_class.prototype, "refresh", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "refresh"), _class.prototype)), _class);
  _exports.default = UpgradeProcesses;
});
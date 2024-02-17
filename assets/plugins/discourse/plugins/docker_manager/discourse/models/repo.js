define("discourse/plugins/docker_manager/discourse/models/repo", ["exports", "discourse/lib/ajax", "@glimmer/tracking", "@ember-compat/tracked-built-ins"], function (_exports, _ajax, _tracking, _trackedBuiltIns) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.needsImageUpgrade = _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/ajax",0,"@glimmer/tracking",0,"@ember-compat/tracked-built-ins"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let loaded = [];
  let needsImageUpgrade = false;
  _exports.needsImageUpgrade = needsImageUpgrade;
  function concatVersions(repos) {
    return repos.map(repo => repo.version).join(", ");
  }
  let Repo = (_class = class Repo {
    static create() {
      return new Repo(...arguments);
    }
    static async findAll() {
      if (loaded.length) {
        return loaded;
      }
      const result = await (0, _ajax.ajax)("/admin/docker/repos");
      loaded = result.repos.map(r => new Repo(r));
      _exports.needsImageUpgrade = needsImageUpgrade = result.upgrade_required;
      return loaded;
    }
    static async findUpgrading() {
      const result = await Repo.findAll();
      return result.findBy("upgrading", true);
    }
    static async find(id) {
      const result = await Repo.findAll();
      return result.findBy("id", id);
    }
    static upgradeAll() {
      return (0, _ajax.ajax)("/admin/docker/upgrade", {
        dataType: "text",
        type: "POST",
        data: {
          path: "all"
        }
      });
    }
    static resetAll(repos) {
      return (0, _ajax.ajax)("/admin/docker/upgrade", {
        dataType: "text",
        type: "DELETE",
        data: {
          path: "all",
          version: concatVersions(repos)
        }
      });
    }
    static async findLatestAll() {
      const result = await (0, _ajax.ajax)("/admin/docker/latest", {
        dataType: "json",
        type: "GET",
        data: {
          path: "all"
        }
      });
      return result.repos;
    }
    static async findAllProgress(repos) {
      const result = await (0, _ajax.ajax)("/admin/docker/progress", {
        dataType: "json",
        type: "GET",
        data: {
          path: "all",
          version: concatVersions(repos)
        }
      });
      return result.progress;
    }
    constructor() {
      let attributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _initializerDefineProperty(this, "unloaded", _descriptor, this);
      _initializerDefineProperty(this, "checking", _descriptor2, this);
      _initializerDefineProperty(this, "lastCheckedAt", _descriptor3, this);
      _initializerDefineProperty(this, "latest", _descriptor4, this);
      // model attributes
      _initializerDefineProperty(this, "name", _descriptor5, this);
      _initializerDefineProperty(this, "path", _descriptor6, this);
      _initializerDefineProperty(this, "branch", _descriptor7, this);
      _initializerDefineProperty(this, "official", _descriptor8, this);
      _initializerDefineProperty(this, "fork", _descriptor9, this);
      _initializerDefineProperty(this, "id", _descriptor10, this);
      _initializerDefineProperty(this, "version", _descriptor11, this);
      _initializerDefineProperty(this, "pretty_version", _descriptor12, this);
      _initializerDefineProperty(this, "url", _descriptor13, this);
      _initializerDefineProperty(this, "upgrading", _descriptor14, this);
      if (attributes.latest) {
        for (const [key, value] of Object.entries(attributes.latest)) {
          this.latest[key] = value;
        }
      }
      for (const [key, value] of Object.entries(attributes)) {
        if (key === "latest") {
          continue;
        }
        this[key] = value;
      }
    }
    get checkingStatus() {
      return this.unloaded || this.checking;
    }
    get upToDate() {
      return !this.upgrading && this.version === this.latest?.version;
    }
    get prettyVersion() {
      return this.pretty_version || this.version?.substring(0, 8);
    }
    get prettyLatestVersion() {
      return this.latest?.pretty_version || this.latest?.version?.substring(0, 8);
    }
    get shouldCheck() {
      if (this.version === null) {
        return false;
      }
      if (this.checking) {
        return false;
      }

      // Only check once every minute
      if (this.lastCheckedAt) {
        const ago = new Date().getTime() - this.lastCheckedAt;
        return ago > 60 * 1000;
      }
      return true;
    }
    repoAjax(url) {
      let args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      args.data = {
        path: this.path,
        version: this.version,
        branch: this.branch
      };
      return (0, _ajax.ajax)(url, args);
    }
    async findLatest() {
      if (!this.shouldCheck) {
        this.unloaded = false;
        return;
      }
      this.checking = true;
      const result = await this.repoAjax("/admin/docker/latest");
      this.unloaded = false;
      this.checking = false;
      this.lastCheckedAt = new Date().getTime();
      for (const [key, value] of Object.entries(result.latest)) {
        this.latest[key] = value;
      }
    }
    async findProgress() {
      const result = await this.repoAjax("/admin/docker/progress");
      return result.progress;
    }
    async resetUpgrade() {
      await this.repoAjax("/admin/docker/upgrade", {
        dataType: "text",
        type: "DELETE"
      });
      this.upgrading = false;
    }
    async startUpgrade() {
      this.upgrading = true;
      try {
        await this.repoAjax("/admin/docker/upgrade", {
          dataType: "text",
          type: "POST"
        });
      } catch (e) {
        this.upgrading = false;
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "unloaded", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return true;
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "checking", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "lastCheckedAt", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "latest", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return new _trackedBuiltIns.TrackedObject({});
    }
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, "name", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, "path", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, "branch", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, "official", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, "fork", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, "id", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, "version", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, "pretty_version", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, "url", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return null;
    }
  }), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, "upgrading", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  })), _class);
  _exports.default = Repo;
});
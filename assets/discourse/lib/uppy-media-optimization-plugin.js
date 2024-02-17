define("discourse/lib/uppy-media-optimization-plugin", ["exports", "discourse/lib/uppy-plugin-base", "rsvp", "discourse-common/utils/decorators"], function (_exports, _uppyPluginBase, _rsvp, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _class2;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/uppy-plugin-base",0,"rsvp",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let UppyMediaOptimization = (_class = (_class2 = class UppyMediaOptimization extends _uppyPluginBase.UploadPreProcessorPlugin {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.optimizeFn = opts.optimizeFn;

      // mobile devices have limited processing power, so we only enable
      // running media optimization in parallel when we are sure the user
      // is not on a mobile device. otherwise we just process the images
      // serially.
      this.runParallel = opts.runParallel || false;
    }
    _optimizeFile(fileId) {
      let file = this._getFile(fileId);
      this._emitProgress(file);
      return this.optimizeFn(file, {
        stopWorkerOnError: !this.runParallel
      }).then(optimizedFile => {
        let skipped = false;
        if (!optimizedFile) {
          this._consoleWarn("Nothing happened, possible error or other restriction, or the file format is not a valid one for compression.");
          skipped = true;
        } else {
          this._setFileState(fileId, {
            data: optimizedFile,
            size: optimizedFile.size
          });
        }
        this._emitComplete(file, skipped);
      }).catch(err => {
        this._consoleWarn(err);
        this._emitComplete(file);
      });
    }
    _optimizeParallel(fileIds) {
      return _rsvp.Promise.all(fileIds.map(this._optimizeFile));
    }
    async _optimizeSerial(fileIds) {
      let optimizeTasks = fileIds.map(fileId => () => this._optimizeFile(fileId));
      for (const task of optimizeTasks) {
        await task();
      }
    }
    install() {
      if (this.runParallel) {
        this._install(this._optimizeParallel);
      } else {
        this._install(this._optimizeSerial);
      }
    }
    uninstall() {
      if (this.runParallel) {
        this._uninstall(this._optimizeParallel);
      } else {
        this._uninstall(this._optimizeSerial);
      }
    }
  }, _defineProperty(_class2, "pluginId", "uppy-media-optimization"), _class2), (_applyDecoratedDescriptor(_class.prototype, "_optimizeFile", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_optimizeFile"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_optimizeParallel", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_optimizeParallel"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "_optimizeSerial", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_optimizeSerial"), _class.prototype)), _class);
  _exports.default = UppyMediaOptimization;
});
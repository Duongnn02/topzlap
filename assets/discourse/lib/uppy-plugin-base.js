define("discourse/lib/uppy-plugin-base", ["exports", "@uppy/core", "rsvp", "@ember/debug", "discourse-common/config/environment"], function (_exports, _core, _rsvp, _debug, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.UppyPluginBase = _exports.UploaderPlugin = _exports.UploadPreProcessorPlugin = void 0;
  0; //eaimeta@70e063a35619d71f0,"@uppy/core",0,"rsvp",0,"@ember/debug",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  class UppyPluginBase extends _core.BasePlugin {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.id = this.constructor.pluginId;
    }
    _consoleWarn(msg) {
      if (!(0, _environment.isTesting)()) {
        (false && (0, _debug.warn)(`[${this.id}] ${msg}`, {
          id: `discourse.${this.id}`
        }));
      }
    }
    _consoleDebug(msg) {
      if (this.siteSettings?.enable_upload_debug_mode) {
        // eslint-disable-next-line no-console
        console.log(`[${this.id}] ${msg}`);
      }
    }
    _getFile(fileId) {
      return this.uppy.getFile(fileId);
    }
    _setFileMeta(fileId, meta) {
      this.uppy.setFileMeta(fileId, meta);
    }
    _setFileState(fileId, state) {
      this.uppy.setFileState(fileId, state);
    }
    _emitAllComplete(fileIds) {
      let skipped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      fileIds.forEach(fileId => {
        let file = this._getFile(fileId);
        this._emitComplete(file, skipped);
      });
      return _rsvp.Promise.resolve();
    }
    _emitError(file, errorMessage) {
      // the error message is stored twice; once to show in a displayErrorForUpload
      // modal, and on the .message property to show in the uppy logs
      this.uppy.emit("upload-error", file, {
        errors: [errorMessage],
        message: `[${this.id}] ${errorMessage}`
      });
    }
    _skip(file) {
      return this._emitComplete(file, true);
    }
    _skipAll(file) {
      return this._emitAllComplete(file, true);
    }
  }
  _exports.UppyPluginBase = UppyPluginBase;
  class UploadPreProcessorPlugin extends UppyPluginBase {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.type = this.constructor.pluginType;
    }
    _install(fn) {
      this.uppy.addPreProcessor(fn);
    }
    _uninstall(fn) {
      this.uppy.removePreProcessor(fn);
    }
    _emitProgress(file) {
      this.uppy.emit("preprocess-progress", file, null, this.id);
    }
    _emitComplete(file) {
      let skipped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.uppy.emit("preprocess-complete", file, skipped, this.id);
      return _rsvp.Promise.resolve();
    }
  }
  _exports.UploadPreProcessorPlugin = UploadPreProcessorPlugin;
  _defineProperty(UploadPreProcessorPlugin, "pluginType", "preprocessor");
  class UploaderPlugin extends UppyPluginBase {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.type = this.constructor.pluginType;
    }
    _install(fn) {
      this.uppy.addUploader(fn);
    }
    _uninstall(fn) {
      this.uppy.removeUploader(fn);
    }
    _emitProgress(file) {
      this.uppy.emit("upload-progress", file, null, this.id);
    }
    _emitComplete(file) {
      let skipped = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.uppy.emit("upload-complete", file, skipped, this.id);
      return _rsvp.Promise.resolve();
    }
  }
  _exports.UploaderPlugin = UploaderPlugin;
  _defineProperty(UploaderPlugin, "pluginType", "uploader");
});
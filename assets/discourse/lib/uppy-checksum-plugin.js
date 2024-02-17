define("discourse/lib/uppy-checksum-plugin", ["exports", "discourse/lib/uppy-plugin-base", "rsvp", "discourse/mixins/uppy-upload", "discourse-common/utils/decorators"], function (_exports, _uppyPluginBase, _rsvp, _uppyUpload, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _class2;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/uppy-plugin-base",0,"rsvp",0,"discourse/mixins/uppy-upload",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let UppyChecksum = (_class = (_class2 = class UppyChecksum extends _uppyPluginBase.UploadPreProcessorPlugin {
    constructor(uppy, opts) {
      super(uppy, opts);
      this.capabilities = opts.capabilities;
    }
    _canUseSubtleCrypto() {
      if (!this._secureContext()) {
        this._consoleWarn("Cannot generate cryptographic digests in an insecure context (not HTTPS).");
        return false;
      }
      if (this.capabilities.isIE11) {
        this._consoleWarn("The required cipher suite is unavailable in Internet Explorer 11.");
        return false;
      }
      if (!Blob.prototype.arrayBuffer) {
        this._consoleWarn("The required File API is unavailable in this browser.");
        return false;
      }
      if (!this._hasCryptoCipher()) {
        this._consoleWarn("The required cipher suite is unavailable in this browser.");
        return false;
      }
      return true;
    }
    _generateChecksum(fileIds) {
      if (!this._canUseSubtleCrypto()) {
        return this._skipAll(fileIds, true);
      }
      let promises = fileIds.map(fileId => {
        let file = this._getFile(fileId);
        this._emitProgress(file);
        if (file.size > _uppyUpload.HUGE_FILE_THRESHOLD_BYTES) {
          this._consoleWarn("The file provided is too large to checksum, skipping.");
          return this._skip(file);
        }
        return file.data.arrayBuffer().then(arrayBuffer => {
          return window.crypto.subtle.digest("SHA-1", arrayBuffer).then(hash => {
            const hashArray = Array.from(new Uint8Array(hash));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
            this._setFileMeta(fileId, {
              sha1_checksum: hashHex
            });
            this._emitComplete(file);
          }).catch(err => {
            if (err.message.toString().includes("Algorithm: Unrecognized name")) {
              this._consoleWarn("SHA-1 algorithm is unsupported in this browser.");
            } else {
              this._consoleWarn(`Error encountered when generating digest: ${err.message}`);
            }
            this._emitComplete(file);
          });
        });
      });
      return _rsvp.Promise.all(promises);
    }
    _secureContext() {
      return window.isSecureContext;
    }
    _hasCryptoCipher() {
      return window.crypto?.subtle?.digest;
    }
    install() {
      this._install(this._generateChecksum);
    }
    uninstall() {
      this._uninstall(this._generateChecksum);
    }
  }, _defineProperty(_class2, "pluginId", "uppy-checksum"), _class2), (_applyDecoratedDescriptor(_class.prototype, "_generateChecksum", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_generateChecksum"), _class.prototype)), _class);
  _exports.default = UppyChecksum;
});
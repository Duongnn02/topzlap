define("discourse/lib/uppy-chunked-uploader-plugin", ["exports", "discourse/lib/uppy-plugin-base", "@ember/runloop", "discourse-common/lib/get-url", "rsvp", "discourse/lib/uppy-chunked-upload", "@uppy/utils/lib/EventTracker"], function (_exports, _uppyPluginBase, _runloop, _getUrl, _rsvp, _uppyChunkedUpload, _EventTracker) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/uppy-plugin-base",0,"@ember/runloop",0,"discourse-common/lib/get-url",0,"rsvp",0,"discourse/lib/uppy-chunked-upload",0,"@uppy/utils/lib/EventTracker"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  // Limited use uppy uploader function to replace Resumable.js, which
  // is only used by the local backup uploader at this point in time,
  // and has been that way for many years. Uses the skeleton of uppy's
  // AwsS3Multipart uploader plugin to provide a similar API, with unnecessary
  // code removed.
  //
  // See also UppyChunkedUpload class for more detail.
  class UppyChunkedUploader extends _uppyPluginBase.UploaderPlugin {
    constructor(uppy, opts) {
      super(uppy, opts);
      const defaultOptions = {
        limit: 0,
        retryDelays: [0, 1000, 3000, 5000]
      };
      this.opts = {
        ...defaultOptions,
        ...opts
      };
      this.url = (0, _getUrl.default)(opts.url);
      this.method = opts.method || "POST";
      this.uploaders = Object.create(null);
      this.uploaderEvents = Object.create(null);
    }
    _resetUploaderReferences(fileID) {
      let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this.uploaders[fileID]) {
        this.uploaders[fileID].abort({
          really: opts.abort || false
        });
        this.uploaders[fileID] = null;
      }
      if (this.uploaderEvents[fileID]) {
        this.uploaderEvents[fileID].remove();
        this.uploaderEvents[fileID] = null;
      }
    }
    _uploadFile(file) {
      return new _rsvp.Promise((resolve, reject) => {
        const onStart = () => {
          this.uppy.emit("upload-started", file);
        };
        const onProgress = (bytesUploaded, bytesTotal) => {
          this.uppy.emit("upload-progress", file, {
            uploader: this,
            bytesUploaded,
            bytesTotal
          });
        };
        const onError = err => {
          this.uppy.log(err);
          this.uppy.emit("upload-error", file, err);
          this._resetUploaderReferences(file.id);
          reject(err);
        };
        const onSuccess = () => {
          this._resetUploaderReferences(file.id);
          const cFile = this.uppy.getFile(file.id);
          const uploadResponse = {};
          this.uppy.emit("upload-success", cFile || file, uploadResponse);
          resolve(upload);
        };
        const onChunkComplete = chunk => {
          const cFile = this.uppy.getFile(file.id);
          if (!cFile) {
            return;
          }
          this.uppy.emit("chunk-uploaded", cFile, chunk);
        };
        const upload = new _uppyChunkedUpload.default(file, {
          getChunkSize: this.opts.getChunkSize ? this.opts.getChunkSize.bind(this) : null,
          onStart,
          onProgress,
          onChunkComplete,
          onSuccess,
          onError,
          limit: this.opts.limit || 5,
          retryDelays: this.opts.retryDelays || [],
          method: this.method,
          url: this.url,
          headers: this.opts.headers
        });
        this.uploaders[file.id] = upload;
        this.uploaderEvents[file.id] = new _EventTracker.default(this.uppy);
        (0, _runloop.next)(() => {
          if (!file.isPaused) {
            upload.start();
          }
        });
        this._onFileRemove(file.id, removed => {
          this._resetUploaderReferences(file.id, {
            abort: true
          });
          resolve(`upload ${removed.id} was removed`);
        });
        this._onCancelAll(file.id, () => {
          this._resetUploaderReferences(file.id, {
            abort: true
          });
          resolve(`upload ${file.id} was canceled`);
        });
        this._onFilePause(file.id, isPaused => {
          if (isPaused) {
            upload.pause();
          } else {
            (0, _runloop.next)(() => {
              upload.start();
            });
          }
        });
        this._onPauseAll(file.id, () => {
          upload.pause();
        });
        this._onResumeAll(file.id, () => {
          if (file.error) {
            upload.abort();
          }
          (0, _runloop.next)(() => {
            upload.start();
          });
        });

        // Don't double-emit upload-started for restored files that were already started
        if (!file.progress.uploadStarted || !file.isRestored) {
          this.uppy.emit("upload-started", file);
        }
      });
    }
    _onFileRemove(fileID, cb) {
      this.uploaderEvents[fileID].on("file-removed", file => {
        if (fileID === file.id) {
          cb(file.id);
        }
      });
    }
    _onFilePause(fileID, cb) {
      this.uploaderEvents[fileID].on("upload-pause", (targetFileID, isPaused) => {
        if (fileID === targetFileID) {
          cb(isPaused);
        }
      });
    }
    _onPauseAll(fileID, cb) {
      this.uploaderEvents[fileID].on("pause-all", () => {
        if (!this.uppy.getFile(fileID)) {
          return;
        }
        cb();
      });
    }
    _onCancelAll(fileID, cb) {
      this.uploaderEvents[fileID].on("cancel-all", () => {
        if (!this.uppy.getFile(fileID)) {
          return;
        }
        cb();
      });
    }
    _onResumeAll(fileID, cb) {
      this.uploaderEvents[fileID].on("resume-all", () => {
        if (!this.uppy.getFile(fileID)) {
          return;
        }
        cb();
      });
    }
    _upload(fileIDs) {
      const promises = fileIDs.map(id => {
        const file = this.uppy.getFile(id);
        return this._uploadFile(file);
      });
      return _rsvp.Promise.all(promises);
    }
    install() {
      this._install(this._upload.bind(this));
    }
    uninstall() {
      this._uninstall(this._upload.bind(this));
    }
  }
  _exports.default = UppyChunkedUploader;
  _defineProperty(UppyChunkedUploader, "pluginId", "uppy-chunked-uploader");
});
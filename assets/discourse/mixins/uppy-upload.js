define("discourse/mixins/uppy-upload", ["exports", "@ember/object/mixin", "@ember/runloop", "discourse/mixins/extendable-uploader", "@ember/object/computed", "@ember/object", "discourse/lib/ajax", "discourse/lib/uploads", "discourse-common/lib/object", "discourse-common/lib/get-url", "I18n", "@uppy/core", "@uppy/drop-target", "@uppy/xhr-upload", "@uppy/aws-s3", "discourse/lib/uppy-checksum-plugin", "discourse/mixins/uppy-s3-multipart", "discourse/lib/uppy-chunked-uploader-plugin", "discourse-common/utils/decorators", "@ember/debug", "@ember/service"], function (_exports, _mixin, _runloop, _extendableUploader, _computed, _object, _ajax, _uploads, _object2, _getUrl, _I18n, _core, _dropTarget, _xhrUpload, _awsS, _uppyChecksumPlugin, _uppyS3Multipart, _uppyChunkedUploaderPlugin, _decorators, _debug, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.HUGE_FILE_THRESHOLD_BYTES = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/mixin",0,"@ember/runloop",0,"discourse/mixins/extendable-uploader",0,"@ember/object/computed",0,"@ember/object",0,"discourse/lib/ajax",0,"discourse/lib/uploads",0,"discourse-common/lib/object",0,"discourse-common/lib/get-url",0,"I18n",0,"@uppy/core",0,"@uppy/drop-target",0,"@uppy/xhr-upload",0,"@uppy/aws-s3",0,"discourse/lib/uppy-checksum-plugin",0,"discourse/mixins/uppy-s3-multipart",0,"discourse/lib/uppy-chunked-uploader-plugin",0,"discourse-common/utils/decorators",0,"@ember/debug",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const HUGE_FILE_THRESHOLD_BYTES = 104_857_600; // 100MB
  _exports.HUGE_FILE_THRESHOLD_BYTES = HUGE_FILE_THRESHOLD_BYTES;
  var _default = _mixin.default.create(_uppyS3Multipart.default, _extendableUploader.default, (_dec = (0, _decorators.on)("willDestroyElement"), _dec2 = (0, _decorators.on)("didInsertElement"), (_obj = {
    dialog: (0, _service.inject)(),
    uploading: false,
    uploadProgress: 0,
    _uppyInstance: null,
    autoStartUploads: true,
    inProgressUploads: null,
    id: null,
    uploadRootPath: "/uploads",
    fileInputSelector: ".hidden-upload-field",
    uploadDone() {
      (false && (0, _debug.warn)("You should implement `uploadDone`", {
        id: "discourse.upload.missing-upload-done"
      }));
    },
    validateUploadedFilesOptions() {
      return {};
    },
    uploadingOrProcessing: (0, _computed.or)("uploading", "processing"),
    _destroy() {
      if (this.messageBus) {
        this.messageBus.unsubscribe(`/uploads/${this.type}`);
      }
      this.fileInputEl?.removeEventListener("change", this.fileInputEventListener);
      this.appEvents.off(`upload-mixin:${this.id}:add-files`, this._addFiles);
      this.appEvents.off(`upload-mixin:${this.id}:cancel-upload`, this._cancelSingleUpload);
      this._uppyInstance?.close();
      this._uppyInstance = null;
    },
    _initialize() {
      this.setProperties({
        fileInputEl: this.element.querySelector(this.fileInputSelector)
      });
      this.set("allowMultipleFiles", this.fileInputEl.multiple);
      this.set("inProgressUploads", []);
      this._triggerInProgressUploadsEvent();
      this._bindFileInputChange();
      if (!this.id) {
        (false && (0, _debug.warn)("uppy needs a unique id, pass one in to the component implementing this mixin", {
          id: "discourse.upload.missing-id"
        }));
      }
      this._uppyInstance = new _core.default({
        id: this.id,
        autoProceed: this.autoStartUploads,
        // need to use upload_type because uppy overrides type with the
        // actual file type
        meta: (0, _object2.deepMerge)({
          upload_type: this.type
        }, this.additionalParams || {}, this.data || {}),
        onBeforeFileAdded: currentFile => {
          const validationOpts = (0, _object2.deepMerge)({
            bypassNewUserRestriction: true,
            user: this.currentUser,
            siteSettings: this.siteSettings,
            validateSize: true
          }, this.validateUploadedFilesOptions());
          const isValid = (0, _uploads.validateUploadedFile)(currentFile, validationOpts);
          this.setProperties({
            uploadProgress: 0,
            uploading: isValid && this.autoStartUploads,
            filesAwaitingUpload: !this.autoStartUploads,
            cancellable: isValid && this.autoStartUploads
          });
          return isValid;
        },
        onBeforeUpload: files => {
          let tooMany = false;
          const fileCount = Object.keys(files).length;
          const maxFiles = this.maxFiles || this.siteSettings.simultaneous_uploads;
          if (this.allowMultipleFiles) {
            tooMany = maxFiles > 0 && fileCount > maxFiles;
          } else {
            tooMany = fileCount > 1;
          }
          if (tooMany) {
            this.dialog.alert(_I18n.default.t("post.errors.too_many_dragged_and_dropped_files", {
              count: this.allowMultipleFiles ? maxFiles : 1
            }));
            this._reset();
            return false;
          }
          if (this._perFileData) {
            Object.values(files).forEach(file => {
              (0, _object2.deepMerge)(file.meta, this._perFileData());
            });
          }
        }
      });

      // DropTarget is a UI plugin, only preprocessors must call _useUploadPlugin
      this._uppyInstance.use(_dropTarget.default, this._uploadDropTargetOptions());
      this._uppyInstance.on("progress", progress => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }
        this.set("uploadProgress", progress);
      });
      this._uppyInstance.on("upload", data => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }
        this._addNeedProcessing(data.fileIDs.length);
        const files = data.fileIDs.map(fileId => this._uppyInstance.getFile(fileId));
        this.setProperties({
          processing: true,
          cancellable: false
        });
        files.forEach(file => {
          // The inProgressUploads is meant to be used to display these uploads
          // in a UI, and Ember will only update the array in the UI if pushObject
          // is used to notify it.
          this.inProgressUploads.pushObject(_object.default.create({
            fileName: file.name,
            id: file.id,
            progress: 0,
            extension: file.extension,
            processing: false
          }));
          this._triggerInProgressUploadsEvent();
        });
      });
      this._uppyInstance.on("upload-progress", (file, progress) => {
        (0, _runloop.run)(() => {
          if (this.isDestroying || this.isDestroyed) {
            return;
          }
          const upload = this.inProgressUploads.find(upl => upl.id === file.id);
          if (upload) {
            const percentage = Math.round(progress.bytesUploaded / progress.bytesTotal * 100);
            upload.set("progress", percentage);
          }
        });
      });
      this._uppyInstance.on("upload-success", (file, response) => {
        if (this.usingS3Uploads) {
          this.setProperties({
            uploading: false,
            processing: true
          });
          this._completeExternalUpload(file).then(completeResponse => {
            this._removeInProgressUpload(file.id);
            this.appEvents.trigger(`upload-mixin:${this.id}:upload-success`, file.name, completeResponse);
            this.uploadDone((0, _object2.deepMerge)(completeResponse, {
              file_name: file.name
            }));
            this._triggerInProgressUploadsEvent();
            if (this.inProgressUploads.length === 0) {
              this._allUploadsComplete();
            }
          }).catch(errResponse => {
            (0, _uploads.displayErrorForUpload)(errResponse, this.siteSettings, file.name);
            this._triggerInProgressUploadsEvent();
          });
        } else {
          this._removeInProgressUpload(file.id);
          const upload = response?.body || {};
          this.appEvents.trigger(`upload-mixin:${this.id}:upload-success`, file.name, upload);
          this.uploadDone((0, _object2.deepMerge)(upload, {
            file_name: file.name
          }));
          this._triggerInProgressUploadsEvent();
          if (this.inProgressUploads.length === 0) {
            this._allUploadsComplete();
          }
        }
      });
      this._uppyInstance.on("upload-error", (file, error, response) => {
        this._removeInProgressUpload(file.id);
        (0, _uploads.displayErrorForUpload)(response || error, this.siteSettings, file.name);
        this._reset();
      });
      this._uppyInstance.on("file-removed", (file, reason) => {
        (0, _runloop.run)(() => {
          // we handle the cancel-all event specifically, so no need
          // to do anything here. this event is also fired when some files
          // are handled by an upload handler
          if (reason === "cancel-all") {
            return;
          }
          this.appEvents.trigger(`upload-mixin:${this.id}:upload-cancelled`, file.id);
        });
      });
      if (this.siteSettings.enable_upload_debug_mode) {
        this._instrumentUploadTimings();
      }

      // TODO (martin) preventDirectS3Uploads is necessary because some of
      // the current upload mixin components, for example the emoji uploader,
      // send the upload to custom endpoints that do fancy things in the rails
      // controller with the upload or create additional data or records. we
      // need a nice way to do this on complete-external-upload before we can
      // allow these other uploaders to go direct to S3.
      if (this.siteSettings.enable_direct_s3_uploads && !this.preventDirectS3Uploads && !this.useChunkedUploads) {
        if (this.useMultipartUploadsIfAvailable) {
          this._useS3MultipartUploads();
        } else {
          this._useS3Uploads();
        }
      } else {
        if (this.useChunkedUploads) {
          this._useChunkedUploads();
        } else {
          this._useXHRUploads();
        }
      }
      this._uppyInstance.on("cancel-all", () => {
        this.appEvents.trigger(`upload-mixin:${this.id}:uploads-cancelled`);
        if (!this.isDestroyed && !this.isDestroying) {
          this.set("inProgressUploads", []);
          this._triggerInProgressUploadsEvent();
        }
      });
      this.appEvents.on(`upload-mixin:${this.id}:add-files`, this._addFiles);
      this.appEvents.on(`upload-mixin:${this.id}:cancel-upload`, this._cancelSingleUpload);
      this._uppyReady();

      // It is important that the UppyChecksum preprocessor is the last one to
      // be added; the preprocessors are run in order and since other preprocessors
      // may modify the file (e.g. the UppyMediaOptimization one), we need to
      // checksum once we are sure the file data has "settled".
      this._useUploadPlugin(_uppyChecksumPlugin.default, {
        capabilities: this.capabilities
      });
    },
    _triggerInProgressUploadsEvent() {
      this.appEvents.trigger(`upload-mixin:${this.id}:in-progress-uploads`, this.inProgressUploads);
    },
    // This should be overridden in a child component if you need to
    // hook into uppy events and be sure that everything is already
    // set up for _uppyInstance.
    _uppyReady() {},
    _startUpload() {
      if (!this.filesAwaitingUpload) {
        return;
      }
      if (!this._uppyInstance?.getFiles().length) {
        return;
      }
      this.set("uploading", true);
      return this._uppyInstance?.upload();
    },
    _useXHRUploads() {
      this._uppyInstance.use(_xhrUpload.default, {
        endpoint: this._xhrUploadUrl(),
        headers: {
          "X-CSRF-Token": this.session.csrfToken
        }
      });
    },
    _useChunkedUploads() {
      this.set("usingChunkedUploads", true);
      this._uppyInstance.use(_uppyChunkedUploaderPlugin.default, {
        url: this._xhrUploadUrl(),
        headers: {
          "X-CSRF-Token": this.session.csrfToken
        }
      });
    },
    _useS3Uploads() {
      this.set("usingS3Uploads", true);
      this._uppyInstance.use(_awsS.default, {
        getUploadParameters: file => {
          const data = {
            file_name: file.name,
            file_size: file.size,
            type: this.type
          };

          // the sha1 checksum is set by the UppyChecksum plugin, except
          // for in cases where the browser does not support the required
          // crypto mechanisms or an error occurs. it is an additional layer
          // of security, and not required.
          if (file.meta.sha1_checksum) {
            data.metadata = {
              "sha1-checksum": file.meta.sha1_checksum
            };
          }
          return (0, _ajax.ajax)((0, _getUrl.default)(`${this.uploadRootPath}/generate-presigned-put`), {
            type: "POST",
            data
          }).then(response => {
            this._uppyInstance.setFileMeta(file.id, {
              uniqueUploadIdentifier: response.unique_identifier
            });
            return {
              method: "put",
              url: response.url,
              headers: {
                "Content-Type": file.type
              }
            };
          }).catch(errResponse => {
            (0, _uploads.displayErrorForUpload)(errResponse, this.siteSettings, file.name);
            this._reset();
          });
        }
      });
    },
    _xhrUploadUrl() {
      const uploadUrl = this.uploadUrl || this.uploadRootPath;
      return (0, _getUrl.default)(uploadUrl) + ".json?client_id=" + this.messageBus?.clientId;
    },
    _bindFileInputChange() {
      this.fileInputEventListener = (0, _uploads.bindFileInputChangeListener)(this.fileInputEl, this._addFiles);
    },
    _cancelSingleUpload(data) {
      this._uppyInstance.removeFile(data.fileId);
      this._removeInProgressUpload(data.fileId);
    },
    _addFiles(files) {
      let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      files = Array.isArray(files) ? files : [files];
      try {
        this._uppyInstance.addFiles(files.map(file => {
          return {
            source: this.id,
            name: file.name,
            type: file.type,
            data: file,
            meta: {
              pasted: opts.pasted
            }
          };
        }));
      } catch (err) {
        (false && (0, _debug.warn)(`error adding files to uppy: ${err}`, {
          id: "discourse.upload.uppy-add-files-error"
        }));
      }
    },
    _completeExternalUpload(file) {
      return (0, _ajax.ajax)((0, _getUrl.default)(`${this.uploadRootPath}/complete-external-upload`), {
        type: "POST",
        data: (0, _object2.deepMerge)({
          unique_identifier: file.meta.uniqueUploadIdentifier
        }, this.additionalParams || {})
      });
    },
    _reset() {
      this._uppyInstance?.cancelAll();
      this.setProperties({
        uploading: false,
        processing: false,
        cancellable: false,
        uploadProgress: 0,
        filesAwaitingUpload: false
      });
      this.fileInputEl.value = "";
    },
    _removeInProgressUpload(fileId) {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }
      this.set("inProgressUploads", this.inProgressUploads.filter(upl => upl.id !== fileId));
      this._triggerInProgressUploadsEvent();
    },
    // target must be provided as a DOM element, however the
    // onDragOver and onDragLeave callbacks can also be provided.
    // it is advisable to debounce/add a setTimeout timer when
    // doing anything in these callbacks to avoid jumping. uppy
    // also adds a .uppy-is-drag-over class to the target element by
    // default onDragOver and removes it onDragLeave
    _uploadDropTargetOptions() {
      return {
        target: this.element
      };
    },
    _allUploadsComplete() {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      this.appEvents.trigger(`upload-mixin:${this.id}:all-uploads-complete`);
      this._reset();
    }
  }, (_applyDecoratedDescriptor(_obj, "_destroy", [_dec], Object.getOwnPropertyDescriptor(_obj, "_destroy"), _obj), _applyDecoratedDescriptor(_obj, "_initialize", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_initialize"), _obj), _applyDecoratedDescriptor(_obj, "_cancelSingleUpload", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_cancelSingleUpload"), _obj), _applyDecoratedDescriptor(_obj, "_addFiles", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_addFiles"), _obj)), _obj)));
  _exports.default = _default;
});
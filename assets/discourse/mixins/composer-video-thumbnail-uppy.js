define("discourse/mixins/composer-video-thumbnail-uppy", ["exports", "@ember/object/mixin", "discourse/mixins/extendable-uploader", "discourse/mixins/uppy-s3-multipart", "@uppy/core", "@uppy/drop-target", "@uppy/xhr-upload", "@ember/debug", "I18n", "discourse-common/lib/get-url", "discourse-common/utils/decorators", "@ember/service"], function (_exports, _mixin, _extendableUploader, _uppyS3Multipart, _core, _dropTarget, _xhrUpload, _debug, _I18n, _getUrl, _decorators, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/mixin",0,"discourse/mixins/extendable-uploader",0,"discourse/mixins/uppy-s3-multipart",0,"@uppy/core",0,"@uppy/drop-target",0,"@uppy/xhr-upload",0,"@ember/debug",0,"I18n",0,"discourse-common/lib/get-url",0,"discourse-common/utils/decorators",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _mixin.default.create(_extendableUploader.default, _uppyS3Multipart.default, (_obj = {
    dialog: (0, _service.inject)(),
    uploadRootPath: "/uploads",
    uploadTargetBound: false,
    useUploadPlaceholders: true,
    _generateVideoThumbnail(videoFile, uploadUrl, callback) {
      if (!this.siteSettings.video_thumbnails_enabled) {
        return callback();
      }
      if (videoFile.type.split("/")[0] !== "video") {
        return callback();
      }
      let video = document.createElement("video");
      video.src = URL.createObjectURL(videoFile.data);

      // These attributes are needed for thumbnail generation on mobile.
      // This video tag is not visible, so this is all happening in the background.
      video.autoplay = true;
      video.muted = true;
      video.playsinline = true;
      let videoSha1 = uploadUrl.substring(uploadUrl.lastIndexOf("/") + 1).split(".")[0];

      // Wait for the video element to load, otherwise the canvas will be empty.
      // iOS Safari prefers onloadedmetadata over oncanplay.
      video.onloadedmetadata = () => {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // A timeout is needed on mobile.
        setTimeout(() => {
          ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

          // upload video thumbnail
          canvas.toBlob(blob => {
            this._uppyInstance = new _core.default({
              id: "video-thumbnail",
              meta: {
                upload_type: `thumbnail`,
                videoSha1
              },
              autoProceed: true
            });
            if (this.siteSettings.enable_upload_debug_mode) {
              this._instrumentUploadTimings();
            }
            if (this.siteSettings.enable_direct_s3_uploads) {
              this._useS3MultipartUploads();
            } else {
              this._useXHRUploads();
            }
            this._uppyInstance.use(_dropTarget.default, {
              target: this.element
            });
            this._uppyInstance.on("upload", () => {
              this.set("uploading", true);
            });
            this._uppyInstance.on("upload-success", () => {
              this.set("uploading", false);
              callback();
            });
            this._uppyInstance.on("upload-error", (file, error, response) => {
              let message = _I18n.default.t("wizard.upload_error");
              if (response.body.errors) {
                message = response.body.errors.join("\n");
              }

              // eslint-disable-next-line no-console
              console.error(message);
              this.set("uploading", false);
              callback();
            });
            try {
              this._uppyInstance.addFile({
                source: `${this.id} thumbnail`,
                name: `${videoSha1}`,
                type: blob.type,
                data: blob
              });
            } catch (err) {
              (false && (0, _debug.warn)(`error adding files to uppy: ${err}`, {
                id: "discourse.upload.uppy-add-files-error"
              }));
            }
          });
        }, 100);
      };
    },
    // This should be overridden in a child component if you need to
    // hook into uppy events and be sure that everything is already
    // set up for _uppyInstance.
    _uppyReady() {},
    _useXHRUploads() {
      this._uppyInstance.use(_xhrUpload.default, {
        endpoint: (0, _getUrl.default)(`/uploads.json?client_id=${this.messageBus.clientId}`),
        headers: {
          "X-CSRF-Token": this.session.csrfToken
        }
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "_generateVideoThumbnail", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_generateVideoThumbnail"), _obj)), _obj));
  _exports.default = _default;
});
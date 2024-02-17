define("discourse/mixins/uppy-s3-multipart", ["exports", "@ember/object/mixin", "discourse-common/lib/get-url", "discourse-common/utils/decorators", "rsvp", "discourse/lib/ajax", "@uppy/aws-s3-multipart"], function (_exports, _mixin, _getUrl, _decorators, _rsvp, _ajax, _awsS3Multipart) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/mixin",0,"discourse-common/lib/get-url",0,"discourse-common/utils/decorators",0,"rsvp",0,"discourse/lib/ajax",0,"@uppy/aws-s3-multipart"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const RETRY_DELAYS = [0, 1000, 3000, 5000];
  var _default = _mixin.default.create((_obj = {
    _useS3MultipartUploads() {
      this.set("usingS3MultipartUploads", true);
      this._uppyInstance.use(_awsS3Multipart.default, {
        // controls how many simultaneous _chunks_ are uploaded, not files,
        // which in turn controls the minimum number of chunks presigned
        // in each batch (limit / 2)
        //
        // the default, and minimum, chunk size is 5mb. we can control the
        // chunk size via getChunkSize(file), so we may want to increase
        // the chunk size for larger files
        limit: 10,
        retryDelays: RETRY_DELAYS,
        createMultipartUpload: this._createMultipartUpload,
        prepareUploadParts: this._prepareUploadParts,
        completeMultipartUpload: this._completeMultipartUpload,
        abortMultipartUpload: this._abortMultipartUpload

        // we will need a listParts function at some point when we want to
        // resume multipart uploads; this is used by uppy to figure out
        // what parts are uploaded and which still need to be
      });
    },

    _createMultipartUpload(file) {
      this._uppyInstance.emit("create-multipart", file.id);
      const data = {
        file_name: file.name,
        file_size: file.size,
        upload_type: file.meta.upload_type,
        metadata: file.meta
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
      return (0, _ajax.ajax)((0, _getUrl.default)(`${this.uploadRootPath}/create-multipart.json`), {
        type: "POST",
        data
        // uppy is inconsistent, an error here fires the upload-error event
      }).then(responseData => {
        this._uppyInstance.emit("create-multipart-success", file.id);
        file.meta.unique_identifier = responseData.unique_identifier;
        return {
          uploadId: responseData.external_upload_identifier,
          key: responseData.key
        };
      });
    },
    _prepareUploadParts(file, partData) {
      if (file.preparePartsRetryAttempts === undefined) {
        file.preparePartsRetryAttempts = 0;
      }
      return (0, _ajax.ajax)((0, _getUrl.default)(`${this.uploadRootPath}/batch-presign-multipart-parts.json`), {
        type: "POST",
        data: {
          part_numbers: partData.parts.map(part => part.number),
          unique_identifier: file.meta.unique_identifier
        }
      }).then(data => {
        if (file.preparePartsRetryAttempts) {
          delete file.preparePartsRetryAttempts;
          this._consoleDebug(`[uppy] Retrying batch fetch for ${file.id} was successful, continuing.`);
        }
        return {
          presignedUrls: data.presigned_urls
        };
      }).catch(err => {
        const status = err.jqXHR.status;

        // it is kind of ugly to have to track the retry attempts for
        // the file based on the retry delays, but uppy's `retryable`
        // function expects the rejected Promise data to be structured
        // _just so_, and provides no interface for us to tell how many
        // times the upload has been retried (which it tracks internally)
        //
        // if we exceed the attempts then there is no way that uppy will
        // retry the upload once again, so in that case the alert can
        // be safely shown to the user that their upload has failed.
        if (file.preparePartsRetryAttempts < RETRY_DELAYS.length) {
          file.preparePartsRetryAttempts += 1;
          const attemptsLeft = RETRY_DELAYS.length - file.preparePartsRetryAttempts + 1;
          this._consoleDebug(`[uppy] Fetching a batch of upload part URLs for ${file.id} failed with status ${status}, retrying ${attemptsLeft} more times...`);
          return _rsvp.Promise.reject({
            source: {
              status
            }
          });
        } else {
          this._consoleDebug(`[uppy] Fetching a batch of upload part URLs for ${file.id} failed too many times, throwing error.`);
          // uppy is inconsistent, an error here does not fire the upload-error event
          this._handleUploadError(file, err);
        }
      });
    },
    _completeMultipartUpload(file, data) {
      if (file.meta.cancelled) {
        return;
      }
      this._uppyInstance.emit("complete-multipart", file.id);
      const parts = data.parts.map(part => {
        return {
          part_number: part.PartNumber,
          etag: part.ETag
        };
      });
      return (0, _ajax.ajax)((0, _getUrl.default)(`${this.uploadRootPath}/complete-multipart.json`), {
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          parts,
          unique_identifier: file.meta.unique_identifier,
          pasted: file.meta.pasted,
          for_private_message: file.meta.for_private_message
        })
        // uppy is inconsistent, an error here fires the upload-error event
      }).then(responseData => {
        this._uppyInstance.emit("complete-multipart-success", file.id);
        return responseData;
      });
    },
    _abortMultipartUpload(file, _ref) {
      let {
        key,
        uploadId
      } = _ref;
      // if the user cancels the upload before the key and uploadId
      // are stored from the createMultipartUpload response then they
      // will not be set, and we don't have to abort the upload because
      // it will not exist yet
      if (!key || !uploadId) {
        return;
      }

      // this gives us a chance to inspect the upload stub before
      // it is deleted from external storage by aborting the multipart
      // upload; see also ExternalUploadManager
      if (file.meta.error && this.siteSettings.enable_upload_debug_mode) {
        return;
      }
      file.meta.cancelled = true;
      return (0, _ajax.ajax)((0, _getUrl.default)(`${this.uploadRootPath}/abort-multipart.json`), {
        type: "POST",
        data: {
          external_upload_identifier: uploadId
        }
        // uppy is inconsistent, an error here does not fire the upload-error event
      }).catch(err => {
        this._handleUploadError(file, err);
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "_createMultipartUpload", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_createMultipartUpload"), _obj), _applyDecoratedDescriptor(_obj, "_prepareUploadParts", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_prepareUploadParts"), _obj), _applyDecoratedDescriptor(_obj, "_completeMultipartUpload", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_completeMultipartUpload"), _obj), _applyDecoratedDescriptor(_obj, "_abortMultipartUpload", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_abortMultipartUpload"), _obj)), _obj));
  _exports.default = _default;
});
define("discourse/components/uppy-backup-uploader", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "I18n", "discourse/mixins/uppy-upload", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _computed, _I18n, _uppyUpload, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object/computed",0,"I18n",0,"discourse/mixins/uppy-upload",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <label
    class="btn"
    disabled={{this.uploading}}
    title={{i18n "admin.backups.upload.title"}}
  >
    {{d-icon "upload"}}{{this.uploadButtonText}}
    <input
      class="hidden-upload-field"
      disabled={{this.uploading}}
      type="file"
      accept=".gz"
    />
  </label>
  */
  {
    "id": "je4ghZHh",
    "block": "[[[10,\"label\"],[14,0,\"btn\"],[15,\"disabled\",[30,0,[\"uploading\"]]],[15,\"title\",[28,[37,0],[\"admin.backups.upload.title\"],null]],[12],[1,\"\\n  \"],[1,[28,[35,1],[\"upload\"],null]],[1,[30,0,[\"uploadButtonText\"]]],[1,\"\\n  \"],[10,\"input\"],[14,0,\"hidden-upload-field\"],[15,\"disabled\",[30,0,[\"uploading\"]]],[14,\"accept\",\".gz\"],[14,4,\"file\"],[12],[13],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"d-icon\"]]",
    "moduleName": "discourse/components/uppy-backup-uploader.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_uppyUpload.default, (_dec = (0, _decorators.default)("localBackupStorage"), _dec2 = (0, _decorators.default)("uploading", "uploadProgress"), (_obj = {
    id: "uppy-backup-uploader",
    tagName: "span",
    type: "backup",
    uploadRootPath: "/admin/backups",
    uploadUrl: "/admin/backups/upload",
    useMultipartUploadsIfAvailable(localBackupStorage) {
      return !localBackupStorage && this.siteSettings.enable_direct_s3_uploads;
    },
    // local backups
    useChunkedUploads: (0, _computed.alias)("localBackupStorage"),
    uploadButtonText(uploading, progress) {
      return uploading ? _I18n.default.t("admin.backups.upload.uploading_progress", {
        progress
      }) : _I18n.default.t("admin.backups.upload.label");
    },
    validateUploadedFilesOptions() {
      return {
        skipValidation: true
      };
    },
    uploadDone(responseData) {
      this.done(responseData.file_name);
    }
  }, (_applyDecoratedDescriptor(_obj, "useMultipartUploadsIfAvailable", [_dec], Object.getOwnPropertyDescriptor(_obj, "useMultipartUploadsIfAvailable"), _obj), _applyDecoratedDescriptor(_obj, "uploadButtonText", [_dec2], Object.getOwnPropertyDescriptor(_obj, "uploadButtonText"), _obj)), _obj))));
  _exports.default = _default;
});
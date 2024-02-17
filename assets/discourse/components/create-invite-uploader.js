define("discourse/components/create-invite-uploader", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse/mixins/uppy-upload", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _object, _uppyUpload, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"discourse/mixins/uppy-upload",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{yield
    (hash
      data=this.data
      uploading=this.uploading
      uploadProgress=this.uploadProgress
      uploaded=this.uploaded
      submitDisabled=this.submitDisabled
      startUpload=(action "startUpload")
    )
  }}
  */
  {
    "id": "Uioc8Hgb",
    "block": "[[[18,1,[[28,[37,1],null,[[\"data\",\"uploading\",\"uploadProgress\",\"uploaded\",\"submitDisabled\",\"startUpload\"],[[30,0,[\"data\"]],[30,0,[\"uploading\"]],[30,0,[\"uploadProgress\"]],[30,0,[\"uploaded\"]],[30,0,[\"submitDisabled\"]],[28,[37,2],[[30,0],\"startUpload\"],null]]]]]]],[\"&default\"],false,[\"yield\",\"hash\",\"action\"]]",
    "moduleName": "discourse/components/create-invite-uploader.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_uppyUpload.default, (_dec = (0, _decorators.default)("filesAwaitingUpload", "uploading"), (_obj = {
    id: "create-invite-uploader",
    tagName: "div",
    type: "csv",
    autoStartUploads: false,
    uploadUrl: "/invites/upload_csv",
    preventDirectS3Uploads: true,
    fileInputSelector: "#csv-file",
    validateUploadedFilesOptions() {
      return {
        bypassNewUserRestriction: true,
        csvOnly: true
      };
    },
    submitDisabled(filesAwaitingUpload, uploading) {
      return !filesAwaitingUpload || uploading;
    },
    uploadDone() {
      this.set("uploaded", true);
    },
    startUpload() {
      this._startUpload();
    }
  }, (_applyDecoratedDescriptor(_obj, "submitDisabled", [_dec], Object.getOwnPropertyDescriptor(_obj, "submitDisabled"), _obj), _applyDecoratedDescriptor(_obj, "startUpload", [_object.action], Object.getOwnPropertyDescriptor(_obj, "startUpload"), _obj)), _obj))));
  _exports.default = _default;
});
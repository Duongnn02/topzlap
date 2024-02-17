define("discourse/components/images-uploader", ["exports", "@ember/component", "@ember/template-factory", "I18n", "discourse/mixins/uppy-upload", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _I18n, _uppyUpload, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"discourse/mixins/uppy-upload",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <label
    class="btn"
    disabled={{this.uploadingOrProcessing}}
    title={{i18n "admin.site_settings.uploaded_image_list.upload.title"}}
  >
    {{d-icon "far-image"}}&nbsp;{{this.uploadButtonText}}
    <input
      class="hidden-upload-field"
      disabled={{this.uploading}}
      type="file"
      accept="image/*"
      multiple
    />
  </label>
  {{#if this.uploadingOrProcessing}}
    <span>{{i18n "upload_selector.uploading"}} {{this.uploadProgress}}%</span>
  {{/if}}
  */
  {
    "id": "jrOoDhht",
    "block": "[[[10,\"label\"],[14,0,\"btn\"],[15,\"disabled\",[30,0,[\"uploadingOrProcessing\"]]],[15,\"title\",[28,[37,0],[\"admin.site_settings.uploaded_image_list.upload.title\"],null]],[12],[1,\"\\n  \"],[1,[28,[35,1],[\"far-image\"],null]],[1,\" \"],[1,[30,0,[\"uploadButtonText\"]]],[1,\"\\n  \"],[10,\"input\"],[14,0,\"hidden-upload-field\"],[15,\"disabled\",[30,0,[\"uploading\"]]],[14,\"accept\",\"image/*\"],[14,\"multiple\",\"\"],[14,4,\"file\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[41,[30,0,[\"uploadingOrProcessing\"]],[[[1,\"  \"],[10,1],[12],[1,[28,[35,0],[\"upload_selector.uploading\"],null]],[1,\" \"],[1,[30,0,[\"uploadProgress\"]]],[1,\"%\"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"i18n\",\"d-icon\",\"if\"]]",
    "moduleName": "discourse/components/images-uploader.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_uppyUpload.default, (_dec = (0, _decorators.default)("uploadingOrProcessing"), (_obj = {
    type: "avatar",
    tagName: "span",
    uploadButtonText(uploadingOrProcessing) {
      return uploadingOrProcessing ? _I18n.default.t("uploading") : _I18n.default.t("upload");
    },
    validateUploadedFilesOptions() {
      return {
        imagesOnly: true
      };
    },
    uploadDone(upload) {
      this.done(upload);
    }
  }, (_applyDecoratedDescriptor(_obj, "uploadButtonText", [_dec], Object.getOwnPropertyDescriptor(_obj, "uploadButtonText"), _obj)), _obj))));
  _exports.default = _default;
});
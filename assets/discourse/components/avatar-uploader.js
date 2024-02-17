define("discourse/components/avatar-uploader", ["exports", "@ember/component", "@ember/template-factory", "discourse/mixins/uppy-upload", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _uppyUpload, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/mixins/uppy-upload",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <label
    class="btn btn-default btn-icon-text"
    disabled={{this.uploading}}
    title={{i18n "user.change_avatar.upload_title"}}
  >
    {{d-icon "far-image"}}
    {{#if this.uploading}}
      {{i18n "uploading"}}
      {{this.uploadProgress}}%
    {{else}}
      {{i18n "upload"}}
    {{/if}}
    <input
      class="hidden-upload-field"
      disabled={{this.uploading}}
      type="file"
      accept="image/*"
    />
  </label>
  
  {{#if this.imageIsNotASquare}}
    <div class="warning">{{i18n "user.change_avatar.image_is_not_a_square"}}</div>
  {{/if}}
  */
  {
    "id": "nOTrMBwm",
    "block": "[[[10,\"label\"],[14,0,\"btn btn-default btn-icon-text\"],[15,\"disabled\",[30,0,[\"uploading\"]]],[15,\"title\",[28,[37,0],[\"user.change_avatar.upload_title\"],null]],[12],[1,\"\\n  \"],[1,[28,[35,1],[\"far-image\"],null]],[1,\"\\n\"],[41,[30,0,[\"uploading\"]],[[[1,\"    \"],[1,[28,[35,0],[\"uploading\"],null]],[1,\"\\n    \"],[1,[30,0,[\"uploadProgress\"]]],[1,\"%\\n\"]],[]],[[[1,\"    \"],[1,[28,[35,0],[\"upload\"],null]],[1,\"\\n\"]],[]]],[1,\"  \"],[10,\"input\"],[14,0,\"hidden-upload-field\"],[15,\"disabled\",[30,0,[\"uploading\"]]],[14,\"accept\",\"image/*\"],[14,4,\"file\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"imageIsNotASquare\"]],[[[1,\"  \"],[10,0],[14,0,\"warning\"],[12],[1,[28,[35,0],[\"user.change_avatar.image_is_not_a_square\"],null]],[13],[1,\"\\n\"]],[]],null]],[],false,[\"i18n\",\"d-icon\",\"if\"]]",
    "moduleName": "discourse/components/avatar-uploader.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_uppyUpload.default, (_dec = (0, _decorators.default)("user_id"), (_obj = {
    type: "avatar",
    tagName: "span",
    imageIsNotASquare: false,
    validateUploadedFilesOptions() {
      return {
        imagesOnly: true
      };
    },
    uploadDone(upload) {
      this.setProperties({
        imageIsNotASquare: upload.width !== upload.height,
        uploadedAvatarTemplate: upload.url,
        uploadedAvatarId: upload.id
      });
      this.done();
    },
    data(user_id) {
      return {
        user_id
      };
    }
  }, (_applyDecoratedDescriptor(_obj, "data", [_dec], Object.getOwnPropertyDescriptor(_obj, "data"), _obj)), _obj))));
  _exports.default = _default;
});
define("discourse/components/edit-category-images", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse/components/edit-category-panel", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _object, _editCategoryPanel, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"discourse/components/edit-category-panel",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <section class="field category-logo">
    <label>{{i18n "category.logo"}}</label>
    <UppyImageUploader
      @imageUrl={{this.logoImageUrl}}
      @onUploadDone={{action "logoUploadDone"}}
      @onUploadDeleted={{action "logoUploadDeleted"}}
      @type="category_logo"
      @class="no-repeat contain-image"
      @id="category-logo-uploader"
    />
  </section>
  
  <section class="field category-logo">
    <label>{{i18n "category.logo_dark"}}</label>
    <UppyImageUploader
      @imageUrl={{this.logoImageDarkUrl}}
      @onUploadDone={{action "logoDarkUploadDone"}}
      @onUploadDeleted={{action "logoDarkUploadDeleted"}}
      @type="category_logo_dark"
      @class="no-repeat contain-image"
      @id="category-dark-logo-uploader"
    />
  </section>
  
  <section class="field category-background-image">
    <label>{{i18n "category.background_image"}}</label>
    <UppyImageUploader
      @imageUrl={{this.backgroundImageUrl}}
      @onUploadDone={{action "backgroundUploadDone"}}
      @onUploadDeleted={{action "backgroundUploadDeleted"}}
      @type="category_background"
      @id="category-background-uploader"
    />
  </section>
  */
  {
    "id": "1Wgldckd",
    "block": "[[[10,\"section\"],[14,0,\"field category-logo\"],[12],[1,\"\\n  \"],[10,\"label\"],[12],[1,[28,[35,0],[\"category.logo\"],null]],[13],[1,\"\\n  \"],[8,[39,1],null,[[\"@imageUrl\",\"@onUploadDone\",\"@onUploadDeleted\",\"@type\",\"@class\",\"@id\"],[[30,0,[\"logoImageUrl\"]],[28,[37,2],[[30,0],\"logoUploadDone\"],null],[28,[37,2],[[30,0],\"logoUploadDeleted\"],null],\"category_logo\",\"no-repeat contain-image\",\"category-logo-uploader\"]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"field category-logo\"],[12],[1,\"\\n  \"],[10,\"label\"],[12],[1,[28,[35,0],[\"category.logo_dark\"],null]],[13],[1,\"\\n  \"],[8,[39,1],null,[[\"@imageUrl\",\"@onUploadDone\",\"@onUploadDeleted\",\"@type\",\"@class\",\"@id\"],[[30,0,[\"logoImageDarkUrl\"]],[28,[37,2],[[30,0],\"logoDarkUploadDone\"],null],[28,[37,2],[[30,0],\"logoDarkUploadDeleted\"],null],\"category_logo_dark\",\"no-repeat contain-image\",\"category-dark-logo-uploader\"]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"field category-background-image\"],[12],[1,\"\\n  \"],[10,\"label\"],[12],[1,[28,[35,0],[\"category.background_image\"],null]],[13],[1,\"\\n  \"],[8,[39,1],null,[[\"@imageUrl\",\"@onUploadDone\",\"@onUploadDeleted\",\"@type\",\"@id\"],[[30,0,[\"backgroundImageUrl\"]],[28,[37,2],[[30,0],\"backgroundUploadDone\"],null],[28,[37,2],[[30,0],\"backgroundUploadDeleted\"],null],\"category_background\",\"category-background-uploader\"]],null],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"uppy-image-uploader\",\"action\"]]",
    "moduleName": "discourse/components/edit-category-images.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _editCategoryPanel.buildCategoryPanel)("images").extend((_dec = (0, _decorators.default)("category.uploaded_background.url"), _dec2 = (0, _decorators.default)("category.uploaded_logo.url"), _dec3 = (0, _decorators.default)("category.uploaded_logo_dark.url"), (_obj = {
    backgroundImageUrl(uploadedBackgroundUrl) {
      return uploadedBackgroundUrl || "";
    },
    logoImageUrl(uploadedLogoUrl) {
      return uploadedLogoUrl || "";
    },
    logoImageDarkUrl(uploadedLogoDarkUrl) {
      return uploadedLogoDarkUrl || "";
    },
    actions: {
      logoUploadDone(upload) {
        this._setFromUpload("category.uploaded_logo", upload);
      },
      logoUploadDeleted() {
        this._deleteUpload("category.uploaded_logo");
      },
      logoDarkUploadDone(upload) {
        this._setFromUpload("category.uploaded_logo_dark", upload);
      },
      logoDarkUploadDeleted() {
        this._deleteUpload("category.uploaded_logo_dark");
      },
      backgroundUploadDone(upload) {
        this._setFromUpload("category.uploaded_background", upload);
      },
      backgroundUploadDeleted() {
        this._deleteUpload("category.uploaded_background");
      }
    },
    _deleteUpload(path) {
      this.set(path, _object.default.create({
        id: null,
        url: null
      }));
    },
    _setFromUpload(path, upload) {
      this.set(path, _object.default.create({
        url: upload.url,
        id: upload.id
      }));
    }
  }, (_applyDecoratedDescriptor(_obj, "backgroundImageUrl", [_dec], Object.getOwnPropertyDescriptor(_obj, "backgroundImageUrl"), _obj), _applyDecoratedDescriptor(_obj, "logoImageUrl", [_dec2], Object.getOwnPropertyDescriptor(_obj, "logoImageUrl"), _obj), _applyDecoratedDescriptor(_obj, "logoImageDarkUrl", [_dec3], Object.getOwnPropertyDescriptor(_obj, "logoImageDarkUrl"), _obj)), _obj))));
  _exports.default = _default;
});
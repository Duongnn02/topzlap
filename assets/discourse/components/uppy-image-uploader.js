define("discourse/components/uppy-image-uploader", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "discourse/mixins/uppy-upload", "discourse-common/utils/decorators", "discourse-common/lib/get-url", "@ember/utils", "discourse/lib/lightbox", "@ember/runloop", "@ember/template", "discourse/lib/uploads", "I18n"], function (_exports, _component, _templateFactory, _computed, _uppyUpload, _decorators, _getUrl, _utils, _lightbox, _runloop, _template, _uploads, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object/computed",0,"discourse/mixins/uppy-upload",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url",0,"@ember/utils",0,"discourse/lib/lightbox",0,"@ember/runloop",0,"@ember/template",0,"discourse/lib/uploads",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div
    class="uploaded-image-preview input-xxlarge"
    style={{this.backgroundStyle}}
  >
    {{#if this.showingPlaceholder}}
      <div class="placeholder-overlay" style={{this.placeholderStyle}}></div>
    {{/if}}
    <div class="image-upload-controls">
      <label
        class="btn btn-default pad-left no-text {{if this.disabled 'disabled'}}"
        title={{this.disabledReason}}
      >
        {{d-icon "far-image"}}
        <PickFilesButton
          @fileInputDisabled={{this.disabled}}
          @fileInputClass="hidden-upload-field"
          @acceptedFormatsOverride="image/*"
        />
      </label>
  
      {{#if this.imageUrl}}
        <DButton
          @action={{action "trash"}}
          @class="btn-danger pad-left no-text"
          @icon="far-trash-alt"
          @type="button"
        />
  
        <DButton
          @icon="discourse-expand"
          @title="expand"
          @type="button"
          @class="image-uploader-lightbox-btn no-text"
          @action={{action "toggleLightbox"}}
          @disabled={{this.loadingLightbox}}
        />
      {{/if}}
  
      <span class="btn {{unless this.uploading 'hidden'}}">{{i18n
          "upload_selector.uploading"
        }}
        {{this.uploadProgress}}%</span>
      <span class="btn {{unless this.processing 'hidden'}}">{{i18n
          "upload_selector.processing"
        }}</span>
    </div>
  
    {{#if this.imageUrl}}
      <a
        class="lightbox"
        href={{this.imageCDNURL}}
        title={{this.imageFilename}}
        rel="nofollow ugc noopener"
      >
  
        <div class="meta">
          <span class="informations">
            {{this.imageWidth}}x{{this.imageHeight}}
            {{this.imageFilesize}}
          </span>
        </div>
      </a>
    {{/if}}
  </div>
  */
  {
    "id": "fJ6x37qg",
    "block": "[[[10,0],[14,0,\"uploaded-image-preview input-xxlarge\"],[15,5,[30,0,[\"backgroundStyle\"]]],[12],[1,\"\\n\"],[41,[30,0,[\"showingPlaceholder\"]],[[[1,\"    \"],[10,0],[14,0,\"placeholder-overlay\"],[15,5,[30,0,[\"placeholderStyle\"]]],[12],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[10,0],[14,0,\"image-upload-controls\"],[12],[1,\"\\n    \"],[10,\"label\"],[15,0,[29,[\"btn btn-default pad-left no-text \",[52,[30,0,[\"disabled\"]],\"disabled\"]]]],[15,\"title\",[30,0,[\"disabledReason\"]]],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"far-image\"],null]],[1,\"\\n      \"],[8,[39,2],null,[[\"@fileInputDisabled\",\"@fileInputClass\",\"@acceptedFormatsOverride\"],[[30,0,[\"disabled\"]],\"hidden-upload-field\",\"image/*\"]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"imageUrl\"]],[[[1,\"      \"],[8,[39,3],null,[[\"@action\",\"@class\",\"@icon\",\"@type\"],[[28,[37,4],[[30,0],\"trash\"],null],\"btn-danger pad-left no-text\",\"far-trash-alt\",\"button\"]],null],[1,\"\\n\\n      \"],[8,[39,3],null,[[\"@icon\",\"@title\",\"@type\",\"@class\",\"@action\",\"@disabled\"],[\"discourse-expand\",\"expand\",\"button\",\"image-uploader-lightbox-btn no-text\",[28,[37,4],[[30,0],\"toggleLightbox\"],null],[30,0,[\"loadingLightbox\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,1],[15,0,[29,[\"btn \",[52,[51,[30,0,[\"uploading\"]]],\"hidden\"]]]],[12],[1,[28,[35,6],[\"upload_selector.uploading\"],null]],[1,\"\\n      \"],[1,[30,0,[\"uploadProgress\"]]],[1,\"%\"],[13],[1,\"\\n    \"],[10,1],[15,0,[29,[\"btn \",[52,[51,[30,0,[\"processing\"]]],\"hidden\"]]]],[12],[1,[28,[35,6],[\"upload_selector.processing\"],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"imageUrl\"]],[[[1,\"    \"],[10,3],[14,0,\"lightbox\"],[15,6,[30,0,[\"imageCDNURL\"]]],[15,\"title\",[30,0,[\"imageFilename\"]]],[14,\"rel\",\"nofollow ugc noopener\"],[12],[1,\"\\n\\n      \"],[10,0],[14,0,\"meta\"],[12],[1,\"\\n        \"],[10,1],[14,0,\"informations\"],[12],[1,\"\\n          \"],[1,[30,0,[\"imageWidth\"]]],[1,\"x\"],[1,[30,0,[\"imageHeight\"]]],[1,\"\\n          \"],[1,[30,0,[\"imageFilesize\"]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[],false,[\"if\",\"d-icon\",\"pick-files-button\",\"d-button\",\"action\",\"unless\",\"i18n\"]]",
    "moduleName": "discourse/components/uppy-image-uploader.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_uppyUpload.default, (_dec = (0, _decorators.default)("disabled", "notAllowed"), _dec2 = (0, _decorators.default)("currentUser.staff", "siteSettings.{authorized_extensions,authorized_extensions_for_staff}"), _dec3 = (0, _decorators.default)("imageUrl", "placeholderUrl"), _dec4 = (0, _decorators.default)("placeholderUrl"), _dec5 = (0, _decorators.default)("imageUrl"), _dec6 = (0, _decorators.default)("imageCDNURL"), _dec7 = (0, _decorators.default)("imageUrl"), _dec8 = (0, _decorators.on)("didRender"), _dec9 = (0, _decorators.on)("willDestroyElement"), (_obj = {
    classNames: ["image-uploader"],
    disabled: (0, _computed.or)("notAllowed", "uploading", "processing"),
    disabledReason(disabled, notAllowed) {
      if (disabled && notAllowed) {
        return _I18n.default.t("post.errors.no_uploads_authorized");
      }
    },
    notAllowed() {
      return !(0, _uploads.authorizesOneOrMoreExtensions)(this.currentUser?.staff, this.siteSettings);
    },
    showingPlaceholder(imageUrl, placeholderUrl) {
      return !imageUrl && placeholderUrl;
    },
    placeholderStyle(url) {
      if ((0, _utils.isEmpty)(url)) {
        return (0, _template.htmlSafe)("");
      }
      return (0, _template.htmlSafe)(`background-image: url(${url})`);
    },
    imageCDNURL(url) {
      if ((0, _utils.isEmpty)(url)) {
        return (0, _template.htmlSafe)("");
      }
      return (0, _getUrl.getURLWithCDN)(url);
    },
    backgroundStyle(url) {
      return (0, _template.htmlSafe)(`background-image: url(${url})`);
    },
    imageBaseName(imageUrl) {
      if ((0, _utils.isEmpty)(imageUrl)) {
        return;
      }
      return imageUrl.split("/").slice(-1)[0];
    },
    validateUploadedFilesOptions() {
      return {
        imagesOnly: true
      };
    },
    _uppyReady() {
      this._onPreProcessComplete(() => {
        this.set("processing", false);
      });
    },
    uploadDone(upload) {
      this.setProperties({
        imageFilesize: upload.human_filesize,
        imageFilename: upload.original_filename,
        imageWidth: upload.width,
        imageHeight: upload.height
      });

      // the value of the property used for imageUrl should be set
      // in this callback. this should be done in cases where imageUrl
      // is bound to a computed property of the parent component.
      if (this.onUploadDone) {
        this.onUploadDone(upload);
      } else {
        this.set("imageUrl", upload.url);
      }
    },
    _applyLightbox() {
      (0, _runloop.next)(() => (0, _lightbox.default)(this.element, this.siteSettings));
    },
    _closeOnRemoval() {
      if ($.magnificPopup?.instance) {
        $.magnificPopup.instance.close();
      }
    },
    actions: {
      toggleLightbox() {
        $(this.element.querySelector("a.lightbox"))?.magnificPopup("open");
      },
      trash() {
        // uppy needs to be reset to allow for more uploads
        this._reset();

        // the value of the property used for imageUrl should be cleared
        // in this callback. this should be done in cases where imageUrl
        // is bound to a computed property of the parent component.
        if (this.onUploadDeleted) {
          this.onUploadDeleted();
        } else {
          this.setProperties({
            imageUrl: null
          });
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "disabledReason", [_dec], Object.getOwnPropertyDescriptor(_obj, "disabledReason"), _obj), _applyDecoratedDescriptor(_obj, "notAllowed", [_dec2], Object.getOwnPropertyDescriptor(_obj, "notAllowed"), _obj), _applyDecoratedDescriptor(_obj, "showingPlaceholder", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showingPlaceholder"), _obj), _applyDecoratedDescriptor(_obj, "placeholderStyle", [_dec4], Object.getOwnPropertyDescriptor(_obj, "placeholderStyle"), _obj), _applyDecoratedDescriptor(_obj, "imageCDNURL", [_dec5], Object.getOwnPropertyDescriptor(_obj, "imageCDNURL"), _obj), _applyDecoratedDescriptor(_obj, "backgroundStyle", [_dec6], Object.getOwnPropertyDescriptor(_obj, "backgroundStyle"), _obj), _applyDecoratedDescriptor(_obj, "imageBaseName", [_dec7], Object.getOwnPropertyDescriptor(_obj, "imageBaseName"), _obj), _applyDecoratedDescriptor(_obj, "_applyLightbox", [_dec8], Object.getOwnPropertyDescriptor(_obj, "_applyLightbox"), _obj), _applyDecoratedDescriptor(_obj, "_closeOnRemoval", [_dec9], Object.getOwnPropertyDescriptor(_obj, "_closeOnRemoval"), _obj)), _obj))));
  _exports.default = _default;
});
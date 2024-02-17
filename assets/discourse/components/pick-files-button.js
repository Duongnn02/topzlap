define("discourse/components/pick-files-button", ["exports", "@ember/component", "@ember/template-factory", "@ember/utils", "discourse/lib/uploads", "@ember/object", "discourse-common/utils/decorators", "I18n", "@ember/service"], function (_exports, _component, _templateFactory, _utils, _uploads, _object, _decorators, _I18n, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/utils",0,"discourse/lib/uploads",0,"@ember/object",0,"discourse-common/utils/decorators",0,"I18n",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.showButton}}
    <DButton
      @action={{action "openSystemFilePicker"}}
      @label={{this.label}}
      @icon={{this.icon}}
    />
  {{/if}}
  {{#if this.acceptsAllFormats}}
    <input
      type="file"
      id={{this.fileInputId}}
      class={{this.fileInputClass}}
      multiple={{this.allowMultiple}}
      disabled={{this.fileInputDisabled}}
    />
  {{else}}
    <input
      type="file"
      id={{this.fileInputId}}
      class={{this.fileInputClass}}
      accept={{this.acceptedFormats}}
      multiple={{this.allowMultiple}}
      disabled={{this.fileInputDisabled}}
    />
  {{/if}}
  */
  {
    "id": "+leCynKR",
    "block": "[[[41,[30,0,[\"showButton\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@action\",\"@label\",\"@icon\"],[[28,[37,2],[[30,0],\"openSystemFilePicker\"],null],[30,0,[\"label\"]],[30,0,[\"icon\"]]]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"acceptsAllFormats\"]],[[[1,\"  \"],[10,\"input\"],[15,1,[30,0,[\"fileInputId\"]]],[15,0,[30,0,[\"fileInputClass\"]]],[15,\"multiple\",[30,0,[\"allowMultiple\"]]],[15,\"disabled\",[30,0,[\"fileInputDisabled\"]]],[14,4,\"file\"],[12],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,\"input\"],[15,1,[30,0,[\"fileInputId\"]]],[15,0,[30,0,[\"fileInputClass\"]]],[15,\"accept\",[30,0,[\"acceptedFormats\"]]],[15,\"multiple\",[30,0,[\"allowMultiple\"]]],[15,\"disabled\",[30,0,[\"fileInputDisabled\"]]],[14,4,\"file\"],[12],[13],[1,\"\\n\"]],[]]]],[],false,[\"if\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/components/pick-files-button.hbs",
    "isStrictMode": false
  });
  // This picker is intended to be used with UppyUploadMixin or with
  // ComposerUploadUppy, which is why there are no change events registered
  // for the input. They are handled by the uppy mixins directly.
  //
  // However, if you provide an onFilesPicked action to this component, the change
  // binding will still be added, and the file type will be validated here. This
  // is sometimes useful if you need to do something outside the uppy upload with
  // the file, such as directly using JSON or CSV data from a file in JS.
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)(), _dec2 = (0, _decorators.default)(), (_obj = {
    dialog: (0, _service.inject)(),
    fileInputId: null,
    fileInputClass: null,
    fileInputDisabled: false,
    classNames: ["pick-files-button"],
    acceptedFormatsOverride: null,
    allowMultiple: false,
    showButton: false,
    didInsertElement() {
      this._super(...arguments);
      if (this.onFilesPicked) {
        const fileInput = this.element.querySelector("input");
        this.set("fileInput", fileInput);
        fileInput.addEventListener("change", this.onChange, false);
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      if (this.onFilesPicked) {
        this.fileInput.removeEventListener("change", this.onChange);
      }
    },
    onChange() {
      const files = this.fileInput.files;
      this._filesPicked(files);
    },
    acceptsAllFormats() {
      return this.capabilities.isIOS || (0, _uploads.authorizesAllExtensions)(this.currentUser.staff, this.siteSettings);
    },
    acceptedFormats() {
      // the acceptedFormatsOverride can be a list of extensions or mime types
      if (!(0, _utils.isBlank)(this.acceptedFormatsOverride)) {
        return this.acceptedFormatsOverride;
      }
      const extensions = (0, _uploads.authorizedExtensions)(this.currentUser.staff, this.siteSettings);
      return extensions.map(ext => `.${ext}`).join();
    },
    openSystemFilePicker() {
      this.fileInput.click();
    },
    _filesPicked(files) {
      if (!files || !files.length) {
        return;
      }
      if (!this._haveAcceptedTypes(files)) {
        const message = _I18n.default.t("pick_files_button.unsupported_file_picked", {
          types: this.acceptedFileTypesString
        });
        this.dialog.alert(message);
        return;
      }
      this.onFilesPicked(files);
    },
    _haveAcceptedTypes(files) {
      for (const file of files) {
        if (!this._hasAcceptedExtensionOrType(file)) {
          return false;
        }
      }
      return true;
    },
    _hasAcceptedExtensionOrType(file) {
      const extension = this._fileExtension(file.name);
      return this.acceptedFormats.includes(`.${extension}`) || this.acceptedFormats.includes(file.type);
    },
    _fileExtension(fileName) {
      return fileName.split(".").pop();
    }
  }, (_applyDecoratedDescriptor(_obj, "onChange", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onChange"), _obj), _applyDecoratedDescriptor(_obj, "acceptsAllFormats", [_dec], Object.getOwnPropertyDescriptor(_obj, "acceptsAllFormats"), _obj), _applyDecoratedDescriptor(_obj, "acceptedFormats", [_dec2], Object.getOwnPropertyDescriptor(_obj, "acceptedFormats"), _obj), _applyDecoratedDescriptor(_obj, "openSystemFilePicker", [_object.action], Object.getOwnPropertyDescriptor(_obj, "openSystemFilePicker"), _obj)), _obj))));
  _exports.default = _default;
});
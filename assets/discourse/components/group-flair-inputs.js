define("discourse/components/group-flair-inputs", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "I18n", "@ember/object", "discourse/lib/ajax", "discourse-common/lib/icon-library", "discourse-common/lib/debounce", "discourse-common/lib/get-url"], function (_exports, _component, _templateFactory, _decorators, _I18n, _object, _ajax, _iconLibrary, _debounce, _getUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/component",0,"I18n",0,"@ember/object",0,"discourse/lib/ajax",0,"discourse-common/lib/icon-library",0,"discourse-common/lib/debounce",0,"discourse-common/lib/get-url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group">
    <label class="control-label" for="flair_url">{{i18n
        "groups.flair_url"
      }}</label>
  
    <div class="radios">
      <label class="radio-label" for="avatar-flair-icon">
        <RadioButton
          @name="avatar-flair-icon"
          @id="avatar-flair-icon"
          @value="icon"
          @selection={{this.model.flair_type}}
        />
        <b>{{i18n "groups.flair_type.icon"}}</b>
      </label>
  
      <label class="radio-label" for="avatar-flair-image">
        <RadioButton
          @name="avatar-flair-image"
          @id="avatar-flair-image"
          @value="image"
          @selection={{this.model.flair_type}}
        />
        <b>{{i18n "groups.flair_type.image"}}</b>
      </label>
    </div>
  
    {{#if this.flairPreviewIcon}}
      <IconPicker
        @name="icon"
        @value={{this.model.flair_icon}}
        @options={{hash maximum=1}}
        @onChange={{action (mut this.model.flair_icon)}}
      />
    {{else if this.flairPreviewImage}}
      <UppyImageUploader
        @imageUrl={{this.flairImageUrl}}
        @onUploadDone={{action "setFlairImage"}}
        @onUploadDeleted={{action "removeFlairImage"}}
        @type="group_flair"
        @id="group-flair-uploader"
        @class="no-repeat contain-image"
      />
      <div class="control-instructions">
        {{i18n "groups.flair_upload_description"}}
      </div>
    {{/if}}
  </div>
  
  <div class="control-group">
    <label class="control-label" for="flair_bg_color">{{i18n
        "groups.flair_bg_color"
      }}</label>
  
    <TextField
      @name="flair_bg_color"
      @class="group-flair-bg-color input-xxlarge"
      @value={{this.model.flair_bg_color}}
      @placeholderKey="groups.flair_bg_color_placeholder"
    />
  </div>
  
  {{#if this.flairPreviewIcon}}
    <div class="control-group">
      <label class="control-label" for="flair_color">{{i18n
          "groups.flair_color"
        }}</label>
  
      <TextField
        @name="flair_color"
        @class="group-flair-color input-xxlarge"
        @value={{this.model.flair_color}}
        @placeholderKey="groups.flair_color_placeholder"
      />
    </div>
  {{/if}}
  
  <div class="control-group">
    <label class="control-label">{{this.flairPreviewLabel}}</label>
  
    <div class="avatar-flair-preview">
      <div class="avatar-wrapper">
        <img
          width="45"
          height="45"
          src={{this.demoAvatarUrl}}
          class="avatar actor"
          alt=""
          role="presentation"
        />
      </div>
  
      {{#if
        (or
          this.model.flair_icon
          this.flairImageUrl
          this.model.flairBackgroundHexColor
        )
      }}
        <AvatarFlair
          @flairName={{this.model.name}}
          @flairUrl={{if
            this.flairPreviewIcon
            this.model.flair_icon
            (if this.flairPreviewImage this.flairImageUrl "")
          }}
          @flairBgColor={{this.model.flairBackgroundHexColor}}
          @flairColor={{this.model.flairHexColor}}
        />
      {{/if}}
    </div>
  </div>
  */
  {
    "id": "zMAukuOh",
    "block": "[[[10,0],[14,0,\"control-group\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"flair_url\"],[12],[1,[28,[35,0],[\"groups.flair_url\"],null]],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"radios\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"radio-label\"],[14,\"for\",\"avatar-flair-icon\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@name\",\"@id\",\"@value\",\"@selection\"],[\"avatar-flair-icon\",\"avatar-flair-icon\",\"icon\",[30,0,[\"model\",\"flair_type\"]]]],null],[1,\"\\n      \"],[10,\"b\"],[12],[1,[28,[35,0],[\"groups.flair_type.icon\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,\"label\"],[14,0,\"radio-label\"],[14,\"for\",\"avatar-flair-image\"],[12],[1,\"\\n      \"],[8,[39,1],null,[[\"@name\",\"@id\",\"@value\",\"@selection\"],[\"avatar-flair-image\",\"avatar-flair-image\",\"image\",[30,0,[\"model\",\"flair_type\"]]]],null],[1,\"\\n      \"],[10,\"b\"],[12],[1,[28,[35,0],[\"groups.flair_type.image\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"flairPreviewIcon\"]],[[[1,\"    \"],[8,[39,3],null,[[\"@name\",\"@value\",\"@options\",\"@onChange\"],[\"icon\",[30,0,[\"model\",\"flair_icon\"]],[28,[37,4],null,[[\"maximum\"],[1]]],[28,[37,5],[[30,0],[28,[37,6],[[30,0,[\"model\",\"flair_icon\"]]],null]],null]]],null],[1,\"\\n\"]],[]],[[[41,[30,0,[\"flairPreviewImage\"]],[[[1,\"    \"],[8,[39,7],null,[[\"@imageUrl\",\"@onUploadDone\",\"@onUploadDeleted\",\"@type\",\"@id\",\"@class\"],[[30,0,[\"flairImageUrl\"]],[28,[37,5],[[30,0],\"setFlairImage\"],null],[28,[37,5],[[30,0],\"removeFlairImage\"],null],\"group_flair\",\"group-flair-uploader\",\"no-repeat contain-image\"]],null],[1,\"\\n    \"],[10,0],[14,0,\"control-instructions\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"groups.flair_upload_description\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]],null]],[]]],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"flair_bg_color\"],[12],[1,[28,[35,0],[\"groups.flair_bg_color\"],null]],[13],[1,\"\\n\\n  \"],[8,[39,8],null,[[\"@name\",\"@class\",\"@value\",\"@placeholderKey\"],[\"flair_bg_color\",\"group-flair-bg-color input-xxlarge\",[30,0,[\"model\",\"flair_bg_color\"]],\"groups.flair_bg_color_placeholder\"]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"flairPreviewIcon\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"flair_color\"],[12],[1,[28,[35,0],[\"groups.flair_color\"],null]],[13],[1,\"\\n\\n    \"],[8,[39,8],null,[[\"@name\",\"@class\",\"@value\",\"@placeholderKey\"],[\"flair_color\",\"group-flair-color input-xxlarge\",[30,0,[\"model\",\"flair_color\"]],\"groups.flair_color_placeholder\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[30,0,[\"flairPreviewLabel\"]]],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"avatar-flair-preview\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"avatar-wrapper\"],[12],[1,\"\\n      \"],[10,\"img\"],[14,\"width\",\"45\"],[14,\"height\",\"45\"],[15,\"src\",[30,0,[\"demoAvatarUrl\"]]],[14,0,\"avatar actor\"],[14,\"alt\",\"\"],[14,\"role\",\"presentation\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[28,[37,9],[[30,0,[\"model\",\"flair_icon\"]],[30,0,[\"flairImageUrl\"]],[30,0,[\"model\",\"flairBackgroundHexColor\"]]],null],[[[1,\"      \"],[8,[39,10],null,[[\"@flairName\",\"@flairUrl\",\"@flairBgColor\",\"@flairColor\"],[[30,0,[\"model\",\"name\"]],[52,[30,0,[\"flairPreviewIcon\"]],[30,0,[\"model\",\"flair_icon\"]],[52,[30,0,[\"flairPreviewImage\"]],[30,0,[\"flairImageUrl\"]],\"\"]],[30,0,[\"model\",\"flairBackgroundHexColor\"]],[30,0,[\"model\",\"flairHexColor\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"radio-button\",\"if\",\"icon-picker\",\"hash\",\"action\",\"mut\",\"uppy-image-uploader\",\"text-field\",\"or\",\"avatar-flair\"]]",
    "moduleName": "discourse/components/group-flair-inputs.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("model.flair_type"), _dec2 = (0, _decorators.default)("model.flair_icon"), _dec3 = (0, _decorators.on)("didInsertElement"), _dec4 = (0, _decorators.observes)("model.flair_icon"), _dec5 = (0, _decorators.default)("model.flair_type"), _dec6 = (0, _decorators.default)("model.flair_url"), _dec7 = (0, _decorators.default)("flairPreviewImage"), (_obj = {
    classNames: ["group-flair-inputs"],
    demoAvatarUrl() {
      return (0, _getUrl.default)("/images/avatar.png");
    },
    flairPreviewIcon(flairType) {
      return flairType && flairType === "icon";
    },
    flairPreviewIconUrl(flairIcon) {
      return flairIcon ? (0, _iconLibrary.convertIconClass)(flairIcon) : "";
    },
    _loadSVGIcon(flairIcon) {
      if (flairIcon) {
        (0, _debounce.default)(this, this._loadIcon, 1000);
      }
    },
    _loadIcon() {
      if (!this.model.flair_icon) {
        return;
      }
      const icon = (0, _iconLibrary.convertIconClass)(this.model.flair_icon),
        c = "#svg-sprites",
        h = "ajax-icon-holder",
        singleIconEl = `${c} .${h}`;
      if (!icon) {
        return;
      }
      if (!$(`${c} symbol#${icon}`).length) {
        (0, _ajax.ajax)(`/svg-sprite/search/${icon}`).then(function (data) {
          if ($(singleIconEl).length === 0) {
            $(c).append(`<div class="${h}">`);
          }
          $(singleIconEl).html(`<svg xmlns='http://www.w3.org/2000/svg' style='display: none;'>${data}</svg>`);
        });
      }
    },
    flairPreviewImage(flairType) {
      return flairType && flairType === "image";
    },
    flairImageUrl(flairUrl) {
      return flairUrl && flairUrl.includes("/") ? flairUrl : null;
    },
    flairPreviewLabel(flairPreviewImage) {
      const key = flairPreviewImage ? "image" : "icon";
      return _I18n.default.t(`groups.flair_preview_${key}`);
    },
    setFlairImage(upload) {
      this.model.setProperties({
        flair_url: (0, _getUrl.default)(upload.url),
        flair_upload_id: upload.id
      });
    },
    removeFlairImage() {
      this.model.setProperties({
        flair_url: null,
        flair_upload_id: null
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "demoAvatarUrl", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "demoAvatarUrl"), _obj), _applyDecoratedDescriptor(_obj, "flairPreviewIcon", [_dec], Object.getOwnPropertyDescriptor(_obj, "flairPreviewIcon"), _obj), _applyDecoratedDescriptor(_obj, "flairPreviewIconUrl", [_dec2], Object.getOwnPropertyDescriptor(_obj, "flairPreviewIconUrl"), _obj), _applyDecoratedDescriptor(_obj, "_loadSVGIcon", [_dec3, _dec4], Object.getOwnPropertyDescriptor(_obj, "_loadSVGIcon"), _obj), _applyDecoratedDescriptor(_obj, "flairPreviewImage", [_dec5], Object.getOwnPropertyDescriptor(_obj, "flairPreviewImage"), _obj), _applyDecoratedDescriptor(_obj, "flairImageUrl", [_dec6], Object.getOwnPropertyDescriptor(_obj, "flairImageUrl"), _obj), _applyDecoratedDescriptor(_obj, "flairPreviewLabel", [_dec7], Object.getOwnPropertyDescriptor(_obj, "flairPreviewLabel"), _obj), _applyDecoratedDescriptor(_obj, "setFlairImage", [_object.action], Object.getOwnPropertyDescriptor(_obj, "setFlairImage"), _obj), _applyDecoratedDescriptor(_obj, "removeFlairImage", [_object.action], Object.getOwnPropertyDescriptor(_obj, "removeFlairImage"), _obj)), _obj))));
  _exports.default = _default;
});
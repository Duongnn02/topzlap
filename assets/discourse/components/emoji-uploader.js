define("discourse/components/emoji-uploader", ["exports", "@ember/component", "@ember/template-factory", "I18n", "@ember/utils", "discourse/mixins/uppy-upload", "@ember/object", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _component, _templateFactory, _I18n, _utils, _uppyUpload, _object, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"@ember/utils",0,"discourse/mixins/uppy-upload",0,"@ember/object",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="emoji-uploader form-horizontal">
    <div class="control-group">
      <span class="label">
        {{i18n "admin.emoji.name"}}
      </span>
      <div class="input">
        <Input
          id="emoji-name"
          name="name"
          placeholder={{i18n "admin.emoji.name"}}
          @value={{readonly this.name}}
          {{on "input" (action (mut this.name) value="target.value")}}
        />
      </div>
    </div>
    <div class="control-group">
      <span class="label">
        {{i18n "admin.emoji.group"}}
      </span>
      <div class="input">
        <ComboBox
          @name="group"
          @id="emoji-group-selector"
          @value={{this.group}}
          @content={{this.newEmojiGroups}}
          @onChange={{action "createEmojiGroup"}}
          @valueProperty={{null}}
          @nameProperty={{null}}
          @options={{hash allowAny=true}}
        />
      </div>
    </div>
    <div class="control-group">
      <div class="input">
        <input
          class="hidden-upload-field"
          disabled={{this.uploading}}
          type="file"
          multiple="true"
          accept=".png,.gif"
        />
        <DButton
          @class="btn-primary"
          @translatedLabel={{this.buttonLabel}}
          @icon="plus"
          @action={{action "chooseFiles"}}
          @disabled={{this.uploading}}
        />
      </div>
    </div>
  </div>
  */
  {
    "id": "8MGvt300",
    "block": "[[[10,0],[14,0,\"emoji-uploader form-horizontal\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"label\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"admin.emoji.name\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"input\"],[12],[1,\"\\n      \"],[8,[39,1],[[24,1,\"emoji-name\"],[24,3,\"name\"],[16,\"placeholder\",[28,[37,0],[\"admin.emoji.name\"],null]],[4,[38,3],[\"input\",[28,[37,4],[[30,0],[28,[37,5],[[30,0,[\"name\"]]],null]],[[\"value\"],[\"target.value\"]]]],null]],[[\"@value\"],[[28,[37,2],[[30,0,[\"name\"]]],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"label\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"admin.emoji.group\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"input\"],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@name\",\"@id\",\"@value\",\"@content\",\"@onChange\",\"@valueProperty\",\"@nameProperty\",\"@options\"],[\"group\",\"emoji-group-selector\",[30,0,[\"group\"]],[30,0,[\"newEmojiGroups\"]],[28,[37,4],[[30,0],\"createEmojiGroup\"],null],null,null,[28,[37,7],null,[[\"allowAny\"],[true]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"input\"],[12],[1,\"\\n      \"],[10,\"input\"],[14,0,\"hidden-upload-field\"],[15,\"disabled\",[30,0,[\"uploading\"]]],[14,\"multiple\",\"true\"],[14,\"accept\",\".png,.gif\"],[14,4,\"file\"],[12],[13],[1,\"\\n      \"],[8,[39,8],null,[[\"@class\",\"@translatedLabel\",\"@icon\",\"@action\",\"@disabled\"],[\"btn-primary\",[30,0,[\"buttonLabel\"]],\"plus\",[28,[37,4],[[30,0],\"chooseFiles\"],null],[30,0,[\"uploading\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"input\",\"readonly\",\"on\",\"action\",\"mut\",\"combo-box\",\"hash\",\"d-button\"]]",
    "moduleName": "discourse/components/emoji-uploader.hbs",
    "isStrictMode": false
  });
  const DEFAULT_GROUP = "default";
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_uppyUpload.default, (_dec = (0, _decorators.default)("uploading", "uploadProgress"), _dec2 = (0, _decorators.default)("uploading"), (_obj = {
    type: "emoji",
    uploadUrl: "/admin/customize/emojis",
    hasName: (0, _computed.notEmpty)("name"),
    hasGroup: (0, _computed.notEmpty)("group"),
    group: "default",
    emojiGroups: null,
    newEmojiGroups: null,
    tagName: null,
    preventDirectS3Uploads: true,
    didReceiveAttrs() {
      this._super(...arguments);
      this.set("newEmojiGroups", this.emojiGroups);
    },
    createEmojiGroup(group) {
      let newEmojiGroups = this.newEmojiGroups;
      if (group !== DEFAULT_GROUP) {
        newEmojiGroups = this.emojiGroups.concat([group]).uniq();
      }
      this.setProperties({
        newEmojiGroups,
        group
      });
    },
    _perFileData() {
      const payload = {};
      if (!(0, _utils.isEmpty)(this.name)) {
        payload.name = this.name;

        // if uploading multiple files, we can't use the name for every emoji
        this.set("name", null);
      }
      if (!(0, _utils.isEmpty)(this.group) && this.group !== DEFAULT_GROUP) {
        payload.group = this.group;
      }
      return payload;
    },
    validateUploadedFilesOptions() {
      return {
        imagesOnly: true
      };
    },
    uploadDone(upload) {
      this.done(upload, this.group);
      this.set("name", null);
    },
    chooseFiles() {
      this.fileInputEl.click();
    },
    buttonLabel(uploading, uploadProgress) {
      if (uploading) {
        return `${_I18n.default.t("admin.emoji.uploading")} ${uploadProgress}%`;
      } else {
        return _I18n.default.t("admin.emoji.add");
      }
    },
    buttonIcon(uploading) {
      if (uploading) {
        return "spinner";
      } else {
        return "plus";
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "createEmojiGroup", [_object.action], Object.getOwnPropertyDescriptor(_obj, "createEmojiGroup"), _obj), _applyDecoratedDescriptor(_obj, "chooseFiles", [_object.action], Object.getOwnPropertyDescriptor(_obj, "chooseFiles"), _obj), _applyDecoratedDescriptor(_obj, "buttonLabel", [_dec], Object.getOwnPropertyDescriptor(_obj, "buttonLabel"), _obj), _applyDecoratedDescriptor(_obj, "buttonIcon", [_dec2], Object.getOwnPropertyDescriptor(_obj, "buttonIcon"), _obj)), _obj))));
  _exports.default = _default;
});
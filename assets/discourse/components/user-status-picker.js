define("discourse/components/user-status-picker", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "@ember/runloop", "discourse/lib/text", "discourse/lib/utilities"], function (_exports, _component, _templateFactory, _object, _runloop, _text, _utilities) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _class;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"@ember/runloop",0,"discourse/lib/text",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="user-status-picker-wrap">
    <div
      class="emoji-picker-anchor user-status-picker
        {{if this.isFocused 'focused'}}"
    >
      <button
        type="button"
        class="btn-emoji btn-flat"
        onclick={{action "toggleEmojiPicker"}}
        {{on "focus" this.focus}}
        {{on "blur" this.blur}}
      >
        {{#if @status.emoji}}
          {{html-safe this.emojiHtml}}
        {{else}}
          {{d-icon "discourse-emojis"}}
        {{/if}}
      </button>
      <Input
        class="user-status-description"
        @value={{@status.description}}
        maxlength="100"
        placeholder={{i18n "user_status.what_are_you_doing"}}
        {{on "input" this.setDefaultEmoji}}
        {{on "focus" this.focus}}
        {{on "blur" this.blur}}
      />
    </div>
  </div>
  <EmojiPicker
    @isActive={{this.emojiPickerIsActive}}
    @emojiSelected={{action "emojiSelected"}}
    @onEmojiPickerClose={{action "onEmojiPickerOutsideClick"}}
    @placement="bottom"
  />
  */
  {
    "id": "2REdfwkS",
    "block": "[[[10,0],[14,0,\"user-status-picker-wrap\"],[12],[1,\"\\n  \"],[10,0],[15,0,[29,[\"emoji-picker-anchor user-status-picker\\n      \",[52,[30,0,[\"isFocused\"]],\"focused\"]]]],[12],[1,\"\\n    \"],[11,\"button\"],[24,0,\"btn-emoji btn-flat\"],[16,\"onclick\",[28,[37,1],[[30,0],\"toggleEmojiPicker\"],null]],[24,4,\"button\"],[4,[38,2],[\"focus\",[30,0,[\"focus\"]]],null],[4,[38,2],[\"blur\",[30,0,[\"blur\"]]],null],[12],[1,\"\\n\"],[41,[30,1,[\"emoji\"]],[[[1,\"        \"],[1,[28,[35,3],[[30,0,[\"emojiHtml\"]]],null]],[1,\"\\n\"]],[]],[[[1,\"        \"],[1,[28,[35,4],[\"discourse-emojis\"],null]],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n    \"],[8,[39,5],[[24,0,\"user-status-description\"],[24,\"maxlength\",\"100\"],[16,\"placeholder\",[28,[37,6],[\"user_status.what_are_you_doing\"],null]],[4,[38,2],[\"input\",[30,0,[\"setDefaultEmoji\"]]],null],[4,[38,2],[\"focus\",[30,0,[\"focus\"]]],null],[4,[38,2],[\"blur\",[30,0,[\"blur\"]]],null]],[[\"@value\"],[[30,1,[\"description\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[8,[39,7],null,[[\"@isActive\",\"@emojiSelected\",\"@onEmojiPickerClose\",\"@placement\"],[[30,0,[\"emojiPickerIsActive\"]],[28,[37,1],[[30,0],\"emojiSelected\"],null],[28,[37,1],[[30,0],\"onEmojiPickerOutsideClick\"],null],\"bottom\"]],null]],[\"@status\"],false,[\"if\",\"action\",\"on\",\"html-safe\",\"d-icon\",\"input\",\"i18n\",\"emoji-picker\"]]",
    "moduleName": "discourse/components/user-status-picker.hbs",
    "isStrictMode": false
  });
  let UserStatusPicker = (_dec = (0, _object.computed)("status.emoji"), (_class = class UserStatusPicker extends _component.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "tagName", "");
      _defineProperty(this, "isFocused", false);
      _defineProperty(this, "emojiPickerIsActive", false);
    }
    didInsertElement() {
      this._super(...arguments);
      if (!this.status) {
        this.set("status", {});
      }
    }
    get emojiHtml() {
      const emoji = (0, _utilities.escapeExpression)(`:${this.status.emoji}:`);
      return (0, _text.emojiUnescape)(emoji);
    }
    blur() {
      this.set("isFocused", false);
    }
    emojiSelected(emoji) {
      this.set("status.emoji", emoji);
      this.set("emojiPickerIsActive", false);
      (0, _runloop.scheduleOnce)("afterRender", () => {
        document.querySelector(".btn-emoji")?.focus();
      });
    }
    focus() {
      this.set("isFocused", true);
    }
    onEmojiPickerOutsideClick() {
      this.set("emojiPickerIsActive", false);
    }
    setDefaultEmoji() {
      if (!this.status.emoji) {
        this.set("status.emoji", "speech_balloon");
      }
    }
    toggleEmojiPicker(event) {
      event.stopPropagation();
      this.set("emojiPickerIsActive", !this.emojiPickerIsActive);
    }
  }, (_applyDecoratedDescriptor(_class.prototype, "emojiHtml", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "emojiHtml"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "blur", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "blur"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "emojiSelected", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "emojiSelected"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "focus", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "focus"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onEmojiPickerOutsideClick", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onEmojiPickerOutsideClick"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setDefaultEmoji", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "setDefaultEmoji"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "toggleEmojiPicker", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "toggleEmojiPicker"), _class.prototype)), _class));
  _exports.default = UserStatusPicker;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserStatusPicker);
});
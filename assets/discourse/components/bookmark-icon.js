define("discourse/components/bookmark-icon", ["exports", "@ember/component", "@ember/template-factory", "@ember/utils", "I18n", "discourse/lib/bookmark", "@ember/object", "discourse/models/bookmark"], function (_exports, _component, _templateFactory, _utils, _I18n, _bookmark, _object, _bookmark2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _class;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/utils",0,"I18n",0,"discourse/lib/bookmark",0,"@ember/object",0,"@ember/component",0,"discourse/models/bookmark"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{d-icon this.icon translatedTitle=this.title class=this.cssClasses}}
  */
  {
    "id": "d+6KRt2O",
    "block": "[[[1,[28,[35,0],[[30,0,[\"icon\"]]],[[\"translatedTitle\",\"class\"],[[30,0,[\"title\"]],[30,0,[\"cssClasses\"]]]]]]],[],false,[\"d-icon\"]]",
    "moduleName": "discourse/components/bookmark-icon.hbs",
    "isStrictMode": false
  });
  let BookmarkIcon = (_dec = (0, _object.computed)("bookmark.reminder_at"), _dec2 = (0, _object.computed)("bookmark"), _dec3 = (0, _object.computed)("bookmark.name", "bookmark.reminder_at"), (_class = class BookmarkIcon extends _component.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "tagName", "");
      _defineProperty(this, "bookmark", null);
    }
    get icon() {
      if (!this.bookmark) {
        return _bookmark2.NO_REMINDER_ICON;
      }
      if (!(0, _utils.isEmpty)(this.bookmark.reminder_at)) {
        return _bookmark2.WITH_REMINDER_ICON;
      }
      return _bookmark2.NO_REMINDER_ICON;
    }
    get cssClasses() {
      return this.bookmark ? "bookmark-icon bookmark-icon__bookmarked" : "bookmark-icon";
    }
    get title() {
      if (!this.bookmark) {
        return _I18n.default.t("bookmarks.create");
      }
      if (!(0, _utils.isEmpty)(this.bookmark.reminder_at)) {
        const formattedTime = (0, _bookmark.formattedReminderTime)(this.bookmark.reminder_at, this.currentUser.user_option.timezone);
        return _I18n.default.t("bookmarks.created_with_reminder_generic", {
          date: formattedTime,
          name: this.bookmark.name
        });
      }
      return _I18n.default.t("bookmarks.created_generic", {
        name: this.bookmark.name
      });
    }
  }, (_applyDecoratedDescriptor(_class.prototype, "icon", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "icon"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "cssClasses", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "cssClasses"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "title", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "title"), _class.prototype)), _class));
  _exports.default = BookmarkIcon;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, BookmarkIcon);
});
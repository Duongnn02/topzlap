define("discourse/components/sidebar/user/section", ["exports", "I18n", "discourse/lib/show-modal", "discourse-common/lib/icon-library", "@ember/template", "discourse/components/sidebar/user/section-link", "@glimmer/tracking", "discourse-common/utils/decorators", "discourse/lib/ajax"], function (_exports, _I18n, _showModal, _iconLibrary, _template, _sectionLink, _tracking, _decorators, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/show-modal",0,"discourse-common/lib/icon-library",0,"@ember/template",0,"discourse/components/sidebar/user/section-link",0,"@glimmer/tracking",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let Section = (_class = class Section {
    constructor(_ref) {
      let {
        section,
        currentUser,
        router
      } = _ref;
      _initializerDefineProperty(this, "dragCss", _descriptor, this);
      _initializerDefineProperty(this, "links", _descriptor2, this);
      this.section = section;
      this.router = router;
      this.currentUser = currentUser;
      this.slug = section.slug;
      this.links = this.section.links.map(link => {
        return new _sectionLink.default(link, this, this.router);
      });
    }
    get decoratedTitle() {
      return this.section.public && this.currentUser?.staff ? (0, _template.htmlSafe)(`${(0, _iconLibrary.iconHTML)("globe")} ${this.section.title}`) : this.section.title;
    }
    get headerActions() {
      if (!this.section.public || this.currentUser?.staff) {
        return [{
          action: () => {
            return (0, _showModal.default)("sidebar-section-form", {
              model: this.section
            });
          },
          title: _I18n.default.t("sidebar.sections.custom.edit")
        }];
      }
    }
    disable() {
      this.dragCss = "disabled";
    }
    enable() {
      this.dragCss = null;
    }
    moveLinkDown(link) {
      const position = this.links.indexOf(link) + 1;
      this.links = this.links.removeObject(link);
      this.links.splice(position, 0, link);
    }
    moveLinkUp(link) {
      const position = this.links.indexOf(link) - 1;
      this.links = this.links.removeObject(link);
      this.links.splice(position, 0, link);
    }
    reorder() {
      return (0, _ajax.ajax)(`/sidebar_sections/reorder`, {
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify({
          sidebar_section_id: this.section.id,
          links_order: this.links.map(link => link.id)
        })
      });
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "dragCss", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "links", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "disable", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "disable"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "enable", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "enable"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "moveLinkDown", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "moveLinkDown"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "moveLinkUp", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "moveLinkUp"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "reorder", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "reorder"), _class.prototype)), _class);
  _exports.default = Section;
});
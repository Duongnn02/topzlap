define("discourse/components/edit-category-tab", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/url", "I18n", "discourse-common/utils/decorators", "@ember/object", "@ember/object/computed", "discourse-common/lib/get-url", "discourse/lib/computed", "@ember/runloop", "@ember/string"], function (_exports, _component, _templateFactory, _url, _I18n, _decorators, _object, _computed, _getUrl, _computed2, _runloop, _string) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/lib/url",0,"I18n",0,"discourse-common/utils/decorators",0,"@ember/object",0,"@ember/object/computed",0,"discourse-common/lib/get-url",0,"discourse/lib/computed",0,"@ember/runloop",0,"@ember/string"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <a
    href
    {{on "click" this.select}}
    class={{if this.active "active"}}
  >{{this.title}}</a>
  */
  {
    "id": "KoewHw43",
    "block": "[[[11,3],[24,6,\"\"],[16,0,[52,[30,0,[\"active\"]],\"active\"]],[4,[38,1],[\"click\",[30,0,[\"select\"]]],null],[12],[1,[30,0,[\"title\"]]],[13]],[],false,[\"if\",\"on\"]]",
    "moduleName": "discourse/components/edit-category-tab.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("tab"), _dec2 = (0, _decorators.default)("tab"), _dec3 = (0, _decorators.default)("params.slug", "params.parentSlug"), (_obj = {
    tagName: "li",
    classNameBindings: ["active", "tabClassName"],
    newCategory: (0, _computed.empty)("params.slug"),
    tabClassName(tab) {
      return "edit-category-" + tab;
    },
    active: (0, _computed2.propertyEqual)("selectedTab", "tab"),
    title(tab) {
      return _I18n.default.t(`category.${(0, _string.underscore)(tab)}`);
    },
    didInsertElement() {
      this._super(...arguments);
      (0, _runloop.scheduleOnce)("afterRender", this, this._addToCollection);
    },
    willDestroyElement() {
      this._super(...arguments);
      this.setProperties({
        selectedTab: "general",
        params: {}
      });
    },
    _addToCollection() {
      this.panels.addObject(this.tabClassName);
    },
    fullSlug(slug, parentSlug) {
      const slugPart = parentSlug && slug ? `${parentSlug}/${slug}` : slug;
      return (0, _getUrl.default)(`/c/${slugPart}/edit/${this.tab}`);
    },
    select(event) {
      event?.preventDefault();
      this.set("selectedTab", this.tab);
      if (!this.newCategory) {
        _url.default.routeTo(this.fullSlug);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "tabClassName", [_dec], Object.getOwnPropertyDescriptor(_obj, "tabClassName"), _obj), _applyDecoratedDescriptor(_obj, "title", [_dec2], Object.getOwnPropertyDescriptor(_obj, "title"), _obj), _applyDecoratedDescriptor(_obj, "fullSlug", [_dec3], Object.getOwnPropertyDescriptor(_obj, "fullSlug"), _obj), _applyDecoratedDescriptor(_obj, "select", [_object.action], Object.getOwnPropertyDescriptor(_obj, "select"), _obj)), _obj))));
  _exports.default = _default;
});
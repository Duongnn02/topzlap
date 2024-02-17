define("discourse/components/navigation-item", ["exports", "@ember/component", "@ember/template-factory", "discourse/mixins/filter-mode", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _filterMode, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/mixins/filter-mode",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <a href={{this.hrefLink}} class={{this.activeClass}}>
    {{#if this.hasIcon}}
      <span class={{this.content.name}}></span>
    {{/if}}
    {{this.content.displayName}}
  </a>
  */
  {
    "id": "CWwm5MmY",
    "block": "[[[10,3],[15,6,[30,0,[\"hrefLink\"]]],[15,0,[30,0,[\"activeClass\"]]],[12],[1,\"\\n\"],[41,[30,0,[\"hasIcon\"]],[[[1,\"    \"],[10,1],[15,0,[30,0,[\"content\",\"name\"]]],[12],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[1,[30,0,[\"content\",\"displayName\"]]],[1,\"\\n\"],[13]],[],false,[\"if\"]]",
    "moduleName": "discourse/components/navigation-item.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_filterMode.default, (_dec = (0, _decorators.default)("content.filterType", "filterType", "content.active"), _dec2 = (0, _decorators.default)("content.count"), (_obj = {
    tagName: "li",
    classNameBindings: ["active", "content.hasIcon:has-icon", "content.classNames", "isHidden:hidden", "content.name"],
    attributeBindings: ["content.title:title"],
    hidden: false,
    activeClass: "",
    hrefLink: null,
    active(contentFilterType, filterType, active) {
      if (active !== undefined) {
        return active;
      }
      return contentFilterType === filterType;
    },
    isHidden(count) {
      return !this.active && this.currentUser && this.currentUser.trust_level > 0 && (this.content.get("name") === "new" || this.content.get("name") === "unread") && count < 1;
    },
    didReceiveAttrs() {
      this._super(...arguments);
      const content = this.content;
      let href = content.get("href");
      let urlSearchParams = new URLSearchParams();
      let addParamsEvenIfEmpty = false;

      // Include the category id if the option is present
      if (content.get("includeCategoryId")) {
        let categoryId = this.get("content.category.id");
        if (categoryId) {
          urlSearchParams.set("category_id", categoryId);
        }
      }

      // To reset the "filter" sticky param, at least one query param is needed.
      // If no query param is present, add an empty one to ensure a ? is
      // appended to the URL.
      if (content.currentRouteQueryParams) {
        if (content.currentRouteQueryParams.filter) {
          addParamsEvenIfEmpty = true;
        }
        if (content.currentRouteQueryParams.f) {
          urlSearchParams.set("f", content.currentRouteQueryParams.f);
        }
      }
      if (this.siteSettings.desktop_category_page_style === "categories_and_latest_topics_created_date") {
        urlSearchParams.set("order", "created");
      }
      const queryString = urlSearchParams.toString();
      if (addParamsEvenIfEmpty || queryString) {
        href += `?${queryString}`;
      }
      this.set("hrefLink", href);
      this.set("activeClass", this.active ? "active" : "");
    }
  }, (_applyDecoratedDescriptor(_obj, "active", [_dec], Object.getOwnPropertyDescriptor(_obj, "active"), _obj), _applyDecoratedDescriptor(_obj, "isHidden", [_dec2], Object.getOwnPropertyDescriptor(_obj, "isHidden"), _obj)), _obj))));
  _exports.default = _default;
});
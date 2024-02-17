define("discourse/components/sidebar/anonymous/categories-section", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/sidebar/helpers", "discourse/components/sidebar/common/categories-section", "discourse/models/category"], function (_exports, _component, _templateFactory, _helpers, _categoriesSection, _category) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/lib/sidebar/helpers",0,"discourse/components/sidebar/common/categories-section",0,"discourse/models/category"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <Sidebar::Section
    @sectionName="categories"
    @headerLinkText={{i18n "sidebar.sections.categories.header_link_text"}}
    @collapsable={{@collapsable}}
  >
  
    {{#each this.sectionLinks as |sectionLink|}}
      <Sidebar::SectionLink
        @route={{sectionLink.route}}
        @title={{sectionLink.title}}
        @content={{sectionLink.text}}
        @currentWhen={{sectionLink.currentWhen}}
        @model={{sectionLink.model}}
        @prefixType={{sectionLink.prefixType}}
        @prefixValue={{sectionLink.prefixValue}}
        @prefixColor={{sectionLink.prefixColor}}
        @prefixElementColors={{sectionLink.prefixElementColors}}
        data-category-id={{sectionLink.category.id}}
      />
    {{/each}}
  
    <Sidebar::Common::AllCategoriesSectionLink />
  </Sidebar::Section>
  */
  {
    "id": "uGUJSKsX",
    "block": "[[[8,[39,0],null,[[\"@sectionName\",\"@headerLinkText\",\"@collapsable\"],[\"categories\",[28,[37,1],[\"sidebar.sections.categories.header_link_text\"],null],[30,1]]],[[\"default\"],[[[[1,\"\\n\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"sectionLinks\"]]],null]],null],null,[[[1,\"    \"],[8,[39,4],[[16,\"data-category-id\",[30,2,[\"category\",\"id\"]]]],[[\"@route\",\"@title\",\"@content\",\"@currentWhen\",\"@model\",\"@prefixType\",\"@prefixValue\",\"@prefixColor\",\"@prefixElementColors\"],[[30,2,[\"route\"]],[30,2,[\"title\"]],[30,2,[\"text\"]],[30,2,[\"currentWhen\"]],[30,2,[\"model\"]],[30,2,[\"prefixType\"]],[30,2,[\"prefixValue\"]],[30,2,[\"prefixColor\"]],[30,2,[\"prefixElementColors\"]]]],null],[1,\"\\n\"]],[2]],null],[1,\"\\n  \"],[8,[39,5],null,null,null],[1,\"\\n\"]],[]]]]]],[\"@collapsable\",\"sectionLink\"],false,[\"sidebar/section\",\"i18n\",\"each\",\"-track-array\",\"sidebar/section-link\",\"sidebar/common/all-categories-section-link\"]]",
    "moduleName": "discourse/components/sidebar/anonymous/categories-section.hbs",
    "isStrictMode": false
  });
  class SidebarAnonymousCategoriesSection extends _categoriesSection.default {
    constructor() {
      super(...arguments);
      if (!this.siteSettings.default_sidebar_categories) {
        this.shouldSortCategoriesByDefault = false;
      }
    }
    get categories() {
      if (this.siteSettings.default_sidebar_categories) {
        return _category.default.findByIds(this.siteSettings.default_sidebar_categories.split("|").map(categoryId => parseInt(categoryId, 10)));
      } else {
        return this.site.categoriesList.filter(category => {
          return !category.parent_category_id && (0, _helpers.canDisplayCategory)(category.id, this.siteSettings);
        }).slice(0, 5);
      }
    }
  }
  _exports.default = SidebarAnonymousCategoriesSection;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SidebarAnonymousCategoriesSection);
});
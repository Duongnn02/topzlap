define("discourse/components/edit-category-general", ["exports", "@ember/component", "@ember/template-factory", "@ember/runloop", "discourse/models/category", "@ember/object", "discourse/components/edit-category-panel", "discourse/helpers/category-link", "discourse-common/utils/decorators", "discourse-common/lib/get-url", "@ember/utils", "@ember/object/computed", "discourse-common/lib/later"], function (_exports, _component, _templateFactory, _runloop, _category, _object, _editCategoryPanel, _categoryLink, _decorators, _getUrl, _utils, _computed, _later) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/runloop",0,"discourse/models/category",0,"@ember/object",0,"discourse/components/edit-category-panel",0,"discourse/helpers/category-link",0,"discourse-common/utils/decorators",0,"discourse-common/lib/get-url",0,"@ember/utils",0,"@ember/object/computed",0,"discourse-common/lib/later"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.category.isUncategorizedCategory}}
    <p class="warning">
      {{d-icon "exclamation-triangle"}}
      {{html-safe
        (i18n
          "category.uncategorized_general_warning"
          settingLink=this.uncategorizedSiteSettingLink
          customizeLink=this.customizeTextContentLink
        )
      }}
    </p>
  {{/if}}
  
  <form>
    <CategoryNameFields @category={{this.category}} @tagName="" />
  
    {{#if this.canSelectParentCategory}}
      <section class="field parent-category">
        <label>{{i18n "category.parent"}}</label>
        <CategoryChooser
          @value={{this.category.parent_category_id}}
          @categories={{this.parentCategories}}
          @allowSubCategories={{true}}
          @allowRestrictedCategories={{true}}
          @onChange={{action (mut this.category.parent_category_id)}}
          @options={{hash
            allowUncategorized=false
            excludeCategoryId=this.category.id
            none=true
          }}
        />
      </section>
    {{/if}}
  
    {{#if this.subCategories}}
      <section class="field subcategories">
        <label>{{i18n "categories.subcategories"}}</label>
        {{#each this.subCategories as |s|}}
          {{category-badge s hideParent="true"}}
        {{/each}}
      </section>
    {{/if}}
  
    {{#if this.showDescription}}
      <section class="field description">
        <label>{{i18n "category.description"}}</label>
        {{#if this.category.description}}
          {{html-safe this.category.description}}
        {{else}}
          {{i18n "category.no_description"}}
        {{/if}}
        {{#if this.category.topic_url}}
          <br />
          <DButton
            @class="btn-default edit-category-description"
            @action={{action "showCategoryTopic"}}
            @icon="pencil-alt"
            @label="category.change_in_category_topic"
          />
        {{/if}}
      </section>
    {{/if}}
  
    <section class="field category-colors">
      {{#if this.noCategoryStyle}}
        <label>
          {{d-icon "exclamation-triangle"}}
          {{i18n "category.colors_disabled"}}
        </label>
      {{else}}
        <label>{{i18n "category.badge_colors"}}</label>
        <div class="category-color-editor">
          {{html-safe this.categoryBadgePreview}}
  
          <section class="field">
            <span class="color-title">{{i18n "category.background_color"}}:</span>
            <div class="colorpicker-wrapper">
              <ColorInput
                @hexValue={{this.category.color}}
                @valid={{this.category.colorValid}}
              />
              <ColorPicker
                @colors={{this.backgroundColors}}
                @usedColors={{this.usedBackgroundColors}}
                @value={{this.category.color}}
              />
            </div>
          </section>
  
          <section class="field">
            <span class="color-title">{{i18n "category.foreground_color"}}:</span>
            <div class="colorpicker-wrapper edit-text-color">
              <ColorInput @hexValue={{this.category.text_color}} />
              <ColorPicker
                @colors={{this.foregroundColors}}
                @value={{this.category.text_color}}
                @id="edit-text-color"
              />
            </div>
          </section>
        </div>
      {{/if}}
    </section>
  </form>
  */
  {
    "id": "y6NKjsES",
    "block": "[[[41,[30,0,[\"category\",\"isUncategorizedCategory\"]],[[[1,\"  \"],[10,2],[14,0,\"warning\"],[12],[1,\"\\n    \"],[1,[28,[35,1],[\"exclamation-triangle\"],null]],[1,\"\\n    \"],[1,[28,[35,2],[[28,[37,3],[\"category.uncategorized_general_warning\"],[[\"settingLink\",\"customizeLink\"],[[30,0,[\"uncategorizedSiteSettingLink\"]],[30,0,[\"customizeTextContentLink\"]]]]]],null]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,\"form\"],[12],[1,\"\\n  \"],[8,[39,4],null,[[\"@category\",\"@tagName\"],[[30,0,[\"category\"]],\"\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"canSelectParentCategory\"]],[[[1,\"    \"],[10,\"section\"],[14,0,\"field parent-category\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,3],[\"category.parent\"],null]],[13],[1,\"\\n      \"],[8,[39,5],null,[[\"@value\",\"@categories\",\"@allowSubCategories\",\"@allowRestrictedCategories\",\"@onChange\",\"@options\"],[[30,0,[\"category\",\"parent_category_id\"]],[30,0,[\"parentCategories\"]],true,true,[28,[37,6],[[30,0],[28,[37,7],[[30,0,[\"category\",\"parent_category_id\"]]],null]],null],[28,[37,8],null,[[\"allowUncategorized\",\"excludeCategoryId\",\"none\"],[false,[30,0,[\"category\",\"id\"]],true]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"subCategories\"]],[[[1,\"    \"],[10,\"section\"],[14,0,\"field subcategories\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,3],[\"categories.subcategories\"],null]],[13],[1,\"\\n\"],[42,[28,[37,10],[[28,[37,10],[[30,0,[\"subCategories\"]]],null]],null],null,[[[1,\"        \"],[1,[28,[35,11],[[30,1]],[[\"hideParent\"],[\"true\"]]]],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showDescription\"]],[[[1,\"    \"],[10,\"section\"],[14,0,\"field description\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,3],[\"category.description\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"category\",\"description\"]],[[[1,\"        \"],[1,[28,[35,2],[[30,0,[\"category\",\"description\"]]],null]],[1,\"\\n\"]],[]],[[[1,\"        \"],[1,[28,[35,3],[\"category.no_description\"],null]],[1,\"\\n\"]],[]]],[41,[30,0,[\"category\",\"topic_url\"]],[[[1,\"        \"],[10,\"br\"],[12],[13],[1,\"\\n        \"],[8,[39,12],null,[[\"@class\",\"@action\",\"@icon\",\"@label\"],[\"btn-default edit-category-description\",[28,[37,6],[[30,0],\"showCategoryTopic\"],null],\"pencil-alt\",\"category.change_in_category_topic\"]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,\"section\"],[14,0,\"field category-colors\"],[12],[1,\"\\n\"],[41,[30,0,[\"noCategoryStyle\"]],[[[1,\"      \"],[10,\"label\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[\"exclamation-triangle\"],null]],[1,\"\\n        \"],[1,[28,[35,3],[\"category.colors_disabled\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,\"label\"],[12],[1,[28,[35,3],[\"category.badge_colors\"],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"category-color-editor\"],[12],[1,\"\\n        \"],[1,[28,[35,2],[[30,0,[\"categoryBadgePreview\"]]],null]],[1,\"\\n\\n        \"],[10,\"section\"],[14,0,\"field\"],[12],[1,\"\\n          \"],[10,1],[14,0,\"color-title\"],[12],[1,[28,[35,3],[\"category.background_color\"],null]],[1,\":\"],[13],[1,\"\\n          \"],[10,0],[14,0,\"colorpicker-wrapper\"],[12],[1,\"\\n            \"],[8,[39,13],null,[[\"@hexValue\",\"@valid\"],[[30,0,[\"category\",\"color\"]],[30,0,[\"category\",\"colorValid\"]]]],null],[1,\"\\n            \"],[8,[39,14],null,[[\"@colors\",\"@usedColors\",\"@value\"],[[30,0,[\"backgroundColors\"]],[30,0,[\"usedBackgroundColors\"]],[30,0,[\"category\",\"color\"]]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[10,\"section\"],[14,0,\"field\"],[12],[1,\"\\n          \"],[10,1],[14,0,\"color-title\"],[12],[1,[28,[35,3],[\"category.foreground_color\"],null]],[1,\":\"],[13],[1,\"\\n          \"],[10,0],[14,0,\"colorpicker-wrapper edit-text-color\"],[12],[1,\"\\n            \"],[8,[39,13],null,[[\"@hexValue\"],[[30,0,[\"category\",\"text_color\"]]]],null],[1,\"\\n            \"],[8,[39,14],null,[[\"@colors\",\"@value\",\"@id\"],[[30,0,[\"foregroundColors\"]],[30,0,[\"category\",\"text_color\"]],\"edit-text-color\"]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"],[13]],[\"s\"],false,[\"if\",\"d-icon\",\"html-safe\",\"i18n\",\"category-name-fields\",\"category-chooser\",\"action\",\"mut\",\"hash\",\"each\",\"-track-array\",\"category-badge\",\"d-button\",\"color-input\",\"color-picker\"]]",
    "moduleName": "discourse/components/edit-category-general.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _editCategoryPanel.buildCategoryPanel)("general", (_dec = (0, _decorators.default)("category.id", "category.color"), _dec2 = (0, _decorators.default)("category.parent_category_id", "category.name", "category.color", "category.text_color"), _dec3 = (0, _decorators.default)("category.id"), _dec4 = (0, _decorators.default)("category.isUncategorizedCategory", "category.id", "category.topic_url"), (_obj = {
    init() {
      this._super(...arguments);
      this.foregroundColors = ["FFFFFF", "000000"];
    },
    didInsertElement() {
      this._super(...arguments);
      this._focusCategoryName();
    },
    willDestroyElement() {
      this._super(...arguments);
      this._laterFocus && (0, _runloop.cancel)(this._laterFocus);
    },
    canSelectParentCategory: (0, _computed.not)("category.isUncategorizedCategory"),
    uncategorizedSiteSettingLink: (0, _getUrl.default)("/admin/site_settings/category/all_results?filter=allow_uncategorized_topics"),
    customizeTextContentLink: (0, _getUrl.default)("/admin/customize/site_texts?q=uncategorized"),
    backgroundColors() {
      const categories = this.site.get("categoriesList");
      return this.siteSettings.category_colors.split("|").map(function (i) {
        return i.toUpperCase();
      }).concat(categories.map(function (c) {
        return c.color.toUpperCase();
      })).uniq();
    },
    noCategoryStyle() {
      return this.siteSettings.category_style === "none";
    },
    usedBackgroundColors(categoryId, categoryColor) {
      const categories = this.site.get("categoriesList");

      // If editing a category, don't include its color:
      return categories.map(function (c) {
        return categoryId && categoryColor.toUpperCase() === c.color.toUpperCase() ? null : c.color.toUpperCase();
      }, this).compact();
    },
    parentCategories() {
      return this.site.get("categoriesList").filter(c => c.level + 1 < this.siteSettings.max_category_nesting);
    },
    categoryBadgePreview(parentCategoryId, name, color, textColor) {
      const category = this.category;
      const c = _category.default.create({
        name,
        color,
        text_color: textColor,
        parent_category_id: parseInt(parentCategoryId, 10),
        read_restricted: category.get("read_restricted")
      });
      return (0, _categoryLink.categoryBadgeHTML)(c, {
        link: false
      });
    },
    subCategories(categoryId) {
      if ((0, _utils.isEmpty)(categoryId)) {
        return null;
      }
      return _category.default.list().filterBy("parent_category_id", categoryId);
    },
    showDescription(isUncategorizedCategory, categoryId, topicUrl) {
      return !isUncategorizedCategory && categoryId && topicUrl;
    },
    showCategoryTopic() {
      window.open(this.get("category.topic_url"), "_blank").focus();
      return false;
    },
    _focusCategoryName() {
      this._laterFocus = (0, _later.default)(() => {
        const categoryName = this.element.querySelector(".category-name");
        categoryName && categoryName.focus();
      }, 25);
    }
  }, (_applyDecoratedDescriptor(_obj, "backgroundColors", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "backgroundColors"), _obj), _applyDecoratedDescriptor(_obj, "noCategoryStyle", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "noCategoryStyle"), _obj), _applyDecoratedDescriptor(_obj, "usedBackgroundColors", [_dec], Object.getOwnPropertyDescriptor(_obj, "usedBackgroundColors"), _obj), _applyDecoratedDescriptor(_obj, "parentCategories", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "parentCategories"), _obj), _applyDecoratedDescriptor(_obj, "categoryBadgePreview", [_dec2], Object.getOwnPropertyDescriptor(_obj, "categoryBadgePreview"), _obj), _applyDecoratedDescriptor(_obj, "subCategories", [_dec3], Object.getOwnPropertyDescriptor(_obj, "subCategories"), _obj), _applyDecoratedDescriptor(_obj, "showDescription", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showDescription"), _obj), _applyDecoratedDescriptor(_obj, "showCategoryTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "showCategoryTopic"), _obj)), _obj))));
  _exports.default = _default;
});
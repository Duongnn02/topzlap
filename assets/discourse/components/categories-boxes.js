define("discourse/components/categories-boxes", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/object/computed", "@ember/utils"], function (_exports, _component, _templateFactory, _decorators, _computed, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"@ember/utils"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each this.categories as |c|}}
    <PluginOutlet
      @name="category-box-before-each-box"
      @outletArgs={{hash category=c}}
    />
  
    <div
      style={{unless
        this.noCategoryStyle
        (html-safe
          (concat (border-color c.color) (category-color-variable c.color))
        )
      }}
      data-category-id={{c.id}}
      data-notification-level={{c.notificationLevelString}}
      data-url={{c.url}}
      class="category category-box category-box-{{c.slug}}
        {{if c.isMuted 'muted'}}
        {{if this.noCategoryStyle 'no-category-boxes-style'}}"
    >
      <div class="category-box-inner">
        {{#unless c.isMuted}}
          <div class="category-logo">
            {{#if c.uploaded_logo.url}}
              <CategoryLogo @category={{c}} />
            {{/if}}
          </div>
        {{/unless}}
  
        <div class="category-details">
          <div class="category-box-heading">
            <a class="parent-box-link" href={{c.url}}>
              <h3>
                <CategoryTitleBefore @category={{c}} />
                {{#if c.read_restricted}}
                  {{d-icon this.lockIcon}}
                {{/if}}
                {{c.name}}
              </h3>
            </a>
          </div>
  
          {{#unless c.isMuted}}
            <div class="description">
              {{html-safe c.description_excerpt}}
            </div>
  
            {{#if c.isGrandParent}}
              {{#each c.subcategories as |subcategory|}}
                <div
                  data-category-id={{subcategory.id}}
                  data-notification-level={{subcategory.notificationLevelString}}
                  style={{border-color subcategory.color}}
                  class="subcategory with-subcategories
                    {{if subcategory.uploaded_logo.url 'has-logo' 'no-logo'}}"
                >
                  <div class="subcategory-box-inner">
                    <CategoryTitleLink @tagName="h4" @category={{subcategory}} />
                    {{#if subcategory.subcategories}}
                      <div class="subcategories">
                        {{#each subcategory.subcategories as |subsubcategory|}}
                          {{#unless subsubcategory.isMuted}}
                            <span class="subcategory">
                              <CategoryTitleBefore @category={{subsubcategory}} />
                              {{category-link subsubcategory hideParent="true"}}
                            </span>
                          {{/unless}}
                        {{/each}}
                      </div>
                    {{/if}}
                  </div>
                </div>
              {{/each}}
            {{else if c.subcategories}}
              <div class="subcategories">
                {{#each c.subcategories as |sc|}}
                  <a class="subcategory" href={{sc.url}}>
                    <span class="subcategory-image-placeholder">
                      {{#if sc.uploaded_logo.url}}
                        <CategoryLogo @category={{sc}} />
                      {{/if}}
                    </span>
  
                    {{category-link sc hideParent="true"}}
                  </a>
                {{/each}}
              </div>
            {{/if}}
          {{/unless}}
        </div>
  
        <PluginOutlet
          @name="category-box-below-each-category"
          @outletArgs={{hash category=c}}
        />
      </div>
    </div>
  
    <PluginOutlet
      @name="category-box-after-each-box"
      @outletArgs={{hash category=c}}
    />
  {{/each}}
  
  <PluginOutlet
    @name="category-boxes-after-boxes"
    @outletArgs={{hash category=this.c}}
  />
  */
  {
    "id": "TwO9W/wm",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,0,[\"categories\"]]],null]],null],null,[[[1,\"  \"],[8,[39,2],null,[[\"@name\",\"@outletArgs\"],[\"category-box-before-each-box\",[28,[37,3],null,[[\"category\"],[[30,1]]]]]],null],[1,\"\\n\\n  \"],[10,0],[15,5,[52,[51,[30,0,[\"noCategoryStyle\"]]],[28,[37,5],[[28,[37,6],[[28,[37,7],[[30,1,[\"color\"]]],null],[28,[37,8],[[30,1,[\"color\"]]],null]],null]],null]]],[15,\"data-category-id\",[30,1,[\"id\"]]],[15,\"data-notification-level\",[30,1,[\"notificationLevelString\"]]],[15,\"data-url\",[30,1,[\"url\"]]],[15,0,[29,[\"category category-box category-box-\",[30,1,[\"slug\"]],\"\\n      \",[52,[30,1,[\"isMuted\"]],\"muted\"],\"\\n      \",[52,[30,0,[\"noCategoryStyle\"]],\"no-category-boxes-style\"]]]],[12],[1,\"\\n    \"],[10,0],[14,0,\"category-box-inner\"],[12],[1,\"\\n\"],[41,[51,[30,1,[\"isMuted\"]]],[[[1,\"        \"],[10,0],[14,0,\"category-logo\"],[12],[1,\"\\n\"],[41,[30,1,[\"uploaded_logo\",\"url\"]],[[[1,\"            \"],[8,[39,10],null,[[\"@category\"],[[30,1]]],null],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[10,0],[14,0,\"category-details\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"category-box-heading\"],[12],[1,\"\\n          \"],[10,3],[14,0,\"parent-box-link\"],[15,6,[30,1,[\"url\"]]],[12],[1,\"\\n            \"],[10,\"h3\"],[12],[1,\"\\n              \"],[8,[39,11],null,[[\"@category\"],[[30,1]]],null],[1,\"\\n\"],[41,[30,1,[\"read_restricted\"]],[[[1,\"                \"],[1,[28,[35,12],[[30,0,[\"lockIcon\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"              \"],[1,[30,1,[\"name\"]]],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\\n\"],[41,[51,[30,1,[\"isMuted\"]]],[[[1,\"          \"],[10,0],[14,0,\"description\"],[12],[1,\"\\n            \"],[1,[28,[35,5],[[30,1,[\"description_excerpt\"]]],null]],[1,\"\\n          \"],[13],[1,\"\\n\\n\"],[41,[30,1,[\"isGrandParent\"]],[[[42,[28,[37,1],[[28,[37,1],[[30,1,[\"subcategories\"]]],null]],null],null,[[[1,\"              \"],[10,0],[15,\"data-category-id\",[30,2,[\"id\"]]],[15,\"data-notification-level\",[30,2,[\"notificationLevelString\"]]],[15,5,[28,[37,7],[[30,2,[\"color\"]]],null]],[15,0,[29,[\"subcategory with-subcategories\\n                  \",[52,[30,2,[\"uploaded_logo\",\"url\"]],\"has-logo\",\"no-logo\"]]]],[12],[1,\"\\n                \"],[10,0],[14,0,\"subcategory-box-inner\"],[12],[1,\"\\n                  \"],[8,[39,13],null,[[\"@tagName\",\"@category\"],[\"h4\",[30,2]]],null],[1,\"\\n\"],[41,[30,2,[\"subcategories\"]],[[[1,\"                    \"],[10,0],[14,0,\"subcategories\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,2,[\"subcategories\"]]],null]],null],null,[[[41,[51,[30,3,[\"isMuted\"]]],[[[1,\"                          \"],[10,1],[14,0,\"subcategory\"],[12],[1,\"\\n                            \"],[8,[39,11],null,[[\"@category\"],[[30,3]]],null],[1,\"\\n                            \"],[1,[28,[35,14],[[30,3]],[[\"hideParent\"],[\"true\"]]]],[1,\"\\n                          \"],[13],[1,\"\\n\"]],[]],null]],[3]],null],[1,\"                    \"],[13],[1,\"\\n\"]],[]],null],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[2]],null]],[]],[[[41,[30,1,[\"subcategories\"]],[[[1,\"            \"],[10,0],[14,0,\"subcategories\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,1,[\"subcategories\"]]],null]],null],null,[[[1,\"                \"],[10,3],[14,0,\"subcategory\"],[15,6,[30,4,[\"url\"]]],[12],[1,\"\\n                  \"],[10,1],[14,0,\"subcategory-image-placeholder\"],[12],[1,\"\\n\"],[41,[30,4,[\"uploaded_logo\",\"url\"]],[[[1,\"                      \"],[8,[39,10],null,[[\"@category\"],[[30,4]]],null],[1,\"\\n\"]],[]],null],[1,\"                  \"],[13],[1,\"\\n\\n                  \"],[1,[28,[35,14],[[30,4]],[[\"hideParent\"],[\"true\"]]]],[1,\"\\n                \"],[13],[1,\"\\n\"]],[4]],null],[1,\"            \"],[13],[1,\"\\n          \"]],[]],null]],[]]]],[]],null],[1,\"      \"],[13],[1,\"\\n\\n      \"],[8,[39,2],null,[[\"@name\",\"@outletArgs\"],[\"category-box-below-each-category\",[28,[37,3],null,[[\"category\"],[[30,1]]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[8,[39,2],null,[[\"@name\",\"@outletArgs\"],[\"category-box-after-each-box\",[28,[37,3],null,[[\"category\"],[[30,1]]]]]],null],[1,\"\\n\"]],[1]],null],[1,\"\\n\"],[8,[39,2],null,[[\"@name\",\"@outletArgs\"],[\"category-boxes-after-boxes\",[28,[37,3],null,[[\"category\"],[[30,0,[\"c\"]]]]]]],null]],[\"c\",\"subcategory\",\"subsubcategory\",\"sc\"],false,[\"each\",\"-track-array\",\"plugin-outlet\",\"hash\",\"unless\",\"html-safe\",\"concat\",\"border-color\",\"category-color-variable\",\"if\",\"category-logo\",\"category-title-before\",\"d-icon\",\"category-title-link\",\"category-link\"]]",
    "moduleName": "discourse/components/categories-boxes.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("categories.[].uploaded_logo.url"), _dec2 = (0, _decorators.default)("categories.[].subcategories"), (_obj = {
    tagName: "section",
    classNameBindings: [":category-boxes", "anyLogos:with-logos:no-logos", "hasSubcategories:with-subcategories"],
    noCategoryStyle: (0, _computed.equal)("siteSettings.category_style", "none"),
    lockIcon: "lock",
    anyLogos() {
      return this.categories.any(c => !(0, _utils.isEmpty)(c.get("uploaded_logo.url")));
    },
    hasSubcategories() {
      return this.categories.any(c => !(0, _utils.isEmpty)(c.get("subcategories")));
    }
  }, (_applyDecoratedDescriptor(_obj, "anyLogos", [_dec], Object.getOwnPropertyDescriptor(_obj, "anyLogos"), _obj), _applyDecoratedDescriptor(_obj, "hasSubcategories", [_dec2], Object.getOwnPropertyDescriptor(_obj, "hasSubcategories"), _obj)), _obj))));
  _exports.default = _default;
});
define("discourse/components/categories-boxes-with-topics", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/object/computed", "@ember/utils"], function (_exports, _component, _templateFactory, _decorators, _computed, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"@ember/utils"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each this.categories as |c|}}
    <div
      data-notification-level={{c.notificationLevelString}}
      style={{unless
        this.noCategoryStyle
        (html-safe
          (concat (border-color c.color) (category-color-variable c.color))
        )
      }}
      class="category category-box category-box-{{c.slug}}
        {{if c.isMuted 'muted'}}
        {{if this.noCategoryStyle 'no-category-boxes-style'}}"
    >
      <div class="category-box-inner">
        <div class="category-box-heading">
          <a class="parent-box-link" href={{c.url}}>
            {{#unless c.isMuted}}
              {{#if c.uploaded_logo.url}}
                <CategoryLogo @category={{c}} />
              {{/if}}
            {{/unless}}
  
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
          <div class="featured-topics">
            {{#if c.topics}}
              <ul>
                {{#each c.topics as |topic|}}
                  <CategoriesBoxesTopic @topic={{topic}} />
                {{/each}}
              </ul>
            {{/if}}
          </div>
        {{/unless}}
  
        <PluginOutlet
          @name="category-box-below-each-category"
          @outletArgs={{hash category=c}}
        />
      </div>
    </div>
  {{/each}}
  */
  {
    "id": "DWsx+JF7",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,0,[\"categories\"]]],null]],null],null,[[[1,\"  \"],[10,0],[15,\"data-notification-level\",[30,1,[\"notificationLevelString\"]]],[15,5,[52,[51,[30,0,[\"noCategoryStyle\"]]],[28,[37,3],[[28,[37,4],[[28,[37,5],[[30,1,[\"color\"]]],null],[28,[37,6],[[30,1,[\"color\"]]],null]],null]],null]]],[15,0,[29,[\"category category-box category-box-\",[30,1,[\"slug\"]],\"\\n      \",[52,[30,1,[\"isMuted\"]],\"muted\"],\"\\n      \",[52,[30,0,[\"noCategoryStyle\"]],\"no-category-boxes-style\"]]]],[12],[1,\"\\n    \"],[10,0],[14,0,\"category-box-inner\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"category-box-heading\"],[12],[1,\"\\n        \"],[10,3],[14,0,\"parent-box-link\"],[15,6,[30,1,[\"url\"]]],[12],[1,\"\\n\"],[41,[51,[30,1,[\"isMuted\"]]],[[[41,[30,1,[\"uploaded_logo\",\"url\"]],[[[1,\"              \"],[8,[39,8],null,[[\"@category\"],[[30,1]]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n          \"],[10,\"h3\"],[12],[1,\"\\n            \"],[8,[39,9],null,[[\"@category\"],[[30,1]]],null],[1,\"\\n\"],[41,[30,1,[\"read_restricted\"]],[[[1,\"              \"],[1,[28,[35,10],[[30,0,[\"lockIcon\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"            \"],[1,[30,1,[\"name\"]]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[51,[30,1,[\"isMuted\"]]],[[[1,\"        \"],[10,0],[14,0,\"featured-topics\"],[12],[1,\"\\n\"],[41,[30,1,[\"topics\"]],[[[1,\"            \"],[10,\"ul\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,1,[\"topics\"]]],null]],null],null,[[[1,\"                \"],[8,[39,11],null,[[\"@topic\"],[[30,2]]],null],[1,\"\\n\"]],[2]],null],[1,\"            \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[8,[39,12],null,[[\"@name\",\"@outletArgs\"],[\"category-box-below-each-category\",[28,[37,13],null,[[\"category\"],[[30,1]]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[1]],null]],[\"c\",\"topic\"],false,[\"each\",\"-track-array\",\"unless\",\"html-safe\",\"concat\",\"border-color\",\"category-color-variable\",\"if\",\"category-logo\",\"category-title-before\",\"d-icon\",\"categories-boxes-topic\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/components/categories-boxes-with-topics.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("categories.[].uploaded_logo.url"), (_obj = {
    tagName: "section",
    classNameBindings: [":category-boxes-with-topics", "anyLogos:with-logos:no-logos"],
    noCategoryStyle: (0, _computed.equal)("siteSettings.category_style", "none"),
    lockIcon: "lock",
    anyLogos() {
      return this.categories.any(c => {
        return !(0, _utils.isEmpty)(c.get("uploaded_logo.url"));
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "anyLogos", [_dec], Object.getOwnPropertyDescriptor(_obj, "anyLogos"), _obj)), _obj))));
  _exports.default = _default;
});
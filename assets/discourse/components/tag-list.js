define("discourse/components/tag-list", ["exports", "@ember/component", "@ember/template-factory", "discourse/models/category", "I18n", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _component, _templateFactory, _category, _I18n, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/models/category",0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.title}}
    <h3>{{this.title}}</h3>
  {{/if}}
  {{#if this.category}}
    <CategoryTitleLink @category={{this.category}} />
  {{/if}}
  {{#if this.tagGroupName}}
    <h3>{{this.tagGroupName}}</h3>
  {{/if}}
  {{#each this.sortedTags as |tag|}}
    <div class="tag-box">
      {{discourse-tag
        tag.id
        description=tag.description
        isPrivateMessage=this.isPrivateMessage
        pmOnly=tag.pmOnly
        tagsForUser=this.tagsForUser
      }}
      {{#if tag.pmOnly}}
        {{d-icon "envelope"}}
      {{/if}}
      {{#if tag.totalCount}}
        <span class="tag-count">
          x
          {{tag.totalCount}}
        </span>
      {{/if}}
    </div>
  {{/each}}
  <div class="clearfix"></div>
  */
  {
    "id": "8u9V0Lt0",
    "block": "[[[41,[30,0,[\"title\"]],[[[1,\"  \"],[10,\"h3\"],[12],[1,[30,0,[\"title\"]]],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"category\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@category\"],[[30,0,[\"category\"]]]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"tagGroupName\"]],[[[1,\"  \"],[10,\"h3\"],[12],[1,[30,0,[\"tagGroupName\"]]],[13],[1,\"\\n\"]],[]],null],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"sortedTags\"]]],null]],null],null,[[[1,\"  \"],[10,0],[14,0,\"tag-box\"],[12],[1,\"\\n    \"],[1,[28,[35,4],[[30,1,[\"id\"]]],[[\"description\",\"isPrivateMessage\",\"pmOnly\",\"tagsForUser\"],[[30,1,[\"description\"]],[30,0,[\"isPrivateMessage\"]],[30,1,[\"pmOnly\"]],[30,0,[\"tagsForUser\"]]]]]],[1,\"\\n\"],[41,[30,1,[\"pmOnly\"]],[[[1,\"      \"],[1,[28,[35,5],[\"envelope\"],null]],[1,\"\\n\"]],[]],null],[41,[30,1,[\"totalCount\"]],[[[1,\"      \"],[10,1],[14,0,\"tag-count\"],[12],[1,\"\\n        x\\n        \"],[1,[30,1,[\"totalCount\"]]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[1]],null],[10,0],[14,0,\"clearfix\"],[12],[13]],[\"tag\"],false,[\"if\",\"category-title-link\",\"each\",\"-track-array\",\"discourse-tag\",\"d-icon\"]]",
    "moduleName": "discourse/components/tag-list.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("titleKey"), _dec2 = (0, _decorators.default)("categoryId"), _dec3 = (0, _decorators.default)("category.fullSlug"), _dec4 = (0, _decorators.default)("tagGroupName"), (_obj = {
    classNameBindings: [":tags-list", ":tag-list", "categoryClass", "tagGroupNameClass"],
    isPrivateMessage: false,
    sortedTags: (0, _computed.sort)("tags", "sortProperties"),
    title(titleKey) {
      return titleKey && _I18n.default.t(titleKey);
    },
    category(categoryId) {
      return categoryId && _category.default.findById(categoryId);
    },
    categoryClass(slug) {
      return slug && `tag-list-${slug}`;
    },
    tagGroupNameClass(groupName) {
      if (groupName) {
        groupName = groupName.replace(/\s+/g, "-").replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, "").toLowerCase();
        return groupName && `tag-group-${groupName}`;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "title", [_dec], Object.getOwnPropertyDescriptor(_obj, "title"), _obj), _applyDecoratedDescriptor(_obj, "category", [_dec2], Object.getOwnPropertyDescriptor(_obj, "category"), _obj), _applyDecoratedDescriptor(_obj, "categoryClass", [_dec3], Object.getOwnPropertyDescriptor(_obj, "categoryClass"), _obj), _applyDecoratedDescriptor(_obj, "tagGroupNameClass", [_dec4], Object.getOwnPropertyDescriptor(_obj, "tagGroupNameClass"), _obj)), _obj))));
  _exports.default = _default;
});
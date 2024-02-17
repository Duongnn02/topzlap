define("discourse/components/reviewable-user", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="reviewable-user-info">
    <div class="reviewable-user-fields">
      <div class="reviewable-user-details username">
        <div class="name">{{i18n "review.user.username"}}</div>
        <div class="value">
          {{#if this.reviewable.link_admin}}
            <a
              href={{get-url
                (concat
                  "/admin/users/"
                  this.reviewable.user_id
                  "/"
                  this.reviewable.payload.username
                )
              }}
            >
              {{this.reviewable.payload.username}}
            </a>
          {{else}}
            {{this.reviewable.payload.username}}
          {{/if}}
        </div>
      </div>
  
      <ReviewableField
        @classes="reviewable-user-details name"
        @name={{i18n "review.user.name"}}
        @value={{this.reviewable.payload.name}}
      />
  
      <ReviewableField
        @classes="reviewable-user-details email"
        @name={{i18n "review.user.email"}}
        @value={{this.reviewable.payload.email}}
      />
  
      <ReviewableField
        @classes="reviewable-user-details bio"
        @name={{i18n "review.user.bio"}}
        @value={{this.reviewable.payload.bio}}
      />
  
      {{#if this.reviewable.payload.website}}
        <div class="reviewable-user-details website">
          <div class="name">{{i18n "review.user.website"}}</div>
          <div class="value">
            <a
              href={{this.reviewable.payload.website}}
              target="_blank"
              rel="noopener noreferrer"
            >{{this.reviewable.payload.website}}</a>
          </div>
        </div>
      {{/if}}
  
      <ReviewableField
        @classes="reviewable-user-details reject-reason"
        @name={{i18n "review.user.reject_reason"}}
        @value={{this.reviewable.reject_reason}}
      />
  
      {{#each this.userFields as |f|}}
        <ReviewableField
          @classes="reviewable-user-details user-field"
          @name={{f.name}}
          @value={{f.value}}
          @tagName=""
        />
      {{/each}}
    </div>
  
    {{yield}}
  </div>
  */
  {
    "id": "ESMZJ99p",
    "block": "[[[10,0],[14,0,\"reviewable-user-info\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"reviewable-user-fields\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"reviewable-user-details username\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"name\"],[12],[1,[28,[35,0],[\"review.user.username\"],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"value\"],[12],[1,\"\\n\"],[41,[30,0,[\"reviewable\",\"link_admin\"]],[[[1,\"          \"],[10,3],[15,6,[28,[37,2],[[28,[37,3],[\"/admin/users/\",[30,0,[\"reviewable\",\"user_id\"]],\"/\",[30,0,[\"reviewable\",\"payload\",\"username\"]]],null]],null]],[12],[1,\"\\n            \"],[1,[30,0,[\"reviewable\",\"payload\",\"username\"]]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[1,[30,0,[\"reviewable\",\"payload\",\"username\"]]],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@classes\",\"@name\",\"@value\"],[\"reviewable-user-details name\",[28,[37,0],[\"review.user.name\"],null],[30,0,[\"reviewable\",\"payload\",\"name\"]]]],null],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@classes\",\"@name\",\"@value\"],[\"reviewable-user-details email\",[28,[37,0],[\"review.user.email\"],null],[30,0,[\"reviewable\",\"payload\",\"email\"]]]],null],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@classes\",\"@name\",\"@value\"],[\"reviewable-user-details bio\",[28,[37,0],[\"review.user.bio\"],null],[30,0,[\"reviewable\",\"payload\",\"bio\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"reviewable\",\"payload\",\"website\"]],[[[1,\"      \"],[10,0],[14,0,\"reviewable-user-details website\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"name\"],[12],[1,[28,[35,0],[\"review.user.website\"],null]],[13],[1,\"\\n        \"],[10,0],[14,0,\"value\"],[12],[1,\"\\n          \"],[10,3],[15,6,[30,0,[\"reviewable\",\"payload\",\"website\"]]],[14,\"target\",\"_blank\"],[14,\"rel\",\"noopener noreferrer\"],[12],[1,[30,0,[\"reviewable\",\"payload\",\"website\"]]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[8,[39,4],null,[[\"@classes\",\"@name\",\"@value\"],[\"reviewable-user-details reject-reason\",[28,[37,0],[\"review.user.reject_reason\"],null],[30,0,[\"reviewable\",\"reject_reason\"]]]],null],[1,\"\\n\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,0,[\"userFields\"]]],null]],null],null,[[[1,\"      \"],[8,[39,4],null,[[\"@classes\",\"@name\",\"@value\",\"@tagName\"],[\"reviewable-user-details user-field\",[30,1,[\"name\"]],[30,1,[\"value\"]],\"\"]],null],[1,\"\\n\"]],[1]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[18,2,null],[1,\"\\n\"],[13]],[\"f\",\"&default\"],false,[\"i18n\",\"if\",\"get-url\",\"concat\",\"reviewable-field\",\"each\",\"-track-array\",\"yield\"]]",
    "moduleName": "discourse/components/reviewable-user.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("reviewable.user_fields"), (_obj = {
    userFields(fields) {
      return this.site.collectUserFields(fields);
    }
  }, (_applyDecoratedDescriptor(_obj, "userFields", [_dec], Object.getOwnPropertyDescriptor(_obj, "userFields"), _obj)), _obj))));
  _exports.default = _default;
});
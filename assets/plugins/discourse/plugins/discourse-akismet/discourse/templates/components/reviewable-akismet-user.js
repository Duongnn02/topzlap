define("discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="reviewable-user-info">
    <div class="reviewable-user-fields">
      <div class="reviewable-user-details username">
        <div class="name">{{i18n "review.user.username"}}</div>
        <div class="value">
          {{#if reviewable.user_deleted}}
            {{reviewable.payload.username}}
          {{else}}
            <a
              href={{get-url
                (concat "/u/" reviewable.payload.username "/summary")
              }}
            >
              {{reviewable.payload.username}}
            </a>
          {{/if}}
        </div>
      </div>
  
      {{reviewable-field
        classes="reviewable-user-details name"
        name=(i18n "review.user.name")
        value=reviewable.payload.name
      }}
  
      {{reviewable-field
        classes="reviewable-user-details email"
        name=(i18n "review.user.email")
        value=reviewable.payload.email
      }}
  
      {{reviewable-field
        classes="reviewable-user-details bio"
        name=(i18n "review.user.bio")
        value=reviewable.payload.bio
      }}
    </div>
  
    {{yield}}
  
    {{#if reviewable.payload.external_error}}
      {{reviewable-akismet-api-error
        external_error=reviewable.payload.external_error
      }}
    {{/if}}
  </div>
  */
  {
    "id": "7oufc+/q",
    "block": "[[[10,0],[14,0,\"reviewable-user-info\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"reviewable-user-fields\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"reviewable-user-details username\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"name\"],[12],[1,[28,[35,0],[\"review.user.username\"],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"value\"],[12],[1,\"\\n\"],[41,[33,2,[\"user_deleted\"]],[[[1,\"          \"],[1,[33,2,[\"payload\",\"username\"]]],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,3],[15,6,[28,[37,3],[[28,[37,4],[\"/u/\",[33,2,[\"payload\",\"username\"]],\"/summary\"],null]],null]],[12],[1,\"\\n            \"],[1,[33,2,[\"payload\",\"username\"]]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[1,[28,[35,5],null,[[\"classes\",\"name\",\"value\"],[\"reviewable-user-details name\",[28,[37,0],[\"review.user.name\"],null],[33,2,[\"payload\",\"name\"]]]]]],[1,\"\\n\\n    \"],[1,[28,[35,5],null,[[\"classes\",\"name\",\"value\"],[\"reviewable-user-details email\",[28,[37,0],[\"review.user.email\"],null],[33,2,[\"payload\",\"email\"]]]]]],[1,\"\\n\\n    \"],[1,[28,[35,5],null,[[\"classes\",\"name\",\"value\"],[\"reviewable-user-details bio\",[28,[37,0],[\"review.user.bio\"],null],[33,2,[\"payload\",\"bio\"]]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[18,1,null],[1,\"\\n\\n\"],[41,[33,2,[\"payload\",\"external_error\"]],[[[1,\"    \"],[1,[28,[35,7],null,[[\"external_error\"],[[33,2,[\"payload\",\"external_error\"]]]]]],[1,\"\\n\"]],[]],null],[13]],[\"&default\"],false,[\"i18n\",\"if\",\"reviewable\",\"get-url\",\"concat\",\"reviewable-field\",\"yield\",\"reviewable-akismet-api-error\"]]",
    "moduleName": "discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
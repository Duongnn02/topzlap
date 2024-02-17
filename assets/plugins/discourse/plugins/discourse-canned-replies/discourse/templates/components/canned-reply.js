define("discourse/plugins/discourse-canned-replies/discourse/templates/components/canned-reply", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <details class="canned-reply" id="canned-reply-{{reply.id}}">
    <summary class="canned-reply-title">
      <div class="canned-reply-title-text">{{reply.title}}</div>
  
      <div class="actions">
        {{d-button
          class="canned-replies-apply"
          action=(action "apply")
          icon="far-clipboard"
        }}
  
        {{#if canEdit}}
          {{d-button
            class="canned-replies-edit"
            action=(action "editReply")
            icon="pencil-alt"
          }}
        {{/if}}
      </div>
    </summary>
  
    <div class="canned-replies-content">
      {{cook-text reply.content}}
    </div>
  </details>
  */
  {
    "id": "Mkn0RMi8",
    "block": "[[[10,\"details\"],[14,0,\"canned-reply\"],[15,1,[29,[\"canned-reply-\",[33,0,[\"id\"]]]]],[12],[1,\"\\n  \"],[10,\"summary\"],[14,0,\"canned-reply-title\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"canned-reply-title-text\"],[12],[1,[33,0,[\"title\"]]],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"actions\"],[12],[1,\"\\n      \"],[1,[28,[35,1],null,[[\"class\",\"action\",\"icon\"],[\"canned-replies-apply\",[28,[37,2],[[30,0],\"apply\"],null],\"far-clipboard\"]]]],[1,\"\\n\\n\"],[41,[33,4],[[[1,\"        \"],[1,[28,[35,1],null,[[\"class\",\"action\",\"icon\"],[\"canned-replies-edit\",[28,[37,2],[[30,0],\"editReply\"],null],\"pencil-alt\"]]]],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"canned-replies-content\"],[12],[1,\"\\n    \"],[1,[28,[35,5],[[33,0,[\"content\"]]],null]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"reply\",\"d-button\",\"action\",\"if\",\"canEdit\",\"cook-text\"]]",
    "moduleName": "discourse/plugins/discourse-canned-replies/discourse/templates/components/canned-reply.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
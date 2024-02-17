define("discourse/plugins/discourse-canned-replies/discourse/templates/connectors/editor-preview/canned-replies", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if cannedVisible}}
    <div class="d-editor-preview">
      {{#conditional-loading-spinner condition=loadingReplies}}
        {{#if canEdit}}
          <div class="canned-replies-edit-bar">
            {{d-button
              class="canned-replies-new"
              action=(action "newReply")
              icon="plus"
              label="canned_replies.insert.new_button"
            }}
            {{text-field
              class="canned-replies-filter"
              value=listFilter
              placeholder=(i18n "canned_replies.filter_hint")
            }}
  
            {{d-button
              class="modal-close close btn-flat"
              action=(action "hide")
              icon="times"
            }}
          </div>
        {{/if}}
  
        {{#each filteredReplies as |r|}}
          {{canned-reply reply=r}}
        {{/each}}
      {{/conditional-loading-spinner}}
    </div>
  {{/if}}
  */
  {
    "id": "poIL+DKq",
    "block": "[[[41,[33,1],[[[1,\"  \"],[10,0],[14,0,\"d-editor-preview\"],[12],[1,\"\\n\"],[6,[39,2],null,[[\"condition\"],[[33,3]]],[[\"default\"],[[[[41,[33,4],[[[1,\"        \"],[10,0],[14,0,\"canned-replies-edit-bar\"],[12],[1,\"\\n          \"],[1,[28,[35,5],null,[[\"class\",\"action\",\"icon\",\"label\"],[\"canned-replies-new\",[28,[37,6],[[30,0],\"newReply\"],null],\"plus\",\"canned_replies.insert.new_button\"]]]],[1,\"\\n          \"],[1,[28,[35,7],null,[[\"class\",\"value\",\"placeholder\"],[\"canned-replies-filter\",[33,8],[28,[37,9],[\"canned_replies.filter_hint\"],null]]]]],[1,\"\\n\\n          \"],[1,[28,[35,5],null,[[\"class\",\"action\",\"icon\"],[\"modal-close close btn-flat\",[28,[37,6],[[30,0],\"hide\"],null],\"times\"]]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[42,[28,[37,11],[[28,[37,11],[[33,12]],null]],null],null,[[[1,\"        \"],[1,[28,[35,13],null,[[\"reply\"],[[30,1]]]]],[1,\"\\n\"]],[1]],null]],[]]]]],[1,\"  \"],[13],[1,\"\\n\"]],[]],null]],[\"r\"],false,[\"if\",\"cannedVisible\",\"conditional-loading-spinner\",\"loadingReplies\",\"canEdit\",\"d-button\",\"action\",\"text-field\",\"listFilter\",\"i18n\",\"each\",\"-track-array\",\"filteredReplies\",\"canned-reply\"]]",
    "moduleName": "discourse/plugins/discourse-canned-replies/discourse/templates/connectors/editor-preview/canned-replies.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
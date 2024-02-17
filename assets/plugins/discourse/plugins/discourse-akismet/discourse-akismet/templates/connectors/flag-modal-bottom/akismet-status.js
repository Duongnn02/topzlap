define("discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/flag-modal-bottom/akismet-status", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if post.akismet_state}}
    <div class="consent_banner alert alert-info">
      <span>{{i18n (concat "akismet.post_state." post.akismet_state)}}</span>
    </div>
  {{/if}}
  */
  {
    "id": "OezFbmst",
    "block": "[[[41,[33,1,[\"akismet_state\"]],[[[1,\"  \"],[10,0],[14,0,\"consent_banner alert alert-info\"],[12],[1,\"\\n    \"],[10,1],[12],[1,[28,[35,2],[[28,[37,3],[\"akismet.post_state.\",[33,1,[\"akismet_state\"]]],null]],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"post\",\"i18n\",\"concat\"]]",
    "moduleName": "discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/flag-modal-bottom/akismet-status.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/plugins/discourse-cakeday/discourse/templates/components/emoji-images", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if siteSettings.enable_emoji}}
    <div title={{titleText}}>
      {{#each emojiHTML as |html|}}
        {{html-safe html}}
      {{/each}}
    </div>
  {{else}}
    {{d-icon "birthday-cake" title=titleText}}
  {{/if}}
  */
  {
    "id": "BZUu8u/k",
    "block": "[[[41,[33,1,[\"enable_emoji\"]],[[[1,\"  \"],[10,0],[15,\"title\",[36,2]],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[33,5]],null]],null],null,[[[1,\"      \"],[1,[28,[35,6],[[30,1]],null]],[1,\"\\n\"]],[1]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],[[[1,\"  \"],[1,[28,[35,7],[\"birthday-cake\"],[[\"title\"],[[33,2]]]]],[1,\"\\n\"]],[]]]],[\"html\"],false,[\"if\",\"siteSettings\",\"titleText\",\"each\",\"-track-array\",\"emojiHTML\",\"html-safe\",\"d-icon\"]]",
    "moduleName": "discourse/plugins/discourse-cakeday/discourse/templates/components/emoji-images.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
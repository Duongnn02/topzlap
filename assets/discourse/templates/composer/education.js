define("discourse/templates/composer/education", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <a
    href
    {{on "click" (fn this.closeMessage this.message)}}
    class="close"
    aria-label={{i18n "composer.esc_label"}}
  >
    {{i18n "composer.esc"}}
    {{d-icon "times"}}
  </a>
  
  {{#if this.message.title}}
    <h3>{{this.message.title}}</h3>
  {{/if}}
  
  {{html-safe this.message.body}}
  */
  {
    "id": "bAqcaeAT",
    "block": "[[[11,3],[24,6,\"\"],[24,0,\"close\"],[16,\"aria-label\",[28,[37,0],[\"composer.esc_label\"],null]],[4,[38,1],[\"click\",[28,[37,2],[[30,0,[\"closeMessage\"]],[30,0,[\"message\"]]],null]],null],[12],[1,\"\\n  \"],[1,[28,[35,0],[\"composer.esc\"],null]],[1,\"\\n  \"],[1,[28,[35,3],[\"times\"],null]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"message\",\"title\"]],[[[1,\"  \"],[10,\"h3\"],[12],[1,[30,0,[\"message\",\"title\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[1,[28,[35,5],[[30,0,[\"message\",\"body\"]]],null]]],[],false,[\"i18n\",\"on\",\"fn\",\"d-icon\",\"if\",\"html-safe\"]]",
    "moduleName": "discourse/templates/composer/education.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
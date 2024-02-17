define("discourse/templates/tag-groups-index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="tag-group-content">
    <h3>
      {{#if this.model}}
        {{i18n "tagging.groups.about_heading"}}
      {{else}}
        {{i18n "tagging.groups.about_heading_empty"}}
      {{/if}}
    </h3>
    <section class="tag-groups-about">
      <p>{{i18n "tagging.groups.about_description"}}</p>
    </section>
    <section>
      {{#unless this.model}}
        <LinkTo @route="tagGroups.new" class="btn btn-primary">
          {{d-icon "plus"}}
          {{i18n "tagging.groups.new"}}
        </LinkTo>
      {{/unless}}
    </section>
  </div>
  */
  {
    "id": "TssKvbvr",
    "block": "[[[10,0],[14,0,\"tag-group-content\"],[12],[1,\"\\n  \"],[10,\"h3\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\"]],[[[1,\"      \"],[1,[28,[35,1],[\"tagging.groups.about_heading\"],null]],[1,\"\\n\"]],[]],[[[1,\"      \"],[1,[28,[35,1],[\"tagging.groups.about_heading_empty\"],null]],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n  \"],[10,\"section\"],[14,0,\"tag-groups-about\"],[12],[1,\"\\n    \"],[10,2],[12],[1,[28,[35,1],[\"tagging.groups.about_description\"],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,\"section\"],[12],[1,\"\\n\"],[41,[51,[30,0,[\"model\"]]],[[[1,\"      \"],[8,[39,3],[[24,0,\"btn btn-primary\"]],[[\"@route\"],[\"tagGroups.new\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,4],[\"plus\"],null]],[1,\"\\n        \"],[1,[28,[35,1],[\"tagging.groups.new\"],null]],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"],[13]],[],false,[\"if\",\"i18n\",\"unless\",\"link-to\",\"d-icon\"]]",
    "moduleName": "discourse/templates/tag-groups-index.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
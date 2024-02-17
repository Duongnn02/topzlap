define("discourse/templates/bulk-tag", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <p>{{i18n (concat "topics.bulk." this.title)}}</p>
  
  <p><TagChooser @tags={{this.tags}} @categoryId={{this.categoryId}} /></p>
  
  <DButton
    @action={{action this.action}}
    @disabled={{this.emptyTags}}
    @label={{concat "topics.bulk." this.label}}
  />
  */
  {
    "id": "2R3Q9Gnl",
    "block": "[[[10,2],[12],[1,[28,[35,0],[[28,[37,1],[\"topics.bulk.\",[30,0,[\"title\"]]],null]],null]],[13],[1,\"\\n\\n\"],[10,2],[12],[8,[39,2],null,[[\"@tags\",\"@categoryId\"],[[30,0,[\"tags\"]],[30,0,[\"categoryId\"]]]],null],[13],[1,\"\\n\\n\"],[8,[39,3],null,[[\"@action\",\"@disabled\",\"@label\"],[[28,[37,4],[[30,0],[30,0,[\"action\"]]],null],[30,0,[\"emptyTags\"]],[28,[37,1],[\"topics.bulk.\",[30,0,[\"label\"]]],null]]],null]],[],false,[\"i18n\",\"concat\",\"tag-chooser\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/templates/bulk-tag.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/templates/modal/topic-bulk-actions", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    <p>{{html-safe
        (i18n "topics.bulk.selected" count=this.model.topics.length)
      }}</p>
    {{outlet "bulkOutlet"}}
  </DModalBody>
  */
  {
    "id": "Af4MNf+z",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[10,2],[12],[1,[28,[35,1],[[28,[37,2],[\"topics.bulk.selected\"],[[\"count\"],[[30,0,[\"model\",\"topics\",\"length\"]]]]]],null]],[13],[1,\"\\n  \"],[46,[28,[37,4],[\"bulkOutlet\"],null],null,null,null],[1,\"\\n\"]],[]]]]]],[],false,[\"d-modal-body\",\"html-safe\",\"i18n\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/modal/topic-bulk-actions.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
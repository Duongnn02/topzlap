define("discourse/templates/modal/dismiss-read", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    <p>
      <PreferenceCheckbox
        @labelKey="topics.bulk.also_dismiss_topics"
        @checked={{this.dismissTopics}}
      />
    </p>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @action={{route-action "dismissReadTopics" this.dismissTopics}}
      @icon="check"
      @id="dismiss-read-confirm"
      @label="topics.bulk.dismiss"
    />
  </div>
  */
  {
    "id": "wLAuy0nv",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[10,2],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@labelKey\",\"@checked\"],[\"topics.bulk.also_dismiss_topics\",[30,0,[\"dismissTopics\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,2],null,[[\"@class\",\"@action\",\"@icon\",\"@id\",\"@label\"],[\"btn-primary\",[28,[37,3],[\"dismissReadTopics\",[30,0,[\"dismissTopics\"]]],null],\"check\",\"dismiss-read-confirm\",\"topics.bulk.dismiss\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"preference-checkbox\",\"d-button\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/dismiss-read.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
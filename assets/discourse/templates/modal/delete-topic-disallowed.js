define("discourse/templates/modal/delete-topic-disallowed", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    <p>{{html-safe (i18n "post.controls.delete_topic_disallowed_modal")}}</p>
  </DModalBody>
  <div class="modal-footer">
    <DButton
      @action={{route-action "closeModal"}}
      @class="btn-primary"
      @label="close"
    />
  </div>
  */
  {
    "id": "DanLyWgh",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[10,2],[12],[1,[28,[35,1],[[28,[37,2],[\"post.controls.delete_topic_disallowed_modal\"],null]],null]],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,3],null,[[\"@action\",\"@class\",\"@label\"],[[28,[37,4],[\"closeModal\"],null],\"btn-primary\",\"close\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"html-safe\",\"i18n\",\"d-button\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/delete-topic-disallowed.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/templates/modal/post-enqueued", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    <p>{{i18n "review.approval.description"}}</p>
  
    <p>{{html-safe
        (i18n "review.approval.pending_posts" count=this.model.pending_count)
      }}</p>
  </DModalBody>
  <div class="modal-footer">
    <DButton
      @action={{route-action "closeModal"}}
      @class="btn-primary"
      @label="review.approval.ok"
    />
  </div>
  */
  {
    "id": "LAUO6IQd",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[10,2],[12],[1,[28,[35,1],[\"review.approval.description\"],null]],[13],[1,\"\\n\\n  \"],[10,2],[12],[1,[28,[35,2],[[28,[37,1],[\"review.approval.pending_posts\"],[[\"count\"],[[30,0,[\"model\",\"pending_count\"]]]]]],null]],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,3],null,[[\"@action\",\"@class\",\"@label\"],[[28,[37,4],[\"closeModal\"],null],\"btn-primary\",\"review.approval.ok\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"i18n\",\"html-safe\",\"d-button\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/post-enqueued.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
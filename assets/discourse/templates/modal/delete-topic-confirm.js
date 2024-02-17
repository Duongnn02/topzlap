define("discourse/templates/modal/delete-topic-confirm", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    <p>{{i18n
        "post.controls.delete_topic_confirm_modal"
        count=this.siteSettings.min_topic_views_for_delete_confirm
      }}</p>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @action={{action "deleteTopic"}}
      @disabled={{this.deletingTopic}}
      @translatedLabel={{this.buttonTitle}}
      @class="btn-danger"
    />
    <DButton
      @action={{route-action "closeModal"}}
      @label="post.controls.delete_topic_confirm_modal_no"
      @class="btn-primary"
    />
  </div>
  */
  {
    "id": "v2ejjUCL",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[10,2],[12],[1,[28,[35,1],[\"post.controls.delete_topic_confirm_modal\"],[[\"count\"],[[30,0,[\"siteSettings\",\"min_topic_views_for_delete_confirm\"]]]]]],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,2],null,[[\"@action\",\"@disabled\",\"@translatedLabel\",\"@class\"],[[28,[37,3],[[30,0],\"deleteTopic\"],null],[30,0,[\"deletingTopic\"]],[30,0,[\"buttonTitle\"]],\"btn-danger\"]],null],[1,\"\\n  \"],[8,[39,2],null,[[\"@action\",\"@label\",\"@class\"],[[28,[37,4],[\"closeModal\"],null],\"post.controls.delete_topic_confirm_modal_no\",\"btn-primary\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"i18n\",\"d-button\",\"action\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/delete-topic-confirm.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/templates/modal/edit-topic-timer", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody
    @title="topic.topic_status_update.title"
    @autoFocus="false"
    @id="topic-timer-modal"
  >
    <EditTopicTimerForm
      @topic={{this.model}}
      @topicTimer={{this.topicTimer}}
      @timerTypes={{this.publicTimerTypes}}
      @onChangeStatusType={{action "onChangeStatusType"}}
      @onChangeInput={{action "onChangeInput"}}
    />
  
    <div class="modal-footer control-group edit-topic-timer-buttons">
      <DButton
        @class="btn-primary"
        @disabled={{this.saveDisabled}}
        @label="topic.topic_status_update.save"
        @action={{action "saveTimer"}}
      />
  
      <ConditionalLoadingSpinner @size="small" @condition={{this.loading}} />
  
      {{#if this.topicTimer.execute_at}}
        <DButton
          @class="pull-right btn-danger"
          @action={{action "removeTimer"}}
          @label="topic.topic_status_update.remove"
        />
      {{/if}}
    </div>
  </DModalBody>
  */
  {
    "id": "XBJ6K3LP",
    "block": "[[[8,[39,0],null,[[\"@title\",\"@autoFocus\",\"@id\"],[\"topic.topic_status_update.title\",\"false\",\"topic-timer-modal\"]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@topic\",\"@topicTimer\",\"@timerTypes\",\"@onChangeStatusType\",\"@onChangeInput\"],[[30,0,[\"model\"]],[30,0,[\"topicTimer\"]],[30,0,[\"publicTimerTypes\"]],[28,[37,2],[[30,0],\"onChangeStatusType\"],null],[28,[37,2],[[30,0],\"onChangeInput\"],null]]],null],[1,\"\\n\\n  \"],[10,0],[14,0,\"modal-footer control-group edit-topic-timer-buttons\"],[12],[1,\"\\n    \"],[8,[39,3],null,[[\"@class\",\"@disabled\",\"@label\",\"@action\"],[\"btn-primary\",[30,0,[\"saveDisabled\"]],\"topic.topic_status_update.save\",[28,[37,2],[[30,0],\"saveTimer\"],null]]],null],[1,\"\\n\\n    \"],[8,[39,4],null,[[\"@size\",\"@condition\"],[\"small\",[30,0,[\"loading\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"topicTimer\",\"execute_at\"]],[[[1,\"      \"],[8,[39,3],null,[[\"@class\",\"@action\",\"@label\"],[\"pull-right btn-danger\",[28,[37,2],[[30,0],\"removeTimer\"],null],\"topic.topic_status_update.remove\"]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]]]]]],[],false,[\"d-modal-body\",\"edit-topic-timer-form\",\"action\",\"d-button\",\"conditional-loading-spinner\",\"if\"]]",
    "moduleName": "discourse/templates/modal/edit-topic-timer.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
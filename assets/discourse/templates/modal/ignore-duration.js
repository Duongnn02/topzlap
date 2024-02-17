define("discourse/templates/modal/ignore-duration", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody
    @title="user.user_notifications.ignore_duration_title"
    @autoFocus="false"
  >
    <FutureDateInput
      @label="user.user_notifications.ignore_duration_when"
      @input={{this.ignoredUntil}}
      @customShortcuts={{this.timeShortcuts}}
      @includeDateTime={{false}}
      @onChangeInput={{action (mut this.ignoredUntil)}}
    />
    <p>{{i18n "user.user_notifications.ignore_duration_note"}}</p>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary ignore-duration-save"
      @disabled={{this.saveDisabled}}
      @label="user.user_notifications.ignore_duration_save"
      @action={{action "ignore"}}
    />
  
    <ConditionalLoadingSpinner @size="small" @condition={{this.loading}} />
  </div>
  */
  {
    "id": "WPTtsZga",
    "block": "[[[8,[39,0],null,[[\"@title\",\"@autoFocus\"],[\"user.user_notifications.ignore_duration_title\",\"false\"]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@label\",\"@input\",\"@customShortcuts\",\"@includeDateTime\",\"@onChangeInput\"],[\"user.user_notifications.ignore_duration_when\",[30,0,[\"ignoredUntil\"]],[30,0,[\"timeShortcuts\"]],false,[28,[37,2],[[30,0],[28,[37,3],[[30,0,[\"ignoredUntil\"]]],null]],null]]],null],[1,\"\\n  \"],[10,2],[12],[1,[28,[35,4],[\"user.user_notifications.ignore_duration_note\"],null]],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,5],null,[[\"@class\",\"@disabled\",\"@label\",\"@action\"],[\"btn-primary ignore-duration-save\",[30,0,[\"saveDisabled\"]],\"user.user_notifications.ignore_duration_save\",[28,[37,2],[[30,0],\"ignore\"],null]]],null],[1,\"\\n\\n  \"],[8,[39,6],null,[[\"@size\",\"@condition\"],[\"small\",[30,0,[\"loading\"]]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"future-date-input\",\"action\",\"mut\",\"i18n\",\"d-button\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/modal/ignore-duration.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
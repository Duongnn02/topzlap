define("discourse/templates/modal/ignore-duration-with-username", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
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
    <div class="controls tracking-controls">
      <label>{{d-icon "far-eye-slash" class="icon"}}
        {{i18n "user.user_notifications.ignore_duration_username"}}</label>
      <EmailGroupUserChooser
        @value={{this.ignoredUsername}}
        @onChange={{action "updateIgnoredUsername"}}
        @options={{hash excludeCurrentUser=true maximum=1}}
      />
    </div>
    <FutureDateInput
      @label="user.user_notifications.ignore_duration_when"
      @input={{readonly this.ignoredUntil}}
      @customShortcuts={{this.timeShortcuts}}
      @includeDateTime={{false}}
      @onChangeInput={{action (mut this.ignoredUntil)}}
    />
    <p>{{i18n "user.user_notifications.ignore_duration_note"}}</p>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @disabled={{this.saveDisabled}}
      @label="user.user_notifications.ignore_duration_save"
      @action={{action "ignore"}}
    />
    <ConditionalLoadingSpinner @size="small" @condition={{this.loading}} />
  </div>
  */
  {
    "id": "ILztHlzT",
    "block": "[[[8,[39,0],null,[[\"@title\",\"@autoFocus\"],[\"user.user_notifications.ignore_duration_title\",\"false\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"controls tracking-controls\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,[28,[35,1],[\"far-eye-slash\"],[[\"class\"],[\"icon\"]]]],[1,\"\\n      \"],[1,[28,[35,2],[\"user.user_notifications.ignore_duration_username\"],null]],[13],[1,\"\\n    \"],[8,[39,3],null,[[\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"ignoredUsername\"]],[28,[37,4],[[30,0],\"updateIgnoredUsername\"],null],[28,[37,5],null,[[\"excludeCurrentUser\",\"maximum\"],[true,1]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[8,[39,6],null,[[\"@label\",\"@input\",\"@customShortcuts\",\"@includeDateTime\",\"@onChangeInput\"],[\"user.user_notifications.ignore_duration_when\",[28,[37,7],[[30,0,[\"ignoredUntil\"]]],null],[30,0,[\"timeShortcuts\"]],false,[28,[37,4],[[30,0],[28,[37,8],[[30,0,[\"ignoredUntil\"]]],null]],null]]],null],[1,\"\\n  \"],[10,2],[12],[1,[28,[35,2],[\"user.user_notifications.ignore_duration_note\"],null]],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,9],null,[[\"@class\",\"@disabled\",\"@label\",\"@action\"],[\"btn-primary\",[30,0,[\"saveDisabled\"]],\"user.user_notifications.ignore_duration_save\",[28,[37,4],[[30,0],\"ignore\"],null]]],null],[1,\"\\n  \"],[8,[39,10],null,[[\"@size\",\"@condition\"],[\"small\",[30,0,[\"loading\"]]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"d-icon\",\"i18n\",\"email-group-user-chooser\",\"action\",\"hash\",\"future-date-input\",\"readonly\",\"mut\",\"d-button\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/modal/ignore-duration-with-username.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
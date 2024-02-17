define("discourse/templates/modal/user-status", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    <ConditionalLoadingSpinner @condition={{this.loading}}>
      <div class="control-group">
        <UserStatusPicker @status={{this.status}} />
      </div>
      {{#unless this.hidePauseNotifications}}
        <div class="control-group pause-notifications">
          <label class="checkbox-label">
            <Input @type="checkbox" @checked={{this.pauseNotifications}} />
            {{i18n "user_status.pause_notifications"}}
          </label>
        </div>
      {{/unless}}
      <div class="control-group control-group-remove-status">
        <label class="control-label">
          {{i18n "user_status.remove_status"}}
        </label>
        <TimeShortcutPicker
          @timeShortcuts={{this.timeShortcuts}}
          @hiddenOptions={{this.hiddenTimeShortcutOptions}}
          @customLabels={{this.customTimeShortcutLabels}}
          @prefilledDatetime={{this.prefilledDateTime}}
          @onTimeSelected={{action "onTimeSelected"}}
          @_itsatrap={{this._itsatrap}}
        />
      </div>
      <div class="modal-footer control-group">
        <DButton
          @label="user_status.save"
          @class="btn-primary"
          @disabled={{not this.statusIsSet}}
          @action={{action "saveAndClose"}}
        />
        <DModalCancel @close={{action "closeModal"}} />
        {{#if this.showDeleteButton}}
          <DButton
            @icon="trash-alt"
            @class="delete-status btn-danger"
            @action={{action "delete"}}
          />
        {{/if}}
      </div>
    </ConditionalLoadingSpinner>
  </DModalBody>
  */
  {
    "id": "ybUlXFBH",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[8,[39,2],null,[[\"@status\"],[[30,0,[\"status\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"],[41,[51,[30,0,[\"hidePauseNotifications\"]]],[[[1,\"      \"],[10,0],[14,0,\"control-group pause-notifications\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"checkbox-label\"],[12],[1,\"\\n          \"],[8,[39,4],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"pauseNotifications\"]]]],null],[1,\"\\n          \"],[1,[28,[35,5],[\"user_status.pause_notifications\"],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[10,0],[14,0,\"control-group control-group-remove-status\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,\"\\n        \"],[1,[28,[35,5],[\"user_status.remove_status\"],null]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[8,[39,6],null,[[\"@timeShortcuts\",\"@hiddenOptions\",\"@customLabels\",\"@prefilledDatetime\",\"@onTimeSelected\",\"@_itsatrap\"],[[30,0,[\"timeShortcuts\"]],[30,0,[\"hiddenTimeShortcutOptions\"]],[30,0,[\"customTimeShortcutLabels\"]],[30,0,[\"prefilledDateTime\"]],[28,[37,7],[[30,0],\"onTimeSelected\"],null],[30,0,[\"_itsatrap\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"modal-footer control-group\"],[12],[1,\"\\n      \"],[8,[39,8],null,[[\"@label\",\"@class\",\"@disabled\",\"@action\"],[\"user_status.save\",\"btn-primary\",[28,[37,9],[[30,0,[\"statusIsSet\"]]],null],[28,[37,7],[[30,0],\"saveAndClose\"],null]]],null],[1,\"\\n      \"],[8,[39,10],null,[[\"@close\"],[[28,[37,7],[[30,0],\"closeModal\"],null]]],null],[1,\"\\n\"],[41,[30,0,[\"showDeleteButton\"]],[[[1,\"        \"],[8,[39,8],null,[[\"@icon\",\"@class\",\"@action\"],[\"trash-alt\",\"delete-status btn-danger\",[28,[37,7],[[30,0],\"delete\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]]]]]],[],false,[\"d-modal-body\",\"conditional-loading-spinner\",\"user-status-picker\",\"unless\",\"input\",\"i18n\",\"time-shortcut-picker\",\"action\",\"d-button\",\"not\",\"d-modal-cancel\",\"if\"]]",
    "moduleName": "discourse/templates/modal/user-status.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
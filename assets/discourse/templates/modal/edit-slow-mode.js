define("discourse/templates/modal/edit-slow-mode", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @title="topic.slow_mode_update.title" @autoFocus={{false}}>
    <div class="control-group">
      <label class="slow-mode-label">{{i18n
          "topic.slow_mode_update.description"
        }}</label>
    </div>
  
    <div class="control-group">
      <label class="slow-mode-label">{{i18n
          "topic.slow_mode_update.select"
        }}</label>
      <ComboBox
        @class="slow-mode-type"
        @content={{this.slowModes}}
        @value={{this.selectedSlowMode}}
        @onChange={{action "setSlowModeDuration"}}
      />
    </div>
  
    {{#if this.showCustomSelect}}
      <div class="control-group">
        <label class="slow-mode-label">{{i18n
            "topic.slow_mode_update.hours"
          }}</label>
        <Input @value={{this.hours}} @type="number" class="input-small" />
  
        <label class="slow-mode-label">{{i18n
            "topic.slow_mode_update.minutes"
          }}</label>
        <Input @value={{this.minutes}} @type="number" class="input-small" />
  
        <label class="slow-mode-label">{{i18n
            "topic.slow_mode_update.seconds"
          }}</label>
        <Input @value={{this.seconds}} @type="number" class="input-small" />
      </div>
    {{/if}}
  
    <div class="control-group">
      <FutureDateInput
        @class="enabled-until"
        @label="topic.slow_mode_update.enabled_until"
        @labelClasses="slow-mode-label"
        @customShortcuts={{this.timeShortcuts}}
        @clearable={{true}}
        @input={{this.model.slow_mode_enabled_until}}
        @onChangeInput={{action (mut this.model.slow_mode_enabled_until)}}
      />
    </div>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @disabled={{this.submitDisabled}}
      @icon="hourglass-start"
      @label={{this.saveButtonLabel}}
      @action={{action "enableSlowMode"}}
    />
  
    <ConditionalLoadingSpinner @size="small" @condition={{this.loading}} />
  
    {{#if this.model.slow_mode_seconds}}
      <DButton
        @class="btn-danger"
        @action={{action "disableSlowMode"}}
        @disabled={{this.submitDisabled}}
        @label="topic.slow_mode_update.remove"
      />
    {{/if}}
  </div>
  */
  {
    "id": "VxsaP7jS",
    "block": "[[[8,[39,0],null,[[\"@title\",\"@autoFocus\"],[\"topic.slow_mode_update.title\",false]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"slow-mode-label\"],[12],[1,[28,[35,1],[\"topic.slow_mode_update.description\"],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"slow-mode-label\"],[12],[1,[28,[35,1],[\"topic.slow_mode_update.select\"],null]],[13],[1,\"\\n    \"],[8,[39,2],null,[[\"@class\",\"@content\",\"@value\",\"@onChange\"],[\"slow-mode-type\",[30,0,[\"slowModes\"]],[30,0,[\"selectedSlowMode\"]],[28,[37,3],[[30,0],\"setSlowModeDuration\"],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showCustomSelect\"]],[[[1,\"    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"slow-mode-label\"],[12],[1,[28,[35,1],[\"topic.slow_mode_update.hours\"],null]],[13],[1,\"\\n      \"],[8,[39,5],[[24,0,\"input-small\"]],[[\"@value\",\"@type\"],[[30,0,[\"hours\"]],\"number\"]],null],[1,\"\\n\\n      \"],[10,\"label\"],[14,0,\"slow-mode-label\"],[12],[1,[28,[35,1],[\"topic.slow_mode_update.minutes\"],null]],[13],[1,\"\\n      \"],[8,[39,5],[[24,0,\"input-small\"]],[[\"@value\",\"@type\"],[[30,0,[\"minutes\"]],\"number\"]],null],[1,\"\\n\\n      \"],[10,\"label\"],[14,0,\"slow-mode-label\"],[12],[1,[28,[35,1],[\"topic.slow_mode_update.seconds\"],null]],[13],[1,\"\\n      \"],[8,[39,5],[[24,0,\"input-small\"]],[[\"@value\",\"@type\"],[[30,0,[\"seconds\"]],\"number\"]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[8,[39,6],null,[[\"@class\",\"@label\",\"@labelClasses\",\"@customShortcuts\",\"@clearable\",\"@input\",\"@onChangeInput\"],[\"enabled-until\",\"topic.slow_mode_update.enabled_until\",\"slow-mode-label\",[30,0,[\"timeShortcuts\"]],true,[30,0,[\"model\",\"slow_mode_enabled_until\"]],[28,[37,3],[[30,0],[28,[37,7],[[30,0,[\"model\",\"slow_mode_enabled_until\"]]],null]],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,8],null,[[\"@class\",\"@disabled\",\"@icon\",\"@label\",\"@action\"],[\"btn-primary\",[30,0,[\"submitDisabled\"]],\"hourglass-start\",[30,0,[\"saveButtonLabel\"]],[28,[37,3],[[30,0],\"enableSlowMode\"],null]]],null],[1,\"\\n\\n  \"],[8,[39,9],null,[[\"@size\",\"@condition\"],[\"small\",[30,0,[\"loading\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"slow_mode_seconds\"]],[[[1,\"    \"],[8,[39,8],null,[[\"@class\",\"@action\",\"@disabled\",\"@label\"],[\"btn-danger\",[28,[37,3],[[30,0],\"disableSlowMode\"],null],[30,0,[\"submitDisabled\"]],\"topic.slow_mode_update.remove\"]],null],[1,\"\\n\"]],[]],null],[13]],[],false,[\"d-modal-body\",\"i18n\",\"combo-box\",\"action\",\"if\",\"input\",\"future-date-input\",\"mut\",\"d-button\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/modal/edit-slow-mode.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
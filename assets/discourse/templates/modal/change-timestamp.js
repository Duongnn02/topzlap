define("discourse/templates/modal/change-timestamp", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @class="change-timestamp">
    <p>
      {{i18n "topic.change_timestamp.instructions"}}
    </p>
  
    <p class="alert alert-error {{unless this.validTimestamp 'hidden'}}">
      {{i18n "topic.change_timestamp.invalid_timestamp"}}
    </p>
  
    <form>
      <DatePickerPast
        @value={{readonly this.date}}
        @containerId="date-container"
        @onSelect={{action (mut this.date)}}
      />
  
      <Input @type="time" @value={{this.time}} />
    </form>
  
    <div id="date-container"></div>
  </DModalBody>
  
  <div class="modal-footer change-timestamp-footer">
    <DButton
      @class="btn-primary"
      @disabled={{this.buttonDisabled}}
      @action={{action "changeTimestamp"}}
      @translatedLabel={{this.buttonTitle}}
    />
  </div>
  */
  {
    "id": "bhKpO3Td",
    "block": "[[[8,[39,0],null,[[\"@class\"],[\"change-timestamp\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,2],[12],[1,\"\\n    \"],[1,[28,[35,1],[\"topic.change_timestamp.instructions\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,2],[15,0,[29,[\"alert alert-error \",[52,[51,[30,0,[\"validTimestamp\"]]],\"hidden\"]]]],[12],[1,\"\\n    \"],[1,[28,[35,1],[\"topic.change_timestamp.invalid_timestamp\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"form\"],[12],[1,\"\\n    \"],[8,[39,3],null,[[\"@value\",\"@containerId\",\"@onSelect\"],[[28,[37,4],[[30,0,[\"date\"]]],null],\"date-container\",[28,[37,5],[[30,0],[28,[37,6],[[30,0,[\"date\"]]],null]],null]]],null],[1,\"\\n\\n    \"],[8,[39,7],null,[[\"@type\",\"@value\"],[\"time\",[30,0,[\"time\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,1,\"date-container\"],[12],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer change-timestamp-footer\"],[12],[1,\"\\n  \"],[8,[39,8],null,[[\"@class\",\"@disabled\",\"@action\",\"@translatedLabel\"],[\"btn-primary\",[30,0,[\"buttonDisabled\"]],[28,[37,5],[[30,0],\"changeTimestamp\"],null],[30,0,[\"buttonTitle\"]]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"i18n\",\"unless\",\"date-picker-past\",\"readonly\",\"action\",\"mut\",\"input\",\"d-button\"]]",
    "moduleName": "discourse/templates/modal/change-timestamp.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
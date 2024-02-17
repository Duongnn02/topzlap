define("discourse/templates/modal/download-calendar", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div>
    <DModalBody @title="download_calendar.title">
      <div class="control-group">
        <div class="ics">
          <label class="radio" for="ics">
            <RadioButton
              @name="select-calendar"
              @id="ics"
              @value="ics"
              @selection={{this.selectedCalendar}}
              @onChange={{action (mut this.selectedCalendar)}}
            />
            {{i18n "download_calendar.save_ics"}}
          </label>
        </div>
        <div class="google">
          <label class="radio" for="google">
            <RadioButton
              @name="select-calendar"
              @id="google"
              @value="google"
              @selection={{this.selectedCalendar}}
              @onChange={{action (mut this.selectedCalendar)}}
            />
            {{i18n "download_calendar.save_google"}}
          </label>
        </div>
      </div>
  
      <div class="control-group remember">
        <label>
          <Input @type="checkbox" @checked={{this.remember}} />
          <span>{{i18n "download_calendar.remember"}}</span>
        </label>
        <span>{{i18n "download_calendar.remember_explanation"}}</span>
      </div>
    </DModalBody>
    <div class="modal-footer">
      <DButton
        @class="btn-primary"
        @action={{action "downloadCalendar"}}
        @label="download_calendar.download"
      />
      <DModalCancel @close={{route-action "closeModal"}} />
    </div>
  </div>
  */
  {
    "id": "C+2O27Fi",
    "block": "[[[10,0],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@title\"],[\"download_calendar.title\"]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"ics\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"radio\"],[14,\"for\",\"ics\"],[12],[1,\"\\n          \"],[8,[39,1],null,[[\"@name\",\"@id\",\"@value\",\"@selection\",\"@onChange\"],[\"select-calendar\",\"ics\",\"ics\",[30,0,[\"selectedCalendar\"]],[28,[37,2],[[30,0],[28,[37,3],[[30,0,[\"selectedCalendar\"]]],null]],null]]],null],[1,\"\\n          \"],[1,[28,[35,4],[\"download_calendar.save_ics\"],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"google\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"radio\"],[14,\"for\",\"google\"],[12],[1,\"\\n          \"],[8,[39,1],null,[[\"@name\",\"@id\",\"@value\",\"@selection\",\"@onChange\"],[\"select-calendar\",\"google\",\"google\",[30,0,[\"selectedCalendar\"]],[28,[37,2],[[30,0],[28,[37,3],[[30,0,[\"selectedCalendar\"]]],null]],null]]],null],[1,\"\\n          \"],[1,[28,[35,4],[\"download_calendar.save_google\"],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-group remember\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,\"\\n        \"],[8,[39,5],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"remember\"]]]],null],[1,\"\\n        \"],[10,1],[12],[1,[28,[35,4],[\"download_calendar.remember\"],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,4],[\"download_calendar.remember_explanation\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n  \"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n    \"],[8,[39,6],null,[[\"@class\",\"@action\",\"@label\"],[\"btn-primary\",[28,[37,2],[[30,0],\"downloadCalendar\"],null],\"download_calendar.download\"]],null],[1,\"\\n    \"],[8,[39,7],null,[[\"@close\"],[[28,[37,8],[\"closeModal\"],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"radio-button\",\"action\",\"mut\",\"i18n\",\"input\",\"d-button\",\"d-modal-cancel\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/download-calendar.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
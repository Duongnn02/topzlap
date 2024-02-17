define("discourse/plugins/discourse-local-dates/discourse/templates/components/discourse-local-dates-create-form", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody
    @title="discourse_local_dates.title"
    @class="discourse-local-dates-create-modal"
    @style="overflow: auto"
  >
  
    <div class="form">
      {{#if this.isValid}}
        {{#if this.timezoneIsDifferentFromUserTimezone}}
          <div class="preview alert alert-info">
            {{i18n "discourse_local_dates.create.form.current_timezone"}}
            <b>{{this.formattedCurrentUserTimezone}}</b>{{this.currentPreview}}
          </div>
        {{/if}}
      {{else}}
        <div class="validation-error alert alert-error">
          {{i18n "discourse_local_dates.create.form.invalid_date"}}
        </div>
      {{/if}}
  
      {{this.computeDate}}
  
      <div class="date-time-configuration">
        <div class="inputs-panel">
          <div
            class="date-time-control from
              {{if this.fromSelected 'is-selected'}}
              {{if this.fromFilled 'is-filled'}}"
          >
            {{d-icon "calendar-alt"}}
            <DButton
              @id="from-date-time"
              @action={{action "focusFrom"}}
              @translatedLabel={{this.formattedFrom}}
              @class="date-time"
            />
          </div>
  
          <div
            class="date-time-control to
              {{if this.toSelected 'is-selected'}}
              {{if this.toFilled 'is-filled'}}"
          >
            {{d-icon "calendar-alt"}}
            <DButton
              @action={{action "focusTo"}}
              @translatedLabel={{this.formattedTo}}
              @class="date-time"
            />
            {{#if this.toFilled}}
              <DButton
                @icon="times"
                @action={{action "eraseToDateTime"}}
                @class="delete-to-date"
              />
            {{/if}}
          </div>
  
          {{#unless this.site.mobileView}}
            <TimezoneInput
              @options={{hash icon="globe"}}
              @value={{this.timezone}}
              @onChange={{action (mut this.timezone)}}
            />
          {{/unless}}
        </div>
  
        <div class="picker-panel">
          <Input class="fake-input" />
          <div class="date-picker" id="picker-container-{{this.elementId}}"></div>
  
          {{#if this.fromSelected}}
            <div class="time-pickers">
              {{d-icon "far-clock"}}
              <Input
                maxlength={{5}}
                placeholder="hh:mm"
                @type="time"
                @value={{this.time}}
                class="time-picker"
                {{on "input" (action "setTime")}}
              />
            </div>
          {{/if}}
  
          {{#if this.toSelected}}
            {{#if this.toDate}}
              <div class="time-pickers">
                {{d-icon "far-clock"}}
                <Input
                  maxlength={{5}}
                  placeholder="hh:mm"
                  @type="time"
                  @value={{this.toTime}}
                  class="time-picker"
                  {{on "input" (action "setToTime")}}
                />
              </div>
            {{/if}}
          {{/if}}
        </div>
  
        {{#if this.site.mobileView}}
          <TimezoneInput
            @value={{this.timezone}}
            @options={{hash icon="globe"}}
            @onChange={{action (mut this.timezone)}}
          />
        {{/if}}
      </div>
  
      {{#if this.advancedMode}}
        <div class="advanced-options">
          {{#unless this.isRange}}
            <div class="control-group recurrence">
              <label class="control-label">
                {{i18n "discourse_local_dates.create.form.recurring_title"}}
              </label>
              <p>{{html-safe
                  (i18n "discourse_local_dates.create.form.recurring_description")
                }}</p>
              <div class="controls">
                <ComboBox
                  @content={{this.recurringOptions}}
                  @class="recurrence-input"
                  @value={{this.recurring}}
                  @onChange={{action (mut this.recurring)}}
                  @options={{hash
                    none="discourse_local_dates.create.form.recurring_none"
                  }}
                />
              </div>
            </div>
          {{/unless}}
  
          <div class="control-group timezones">
            <label>{{i18n
                "discourse_local_dates.create.form.timezones_title"
              }}</label>
            <p>{{i18n
                "discourse_local_dates.create.form.timezones_description"
              }}</p>
            <div class="controls">
              <MultiSelect
                @valueProperty={{null}}
                @nameProperty={{null}}
                @class="timezones-input"
                @content={{this.allTimezones}}
                @value={{this.timezones}}
                @options={{hash allowAny=false maximum=5}}
              />
            </div>
          </div>
  
          <div class="control-group format">
            <label>{{i18n
                "discourse_local_dates.create.form.format_title"
              }}</label>
            <p>
              {{i18n "discourse_local_dates.create.form.format_description"}}
              <a
                target="_blank"
                href="https://momentjs.com/docs/#/parsing/string-format/"
                rel="noopener noreferrer"
              >
                {{d-icon "question-circle"}}
              </a>
            </p>
            <div class="controls">
              <TextField @value={{this.format}} @class="format-input" />
            </div>
          </div>
          <div class="control-group">
            <ul class="formats">
              {{#each this.previewedFormats as |previewedFormat|}}
                <li class="format">
                  <a
                    class="moment-format"
                    href
                    {{on "click" (fn this.updateFormat previewedFormat.format)}}
                  >
                    {{previewedFormat.format}}
                  </a>
                  <span class="previewed-format">
                    {{previewedFormat.preview}}
                  </span>
                </li>
              {{/each}}
            </ul>
          </div>
        </div>
      {{/if}}
    </div>
  </DModalBody>
  
  <div class="modal-footer discourse-local-dates-create-modal-footer">
    {{#if this.isValid}}
      <DButton
        @class="btn-primary"
        @action={{action "save"}}
        @label="discourse_local_dates.create.form.insert"
      />
    {{/if}}
  
    <DButton
      @class="btn-flat"
      @action={{action "cancel"}}
      @translatedLabel={{i18n "cancel"}}
    />
  
    <DButton
      @class="btn-default advanced-mode-btn"
      @action={{action "advancedMode"}}
      @icon="cog"
      @label={{this.toggleModeBtnLabel}}
    />
  </div>
  */
  {
    "id": "TzLSoKfd",
    "block": "[[[8,[39,0],null,[[\"@title\",\"@class\",\"@style\"],[\"discourse_local_dates.title\",\"discourse-local-dates-create-modal\",\"overflow: auto\"]],[[\"default\"],[[[[1,\"\\n\\n  \"],[10,0],[14,0,\"form\"],[12],[1,\"\\n\"],[41,[30,0,[\"isValid\"]],[[[41,[30,0,[\"timezoneIsDifferentFromUserTimezone\"]],[[[1,\"        \"],[10,0],[14,0,\"preview alert alert-info\"],[12],[1,\"\\n          \"],[1,[28,[35,2],[\"discourse_local_dates.create.form.current_timezone\"],null]],[1,\"\\n          \"],[10,\"b\"],[12],[1,[30,0,[\"formattedCurrentUserTimezone\"]]],[13],[1,[30,0,[\"currentPreview\"]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null]],[]],[[[1,\"      \"],[10,0],[14,0,\"validation-error alert alert-error\"],[12],[1,\"\\n        \"],[1,[28,[35,2],[\"discourse_local_dates.create.form.invalid_date\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]]],[1,\"\\n    \"],[1,[30,0,[\"computeDate\"]]],[1,\"\\n\\n    \"],[10,0],[14,0,\"date-time-configuration\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"inputs-panel\"],[12],[1,\"\\n        \"],[10,0],[15,0,[29,[\"date-time-control from\\n            \",[52,[30,0,[\"fromSelected\"]],\"is-selected\"],\"\\n            \",[52,[30,0,[\"fromFilled\"]],\"is-filled\"]]]],[12],[1,\"\\n          \"],[1,[28,[35,3],[\"calendar-alt\"],null]],[1,\"\\n          \"],[8,[39,4],null,[[\"@id\",\"@action\",\"@translatedLabel\",\"@class\"],[\"from-date-time\",[28,[37,5],[[30,0],\"focusFrom\"],null],[30,0,[\"formattedFrom\"]],\"date-time\"]],null],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[10,0],[15,0,[29,[\"date-time-control to\\n            \",[52,[30,0,[\"toSelected\"]],\"is-selected\"],\"\\n            \",[52,[30,0,[\"toFilled\"]],\"is-filled\"]]]],[12],[1,\"\\n          \"],[1,[28,[35,3],[\"calendar-alt\"],null]],[1,\"\\n          \"],[8,[39,4],null,[[\"@action\",\"@translatedLabel\",\"@class\"],[[28,[37,5],[[30,0],\"focusTo\"],null],[30,0,[\"formattedTo\"]],\"date-time\"]],null],[1,\"\\n\"],[41,[30,0,[\"toFilled\"]],[[[1,\"            \"],[8,[39,4],null,[[\"@icon\",\"@action\",\"@class\"],[\"times\",[28,[37,5],[[30,0],\"eraseToDateTime\"],null],\"delete-to-date\"]],null],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\\n\"],[41,[51,[30,0,[\"site\",\"mobileView\"]]],[[[1,\"          \"],[8,[39,7],null,[[\"@options\",\"@value\",\"@onChange\"],[[28,[37,8],null,[[\"icon\"],[\"globe\"]]],[30,0,[\"timezone\"]],[28,[37,5],[[30,0],[28,[37,9],[[30,0,[\"timezone\"]]],null]],null]]],null],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"picker-panel\"],[12],[1,\"\\n        \"],[8,[39,10],[[24,0,\"fake-input\"]],null,null],[1,\"\\n        \"],[10,0],[14,0,\"date-picker\"],[15,1,[29,[\"picker-container-\",[30,0,[\"elementId\"]]]]],[12],[13],[1,\"\\n\\n\"],[41,[30,0,[\"fromSelected\"]],[[[1,\"          \"],[10,0],[14,0,\"time-pickers\"],[12],[1,\"\\n            \"],[1,[28,[35,3],[\"far-clock\"],null]],[1,\"\\n            \"],[8,[39,10],[[16,\"maxlength\",5],[24,\"placeholder\",\"hh:mm\"],[24,0,\"time-picker\"],[4,[38,11],[\"input\",[28,[37,5],[[30,0],\"setTime\"],null]],null]],[[\"@type\",\"@value\"],[\"time\",[30,0,[\"time\"]]]],null],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"toSelected\"]],[[[41,[30,0,[\"toDate\"]],[[[1,\"            \"],[10,0],[14,0,\"time-pickers\"],[12],[1,\"\\n              \"],[1,[28,[35,3],[\"far-clock\"],null]],[1,\"\\n              \"],[8,[39,10],[[16,\"maxlength\",5],[24,\"placeholder\",\"hh:mm\"],[24,0,\"time-picker\"],[4,[38,11],[\"input\",[28,[37,5],[[30,0],\"setToTime\"],null]],null]],[[\"@type\",\"@value\"],[\"time\",[30,0,[\"toTime\"]]]],null],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"site\",\"mobileView\"]],[[[1,\"        \"],[8,[39,7],null,[[\"@value\",\"@options\",\"@onChange\"],[[30,0,[\"timezone\"]],[28,[37,8],null,[[\"icon\"],[\"globe\"]]],[28,[37,5],[[30,0],[28,[37,9],[[30,0,[\"timezone\"]]],null]],null]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"advancedMode\"]],[[[1,\"      \"],[10,0],[14,0,\"advanced-options\"],[12],[1,\"\\n\"],[41,[51,[30,0,[\"isRange\"]]],[[[1,\"          \"],[10,0],[14,0,\"control-group recurrence\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,\"\\n              \"],[1,[28,[35,2],[\"discourse_local_dates.create.form.recurring_title\"],null]],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,2],[12],[1,[28,[35,12],[[28,[37,2],[\"discourse_local_dates.create.form.recurring_description\"],null]],null]],[13],[1,\"\\n            \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n              \"],[8,[39,13],null,[[\"@content\",\"@class\",\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"recurringOptions\"]],\"recurrence-input\",[30,0,[\"recurring\"]],[28,[37,5],[[30,0],[28,[37,9],[[30,0,[\"recurring\"]]],null]],null],[28,[37,8],null,[[\"none\"],[\"discourse_local_dates.create.form.recurring_none\"]]]]],null],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n        \"],[10,0],[14,0,\"control-group timezones\"],[12],[1,\"\\n          \"],[10,\"label\"],[12],[1,[28,[35,2],[\"discourse_local_dates.create.form.timezones_title\"],null]],[13],[1,\"\\n          \"],[10,2],[12],[1,[28,[35,2],[\"discourse_local_dates.create.form.timezones_description\"],null]],[13],[1,\"\\n          \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n            \"],[8,[39,14],null,[[\"@valueProperty\",\"@nameProperty\",\"@class\",\"@content\",\"@value\",\"@options\"],[null,null,\"timezones-input\",[30,0,[\"allTimezones\"]],[30,0,[\"timezones\"]],[28,[37,8],null,[[\"allowAny\",\"maximum\"],[false,5]]]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,0,\"control-group format\"],[12],[1,\"\\n          \"],[10,\"label\"],[12],[1,[28,[35,2],[\"discourse_local_dates.create.form.format_title\"],null]],[13],[1,\"\\n          \"],[10,2],[12],[1,\"\\n            \"],[1,[28,[35,2],[\"discourse_local_dates.create.form.format_description\"],null]],[1,\"\\n            \"],[10,3],[14,\"target\",\"_blank\"],[14,6,\"https://momentjs.com/docs/#/parsing/string-format/\"],[14,\"rel\",\"noopener noreferrer\"],[12],[1,\"\\n              \"],[1,[28,[35,3],[\"question-circle\"],null]],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n            \"],[8,[39,15],null,[[\"@value\",\"@class\"],[[30,0,[\"format\"]],\"format-input\"]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n          \"],[10,\"ul\"],[14,0,\"formats\"],[12],[1,\"\\n\"],[42,[28,[37,17],[[28,[37,17],[[30,0,[\"previewedFormats\"]]],null]],null],null,[[[1,\"              \"],[10,\"li\"],[14,0,\"format\"],[12],[1,\"\\n                \"],[11,3],[24,0,\"moment-format\"],[24,6,\"\"],[4,[38,11],[\"click\",[28,[37,18],[[30,0,[\"updateFormat\"]],[30,1,[\"format\"]]],null]],null],[12],[1,\"\\n                  \"],[1,[30,1,[\"format\"]]],[1,\"\\n                \"],[13],[1,\"\\n                \"],[10,1],[14,0,\"previewed-format\"],[12],[1,\"\\n                  \"],[1,[30,1,[\"preview\"]]],[1,\"\\n                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[1]],null],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer discourse-local-dates-create-modal-footer\"],[12],[1,\"\\n\"],[41,[30,0,[\"isValid\"]],[[[1,\"    \"],[8,[39,4],null,[[\"@class\",\"@action\",\"@label\"],[\"btn-primary\",[28,[37,5],[[30,0],\"save\"],null],\"discourse_local_dates.create.form.insert\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[8,[39,4],null,[[\"@class\",\"@action\",\"@translatedLabel\"],[\"btn-flat\",[28,[37,5],[[30,0],\"cancel\"],null],[28,[37,2],[\"cancel\"],null]]],null],[1,\"\\n\\n  \"],[8,[39,4],null,[[\"@class\",\"@action\",\"@icon\",\"@label\"],[\"btn-default advanced-mode-btn\",[28,[37,5],[[30,0],\"advancedMode\"],null],\"cog\",[30,0,[\"toggleModeBtnLabel\"]]]],null],[1,\"\\n\"],[13]],[\"previewedFormat\"],false,[\"d-modal-body\",\"if\",\"i18n\",\"d-icon\",\"d-button\",\"action\",\"unless\",\"timezone-input\",\"hash\",\"mut\",\"input\",\"on\",\"html-safe\",\"combo-box\",\"multi-select\",\"text-field\",\"each\",\"-track-array\",\"fn\"]]",
    "moduleName": "discourse/plugins/discourse-local-dates/discourse/templates/components/discourse-local-dates-create-form.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
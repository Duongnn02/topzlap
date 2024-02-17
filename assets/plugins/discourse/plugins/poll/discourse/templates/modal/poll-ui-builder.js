define("discourse/plugins/poll/discourse/templates/modal/poll-ui-builder", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @title="poll.ui_builder.title" @class="poll-ui-builder">
    <div class="input-group poll-type">
      <a
        href
        {{on "click" (fn this.updatePollType "regular")}}
        class="poll-type-value poll-type-value-regular
          {{if this.isRegular 'active'}}"
      >
        {{i18n "poll.ui_builder.poll_type.regular"}}
      </a>
  
      <a
        href
        {{on "click" (fn this.updatePollType "multiple")}}
        class="poll-type-value poll-type-value-multiple
          {{if this.isMultiple 'active'}}"
      >
        {{i18n "poll.ui_builder.poll_type.multiple"}}
      </a>
  
      {{#if this.showNumber}}
        <a
          href
          {{on "click" (fn this.updatePollType "number")}}
          class="poll-type-value poll-type-value-number
            {{if this.isNumber 'active'}}"
        >
          {{i18n "poll.ui_builder.poll_type.number"}}
        </a>
      {{/if}}
    </div>
  
    {{#if this.showAdvanced}}
      <div class="input-group poll-title">
        <label class="input-group-label">{{i18n
            "poll.ui_builder.poll_title.label"
          }}</label>
        <Input @value={{this.pollTitle}} />
      </div>
    {{/if}}
  
    {{#unless this.isNumber}}
      <div class="poll-options">
        {{#if this.showAdvanced}}
          <label class="input-group-label">{{i18n
              "poll.ui_builder.poll_options.label"
            }}</label>
          <Textarea
            @value={{this.pollOptionsText}}
            {{on "input" (action "onOptionsTextChange")}}
          />
          {{#if this.showMinNumOfOptionsValidation}}
            {{#unless this.minNumOfOptionsValidation.ok}}
              <InputTip @validation={{this.minNumOfOptionsValidation}} />
            {{/unless}}
          {{/if}}
        {{else}}
          {{#each this.pollOptions as |option|}}
            <div class="input-group poll-option-value">
              <Input
                @value={{option.value}}
                @enter={{action "addOption" option}}
              />
              {{#if this.canRemoveOption}}
                <DButton
                  @icon="trash-alt"
                  @action={{action "removeOption" option}}
                />
              {{/if}}
            </div>
          {{/each}}
  
          <div class="poll-option-controls">
            <DButton
              @class="btn-default"
              @icon="plus"
              @label="poll.ui_builder.poll_options.add"
              @action={{action "addOption" this.pollOptions.lastObject}}
            />
            {{#if
              (and
                this.showMinNumOfOptionsValidation
                (not this.minNumOfOptionsValidation.ok)
              )
            }}
              <InputTip @validation={{this.minNumOfOptionsValidation}} />
            {{/if}}
          </div>
        {{/if}}
      </div>
    {{/unless}}
  
    {{#unless this.isRegular}}
      <div class="options">
        <div class="input-group poll-number">
          <label class="input-group-label">{{i18n
              "poll.ui_builder.poll_config.min"
            }}</label>
          <Input
            @type="number"
            @value={{this.pollMin}}
            class="poll-options-min"
            min="1"
          />
        </div>
  
        <div class="input-group poll-number">
          <label class="input-group-label">{{i18n
              "poll.ui_builder.poll_config.max"
            }}</label>
          <Input
            @type="number"
            @value={{this.pollMax}}
            class="poll-options-max"
            min="1"
          />
        </div>
  
        {{#if this.isNumber}}
          <div class="input-group poll-number">
            <label class="input-group-label">{{i18n
                "poll.ui_builder.poll_config.step"
              }}</label>
            <Input
              @type="number"
              @value={{this.pollStep}}
              min="1"
              class="poll-options-step"
            />
          </div>
        {{/if}}
      </div>
  
      {{#unless this.minMaxValueValidation.ok}}
        <InputTip @validation={{this.minMaxValueValidation}} />
      {{/unless}}
    {{/unless}}
  
    {{#if this.showAdvanced}}
      <div class="input-group poll-allowed-groups">
        <label class="input-group-label">{{i18n
            "poll.ui_builder.poll_groups.label"
          }}</label>
        <GroupChooser
          @content={{this.siteGroups}}
          @value={{this.pollGroups}}
          @onChange={{action (mut this.pollGroups)}}
          @labelProperty="name"
          @valueProperty="name"
        />
      </div>
  
      <div class="input-group poll-date">
        <label class="input-group-label">{{i18n
            "poll.ui_builder.automatic_close.label"
          }}</label>
        <DateTimeInput
          @date={{this.pollAutoClose}}
          @onChange={{action (mut this.pollAutoClose)}}
          @clearable={{true}}
          @useGlobalPickerContainer={{true}}
        />
      </div>
  
      <div class="input-group poll-select">
        <label class="input-group-label">{{i18n
            "poll.ui_builder.poll_result.label"
          }}</label>
        <ComboBox
          @content={{this.pollResults}}
          @value={{this.pollResult}}
          @class="poll-result"
          @valueProperty="value"
          @onChange={{action (mut this.pollResult)}}
        />
      </div>
  
      {{#unless this.isNumber}}
        <div class="input-group poll-select column">
          <label class="input-group-label">{{i18n
              "poll.ui_builder.poll_chart_type.label"
            }}</label>
  
          <div class="radio-group">
            <RadioButton
              @id="poll-chart-type-bar"
              @name="poll-chart-type"
              @value="bar"
              @selection={{this.chartType}}
            />
            <label for="poll-chart-type-bar">{{d-icon "chart-bar"}}
              {{i18n "poll.ui_builder.poll_chart_type.bar"}}</label>
          </div>
  
          <div class="radio-group">
            <RadioButton
              @id="poll-chart-type-pie"
              @name="poll-chart-type"
              @value="pie"
              @selection={{this.chartType}}
            />
            <label for="poll-chart-type-pie">{{d-icon "chart-pie"}}
              {{i18n "poll.ui_builder.poll_chart_type.pie"}}</label>
          </div>
        </div>
      {{/unless}}
  
      {{#unless this.isPie}}
        <div class="input-group poll-checkbox column">
          <label>
            <Input @type="checkbox" @checked={{this.publicPoll}} />
            {{i18n "poll.ui_builder.poll_public.label"}}
          </label>
        </div>
      {{/unless}}
    {{/if}}
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @action={{action "insertPoll"}}
      @icon="chart-bar"
      @class="btn-primary"
      @label="poll.ui_builder.insert"
      @disabled={{this.disableInsert}}
    />
  
    <DButton
      @label="cancel"
      @class="btn-flat"
      @action={{route-action "closeModal"}}
    />
  
    <DButton
      @action={{action "toggleAdvanced"}}
      @class="btn-default show-advanced"
      @icon="cog"
      @title={{if
        this.showAdvanced
        "poll.ui_builder.hide_advanced"
        "poll.ui_builder.show_advanced"
      }}
    />
  </div>
  */
  {
    "id": "QMXYyUEI",
    "block": "[[[8,[39,0],null,[[\"@title\",\"@class\"],[\"poll.ui_builder.title\",\"poll-ui-builder\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"input-group poll-type\"],[12],[1,\"\\n    \"],[11,3],[24,6,\"\"],[16,0,[29,[\"poll-type-value poll-type-value-regular\\n        \",[52,[30,0,[\"isRegular\"]],\"active\"]]]],[4,[38,2],[\"click\",[28,[37,3],[[30,0,[\"updatePollType\"]],\"regular\"],null]],null],[12],[1,\"\\n      \"],[1,[28,[35,4],[\"poll.ui_builder.poll_type.regular\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[11,3],[24,6,\"\"],[16,0,[29,[\"poll-type-value poll-type-value-multiple\\n        \",[52,[30,0,[\"isMultiple\"]],\"active\"]]]],[4,[38,2],[\"click\",[28,[37,3],[[30,0,[\"updatePollType\"]],\"multiple\"],null]],null],[12],[1,\"\\n      \"],[1,[28,[35,4],[\"poll.ui_builder.poll_type.multiple\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showNumber\"]],[[[1,\"      \"],[11,3],[24,6,\"\"],[16,0,[29,[\"poll-type-value poll-type-value-number\\n          \",[52,[30,0,[\"isNumber\"]],\"active\"]]]],[4,[38,2],[\"click\",[28,[37,3],[[30,0,[\"updatePollType\"]],\"number\"],null]],null],[12],[1,\"\\n        \"],[1,[28,[35,4],[\"poll.ui_builder.poll_type.number\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showAdvanced\"]],[[[1,\"    \"],[10,0],[14,0,\"input-group poll-title\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,4],[\"poll.ui_builder.poll_title.label\"],null]],[13],[1,\"\\n      \"],[8,[39,5],null,[[\"@value\"],[[30,0,[\"pollTitle\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[51,[30,0,[\"isNumber\"]]],[[[1,\"    \"],[10,0],[14,0,\"poll-options\"],[12],[1,\"\\n\"],[41,[30,0,[\"showAdvanced\"]],[[[1,\"        \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,4],[\"poll.ui_builder.poll_options.label\"],null]],[13],[1,\"\\n        \"],[8,[39,7],[[4,[38,2],[\"input\",[28,[37,8],[[30,0],\"onOptionsTextChange\"],null]],null]],[[\"@value\"],[[30,0,[\"pollOptionsText\"]]]],null],[1,\"\"],[41,[30,0,[\"showMinNumOfOptionsValidation\"]],[[[41,[51,[30,0,[\"minNumOfOptionsValidation\",\"ok\"]]],[[[1,\"            \"],[8,[39,9],null,[[\"@validation\"],[[30,0,[\"minNumOfOptionsValidation\"]]]],null],[1,\"\\n\"]],[]],null]],[]],null]],[]],[[[42,[28,[37,11],[[28,[37,11],[[30,0,[\"pollOptions\"]]],null]],null],null,[[[1,\"          \"],[10,0],[14,0,\"input-group poll-option-value\"],[12],[1,\"\\n            \"],[8,[39,5],null,[[\"@value\",\"@enter\"],[[30,1,[\"value\"]],[28,[37,8],[[30,0],\"addOption\",[30,1]],null]]],null],[1,\"\\n\"],[41,[30,0,[\"canRemoveOption\"]],[[[1,\"              \"],[8,[39,12],null,[[\"@icon\",\"@action\"],[\"trash-alt\",[28,[37,8],[[30,0],\"removeOption\",[30,1]],null]]],null],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n\"]],[1]],null],[1,\"\\n        \"],[10,0],[14,0,\"poll-option-controls\"],[12],[1,\"\\n          \"],[8,[39,12],null,[[\"@class\",\"@icon\",\"@label\",\"@action\"],[\"btn-default\",\"plus\",\"poll.ui_builder.poll_options.add\",[28,[37,8],[[30,0],\"addOption\",[30,0,[\"pollOptions\",\"lastObject\"]]],null]]],null],[1,\"\\n\"],[41,[28,[37,13],[[30,0,[\"showMinNumOfOptionsValidation\"]],[28,[37,14],[[30,0,[\"minNumOfOptionsValidation\",\"ok\"]]],null]],null],[[[1,\"            \"],[8,[39,9],null,[[\"@validation\"],[[30,0,[\"minNumOfOptionsValidation\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[51,[30,0,[\"isRegular\"]]],[[[1,\"    \"],[10,0],[14,0,\"options\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"input-group poll-number\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,4],[\"poll.ui_builder.poll_config.min\"],null]],[13],[1,\"\\n        \"],[8,[39,5],[[24,0,\"poll-options-min\"],[24,\"min\",\"1\"]],[[\"@type\",\"@value\"],[\"number\",[30,0,[\"pollMin\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"input-group poll-number\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,4],[\"poll.ui_builder.poll_config.max\"],null]],[13],[1,\"\\n        \"],[8,[39,5],[[24,0,\"poll-options-max\"],[24,\"min\",\"1\"]],[[\"@type\",\"@value\"],[\"number\",[30,0,[\"pollMax\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"isNumber\"]],[[[1,\"        \"],[10,0],[14,0,\"input-group poll-number\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,4],[\"poll.ui_builder.poll_config.step\"],null]],[13],[1,\"\\n          \"],[8,[39,5],[[24,\"min\",\"1\"],[24,0,\"poll-options-step\"]],[[\"@type\",\"@value\"],[\"number\",[30,0,[\"pollStep\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n\"],[41,[51,[30,0,[\"minMaxValueValidation\",\"ok\"]]],[[[1,\"      \"],[8,[39,9],null,[[\"@validation\"],[[30,0,[\"minMaxValueValidation\"]]]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showAdvanced\"]],[[[1,\"    \"],[10,0],[14,0,\"input-group poll-allowed-groups\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,4],[\"poll.ui_builder.poll_groups.label\"],null]],[13],[1,\"\\n      \"],[8,[39,15],null,[[\"@content\",\"@value\",\"@onChange\",\"@labelProperty\",\"@valueProperty\"],[[30,0,[\"siteGroups\"]],[30,0,[\"pollGroups\"]],[28,[37,8],[[30,0],[28,[37,16],[[30,0,[\"pollGroups\"]]],null]],null],\"name\",\"name\"]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"input-group poll-date\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,4],[\"poll.ui_builder.automatic_close.label\"],null]],[13],[1,\"\\n      \"],[8,[39,17],null,[[\"@date\",\"@onChange\",\"@clearable\",\"@useGlobalPickerContainer\"],[[30,0,[\"pollAutoClose\"]],[28,[37,8],[[30,0],[28,[37,16],[[30,0,[\"pollAutoClose\"]]],null]],null],true,true]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"input-group poll-select\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,4],[\"poll.ui_builder.poll_result.label\"],null]],[13],[1,\"\\n      \"],[8,[39,18],null,[[\"@content\",\"@value\",\"@class\",\"@valueProperty\",\"@onChange\"],[[30,0,[\"pollResults\"]],[30,0,[\"pollResult\"]],\"poll-result\",\"value\",[28,[37,8],[[30,0],[28,[37,16],[[30,0,[\"pollResult\"]]],null]],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[51,[30,0,[\"isNumber\"]]],[[[1,\"      \"],[10,0],[14,0,\"input-group poll-select column\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"input-group-label\"],[12],[1,[28,[35,4],[\"poll.ui_builder.poll_chart_type.label\"],null]],[13],[1,\"\\n\\n        \"],[10,0],[14,0,\"radio-group\"],[12],[1,\"\\n          \"],[8,[39,19],null,[[\"@id\",\"@name\",\"@value\",\"@selection\"],[\"poll-chart-type-bar\",\"poll-chart-type\",\"bar\",[30,0,[\"chartType\"]]]],null],[1,\"\\n          \"],[10,\"label\"],[14,\"for\",\"poll-chart-type-bar\"],[12],[1,[28,[35,20],[\"chart-bar\"],null]],[1,\"\\n            \"],[1,[28,[35,4],[\"poll.ui_builder.poll_chart_type.bar\"],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,0,\"radio-group\"],[12],[1,\"\\n          \"],[8,[39,19],null,[[\"@id\",\"@name\",\"@value\",\"@selection\"],[\"poll-chart-type-pie\",\"poll-chart-type\",\"pie\",[30,0,[\"chartType\"]]]],null],[1,\"\\n          \"],[10,\"label\"],[14,\"for\",\"poll-chart-type-pie\"],[12],[1,[28,[35,20],[\"chart-pie\"],null]],[1,\"\\n            \"],[1,[28,[35,4],[\"poll.ui_builder.poll_chart_type.pie\"],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[51,[30,0,[\"isPie\"]]],[[[1,\"      \"],[10,0],[14,0,\"input-group poll-checkbox column\"],[12],[1,\"\\n        \"],[10,\"label\"],[12],[1,\"\\n          \"],[8,[39,5],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"publicPoll\"]]]],null],[1,\"\\n          \"],[1,[28,[35,4],[\"poll.ui_builder.poll_public.label\"],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[]],null]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,12],null,[[\"@action\",\"@icon\",\"@class\",\"@label\",\"@disabled\"],[[28,[37,8],[[30,0],\"insertPoll\"],null],\"chart-bar\",\"btn-primary\",\"poll.ui_builder.insert\",[30,0,[\"disableInsert\"]]]],null],[1,\"\\n\\n  \"],[8,[39,12],null,[[\"@label\",\"@class\",\"@action\"],[\"cancel\",\"btn-flat\",[28,[37,21],[\"closeModal\"],null]]],null],[1,\"\\n\\n  \"],[8,[39,12],null,[[\"@action\",\"@class\",\"@icon\",\"@title\"],[[28,[37,8],[[30,0],\"toggleAdvanced\"],null],\"btn-default show-advanced\",\"cog\",[52,[30,0,[\"showAdvanced\"]],\"poll.ui_builder.hide_advanced\",\"poll.ui_builder.show_advanced\"]]],null],[1,\"\\n\"],[13]],[\"option\"],false,[\"d-modal-body\",\"if\",\"on\",\"fn\",\"i18n\",\"input\",\"unless\",\"textarea\",\"action\",\"input-tip\",\"each\",\"-track-array\",\"d-button\",\"and\",\"not\",\"group-chooser\",\"mut\",\"date-time-input\",\"combo-box\",\"radio-button\",\"d-icon\",\"route-action\"]]",
    "moduleName": "discourse/plugins/poll/discourse/templates/modal/poll-ui-builder.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
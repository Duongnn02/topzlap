define("discourse/plugins/poll/discourse/templates/modal/poll-breakdown", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @title="poll.breakdown.title">
    <div class="poll-breakdown-sidebar">
      <p class="poll-breakdown-title">
        {{this.title}}
      </p>
  
      <div class="poll-breakdown-total-votes">{{i18n
          "poll.breakdown.votes"
          count=this.model.poll.voters
        }}</div>
  
      <ul class="poll-breakdown-options">
        {{#each this.model.poll.options as |option index|}}
          <PollBreakdownOption
            @option={{option}}
            @index={{index}}
            @totalVotes={{this.totalVotes}}
            @optionsCount={{this.model.poll.options.length}}
            @displayMode={{this.displayMode}}
            @highlightedOption={{this.highlightedOption}}
            @onMouseOver={{fn (mut this.highlightedOption) index}}
            @onMouseOut={{fn (mut this.highlightedOption) null}}
          />
        {{/each}}
      </ul>
    </div>
  
    <div class="poll-breakdown-body">
      <div class="poll-breakdown-body-header">
        <label class="poll-breakdown-body-header-label">{{i18n
            "poll.breakdown.breakdown"
          }}</label>
  
        <ComboBox
          @content={{this.groupableUserFields}}
          @value={{this.groupedBy}}
          @nameProperty="label"
          @class="poll-breakdown-dropdown"
          @onChange={{action this.setGrouping}}
        />
      </div>
  
      <div class="poll-breakdown-charts">
        {{#each this.charts as |chart|}}
          <PollBreakdownChart
            @group={{get chart "group"}}
            @options={{get chart "options"}}
            @displayMode={{this.displayMode}}
            @highlightedOption={{this.highlightedOption}}
            @setHighlightedOption={{fn (mut this.highlightedOption)}}
          />
        {{/each}}
      </div>
    </div>
  </DModalBody>
  */
  {
    "id": "Pa4EhLs3",
    "block": "[[[8,[39,0],null,[[\"@title\"],[\"poll.breakdown.title\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"poll-breakdown-sidebar\"],[12],[1,\"\\n    \"],[10,2],[14,0,\"poll-breakdown-title\"],[12],[1,\"\\n      \"],[1,[30,0,[\"title\"]]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"poll-breakdown-total-votes\"],[12],[1,[28,[35,1],[\"poll.breakdown.votes\"],[[\"count\"],[[30,0,[\"model\",\"poll\",\"voters\"]]]]]],[13],[1,\"\\n\\n    \"],[10,\"ul\"],[14,0,\"poll-breakdown-options\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"model\",\"poll\",\"options\"]]],null]],null],null,[[[1,\"        \"],[8,[39,4],null,[[\"@option\",\"@index\",\"@totalVotes\",\"@optionsCount\",\"@displayMode\",\"@highlightedOption\",\"@onMouseOver\",\"@onMouseOut\"],[[30,1],[30,2],[30,0,[\"totalVotes\"]],[30,0,[\"model\",\"poll\",\"options\",\"length\"]],[30,0,[\"displayMode\"]],[30,0,[\"highlightedOption\"]],[28,[37,5],[[28,[37,6],[[30,0,[\"highlightedOption\"]]],null],[30,2]],null],[28,[37,5],[[28,[37,6],[[30,0,[\"highlightedOption\"]]],null],null],null]]],null],[1,\"\\n\"]],[1,2]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"poll-breakdown-body\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"poll-breakdown-body-header\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"poll-breakdown-body-header-label\"],[12],[1,[28,[35,1],[\"poll.breakdown.breakdown\"],null]],[13],[1,\"\\n\\n      \"],[8,[39,7],null,[[\"@content\",\"@value\",\"@nameProperty\",\"@class\",\"@onChange\"],[[30,0,[\"groupableUserFields\"]],[30,0,[\"groupedBy\"]],\"label\",\"poll-breakdown-dropdown\",[28,[37,8],[[30,0],[30,0,[\"setGrouping\"]]],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"poll-breakdown-charts\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"charts\"]]],null]],null],null,[[[1,\"        \"],[8,[39,9],null,[[\"@group\",\"@options\",\"@displayMode\",\"@highlightedOption\",\"@setHighlightedOption\"],[[28,[37,10],[[30,3],\"group\"],null],[28,[37,10],[[30,3],\"options\"],null],[30,0,[\"displayMode\"]],[30,0,[\"highlightedOption\"]],[28,[37,5],[[28,[37,6],[[30,0,[\"highlightedOption\"]]],null]],null]]],null],[1,\"\\n\"]],[3]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]]],[\"option\",\"index\",\"chart\"],false,[\"d-modal-body\",\"i18n\",\"each\",\"-track-array\",\"poll-breakdown-option\",\"fn\",\"mut\",\"combo-box\",\"action\",\"poll-breakdown-chart\",\"get\"]]",
    "moduleName": "discourse/plugins/poll/discourse/templates/modal/poll-breakdown.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
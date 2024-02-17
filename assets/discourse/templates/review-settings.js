define("discourse/templates/review-settings", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="reviewable-settings">
    <h4>{{i18n "review.settings.priorities.title"}}</h4>
  
    {{#each this.scoreTypes as |rst|}}
      <div class="reviewable-score-type">
        <div class="title">{{rst.title}}</div>
        <div class="field">
          <ComboBox
            @value={{rst.reviewable_priority}}
            @content={{this.settings.reviewable_priorities}}
            @onChange={{action (mut rst.reviewable_priority)}}
          />
        </div>
      </div>
    {{/each}}
  
    <div class="reviewable-score-type">
      <div class="title"></div>
      <div class="field">
        <DButton
          @icon="check"
          @label="review.settings.save_changes"
          @class="btn-primary save-settings"
          @action={{action "save"}}
          @disabled={{this.saving}}
        />
  
        {{#if this.saved}}
          <span class="saved">{{i18n "review.settings.saved"}}</span>
        {{/if}}
      </div>
    </div>
  </div>
  */
  {
    "id": "39bJ4gSy",
    "block": "[[[10,0],[14,0,\"reviewable-settings\"],[12],[1,\"\\n  \"],[10,\"h4\"],[12],[1,[28,[35,0],[\"review.settings.priorities.title\"],null]],[13],[1,\"\\n\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"scoreTypes\"]]],null]],null],null,[[[1,\"    \"],[10,0],[14,0,\"reviewable-score-type\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"title\"],[12],[1,[30,1,[\"title\"]]],[13],[1,\"\\n      \"],[10,0],[14,0,\"field\"],[12],[1,\"\\n        \"],[8,[39,3],null,[[\"@value\",\"@content\",\"@onChange\"],[[30,1,[\"reviewable_priority\"]],[30,0,[\"settings\",\"reviewable_priorities\"]],[28,[37,4],[[30,0],[28,[37,5],[[30,1,[\"reviewable_priority\"]]],null]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[1]],null],[1,\"\\n  \"],[10,0],[14,0,\"reviewable-score-type\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"title\"],[12],[13],[1,\"\\n    \"],[10,0],[14,0,\"field\"],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@icon\",\"@label\",\"@class\",\"@action\",\"@disabled\"],[\"check\",\"review.settings.save_changes\",\"btn-primary save-settings\",[28,[37,4],[[30,0],\"save\"],null],[30,0,[\"saving\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"saved\"]],[[[1,\"        \"],[10,1],[14,0,\"saved\"],[12],[1,[28,[35,0],[\"review.settings.saved\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"rst\"],false,[\"i18n\",\"each\",\"-track-array\",\"combo-box\",\"action\",\"mut\",\"d-button\",\"if\"]]",
    "moduleName": "discourse/templates/review-settings.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/templates/modal/explain-reviewable", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @class="explain-reviewable">
    <ConditionalLoadingSpinner @condition={{this.loading}}>
      <table>
        <tbody>
          <tr>
            <th>{{i18n "review.explain.formula"}}</th>
            <th>{{i18n "review.explain.subtotal"}}</th>
          </tr>
          {{#each this.reviewableExplanation.scores as |s|}}
            <tr>
              <td>
                <ScoreValue @value="1.0" @tagName="" />
                <ScoreValue
                  @value={{s.type_bonus}}
                  @label="type_bonus"
                  @tagName=""
                />
                <ScoreValue
                  @value={{s.take_action_bonus}}
                  @label="take_action_bonus"
                  @tagName=""
                />
                <ScoreValue
                  @value={{s.trust_level_bonus}}
                  @label="trust_level_bonus"
                  @tagName=""
                />
                <ScoreValue
                  @value={{s.user_accuracy_bonus}}
                  @label="user_accuracy_bonus"
                  @tagName=""
                />
              </td>
              <td class="sum">{{float s.score}}</td>
            </tr>
          {{/each}}
          <tr class="total">
            <td>{{i18n "review.explain.total"}}</td>
            <td class="sum">{{float this.reviewableExplanation.total_score}}</td>
          </tr>
        </tbody>
      </table>
  
      <table class="thresholds">
        <tbody>
          <tr>
            <td>{{i18n "review.explain.min_score_visibility"}}</td>
            <td class="sum">
              {{float this.reviewableExplanation.min_score_visibility}}
            </td>
          </tr>
          <tr>
            <td>{{i18n "review.explain.score_to_hide"}}</td>
            <td class="sum">
              {{float this.reviewableExplanation.hide_post_score}}
            </td>
          </tr>
        </tbody>
      </table>
  
    </ConditionalLoadingSpinner>
  
  </DModalBody>
  
  <div class="modal-footer">
    <DButton @action={{route-action "closeModal"}} @label="close" />
  </div>
  */
  {
    "id": "3fMbWKta",
    "block": "[[[8,[39,0],null,[[\"@class\"],[\"explain-reviewable\"]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n    \"],[10,\"table\"],[12],[1,\"\\n      \"],[10,\"tbody\"],[12],[1,\"\\n        \"],[10,\"tr\"],[12],[1,\"\\n          \"],[10,\"th\"],[12],[1,[28,[35,2],[\"review.explain.formula\"],null]],[13],[1,\"\\n          \"],[10,\"th\"],[12],[1,[28,[35,2],[\"review.explain.subtotal\"],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"reviewableExplanation\",\"scores\"]]],null]],null],null,[[[1,\"          \"],[10,\"tr\"],[12],[1,\"\\n            \"],[10,\"td\"],[12],[1,\"\\n              \"],[8,[39,5],null,[[\"@value\",\"@tagName\"],[\"1.0\",\"\"]],null],[1,\"\\n              \"],[8,[39,5],null,[[\"@value\",\"@label\",\"@tagName\"],[[30,1,[\"type_bonus\"]],\"type_bonus\",\"\"]],null],[1,\"\\n              \"],[8,[39,5],null,[[\"@value\",\"@label\",\"@tagName\"],[[30,1,[\"take_action_bonus\"]],\"take_action_bonus\",\"\"]],null],[1,\"\\n              \"],[8,[39,5],null,[[\"@value\",\"@label\",\"@tagName\"],[[30,1,[\"trust_level_bonus\"]],\"trust_level_bonus\",\"\"]],null],[1,\"\\n              \"],[8,[39,5],null,[[\"@value\",\"@label\",\"@tagName\"],[[30,1,[\"user_accuracy_bonus\"]],\"user_accuracy_bonus\",\"\"]],null],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,\"td\"],[14,0,\"sum\"],[12],[1,[28,[35,6],[[30,1,[\"score\"]]],null]],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[1]],null],[1,\"        \"],[10,\"tr\"],[14,0,\"total\"],[12],[1,\"\\n          \"],[10,\"td\"],[12],[1,[28,[35,2],[\"review.explain.total\"],null]],[13],[1,\"\\n          \"],[10,\"td\"],[14,0,\"sum\"],[12],[1,[28,[35,6],[[30,0,[\"reviewableExplanation\",\"total_score\"]]],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,\"table\"],[14,0,\"thresholds\"],[12],[1,\"\\n      \"],[10,\"tbody\"],[12],[1,\"\\n        \"],[10,\"tr\"],[12],[1,\"\\n          \"],[10,\"td\"],[12],[1,[28,[35,2],[\"review.explain.min_score_visibility\"],null]],[13],[1,\"\\n          \"],[10,\"td\"],[14,0,\"sum\"],[12],[1,\"\\n            \"],[1,[28,[35,6],[[30,0,[\"reviewableExplanation\",\"min_score_visibility\"]]],null]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"tr\"],[12],[1,\"\\n          \"],[10,\"td\"],[12],[1,[28,[35,2],[\"review.explain.score_to_hide\"],null]],[13],[1,\"\\n          \"],[10,\"td\"],[14,0,\"sum\"],[12],[1,\"\\n            \"],[1,[28,[35,6],[[30,0,[\"reviewableExplanation\",\"hide_post_score\"]]],null]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n  \"]],[]]]]],[1,\"\\n\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,7],null,[[\"@action\",\"@label\"],[[28,[37,8],[\"closeModal\"],null],\"close\"]],null],[1,\"\\n\"],[13]],[\"s\"],false,[\"d-modal-body\",\"conditional-loading-spinner\",\"i18n\",\"each\",\"-track-array\",\"score-value\",\"float\",\"d-button\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/explain-reviewable.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
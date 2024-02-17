define("discourse/components/reviewable-histories", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed"], function (_exports, _component, _templateFactory, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.filteredHistories}}
    <table class="reviewable-histories">
      <thead>
        <tr>
          <th colspan="3">{{i18n "review.history.title"}}</th>
        </tr>
      </thead>
      <tbody>
        {{#each this.filteredHistories as |rh|}}
          {{#unless rh.created}}
            <tr>
              <td>
                {{reviewable-history-description rh}}
              </td>
              <td>
                <UserLink @user={{this.rs.user}}>
                  {{avatar rh.created_by imageSize="tiny"}}
                  {{rh.created_by.username}}
                </UserLink>
              </td>
              <td>{{format-date rh.created_at format="medium"}}</td>
            </tr>
          {{/unless}}
        {{/each}}
      </tbody>
    </table>
  {{/if}}
  */
  {
    "id": "kw2eCqwR",
    "block": "[[[41,[30,0,[\"filteredHistories\"]],[[[1,\"  \"],[10,\"table\"],[14,0,\"reviewable-histories\"],[12],[1,\"\\n    \"],[10,\"thead\"],[12],[1,\"\\n      \"],[10,\"tr\"],[12],[1,\"\\n        \"],[10,\"th\"],[14,\"colspan\",\"3\"],[12],[1,[28,[35,1],[\"review.history.title\"],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"filteredHistories\"]]],null]],null],null,[[[41,[51,[30,1,[\"created\"]]],[[[1,\"          \"],[10,\"tr\"],[12],[1,\"\\n            \"],[10,\"td\"],[12],[1,\"\\n              \"],[1,[28,[35,5],[[30,1]],null]],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,\"td\"],[12],[1,\"\\n              \"],[8,[39,6],null,[[\"@user\"],[[30,0,[\"rs\",\"user\"]]]],[[\"default\"],[[[[1,\"\\n                \"],[1,[28,[35,7],[[30,1,[\"created_by\"]]],[[\"imageSize\"],[\"tiny\"]]]],[1,\"\\n                \"],[1,[30,1,[\"created_by\",\"username\"]]],[1,\"\\n              \"]],[]]]]],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,\"td\"],[12],[1,[28,[35,8],[[30,1,[\"created_at\"]]],[[\"format\"],[\"medium\"]]]],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null]],[1]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"rh\"],false,[\"if\",\"i18n\",\"each\",\"-track-array\",\"unless\",\"reviewable-history-description\",\"user-link\",\"avatar\",\"format-date\"]]",
    "moduleName": "discourse/components/reviewable-histories.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    filteredHistories: (0, _computed.filterBy)("histories", "created", false)
  }));
  _exports.default = _default;
});
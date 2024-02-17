define("discourse/templates/group/permissions", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <section class="user-content" id="user-content">
    {{#if this.model.permissions}}
      <label class="group-category-permissions-desc">
        {{i18n "groups.permissions.description"}}
      </label>
      <table class="group-category-permissions">
        <tbody>
          {{#each this.model.permissions as |permission|}}
            <tr>
              <td>{{category-link permission.category}}</td>
              <td>{{permission.description}}</td>
            </tr>
          {{/each}}
        </tbody>
      </table>
    {{else}}
      {{i18n "groups.permissions.none"}}
    {{/if}}
  </section>
  */
  {
    "id": "1L1yCrHV",
    "block": "[[[10,\"section\"],[14,0,\"user-content\"],[14,1,\"user-content\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"permissions\"]],[[[1,\"    \"],[10,\"label\"],[14,0,\"group-category-permissions-desc\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"groups.permissions.description\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"table\"],[14,0,\"group-category-permissions\"],[12],[1,\"\\n      \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"model\",\"permissions\"]]],null]],null],null,[[[1,\"          \"],[10,\"tr\"],[12],[1,\"\\n            \"],[10,\"td\"],[12],[1,[28,[35,4],[[30,1,[\"category\"]]],null]],[13],[1,\"\\n            \"],[10,\"td\"],[12],[1,[30,1,[\"description\"]]],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[1]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[1,[28,[35,1],[\"groups.permissions.none\"],null]],[1,\"\\n\"]],[]]],[13]],[\"permission\"],false,[\"if\",\"i18n\",\"each\",\"-track-array\",\"category-link\"]]",
    "moduleName": "discourse/templates/group/permissions.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
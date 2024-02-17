define("discourse/templates/modal/reorder-categories", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody
    @class="reorder-categories full-height-modal"
    @title="categories.reorder.title"
  >
    <div id="rc-scroll-anchor"></div>
    <table>
      <thead>
        <th class="th-cat">{{i18n "categories.category"}}</th>
        <th class="th-pos">{{i18n "categories.reorder.position"}}</th>
      </thead>
      <tbody>
        {{#each this.categoriesOrdered as |cat|}}
          <tr data-category-id={{cat.id}}>
            <td>
              <div class={{concat "reorder-categories-depth-" cat.depth}}>
                {{category-badge cat allowUncategorized="true"}}
              </div>
            </td>
  
            <td>
              <NumberField
                @number={{readonly cat.position}}
                @change={{action "change" cat}}
                @min="0"
              />
              <DButton
                @class="btn-default no-text"
                @action={{action "moveUp"}}
                @actionParam={{cat}}
                @icon="arrow-up"
              />
              <DButton
                @class="btn-default no-text"
                @action={{action "moveDown"}}
                @actionParam={{cat}}
                @icon="arrow-down"
              />
            </td>
          </tr>
        {{/each}}
      </tbody>
    </table>
    <div id="rc-scroll-bottom"></div>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @action={{action "save"}}
      @label="categories.reorder.save"
    />
  </div>
  */
  {
    "id": "cmT7exIi",
    "block": "[[[8,[39,0],null,[[\"@class\",\"@title\"],[\"reorder-categories full-height-modal\",\"categories.reorder.title\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,1,\"rc-scroll-anchor\"],[12],[13],[1,\"\\n  \"],[10,\"table\"],[12],[1,\"\\n    \"],[10,\"thead\"],[12],[1,\"\\n      \"],[10,\"th\"],[14,0,\"th-cat\"],[12],[1,[28,[35,1],[\"categories.category\"],null]],[13],[1,\"\\n      \"],[10,\"th\"],[14,0,\"th-pos\"],[12],[1,[28,[35,1],[\"categories.reorder.position\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,\"tbody\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"categoriesOrdered\"]]],null]],null],null,[[[1,\"        \"],[10,\"tr\"],[15,\"data-category-id\",[30,1,[\"id\"]]],[12],[1,\"\\n          \"],[10,\"td\"],[12],[1,\"\\n            \"],[10,0],[15,0,[28,[37,4],[\"reorder-categories-depth-\",[30,1,[\"depth\"]]],null]],[12],[1,\"\\n              \"],[1,[28,[35,5],[[30,1]],[[\"allowUncategorized\"],[\"true\"]]]],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[10,\"td\"],[12],[1,\"\\n            \"],[8,[39,6],null,[[\"@number\",\"@change\",\"@min\"],[[28,[37,7],[[30,1,[\"position\"]]],null],[28,[37,8],[[30,0],\"change\",[30,1]],null],\"0\"]],null],[1,\"\\n            \"],[8,[39,9],null,[[\"@class\",\"@action\",\"@actionParam\",\"@icon\"],[\"btn-default no-text\",[28,[37,8],[[30,0],\"moveUp\"],null],[30,1],\"arrow-up\"]],null],[1,\"\\n            \"],[8,[39,9],null,[[\"@class\",\"@action\",\"@actionParam\",\"@icon\"],[\"btn-default no-text\",[28,[37,8],[[30,0],\"moveDown\"],null],[30,1],\"arrow-down\"]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,1,\"rc-scroll-bottom\"],[12],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,9],null,[[\"@class\",\"@action\",\"@label\"],[\"btn-primary\",[28,[37,8],[[30,0],\"save\"],null],\"categories.reorder.save\"]],null],[1,\"\\n\"],[13]],[\"cat\"],false,[\"d-modal-body\",\"i18n\",\"each\",\"-track-array\",\"concat\",\"category-badge\",\"number-field\",\"readonly\",\"action\",\"d-button\"]]",
    "moduleName": "discourse/templates/modal/reorder-categories.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
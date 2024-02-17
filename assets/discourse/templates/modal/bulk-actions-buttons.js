define("discourse/templates/modal/bulk-actions-buttons", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="bulk-buttons">
    {{#each this.buttons as |button|}}
      <DButton
        @action={{action button.action}}
        @label={{button.label}}
        @icon={{button.icon}}
        @class={{button.class}}
      />
    {{/each}}
  </div>
  */
  {
    "id": "xXAa1JO1",
    "block": "[[[10,0],[14,0,\"bulk-buttons\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,0,[\"buttons\"]]],null]],null],null,[[[1,\"    \"],[8,[39,2],null,[[\"@action\",\"@label\",\"@icon\",\"@class\"],[[28,[37,3],[[30,0],[30,1,[\"action\"]]],null],[30,1,[\"label\"]],[30,1,[\"icon\"]],[30,1,[\"class\"]]]],null],[1,\"\\n\"]],[1]],null],[13]],[\"button\"],false,[\"each\",\"-track-array\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/templates/modal/bulk-actions-buttons.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
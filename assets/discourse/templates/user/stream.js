define("discourse/templates/user/stream", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.model.stream.noContent}}
    <EmptyState
      @title={{this.model.emptyState.title}}
      @body={{this.model.emptyState.body}}
    />
  {{/if}}
  <UserStream @stream={{this.model.stream}} />
  */
  {
    "id": "5inH9esI",
    "block": "[[[41,[30,0,[\"model\",\"stream\",\"noContent\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@title\",\"@body\"],[[30,0,[\"model\",\"emptyState\",\"title\"]],[30,0,[\"model\",\"emptyState\",\"body\"]]]],null],[1,\"\\n\"]],[]],null],[8,[39,2],null,[[\"@stream\"],[[30,0,[\"model\",\"stream\"]]]],null]],[],false,[\"if\",\"empty-state\",\"user-stream\"]]",
    "moduleName": "discourse/templates/user/stream.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
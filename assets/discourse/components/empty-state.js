define("discourse/components/empty-state", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="empty-state-container">
    <div class="empty-state">
      <span data-test-title class="empty-state-title">{{@title}}</span>
      <div class="empty-state-body">
        <p data-test-body>{{@body}}</p>
      </div>
    </div>
  </div>
  */
  {
    "id": "4aK7qGYk",
    "block": "[[[10,0],[14,0,\"empty-state-container\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"empty-state\"],[12],[1,\"\\n    \"],[10,1],[14,\"data-test-title\",\"\"],[14,0,\"empty-state-title\"],[12],[1,[30,1]],[13],[1,\"\\n    \"],[10,0],[14,0,\"empty-state-body\"],[12],[1,\"\\n      \"],[10,2],[14,\"data-test-body\",\"\"],[12],[1,[30,2]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"@title\",\"@body\"],false,[]]",
    "moduleName": "discourse/components/empty-state.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});
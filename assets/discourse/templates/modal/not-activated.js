define("discourse/templates/modal/not-activated", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    {{html-safe (i18n "login.not_activated" sentTo=this.sentTo)}}
  </DModalBody>
  
  <div class="modal-footer">
    <ActivationControls
      @sendActivationEmail={{action "sendActivationEmail"}}
      @editActivationEmail={{action "editActivationEmail"}}
    />
  </div>
  */
  {
    "id": "hmXxOosi",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[1,[28,[35,1],[[28,[37,2],[\"login.not_activated\"],[[\"sentTo\"],[[30,0,[\"sentTo\"]]]]]],null]],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,3],null,[[\"@sendActivationEmail\",\"@editActivationEmail\"],[[28,[37,4],[[30,0],\"sendActivationEmail\"],null],[28,[37,4],[[30,0],\"editActivationEmail\"],null]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"html-safe\",\"i18n\",\"activation-controls\",\"action\"]]",
    "moduleName": "discourse/templates/modal/not-activated.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
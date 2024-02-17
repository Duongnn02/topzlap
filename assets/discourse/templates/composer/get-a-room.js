define("discourse/templates/composer/get-a-room", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <a
    href
    {{on "click" (fn this.closeMessage this.message)}}
    class="close"
    aria-label={{i18n "composer.esc_label"}}
  >
    {{i18n "composer.esc"}}
    {{d-icon "times"}}
  </a>
  
  {{html-safe this.message.body}}
  
  <DButton
    @class="btn-primary"
    @label="user.private_message"
    @icon="envelope"
    @action={{action this.switchPM this.message}}
  />
  */
  {
    "id": "V7z4nxAG",
    "block": "[[[11,3],[24,6,\"\"],[24,0,\"close\"],[16,\"aria-label\",[28,[37,0],[\"composer.esc_label\"],null]],[4,[38,1],[\"click\",[28,[37,2],[[30,0,[\"closeMessage\"]],[30,0,[\"message\"]]],null]],null],[12],[1,\"\\n  \"],[1,[28,[35,0],[\"composer.esc\"],null]],[1,\"\\n  \"],[1,[28,[35,3],[\"times\"],null]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[1,[28,[35,4],[[30,0,[\"message\",\"body\"]]],null]],[1,\"\\n\\n\"],[8,[39,5],null,[[\"@class\",\"@label\",\"@icon\",\"@action\"],[\"btn-primary\",\"user.private_message\",\"envelope\",[28,[37,6],[[30,0],[30,0,[\"switchPM\"]],[30,0,[\"message\"]]],null]]],null]],[],false,[\"i18n\",\"on\",\"fn\",\"d-icon\",\"html-safe\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/templates/composer/get-a-room.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
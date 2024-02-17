define("discourse/templates/modal/keyboard-shortcuts-help", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @id="keyboard-shortcuts-help">
    <div class="keyboard-shortcuts-help__container">
      {{#each-in this.shortcuts as |category shortcutCategory|}}
        <section
          class="shortcut-category span-{{shortcutCategory.count}}
            shortcut-category-{{category}}"
        >
          <h4>{{i18n (concat "keyboard_shortcuts_help." category ".title")}}</h4>
          <ul>
            {{#each-in shortcutCategory.shortcuts as |name shortcut|}}
              <li>{{html-safe shortcut}}</li>
            {{/each-in}}
          </ul>
        </section>
      {{/each-in}}
    </div>
  </DModalBody>
  */
  {
    "id": "gLlefCPr",
    "block": "[[[8,[39,0],null,[[\"@id\"],[\"keyboard-shortcuts-help\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"keyboard-shortcuts-help__container\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[30,0,[\"shortcuts\"]]],null],null,[[[1,\"      \"],[10,\"section\"],[15,0,[29,[\"shortcut-category span-\",[30,1,[\"count\"]],\"\\n          shortcut-category-\",[30,2]]]],[12],[1,\"\\n        \"],[10,\"h4\"],[12],[1,[28,[35,3],[[28,[37,4],[\"keyboard_shortcuts_help.\",[30,2],\".title\"],null]],null]],[13],[1,\"\\n        \"],[10,\"ul\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[30,1,[\"shortcuts\"]]],null],null,[[[1,\"            \"],[10,\"li\"],[12],[1,[28,[35,5],[[30,3]],null]],[13],[1,\"\\n\"]],[3,4]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[1,2]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]]]]]],[\"shortcutCategory\",\"category\",\"shortcut\",\"name\"],false,[\"d-modal-body\",\"each\",\"-each-in\",\"i18n\",\"concat\",\"html-safe\"]]",
    "moduleName": "discourse/templates/modal/keyboard-shortcuts-help.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("select-kit/templates/components/select-kit/select-kit-filter", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.isHidden}}
    {{! filter-input-search prevents 1password from attempting autocomplete }}
    {{! template-lint-disable no-down-event-binding }}
  
    <Input
      tabindex={{0}}
      class="filter-input"
      placeholder={{this.placeholder}}
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      name="filter-input-search"
      spellcheck={{false}}
      @value={{readonly this.selectKit.filter}}
      @type="search"
      {{on "paste" (action "onPaste")}}
      {{on "keydown" (action "onKeydown")}}
      {{on "keyup" (action "onKeyup")}}
      {{on "input" (action "onInput")}}
    />
  
    {{#if this.selectKit.options.filterIcon}}
      {{d-icon this.selectKit.options.filterIcon class="filter-icon"}}
    {{/if}}
  {{/unless}}
  */
  {
    "id": "yzCKil5I",
    "block": "[[[41,[51,[30,0,[\"isHidden\"]]],[[[1,\"\\n  \"],[8,[39,1],[[16,\"tabindex\",0],[24,0,\"filter-input\"],[16,\"placeholder\",[30,0,[\"placeholder\"]]],[24,\"autocomplete\",\"off\"],[24,\"autocorrect\",\"off\"],[24,\"autocapitalize\",\"off\"],[24,3,\"filter-input-search\"],[16,\"spellcheck\",false],[4,[38,3],[\"paste\",[28,[37,4],[[30,0],\"onPaste\"],null]],null],[4,[38,3],[\"keydown\",[28,[37,4],[[30,0],\"onKeydown\"],null]],null],[4,[38,3],[\"keyup\",[28,[37,4],[[30,0],\"onKeyup\"],null]],null],[4,[38,3],[\"input\",[28,[37,4],[[30,0],\"onInput\"],null]],null]],[[\"@value\",\"@type\"],[[28,[37,2],[[30,0,[\"selectKit\",\"filter\"]]],null],\"search\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"selectKit\",\"options\",\"filterIcon\"]],[[[1,\"    \"],[1,[28,[35,6],[[30,0,[\"selectKit\",\"options\",\"filterIcon\"]]],[[\"class\"],[\"filter-icon\"]]]],[1,\"\\n\"]],[]],null]],[]],null]],[],false,[\"unless\",\"input\",\"readonly\",\"on\",\"action\",\"if\",\"d-icon\"]]",
    "moduleName": "select-kit/templates/components/select-kit/select-kit-filter.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
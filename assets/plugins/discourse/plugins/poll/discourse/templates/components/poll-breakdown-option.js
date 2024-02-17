define("discourse/plugins/poll/discourse/templates/components/poll-breakdown-option", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <li
    class="poll-breakdown-option"
    style={{this.colorBackgroundStyle}}
    {{on "mouseover" @onMouseOver}}
    {{on "mouseout" @onMouseOut}}
    role="button"
  >
    <span
      class="poll-breakdown-option-color"
      style={{this.colorPreviewStyle}}
    ></span>
  
    <span class="poll-breakdown-option-count">
      {{#if this.showPercentage}}
        {{this.percent}}%
      {{else}}
        {{@option.votes}}
      {{/if}}
    </span>
    <span class="poll-breakdown-option-text">{{html-safe @option.html}}</span>
  </li>
  */
  {
    "id": "xjKG75Pr",
    "block": "[[[11,\"li\"],[24,0,\"poll-breakdown-option\"],[16,5,[30,0,[\"colorBackgroundStyle\"]]],[24,\"role\",\"button\"],[4,[38,0],[\"mouseover\",[30,1]],null],[4,[38,0],[\"mouseout\",[30,2]],null],[12],[1,\"\\n  \"],[10,1],[14,0,\"poll-breakdown-option-color\"],[15,5,[30,0,[\"colorPreviewStyle\"]]],[12],[13],[1,\"\\n\\n  \"],[10,1],[14,0,\"poll-breakdown-option-count\"],[12],[1,\"\\n\"],[41,[30,0,[\"showPercentage\"]],[[[1,\"      \"],[1,[30,0,[\"percent\"]]],[1,\"%\\n\"]],[]],[[[1,\"      \"],[1,[30,3,[\"votes\"]]],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n  \"],[10,1],[14,0,\"poll-breakdown-option-text\"],[12],[1,[28,[35,2],[[30,3,[\"html\"]]],null]],[13],[1,\"\\n\"],[13]],[\"@onMouseOver\",\"@onMouseOut\",\"@option\"],false,[\"on\",\"if\",\"html-safe\"]]",
    "moduleName": "discourse/plugins/poll/discourse/templates/components/poll-breakdown-option.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
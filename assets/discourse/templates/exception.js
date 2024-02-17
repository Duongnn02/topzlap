define("discourse/templates/exception", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container">
    {{#if (and this.errorHtml this.isForbidden)}}
      <div class="not-found">{{html-safe this.errorHtml}}</div>
    {{else}}
      <div class="error-page">
        <div class="face">:(</div>
        <div class="reason">{{this.reason}}</div>
        {{#if this.requestUrl}}
          <div class="url">
            {{i18n "errors.prev_page"}}
            <a
              href={{this.requestUrl}}
              data-auto-route="true"
            >{{this.requestUrl}}</a>
          </div>
        {{/if}}
        <div class="desc">
          {{#if this.networkFixed}}
            {{d-icon "check-circle"}}
          {{/if}}
  
          {{this.desc}}
        </div>
        <div class="buttons">
          {{#each this.enabledButtons as |buttonData|}}
            <DButton
              @icon={{buttonData.icon}}
              @action={{buttonData.action}}
              @label={{buttonData.key}}
              @class={{buttonData.classes}}
            />
          {{/each}}
          <ConditionalLoadingSpinner @condition={{this.loading}} />
        </div>
      </div>
    {{/if}}
  </div>
  */
  {
    "id": "5n3ICToH",
    "block": "[[[10,0],[14,0,\"container\"],[12],[1,\"\\n\"],[41,[28,[37,1],[[30,0,[\"errorHtml\"]],[30,0,[\"isForbidden\"]]],null],[[[1,\"    \"],[10,0],[14,0,\"not-found\"],[12],[1,[28,[35,2],[[30,0,[\"errorHtml\"]]],null]],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"error-page\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"face\"],[12],[1,\":(\"],[13],[1,\"\\n      \"],[10,0],[14,0,\"reason\"],[12],[1,[30,0,[\"reason\"]]],[13],[1,\"\\n\"],[41,[30,0,[\"requestUrl\"]],[[[1,\"        \"],[10,0],[14,0,\"url\"],[12],[1,\"\\n          \"],[1,[28,[35,3],[\"errors.prev_page\"],null]],[1,\"\\n          \"],[10,3],[15,6,[30,0,[\"requestUrl\"]]],[14,\"data-auto-route\",\"true\"],[12],[1,[30,0,[\"requestUrl\"]]],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[10,0],[14,0,\"desc\"],[12],[1,\"\\n\"],[41,[30,0,[\"networkFixed\"]],[[[1,\"          \"],[1,[28,[35,4],[\"check-circle\"],null]],[1,\"\\n\"]],[]],null],[1,\"\\n        \"],[1,[30,0,[\"desc\"]]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"buttons\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,0,[\"enabledButtons\"]]],null]],null],null,[[[1,\"          \"],[8,[39,7],null,[[\"@icon\",\"@action\",\"@label\",\"@class\"],[[30,1,[\"icon\"]],[30,1,[\"action\"]],[30,1,[\"key\"]],[30,1,[\"classes\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"        \"],[8,[39,8],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]],[13]],[\"buttonData\"],false,[\"if\",\"and\",\"html-safe\",\"i18n\",\"d-icon\",\"each\",\"-track-array\",\"d-button\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/exception.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
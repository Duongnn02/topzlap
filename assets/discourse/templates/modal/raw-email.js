define("discourse/templates/modal/raw-email", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody
    @title="raw_email.title"
    @class="incoming-email-modal"
    @maxHeight="80%"
  >
    <div class="incoming-email-tabs">
      <DButton
        @action={{action "displayRaw"}}
        @label="post.raw_email.displays.raw.button"
        @title="post.raw_email.displays.raw.title"
        @class={{if this.showRawEmail "active"}}
      />
  
      {{#if this.textPart}}
        <DButton
          @action={{action "displayTextPart"}}
          @label="post.raw_email.displays.text_part.button"
          @title="post.raw_email.displays.text_part.title"
          @class={{if this.showTextPart "active"}}
        />
      {{/if}}
  
      {{#if this.htmlPart}}
        <DButton
          @action={{action "displayHtmlPart"}}
          @label="post.raw_email.displays.html_part.button"
          @title="post.raw_email.displays.html_part.title"
          @class={{if this.showHtmlPart "active"}}
        />
      {{/if}}
    </div>
  
    <div class="incoming-email-content">
      {{#if this.showRawEmail}}
        {{#if this.rawEmail}}
          <Textarea @value={{this.rawEmail}} />
        {{else}}
          {{i18n "raw_email.not_available"}}
        {{/if}}
      {{/if}}
      {{#if this.showTextPart}}
        <Textarea @value={{this.textPart}} />
      {{/if}}
      {{#if this.showHtmlPart}}
        <IframedHtml
          @html={{this.htmlPart}}
          @className="incoming-email-html-part"
        />
      {{/if}}
    </div>
  </DModalBody>
  */
  {
    "id": "WOHM9y7f",
    "block": "[[[8,[39,0],null,[[\"@title\",\"@class\",\"@maxHeight\"],[\"raw_email.title\",\"incoming-email-modal\",\"80%\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"incoming-email-tabs\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@action\",\"@label\",\"@title\",\"@class\"],[[28,[37,2],[[30,0],\"displayRaw\"],null],\"post.raw_email.displays.raw.button\",\"post.raw_email.displays.raw.title\",[52,[30,0,[\"showRawEmail\"]],\"active\"]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"textPart\"]],[[[1,\"      \"],[8,[39,1],null,[[\"@action\",\"@label\",\"@title\",\"@class\"],[[28,[37,2],[[30,0],\"displayTextPart\"],null],\"post.raw_email.displays.text_part.button\",\"post.raw_email.displays.text_part.title\",[52,[30,0,[\"showTextPart\"]],\"active\"]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"htmlPart\"]],[[[1,\"      \"],[8,[39,1],null,[[\"@action\",\"@label\",\"@title\",\"@class\"],[[28,[37,2],[[30,0],\"displayHtmlPart\"],null],\"post.raw_email.displays.html_part.button\",\"post.raw_email.displays.html_part.title\",[52,[30,0,[\"showHtmlPart\"]],\"active\"]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"incoming-email-content\"],[12],[1,\"\\n\"],[41,[30,0,[\"showRawEmail\"]],[[[41,[30,0,[\"rawEmail\"]],[[[1,\"        \"],[8,[39,4],null,[[\"@value\"],[[30,0,[\"rawEmail\"]]]],null],[1,\"\"]],[]],[[[1,\"        \"],[1,[28,[35,5],[\"raw_email.not_available\"],null]],[1,\"\"]],[]]]],[]],null],[41,[30,0,[\"showTextPart\"]],[[[1,\"      \"],[8,[39,4],null,[[\"@value\"],[[30,0,[\"textPart\"]]]],null],[1,\"\"]],[]],null],[41,[30,0,[\"showHtmlPart\"]],[[[1,\"      \"],[8,[39,6],null,[[\"@html\",\"@className\"],[[30,0,[\"htmlPart\"]],\"incoming-email-html-part\"]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]]]]]],[],false,[\"d-modal-body\",\"d-button\",\"action\",\"if\",\"textarea\",\"i18n\",\"iframed-html\"]]",
    "moduleName": "discourse/templates/modal/raw-email.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/templates/modal/insert-hyperlink", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @title="composer.link_dialog_title" @class="insert-link">
    <form id="insert-hyperlink-form" {{on "submit" (action "ok")}}>
      <div class="inputs">
        <TextField
          @value={{this.linkUrl}}
          @placeholderKey="composer.link_url_placeholder"
          @class="link-url"
          @key-up={{action "search"}}
          @autofocus="autofocus"
        />
        {{#if this.searchLoading}}
          {{loading-spinner}}
        {{/if}}
        {{#if this.searchResults}}
          <div class="internal-link-results">
            {{#each this.searchResults as |result|}}
              <a
                class="search-link"
                href={{result.url}}
                onclick={{action "linkClick"}}
                data-title={{result.fancy_title}}
              >
                <TopicStatus @topic={{result}} @disableActions={{true}} />
                {{replace-emoji result.title}}
                <div class="search-category">
                  {{#if result.category.parentCategory}}
                    {{category-link result.category.parentCategory}}
                  {{/if}}
                  {{category-link result.category hideParent=true}}
                  {{discourse-tags result}}
                </div>
              </a>
            {{/each}}
          </div>
        {{/if}}
      </div>
      <div class="inputs">
        <TextField
          @value={{this.linkText}}
          @placeholderKey="composer.link_optional_text"
          @class="link-text"
        />
      </div>
    </form>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @label="composer.modal_ok"
      @action={{action "ok"}}
      @type="submit"
      @form="insert-hyperlink-form"
    />
  
    <DButton
      @class="btn-danger"
      @label="composer.modal_cancel"
      @action={{action "cancel"}}
    />
  </div>
  */
  {
    "id": "pzp2M5Z8",
    "block": "[[[8,[39,0],null,[[\"@title\",\"@class\"],[\"composer.link_dialog_title\",\"insert-link\"]],[[\"default\"],[[[[1,\"\\n  \"],[11,\"form\"],[24,1,\"insert-hyperlink-form\"],[4,[38,1],[\"submit\",[28,[37,2],[[30,0],\"ok\"],null]],null],[12],[1,\"\\n    \"],[10,0],[14,0,\"inputs\"],[12],[1,\"\\n      \"],[8,[39,3],null,[[\"@value\",\"@placeholderKey\",\"@class\",\"@key-up\",\"@autofocus\"],[[30,0,[\"linkUrl\"]],\"composer.link_url_placeholder\",\"link-url\",[28,[37,2],[[30,0],\"search\"],null],\"autofocus\"]],null],[1,\"\\n\"],[41,[30,0,[\"searchLoading\"]],[[[1,\"        \"],[1,[34,5]],[1,\"\\n\"]],[]],null],[41,[30,0,[\"searchResults\"]],[[[1,\"        \"],[10,0],[14,0,\"internal-link-results\"],[12],[1,\"\\n\"],[42,[28,[37,7],[[28,[37,7],[[30,0,[\"searchResults\"]]],null]],null],null,[[[1,\"            \"],[10,3],[14,0,\"search-link\"],[15,6,[30,1,[\"url\"]]],[15,\"onclick\",[28,[37,2],[[30,0],\"linkClick\"],null]],[15,\"data-title\",[30,1,[\"fancy_title\"]]],[12],[1,\"\\n              \"],[8,[39,8],null,[[\"@topic\",\"@disableActions\"],[[30,1],true]],null],[1,\"\\n              \"],[1,[28,[35,9],[[30,1,[\"title\"]]],null]],[1,\"\\n              \"],[10,0],[14,0,\"search-category\"],[12],[1,\"\\n\"],[41,[30,1,[\"category\",\"parentCategory\"]],[[[1,\"                  \"],[1,[28,[35,10],[[30,1,[\"category\",\"parentCategory\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"                \"],[1,[28,[35,10],[[30,1,[\"category\"]]],[[\"hideParent\"],[true]]]],[1,\"\\n                \"],[1,[28,[35,11],[[30,1]],null]],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[1]],null],[1,\"        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"inputs\"],[12],[1,\"\\n      \"],[8,[39,3],null,[[\"@value\",\"@placeholderKey\",\"@class\"],[[30,0,[\"linkText\"]],\"composer.link_optional_text\",\"link-text\"]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,12],null,[[\"@class\",\"@label\",\"@action\",\"@type\",\"@form\"],[\"btn-primary\",\"composer.modal_ok\",[28,[37,2],[[30,0],\"ok\"],null],\"submit\",\"insert-hyperlink-form\"]],null],[1,\"\\n\\n  \"],[8,[39,12],null,[[\"@class\",\"@label\",\"@action\"],[\"btn-danger\",\"composer.modal_cancel\",[28,[37,2],[[30,0],\"cancel\"],null]]],null],[1,\"\\n\"],[13]],[\"result\"],false,[\"d-modal-body\",\"on\",\"action\",\"text-field\",\"if\",\"loading-spinner\",\"each\",\"-track-array\",\"topic-status\",\"replace-emoji\",\"category-link\",\"discourse-tags\",\"d-button\"]]",
    "moduleName": "discourse/templates/modal/insert-hyperlink.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
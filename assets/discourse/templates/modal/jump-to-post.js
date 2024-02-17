define("discourse/templates/modal/jump-to-post", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @title="topic.progress.jump_prompt_long">
  
    <div class="jump-to-post-form">
      <div class="jump-to-post-control">
        <span class="index">#</span>
        <Input
          id="post-jump"
          @type="number"
          @value={{this.postNumber}}
          @insert-newline={{action "jump"}}
          autofocus="true"
        />
        <span class="input-hint-text post-number">
          {{i18n "topic.progress.jump_prompt_of" count=this.filteredPostsCount}}
        </span>
      </div>
  
      <div class="separator">
        <span class="text">
          {{i18n "topic.progress.jump_prompt_or"}}
        </span>
        <hr class="right" />
      </div>
  
      <div class="jump-to-date-control">
        <span class="input-hint-text post-date">
          {{i18n "topic.progress.jump_prompt_to_date"}}
        </span>
        <DatePicker
          @id="post-date"
          @class="date-input"
          @value={{this.postDate}}
          @defaultDate="YYYY-MM-DD"
        />
      </div>
    </div>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @action={{action "jump"}}
      @label="composer.modal_ok"
    />
    <DModalCancel @close={{route-action "closeModal"}} />
  </div>
  */
  {
    "id": "R1nDEXEc",
    "block": "[[[8,[39,0],null,[[\"@title\"],[\"topic.progress.jump_prompt_long\"]],[[\"default\"],[[[[1,\"\\n\\n  \"],[10,0],[14,0,\"jump-to-post-form\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"jump-to-post-control\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"index\"],[12],[1,\"#\"],[13],[1,\"\\n      \"],[8,[39,1],[[24,1,\"post-jump\"],[24,\"autofocus\",\"true\"]],[[\"@type\",\"@value\",\"@insert-newline\"],[\"number\",[30,0,[\"postNumber\"]],[28,[37,2],[[30,0],\"jump\"],null]]],null],[1,\"\\n      \"],[10,1],[14,0,\"input-hint-text post-number\"],[12],[1,\"\\n        \"],[1,[28,[35,3],[\"topic.progress.jump_prompt_of\"],[[\"count\"],[[30,0,[\"filteredPostsCount\"]]]]]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"separator\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"text\"],[12],[1,\"\\n        \"],[1,[28,[35,3],[\"topic.progress.jump_prompt_or\"],null]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"hr\"],[14,0,\"right\"],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"jump-to-date-control\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"input-hint-text post-date\"],[12],[1,\"\\n        \"],[1,[28,[35,3],[\"topic.progress.jump_prompt_to_date\"],null]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[8,[39,4],null,[[\"@id\",\"@class\",\"@value\",\"@defaultDate\"],[\"post-date\",\"date-input\",[30,0,[\"postDate\"]],\"YYYY-MM-DD\"]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,5],null,[[\"@class\",\"@action\",\"@label\"],[\"btn-primary\",[28,[37,2],[[30,0],\"jump\"],null],\"composer.modal_ok\"]],null],[1,\"\\n  \"],[8,[39,6],null,[[\"@close\"],[[28,[37,7],[\"closeModal\"],null]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"input\",\"action\",\"i18n\",\"date-picker\",\"d-button\",\"d-modal-cancel\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/jump-to-post.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
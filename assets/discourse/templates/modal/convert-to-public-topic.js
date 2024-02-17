define("discourse/templates/modal/convert-to-public-topic", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @title="topic.make_public.title">
  
    <div class="instructions">
      {{i18n "topic.make_public.choose_category"}}
    </div>
    <CategoryChooser
      @value={{this.publicCategoryId}}
      @onChange={{action (mut this.publicCategoryId)}}
    />
  
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @action={{action "makePublic"}}
      @label="composer.modal_ok"
      @disabled={{this.saving}}
    />
    <DModalCancel @close={{route-action "closeModal"}} />
  </div>
  */
  {
    "id": "BmnvCZlo",
    "block": "[[[8,[39,0],null,[[\"@title\"],[\"topic.make_public.title\"]],[[\"default\"],[[[[1,\"\\n\\n  \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n    \"],[1,[28,[35,1],[\"topic.make_public.choose_category\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[8,[39,2],null,[[\"@value\",\"@onChange\"],[[30,0,[\"publicCategoryId\"]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"publicCategoryId\"]]],null]],null]]],null],[1,\"\\n\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,5],null,[[\"@class\",\"@action\",\"@label\",\"@disabled\"],[\"btn-primary\",[28,[37,3],[[30,0],\"makePublic\"],null],\"composer.modal_ok\",[30,0,[\"saving\"]]]],null],[1,\"\\n  \"],[8,[39,6],null,[[\"@close\"],[[28,[37,7],[\"closeModal\"],null]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"i18n\",\"category-chooser\",\"action\",\"mut\",\"d-button\",\"d-modal-cancel\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/convert-to-public-topic.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
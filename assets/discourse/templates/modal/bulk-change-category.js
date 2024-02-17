define("discourse/templates/modal/bulk-change-category", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <p>{{i18n "topics.bulk.choose_new_category"}}</p>
  
  <p>
    <CategoryChooser
      @value={{this.newCategoryId}}
      @onChange={{action (mut this.newCategoryId)}}
    />
  </p>
  
  <ConditionalLoadingSpinner @condition={{this.loading}}>
    <DButton
      @action={{action "changeCategory"}}
      @label="topics.bulk.change_category"
    />
  </ConditionalLoadingSpinner>
  */
  {
    "id": "G2jsDhlj",
    "block": "[[[10,2],[12],[1,[28,[35,0],[\"topics.bulk.choose_new_category\"],null]],[13],[1,\"\\n\\n\"],[10,2],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@value\",\"@onChange\"],[[30,0,[\"newCategoryId\"]],[28,[37,2],[[30,0],[28,[37,3],[[30,0,[\"newCategoryId\"]]],null]],null]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,4],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,5],null,[[\"@action\",\"@label\"],[[28,[37,2],[[30,0],\"changeCategory\"],null],\"topics.bulk.change_category\"]],null],[1,\"\\n\"]],[]]]]]],[],false,[\"i18n\",\"category-chooser\",\"action\",\"mut\",\"conditional-loading-spinner\",\"d-button\"]]",
    "moduleName": "discourse/templates/modal/bulk-change-category.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
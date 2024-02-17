define("discourse/templates/navigation/categories", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @bodyClass="navigation-categories" @class="navigation-container">
    <DNavigation
      @filterType="categories"
      @showCategoryAdmin={{this.showCategoryAdmin}}
      @createCategory={{route-action "createCategory"}}
      @reorderCategories={{route-action "reorderCategories"}}
      @canCreateTopic={{this.canCreateTopic}}
      @hasDraft={{this.currentUser.has_topic_draft}}
      @createTopic={{route-action "createTopic"}}
    />
  </DSection>
  */
  {
    "id": "QEfo0TVf",
    "block": "[[[8,[39,0],null,[[\"@bodyClass\",\"@class\"],[\"navigation-categories\",\"navigation-container\"]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@filterType\",\"@showCategoryAdmin\",\"@createCategory\",\"@reorderCategories\",\"@canCreateTopic\",\"@hasDraft\",\"@createTopic\"],[\"categories\",[30,0,[\"showCategoryAdmin\"]],[28,[37,2],[\"createCategory\"],null],[28,[37,2],[\"reorderCategories\"],null],[30,0,[\"canCreateTopic\"]],[30,0,[\"currentUser\",\"has_topic_draft\"]],[28,[37,2],[\"createTopic\"],null]]],null],[1,\"\\n\"]],[]]]]]],[],false,[\"d-section\",\"d-navigation\",\"route-action\"]]",
    "moduleName": "discourse/templates/navigation/categories.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
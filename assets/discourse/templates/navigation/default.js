define("discourse/templates/navigation/default", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection
    @bodyClass="navigation-topics"
    @class="navigation-container"
    @scrollTop={{false}}
  >
    <DNavigation
      @filterMode={{this.filterMode}}
      @canCreateTopic={{this.canCreateTopic}}
      @hasDraft={{this.currentUser.has_topic_draft}}
      @createTopic={{route-action "createTopic"}}
      @skipCategoriesNavItem={{this.skipCategoriesNavItem}}
    />
  </DSection>
  */
  {
    "id": "+vmBs5d7",
    "block": "[[[8,[39,0],null,[[\"@bodyClass\",\"@class\",\"@scrollTop\"],[\"navigation-topics\",\"navigation-container\",false]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@filterMode\",\"@canCreateTopic\",\"@hasDraft\",\"@createTopic\",\"@skipCategoriesNavItem\"],[[30,0,[\"filterMode\"]],[30,0,[\"canCreateTopic\"]],[30,0,[\"currentUser\",\"has_topic_draft\"]],[28,[37,2],[\"createTopic\"],null],[30,0,[\"skipCategoriesNavItem\"]]]],null],[1,\"\\n\"]],[]]]]]],[],false,[\"d-section\",\"d-navigation\",\"route-action\"]]",
    "moduleName": "discourse/templates/navigation/default.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
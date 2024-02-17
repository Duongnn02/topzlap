define("discourse/templates/badges/index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="badges">
    <div class="container badges">
      <h1>{{i18n "badges.title"}}</h1>
  
      <span>
        <PluginOutlet @name="below-badges-title" @connectorTagName="div" />
      </span>
  
      <div class="badge-groups">
        {{#each this.badgeGroups as |bg|}}
          <div class="badge-grouping">
            <div class="title">
              <h2>{{bg.badgeGrouping.displayName}}</h2>
            </div>
            <div class="badge-group-list">
              {{#each bg.badges as |b|}}
                <BadgeCard @badge={{b}} @username={{this.currentUser.username}} />
              {{/each}}
            </div>
          </div>
        {{/each}}
      </div>
    </div>
  </DSection>
  */
  {
    "id": "P/6gpGL+",
    "block": "[[[8,[39,0],null,[[\"@pageClass\"],[\"badges\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"container badges\"],[12],[1,\"\\n    \"],[10,\"h1\"],[12],[1,[28,[35,1],[\"badges.title\"],null]],[13],[1,\"\\n\\n    \"],[10,1],[12],[1,\"\\n      \"],[8,[39,2],null,[[\"@name\",\"@connectorTagName\"],[\"below-badges-title\",\"div\"]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"badge-groups\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"badgeGroups\"]]],null]],null],null,[[[1,\"        \"],[10,0],[14,0,\"badge-grouping\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"title\"],[12],[1,\"\\n            \"],[10,\"h2\"],[12],[1,[30,1,[\"badgeGrouping\",\"displayName\"]]],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"badge-group-list\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,1,[\"badges\"]]],null]],null],null,[[[1,\"              \"],[8,[39,5],null,[[\"@badge\",\"@username\"],[[30,2],[30,0,[\"currentUser\",\"username\"]]]],null],[1,\"\\n\"]],[2]],null],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]]],[\"bg\",\"b\"],false,[\"d-section\",\"i18n\",\"plugin-outlet\",\"each\",\"-track-array\",\"badge-card\"]]",
    "moduleName": "discourse/templates/badges/index.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/templates/group/manage", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <section class="user-secondary-navigation">
    <MobileNav
      @class="activity-nav"
      @desktopClass="action-list activity-list nav-stacked"
    >
      {{#each this.tabs as |tab|}}
        <li>
          <LinkTo @route={{tab.route}} @model={{this.model.name}}>
            {{i18n tab.title}}
          </LinkTo>
        </li>
      {{/each}}
    </MobileNav>
  </section>
  <section class="user-content" id="user-content">
    {{outlet}}
  </section>
  */
  {
    "id": "jinVWpN7",
    "block": "[[[10,\"section\"],[14,0,\"user-secondary-navigation\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@class\",\"@desktopClass\"],[\"activity-nav\",\"action-list activity-list nav-stacked\"]],[[\"default\"],[[[[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"tabs\"]]],null]],null],null,[[[1,\"      \"],[10,\"li\"],[12],[1,\"\\n        \"],[8,[39,3],null,[[\"@route\",\"@model\"],[[30,1,[\"route\"]],[30,0,[\"model\",\"name\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,4],[[30,1,[\"title\"]]],null]],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[1]],null],[1,\"  \"]],[]]]]],[1,\"\\n\"],[13],[1,\"\\n\"],[10,\"section\"],[14,0,\"user-content\"],[14,1,\"user-content\"],[12],[1,\"\\n  \"],[46,[28,[37,6],null,null],null,null,null],[1,\"\\n\"],[13]],[\"tab\"],false,[\"mobile-nav\",\"each\",\"-track-array\",\"link-to\",\"i18n\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/group/manage.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
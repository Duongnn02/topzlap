define("discourse/templates/group/activity", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
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
      {{#if this.model.can_see_members}}
        <GroupActivityFilter @filter="posts" @categoryId={{this.category_id}} />
        <GroupActivityFilter @filter="topics" @categoryId={{this.category_id}} />
      {{/if}}
      {{#if this.siteSettings.enable_mentions}}
        <GroupActivityFilter
          @filter="mentions"
          @categoryId={{this.category_id}}
        />
      {{/if}}
      <PluginOutlet @name="group-activity-bottom" @connectorTagName="li" />
    </MobileNav>
  </section>
  <section class="user-content" id="user-content">
    {{outlet}}
  </section>
  */
  {
    "id": "GUFXKI1p",
    "block": "[[[10,\"section\"],[14,0,\"user-secondary-navigation\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@class\",\"@desktopClass\"],[\"activity-nav\",\"action-list activity-list nav-stacked\"]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"model\",\"can_see_members\"]],[[[1,\"      \"],[8,[39,2],null,[[\"@filter\",\"@categoryId\"],[\"posts\",[30,0,[\"category_id\"]]]],null],[1,\"\\n      \"],[8,[39,2],null,[[\"@filter\",\"@categoryId\"],[\"topics\",[30,0,[\"category_id\"]]]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"siteSettings\",\"enable_mentions\"]],[[[1,\"      \"],[8,[39,2],null,[[\"@filter\",\"@categoryId\"],[\"mentions\",[30,0,[\"category_id\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\"],[\"group-activity-bottom\",\"li\"]],null],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"],[13],[1,\"\\n\"],[10,\"section\"],[14,0,\"user-content\"],[14,1,\"user-content\"],[12],[1,\"\\n  \"],[46,[28,[37,5],null,null],null,null,null],[1,\"\\n\"],[13]],[],false,[\"mobile-nav\",\"if\",\"group-activity-filter\",\"plugin-outlet\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/templates/group/activity.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/components/group-navigation", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <MobileNav @class="group-nav" @desktopClass="nav nav-pills">
    {{#if this.site.mobileView}}
      <li>
        <LinkTo @route="groups.index">
          {{i18n "groups.index.all"}}
        </LinkTo>
      </li>
    {{else}}
      <li>
        <GroupDropdown
          @groups={{this.group.extras.visible_group_names}}
          @value={{this.group.name}}
        />
      </li>
    {{/if}}
  
    {{#each this.tabs as |tab|}}
      <li>
        <LinkTo
          @route={{tab.route}}
          @model={{this.group}}
          title={{tab.message}}
          class={{tab.name}}
        >
          {{#if tab.icon}}{{d-icon tab.icon}}{{/if}}
          {{tab.message}}
          {{#if tab.count}}<span class="count">({{tab.count}})</span>{{/if}}
        </LinkTo>
      </li>
    {{/each}}
    <PluginOutlet
      @name="group-reports-nav-item"
      @outletArgs={{hash group=this.group}}
      @connectorTagName="li"
    />
  </MobileNav>
  */
  {
    "id": "ggWWXikP",
    "block": "[[[8,[39,0],null,[[\"@class\",\"@desktopClass\"],[\"group-nav\",\"nav nav-pills\"]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"site\",\"mobileView\"]],[[[1,\"    \"],[10,\"li\"],[12],[1,\"\\n      \"],[8,[39,2],null,[[\"@route\"],[\"groups.index\"]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[\"groups.index.all\"],null]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,\"li\"],[12],[1,\"\\n      \"],[8,[39,4],null,[[\"@groups\",\"@value\"],[[30,0,[\"group\",\"extras\",\"visible_group_names\"]],[30,0,[\"group\",\"name\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,0,[\"tabs\"]]],null]],null],null,[[[1,\"    \"],[10,\"li\"],[12],[1,\"\\n      \"],[8,[39,2],[[16,\"title\",[30,1,[\"message\"]]],[16,0,[30,1,[\"name\"]]]],[[\"@route\",\"@model\"],[[30,1,[\"route\"]],[30,0,[\"group\"]]]],[[\"default\"],[[[[1,\"\\n        \"],[41,[30,1,[\"icon\"]],[[[1,[28,[35,7],[[30,1,[\"icon\"]]],null]]],[]],null],[1,\"\\n        \"],[1,[30,1,[\"message\"]]],[1,\"\\n        \"],[41,[30,1,[\"count\"]],[[[10,1],[14,0,\"count\"],[12],[1,\"(\"],[1,[30,1,[\"count\"]]],[1,\")\"],[13]],[]],null],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[1]],null],[1,\"  \"],[8,[39,8],null,[[\"@name\",\"@outletArgs\",\"@connectorTagName\"],[\"group-reports-nav-item\",[28,[37,9],null,[[\"group\"],[[30,0,[\"group\"]]]]],\"li\"]],null],[1,\"\\n\"]],[]]]]]],[\"tab\"],false,[\"mobile-nav\",\"if\",\"link-to\",\"i18n\",\"group-dropdown\",\"each\",\"-track-array\",\"d-icon\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/components/group-navigation.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: ""
  }));
  _exports.default = _default;
});
define("discourse/templates/mobile/components/navigation-bar", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <li class="navigation-toggle">
    <a href {{on "click" this.toggleDrop}} class="toggle-link">
      {{this.selectedNavItem.displayName}}
      {{d-icon "caret-down"}}
    </a>
  </li>
  {{#if this.expanded}}
    <ul class="drop">
      {{#each this.navItems as |navItem|}}
        <NavigationItem
          @content={{navItem}}
          @filterMode={{this.filterMode}}
          @category={{this.category}}
          @class={{concat "nav-item_" navItem.name}}
        />
      {{/each}}
      <PluginOutlet
        @name="extra-nav-item"
        @connectorTagName="li"
        @outletArgs={{hash category=this.category filterMode=this.filterMode}}
      />
    </ul>
  {{/if}}
  */
  {
    "id": "wDDNN5B1",
    "block": "[[[10,\"li\"],[14,0,\"navigation-toggle\"],[12],[1,\"\\n  \"],[11,3],[24,6,\"\"],[24,0,\"toggle-link\"],[4,[38,0],[\"click\",[30,0,[\"toggleDrop\"]]],null],[12],[1,\"\\n    \"],[1,[30,0,[\"selectedNavItem\",\"displayName\"]]],[1,\"\\n    \"],[1,[28,[35,1],[\"caret-down\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\"],[41,[30,0,[\"expanded\"]],[[[1,\"  \"],[10,\"ul\"],[14,0,\"drop\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"navItems\"]]],null]],null],null,[[[1,\"      \"],[8,[39,5],null,[[\"@content\",\"@filterMode\",\"@category\",\"@class\"],[[30,1],[30,0,[\"filterMode\"]],[30,0,[\"category\"]],[28,[37,6],[\"nav-item_\",[30,1,[\"name\"]]],null]]],null],[1,\"\\n\"]],[1]],null],[1,\"    \"],[8,[39,7],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"extra-nav-item\",\"li\",[28,[37,8],null,[[\"category\",\"filterMode\"],[[30,0,[\"category\"]],[30,0,[\"filterMode\"]]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"navItem\"],false,[\"on\",\"d-icon\",\"if\",\"each\",\"-track-array\",\"navigation-item\",\"concat\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/templates/mobile/components/navigation-bar.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
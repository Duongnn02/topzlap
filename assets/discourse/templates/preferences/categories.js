define("discourse/templates/preferences/categories", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <UserPreferences::Categories
    @canSee={{this.canSee}}
    @model={{this.model}}
    @selectedCategories={{this.selectedCategories}}
    @hideMutedTags={{this.hideMutedTags}}
    @save={{action "save"}}
    @siteSettings={{this.siteSettings}}
  />
  
  {{#if this.canSave}}
    <SaveControls
      @model={{this.model}}
      @action={{action "save"}}
      @saved={{this.saved}}
    />
  {{else}}
    {{i18n "user.no_category_access"}}
  {{/if}}
  */
  {
    "id": "8FcNxUR9",
    "block": "[[[8,[39,0],null,[[\"@canSee\",\"@model\",\"@selectedCategories\",\"@hideMutedTags\",\"@save\",\"@siteSettings\"],[[30,0,[\"canSee\"]],[30,0,[\"model\"]],[30,0,[\"selectedCategories\"]],[30,0,[\"hideMutedTags\"]],[28,[37,1],[[30,0],\"save\"],null],[30,0,[\"siteSettings\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"canSave\"]],[[[1,\"  \"],[8,[39,3],null,[[\"@model\",\"@action\",\"@saved\"],[[30,0,[\"model\"]],[28,[37,1],[[30,0],\"save\"],null],[30,0,[\"saved\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"  \"],[1,[28,[35,4],[\"user.no_category_access\"],null]],[1,\"\\n\"]],[]]]],[],false,[\"user-preferences/categories\",\"action\",\"if\",\"save-controls\",\"i18n\"]]",
    "moduleName": "discourse/templates/preferences/categories.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
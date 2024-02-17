define("discourse/plugins/discourse-assign/discourse-assign/templates/connectors/groups-interaction-custom-options/assignable-interaction-fields", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="control-group">
    <label class="control-label">{{i18n
        "discourse_assign.admin.groups.manage.interaction.assign"
      }}</label>
    <label for="visiblity">{{i18n
        "discourse_assign.admin.groups.manage.interaction.assignable_levels.title"
      }}</label>
  
    <ComboBox
      @name="alias"
      @valueProperty="value"
      @value={{assignableLevel}}
      @content={{assignableLevelOptions}}
      @class="groups-form-assignable-level"
      @onChange={{action (mut model.assignable_level)}}
    />
  </div>
  */
  {
    "id": "B17CMOwN",
    "block": "[[[10,0],[14,0,\"control-group\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"discourse_assign.admin.groups.manage.interaction.assign\"],null]],[13],[1,\"\\n  \"],[10,\"label\"],[14,\"for\",\"visiblity\"],[12],[1,[28,[35,0],[\"discourse_assign.admin.groups.manage.interaction.assignable_levels.title\"],null]],[13],[1,\"\\n\\n  \"],[8,[39,1],null,[[\"@name\",\"@valueProperty\",\"@value\",\"@content\",\"@class\",\"@onChange\"],[\"alias\",\"value\",[99,2,[\"@value\"]],[99,3,[\"@content\"]],\"groups-form-assignable-level\",[28,[37,4],[[30,0],[28,[37,5],[[33,6,[\"assignable_level\"]]],null]],null]]],null],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"combo-box\",\"assignableLevel\",\"assignableLevelOptions\",\"action\",\"mut\",\"model\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse-assign/templates/connectors/groups-interaction-custom-options/assignable-interaction-fields.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
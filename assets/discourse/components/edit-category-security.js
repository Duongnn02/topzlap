define("discourse/components/edit-category-security", ["exports", "@ember/component", "@ember/template-factory", "discourse/models/permission-type", "discourse/components/edit-category-panel", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _component, _templateFactory, _permissionType, _editCategoryPanel, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/models/permission-type",0,"discourse/components/edit-category-panel",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <section class="field">
    {{#if this.category.is_special}}
      {{#if this.category.isUncategorizedCategory}}
        <p class="warning">{{i18n "category.uncategorized_security_warning"}}</p>
      {{else}}
        <p class="warning">{{i18n "category.special_warning"}}</p>
      {{/if}}
    {{/if}}
  
    {{#unless this.category.is_special}}
      <div class="category-permissions-table">
        <div class="permission-row row-header">
          <span class="group-name">{{i18n "category.permissions.group"}}</span>
          <span class="options">
            <span class="cell">{{i18n "category.permissions.see"}}</span>
            <span class="cell">{{i18n "category.permissions.reply"}}</span>
            <span class="cell">{{i18n "category.permissions.create"}}</span>
          </span>
        </div>
        {{#each this.category.permissions as |p|}}
          <CategoryPermissionRow
            @group_name={{p.group_name}}
            @type={{p.permission_type}}
            @category={{this.category}}
            @everyonePermission={{this.everyonePermission}}
          />
        {{/each}}
  
        {{#unless this.category.permissions}}
          <div class="permission-row row-empty">
            {{i18n "category.permissions.no_groups_selected"}}
          </div>
        {{/unless}}
  
        {{#if this.category.availableGroups}}
          <div class="add-group">
            <span class="group-name">
              <ComboBox
                @class="available-groups"
                @content={{this.category.availableGroups}}
                @onChange={{action "onSelectGroup"}}
                @value={{null}}
                @valueProperty={{null}}
                @nameProperty={{null}}
                @options={{hash none="category.security_add_group"}}
              />
            </span>
          </div>
        {{/if}}
      </div>
  
      {{#if this.everyoneGrantedFull}}
        <p class="warning">{{i18n "category.permissions.everyone_has_access"}}</p>
      {{/if}}
    {{/unless}}
  </section>
  
  <section>
    <PluginOutlet
      @name="category-custom-security"
      @outletArgs={{hash category=this.category}}
    />
  </section>
  */
  {
    "id": "tuR4Pwcq",
    "block": "[[[10,\"section\"],[14,0,\"field\"],[12],[1,\"\\n\"],[41,[30,0,[\"category\",\"is_special\"]],[[[41,[30,0,[\"category\",\"isUncategorizedCategory\"]],[[[1,\"      \"],[10,2],[14,0,\"warning\"],[12],[1,[28,[35,1],[\"category.uncategorized_security_warning\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,2],[14,0,\"warning\"],[12],[1,[28,[35,1],[\"category.special_warning\"],null]],[13],[1,\"\\n\"]],[]]]],[]],null],[1,\"\\n\"],[41,[51,[30,0,[\"category\",\"is_special\"]]],[[[1,\"    \"],[10,0],[14,0,\"category-permissions-table\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"permission-row row-header\"],[12],[1,\"\\n        \"],[10,1],[14,0,\"group-name\"],[12],[1,[28,[35,1],[\"category.permissions.group\"],null]],[13],[1,\"\\n        \"],[10,1],[14,0,\"options\"],[12],[1,\"\\n          \"],[10,1],[14,0,\"cell\"],[12],[1,[28,[35,1],[\"category.permissions.see\"],null]],[13],[1,\"\\n          \"],[10,1],[14,0,\"cell\"],[12],[1,[28,[35,1],[\"category.permissions.reply\"],null]],[13],[1,\"\\n          \"],[10,1],[14,0,\"cell\"],[12],[1,[28,[35,1],[\"category.permissions.create\"],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"category\",\"permissions\"]]],null]],null],null,[[[1,\"        \"],[8,[39,5],null,[[\"@group_name\",\"@type\",\"@category\",\"@everyonePermission\"],[[30,1,[\"group_name\"]],[30,1,[\"permission_type\"]],[30,0,[\"category\"]],[30,0,[\"everyonePermission\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"\\n\"],[41,[51,[30,0,[\"category\",\"permissions\"]]],[[[1,\"        \"],[10,0],[14,0,\"permission-row row-empty\"],[12],[1,\"\\n          \"],[1,[28,[35,1],[\"category.permissions.no_groups_selected\"],null]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"category\",\"availableGroups\"]],[[[1,\"        \"],[10,0],[14,0,\"add-group\"],[12],[1,\"\\n          \"],[10,1],[14,0,\"group-name\"],[12],[1,\"\\n            \"],[8,[39,6],null,[[\"@class\",\"@content\",\"@onChange\",\"@value\",\"@valueProperty\",\"@nameProperty\",\"@options\"],[\"available-groups\",[30,0,[\"category\",\"availableGroups\"]],[28,[37,7],[[30,0],\"onSelectGroup\"],null],null,null,null,[28,[37,8],null,[[\"none\"],[\"category.security_add_group\"]]]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"everyoneGrantedFull\"]],[[[1,\"      \"],[10,2],[14,0,\"warning\"],[12],[1,[28,[35,1],[\"category.permissions.everyone_has_access\"],null]],[13],[1,\"\\n\"]],[]],null]],[]],null],[13],[1,\"\\n\\n\"],[10,\"section\"],[12],[1,\"\\n  \"],[8,[39,9],null,[[\"@name\",\"@outletArgs\"],[\"category-custom-security\",[28,[37,8],null,[[\"category\"],[[30,0,[\"category\"]]]]]]],null],[1,\"\\n\"],[13]],[\"p\"],false,[\"if\",\"i18n\",\"unless\",\"each\",\"-track-array\",\"category-permission-row\",\"combo-box\",\"action\",\"hash\",\"plugin-outlet\"]]",
    "moduleName": "discourse/components/edit-category-security.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _editCategoryPanel.buildCategoryPanel)("security", (_dec = (0, _decorators.default)("category.permissions.@each.permission_type"), _dec2 = (0, _decorators.default)("category.permissions.@each.permission_type"), _dec3 = (0, _decorators.default)("everyonePermission"), (_obj = {
    selectedGroup: null,
    noGroupSelected: (0, _computed.not)("selectedGroup"),
    everyonePermission(permissions) {
      return permissions.findBy("group_name", "everyone");
    },
    everyoneGrantedFull() {
      return this.everyonePermission && this.everyonePermission.permission_type === _permissionType.default.FULL;
    },
    minimumPermission(everyonePermission) {
      return everyonePermission ? everyonePermission.permission_type : _permissionType.default.READONLY;
    },
    actions: {
      onSelectGroup(group_name) {
        this.category.addPermission({
          group_name,
          permission_type: this.minimumPermission
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "everyonePermission", [_dec], Object.getOwnPropertyDescriptor(_obj, "everyonePermission"), _obj), _applyDecoratedDescriptor(_obj, "everyoneGrantedFull", [_dec2], Object.getOwnPropertyDescriptor(_obj, "everyoneGrantedFull"), _obj), _applyDecoratedDescriptor(_obj, "minimumPermission", [_dec3], Object.getOwnPropertyDescriptor(_obj, "minimumPermission"), _obj)), _obj))));
  _exports.default = _default;
});
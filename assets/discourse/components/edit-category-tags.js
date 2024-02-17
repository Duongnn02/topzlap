define("discourse/components/edit-category-tags", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "discourse/components/edit-category-panel", "@ember/object"], function (_exports, _component, _templateFactory, _computed, _editCategoryPanel, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object/computed",0,"discourse/components/edit-category-panel",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <section class="field minimum-required-tags">
    <label for="category-minimum-tags">
      {{i18n "category.minimum_required_tags"}}
    </label>
    <TextField
      @value={{this.category.minimum_required_tags}}
      @id="category-minimum-tags"
      @type="number"
      @min="0"
    />
  </section>
  <section class="field allowed-tags">
    <label>{{i18n "category.tags_allowed_tags"}}</label>
    <TagChooser
      @id="category-allowed-tags"
      @tags={{this.category.allowed_tags}}
      @everyTag={{true}}
      @excludeSynonyms={{true}}
      @unlimitedTagCount={{true}}
      @onChange={{action (mut this.category.allowed_tags)}}
      @options={{hash filterPlaceholder="category.tags_placeholder"}}
    />
  </section>
  
  <section class="field allowed-tag-groups">
    <label>{{i18n "category.tags_allowed_tag_groups"}}</label>
    <TagGroupChooser
      @id="category-allowed-tag-groups"
      @tagGroups={{this.category.allowed_tag_groups}}
      @onChange={{action (mut this.category.allowed_tag_groups)}}
    />
    <LinkTo @route="tagGroups" class="manage-tag-groups">{{i18n
        "category.manage_tag_groups_link"
      }}</LinkTo>
  </section>
  
  <section class="field allow-global-tags">
    <label>
      <Input
        @type="checkbox"
        @checked={{this.category.allow_global_tags}}
        id="allow_global_tags"
        disabled={{this.disableAllowGlobalTags}}
      />
      {{i18n "category.allow_global_tags_label"}}
    </label>
  </section>
  
  <section class="field tags-tab-description">
    {{i18n "category.tags_tab_description"}}
  </section>
  
  <section class="field required-tag-group-description">
    {{i18n "category.required_tag_group.description"}}
  </section>
  
  <section class="field with-items">
    <section class="field-item required-tag-groups">
      {{#each this.category.required_tag_groups as |rtg|}}
        <div class="required-tag-group-row">
          <TextField @value={{rtg.min_count}} @type="number" @min="1" />
          <TagGroupChooser
            @tagGroups={{if rtg.name (array rtg.name) (array)}}
            @onChange={{action "onTagGroupChange" rtg}}
            @options={{hash
              maximum=1
              filterPlaceholder="category.required_tag_group.placeholder"
            }}
          />
          <DButton
            @label="category.required_tag_group.delete"
            @action={{action "deleteRequiredTagGroup" rtg}}
            @icon="trash-alt"
            @class="delete-required-tag-group"
          />
        </div>
      {{/each}}
      <DButton
        @label="category.required_tag_group.add"
        @action={{action "addRequiredTagGroup"}}
        @icon="plus"
        @class="add-required-tag-group"
      />
    </section>
  </section>
  */
  {
    "id": "iQWyU1v4",
    "block": "[[[10,\"section\"],[14,0,\"field minimum-required-tags\"],[12],[1,\"\\n  \"],[10,\"label\"],[14,\"for\",\"category-minimum-tags\"],[12],[1,\"\\n    \"],[1,[28,[35,0],[\"category.minimum_required_tags\"],null]],[1,\"\\n  \"],[13],[1,\"\\n  \"],[8,[39,1],null,[[\"@value\",\"@id\",\"@type\",\"@min\"],[[30,0,[\"category\",\"minimum_required_tags\"]],\"category-minimum-tags\",\"number\",\"0\"]],null],[1,\"\\n\"],[13],[1,\"\\n\"],[10,\"section\"],[14,0,\"field allowed-tags\"],[12],[1,\"\\n  \"],[10,\"label\"],[12],[1,[28,[35,0],[\"category.tags_allowed_tags\"],null]],[13],[1,\"\\n  \"],[8,[39,2],null,[[\"@id\",\"@tags\",\"@everyTag\",\"@excludeSynonyms\",\"@unlimitedTagCount\",\"@onChange\",\"@options\"],[\"category-allowed-tags\",[30,0,[\"category\",\"allowed_tags\"]],true,true,true,[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"category\",\"allowed_tags\"]]],null]],null],[28,[37,5],null,[[\"filterPlaceholder\"],[\"category.tags_placeholder\"]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"field allowed-tag-groups\"],[12],[1,\"\\n  \"],[10,\"label\"],[12],[1,[28,[35,0],[\"category.tags_allowed_tag_groups\"],null]],[13],[1,\"\\n  \"],[8,[39,6],null,[[\"@id\",\"@tagGroups\",\"@onChange\"],[\"category-allowed-tag-groups\",[30,0,[\"category\",\"allowed_tag_groups\"]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"category\",\"allowed_tag_groups\"]]],null]],null]]],null],[1,\"\\n  \"],[8,[39,7],[[24,0,\"manage-tag-groups\"]],[[\"@route\"],[\"tagGroups\"]],[[\"default\"],[[[[1,[28,[35,0],[\"category.manage_tag_groups_link\"],null]]],[]]]]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"field allow-global-tags\"],[12],[1,\"\\n  \"],[10,\"label\"],[12],[1,\"\\n    \"],[8,[39,8],[[24,1,\"allow_global_tags\"],[16,\"disabled\",[30,0,[\"disableAllowGlobalTags\"]]]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"category\",\"allow_global_tags\"]]]],null],[1,\"\\n    \"],[1,[28,[35,0],[\"category.allow_global_tags_label\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"field tags-tab-description\"],[12],[1,\"\\n  \"],[1,[28,[35,0],[\"category.tags_tab_description\"],null]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"field required-tag-group-description\"],[12],[1,\"\\n  \"],[1,[28,[35,0],[\"category.required_tag_group.description\"],null]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"field with-items\"],[12],[1,\"\\n  \"],[10,\"section\"],[14,0,\"field-item required-tag-groups\"],[12],[1,\"\\n\"],[42,[28,[37,10],[[28,[37,10],[[30,0,[\"category\",\"required_tag_groups\"]]],null]],null],null,[[[1,\"      \"],[10,0],[14,0,\"required-tag-group-row\"],[12],[1,\"\\n        \"],[8,[39,1],null,[[\"@value\",\"@type\",\"@min\"],[[30,1,[\"min_count\"]],\"number\",\"1\"]],null],[1,\"\\n        \"],[8,[39,6],null,[[\"@tagGroups\",\"@onChange\",\"@options\"],[[52,[30,1,[\"name\"]],[28,[37,12],[[30,1,[\"name\"]]],null],[28,[37,12],null,null]],[28,[37,3],[[30,0],\"onTagGroupChange\",[30,1]],null],[28,[37,5],null,[[\"maximum\",\"filterPlaceholder\"],[1,\"category.required_tag_group.placeholder\"]]]]],null],[1,\"\\n        \"],[8,[39,13],null,[[\"@label\",\"@action\",\"@icon\",\"@class\"],[\"category.required_tag_group.delete\",[28,[37,3],[[30,0],\"deleteRequiredTagGroup\",[30,1]],null],\"trash-alt\",\"delete-required-tag-group\"]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[1]],null],[1,\"    \"],[8,[39,13],null,[[\"@label\",\"@action\",\"@icon\",\"@class\"],[\"category.required_tag_group.add\",[28,[37,3],[[30,0],\"addRequiredTagGroup\"],null],\"plus\",\"add-required-tag-group\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"rtg\"],false,[\"i18n\",\"text-field\",\"tag-chooser\",\"action\",\"mut\",\"hash\",\"tag-group-chooser\",\"link-to\",\"input\",\"each\",\"-track-array\",\"if\",\"array\",\"d-button\"]]",
    "moduleName": "discourse/components/edit-category-tags.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _editCategoryPanel.buildCategoryPanel)("tags", (_obj = {
    allowedTagsEmpty: (0, _computed.empty)("category.allowed_tags"),
    allowedTagGroupsEmpty: (0, _computed.empty)("category.allowed_tag_groups"),
    disableAllowGlobalTags: (0, _computed.and)("allowedTagsEmpty", "allowedTagGroupsEmpty"),
    onTagGroupChange(rtg, valueArray) {
      // A little strange, but we're using a multi-select component
      // to select a single tag group. This action takes the array
      // and extracts the first value in it.
      (0, _object.set)(rtg, "name", valueArray[0]);
    },
    addRequiredTagGroup() {
      this.category.required_tag_groups.pushObject({
        min_count: 1
      });
    },
    deleteRequiredTagGroup(rtg) {
      this.category.required_tag_groups.removeObject(rtg);
    }
  }, (_applyDecoratedDescriptor(_obj, "onTagGroupChange", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onTagGroupChange"), _obj), _applyDecoratedDescriptor(_obj, "addRequiredTagGroup", [_object.action], Object.getOwnPropertyDescriptor(_obj, "addRequiredTagGroup"), _obj), _applyDecoratedDescriptor(_obj, "deleteRequiredTagGroup", [_object.action], Object.getOwnPropertyDescriptor(_obj, "deleteRequiredTagGroup"), _obj)), _obj)));
  _exports.default = _default;
});
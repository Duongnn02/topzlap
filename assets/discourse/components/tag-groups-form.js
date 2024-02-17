define("discourse/components/tag-groups-form", ["exports", "@ember/component", "@ember/template-factory", "discourse/models/group", "I18n", "discourse/models/permission-type", "discourse/mixins/buffered-content", "discourse-common/utils/decorators", "@ember/service", "@ember/utils"], function (_exports, _component, _templateFactory, _group, _I18n, _permissionType, _bufferedContent, _decorators, _service, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/models/group",0,"I18n",0,"discourse/models/permission-type",0,"discourse/mixins/buffered-content",0,"discourse-common/utils/decorators",0,"@ember/service",0,"@ember/utils"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <section class="group-name">
    <label>{{i18n "tagging.groups.name_placeholder"}}</label>
    <div><TextField @value={{this.buffered.name}} /></div>
  </section>
  
  <section class="group-tags-list">
    <label>{{i18n "tagging.groups.tags_label"}}</label><br />
    <TagChooser
      @tags={{this.buffered.tag_names}}
      @everyTag={{true}}
      @unlimitedTagCount={{true}}
      @excludeSynonyms={{true}}
      @options={{hash
        allowAny=true
        filterPlaceholder="tagging.groups.tags_placeholder"
      }}
    />
  </section>
  
  <section class="parent-tag-section">
    <label>{{i18n "tagging.groups.parent_tag_label"}}</label>
    <div>
      <TagChooser
        @tags={{this.buffered.parent_tag_name}}
        @everyTag={{true}}
        @excludeSynonyms={{true}}
        @options={{hash
          allowAny=true
          filterPlaceholder="tagging.groups.parent_tag_placeholder"
          maximum=1
        }}
      />
    </div>
    <div class="description">{{i18n
        "tagging.groups.parent_tag_description"
      }}</div>
  </section>
  
  <section class="group-one-per-topic">
    <label>
      <Input
        @type="checkbox"
        @checked={{this.buffered.one_per_topic}}
        name="onepertopic"
      />
      {{i18n "tagging.groups.one_per_topic_label"}}
    </label>
  </section>
  
  <section class="group-visibility">
    <div class="group-visibility-option">
      <RadioButton
        @class="tag-permissions-choice"
        @name="tag-permissions-choice"
        @value="public"
        @id="public-permission"
        @selection={{this.buffered.permissionName}}
        @onChange={{action "setPermissionsType"}}
      />
  
      <label class="radio" for="public-permission">
        {{i18n "tagging.groups.everyone_can_use"}}
      </label>
    </div>
    <div class="group-visibility-option">
      <RadioButton
        @class="tag-permissions-choice"
        @name="tag-permissions-choice"
        @value="visible"
        @id="visible-permission"
        @selection={{this.buffered.permissionName}}
        @onChange={{action "setPermissionsType"}}
      />
  
      <label class="radio" for="visible-permission">
        {{i18n "tagging.groups.usable_only_by_groups"}}
      </label>
  
      <div class="group-access-control">
        <GroupChooser
          @content={{this.allGroups}}
          @value={{this.selectedGroupIds}}
          @labelProperty="name"
          @onChange={{action "setPermissionsGroups"}}
          @options={{hash
            filterPlaceholder="tagging.groups.select_groups_placeholder"
          }}
        />
      </div>
    </div>
    <div class="group-visibility-option">
      <RadioButton
        @class="tag-permissions-choice"
        @name="tag-permissions-choice"
        @value="private"
        @id="private-permission"
        @selection={{this.buffered.permissionName}}
        @onChange={{action "setPermissionsType"}}
      />
  
      <label class="radio" for="private-permission">
        {{i18n "tagging.groups.visible_only_to_groups"}}
      </label>
  
      <div class="group-access-control">
        <GroupChooser
          @content={{this.allGroups}}
          @value={{this.selectedGroupIds}}
          @labelProperty="name"
          @onChange={{action "setPermissionsGroups"}}
          @options={{hash
            filterPlaceholder="tagging.groups.select_groups_placeholder"
          }}
        />
      </div>
    </div>
  </section>
  
  <div class="tag-group-controls">
    <DButton
      @class="btn-primary"
      @action={{action "save"}}
      @disabled={{this.buffered.isSaving}}
      @label="tagging.groups.save"
    />
  
    <DButton
      @class="btn-danger"
      @action={{action "destroy"}}
      @disabled={{this.buffered.isNew}}
      @icon="far-trash-alt"
      @label="tagging.groups.delete"
    />
  </div>
  */
  {
    "id": "ItayR27x",
    "block": "[[[10,\"section\"],[14,0,\"group-name\"],[12],[1,\"\\n  \"],[10,\"label\"],[12],[1,[28,[35,0],[\"tagging.groups.name_placeholder\"],null]],[13],[1,\"\\n  \"],[10,0],[12],[8,[39,1],null,[[\"@value\"],[[30,0,[\"buffered\",\"name\"]]]],null],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"group-tags-list\"],[12],[1,\"\\n  \"],[10,\"label\"],[12],[1,[28,[35,0],[\"tagging.groups.tags_label\"],null]],[13],[10,\"br\"],[12],[13],[1,\"\\n  \"],[8,[39,2],null,[[\"@tags\",\"@everyTag\",\"@unlimitedTagCount\",\"@excludeSynonyms\",\"@options\"],[[30,0,[\"buffered\",\"tag_names\"]],true,true,true,[28,[37,3],null,[[\"allowAny\",\"filterPlaceholder\"],[true,\"tagging.groups.tags_placeholder\"]]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"parent-tag-section\"],[12],[1,\"\\n  \"],[10,\"label\"],[12],[1,[28,[35,0],[\"tagging.groups.parent_tag_label\"],null]],[13],[1,\"\\n  \"],[10,0],[12],[1,\"\\n    \"],[8,[39,2],null,[[\"@tags\",\"@everyTag\",\"@excludeSynonyms\",\"@options\"],[[30,0,[\"buffered\",\"parent_tag_name\"]],true,true,[28,[37,3],null,[[\"allowAny\",\"filterPlaceholder\",\"maximum\"],[true,\"tagging.groups.parent_tag_placeholder\",1]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"description\"],[12],[1,[28,[35,0],[\"tagging.groups.parent_tag_description\"],null]],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"group-one-per-topic\"],[12],[1,\"\\n  \"],[10,\"label\"],[12],[1,\"\\n    \"],[8,[39,4],[[24,3,\"onepertopic\"]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"buffered\",\"one_per_topic\"]]]],null],[1,\"\\n    \"],[1,[28,[35,0],[\"tagging.groups.one_per_topic_label\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[14,0,\"group-visibility\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"group-visibility-option\"],[12],[1,\"\\n    \"],[8,[39,5],null,[[\"@class\",\"@name\",\"@value\",\"@id\",\"@selection\",\"@onChange\"],[\"tag-permissions-choice\",\"tag-permissions-choice\",\"public\",\"public-permission\",[30,0,[\"buffered\",\"permissionName\"]],[28,[37,6],[[30,0],\"setPermissionsType\"],null]]],null],[1,\"\\n\\n    \"],[10,\"label\"],[14,0,\"radio\"],[14,\"for\",\"public-permission\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"tagging.groups.everyone_can_use\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"group-visibility-option\"],[12],[1,\"\\n    \"],[8,[39,5],null,[[\"@class\",\"@name\",\"@value\",\"@id\",\"@selection\",\"@onChange\"],[\"tag-permissions-choice\",\"tag-permissions-choice\",\"visible\",\"visible-permission\",[30,0,[\"buffered\",\"permissionName\"]],[28,[37,6],[[30,0],\"setPermissionsType\"],null]]],null],[1,\"\\n\\n    \"],[10,\"label\"],[14,0,\"radio\"],[14,\"for\",\"visible-permission\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"tagging.groups.usable_only_by_groups\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"group-access-control\"],[12],[1,\"\\n      \"],[8,[39,7],null,[[\"@content\",\"@value\",\"@labelProperty\",\"@onChange\",\"@options\"],[[30,0,[\"allGroups\"]],[30,0,[\"selectedGroupIds\"]],\"name\",[28,[37,6],[[30,0],\"setPermissionsGroups\"],null],[28,[37,3],null,[[\"filterPlaceholder\"],[\"tagging.groups.select_groups_placeholder\"]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"group-visibility-option\"],[12],[1,\"\\n    \"],[8,[39,5],null,[[\"@class\",\"@name\",\"@value\",\"@id\",\"@selection\",\"@onChange\"],[\"tag-permissions-choice\",\"tag-permissions-choice\",\"private\",\"private-permission\",[30,0,[\"buffered\",\"permissionName\"]],[28,[37,6],[[30,0],\"setPermissionsType\"],null]]],null],[1,\"\\n\\n    \"],[10,\"label\"],[14,0,\"radio\"],[14,\"for\",\"private-permission\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"tagging.groups.visible_only_to_groups\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"group-access-control\"],[12],[1,\"\\n      \"],[8,[39,7],null,[[\"@content\",\"@value\",\"@labelProperty\",\"@onChange\",\"@options\"],[[30,0,[\"allGroups\"]],[30,0,[\"selectedGroupIds\"]],\"name\",[28,[37,6],[[30,0],\"setPermissionsGroups\"],null],[28,[37,3],null,[[\"filterPlaceholder\"],[\"tagging.groups.select_groups_placeholder\"]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"tag-group-controls\"],[12],[1,\"\\n  \"],[8,[39,8],null,[[\"@class\",\"@action\",\"@disabled\",\"@label\"],[\"btn-primary\",[28,[37,6],[[30,0],\"save\"],null],[30,0,[\"buffered\",\"isSaving\"]],\"tagging.groups.save\"]],null],[1,\"\\n\\n  \"],[8,[39,8],null,[[\"@class\",\"@action\",\"@disabled\",\"@icon\",\"@label\"],[\"btn-danger\",[28,[37,6],[[30,0],\"destroy\"],null],[30,0,[\"buffered\",\"isNew\"]],\"far-trash-alt\",\"tagging.groups.delete\"]],null],[1,\"\\n\"],[13]],[],false,[\"i18n\",\"text-field\",\"tag-chooser\",\"hash\",\"input\",\"radio-button\",\"action\",\"group-chooser\",\"d-button\"]]",
    "moduleName": "discourse/components/tag-groups-form.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((0, _bufferedContent.bufferedProperty)("model"), (_dec = (0, _decorators.default)("buffered.name", "buffered.tag_names", "buffered.permissions"), _dec2 = (0, _decorators.default)("buffered.permissions", "allGroups"), (_obj = {
    router: (0, _service.inject)(),
    dialog: (0, _service.inject)(),
    tagName: "",
    allGroups: null,
    init() {
      this._super(...arguments);
      this.setGroupOptions();
    },
    setGroupOptions() {
      _group.default.findAll().then(groups => {
        this.set("allGroups", groups);
      });
    },
    cannotSave(name, tagNames, permissions) {
      return (0, _utils.isEmpty)(name) || (0, _utils.isEmpty)(tagNames) || !this.everyoneSelected(permissions) && (0, _utils.isEmpty)(this.selectedGroupNames(permissions));
    },
    selectedGroupIds(permissions, allGroups) {
      if (!permissions || !allGroups) {
        return [];
      }
      const selectedGroupNames = Object.keys(permissions);
      let groupIds = [];
      allGroups.forEach(group => {
        if (selectedGroupNames.includes(group.name)) {
          groupIds.push(group.id);
        }
      });
      return groupIds;
    },
    everyoneSelected(permissions) {
      if (!permissions) {
        return true;
      }
      return permissions.everyone === _permissionType.default.FULL;
    },
    selectedGroupNames(permissions) {
      if (!permissions) {
        return [];
      }
      return Object.keys(permissions).filter(name => name !== "everyone");
    },
    actions: {
      setPermissionsType(permissionName) {
        let updatedPermissions = Object.assign({}, this.buffered.get("permissions"));
        if (permissionName === "private") {
          delete updatedPermissions.everyone;
        } else if (permissionName === "visible") {
          updatedPermissions.everyone = _permissionType.default.READONLY;
        } else {
          updatedPermissions.everyone = _permissionType.default.FULL;
        }
        this.buffered.set("permissions", updatedPermissions);
      },
      setPermissionsGroups(groupIds) {
        let updatedPermissions = Object.assign({}, this.buffered.get("permissions"));
        this.allGroups.forEach(group => {
          if (groupIds.includes(group.id)) {
            updatedPermissions[group.name] = _permissionType.default.FULL;
          } else {
            delete updatedPermissions[group.name];
          }
        });
        this.buffered.set("permissions", updatedPermissions);
      },
      save() {
        if (this.cannotSave) {
          this.dialog.alert(_I18n.default.t("tagging.groups.cannot_save"));
          return false;
        }
        const attrs = this.buffered.getProperties("name", "tag_names", "parent_tag_name", "one_per_topic", "permissions");

        // If 'everyone' is set to full, we can remove any groups.
        if (!attrs.permissions || attrs.permissions.everyone === _permissionType.default.FULL) {
          attrs.permissions = {
            everyone: _permissionType.default.FULL
          };
        }
        this.model.save(attrs).then(() => {
          this.commitBuffer();
          if (this.onSave) {
            this.onSave();
          } else {
            this.router.transitionTo("tagGroups.index");
          }
        });
      },
      destroy() {
        return this.dialog.yesNoConfirm({
          message: _I18n.default.t("tagging.groups.confirm_delete"),
          didConfirm: () => {
            this.model.destroyRecord().then(() => {
              if (this.onDestroy) {
                this.onDestroy();
              }
            });
          }
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "cannotSave", [_dec], Object.getOwnPropertyDescriptor(_obj, "cannotSave"), _obj), _applyDecoratedDescriptor(_obj, "selectedGroupIds", [_dec2], Object.getOwnPropertyDescriptor(_obj, "selectedGroupIds"), _obj)), _obj))));
  _exports.default = _default;
});
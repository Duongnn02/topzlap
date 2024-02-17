define("discourse/components/tag-info", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "I18n", "discourse/lib/ajax", "discourse-common/utils/decorators", "@ember/utils", "discourse/lib/ajax-error", "@ember/service", "@ember/object", "@ember/template"], function (_exports, _component, _templateFactory, _computed, _I18n, _ajax, _decorators, _utils, _ajaxError, _service, _object, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object/computed",0,"@ember/component",0,"I18n",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"@ember/utils",0,"discourse/lib/ajax-error",0,"@ember/service",0,"@ember/object",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <section class="tag-info">
    {{#if this.tagInfo}}
      <div class="tag-name">
        {{#if this.editing}}
          <div class="edit-tag-wrapper">
            <TextField
              @id="edit-name"
              @value={{readonly this.tagInfo.name}}
              @maxlength={{this.siteSettings.max_tag_length}}
              @input={{action (mut this.newTagName) value="target.value"}}
              @autofocus="true"
            />
            <TextField
              @id="edit-description"
              @value={{readonly this.tagInfo.description}}
              @placeholder={{i18n "tagging.description"}}
              @maxlength={{280}}
              @input={{action (mut this.newTagDescription) value="target.value"}}
              @autofocus="true"
            />
  
            <div class="edit-controls">
              {{#unless this.updateDisabled}}
                <DButton
                  @action={{action "finishedEditing"}}
                  @class="btn-primary submit-edit"
                  @icon="check"
                  @ariaLabel="tagging.save"
                />
              {{/unless}}
              <DButton
                @action={{action "cancelEditing"}}
                @class="btn-default cancel-edit"
                @icon="times"
                @ariaLabel="cancel"
              />
            </div>
          </div>
        {{else}}
          <div class="tag-name-wrapper">
            {{discourse-tag this.tagInfo.name tagName="div"}}
            {{#if this.canAdminTag}}
              <a
                href
                {{on "click" this.edit}}
                class="edit-tag"
                title={{i18n "tagging.edit_tag"}}
              >{{d-icon "pencil-alt"}}</a>
            {{/if}}
          </div>
          <div class="tag-description-wrapper">
            {{this.tagInfo.description}}
          </div>
        {{/if}}
      </div>
      <div class="tag-associations">
        {{#if this.tagInfo.tag_group_names}}
          {{this.tagGroupsInfo}}
        {{/if}}
        {{#if this.tagInfo.categories}}
          {{this.categoriesInfo}}
          <br />
          {{#each this.tagInfo.categories as |category|}}
            {{category-link category}}
          {{/each}}
        {{/if}}
        {{#if this.nothingToShow}}
          {{#if this.tagInfo.category_restricted}}
            {{i18n "tagging.category_restricted"}}
          {{else}}
            {{html-safe (i18n "tagging.default_info")}}
            {{#if this.canAdminTag}}
              {{html-safe (i18n "tagging.staff_info" basePath=(base-path))}}
            {{/if}}
          {{/if}}
        {{/if}}
      </div>
      {{#if this.tagInfo.synonyms}}
        <div class="synonyms-list">
          <h3>{{i18n "tagging.synonyms"}}</h3>
          <div>{{html-safe
              (i18n
                "tagging.synonyms_description" base_tag_name=this.tagInfo.name
              )
            }}</div>
          <div class="tag-list">
            {{#each this.tagInfo.synonyms as |tag|}}
              <div class="tag-box">
                {{discourse-tag tag.id pmOnly=tag.pmOnly tagName="div"}}
                {{#if this.editSynonymsMode}}
                  <a
                    href
                    {{on "click" (fn this.unlinkSynonym tag)}}
                    class="unlink-synonym"
                  >
                    {{d-icon "unlink" title="tagging.remove_synonym"}}
                  </a>
                  <a
                    href
                    {{on "click" (fn this.deleteSynonym tag)}}
                    class="delete-synonym"
                  >
                    {{d-icon "far-trash-alt" title="tagging.delete_tag"}}
                  </a>
                {{/if}}
              </div>
            {{/each}}
          </div>
        </div>
      {{/if}}
      {{#if this.editSynonymsMode}}
        <section class="add-synonyms field">
          <label for="add-synonyms">{{i18n "tagging.add_synonyms_label"}}</label>
          <div>
            <TagChooser
              @id="add-synonyms"
              @tags={{this.newSynonyms}}
              @blockedTags={{array this.tagInfo.name}}
              @everyTag={{true}}
              @excludeSynonyms={{true}}
              @excludeHasSynonyms={{true}}
              @unlimitedTagCount={{true}}
              @allowCreate={{true}}
            />
            <DButton
              @class="ok"
              @action={{action "addSynonyms"}}
              @disabled={{this.addSynonymsDisabled}}
              @icon="check"
            />
          </div>
        </section>
      {{/if}}
      {{#if this.canAdminTag}}
        <section>
          <PluginOutlet
            @name="tag-custom-settings"
            @outletArgs={{hash tag=this.tagInfo}}
          />
        </section>
        <div class="tag-actions">
          <DButton
            @class="btn-default"
            @action={{action "toggleEditControls"}}
            @icon="cog"
            @label="tagging.edit_synonyms"
            @id="edit-synonyms"
          />
          {{#if this.deleteAction}}
            <DButton
              @class="btn-danger delete-tag"
              @action={{action "deleteTag"}}
              @icon="far-trash-alt"
              @label="tagging.delete_tag"
              @id="delete-tag"
            />
          {{/if}}
        </div>
      {{/if}}
    {{/if}}
    {{#if this.loading}}
      <div>{{i18n "loading"}}</div>
    {{/if}}
  </section>
  */
  {
    "id": "Ii4iYFiV",
    "block": "[[[10,\"section\"],[14,0,\"tag-info\"],[12],[1,\"\\n\"],[41,[30,0,[\"tagInfo\"]],[[[1,\"    \"],[10,0],[14,0,\"tag-name\"],[12],[1,\"\\n\"],[41,[30,0,[\"editing\"]],[[[1,\"        \"],[10,0],[14,0,\"edit-tag-wrapper\"],[12],[1,\"\\n          \"],[8,[39,1],null,[[\"@id\",\"@value\",\"@maxlength\",\"@input\",\"@autofocus\"],[\"edit-name\",[28,[37,2],[[30,0,[\"tagInfo\",\"name\"]]],null],[30,0,[\"siteSettings\",\"max_tag_length\"]],[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"newTagName\"]]],null]],[[\"value\"],[\"target.value\"]]],\"true\"]],null],[1,\"\\n          \"],[8,[39,1],null,[[\"@id\",\"@value\",\"@placeholder\",\"@maxlength\",\"@input\",\"@autofocus\"],[\"edit-description\",[28,[37,2],[[30,0,[\"tagInfo\",\"description\"]]],null],[28,[37,5],[\"tagging.description\"],null],280,[28,[37,3],[[30,0],[28,[37,4],[[30,0,[\"newTagDescription\"]]],null]],[[\"value\"],[\"target.value\"]]],\"true\"]],null],[1,\"\\n\\n          \"],[10,0],[14,0,\"edit-controls\"],[12],[1,\"\\n\"],[41,[51,[30,0,[\"updateDisabled\"]]],[[[1,\"              \"],[8,[39,7],null,[[\"@action\",\"@class\",\"@icon\",\"@ariaLabel\"],[[28,[37,3],[[30,0],\"finishedEditing\"],null],\"btn-primary submit-edit\",\"check\",\"tagging.save\"]],null],[1,\"\\n\"]],[]],null],[1,\"            \"],[8,[39,7],null,[[\"@action\",\"@class\",\"@icon\",\"@ariaLabel\"],[[28,[37,3],[[30,0],\"cancelEditing\"],null],\"btn-default cancel-edit\",\"times\",\"cancel\"]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],[[[1,\"        \"],[10,0],[14,0,\"tag-name-wrapper\"],[12],[1,\"\\n          \"],[1,[28,[35,8],[[30,0,[\"tagInfo\",\"name\"]]],[[\"tagName\"],[\"div\"]]]],[1,\"\\n\"],[41,[30,0,[\"canAdminTag\"]],[[[1,\"            \"],[11,3],[24,6,\"\"],[24,0,\"edit-tag\"],[16,\"title\",[28,[37,5],[\"tagging.edit_tag\"],null]],[4,[38,9],[\"click\",[30,0,[\"edit\"]]],null],[12],[1,[28,[35,10],[\"pencil-alt\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"tag-description-wrapper\"],[12],[1,\"\\n          \"],[1,[30,0,[\"tagInfo\",\"description\"]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"tag-associations\"],[12],[1,\"\\n\"],[41,[30,0,[\"tagInfo\",\"tag_group_names\"]],[[[1,\"        \"],[1,[30,0,[\"tagGroupsInfo\"]]],[1,\"\\n\"]],[]],null],[41,[30,0,[\"tagInfo\",\"categories\"]],[[[1,\"        \"],[1,[30,0,[\"categoriesInfo\"]]],[1,\"\\n        \"],[10,\"br\"],[12],[13],[1,\"\\n\"],[42,[28,[37,12],[[28,[37,12],[[30,0,[\"tagInfo\",\"categories\"]]],null]],null],null,[[[1,\"          \"],[1,[28,[35,13],[[30,1]],null]],[1,\"\\n\"]],[1]],null]],[]],null],[41,[30,0,[\"nothingToShow\"]],[[[41,[30,0,[\"tagInfo\",\"category_restricted\"]],[[[1,\"          \"],[1,[28,[35,5],[\"tagging.category_restricted\"],null]],[1,\"\\n\"]],[]],[[[1,\"          \"],[1,[28,[35,14],[[28,[37,5],[\"tagging.default_info\"],null]],null]],[1,\"\\n\"],[41,[30,0,[\"canAdminTag\"]],[[[1,\"            \"],[1,[28,[35,14],[[28,[37,5],[\"tagging.staff_info\"],[[\"basePath\"],[[28,[37,15],null,null]]]]],null]],[1,\"\\n\"]],[]],null]],[]]]],[]],null],[1,\"    \"],[13],[1,\"\\n\"],[41,[30,0,[\"tagInfo\",\"synonyms\"]],[[[1,\"      \"],[10,0],[14,0,\"synonyms-list\"],[12],[1,\"\\n        \"],[10,\"h3\"],[12],[1,[28,[35,5],[\"tagging.synonyms\"],null]],[13],[1,\"\\n        \"],[10,0],[12],[1,[28,[35,14],[[28,[37,5],[\"tagging.synonyms_description\"],[[\"base_tag_name\"],[[30,0,[\"tagInfo\",\"name\"]]]]]],null]],[13],[1,\"\\n        \"],[10,0],[14,0,\"tag-list\"],[12],[1,\"\\n\"],[42,[28,[37,12],[[28,[37,12],[[30,0,[\"tagInfo\",\"synonyms\"]]],null]],null],null,[[[1,\"            \"],[10,0],[14,0,\"tag-box\"],[12],[1,\"\\n              \"],[1,[28,[35,8],[[30,2,[\"id\"]]],[[\"pmOnly\",\"tagName\"],[[30,2,[\"pmOnly\"]],\"div\"]]]],[1,\"\\n\"],[41,[30,0,[\"editSynonymsMode\"]],[[[1,\"                \"],[11,3],[24,6,\"\"],[24,0,\"unlink-synonym\"],[4,[38,9],[\"click\",[28,[37,16],[[30,0,[\"unlinkSynonym\"]],[30,2]],null]],null],[12],[1,\"\\n                  \"],[1,[28,[35,10],[\"unlink\"],[[\"title\"],[\"tagging.remove_synonym\"]]]],[1,\"\\n                \"],[13],[1,\"\\n                \"],[11,3],[24,6,\"\"],[24,0,\"delete-synonym\"],[4,[38,9],[\"click\",[28,[37,16],[[30,0,[\"deleteSynonym\"]],[30,2]],null]],null],[12],[1,\"\\n                  \"],[1,[28,[35,10],[\"far-trash-alt\"],[[\"title\"],[\"tagging.delete_tag\"]]]],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n\"]],[2]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"editSynonymsMode\"]],[[[1,\"      \"],[10,\"section\"],[14,0,\"add-synonyms field\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,\"for\",\"add-synonyms\"],[12],[1,[28,[35,5],[\"tagging.add_synonyms_label\"],null]],[13],[1,\"\\n        \"],[10,0],[12],[1,\"\\n          \"],[8,[39,17],null,[[\"@id\",\"@tags\",\"@blockedTags\",\"@everyTag\",\"@excludeSynonyms\",\"@excludeHasSynonyms\",\"@unlimitedTagCount\",\"@allowCreate\"],[\"add-synonyms\",[30,0,[\"newSynonyms\"]],[28,[37,18],[[30,0,[\"tagInfo\",\"name\"]]],null],true,true,true,true,true]],null],[1,\"\\n          \"],[8,[39,7],null,[[\"@class\",\"@action\",\"@disabled\",\"@icon\"],[\"ok\",[28,[37,3],[[30,0],\"addSynonyms\"],null],[30,0,[\"addSynonymsDisabled\"]],\"check\"]],null],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"canAdminTag\"]],[[[1,\"      \"],[10,\"section\"],[12],[1,\"\\n        \"],[8,[39,19],null,[[\"@name\",\"@outletArgs\"],[\"tag-custom-settings\",[28,[37,20],null,[[\"tag\"],[[30,0,[\"tagInfo\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"tag-actions\"],[12],[1,\"\\n        \"],[8,[39,7],null,[[\"@class\",\"@action\",\"@icon\",\"@label\",\"@id\"],[\"btn-default\",[28,[37,3],[[30,0],\"toggleEditControls\"],null],\"cog\",\"tagging.edit_synonyms\",\"edit-synonyms\"]],null],[1,\"\\n\"],[41,[30,0,[\"deleteAction\"]],[[[1,\"          \"],[8,[39,7],null,[[\"@class\",\"@action\",\"@icon\",\"@label\",\"@id\"],[\"btn-danger delete-tag\",[28,[37,3],[[30,0],\"deleteTag\"],null],\"far-trash-alt\",\"tagging.delete_tag\",\"delete-tag\"]],null],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[41,[30,0,[\"loading\"]],[[[1,\"    \"],[10,0],[12],[1,[28,[35,5],[\"loading\"],null]],[13],[1,\"\\n\"]],[]],null],[13]],[\"category\",\"tag\"],false,[\"if\",\"text-field\",\"readonly\",\"action\",\"mut\",\"i18n\",\"unless\",\"d-button\",\"discourse-tag\",\"on\",\"d-icon\",\"each\",\"-track-array\",\"category-link\",\"html-safe\",\"base-path\",\"fn\",\"tag-chooser\",\"array\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/components/tag-info.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("tagInfo.tag_group_names"), _dec2 = (0, _decorators.default)("tagInfo.categories"), _dec3 = (0, _decorators.default)("tagInfo.tag_group_names", "tagInfo.categories", "tagInfo.synonyms"), _dec4 = (0, _decorators.default)("newTagName"), (_obj = {
    dialog: (0, _service.inject)(),
    tagName: "",
    loading: false,
    tagInfo: null,
    newSynonyms: null,
    showEditControls: false,
    canAdminTag: (0, _computed.reads)("currentUser.staff"),
    editSynonymsMode: (0, _computed.and)("canAdminTag", "showEditControls"),
    editing: false,
    newTagName: null,
    newTagDescription: null,
    router: (0, _service.inject)(),
    tagGroupsInfo(tagGroupNames) {
      return _I18n.default.t("tagging.tag_groups_info", {
        count: tagGroupNames.length,
        tag_groups: tagGroupNames.join(", ")
      });
    },
    categoriesInfo(categories) {
      return _I18n.default.t("tagging.category_restrictions", {
        count: categories.length
      });
    },
    nothingToShow(tagGroupNames, categories, synonyms) {
      return (0, _utils.isEmpty)(tagGroupNames) && (0, _utils.isEmpty)(categories) && (0, _utils.isEmpty)(synonyms);
    },
    updateDisabled(newTagName) {
      const filterRegexp = new RegExp(this.site.tags_filter_regexp, "g");
      newTagName = newTagName ? newTagName.replace(filterRegexp, "").trim() : "";
      return newTagName.length === 0;
    },
    didInsertElement() {
      this._super(...arguments);
      this.loadTagInfo();
    },
    loadTagInfo() {
      if (this.loading) {
        return;
      }
      this.set("loading", true);
      return this.store.find("tag-info", this.tag.id).then(result => {
        this.set("tagInfo", result);
        this.set("tagInfo.synonyms", result.synonyms.map(s => this.store.createRecord("tag", s)));
      }).finally(() => this.set("loading", false)).catch(_ajaxError.popupAjaxError);
    },
    edit(event) {
      event?.preventDefault();
      this.setProperties({
        editing: true,
        newTagName: this.tag.id,
        newTagDescription: this.tagInfo.description
      });
    },
    unlinkSynonym(tag, event) {
      event?.preventDefault();
      (0, _ajax.ajax)(`/tag/${this.tagInfo.name}/synonyms/${tag.id}`, {
        type: "DELETE"
      }).then(() => this.tagInfo.synonyms.removeObject(tag)).catch(_ajaxError.popupAjaxError);
    },
    deleteSynonym(tag, event) {
      event?.preventDefault();
      this.dialog.yesNoConfirm({
        message: _I18n.default.t("tagging.delete_synonym_confirm", {
          tag_name: tag.text
        }),
        didConfirm: () => {
          return tag.destroyRecord().then(() => this.tagInfo.synonyms.removeObject(tag)).catch(_ajaxError.popupAjaxError);
        }
      });
    },
    actions: {
      toggleEditControls() {
        this.toggleProperty("showEditControls");
      },
      cancelEditing() {
        this.set("editing", false);
      },
      finishedEditing() {
        const oldTagName = this.tag.id;
        this.tag.update({
          id: this.newTagName,
          description: this.newTagDescription
        }).then(result => {
          this.set("editing", false);
          this.tagInfo.set("description", this.newTagDescription);
          if (result.responseJson.tag && oldTagName !== result.responseJson.tag.id) {
            this.router.transitionTo("tag.show", result.responseJson.tag.id);
          }
        }).catch(_ajaxError.popupAjaxError);
      },
      deleteTag() {
        this.deleteAction(this.tagInfo);
      },
      addSynonyms() {
        this.dialog.confirm({
          message: (0, _template.htmlSafe)(_I18n.default.t("tagging.add_synonyms_explanation", {
            count: this.newSynonyms.length,
            tag_name: this.tagInfo.name
          })),
          didConfirm: () => {
            return (0, _ajax.ajax)(`/tag/${this.tagInfo.name}/synonyms`, {
              type: "POST",
              data: {
                synonyms: this.newSynonyms
              }
            }).then(response => {
              if (response.success) {
                this.set("newSynonyms", null);
                this.loadTagInfo();
              } else if (response.failed_tags) {
                this.dialog.alert(_I18n.default.t("tagging.add_synonyms_failed", {
                  tag_names: Object.keys(response.failed_tags).join(", ")
                }));
              } else {
                this.dialog.alert(_I18n.default.t("generic_error"));
              }
            }).catch(_ajaxError.popupAjaxError);
          }
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "tagGroupsInfo", [_dec], Object.getOwnPropertyDescriptor(_obj, "tagGroupsInfo"), _obj), _applyDecoratedDescriptor(_obj, "categoriesInfo", [_dec2], Object.getOwnPropertyDescriptor(_obj, "categoriesInfo"), _obj), _applyDecoratedDescriptor(_obj, "nothingToShow", [_dec3], Object.getOwnPropertyDescriptor(_obj, "nothingToShow"), _obj), _applyDecoratedDescriptor(_obj, "updateDisabled", [_dec4], Object.getOwnPropertyDescriptor(_obj, "updateDisabled"), _obj), _applyDecoratedDescriptor(_obj, "edit", [_object.action], Object.getOwnPropertyDescriptor(_obj, "edit"), _obj), _applyDecoratedDescriptor(_obj, "unlinkSynonym", [_object.action], Object.getOwnPropertyDescriptor(_obj, "unlinkSynonym"), _obj), _applyDecoratedDescriptor(_obj, "deleteSynonym", [_object.action], Object.getOwnPropertyDescriptor(_obj, "deleteSynonym"), _obj)), _obj))));
  _exports.default = _default;
});
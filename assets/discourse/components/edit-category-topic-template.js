define("discourse/components/edit-category-topic-template", ["exports", "@ember/component", "@ember/template-factory", "discourse/components/edit-category-panel", "discourse-common/utils/decorators", "@ember/runloop", "@ember/object"], function (_exports, _component, _templateFactory, _editCategoryPanel, _decorators, _runloop, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/components/edit-category-panel",0,"discourse-common/utils/decorators",0,"@ember/runloop",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.siteSettings.experimental_form_templates}}
    <div class="control-group">
      <DToggleSwitch
        class="toggle-template-type"
        @state={{this.showFormTemplate}}
        @label={{this.templateTypeToggleLabel}}
        {{on "click" this.toggleTemplateType}}
      />
    </div>
  
    {{#if this.showFormTemplate}}
      <div class="control-group">
        <FormTemplateChooser
          @class="select-category-template"
          @value={{this.category.form_template_ids}}
          @onChange={{action (mut this.category.form_template_ids)}}
        />
  
        <p class="select-category-template__info desc">
          {{#if this.currentUser.staff}}
            <LinkTo @route="adminCustomizeFormTemplates">
              {{i18n "admin.form_templates.edit_category.select_template_help"}}
            </LinkTo>
          {{/if}}
        </p>
      </div>
    {{else}}
      <DEditor
        @value={{this.category.topic_template}}
        @showLink={{this.showInsertLinkButton}}
      />
    {{/if}}
  {{else}}
    <DEditor
      @value={{this.category.topic_template}}
      @showLink={{this.showInsertLinkButton}}
    />
  {{/if}}
  */
  {
    "id": "txN6Vm0a",
    "block": "[[[41,[30,0,[\"siteSettings\",\"experimental_form_templates\"]],[[[1,\"  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[8,[39,1],[[24,0,\"toggle-template-type\"],[4,[38,2],[\"click\",[30,0,[\"toggleTemplateType\"]]],null]],[[\"@state\",\"@label\"],[[30,0,[\"showFormTemplate\"]],[30,0,[\"templateTypeToggleLabel\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showFormTemplate\"]],[[[1,\"    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[8,[39,3],null,[[\"@class\",\"@value\",\"@onChange\"],[\"select-category-template\",[30,0,[\"category\",\"form_template_ids\"]],[28,[37,4],[[30,0],[28,[37,5],[[30,0,[\"category\",\"form_template_ids\"]]],null]],null]]],null],[1,\"\\n\\n      \"],[10,2],[14,0,\"select-category-template__info desc\"],[12],[1,\"\\n\"],[41,[30,0,[\"currentUser\",\"staff\"]],[[[1,\"          \"],[8,[39,6],null,[[\"@route\"],[\"adminCustomizeFormTemplates\"]],[[\"default\"],[[[[1,\"\\n            \"],[1,[28,[35,7],[\"admin.form_templates.edit_category.select_template_help\"],null]],[1,\"\\n          \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[8,[39,8],null,[[\"@value\",\"@showLink\"],[[30,0,[\"category\",\"topic_template\"]],[30,0,[\"showInsertLinkButton\"]]]],null],[1,\"\\n\"]],[]]]],[]],[[[1,\"  \"],[8,[39,8],null,[[\"@value\",\"@showLink\"],[[30,0,[\"category\",\"topic_template\"]],[30,0,[\"showInsertLinkButton\"]]]],null],[1,\"\\n\"]],[]]]],[],false,[\"if\",\"d-toggle-switch\",\"on\",\"form-template-chooser\",\"action\",\"mut\",\"link-to\",\"i18n\",\"d-editor\"]]",
    "moduleName": "discourse/components/edit-category-topic-template.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _editCategoryPanel.buildCategoryPanel)("topic-template", (_dec = (0, _decorators.default)("showFormTemplate"), _dec2 = (0, _decorators.observes)("activeTab", "showFormTemplate"), (_obj = {
    showFormTemplate: (0, _object.computed)("category.form_template_ids", {
      get() {
        return Boolean(this.category.form_template_ids.length);
      },
      set(key, value) {
        return value;
      }
    }),
    templateTypeToggleLabel(showFormTemplate) {
      if (showFormTemplate) {
        return "admin.form_templates.edit_category.toggle_form_template";
      }
      return "admin.form_templates.edit_category.toggle_freeform";
    },
    toggleTemplateType() {
      this.toggleProperty("showFormTemplate");
      if (!this.showFormTemplate) {
        // Clear associated form templates if switching to freeform
        this.set("category.form_template_ids", []);
      }
    },
    _activeTabChanged() {
      if (this.activeTab && !this.showFormTemplate) {
        (0, _runloop.schedule)("afterRender", () => this.element.querySelector(".d-editor-input").focus());
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "templateTypeToggleLabel", [_dec], Object.getOwnPropertyDescriptor(_obj, "templateTypeToggleLabel"), _obj), _applyDecoratedDescriptor(_obj, "toggleTemplateType", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleTemplateType"), _obj), _applyDecoratedDescriptor(_obj, "_activeTabChanged", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_activeTabChanged"), _obj)), _obj))));
  _exports.default = _default;
});
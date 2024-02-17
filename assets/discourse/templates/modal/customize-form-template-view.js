define("discourse/templates/modal/customize-form-template-view", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @rawTitle={{this.model.name}}>
    <div class="control-group">
      <DToggleSwitch
        class="form-templates__preview-toggle"
        @state={{this.showPreview}}
        @label="admin.form_templates.view_template.toggle_preview"
        {{on "click" this.togglePreview}}
      />
    </div>
    {{#if this.showPreview}}
      <FormTemplateField::Wrapper @content={{this.model.template}} />
    {{else}}
      <HighlightedCode @lang="yaml" @code={{this.model.template}} />
    {{/if}}
  </DModalBody>
  <div class="modal-footer">
    <DButton
      class="btn-primary"
      @action={{this.editTemplate}}
      @icon="pencil-alt"
      @label="admin.form_templates.view_template.edit"
    />
    <DButton
      @action={{route-action "closeModal"}}
      @label="admin.form_templates.view_template.close"
    />
    <DButton
      class="btn-danger"
      @action={{this.deleteTemplate}}
      @icon="trash-alt"
      @label="admin.form_templates.view_template.delete"
    />
  </div>
  */
  {
    "id": "g5d6iSjB",
    "block": "[[[8,[39,0],null,[[\"@rawTitle\"],[[30,0,[\"model\",\"name\"]]]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[8,[39,1],[[24,0,\"form-templates__preview-toggle\"],[4,[38,2],[\"click\",[30,0,[\"togglePreview\"]]],null]],[[\"@state\",\"@label\"],[[30,0,[\"showPreview\"]],\"admin.form_templates.view_template.toggle_preview\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[41,[30,0,[\"showPreview\"]],[[[1,\"    \"],[8,[39,4],null,[[\"@content\"],[[30,0,[\"model\",\"template\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"    \"],[8,[39,5],null,[[\"@lang\",\"@code\"],[\"yaml\",[30,0,[\"model\",\"template\"]]]],null],[1,\"\\n\"]],[]]]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,6],[[24,0,\"btn-primary\"]],[[\"@action\",\"@icon\",\"@label\"],[[30,0,[\"editTemplate\"]],\"pencil-alt\",\"admin.form_templates.view_template.edit\"]],null],[1,\"\\n  \"],[8,[39,6],null,[[\"@action\",\"@label\"],[[28,[37,7],[\"closeModal\"],null],\"admin.form_templates.view_template.close\"]],null],[1,\"\\n  \"],[8,[39,6],[[24,0,\"btn-danger\"]],[[\"@action\",\"@icon\",\"@label\"],[[30,0,[\"deleteTemplate\"]],\"trash-alt\",\"admin.form_templates.view_template.delete\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"d-toggle-switch\",\"on\",\"if\",\"form-template-field/wrapper\",\"highlighted-code\",\"d-button\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/customize-form-template-view.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
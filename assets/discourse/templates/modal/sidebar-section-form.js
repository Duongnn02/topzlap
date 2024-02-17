define("discourse/templates/modal/sidebar-section-form", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.flashText}}
    <div id="modal-alert" role="alert" class="alert alert-{{this.flashClass}}">
      {{this.flashText}}
    </div>
  {{/if}}
  <DModalBody @title={{this.header}}>
    <form class="form-horizontal">
      <div class="input-group">
        <label for="section-name">{{i18n
            "sidebar.sections.custom.title.label"
          }}</label>
        <Input
          name="section-name"
          @type="text"
          @value={{this.model.title}}
          class={{this.model.titleCssClass}}
          {{on "input" (action (mut this.model.title) value="target.value")}}
        />
        {{#if this.model.invalidTitleMessage}}
          <div class="title warning">
            {{this.model.invalidTitleMessage}}
          </div>
        {{/if}}
      </div>
      {{#each this.activeLinks as |link|}}
        <div class="row-wrapper">
          <div class="input-group">
            <label for="link-name">{{i18n
                "sidebar.sections.custom.links.icon.label"
              }}</label>
            <IconPicker
              @name="icon"
              @value={{link.icon}}
              @options={{hash maximum=1}}
              class={{link.iconCssClass}}
              @onlyAvailable={{true}}
              @onChange={{action (mut link.icon)}}
            />
            {{#if link.invalidIconMessage}}
              <div class="icon warning">
                {{link.invalidIconMessage}}
              </div>
            {{/if}}
          </div>
          <div class="input-group">
            <label for="link-name">{{i18n
                "sidebar.sections.custom.links.name.label"
              }}</label>
            <Input
              name="link-name"
              @type="text"
              @value={{link.name}}
              class={{link.nameCssClass}}
              {{on "input" (action (mut link.name) value="target.value")}}
            />
            {{#if link.invalidNameMessage}}
              <div class="name warning">
                {{link.invalidNameMessage}}
              </div>
            {{/if}}
          </div>
          <div class="input-group">
            <label for="link-url">{{i18n
                "sidebar.sections.custom.links.value.label"
              }}</label>
            <Input
              name="link-url"
              @type="text"
              @value={{link.value}}
              class={{link.valueCssClass}}
              {{on "input" (action (mut link.value) value="target.value")}}
            />
            {{#if link.invalidValueMessage}}
              <div class="value warning">
                {{link.invalidValueMessage}}
              </div>
            {{/if}}
          </div>
          <DButton
            @icon="trash-alt"
            @action={{action "deleteLink" link}}
            @class="btn-flat delete-link"
            @title="sidebar.sections.custom.links.delete"
          />
        </div>
      {{/each}}
      <DButton
        @action={{action "addLink"}}
        @class="btn-flat btn-text add-link"
        @title="sidebar.sections.custom.links.add"
        @icon="plus"
        @label="sidebar.sections.custom.links.add"
      />
      {{#if this.currentUser.staff}}
        <div class="row-wrapper">
          <label class="checkbox-label">
            <Input
              @type="checkbox"
              @checked={{this.model.public}}
              class="mark-public"
            />
            {{i18n "sidebar.sections.custom.public"}}
          </label>
        </div>
      {{/if}}
    </form>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @id="save-section"
      @action={{action "save"}}
      @class="btn-primary"
      @label="sidebar.sections.custom.save"
      @disabled={{not this.model.valid}}
    />
    {{#if this.model.id}}
      <DButton
        @icon="trash-alt"
        @id="delete-section"
        @class="btn-danger delete"
        @action={{action "delete"}}
        @label="sidebar.sections.custom.delete"
      />
    {{/if}}
  </div>
  */
  {
    "id": "LGdBL7k0",
    "block": "[[[41,[30,0,[\"flashText\"]],[[[1,\"  \"],[10,0],[14,1,\"modal-alert\"],[14,\"role\",\"alert\"],[15,0,[29,[\"alert alert-\",[30,0,[\"flashClass\"]]]]],[12],[1,\"\\n    \"],[1,[30,0,[\"flashText\"]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[8,[39,1],null,[[\"@title\"],[[30,0,[\"header\"]]]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"form\"],[14,0,\"form-horizontal\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,\"for\",\"section-name\"],[12],[1,[28,[35,2],[\"sidebar.sections.custom.title.label\"],null]],[13],[1,\"\\n      \"],[8,[39,3],[[24,3,\"section-name\"],[16,0,[30,0,[\"model\",\"titleCssClass\"]]],[4,[38,4],[\"input\",[28,[37,5],[[30,0],[28,[37,6],[[30,0,[\"model\",\"title\"]]],null]],[[\"value\"],[\"target.value\"]]]],null]],[[\"@type\",\"@value\"],[\"text\",[30,0,[\"model\",\"title\"]]]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"invalidTitleMessage\"]],[[[1,\"        \"],[10,0],[14,0,\"title warning\"],[12],[1,\"\\n          \"],[1,[30,0,[\"model\",\"invalidTitleMessage\"]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\"],[42,[28,[37,8],[[28,[37,8],[[30,0,[\"activeLinks\"]]],null]],null],null,[[[1,\"      \"],[10,0],[14,0,\"row-wrapper\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,\"for\",\"link-name\"],[12],[1,[28,[35,2],[\"sidebar.sections.custom.links.icon.label\"],null]],[13],[1,\"\\n          \"],[8,[39,9],[[16,0,[30,1,[\"iconCssClass\"]]]],[[\"@name\",\"@value\",\"@options\",\"@onlyAvailable\",\"@onChange\"],[\"icon\",[30,1,[\"icon\"]],[28,[37,10],null,[[\"maximum\"],[1]]],true,[28,[37,5],[[30,0],[28,[37,6],[[30,1,[\"icon\"]]],null]],null]]],null],[1,\"\\n\"],[41,[30,1,[\"invalidIconMessage\"]],[[[1,\"            \"],[10,0],[14,0,\"icon warning\"],[12],[1,\"\\n              \"],[1,[30,1,[\"invalidIconMessage\"]]],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,\"for\",\"link-name\"],[12],[1,[28,[35,2],[\"sidebar.sections.custom.links.name.label\"],null]],[13],[1,\"\\n          \"],[8,[39,3],[[24,3,\"link-name\"],[16,0,[30,1,[\"nameCssClass\"]]],[4,[38,4],[\"input\",[28,[37,5],[[30,0],[28,[37,6],[[30,1,[\"name\"]]],null]],[[\"value\"],[\"target.value\"]]]],null]],[[\"@type\",\"@value\"],[\"text\",[30,1,[\"name\"]]]],null],[1,\"\\n\"],[41,[30,1,[\"invalidNameMessage\"]],[[[1,\"            \"],[10,0],[14,0,\"name warning\"],[12],[1,\"\\n              \"],[1,[30,1,[\"invalidNameMessage\"]]],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"input-group\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,\"for\",\"link-url\"],[12],[1,[28,[35,2],[\"sidebar.sections.custom.links.value.label\"],null]],[13],[1,\"\\n          \"],[8,[39,3],[[24,3,\"link-url\"],[16,0,[30,1,[\"valueCssClass\"]]],[4,[38,4],[\"input\",[28,[37,5],[[30,0],[28,[37,6],[[30,1,[\"value\"]]],null]],[[\"value\"],[\"target.value\"]]]],null]],[[\"@type\",\"@value\"],[\"text\",[30,1,[\"value\"]]]],null],[1,\"\\n\"],[41,[30,1,[\"invalidValueMessage\"]],[[[1,\"            \"],[10,0],[14,0,\"value warning\"],[12],[1,\"\\n              \"],[1,[30,1,[\"invalidValueMessage\"]]],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n        \"],[8,[39,11],null,[[\"@icon\",\"@action\",\"@class\",\"@title\"],[\"trash-alt\",[28,[37,5],[[30,0],\"deleteLink\",[30,1]],null],\"btn-flat delete-link\",\"sidebar.sections.custom.links.delete\"]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[1]],null],[1,\"    \"],[8,[39,11],null,[[\"@action\",\"@class\",\"@title\",\"@icon\",\"@label\"],[[28,[37,5],[[30,0],\"addLink\"],null],\"btn-flat btn-text add-link\",\"sidebar.sections.custom.links.add\",\"plus\",\"sidebar.sections.custom.links.add\"]],null],[1,\"\\n\"],[41,[30,0,[\"currentUser\",\"staff\"]],[[[1,\"      \"],[10,0],[14,0,\"row-wrapper\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"checkbox-label\"],[12],[1,\"\\n          \"],[8,[39,3],[[24,0,\"mark-public\"]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"model\",\"public\"]]]],null],[1,\"\\n          \"],[1,[28,[35,2],[\"sidebar.sections.custom.public\"],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,11],null,[[\"@id\",\"@action\",\"@class\",\"@label\",\"@disabled\"],[\"save-section\",[28,[37,5],[[30,0],\"save\"],null],\"btn-primary\",\"sidebar.sections.custom.save\",[28,[37,12],[[30,0,[\"model\",\"valid\"]]],null]]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"id\"]],[[[1,\"    \"],[8,[39,11],null,[[\"@icon\",\"@id\",\"@class\",\"@action\",\"@label\"],[\"trash-alt\",\"delete-section\",\"btn-danger delete\",[28,[37,5],[[30,0],\"delete\"],null],\"sidebar.sections.custom.delete\"]],null],[1,\"\\n\"]],[]],null],[13]],[\"link\"],false,[\"if\",\"d-modal-body\",\"i18n\",\"input\",\"on\",\"action\",\"mut\",\"each\",\"-track-array\",\"icon-picker\",\"hash\",\"d-button\",\"not\"]]",
    "moduleName": "discourse/templates/modal/sidebar-section-form.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
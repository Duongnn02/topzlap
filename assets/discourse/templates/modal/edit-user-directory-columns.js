define("discourse/templates/modal/edit-user-directory-columns", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @title="directory.edit_columns.title">
    {{#if this.loading}}
      {{loading-spinner size="large"}}
    {{else}}
      <div class="edit-directory-columns-container">
        {{#each this.columns as |column|}}
          <div class="edit-directory-column">
            <div class="left-content">
              <label class="column-name">
                <Input @type="checkbox" @checked={{column.enabled}} />
                {{#if (directory-column-is-automatic column=column)}}
                  {{directory-table-header-title
                    field=column.name
                    labelKey=this.labelKey
                    icon=column.icon
                  }}
                {{else if (directory-column-is-user-field column=column)}}
                  {{directory-table-header-title
                    field=column.user_field.name
                    translated=true
                  }}
                {{else}}
                  {{directory-table-header-title
                    field=(i18n column.name)
                    translated=true
                  }}
                {{/if}}
              </label>
            </div>
            <div class="right-content">
              <DButton
                @icon="arrow-up"
                @class="button-secondary move-column-up"
                @action={{action "moveUp" column}}
              />
              <DButton
                @icon="arrow-down"
                @class="button-secondary"
                @action={{action "moveDown" column}}
              />
            </div>
          </div>
        {{/each}}
      </div>
    {{/if}}
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @label="directory.edit_columns.save"
      @action={{action "save"}}
    />
  
    <DButton
      @class="btn-secondary reset-to-default"
      @label="directory.edit_columns.reset_to_default"
      @action={{action "resetToDefault"}}
    />
  </div>
  */
  {
    "id": "/1TWUeGa",
    "block": "[[[8,[39,0],null,[[\"@title\"],[\"directory.edit_columns.title\"]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"loading\"]],[[[1,\"    \"],[1,[28,[35,2],null,[[\"size\"],[\"large\"]]]],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"edit-directory-columns-container\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"columns\"]]],null]],null],null,[[[1,\"        \"],[10,0],[14,0,\"edit-directory-column\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"left-content\"],[12],[1,\"\\n            \"],[10,\"label\"],[14,0,\"column-name\"],[12],[1,\"\\n              \"],[8,[39,5],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,1,[\"enabled\"]]]],null],[1,\"\\n\"],[41,[28,[37,6],null,[[\"column\"],[[30,1]]]],[[[1,\"                \"],[1,[28,[35,7],null,[[\"field\",\"labelKey\",\"icon\"],[[30,1,[\"name\"]],[30,0,[\"labelKey\"]],[30,1,[\"icon\"]]]]]],[1,\"\\n\"]],[]],[[[41,[28,[37,8],null,[[\"column\"],[[30,1]]]],[[[1,\"                \"],[1,[28,[35,7],null,[[\"field\",\"translated\"],[[30,1,[\"user_field\",\"name\"]],true]]]],[1,\"\\n\"]],[]],[[[1,\"                \"],[1,[28,[35,7],null,[[\"field\",\"translated\"],[[28,[37,9],[[30,1,[\"name\"]]],null],true]]]],[1,\"\\n              \"]],[]]]],[]]],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"right-content\"],[12],[1,\"\\n            \"],[8,[39,10],null,[[\"@icon\",\"@class\",\"@action\"],[\"arrow-up\",\"button-secondary move-column-up\",[28,[37,11],[[30,0],\"moveUp\",[30,1]],null]]],null],[1,\"\\n            \"],[8,[39,10],null,[[\"@icon\",\"@class\",\"@action\"],[\"arrow-down\",\"button-secondary\",[28,[37,11],[[30,0],\"moveDown\",[30,1]],null]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]]]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,10],null,[[\"@class\",\"@label\",\"@action\"],[\"btn-primary\",\"directory.edit_columns.save\",[28,[37,11],[[30,0],\"save\"],null]]],null],[1,\"\\n\\n  \"],[8,[39,10],null,[[\"@class\",\"@label\",\"@action\"],[\"btn-secondary reset-to-default\",\"directory.edit_columns.reset_to_default\",[28,[37,11],[[30,0],\"resetToDefault\"],null]]],null],[1,\"\\n\"],[13]],[\"column\"],false,[\"d-modal-body\",\"if\",\"loading-spinner\",\"each\",\"-track-array\",\"input\",\"directory-column-is-automatic\",\"directory-table-header-title\",\"directory-column-is-user-field\",\"i18n\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/templates/modal/edit-user-directory-columns.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
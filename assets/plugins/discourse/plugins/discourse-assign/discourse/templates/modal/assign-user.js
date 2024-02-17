define("discourse/plugins/discourse-assign/discourse/templates/modal/assign-user", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody class="assign">
    <div>
      <div class="control-group {{if this.assigneeError 'assignee-error'}}">
        <label>{{i18n "discourse_assign.assign_modal.assignee_label"}}</label>
        {{assignee-chooser
          autocomplete="off"
          value=assigneeName
          onChange=(action "assignUsername")
          autofocus="autofocus"
          showUserStatus=true
          options=(hash
            mobilePlacementStrategy="absolute"
            filterPlaceholder=placeholderKey
            includeGroups=true
            customSearchOptions=(hash
              assignableGroups=true defaultSearchResults=this.assignSuggestions
            )
            groupMembersOf=allowedGroups
            maximum=1
            autofocus=autofocus
            tabindex=1
            expandedOnInsert=(not assigneeName)
            caretUpIcon="search"
            caretDownIcon="search"
          )
        }}
        {{#if this.assigneeError}}
          <span class="error-label">
            {{d-icon "exclamation-triangle"}}
            {{i18n "discourse_assign.assign_modal.choose_assignee"}}
          </span>
        {{/if}}
      </div>
  
      {{#if this.statusEnabled}}
        <div class="control-group assign-status">
          <label>{{i18n "discourse_assign.assign_modal.status_label"}}</label>
          <ComboBox
            @id="assign-status"
            @content={{availableStatuses}}
            @value={{status}}
            @onChange={{action (mut model.status)}}
          />
        </div>
      {{/if}}
  
      <div class="control-group assign-status">
        <label>
          {{i18n "discourse_assign.assign_modal.note_label"}}&nbsp;<span
            class="label-optional"
          >{{i18n "discourse_assign.assign_modal.optional_label"}}</span>
        </label>
        <Textarea
          id={{"assign-modal-note"}}
          @value={{model.note}}
          {{! template-lint-disable no-down-event-binding }}
          {{on "keydown" (action "handleTextAreaKeydown")}}
        />
      </div>
    </div>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @label={{if
        model.reassign
        "discourse_assign.reassign.title"
        "discourse_assign.assign_modal.assign"
      }}
      @icon={{inviteIcon}}
      @action={{this.assign}}
      class="btn-primary"
      @disabled={{disabled}}
    />
    <DModalCancel @close={{route-action "closeModal"}} />
  </div>
  */
  {
    "id": "EPFUwKFU",
    "block": "[[[8,[39,0],[[24,0,\"assign\"]],null,[[\"default\"],[[[[1,\"\\n  \"],[10,0],[12],[1,\"\\n    \"],[10,0],[15,0,[29,[\"control-group \",[52,[30,0,[\"assigneeError\"]],\"assignee-error\"]]]],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,2],[\"discourse_assign.assign_modal.assignee_label\"],null]],[13],[1,\"\\n      \"],[1,[28,[35,3],null,[[\"autocomplete\",\"value\",\"onChange\",\"autofocus\",\"showUserStatus\",\"options\"],[\"off\",[33,4],[28,[37,5],[[30,0],\"assignUsername\"],null],\"autofocus\",true,[28,[37,6],null,[[\"mobilePlacementStrategy\",\"filterPlaceholder\",\"includeGroups\",\"customSearchOptions\",\"groupMembersOf\",\"maximum\",\"autofocus\",\"tabindex\",\"expandedOnInsert\",\"caretUpIcon\",\"caretDownIcon\"],[\"absolute\",[33,7],true,[28,[37,6],null,[[\"assignableGroups\",\"defaultSearchResults\"],[true,[30,0,[\"assignSuggestions\"]]]]],[33,8],1,[33,9],1,[28,[37,10],[[33,4]],null],\"search\",\"search\"]]]]]]],[1,\"\\n\"],[41,[30,0,[\"assigneeError\"]],[[[1,\"        \"],[10,1],[14,0,\"error-label\"],[12],[1,\"\\n          \"],[1,[28,[35,11],[\"exclamation-triangle\"],null]],[1,\"\\n          \"],[1,[28,[35,2],[\"discourse_assign.assign_modal.choose_assignee\"],null]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"statusEnabled\"]],[[[1,\"      \"],[10,0],[14,0,\"control-group assign-status\"],[12],[1,\"\\n        \"],[10,\"label\"],[12],[1,[28,[35,2],[\"discourse_assign.assign_modal.status_label\"],null]],[13],[1,\"\\n        \"],[8,[39,12],null,[[\"@id\",\"@content\",\"@value\",\"@onChange\"],[\"assign-status\",[99,13,[\"@content\"]],[99,14,[\"@value\"]],[28,[37,5],[[30,0],[28,[37,15],[[33,16,[\"status\"]]],null]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,0],[14,0,\"control-group assign-status\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,\"\\n        \"],[1,[28,[35,2],[\"discourse_assign.assign_modal.note_label\"],null]],[1,\" \"],[10,1],[14,0,\"label-optional\"],[12],[1,[28,[35,2],[\"discourse_assign.assign_modal.optional_label\"],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[8,[39,17],[[24,1,\"assign-modal-note\"],[4,[38,18],[\"keydown\",[28,[37,5],[[30,0],\"handleTextAreaKeydown\"],null]],null]],[[\"@value\"],[[33,16,[\"note\"]]]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,19],[[24,0,\"btn-primary\"]],[[\"@label\",\"@icon\",\"@action\",\"@disabled\"],[[52,[33,16,[\"reassign\"]],\"discourse_assign.reassign.title\",\"discourse_assign.assign_modal.assign\"],[99,20,[\"@icon\"]],[30,0,[\"assign\"]],[99,21,[\"@disabled\"]]]],null],[1,\"\\n  \"],[8,[39,22],null,[[\"@close\"],[[28,[37,23],[\"closeModal\"],null]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"if\",\"i18n\",\"assignee-chooser\",\"assigneeName\",\"action\",\"hash\",\"placeholderKey\",\"allowedGroups\",\"autofocus\",\"not\",\"d-icon\",\"combo-box\",\"availableStatuses\",\"status\",\"mut\",\"model\",\"textarea\",\"on\",\"d-button\",\"inviteIcon\",\"disabled\",\"d-modal-cancel\",\"route-action\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse/templates/modal/assign-user.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
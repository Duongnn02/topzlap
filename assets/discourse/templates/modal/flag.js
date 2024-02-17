define("discourse/templates/modal/flag", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody
    @class="flag-modal-body"
    @title={{this.title}}
    @submitOnEnter={{false}}
  >
    <form>
      <FlagSelection
        @nameKey={{this.selected.name_key}}
        @flags={{this.flagsAvailable}}
        as |f|
      >
        <FlagActionType
          @flag={{f}}
          @message={{this.message}}
          @isWarning={{this.isWarning}}
          @selectedFlag={{this.selected}}
          @username={{this.model.username}}
          @staffFlagsAvailable={{this.staffFlagsAvailable}}
          @changePostActionType={{action "changePostActionType"}}
        />
      </FlagSelection>
    </form>
  
    <PluginOutlet
      @name="flag-modal-bottom"
      @connectorTagName="div"
      @outletArgs={{hash post=this.model}}
    />
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @action={{action "createFlag"}}
      @disabled={{this.submitDisabled}}
      @title="flagging.submit_tooltip"
      @icon={{this.submitIcon}}
      @label={{this.submitLabel}}
    />
  
    {{#if this.canSendWarning}}
      <DButton
        @class="btn-danger"
        @action={{action "createFlagAsWarning"}}
        @disabled={{this.submitDisabled}}
        @icon="exclamation-triangle"
        @label="flagging.official_warning"
      />
    {{/if}}
  
    {{#if this.canTakeAction}}
      <ReviewableBundledAction
        @bundle={{this.flagActions}}
        @performAction={{action "takeAction"}}
        @reviewableUpdating={{this.submitDisabled}}
      />
  
      <DButton
        @class="btn-danger"
        @action={{action "flagForReview"}}
        @disabled={{or this.submitDisabled this.cantFlagForReview}}
        @icon="exclamation-triangle"
        @label="flagging.flag_for_review"
      />
    {{/if}}
  
    {{#if this.showDeleteSpammer}}
      <DButton
        @class="btn-danger"
        @action={{action "deleteSpammer"}}
        @disabled={{this.submitDisabled}}
        @icon="exclamation-triangle"
        @label="flagging.delete_spammer"
      />
    {{/if}}
  </div>
  */
  {
    "id": "LaHgW2T+",
    "block": "[[[8,[39,0],null,[[\"@class\",\"@title\",\"@submitOnEnter\"],[\"flag-modal-body\",[30,0,[\"title\"]],false]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"form\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@nameKey\",\"@flags\"],[[30,0,[\"selected\",\"name_key\"]],[30,0,[\"flagsAvailable\"]]]],[[\"default\"],[[[[1,\"\\n      \"],[8,[39,2],null,[[\"@flag\",\"@message\",\"@isWarning\",\"@selectedFlag\",\"@username\",\"@staffFlagsAvailable\",\"@changePostActionType\"],[[30,1],[30,0,[\"message\"]],[30,0,[\"isWarning\"]],[30,0,[\"selected\"]],[30,0,[\"model\",\"username\"]],[30,0,[\"staffFlagsAvailable\"]],[28,[37,3],[[30,0],\"changePostActionType\"],null]]],null],[1,\"\\n    \"]],[1]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"flag-modal-bottom\",\"div\",[28,[37,5],null,[[\"post\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,6],null,[[\"@class\",\"@action\",\"@disabled\",\"@title\",\"@icon\",\"@label\"],[\"btn-primary\",[28,[37,3],[[30,0],\"createFlag\"],null],[30,0,[\"submitDisabled\"]],\"flagging.submit_tooltip\",[30,0,[\"submitIcon\"]],[30,0,[\"submitLabel\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"canSendWarning\"]],[[[1,\"    \"],[8,[39,6],null,[[\"@class\",\"@action\",\"@disabled\",\"@icon\",\"@label\"],[\"btn-danger\",[28,[37,3],[[30,0],\"createFlagAsWarning\"],null],[30,0,[\"submitDisabled\"]],\"exclamation-triangle\",\"flagging.official_warning\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canTakeAction\"]],[[[1,\"    \"],[8,[39,8],null,[[\"@bundle\",\"@performAction\",\"@reviewableUpdating\"],[[30,0,[\"flagActions\"]],[28,[37,3],[[30,0],\"takeAction\"],null],[30,0,[\"submitDisabled\"]]]],null],[1,\"\\n\\n    \"],[8,[39,6],null,[[\"@class\",\"@action\",\"@disabled\",\"@icon\",\"@label\"],[\"btn-danger\",[28,[37,3],[[30,0],\"flagForReview\"],null],[28,[37,9],[[30,0,[\"submitDisabled\"]],[30,0,[\"cantFlagForReview\"]]],null],\"exclamation-triangle\",\"flagging.flag_for_review\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showDeleteSpammer\"]],[[[1,\"    \"],[8,[39,6],null,[[\"@class\",\"@action\",\"@disabled\",\"@icon\",\"@label\"],[\"btn-danger\",[28,[37,3],[[30,0],\"deleteSpammer\"],null],[30,0,[\"submitDisabled\"]],\"exclamation-triangle\",\"flagging.delete_spammer\"]],null],[1,\"\\n\"]],[]],null],[13]],[\"f\"],false,[\"d-modal-body\",\"flag-selection\",\"flag-action-type\",\"action\",\"plugin-outlet\",\"hash\",\"d-button\",\"if\",\"reviewable-bundled-action\",\"or\"]]",
    "moduleName": "discourse/templates/modal/flag.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/templates/modal/second-factor-backup-edit", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    {{#if this.successMessage}}
      <div class="alert alert-success">
        {{this.successMessage}}
      </div>
    {{/if}}
  
    {{#if this.errorMessage}}
      <div class="alert alert-error">
        {{this.errorMessage}}
      </div>
    {{/if}}
  
    <ConditionalLoadingSection @isLoading={{this.loading}}>
      {{#if this.backupCodes}}
        <h3>{{i18n "user.second_factor_backup.codes.title"}}</h3>
  
        <p>
          {{i18n "user.second_factor_backup.codes.description"}}
        </p>
  
        <BackupCodes
          @copyBackupCode={{action "copyBackupCode"}}
          @backupCodes={{this.backupCodes}}
        />
      {{/if}}
    </ConditionalLoadingSection>
  
    {{#if this.backupEnabled}}
      {{html-safe
        (i18n
          "user.second_factor_backup.remaining_codes" count=this.remainingCodes
        )
      }}
    {{else}}
      {{html-safe (i18n "user.second_factor_backup.not_enabled")}}
    {{/if}}
  </DModalBody>
  
  <div class="modal-footer">
    <div class="actions">
      {{#if this.backupEnabled}}
        <DButton
          @class="btn-primary"
          @icon="redo"
          @action={{action "generateSecondFactorCodes"}}
          @type="submit"
          @isLoading={{this.loading}}
          @label="user.second_factor_backup.regenerate"
        />
      {{else}}
        <DButton
          @class="btn-primary"
          @action={{action "generateSecondFactorCodes"}}
          @type="submit"
          @disabled={{this.loading}}
          @label="user.second_factor_backup.enable"
        />
      {{/if}}
    </div>
  </div>
  */
  {
    "id": "ICG0cXoT",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"successMessage\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-success\"],[12],[1,\"\\n      \"],[1,[30,0,[\"successMessage\"]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"errorMessage\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,\"\\n      \"],[1,[30,0,[\"errorMessage\"]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[8,[39,2],null,[[\"@isLoading\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"backupCodes\"]],[[[1,\"      \"],[10,\"h3\"],[12],[1,[28,[35,3],[\"user.second_factor_backup.codes.title\"],null]],[13],[1,\"\\n\\n      \"],[10,2],[12],[1,\"\\n        \"],[1,[28,[35,3],[\"user.second_factor_backup.codes.description\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[8,[39,4],null,[[\"@copyBackupCode\",\"@backupCodes\"],[[28,[37,5],[[30,0],\"copyBackupCode\"],null],[30,0,[\"backupCodes\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"]],[]]]]],[1,\"\\n\\n\"],[41,[30,0,[\"backupEnabled\"]],[[[1,\"    \"],[1,[28,[35,6],[[28,[37,3],[\"user.second_factor_backup.remaining_codes\"],[[\"count\"],[[30,0,[\"remainingCodes\"]]]]]],null]],[1,\"\\n\"]],[]],[[[1,\"    \"],[1,[28,[35,6],[[28,[37,3],[\"user.second_factor_backup.not_enabled\"],null]],null]],[1,\"\\n\"]],[]]]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"actions\"],[12],[1,\"\\n\"],[41,[30,0,[\"backupEnabled\"]],[[[1,\"      \"],[8,[39,7],null,[[\"@class\",\"@icon\",\"@action\",\"@type\",\"@isLoading\",\"@label\"],[\"btn-primary\",\"redo\",[28,[37,5],[[30,0],\"generateSecondFactorCodes\"],null],\"submit\",[30,0,[\"loading\"]],\"user.second_factor_backup.regenerate\"]],null],[1,\"\\n\"]],[]],[[[1,\"      \"],[8,[39,7],null,[[\"@class\",\"@action\",\"@type\",\"@disabled\",\"@label\"],[\"btn-primary\",[28,[37,5],[[30,0],\"generateSecondFactorCodes\"],null],\"submit\",[30,0,[\"loading\"]],\"user.second_factor_backup.enable\"]],null],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"if\",\"conditional-loading-section\",\"i18n\",\"backup-codes\",\"action\",\"html-safe\",\"d-button\"]]",
    "moduleName": "discourse/templates/modal/second-factor-backup-edit.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
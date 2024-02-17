define("discourse/templates/modal/associate-account-confirm", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody
    @rawTitle={{i18n
      "user.associated_accounts.confirm_modal_title"
      provider=(i18n (concat "login." this.model.provider_name ".name"))
    }}
  >
    {{#if this.model.error}}
      <div class="alert alert-error">
        {{this.model.error}}
      </div>
    {{/if}}
  
    {{#if this.model.existing_account_description}}
      <p>
        {{i18n
          "user.associated_accounts.confirm_description.disconnect"
          provider=(i18n (concat "login." this.model.provider_name ".name"))
          account_description=this.model.existing_account_description
        }}
      </p>
    {{/if}}
  
    <p>
      {{#if this.model.account_description}}
        {{i18n
          "user.associated_accounts.confirm_description.account_specific"
          provider=(i18n (concat "login." this.model.provider_name ".name"))
          account_description=this.model.account_description
        }}
      {{else}}
        {{i18n
          "user.associated_accounts.confirm_description.generic"
          provider=(i18n (concat "login." this.model.provider_name ".name"))
        }}
      {{/if}}
    </p>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @label="user.associated_accounts.connect"
      @action={{action "finishConnect"}}
      @class="btn-primary"
      @icon="plug"
    />
    <DButton
      @label="user.associated_accounts.cancel"
      @action={{action "closeModal"}}
    />
  </div>
  */
  {
    "id": "5vNqe8yt",
    "block": "[[[8,[39,0],null,[[\"@rawTitle\"],[[28,[37,1],[\"user.associated_accounts.confirm_modal_title\"],[[\"provider\"],[[28,[37,1],[[28,[37,2],[\"login.\",[30,0,[\"model\",\"provider_name\"]],\".name\"],null]],null]]]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"model\",\"error\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,\"\\n      \"],[1,[30,0,[\"model\",\"error\"]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"existing_account_description\"]],[[[1,\"    \"],[10,2],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"user.associated_accounts.confirm_description.disconnect\"],[[\"provider\",\"account_description\"],[[28,[37,1],[[28,[37,2],[\"login.\",[30,0,[\"model\",\"provider_name\"]],\".name\"],null]],null],[30,0,[\"model\",\"existing_account_description\"]]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,2],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"account_description\"]],[[[1,\"      \"],[1,[28,[35,1],[\"user.associated_accounts.confirm_description.account_specific\"],[[\"provider\",\"account_description\"],[[28,[37,1],[[28,[37,2],[\"login.\",[30,0,[\"model\",\"provider_name\"]],\".name\"],null]],null],[30,0,[\"model\",\"account_description\"]]]]]],[1,\"\\n\"]],[]],[[[1,\"      \"],[1,[28,[35,1],[\"user.associated_accounts.confirm_description.generic\"],[[\"provider\"],[[28,[37,1],[[28,[37,2],[\"login.\",[30,0,[\"model\",\"provider_name\"]],\".name\"],null]],null]]]]],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,4],null,[[\"@label\",\"@action\",\"@class\",\"@icon\"],[\"user.associated_accounts.connect\",[28,[37,5],[[30,0],\"finishConnect\"],null],\"btn-primary\",\"plug\"]],null],[1,\"\\n  \"],[8,[39,4],null,[[\"@label\",\"@action\"],[\"user.associated_accounts.cancel\",[28,[37,5],[[30,0],\"closeModal\"],null]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"i18n\",\"concat\",\"if\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/templates/modal/associate-account-confirm.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
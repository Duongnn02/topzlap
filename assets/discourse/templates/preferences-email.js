define("discourse/templates/preferences-email", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="user-preferences" @tagName="">
    <section class="user-content user-preferences solo-preference">
      <form class="form-vertical">
        {{#if this.success}}
          <div class="alert alert-success">{{this.successMessage}}</div>
          <LinkTo @route="preferences.account" class="success-back">
            {{d-icon "arrow-left"}}
            {{i18n "user.change_email.back_to_preferences"}}
          </LinkTo>
  
        {{else}}
          {{#if this.error}}
            <div class="alert alert-error">{{this.errorMessage}}</div>
          {{/if}}
          <div class="control-group">
            <label class="control-label">
              {{i18n
                (if this.new "user.add_email.title" "user.change_email.title")
              }}
            </label>
            <div class="controls">
              <TextField
                @value={{this.newEmail}}
                @id="change-email"
                @classNames="input-xxlarge"
                @autofocus="autofocus"
              />
              <div class="instructions">
                {{#if this.taken}}
                  {{i18n "user.change_email.taken"}}
                {{else}}
                  {{i18n "user.email.instructions"}}
                {{/if}}
              </div>
              <InputTip @validation={{this.emailValidation}} />
            </div>
          </div>
          <div class="controls save-button">
            <DButton
              @class="btn-primary"
              @action={{action "saveEmail"}}
              @type="submit"
              @disabled={{this.saveDisabled}}
              @translatedLabel={{this.saveButtonText}}
            />
            <CancelLink
              @route="preferences.account"
              @args={{this.model.username}}
            />
          </div>
        {{/if}}
      </form>
    </section>
  </DSection>
  */
  {
    "id": "74eBiqFM",
    "block": "[[[8,[39,0],null,[[\"@pageClass\",\"@tagName\"],[\"user-preferences\",\"\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"section\"],[14,0,\"user-content user-preferences solo-preference\"],[12],[1,\"\\n    \"],[10,\"form\"],[14,0,\"form-vertical\"],[12],[1,\"\\n\"],[41,[30,0,[\"success\"]],[[[1,\"        \"],[10,0],[14,0,\"alert alert-success\"],[12],[1,[30,0,[\"successMessage\"]]],[13],[1,\"\\n        \"],[8,[39,2],[[24,0,\"success-back\"]],[[\"@route\"],[\"preferences.account\"]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,3],[\"arrow-left\"],null]],[1,\"\\n          \"],[1,[28,[35,4],[\"user.change_email.back_to_preferences\"],null]],[1,\"\\n        \"]],[]]]]],[1,\"\\n\\n\"]],[]],[[[41,[30,0,[\"error\"]],[[[1,\"          \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,[30,0,[\"errorMessage\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,\"\\n            \"],[1,[28,[35,4],[[52,[30,0,[\"new\"]],\"user.add_email.title\",\"user.change_email.title\"]],null]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n            \"],[8,[39,5],null,[[\"@value\",\"@id\",\"@classNames\",\"@autofocus\"],[[30,0,[\"newEmail\"]],\"change-email\",\"input-xxlarge\",\"autofocus\"]],null],[1,\"\\n            \"],[10,0],[14,0,\"instructions\"],[12],[1,\"\\n\"],[41,[30,0,[\"taken\"]],[[[1,\"                \"],[1,[28,[35,4],[\"user.change_email.taken\"],null]],[1,\"\\n\"]],[]],[[[1,\"                \"],[1,[28,[35,4],[\"user.email.instructions\"],null]],[1,\"\\n\"]],[]]],[1,\"            \"],[13],[1,\"\\n            \"],[8,[39,6],null,[[\"@validation\"],[[30,0,[\"emailValidation\"]]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"controls save-button\"],[12],[1,\"\\n          \"],[8,[39,7],null,[[\"@class\",\"@action\",\"@type\",\"@disabled\",\"@translatedLabel\"],[\"btn-primary\",[28,[37,8],[[30,0],\"saveEmail\"],null],\"submit\",[30,0,[\"saveDisabled\"]],[30,0,[\"saveButtonText\"]]]],null],[1,\"\\n          \"],[8,[39,9],null,[[\"@route\",\"@args\"],[\"preferences.account\",[30,0,[\"model\",\"username\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]]],[],false,[\"d-section\",\"if\",\"link-to\",\"d-icon\",\"i18n\",\"text-field\",\"input-tip\",\"d-button\",\"action\",\"cancel-link\"]]",
    "moduleName": "discourse/templates/preferences-email.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
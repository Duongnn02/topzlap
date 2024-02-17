define("discourse/templates/modal/grant-badge", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @class="grant-badge">
    <ConditionalLoadingSpinner @condition={{this.loading}}>
      {{#if this.noGrantableBadges}}
        <p>{{i18n "admin.badges.no_badges"}}</p>
      {{else}}
        <p>
          <ComboBox
            @value={{this.selectedBadgeId}}
            @content={{this.grantableBadges}}
            @onChange={{action (mut this.selectedBadgeId)}}
            @options={{hash filterable=true none="badges.none"}}
          />
        </p>
      {{/if}}
    </ConditionalLoadingSpinner>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @disabled={{this.buttonDisabled}}
      @action={{action "grantBadge"}}
      @label="admin.badges.grant"
    />
  </div>
  */
  {
    "id": "8PvmxMRT",
    "block": "[[[8,[39,0],null,[[\"@class\"],[\"grant-badge\"]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"noGrantableBadges\"]],[[[1,\"      \"],[10,2],[12],[1,[28,[35,3],[\"admin.badges.no_badges\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,2],[12],[1,\"\\n        \"],[8,[39,4],null,[[\"@value\",\"@content\",\"@onChange\",\"@options\"],[[30,0,[\"selectedBadgeId\"]],[30,0,[\"grantableBadges\"]],[28,[37,5],[[30,0],[28,[37,6],[[30,0,[\"selectedBadgeId\"]]],null]],null],[28,[37,7],null,[[\"filterable\",\"none\"],[true,\"badges.none\"]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]]],[1,\"  \"]],[]]]]],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,8],null,[[\"@class\",\"@disabled\",\"@action\",\"@label\"],[\"btn-primary\",[30,0,[\"buttonDisabled\"]],[28,[37,5],[[30,0],\"grantBadge\"],null],\"admin.badges.grant\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"conditional-loading-spinner\",\"if\",\"i18n\",\"combo-box\",\"action\",\"mut\",\"hash\",\"d-button\"]]",
    "moduleName": "discourse/templates/modal/grant-badge.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/templates/modal/auth-token", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @title="user.auth_tokens.was_this_you">
    <div>
      <p>{{i18n "user.auth_tokens.was_this_you_description"}}</p>
      <p>{{html-safe (i18n "user.second_factor.extended_description")}}</p>
    </div>
  
    <div>
      <h3>{{i18n "user.auth_tokens.details"}}</h3>
      <ul style="list-style-type:none">
        <li>{{d-icon "far-clock"}} {{format-date this.model.seen_at}}</li>
        <li>{{d-icon "map-marker-alt"}} {{this.model.location}}</li>
        <li>{{d-icon this.model.icon}}
          {{i18n
            "user.auth_tokens.browser_and_device"
            browser=this.model.browser
            device=this.model.device
          }}</li>
      </ul>
    </div>
  
    {{#if this.latest_post}}
      <div>
        <h3>
          {{i18n "user.auth_tokens.latest_post"}}
          <a href {{on "click" this.toggleExpanded}}>{{d-icon
              (if this.expanded "caret-up" "caret-down")
            }}</a>
        </h3>
  
        {{#if this.expanded}}
          <blockquote>{{html-safe this.latest_post.cooked}}</blockquote>
        {{else}}
          <blockquote>{{html-safe this.latest_post.excerpt}}</blockquote>
        {{/if}}
      </div>
    {{/if}}
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @action={{action "highlightSecure"}}
      @icon="lock"
      @label="user.auth_tokens.secure_account"
    />
    <DModalCancel @close={{route-action "closeModal"}} />
  </div>
  */
  {
    "id": "Hja3juys",
    "block": "[[[8,[39,0],null,[[\"@title\"],[\"user.auth_tokens.was_this_you\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[12],[1,\"\\n    \"],[10,2],[12],[1,[28,[35,1],[\"user.auth_tokens.was_this_you_description\"],null]],[13],[1,\"\\n    \"],[10,2],[12],[1,[28,[35,2],[[28,[37,1],[\"user.second_factor.extended_description\"],null]],null]],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[12],[1,\"\\n    \"],[10,\"h3\"],[12],[1,[28,[35,1],[\"user.auth_tokens.details\"],null]],[13],[1,\"\\n    \"],[10,\"ul\"],[14,5,\"list-style-type:none\"],[12],[1,\"\\n      \"],[10,\"li\"],[12],[1,[28,[35,3],[\"far-clock\"],null]],[1,\" \"],[1,[28,[35,4],[[30,0,[\"model\",\"seen_at\"]]],null]],[13],[1,\"\\n      \"],[10,\"li\"],[12],[1,[28,[35,3],[\"map-marker-alt\"],null]],[1,\" \"],[1,[30,0,[\"model\",\"location\"]]],[13],[1,\"\\n      \"],[10,\"li\"],[12],[1,[28,[35,3],[[30,0,[\"model\",\"icon\"]]],null]],[1,\"\\n        \"],[1,[28,[35,1],[\"user.auth_tokens.browser_and_device\"],[[\"browser\",\"device\"],[[30,0,[\"model\",\"browser\"]],[30,0,[\"model\",\"device\"]]]]]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"latest_post\"]],[[[1,\"    \"],[10,0],[12],[1,\"\\n      \"],[10,\"h3\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[\"user.auth_tokens.latest_post\"],null]],[1,\"\\n        \"],[11,3],[24,6,\"\"],[4,[38,6],[\"click\",[30,0,[\"toggleExpanded\"]]],null],[12],[1,[28,[35,3],[[52,[30,0,[\"expanded\"]],\"caret-up\",\"caret-down\"]],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"expanded\"]],[[[1,\"        \"],[10,\"blockquote\"],[12],[1,[28,[35,2],[[30,0,[\"latest_post\",\"cooked\"]]],null]],[13],[1,\"\\n\"]],[]],[[[1,\"        \"],[10,\"blockquote\"],[12],[1,[28,[35,2],[[30,0,[\"latest_post\",\"excerpt\"]]],null]],[13],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n\"]],[]],null]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,7],null,[[\"@class\",\"@action\",\"@icon\",\"@label\"],[\"btn-primary\",[28,[37,8],[[30,0],\"highlightSecure\"],null],\"lock\",\"user.auth_tokens.secure_account\"]],null],[1,\"\\n  \"],[8,[39,9],null,[[\"@close\"],[[28,[37,10],[\"closeModal\"],null]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"i18n\",\"html-safe\",\"d-icon\",\"format-date\",\"if\",\"on\",\"d-button\",\"action\",\"d-modal-cancel\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/auth-token.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
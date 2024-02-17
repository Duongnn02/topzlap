define("discourse/components/group-manage-logs-row", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <tr class="group-manage-logs-row">
    <td>
      <DButton
        @class="btn-default"
        @action={{action "filter"}}
        @actionParam={{hash value=this.log.action key="action"}}
        @translatedLabel={{this.log.actionTitle}}
      />
    </td>
  
    <td>
      <span>{{avatar this.log.acting_user imageSize="tiny"}}</span>
      <DButton
        @class="btn-default"
        @action={{action "filter"}}
        @actionParam={{hash
          value=this.log.acting_user.username
          key="acting_user"
        }}
        @translatedLabel={{this.log.acting_user.username}}
      />
    </td>
  
    <td>
      {{#if this.log.target_user}}
        <span>{{avatar this.log.target_user imageSize="tiny"}}</span>
        <DButton
          @class="btn-default"
          @action={{action "filter"}}
          @actionParam={{hash
            value=this.log.target_user.username
            key="target_user"
          }}
          @translatedLabel={{this.log.target_user.username}}
        />
      {{/if}}
    </td>
  
    <td>
      {{#if this.log.subject}}
        <DButton
          @class="btn-default"
          @action={{action "filter"}}
          @actionParam={{hash value=this.log.subject key="subject"}}
          @translatedLabel={{this.log.subject}}
        />
      {{/if}}
    </td>
  
    <td>{{bound-date this.log.created_at}}</td>
  
    <td class="group-manage-logs-expand-details">
      {{#if this.log.prev_value}}
        <DButton
          @action={{action "toggleDetails"}}
          @icon={{if this.expandDetails "angle-up" "angle-down"}}
        />
      {{/if}}
    </td>
  </tr>
  
  {{#if this.expandDetails}}
    <tr>
      <td colspan="6">
        <p>
          <strong>{{i18n "groups.manage.logs.from"}}</strong>:
          <code>{{this.log.prev_value}}</code>
        </p>
  
        <p>
          <strong>{{i18n "groups.manage.logs.to"}}</strong>:
          <code>{{this.log.new_value}}</code>
        </p>
      </td>
    </tr>
  {{/if}}
  */
  {
    "id": "tjlFinZy",
    "block": "[[[10,\"tr\"],[14,0,\"group-manage-logs-row\"],[12],[1,\"\\n  \"],[10,\"td\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@class\",\"@action\",\"@actionParam\",\"@translatedLabel\"],[\"btn-default\",[28,[37,1],[[30,0],\"filter\"],null],[28,[37,2],null,[[\"value\",\"key\"],[[30,0,[\"log\",\"action\"]],\"action\"]]],[30,0,[\"log\",\"actionTitle\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"td\"],[12],[1,\"\\n    \"],[10,1],[12],[1,[28,[35,3],[[30,0,[\"log\",\"acting_user\"]]],[[\"imageSize\"],[\"tiny\"]]]],[13],[1,\"\\n    \"],[8,[39,0],null,[[\"@class\",\"@action\",\"@actionParam\",\"@translatedLabel\"],[\"btn-default\",[28,[37,1],[[30,0],\"filter\"],null],[28,[37,2],null,[[\"value\",\"key\"],[[30,0,[\"log\",\"acting_user\",\"username\"]],\"acting_user\"]]],[30,0,[\"log\",\"acting_user\",\"username\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"td\"],[12],[1,\"\\n\"],[41,[30,0,[\"log\",\"target_user\"]],[[[1,\"      \"],[10,1],[12],[1,[28,[35,3],[[30,0,[\"log\",\"target_user\"]]],[[\"imageSize\"],[\"tiny\"]]]],[13],[1,\"\\n      \"],[8,[39,0],null,[[\"@class\",\"@action\",\"@actionParam\",\"@translatedLabel\"],[\"btn-default\",[28,[37,1],[[30,0],\"filter\"],null],[28,[37,2],null,[[\"value\",\"key\"],[[30,0,[\"log\",\"target_user\",\"username\"]],\"target_user\"]]],[30,0,[\"log\",\"target_user\",\"username\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,\"td\"],[12],[1,\"\\n\"],[41,[30,0,[\"log\",\"subject\"]],[[[1,\"      \"],[8,[39,0],null,[[\"@class\",\"@action\",\"@actionParam\",\"@translatedLabel\"],[\"btn-default\",[28,[37,1],[[30,0],\"filter\"],null],[28,[37,2],null,[[\"value\",\"key\"],[[30,0,[\"log\",\"subject\"]],\"subject\"]]],[30,0,[\"log\",\"subject\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,\"td\"],[12],[1,[28,[35,5],[[30,0,[\"log\",\"created_at\"]]],null]],[13],[1,\"\\n\\n  \"],[10,\"td\"],[14,0,\"group-manage-logs-expand-details\"],[12],[1,\"\\n\"],[41,[30,0,[\"log\",\"prev_value\"]],[[[1,\"      \"],[8,[39,0],null,[[\"@action\",\"@icon\"],[[28,[37,1],[[30,0],\"toggleDetails\"],null],[52,[30,0,[\"expandDetails\"]],\"angle-up\",\"angle-down\"]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"expandDetails\"]],[[[1,\"  \"],[10,\"tr\"],[12],[1,\"\\n    \"],[10,\"td\"],[14,\"colspan\",\"6\"],[12],[1,\"\\n      \"],[10,2],[12],[1,\"\\n        \"],[10,\"strong\"],[12],[1,[28,[35,6],[\"groups.manage.logs.from\"],null]],[13],[1,\":\\n        \"],[10,\"code\"],[12],[1,[30,0,[\"log\",\"prev_value\"]]],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,2],[12],[1,\"\\n        \"],[10,\"strong\"],[12],[1,[28,[35,6],[\"groups.manage.logs.to\"],null]],[13],[1,\":\\n        \"],[10,\"code\"],[12],[1,[30,0,[\"log\",\"new_value\"]]],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"d-button\",\"action\",\"hash\",\"avatar\",\"if\",\"bound-date\",\"i18n\"]]",
    "moduleName": "discourse/components/group-manage-logs-row.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "",
    expandDetails: false,
    actions: {
      toggleDetails() {
        this.toggleProperty("expandDetails");
      },
      filter(params) {
        this.set(`filters.${params.key}`, params.value);
      }
    }
  }));
  _exports.default = _default;
});
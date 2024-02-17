define("discourse/components/directory-item", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/computed"], function (_exports, _component, _templateFactory, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="directory-table__cell">
    <UserInfo @user={{this.item.user}} />
  </div>
  
  {{#each this.columns as |column|}}
    {{#if (directory-column-is-user-field column=column)}}
      <div class="directory-table__cell--user-field">
        <span class="directory-table__label">
          <span>{{column.name}}</span>
        </span>
        {{directory-item-user-field-value item=this.item column=column}}
      </div>
    {{else}}
      <div class="directory-table__cell">
        <span class="directory-table__label">
          <span>
            {{#if column.icon}}
              {{d-icon column.icon}}
            {{/if}}
            {{directory-item-label item=this.item column=column}}
          </span>
        </span>
        {{directory-item-value item=this.item column=column}}
      </div>
    {{/if}}
  
  {{/each}}
  
  {{#if this.showTimeRead}}
    <div class="directory-table__cell time-read">
      <span class="directory-table__label">
        <span>{{i18n "directory.time_read"}}</span>
      </span>
      <span class="directory-table__value">
        {{format-duration this.item.time_read}}
      </span>
    </div>
  {{/if}}
  */
  {
    "id": "bO8B+DJZ",
    "block": "[[[10,0],[14,0,\"directory-table__cell\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@user\"],[[30,0,[\"item\",\"user\"]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"columns\"]]],null]],null],null,[[[41,[28,[37,4],null,[[\"column\"],[[30,1]]]],[[[1,\"    \"],[10,0],[14,0,\"directory-table__cell--user-field\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"directory-table__label\"],[12],[1,\"\\n        \"],[10,1],[12],[1,[30,1,[\"name\"]]],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[1,[28,[35,5],null,[[\"item\",\"column\"],[[30,0,[\"item\"]],[30,1]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"directory-table__cell\"],[12],[1,\"\\n      \"],[10,1],[14,0,\"directory-table__label\"],[12],[1,\"\\n        \"],[10,1],[12],[1,\"\\n\"],[41,[30,1,[\"icon\"]],[[[1,\"            \"],[1,[28,[35,6],[[30,1,[\"icon\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"          \"],[1,[28,[35,7],null,[[\"item\",\"column\"],[[30,0,[\"item\"]],[30,1]]]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n      \"],[1,[28,[35,8],null,[[\"item\",\"column\"],[[30,0,[\"item\"]],[30,1]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]],[1,\"\\n\"]],[1]],null],[1,\"\\n\"],[41,[30,0,[\"showTimeRead\"]],[[[1,\"  \"],[10,0],[14,0,\"directory-table__cell time-read\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"directory-table__label\"],[12],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,9],[\"directory.time_read\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,1],[14,0,\"directory-table__value\"],[12],[1,\"\\n      \"],[1,[28,[35,10],[[30,0,[\"item\",\"time_read\"]]],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"column\"],false,[\"user-info\",\"each\",\"-track-array\",\"if\",\"directory-column-is-user-field\",\"directory-item-user-field-value\",\"d-icon\",\"directory-item-label\",\"directory-item-value\",\"i18n\",\"format-duration\"]]",
    "moduleName": "discourse/components/directory-item.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "div",
    classNames: ["directory-table__row"],
    classNameBindings: ["me"],
    me: (0, _computed.propertyEqual)("item.user.id", "currentUser.id"),
    columns: null
  }));
  _exports.default = _default;
});
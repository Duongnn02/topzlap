define("discourse/plugins/discourse-assign/discourse/templates/components/group-assigned-filter", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if showAvatar}}
    <LinkTo
      @route="group.assigned.show"
      @model={{filter.username_lower}}
      @query={{hash order=order ascending=ascending search=search}}
    >
      <div class="assign-image">
        <a href={{filter.userPath}} data-user-card={{filter.username}}>{{avatar
            filter
            imageSize="large"
          }}</a>
      </div>
  
      <div class="assign-names">
        <div class="assign-username">{{format-username filter.username}}</div>
        <div class="assign-name">{{filter.name}}</div>
      </div>
  
      <div class="assign-count">
        {{filter.assignments_count}}
      </div>
    </LinkTo>
  {{else if groupName}}
    <LinkTo
      @route="group.assigned.show"
      @model={{filter}}
      @query={{hash order=order ascending=ascending search=search}}
    >
      <div class="assign-image">
        {{d-icon "group-plus"}}
      </div>
      <div class="assign-names">
        <div class="assign-username">{{groupName}}</div>
      </div>
  
      <div class="assign-count">
        {{assignmentCount}}
      </div>
    </LinkTo>
  {{else}}
    <LinkTo
      @route="group.assigned.show"
      @model={{filter}}
      @query={{hash order=order ascending=ascending search=search}}
    >
      <div class="assign-everyone">
        {{i18n "discourse_assign.group_everyone"}}
      </div>
      <div class="assign-count">
        {{assignmentCount}}
      </div>
    </LinkTo>
  {{/if}}
  */
  {
    "id": "RSK4yoBV",
    "block": "[[[41,[33,1],[[[1,\"  \"],[8,[39,2],null,[[\"@route\",\"@model\",\"@query\"],[\"group.assigned.show\",[33,3,[\"username_lower\"]],[28,[37,4],null,[[\"order\",\"ascending\",\"search\"],[[33,5],[33,6],[33,7]]]]]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[14,0,\"assign-image\"],[12],[1,\"\\n      \"],[10,3],[15,6,[33,3,[\"userPath\"]]],[15,\"data-user-card\",[33,3,[\"username\"]]],[12],[1,[28,[35,8],[[33,3]],[[\"imageSize\"],[\"large\"]]]],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"assign-names\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"assign-username\"],[12],[1,[28,[35,9],[[33,3,[\"username\"]]],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"assign-name\"],[12],[1,[33,3,[\"name\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"assign-count\"],[12],[1,\"\\n      \"],[1,[33,3,[\"assignments_count\"]]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]],[[[41,[33,10],[[[1,\"  \"],[8,[39,2],null,[[\"@route\",\"@model\",\"@query\"],[\"group.assigned.show\",[99,3,[\"@model\"]],[28,[37,4],null,[[\"order\",\"ascending\",\"search\"],[[33,5],[33,6],[33,7]]]]]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[14,0,\"assign-image\"],[12],[1,\"\\n      \"],[1,[28,[35,11],[\"group-plus\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"assign-names\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"assign-username\"],[12],[1,[34,10]],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"assign-count\"],[12],[1,\"\\n      \"],[1,[34,12]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]],[[[1,\"  \"],[8,[39,2],null,[[\"@route\",\"@model\",\"@query\"],[\"group.assigned.show\",[99,3,[\"@model\"]],[28,[37,4],null,[[\"order\",\"ascending\",\"search\"],[[33,5],[33,6],[33,7]]]]]],[[\"default\"],[[[[1,\"\\n    \"],[10,0],[14,0,\"assign-everyone\"],[12],[1,\"\\n      \"],[1,[28,[35,13],[\"discourse_assign.group_everyone\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"assign-count\"],[12],[1,\"\\n      \"],[1,[34,12]],[1,\"\\n    \"],[13],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]]]],[]]]],[],false,[\"if\",\"showAvatar\",\"link-to\",\"filter\",\"hash\",\"order\",\"ascending\",\"search\",\"avatar\",\"format-username\",\"groupName\",\"d-icon\",\"assignmentCount\",\"i18n\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse/templates/components/group-assigned-filter.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
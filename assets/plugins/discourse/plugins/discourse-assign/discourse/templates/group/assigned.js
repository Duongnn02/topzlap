define("discourse/plugins/discourse-assign/discourse/templates/group/assigned", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <section class="user-secondary-navigation group-assignments">
    <MobileNav
      @class="activity-nav"
      @desktopClass="action-list activity-list nav-stacked"
    >
      {{#if isDesktop}}
        <div class="search-div">
          <Input
            @type="text"
            placeholder={{i18n
              "discourse_assign.sidebar_name_filter_placeholder"
            }}
            @value={{readonly filterName}}
            class="search"
            {{on "input" (action "onChangeFilterName" value="target.value")}}
          />
        </div>
      {{/if}}
      <LoadMore @selector=".activity-nav li" @action={{action "loadMore"}}>
        {{group-assigned-filter
          showAvatar=false
          filter="everyone"
          routeType=route_type
          assignmentCount=group.assignment_count
          search=search
          ascending=ascending
          order=order
        }}
        {{group-assigned-filter
          showAvatar=false
          groupName=group.name
          filter=group.name
          routeType=route_type
          assignmentCount=group.group_assignment_count
          search=search
          ascending=ascending
          order=order
        }}
        {{#each members as |member|}}
          {{group-assigned-filter
            showAvatar=true
            filter=member
            routeType=route_type
            search=search
            ascending=ascending
            order=order
          }}
        {{/each}}
        <ConditionalLoadingSpinner @condition={{loading}} />
      </LoadMore>
    </MobileNav>
  </section>
  <section class="user-content">
    {{outlet}}
  </section>
  */
  {
    "id": "+aeGTvi/",
    "block": "[[[10,\"section\"],[14,0,\"user-secondary-navigation group-assignments\"],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@class\",\"@desktopClass\"],[\"activity-nav\",\"action-list activity-list nav-stacked\"]],[[\"default\"],[[[[1,\"\\n\"],[41,[33,2],[[[1,\"      \"],[10,0],[14,0,\"search-div\"],[12],[1,\"\\n        \"],[8,[39,3],[[16,\"placeholder\",[28,[37,4],[\"discourse_assign.sidebar_name_filter_placeholder\"],null]],[24,0,\"search\"],[4,[38,7],[\"input\",[28,[37,8],[[30,0],\"onChangeFilterName\"],[[\"value\"],[\"target.value\"]]]],null]],[[\"@type\",\"@value\"],[\"text\",[28,[37,5],[[33,6]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[8,[39,9],null,[[\"@selector\",\"@action\"],[\".activity-nav li\",[28,[37,8],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,10],null,[[\"showAvatar\",\"filter\",\"routeType\",\"assignmentCount\",\"search\",\"ascending\",\"order\"],[false,\"everyone\",[33,11],[33,12,[\"assignment_count\"]],[33,13],[33,14],[33,15]]]]],[1,\"\\n      \"],[1,[28,[35,10],null,[[\"showAvatar\",\"groupName\",\"filter\",\"routeType\",\"assignmentCount\",\"search\",\"ascending\",\"order\"],[false,[33,12,[\"name\"]],[33,12,[\"name\"]],[33,11],[33,12,[\"group_assignment_count\"]],[33,13],[33,14],[33,15]]]]],[1,\"\\n\"],[42,[28,[37,17],[[28,[37,17],[[33,18]],null]],null],null,[[[1,\"        \"],[1,[28,[35,10],null,[[\"showAvatar\",\"filter\",\"routeType\",\"search\",\"ascending\",\"order\"],[true,[30,1],[33,11],[33,13],[33,14],[33,15]]]]],[1,\"\\n\"]],[1]],null],[1,\"      \"],[8,[39,19],null,[[\"@condition\"],[[99,20,[\"@condition\"]]]],null],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"],[13],[1,\"\\n\"],[10,\"section\"],[14,0,\"user-content\"],[12],[1,\"\\n  \"],[46,[28,[37,22],null,null],null,null,null],[1,\"\\n\"],[13]],[\"member\"],false,[\"mobile-nav\",\"if\",\"isDesktop\",\"input\",\"i18n\",\"readonly\",\"filterName\",\"on\",\"action\",\"load-more\",\"group-assigned-filter\",\"route_type\",\"group\",\"search\",\"ascending\",\"order\",\"each\",\"-track-array\",\"members\",\"conditional-loading-spinner\",\"loading\",\"component\",\"-outlet\"]]",
    "moduleName": "discourse/plugins/discourse-assign/discourse/templates/group/assigned.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/templates/tag/show", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection
    @tagName=""
    @pageClass="tags"
    @bodyClass={{concat
      "tag-"
      this.tag.id
      (if this.category.slug (concat " category-" this.category.slug))
      ""
      (if this.additionalTags " tags-intersection")
    }}
  >
    <div class="container">
      <DiscourseBanner @user={{this.currentUser}} @banner={{this.site.banner}} />
    </div>
  
    <span>
      <PluginOutlet
        @name="discovery-list-controls-above"
        @connectorTagName="div"
      />
    </span>
  
    <div class="list-controls">
      <PluginOutlet
        @name="discovery-navigation-bar-above"
        @connectorTagName="div"
      />
      <div class="container">
        <section class="navigation-container tag-navigation">
          <DNavigation
            @filterMode={{this.filterMode}}
            @canCreateTopic={{this.canCreateTopic}}
            @hasDraft={{this.currentUser.has_topic_draft}}
            @createTopic={{route-action "createTopic"}}
            @category={{this.category}}
            @editCategory={{route-action "editCategory" this.category}}
            @tag={{this.tag}}
            @noSubcategories={{this.noSubcategories}}
            @tagNotification={{this.tagNotification}}
            @additionalTags={{this.additionalTags}}
            @showInfo={{this.showInfo}}
            @canCreateTopicOnTag={{this.canCreateTopicOnTag}}
            @createTopicDisabled={{this.createTopicDisabled}}
            @changeTagNotificationLevel={{action "changeTagNotificationLevel"}}
            @toggleInfo={{action "toggleInfo"}}
          />
  
          <PluginOutlet
            @name="tag-navigation"
            @connectorTagName="div"
            @outletArgs={{hash category=this.category tag=this.tag}}
          />
        </section>
      </div>
    </div>
  
    {{#if this.showInfo}}
      <TagInfo
        @tag={{this.tag}}
        @list={{this.list}}
        @deleteAction={{action "deleteTag"}}
      />
    {{/if}}
  
    <span>
      <PluginOutlet
        @name="discovery-list-container-top"
        @connectorTagName="div"
        @outletArgs={{hash category=this.category}}
      />
    </span>
  
    <TopicDismissButtons
      @position="top"
      @selectedTopics={{this.selected}}
      @model={{this.model}}
      @showResetNew={{this.showResetNew}}
      @showDismissRead={{this.showDismissRead}}
      @resetNew={{action "resetNew"}}
    />
  
    <span>
      <PluginOutlet @name="discovery-above" @connectorTagName="div" />
    </span>
  
    <div class="container list-container">
      <div class="row">
        <div class="full-width">
          <PluginOutlet @name="before-list-area" />
          <div id="list-area">
            {{#unless this.loading}}
              <DiscoveryTopicsList
                @model={{this.list}}
                @refresh={{action "refresh"}}
                @autoAddTopicsToBulkSelect={{this.autoAddTopicsToBulkSelect}}
                @bulkSelectEnabled={{this.bulkSelectEnabled}}
                @addTopicsToBulkSelect={{action "addTopicsToBulkSelect"}}
                as |discoveryTopicList|
              >
                {{#if this.top}}
                  <div class="top-lists">
                    <PeriodChooser
                      @period={{this.period}}
                      @action={{action "changePeriod"}}
                      @fullDay={{false}}
                    />
                  </div>
                {{else}}
                  {{#if this.topicTrackingState.hasIncoming}}
                    <div class="show-more {{if this.hasTopics 'has-topics'}}">
                      <a
                        tabindex="0"
                        href
                        {{on "click" this.showInserted}}
                        class="alert alert-info clickable"
                      >
                        <CountI18n
                          @key="topic_count_"
                          @suffix={{this.topicTrackingState.filter}}
                          @count={{this.topicTrackingState.incomingCount}}
                        />
                      </a>
                    </div>
                  {{/if}}
                {{/if}}
  
                {{#if this.list.topics}}
                  <TopicList
                    @topics={{this.list.topics}}
                    @canBulkSelect={{this.canBulkSelect}}
                    @toggleBulkSelect={{action "toggleBulkSelect"}}
                    @bulkSelectEnabled={{this.bulkSelectEnabled}}
                    @bulkSelectAction={{action "refresh"}}
                    @updateAutoAddTopicsToBulkSelect={{action
                      "updateAutoAddTopicsToBulkSelect"
                    }}
                    @selected={{this.selected}}
                    @category={{this.category}}
                    @showPosters={{true}}
                    @order={{this.order}}
                    @ascending={{this.ascending}}
                    @changeSort={{action "changeSort"}}
                    @onScroll={{discoveryTopicList.saveScrollPosition}}
                    @scrollOnLoad={{true}}
                    @focusLastVisitedTopic={{true}}
                  />
                {{/if}}
              </DiscoveryTopicsList>
  
              <footer class="topic-list-bottom">
                <TopicDismissButtons
                  @position="bottom"
                  @selectedTopics={{this.selected}}
                  @model={{this.model}}
                  @showResetNew={{this.showResetNew}}
                  @showDismissRead={{this.showDismissRead}}
                  @resetNew={{action "resetNew"}}
                />
  
                {{#unless this.list.canLoadMore}}
                  <FooterMessage
                    @education={{this.footerEducation}}
                    @message={{this.footerMessage}}
                  >
                    {{html-safe
                      (i18n
                        "topic.browse_all_tags_or_latest" basePath=(base-path)
                      )
                    }}
                  </FooterMessage>
                {{/unless}}
              </footer>
            {{/unless}}
  
            <ConditionalLoadingSpinner @condition={{this.list.loadingMore}} />
          </div>
        </div>
      </div>
    </div>
  
    <span>
      <PluginOutlet @name="discovery-below" @connectorTagName="div" />
    </span>
  </DSection>
  */
  {
    "id": "a/Bt8GiC",
    "block": "[[[8,[39,0],null,[[\"@tagName\",\"@pageClass\",\"@bodyClass\"],[\"\",\"tags\",[28,[37,1],[\"tag-\",[30,0,[\"tag\",\"id\"]],[52,[30,0,[\"category\",\"slug\"]],[28,[37,1],[\" category-\",[30,0,[\"category\",\"slug\"]]],null]],\"\",[52,[30,0,[\"additionalTags\"]],\" tags-intersection\"]],null]]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n    \"],[8,[39,3],null,[[\"@user\",\"@banner\"],[[30,0,[\"currentUser\"]],[30,0,[\"site\",\"banner\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\"],[\"discovery-list-controls-above\",\"div\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"list-controls\"],[12],[1,\"\\n    \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\"],[\"discovery-navigation-bar-above\",\"div\"]],null],[1,\"\\n    \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n      \"],[10,\"section\"],[14,0,\"navigation-container tag-navigation\"],[12],[1,\"\\n        \"],[8,[39,5],null,[[\"@filterMode\",\"@canCreateTopic\",\"@hasDraft\",\"@createTopic\",\"@category\",\"@editCategory\",\"@tag\",\"@noSubcategories\",\"@tagNotification\",\"@additionalTags\",\"@showInfo\",\"@canCreateTopicOnTag\",\"@createTopicDisabled\",\"@changeTagNotificationLevel\",\"@toggleInfo\"],[[30,0,[\"filterMode\"]],[30,0,[\"canCreateTopic\"]],[30,0,[\"currentUser\",\"has_topic_draft\"]],[28,[37,6],[\"createTopic\"],null],[30,0,[\"category\"]],[28,[37,6],[\"editCategory\",[30,0,[\"category\"]]],null],[30,0,[\"tag\"]],[30,0,[\"noSubcategories\"]],[30,0,[\"tagNotification\"]],[30,0,[\"additionalTags\"]],[30,0,[\"showInfo\"]],[30,0,[\"canCreateTopicOnTag\"]],[30,0,[\"createTopicDisabled\"]],[28,[37,7],[[30,0],\"changeTagNotificationLevel\"],null],[28,[37,7],[[30,0],\"toggleInfo\"],null]]],null],[1,\"\\n\\n        \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"tag-navigation\",\"div\",[28,[37,8],null,[[\"category\",\"tag\"],[[30,0,[\"category\"]],[30,0,[\"tag\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showInfo\"]],[[[1,\"    \"],[8,[39,9],null,[[\"@tag\",\"@list\",\"@deleteAction\"],[[30,0,[\"tag\"]],[30,0,[\"list\"]],[28,[37,7],[[30,0],\"deleteTag\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"discovery-list-container-top\",\"div\",[28,[37,8],null,[[\"category\"],[[30,0,[\"category\"]]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[8,[39,10],null,[[\"@position\",\"@selectedTopics\",\"@model\",\"@showResetNew\",\"@showDismissRead\",\"@resetNew\"],[\"top\",[30,0,[\"selected\"]],[30,0,[\"model\"]],[30,0,[\"showResetNew\"]],[30,0,[\"showDismissRead\"]],[28,[37,7],[[30,0],\"resetNew\"],null]]],null],[1,\"\\n\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\"],[\"discovery-above\",\"div\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"container list-container\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"full-width\"],[12],[1,\"\\n        \"],[8,[39,4],null,[[\"@name\"],[\"before-list-area\"]],null],[1,\"\\n        \"],[10,0],[14,1,\"list-area\"],[12],[1,\"\\n\"],[41,[51,[30,0,[\"loading\"]]],[[[1,\"            \"],[8,[39,12],null,[[\"@model\",\"@refresh\",\"@autoAddTopicsToBulkSelect\",\"@bulkSelectEnabled\",\"@addTopicsToBulkSelect\"],[[30,0,[\"list\"]],[28,[37,7],[[30,0],\"refresh\"],null],[30,0,[\"autoAddTopicsToBulkSelect\"]],[30,0,[\"bulkSelectEnabled\"]],[28,[37,7],[[30,0],\"addTopicsToBulkSelect\"],null]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"top\"]],[[[1,\"                \"],[10,0],[14,0,\"top-lists\"],[12],[1,\"\\n                  \"],[8,[39,13],null,[[\"@period\",\"@action\",\"@fullDay\"],[[30,0,[\"period\"]],[28,[37,7],[[30,0],\"changePeriod\"],null],false]],null],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"topicTrackingState\",\"hasIncoming\"]],[[[1,\"                  \"],[10,0],[15,0,[29,[\"show-more \",[52,[30,0,[\"hasTopics\"]],\"has-topics\"]]]],[12],[1,\"\\n                    \"],[11,3],[24,\"tabindex\",\"0\"],[24,6,\"\"],[24,0,\"alert alert-info clickable\"],[4,[38,14],[\"click\",[30,0,[\"showInserted\"]]],null],[12],[1,\"\\n                      \"],[8,[39,15],null,[[\"@key\",\"@suffix\",\"@count\"],[\"topic_count_\",[30,0,[\"topicTrackingState\",\"filter\"]],[30,0,[\"topicTrackingState\",\"incomingCount\"]]]],null],[1,\"\\n                    \"],[13],[1,\"\\n                  \"],[13],[1,\"\\n\"]],[]],null]],[]]],[1,\"\\n\"],[41,[30,0,[\"list\",\"topics\"]],[[[1,\"                \"],[8,[39,16],null,[[\"@topics\",\"@canBulkSelect\",\"@toggleBulkSelect\",\"@bulkSelectEnabled\",\"@bulkSelectAction\",\"@updateAutoAddTopicsToBulkSelect\",\"@selected\",\"@category\",\"@showPosters\",\"@order\",\"@ascending\",\"@changeSort\",\"@onScroll\",\"@scrollOnLoad\",\"@focusLastVisitedTopic\"],[[30,0,[\"list\",\"topics\"]],[30,0,[\"canBulkSelect\"]],[28,[37,7],[[30,0],\"toggleBulkSelect\"],null],[30,0,[\"bulkSelectEnabled\"]],[28,[37,7],[[30,0],\"refresh\"],null],[28,[37,7],[[30,0],\"updateAutoAddTopicsToBulkSelect\"],null],[30,0,[\"selected\"]],[30,0,[\"category\"]],true,[30,0,[\"order\"]],[30,0,[\"ascending\"]],[28,[37,7],[[30,0],\"changeSort\"],null],[30,1,[\"saveScrollPosition\"]],true,true]],null],[1,\"\\n\"]],[]],null],[1,\"            \"]],[1]]]]],[1,\"\\n\\n            \"],[10,\"footer\"],[14,0,\"topic-list-bottom\"],[12],[1,\"\\n              \"],[8,[39,10],null,[[\"@position\",\"@selectedTopics\",\"@model\",\"@showResetNew\",\"@showDismissRead\",\"@resetNew\"],[\"bottom\",[30,0,[\"selected\"]],[30,0,[\"model\"]],[30,0,[\"showResetNew\"]],[30,0,[\"showDismissRead\"]],[28,[37,7],[[30,0],\"resetNew\"],null]]],null],[1,\"\\n\\n\"],[41,[51,[30,0,[\"list\",\"canLoadMore\"]]],[[[1,\"                \"],[8,[39,17],null,[[\"@education\",\"@message\"],[[30,0,[\"footerEducation\"]],[30,0,[\"footerMessage\"]]]],[[\"default\"],[[[[1,\"\\n                  \"],[1,[28,[35,18],[[28,[37,19],[\"topic.browse_all_tags_or_latest\"],[[\"basePath\"],[[28,[37,20],null,null]]]]],null]],[1,\"\\n                \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n          \"],[8,[39,21],null,[[\"@condition\"],[[30,0,[\"list\",\"loadingMore\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\"],[\"discovery-below\",\"div\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]]],[\"discoveryTopicList\"],false,[\"d-section\",\"concat\",\"if\",\"discourse-banner\",\"plugin-outlet\",\"d-navigation\",\"route-action\",\"action\",\"hash\",\"tag-info\",\"topic-dismiss-buttons\",\"unless\",\"discovery-topics-list\",\"period-chooser\",\"on\",\"count-i18n\",\"topic-list\",\"footer-message\",\"html-safe\",\"i18n\",\"base-path\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/tag/show.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
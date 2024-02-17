define("discourse/templates/review-index", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="reviewable-container">
    <div class="reviewable-list">
      {{#if this.reviewables}}
        <LoadMore @selector=".reviewable-item" @action={{action "loadMore"}}>
          <div class="reviewables">
            {{#each this.reviewables as |r|}}
              <ReviewableItem @reviewable={{r}} @remove={{action "remove"}} />
            {{/each}}
          </div>
        </LoadMore>
        <ConditionalLoadingSpinner @condition={{this.reviewables.loadingMore}} />
      {{else}}
        <div class="no-review">
          {{i18n "review.none"}}
        </div>
      {{/if}}
    </div>
  
    <div class="reviewable-filters">
      <div class="reviewable-filter">
        <label class="filter-label">{{i18n "review.filters.status"}}</label>
        <ComboBox
          @value={{this.filterStatus}}
          @content={{this.statuses}}
          @onChange={{action (mut this.filterStatus)}}
        />
      </div>
  
      {{#if this.filtersExpanded}}
  
        <span>
          <PluginOutlet
            @name="above-review-filters"
            @connectorTagName="div"
            @outletArgs={{hash
              model=this.model
              additionalFilters=this.additionalFilters
            }}
          />
        </span>
  
        <div class="reviewable-filter">
          <label class="filter-label">{{i18n "review.filters.type.title"}}</label>
          <ComboBox
            @value={{this.filterType}}
            @content={{this.allTypes}}
            @onChange={{action (mut this.filterType)}}
            @options={{hash none="review.filters.type.all"}}
          />
        </div>
  
        <div class="reviewable-filter">
          <label class="filter-label">{{i18n
              "review.filters.priority.title"
            }}</label>
          <ComboBox
            @value={{this.filterPriority}}
            @content={{this.priorities}}
            @onChange={{action (mut this.filterPriority)}}
          />
        </div>
  
        <div class="reviewable-filter">
          <label class="filter-label">{{i18n "review.filters.category"}}</label>
          <CategoryChooser
            @value={{this.filterCategoryId}}
            @onChange={{action (mut this.filterCategoryId)}}
            @options={{hash none="review.filters.all_categories"}}
          />
        </div>
  
        <div class="reviewable-filter topic-filter">
          {{i18n "review.filtered_reviewed_by"}}
          <EmailGroupUserChooser
            @value={{this.filterReviewedBy}}
            @onChange={{action "updateFilterReviewedBy"}}
            @options={{hash
              maximum=1
              excludeCurrentUser=false
              fullWidthWrap=true
            }}
          />
        </div>
  
        <div class="reviewable-filter topic-filter">
          {{i18n "review.filtered_user"}}
          <EmailGroupUserChooser
            @value={{this.filterUsername}}
            @onChange={{action "updateFilterUsername"}}
            @class="user-selector"
            @options={{hash
              maximum=1
              excludeCurrentUser=false
              fullWidthWrap=true
            }}
          />
        </div>
  
        {{#if this.filterTopic}}
          <div class="reviewable-filter topic-filter">
            {{i18n "review.filtered_topic"}}
            <DButton
              @class="btn-default"
              @label="review.show_all_topics"
              @icon="times"
              @action={{action "resetTopic"}}
            />
          </div>
        {{/if}}
  
        <div class="reviewable-filter date-range">
          {{i18n "review.date_filter"}}
          <DateTimeInputRange
            @from={{this.filterFromDate}}
            @to={{this.filterToDate}}
            @onChange={{this.setRange}}
            @showFromTime={{false}}
            @showToTime={{false}}
          />
        </div>
  
        <div class="reviewable-filter sort-order">
          {{i18n "review.order_by"}}
          <ComboBox
            @value={{this.filterSortOrder}}
            @content={{this.sortOrders}}
            @onChange={{action (mut this.filterSortOrder)}}
          />
        </div>
      {{/if}}
  
      <div class="reviewable-filters-actions">
        <DButton
          @icon="sync"
          @label="review.filters.refresh"
          @class="btn-primary refresh"
          @action={{action "refresh"}}
        />
  
        {{#if this.site.mobileView}}
          <DButton
            @label="show_help"
            @icon={{this.toggleFiltersIcon}}
            @class="btn-default expand-secondary-filters"
            @action={{action "toggleFilters"}}
          />
        {{/if}}
      </div>
    </div>
  </div>
  */
  {
    "id": "PzwdV480",
    "block": "[[[10,0],[14,0,\"reviewable-container\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"reviewable-list\"],[12],[1,\"\\n\"],[41,[30,0,[\"reviewables\"]],[[[1,\"      \"],[8,[39,1],null,[[\"@selector\",\"@action\"],[\".reviewable-item\",[28,[37,2],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n        \"],[10,0],[14,0,\"reviewables\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"reviewables\"]]],null]],null],null,[[[1,\"            \"],[8,[39,5],null,[[\"@reviewable\",\"@remove\"],[[30,1],[28,[37,2],[[30,0],\"remove\"],null]]],null],[1,\"\\n\"]],[1]],null],[1,\"        \"],[13],[1,\"\\n      \"]],[]]]]],[1,\"\\n      \"],[8,[39,6],null,[[\"@condition\"],[[30,0,[\"reviewables\",\"loadingMore\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,0],[14,0,\"no-review\"],[12],[1,\"\\n        \"],[1,[28,[35,7],[\"review.none\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"reviewable-filters\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"reviewable-filter\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"filter-label\"],[12],[1,[28,[35,7],[\"review.filters.status\"],null]],[13],[1,\"\\n      \"],[8,[39,8],null,[[\"@value\",\"@content\",\"@onChange\"],[[30,0,[\"filterStatus\"]],[30,0,[\"statuses\"]],[28,[37,2],[[30,0],[28,[37,9],[[30,0,[\"filterStatus\"]]],null]],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"filtersExpanded\"]],[[[1,\"\\n      \"],[10,1],[12],[1,\"\\n        \"],[8,[39,10],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"above-review-filters\",\"div\",[28,[37,11],null,[[\"model\",\"additionalFilters\"],[[30,0,[\"model\"]],[30,0,[\"additionalFilters\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"reviewable-filter\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"filter-label\"],[12],[1,[28,[35,7],[\"review.filters.type.title\"],null]],[13],[1,\"\\n        \"],[8,[39,8],null,[[\"@value\",\"@content\",\"@onChange\",\"@options\"],[[30,0,[\"filterType\"]],[30,0,[\"allTypes\"]],[28,[37,2],[[30,0],[28,[37,9],[[30,0,[\"filterType\"]]],null]],null],[28,[37,11],null,[[\"none\"],[\"review.filters.type.all\"]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"reviewable-filter\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"filter-label\"],[12],[1,[28,[35,7],[\"review.filters.priority.title\"],null]],[13],[1,\"\\n        \"],[8,[39,8],null,[[\"@value\",\"@content\",\"@onChange\"],[[30,0,[\"filterPriority\"]],[30,0,[\"priorities\"]],[28,[37,2],[[30,0],[28,[37,9],[[30,0,[\"filterPriority\"]]],null]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"reviewable-filter\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"filter-label\"],[12],[1,[28,[35,7],[\"review.filters.category\"],null]],[13],[1,\"\\n        \"],[8,[39,12],null,[[\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"filterCategoryId\"]],[28,[37,2],[[30,0],[28,[37,9],[[30,0,[\"filterCategoryId\"]]],null]],null],[28,[37,11],null,[[\"none\"],[\"review.filters.all_categories\"]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"reviewable-filter topic-filter\"],[12],[1,\"\\n        \"],[1,[28,[35,7],[\"review.filtered_reviewed_by\"],null]],[1,\"\\n        \"],[8,[39,13],null,[[\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"filterReviewedBy\"]],[28,[37,2],[[30,0],\"updateFilterReviewedBy\"],null],[28,[37,11],null,[[\"maximum\",\"excludeCurrentUser\",\"fullWidthWrap\"],[1,false,true]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"reviewable-filter topic-filter\"],[12],[1,\"\\n        \"],[1,[28,[35,7],[\"review.filtered_user\"],null]],[1,\"\\n        \"],[8,[39,13],null,[[\"@value\",\"@onChange\",\"@class\",\"@options\"],[[30,0,[\"filterUsername\"]],[28,[37,2],[[30,0],\"updateFilterUsername\"],null],\"user-selector\",[28,[37,11],null,[[\"maximum\",\"excludeCurrentUser\",\"fullWidthWrap\"],[1,false,true]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"filterTopic\"]],[[[1,\"        \"],[10,0],[14,0,\"reviewable-filter topic-filter\"],[12],[1,\"\\n          \"],[1,[28,[35,7],[\"review.filtered_topic\"],null]],[1,\"\\n          \"],[8,[39,14],null,[[\"@class\",\"@label\",\"@icon\",\"@action\"],[\"btn-default\",\"review.show_all_topics\",\"times\",[28,[37,2],[[30,0],\"resetTopic\"],null]]],null],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[10,0],[14,0,\"reviewable-filter date-range\"],[12],[1,\"\\n        \"],[1,[28,[35,7],[\"review.date_filter\"],null]],[1,\"\\n        \"],[8,[39,15],null,[[\"@from\",\"@to\",\"@onChange\",\"@showFromTime\",\"@showToTime\"],[[30,0,[\"filterFromDate\"]],[30,0,[\"filterToDate\"]],[30,0,[\"setRange\"]],false,false]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"reviewable-filter sort-order\"],[12],[1,\"\\n        \"],[1,[28,[35,7],[\"review.order_by\"],null]],[1,\"\\n        \"],[8,[39,8],null,[[\"@value\",\"@content\",\"@onChange\"],[[30,0,[\"filterSortOrder\"]],[30,0,[\"sortOrders\"]],[28,[37,2],[[30,0],[28,[37,9],[[30,0,[\"filterSortOrder\"]]],null]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,0],[14,0,\"reviewable-filters-actions\"],[12],[1,\"\\n      \"],[8,[39,14],null,[[\"@icon\",\"@label\",\"@class\",\"@action\"],[\"sync\",\"review.filters.refresh\",\"btn-primary refresh\",[28,[37,2],[[30,0],\"refresh\"],null]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"site\",\"mobileView\"]],[[[1,\"        \"],[8,[39,14],null,[[\"@label\",\"@icon\",\"@class\",\"@action\"],[\"show_help\",[30,0,[\"toggleFiltersIcon\"]],\"btn-default expand-secondary-filters\",[28,[37,2],[[30,0],\"toggleFilters\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"r\"],false,[\"if\",\"load-more\",\"action\",\"each\",\"-track-array\",\"reviewable-item\",\"conditional-loading-spinner\",\"i18n\",\"combo-box\",\"mut\",\"plugin-outlet\",\"hash\",\"category-chooser\",\"email-group-user-chooser\",\"d-button\",\"date-time-input-range\"]]",
    "moduleName": "discourse/templates/review-index.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
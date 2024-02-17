define("discourse/templates/full-page-search", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="search" @class="search-container">
    <ScrollTracker
      @name="full-page-search"
      @tag={{this.searchTerm}}
      @class="hidden"
    />
  
    <div class="search-header" role="search">
      <h1 class="search-page-heading">
        {{#if this.hasResults}}
          <div class="result-count" id="search-result-count" aria-live="polite">
            {{html-safe this.resultCountLabel}}
          </div>
        {{else}}
          {{i18n "search.full_page_title"}}
        {{/if}}
      </h1>
      <div class="search-bar">
        <SearchTextField
          @value={{this.searchTerm}}
          @class="full-page-search search no-blur search-query"
          @aria-label={{i18n "search.search_term_label"}}
          @enter={{action "search" (hash collapseFilters=true)}}
          @hasAutofocus={{this.hasAutofocus}}
          @aria-controls="search-result-count"
        />
        <ComboBox
          @id="search-type"
          @value={{this.search_type}}
          @content={{this.searchTypes}}
          @onChange={{action (mut this.search_type)}}
          @options={{hash castInteger=true}}
        />
        <DButton
          @action={{action "search" (hash collapseFilters=true)}}
          @icon="search"
          @label="search.search_button"
          @class="btn-primary search-cta"
          @ariaLabel="search.search_button"
          @disabled={{this.searchButtonDisabled}}
        />
      </div>
      {{#if this.usingDefaultSearchType}}
        {{! context is only provided when searching from mobile view }}
        {{#if this.context}}
          <div class="search-context">
            <label>
              <Input
                @type="checkbox"
                name="searchContext"
                @checked={{this.searchContextEnabled}}
              />
              {{this.searchContextDescription}}
            </label>
          </div>
        {{/if}}
  
        <div class="search-filters">
          <SearchAdvancedOptions
            @searchTerm={{readonly this.searchTerm}}
            @onChangeSearchTerm={{action (mut this.searchTerm)}}
            @search={{action "search" (hash collapseFilters=true)}}
            @searchButtonDisabled={{this.searchButtonDisabled}}
            @expandFilters={{this.expandFilters}}
          />
        </div>
      {{/if}}
  
      <div class="search-notice">
        {{#if this.invalidSearch}}
          <div class="fps-invalid">
            {{i18n "search.too_short"}}
          </div>
        {{/if}}
      </div>
  
    </div>
  
    <div class="search-advanced">
      {{#if this.hasResults}}
        {{#if this.usingDefaultSearchType}}
          <div
            class={{this.searchInfoClassNames}}
            role="region"
            ariaLabel={{i18n "search.sort_or_bulk_actions"}}
          >
            {{#if this.canBulkSelect}}
              <DButton
                @icon="list"
                @class="btn-default bulk-select"
                @title="topics.bulk.toggle"
                @action={{action "toggleBulkSelect"}}
              />
              {{#if this.selected}}
                <DButton
                  @class="btn-default bulk-select-btn"
                  @selected={{this.selected}}
                  @action={{action "showBulkActions"}}
                  @icon="wrench"
                />
              {{/if}}
            {{/if}}
  
            {{#if this.bulkSelectEnabled}}
              {{#if this.hasUnselectedResults}}
                <DButton
                  @icon="check-square"
                  @class="btn-default"
                  @action={{action "selectAll"}}
                  @label="search.select_all"
                />
              {{/if}}
  
              {{#if this.hasSelection}}
                <DButton
                  @icon="far-square"
                  @class="btn-default"
                  @action={{action "clearAll"}}
                  @label="search.clear_all"
                />
              {{/if}}
            {{/if}}
  
            <div class="sort-by inline-form">
              <label>
                {{i18n "search.sort_by"}}
              </label>
              <ComboBox
                @value={{this.sortOrder}}
                @content={{this.sortOrders}}
                @onChange={{action (mut this.sortOrder)}}
                @id="search-sort-by"
                @options={{hash castInteger=true}}
              />
            </div>
          </div>
        {{/if}}
      {{/if}}
  
      <span>
        <PluginOutlet
          @name="full-page-search-below-search-info"
          @connectorTagName="div"
          @outletArgs={{hash search=this.searchTerm}}
        />
      </span>
  
      {{#if this.searching}}
        {{loading-spinner size="medium"}}
      {{else}}
        <div class="search-results" role="region">
          <LoadMore @selector=".fps-result" @action={{action "loadMore"}}>
            {{#if (or this.usingDefaultSearchType this.customSearchType)}}
              <SearchResultEntries
                @posts={{this.model.posts}}
                @bulkSelectEnabled={{this.bulkSelectEnabled}}
                @selected={{this.selected}}
                @highlightQuery={{this.highlightQuery}}
                @searchLogId={{this.model.grouped_search_result.search_log_id}}
              />
  
              <ConditionalLoadingSpinner @condition={{this.loading}}>
                {{#if this.error}}
                  <div class="warning">
                    {{this.error}}
                  </div>
                {{/if}}
  
                {{#unless this.hasResults}}
                  {{#if this.searchActive}}
                    <h3>{{i18n "search.no_results"}}</h3>
  
                    {{#if this.showSuggestion}}
                      <div class="no-results-suggestion">
                        {{i18n "search.cant_find"}}
                        {{#if this.canCreateTopic}}
                          <a
                            href
                            {{on "click" (fn this.createTopic this.searchTerm)}}
                          >{{i18n "search.start_new_topic"}}</a>
                          {{#unless this.siteSettings.login_required}}
                            {{i18n "search.or_search_google"}}
                          {{/unless}}
                        {{else}}
                          {{i18n "search.search_google"}}
                        {{/if}}
                      </div>
  
                      <GoogleSearch @searchTerm={{this.searchTerm}} />
                    {{/if}}
                  {{/if}}
                {{/unless}}
  
                {{#if this.hasResults}}
                  <h3 class="search-footer">
                    {{#if
                      this.model.grouped_search_result.more_full_page_results
                    }}
                      {{#if this.isLastPage}}
                        {{i18n "search.more_results"}}
                      {{/if}}
                    {{else}}
                      {{i18n "search.no_more_results"}}
                    {{/if}}
                  </h3>
                {{/if}}
              </ConditionalLoadingSpinner>
            {{else}}
              <ConditionalLoadingSpinner @condition={{this.loading}}>
                {{#if this.hasResults}}
                  {{#if this.model.categories.length}}
                    <h4 class="category-heading">
                      {{i18n "search.categories"}}
                    </h4>
                    <div class="category-items">
                      {{#each this.model.categories as |category|}}
                        {{category-link
                          category
                          extraClasses="fps-category-item"
                        }}
                      {{/each}}
                    </div>
                  {{/if}}
  
                  {{#if this.model.tags.length}}
                    <h4 class="tag-heading">
                      {{i18n "search.tags"}}
                    </h4>
  
                    <div class="tag-items">
                      {{#each this.model.tags as |tag|}}
                        <div class="fps-tag-item">
                          <a href={{tag.url}}>
                            {{tag.id}}
                          </a>
                        </div>
                      {{/each}}
                    </div>
                  {{/if}}
  
                  {{#if this.model.users}}
                    <div class="user-items">
                      {{#each this.model.users as |user|}}
                        <UserLink @user={{user}} @class="fps-user-item">
                          {{avatar user imageSize="large"}}
  
                          <div class="user-titles">
                            {{#if user.name}}
                              <span class="name">
                                {{user.name}}
                              </span>
                            {{/if}}
  
                            <span class="username">
                              {{user.username}}
                            </span>
                          </div>
                        </UserLink>
                      {{/each}}
                    </div>
                  {{/if}}
                {{else}}
                  {{#if this.searchActive}}
                    <h3>{{i18n "search.no_results"}}</h3>
                  {{/if}}
                {{/if}}
              </ConditionalLoadingSpinner>
            {{/if}}
          </LoadMore>
        </div>
      {{/if}}
    </div>
  </DSection>
  */
  {
    "id": "Glzmxin7",
    "block": "[[[8,[39,0],null,[[\"@pageClass\",\"@class\"],[\"search\",\"search-container\"]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@name\",\"@tag\",\"@class\"],[\"full-page-search\",[30,0,[\"searchTerm\"]],\"hidden\"]],null],[1,\"\\n\\n  \"],[10,0],[14,0,\"search-header\"],[14,\"role\",\"search\"],[12],[1,\"\\n    \"],[10,\"h1\"],[14,0,\"search-page-heading\"],[12],[1,\"\\n\"],[41,[30,0,[\"hasResults\"]],[[[1,\"        \"],[10,0],[14,0,\"result-count\"],[14,1,\"search-result-count\"],[14,\"aria-live\",\"polite\"],[12],[1,\"\\n          \"],[1,[28,[35,3],[[30,0,[\"resultCountLabel\"]]],null]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],[[[1,\"        \"],[1,[28,[35,4],[\"search.full_page_title\"],null]],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"search-bar\"],[12],[1,\"\\n      \"],[8,[39,5],null,[[\"@value\",\"@class\",\"@aria-label\",\"@enter\",\"@hasAutofocus\",\"@aria-controls\"],[[30,0,[\"searchTerm\"]],\"full-page-search search no-blur search-query\",[28,[37,4],[\"search.search_term_label\"],null],[28,[37,6],[[30,0],\"search\",[28,[37,7],null,[[\"collapseFilters\"],[true]]]],null],[30,0,[\"hasAutofocus\"]],\"search-result-count\"]],null],[1,\"\\n      \"],[8,[39,8],null,[[\"@id\",\"@value\",\"@content\",\"@onChange\",\"@options\"],[\"search-type\",[30,0,[\"search_type\"]],[30,0,[\"searchTypes\"]],[28,[37,6],[[30,0],[28,[37,9],[[30,0,[\"search_type\"]]],null]],null],[28,[37,7],null,[[\"castInteger\"],[true]]]]],null],[1,\"\\n      \"],[8,[39,10],null,[[\"@action\",\"@icon\",\"@label\",\"@class\",\"@ariaLabel\",\"@disabled\"],[[28,[37,6],[[30,0],\"search\",[28,[37,7],null,[[\"collapseFilters\"],[true]]]],null],\"search\",\"search.search_button\",\"btn-primary search-cta\",\"search.search_button\",[30,0,[\"searchButtonDisabled\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"],[41,[30,0,[\"usingDefaultSearchType\"]],[[[41,[30,0,[\"context\"]],[[[1,\"        \"],[10,0],[14,0,\"search-context\"],[12],[1,\"\\n          \"],[10,\"label\"],[12],[1,\"\\n            \"],[8,[39,11],[[24,3,\"searchContext\"]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"searchContextEnabled\"]]]],null],[1,\"\\n            \"],[1,[30,0,[\"searchContextDescription\"]]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[10,0],[14,0,\"search-filters\"],[12],[1,\"\\n        \"],[8,[39,12],null,[[\"@searchTerm\",\"@onChangeSearchTerm\",\"@search\",\"@searchButtonDisabled\",\"@expandFilters\"],[[28,[37,13],[[30,0,[\"searchTerm\"]]],null],[28,[37,6],[[30,0],[28,[37,9],[[30,0,[\"searchTerm\"]]],null]],null],[28,[37,6],[[30,0],\"search\",[28,[37,7],null,[[\"collapseFilters\"],[true]]]],null],[30,0,[\"searchButtonDisabled\"]],[30,0,[\"expandFilters\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,0],[14,0,\"search-notice\"],[12],[1,\"\\n\"],[41,[30,0,[\"invalidSearch\"]],[[[1,\"        \"],[10,0],[14,0,\"fps-invalid\"],[12],[1,\"\\n          \"],[1,[28,[35,4],[\"search.too_short\"],null]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"search-advanced\"],[12],[1,\"\\n\"],[41,[30,0,[\"hasResults\"]],[[[41,[30,0,[\"usingDefaultSearchType\"]],[[[1,\"        \"],[10,0],[15,0,[30,0,[\"searchInfoClassNames\"]]],[14,\"role\",\"region\"],[15,\"ariaLabel\",[28,[37,4],[\"search.sort_or_bulk_actions\"],null]],[12],[1,\"\\n\"],[41,[30,0,[\"canBulkSelect\"]],[[[1,\"            \"],[8,[39,10],null,[[\"@icon\",\"@class\",\"@title\",\"@action\"],[\"list\",\"btn-default bulk-select\",\"topics.bulk.toggle\",[28,[37,6],[[30,0],\"toggleBulkSelect\"],null]]],null],[1,\"\\n\"],[41,[30,0,[\"selected\"]],[[[1,\"              \"],[8,[39,10],null,[[\"@class\",\"@selected\",\"@action\",\"@icon\"],[\"btn-default bulk-select-btn\",[30,0,[\"selected\"]],[28,[37,6],[[30,0],\"showBulkActions\"],null],\"wrench\"]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n\"],[41,[30,0,[\"bulkSelectEnabled\"]],[[[41,[30,0,[\"hasUnselectedResults\"]],[[[1,\"              \"],[8,[39,10],null,[[\"@icon\",\"@class\",\"@action\",\"@label\"],[\"check-square\",\"btn-default\",[28,[37,6],[[30,0],\"selectAll\"],null],\"search.select_all\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"hasSelection\"]],[[[1,\"              \"],[8,[39,10],null,[[\"@icon\",\"@class\",\"@action\",\"@label\"],[\"far-square\",\"btn-default\",[28,[37,6],[[30,0],\"clearAll\"],null],\"search.clear_all\"]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n          \"],[10,0],[14,0,\"sort-by inline-form\"],[12],[1,\"\\n            \"],[10,\"label\"],[12],[1,\"\\n              \"],[1,[28,[35,4],[\"search.sort_by\"],null]],[1,\"\\n            \"],[13],[1,\"\\n            \"],[8,[39,8],null,[[\"@value\",\"@content\",\"@onChange\",\"@id\",\"@options\"],[[30,0,[\"sortOrder\"]],[30,0,[\"sortOrders\"]],[28,[37,6],[[30,0],[28,[37,9],[[30,0,[\"sortOrder\"]]],null]],null],\"search-sort-by\",[28,[37,7],null,[[\"castInteger\"],[true]]]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n    \"],[10,1],[12],[1,\"\\n      \"],[8,[39,14],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"full-page-search-below-search-info\",\"div\",[28,[37,7],null,[[\"search\"],[[30,0,[\"searchTerm\"]]]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"searching\"]],[[[1,\"      \"],[1,[28,[35,15],null,[[\"size\"],[\"medium\"]]]],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,0],[14,0,\"search-results\"],[14,\"role\",\"region\"],[12],[1,\"\\n        \"],[8,[39,16],null,[[\"@selector\",\"@action\"],[\".fps-result\",[28,[37,6],[[30,0],\"loadMore\"],null]]],[[\"default\"],[[[[1,\"\\n\"],[41,[28,[37,17],[[30,0,[\"usingDefaultSearchType\"]],[30,0,[\"customSearchType\"]]],null],[[[1,\"            \"],[8,[39,18],null,[[\"@posts\",\"@bulkSelectEnabled\",\"@selected\",\"@highlightQuery\",\"@searchLogId\"],[[30,0,[\"model\",\"posts\"]],[30,0,[\"bulkSelectEnabled\"]],[30,0,[\"selected\"]],[30,0,[\"highlightQuery\"]],[30,0,[\"model\",\"grouped_search_result\",\"search_log_id\"]]]],null],[1,\"\\n\\n            \"],[8,[39,19],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"error\"]],[[[1,\"                \"],[10,0],[14,0,\"warning\"],[12],[1,\"\\n                  \"],[1,[30,0,[\"error\"]]],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[51,[30,0,[\"hasResults\"]]],[[[41,[30,0,[\"searchActive\"]],[[[1,\"                  \"],[10,\"h3\"],[12],[1,[28,[35,4],[\"search.no_results\"],null]],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showSuggestion\"]],[[[1,\"                    \"],[10,0],[14,0,\"no-results-suggestion\"],[12],[1,\"\\n                      \"],[1,[28,[35,4],[\"search.cant_find\"],null]],[1,\"\\n\"],[41,[30,0,[\"canCreateTopic\"]],[[[1,\"                        \"],[11,3],[24,6,\"\"],[4,[38,21],[\"click\",[28,[37,22],[[30,0,[\"createTopic\"]],[30,0,[\"searchTerm\"]]],null]],null],[12],[1,[28,[35,4],[\"search.start_new_topic\"],null]],[13],[1,\"\\n\"],[41,[51,[30,0,[\"siteSettings\",\"login_required\"]]],[[[1,\"                          \"],[1,[28,[35,4],[\"search.or_search_google\"],null]],[1,\"\\n\"]],[]],null]],[]],[[[1,\"                        \"],[1,[28,[35,4],[\"search.search_google\"],null]],[1,\"\\n\"]],[]]],[1,\"                    \"],[13],[1,\"\\n\\n                    \"],[8,[39,23],null,[[\"@searchTerm\"],[[30,0,[\"searchTerm\"]]]],null],[1,\"\\n\"]],[]],null]],[]],null]],[]],null],[1,\"\\n\"],[41,[30,0,[\"hasResults\"]],[[[1,\"                \"],[10,\"h3\"],[14,0,\"search-footer\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"grouped_search_result\",\"more_full_page_results\"]],[[[41,[30,0,[\"isLastPage\"]],[[[1,\"                      \"],[1,[28,[35,4],[\"search.more_results\"],null]],[1,\"\\n\"]],[]],null]],[]],[[[1,\"                    \"],[1,[28,[35,4],[\"search.no_more_results\"],null]],[1,\"\\n\"]],[]]],[1,\"                \"],[13],[1,\"\\n\"]],[]],null],[1,\"            \"]],[]]]]],[1,\"\\n\"]],[]],[[[1,\"            \"],[8,[39,19],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"hasResults\"]],[[[41,[30,0,[\"model\",\"categories\",\"length\"]],[[[1,\"                  \"],[10,\"h4\"],[14,0,\"category-heading\"],[12],[1,\"\\n                    \"],[1,[28,[35,4],[\"search.categories\"],null]],[1,\"\\n                  \"],[13],[1,\"\\n                  \"],[10,0],[14,0,\"category-items\"],[12],[1,\"\\n\"],[42,[28,[37,25],[[28,[37,25],[[30,0,[\"model\",\"categories\"]]],null]],null],null,[[[1,\"                      \"],[1,[28,[35,26],[[30,1]],[[\"extraClasses\"],[\"fps-category-item\"]]]],[1,\"\\n\"]],[1]],null],[1,\"                  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"tags\",\"length\"]],[[[1,\"                  \"],[10,\"h4\"],[14,0,\"tag-heading\"],[12],[1,\"\\n                    \"],[1,[28,[35,4],[\"search.tags\"],null]],[1,\"\\n                  \"],[13],[1,\"\\n\\n                  \"],[10,0],[14,0,\"tag-items\"],[12],[1,\"\\n\"],[42,[28,[37,25],[[28,[37,25],[[30,0,[\"model\",\"tags\"]]],null]],null],null,[[[1,\"                      \"],[10,0],[14,0,\"fps-tag-item\"],[12],[1,\"\\n                        \"],[10,3],[15,6,[30,2,[\"url\"]]],[12],[1,\"\\n                          \"],[1,[30,2,[\"id\"]]],[1,\"\\n                        \"],[13],[1,\"\\n                      \"],[13],[1,\"\\n\"]],[2]],null],[1,\"                  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"model\",\"users\"]],[[[1,\"                  \"],[10,0],[14,0,\"user-items\"],[12],[1,\"\\n\"],[42,[28,[37,25],[[28,[37,25],[[30,0,[\"model\",\"users\"]]],null]],null],null,[[[1,\"                      \"],[8,[39,27],null,[[\"@user\",\"@class\"],[[30,3],\"fps-user-item\"]],[[\"default\"],[[[[1,\"\\n                        \"],[1,[28,[35,28],[[30,3]],[[\"imageSize\"],[\"large\"]]]],[1,\"\\n\\n                        \"],[10,0],[14,0,\"user-titles\"],[12],[1,\"\\n\"],[41,[30,3,[\"name\"]],[[[1,\"                            \"],[10,1],[14,0,\"name\"],[12],[1,\"\\n                              \"],[1,[30,3,[\"name\"]]],[1,\"\\n                            \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n                          \"],[10,1],[14,0,\"username\"],[12],[1,\"\\n                            \"],[1,[30,3,[\"username\"]]],[1,\"\\n                          \"],[13],[1,\"\\n                        \"],[13],[1,\"\\n                      \"]],[]]]]],[1,\"\\n\"]],[3]],null],[1,\"                  \"],[13],[1,\"\\n\"]],[]],null]],[]],[[[41,[30,0,[\"searchActive\"]],[[[1,\"                  \"],[10,\"h3\"],[12],[1,[28,[35,4],[\"search.no_results\"],null]],[13],[1,\"\\n\"]],[]],null]],[]]],[1,\"            \"]],[]]]]],[1,\"\\n\"]],[]]],[1,\"        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"]],[]]]]]],[\"category\",\"tag\",\"user\"],false,[\"d-section\",\"scroll-tracker\",\"if\",\"html-safe\",\"i18n\",\"search-text-field\",\"action\",\"hash\",\"combo-box\",\"mut\",\"d-button\",\"input\",\"search-advanced-options\",\"readonly\",\"plugin-outlet\",\"loading-spinner\",\"load-more\",\"or\",\"search-result-entries\",\"conditional-loading-spinner\",\"unless\",\"on\",\"fn\",\"google-search\",\"each\",\"-track-array\",\"category-link\",\"user-link\",\"avatar\"]]",
    "moduleName": "discourse/templates/full-page-search.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/components/search-advanced-options", ["exports", "@ember/component", "@ember/template-factory", "discourse/models/category", "I18n", "@ember/object", "discourse/lib/utilities"], function (_exports, _component, _templateFactory, _category, _I18n, _object, _utilities) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addAdvancedSearchOptions = addAdvancedSearchOptions;
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/models/category",0,"@ember/component",0,"I18n",0,"@ember/object",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <summary>
    {{i18n "search.advanced.title"}}
  </summary>
  <div class="search-advanced-filters">
    <div class="search-advanced-options">
      <PluginOutlet
        @name="advanced-search-options-above"
        @connectorTagName="div"
        @outletArgs={{hash
          searchedTerms=this.searchedTerms
          onChangeSearchedTermField=this.onChangeSearchedTermField
        }}
      />
  
      <div class="control-group advanced-search-category">
        <label class="control-label">{{i18n
            "search.advanced.in_category.label"
          }}</label>
        <div class="controls">
          <SearchAdvancedCategoryChooser
            @id="search-in-category"
            @value={{this.searchedTerms.category.id}}
            @onChange={{action "onChangeSearchTermForCategory"}}
          />
        </div>
      </div>
  
      {{#if this.siteSettings.tagging_enabled}}
        <div class="control-group advanced-search-tags">
          <label class="control-label">{{i18n
              "search.advanced.with_tags.label"
            }}</label>
          <div class="controls">
            <TagChooser
              @id="search-with-tags"
              @tags={{this.searchedTerms.tags}}
              @everyTag={{true}}
              @unlimitedTagCount={{true}}
              @onChange={{action "onChangeSearchTermForTags"}}
              @options={{hash
                allowAny=false
                headerAriaLabel=(i18n "search.advanced.with_tags.aria_label")
              }}
            />
            {{#if this.showAllTagsCheckbox}}
              <section class="field">
                <label>
                  <Input
                    @type="checkbox"
                    class="all-tags"
                    @checked={{this.searchedTerms.special.all_tags}}
                    {{on
                      "click"
                      (action
                        "onChangeSearchTermForAllTags" value="target.checked"
                      )
                    }}
                  />
                  {{i18n "search.advanced.filters.all_tags"}}
                </label>
              </section>
            {{/if}}
          </div>
        </div>
      {{/if}}
  
      <div class="control-group advanced-search-topics-posts">
        <div class="controls">
          <fieldset class="grouped-control">
            <legend class="grouped-control-label">{{i18n
                "search.advanced.filters.label"
              }}</legend>
  
            {{#if this.currentUser}}
              <div class="grouped-control-field">
                <Input
                  id="matching-title-only"
                  @type="checkbox"
                  class="in-title"
                  @checked={{this.searchedTerms.special.in.title}}
                  {{on
                    "click"
                    (action
                      "onChangeSearchTermForSpecialInTitle" value="target.checked"
                    )
                  }}
                />
                <label for="matching-title-only">
                  {{i18n "search.advanced.filters.title"}}
                </label>
              </div>
  
              <div class="grouped-control-field">
                <Input
                  id="matching-liked"
                  @type="checkbox"
                  class="in-likes"
                  @checked={{this.searchedTerms.special.in.likes}}
                  {{on
                    "click"
                    (action
                      "onChangeSearchTermForSpecialInLikes" value="target.checked"
                    )
                  }}
                />
                <label for="matching-liked">{{i18n
                    "search.advanced.filters.likes"
                  }}</label>
              </div>
  
              <div class="grouped-control-field">
                <Input
                  id="matching-in-messages"
                  @type="checkbox"
                  class="in-private"
                  @checked={{this.searchedTerms.special.in.messages}}
                  {{on
                    "click"
                    (action
                      "onChangeSearchTermForSpecialInMessages"
                      value="target.checked"
                    )
                  }}
                />
                <label for="matching-in-messages">{{i18n
                    "search.advanced.filters.private"
                  }}</label>
              </div>
  
              <div class="grouped-control-field">
                <Input
                  id="matching-seen"
                  @type="checkbox"
                  class="in-seen"
                  @checked={{this.searchedTerms.special.in.seen}}
                  {{on
                    "click"
                    (action
                      "onChangeSearchTermForSpecialInSeen" value="target.checked"
                    )
                  }}
                />
                <label for="matching-seen">{{i18n
                    "search.advanced.filters.seen"
                  }}</label>
              </div>
            {{/if}}
  
            <ComboBox
              @id="in"
              @valueProperty="value"
              @content={{this.inOptions}}
              @value={{this.searchedTerms.in}}
              @onChange={{action "onChangeSearchTermForIn"}}
              @options={{hash none="user.locale.any" clearable=true}}
            />
          </fieldset>
        </div>
      </div>
  
      <div class="control-group advanced-search-topic-status">
        <label class="control-label">{{i18n
            "search.advanced.statuses.label"
          }}</label>
        <div class="controls">
          <ComboBox
            @id="search-status-options"
            @valueProperty="value"
            @content={{this.statusOptions}}
            @value={{this.searchedTerms.status}}
            @onChange={{action "onChangeSearchTermForStatus"}}
            @options={{hash
              none="user.locale.any"
              headerAriaLabel=(i18n "search.advanced.statuses.label")
              clearable=true
            }}
          />
        </div>
      </div>
  
      <div class="control-group advanced-search-posted-by">
        <label class="control-label">
          {{i18n "search.advanced.posted_by.label"}}
        </label>
        <div class="controls">
          <UserChooser
            @id="search-posted-by"
            @value={{this.searchedTerms.username}}
            @onChange={{action "onChangeSearchTermForUsername"}}
            @options={{hash
              headerAriaLabel=(i18n "search.advanced.posted_by.aria_label")
              maximum=1
              excludeCurrentUser=false
            }}
          />
        </div>
      </div>
  
      <div class="control-group advanced-search-posted-date">
        <label class="control-label">{{i18n
            "search.advanced.post.time.label"
          }}</label>
        <div class="controls inline-form full-width">
          <ComboBox
            @id="postTime"
            @valueProperty="value"
            @content={{this.postTimeOptions}}
            @value={{this.searchedTerms.time.when}}
            @onChange={{action "onChangeWhenTime"}}
            @options={{hash
              headerAriaLabel=(i18n "search.advanced.post.time.aria_label")
            }}
          />
          <DateInput
            @date={{this.searchedTerms.time.days}}
            @onChange={{action "onChangeWhenDate"}}
            @inputId="search-post-date"
          />
        </div>
      </div>
  
      <PluginOutlet
        @name="advanced-search-options-below"
        @connectorTagName="div"
        @outletArgs={{hash
          searchedTerms=this.searchedTerms
          onChangeSearchedTermField=this.onChangeSearchedTermField
        }}
      />
    </div>
  
    <details class="search-advanced-additional-options">
      <summary>
        {{i18n "search.advanced.additional_options.label"}}
      </summary>
      <div class="count-group control-group">
        {{! TODO: Using a label here fails no-nested-interactive lint rule }}
        <span class="control-label">{{i18n
            "search.advanced.post.count.label"
          }}</span>
        <div class="controls">
          <Input
            @type="number"
            @value={{readonly this.searchedTerms.min_posts}}
            class="input-small"
            id="search-min-post-count"
            placeholder={{i18n "search.advanced.post.min.placeholder"}}
            aria-label={{i18n "search.advanced.post.min.aria_label"}}
            {{on
              "input"
              (action "onChangeSearchTermMinPostCount" value="target.value")
            }}
          />
          {{d-icon "arrows-alt-h"}}
          <Input
            @type="number"
            @value={{readonly this.searchedTerms.max_posts}}
            class="input-small"
            id="search-max-post-count"
            placeholder={{i18n "search.advanced.post.max.placeholder"}}
            aria-label={{i18n "search.advanced.post.max.aria_label"}}
            {{on
              "input"
              (action "onChangeSearchTermMaxPostCount" value="target.value")
            }}
          />
        </div>
      </div>
  
      <div class="count-group control-group">
        {{! TODO: Using a label here fails no-nested-interactive lint rule }}
        <span class="control-label">{{i18n "search.advanced.views.label"}}</span>
        <div class="controls">
          <Input
            @type="number"
            @value={{readonly this.searchedTerms.min_views}}
            class="input-small"
            id="search-min-views"
            placeholder={{i18n "search.advanced.min_views.placeholder"}}
            aria-label={{i18n "search.advanced.min_views.aria_label"}}
            {{on
              "input"
              (action "onChangeSearchTermMinViews" value="target.value")
            }}
          />
          {{d-icon "arrows-alt-h"}}
          <Input
            @type="number"
            @value={{readonly this.searchedTerms.max_views}}
            class="input-small"
            id="search-max-views"
            placeholder={{i18n "search.advanced.max_views.placeholder"}}
            aria-label={{i18n "search.advanced.max_views.aria_label"}}
            {{on
              "input"
              (action "onChangeSearchTermMaxViews" value="target.value")
            }}
          />
        </div>
      </div>
    </details>
  
    {{#if this.site.mobileView}}
      <div class="second-search-button">
        <DButton
          @action={{this.search}}
          @icon="search"
          @label="search.search_button"
          @class="btn-primary search-cta"
          @ariaLabel="search.search_button"
          @disabled={{this.searchButtonDisabled}}
        />
      </div>
    {{/if}}
  </div>
  */
  {
    "id": "SssKo/Px",
    "block": "[[[10,\"summary\"],[12],[1,\"\\n  \"],[1,[28,[35,0],[\"search.advanced.title\"],null]],[1,\"\\n\"],[13],[1,\"\\n\"],[10,0],[14,0,\"search-advanced-filters\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"search-advanced-options\"],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"advanced-search-options-above\",\"div\",[28,[37,2],null,[[\"searchedTerms\",\"onChangeSearchedTermField\"],[[30,0,[\"searchedTerms\"]],[30,0,[\"onChangeSearchedTermField\"]]]]]]],null],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-group advanced-search-category\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"search.advanced.in_category.label\"],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,3],null,[[\"@id\",\"@value\",\"@onChange\"],[\"search-in-category\",[30,0,[\"searchedTerms\",\"category\",\"id\"]],[28,[37,4],[[30,0],\"onChangeSearchTermForCategory\"],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"siteSettings\",\"tagging_enabled\"]],[[[1,\"      \"],[10,0],[14,0,\"control-group advanced-search-tags\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"search.advanced.with_tags.label\"],null]],[13],[1,\"\\n        \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n          \"],[8,[39,6],null,[[\"@id\",\"@tags\",\"@everyTag\",\"@unlimitedTagCount\",\"@onChange\",\"@options\"],[\"search-with-tags\",[30,0,[\"searchedTerms\",\"tags\"]],true,true,[28,[37,4],[[30,0],\"onChangeSearchTermForTags\"],null],[28,[37,2],null,[[\"allowAny\",\"headerAriaLabel\"],[false,[28,[37,0],[\"search.advanced.with_tags.aria_label\"],null]]]]]],null],[1,\"\\n\"],[41,[30,0,[\"showAllTagsCheckbox\"]],[[[1,\"            \"],[10,\"section\"],[14,0,\"field\"],[12],[1,\"\\n              \"],[10,\"label\"],[12],[1,\"\\n                \"],[8,[39,7],[[24,0,\"all-tags\"],[4,[38,8],[\"click\",[28,[37,4],[[30,0],\"onChangeSearchTermForAllTags\"],[[\"value\"],[\"target.checked\"]]]],null]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"searchedTerms\",\"special\",\"all_tags\"]]]],null],[1,\"\\n                \"],[1,[28,[35,0],[\"search.advanced.filters.all_tags\"],null]],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,0],[14,0,\"control-group advanced-search-topics-posts\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[10,\"fieldset\"],[14,0,\"grouped-control\"],[12],[1,\"\\n          \"],[10,\"legend\"],[14,0,\"grouped-control-label\"],[12],[1,[28,[35,0],[\"search.advanced.filters.label\"],null]],[13],[1,\"\\n\\n\"],[41,[30,0,[\"currentUser\"]],[[[1,\"            \"],[10,0],[14,0,\"grouped-control-field\"],[12],[1,\"\\n              \"],[8,[39,7],[[24,1,\"matching-title-only\"],[24,0,\"in-title\"],[4,[38,8],[\"click\",[28,[37,4],[[30,0],\"onChangeSearchTermForSpecialInTitle\"],[[\"value\"],[\"target.checked\"]]]],null]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"searchedTerms\",\"special\",\"in\",\"title\"]]]],null],[1,\"\\n              \"],[10,\"label\"],[14,\"for\",\"matching-title-only\"],[12],[1,\"\\n                \"],[1,[28,[35,0],[\"search.advanced.filters.title\"],null]],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\\n            \"],[10,0],[14,0,\"grouped-control-field\"],[12],[1,\"\\n              \"],[8,[39,7],[[24,1,\"matching-liked\"],[24,0,\"in-likes\"],[4,[38,8],[\"click\",[28,[37,4],[[30,0],\"onChangeSearchTermForSpecialInLikes\"],[[\"value\"],[\"target.checked\"]]]],null]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"searchedTerms\",\"special\",\"in\",\"likes\"]]]],null],[1,\"\\n              \"],[10,\"label\"],[14,\"for\",\"matching-liked\"],[12],[1,[28,[35,0],[\"search.advanced.filters.likes\"],null]],[13],[1,\"\\n            \"],[13],[1,\"\\n\\n            \"],[10,0],[14,0,\"grouped-control-field\"],[12],[1,\"\\n              \"],[8,[39,7],[[24,1,\"matching-in-messages\"],[24,0,\"in-private\"],[4,[38,8],[\"click\",[28,[37,4],[[30,0],\"onChangeSearchTermForSpecialInMessages\"],[[\"value\"],[\"target.checked\"]]]],null]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"searchedTerms\",\"special\",\"in\",\"messages\"]]]],null],[1,\"\\n              \"],[10,\"label\"],[14,\"for\",\"matching-in-messages\"],[12],[1,[28,[35,0],[\"search.advanced.filters.private\"],null]],[13],[1,\"\\n            \"],[13],[1,\"\\n\\n            \"],[10,0],[14,0,\"grouped-control-field\"],[12],[1,\"\\n              \"],[8,[39,7],[[24,1,\"matching-seen\"],[24,0,\"in-seen\"],[4,[38,8],[\"click\",[28,[37,4],[[30,0],\"onChangeSearchTermForSpecialInSeen\"],[[\"value\"],[\"target.checked\"]]]],null]],[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"searchedTerms\",\"special\",\"in\",\"seen\"]]]],null],[1,\"\\n              \"],[10,\"label\"],[14,\"for\",\"matching-seen\"],[12],[1,[28,[35,0],[\"search.advanced.filters.seen\"],null]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n          \"],[8,[39,9],null,[[\"@id\",\"@valueProperty\",\"@content\",\"@value\",\"@onChange\",\"@options\"],[\"in\",\"value\",[30,0,[\"inOptions\"]],[30,0,[\"searchedTerms\",\"in\"]],[28,[37,4],[[30,0],\"onChangeSearchTermForIn\"],null],[28,[37,2],null,[[\"none\",\"clearable\"],[\"user.locale.any\",true]]]]],null],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-group advanced-search-topic-status\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"search.advanced.statuses.label\"],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,9],null,[[\"@id\",\"@valueProperty\",\"@content\",\"@value\",\"@onChange\",\"@options\"],[\"search-status-options\",\"value\",[30,0,[\"statusOptions\"]],[30,0,[\"searchedTerms\",\"status\"]],[28,[37,4],[[30,0],\"onChangeSearchTermForStatus\"],null],[28,[37,2],null,[[\"none\",\"headerAriaLabel\",\"clearable\"],[\"user.locale.any\",[28,[37,0],[\"search.advanced.statuses.label\"],null],true]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-group advanced-search-posted-by\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,\"\\n        \"],[1,[28,[35,0],[\"search.advanced.posted_by.label\"],null]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,10],null,[[\"@id\",\"@value\",\"@onChange\",\"@options\"],[\"search-posted-by\",[30,0,[\"searchedTerms\",\"username\"]],[28,[37,4],[[30,0],\"onChangeSearchTermForUsername\"],null],[28,[37,2],null,[[\"headerAriaLabel\",\"maximum\",\"excludeCurrentUser\"],[[28,[37,0],[\"search.advanced.posted_by.aria_label\"],null],1,false]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"control-group advanced-search-posted-date\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"search.advanced.post.time.label\"],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"controls inline-form full-width\"],[12],[1,\"\\n        \"],[8,[39,9],null,[[\"@id\",\"@valueProperty\",\"@content\",\"@value\",\"@onChange\",\"@options\"],[\"postTime\",\"value\",[30,0,[\"postTimeOptions\"]],[30,0,[\"searchedTerms\",\"time\",\"when\"]],[28,[37,4],[[30,0],\"onChangeWhenTime\"],null],[28,[37,2],null,[[\"headerAriaLabel\"],[[28,[37,0],[\"search.advanced.post.time.aria_label\"],null]]]]]],null],[1,\"\\n        \"],[8,[39,11],null,[[\"@date\",\"@onChange\",\"@inputId\"],[[30,0,[\"searchedTerms\",\"time\",\"days\"]],[28,[37,4],[[30,0],\"onChangeWhenDate\"],null],\"search-post-date\"]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"advanced-search-options-below\",\"div\",[28,[37,2],null,[[\"searchedTerms\",\"onChangeSearchedTermField\"],[[30,0,[\"searchedTerms\"]],[30,0,[\"onChangeSearchedTermField\"]]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"details\"],[14,0,\"search-advanced-additional-options\"],[12],[1,\"\\n    \"],[10,\"summary\"],[12],[1,\"\\n      \"],[1,[28,[35,0],[\"search.advanced.additional_options.label\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"count-group control-group\"],[12],[1,\"\\n\"],[1,\"      \"],[10,1],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"search.advanced.post.count.label\"],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,7],[[24,0,\"input-small\"],[24,1,\"search-min-post-count\"],[16,\"placeholder\",[28,[37,0],[\"search.advanced.post.min.placeholder\"],null]],[16,\"aria-label\",[28,[37,0],[\"search.advanced.post.min.aria_label\"],null]],[4,[38,8],[\"input\",[28,[37,4],[[30,0],\"onChangeSearchTermMinPostCount\"],[[\"value\"],[\"target.value\"]]]],null]],[[\"@type\",\"@value\"],[\"number\",[28,[37,12],[[30,0,[\"searchedTerms\",\"min_posts\"]]],null]]],null],[1,\"\\n        \"],[1,[28,[35,13],[\"arrows-alt-h\"],null]],[1,\"\\n        \"],[8,[39,7],[[24,0,\"input-small\"],[24,1,\"search-max-post-count\"],[16,\"placeholder\",[28,[37,0],[\"search.advanced.post.max.placeholder\"],null]],[16,\"aria-label\",[28,[37,0],[\"search.advanced.post.max.aria_label\"],null]],[4,[38,8],[\"input\",[28,[37,4],[[30,0],\"onChangeSearchTermMaxPostCount\"],[[\"value\"],[\"target.value\"]]]],null]],[[\"@type\",\"@value\"],[\"number\",[28,[37,12],[[30,0,[\"searchedTerms\",\"max_posts\"]]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"count-group control-group\"],[12],[1,\"\\n\"],[1,\"      \"],[10,1],[14,0,\"control-label\"],[12],[1,[28,[35,0],[\"search.advanced.views.label\"],null]],[13],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[8,[39,7],[[24,0,\"input-small\"],[24,1,\"search-min-views\"],[16,\"placeholder\",[28,[37,0],[\"search.advanced.min_views.placeholder\"],null]],[16,\"aria-label\",[28,[37,0],[\"search.advanced.min_views.aria_label\"],null]],[4,[38,8],[\"input\",[28,[37,4],[[30,0],\"onChangeSearchTermMinViews\"],[[\"value\"],[\"target.value\"]]]],null]],[[\"@type\",\"@value\"],[\"number\",[28,[37,12],[[30,0,[\"searchedTerms\",\"min_views\"]]],null]]],null],[1,\"\\n        \"],[1,[28,[35,13],[\"arrows-alt-h\"],null]],[1,\"\\n        \"],[8,[39,7],[[24,0,\"input-small\"],[24,1,\"search-max-views\"],[16,\"placeholder\",[28,[37,0],[\"search.advanced.max_views.placeholder\"],null]],[16,\"aria-label\",[28,[37,0],[\"search.advanced.max_views.aria_label\"],null]],[4,[38,8],[\"input\",[28,[37,4],[[30,0],\"onChangeSearchTermMaxViews\"],[[\"value\"],[\"target.value\"]]]],null]],[[\"@type\",\"@value\"],[\"number\",[28,[37,12],[[30,0,[\"searchedTerms\",\"max_views\"]]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"site\",\"mobileView\"]],[[[1,\"    \"],[10,0],[14,0,\"second-search-button\"],[12],[1,\"\\n      \"],[8,[39,14],null,[[\"@action\",\"@icon\",\"@label\",\"@class\",\"@ariaLabel\",\"@disabled\"],[[30,0,[\"search\"]],\"search\",\"search.search_button\",\"btn-primary search-cta\",\"search.search_button\",[30,0,[\"searchButtonDisabled\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[],false,[\"i18n\",\"plugin-outlet\",\"hash\",\"search-advanced-category-chooser\",\"action\",\"if\",\"tag-chooser\",\"input\",\"on\",\"combo-box\",\"user-chooser\",\"date-input\",\"readonly\",\"d-icon\",\"d-button\"]]",
    "moduleName": "discourse/components/search-advanced-options.hbs",
    "isStrictMode": false
  });
  const REGEXP_BLOCKS = /(([^" \t\n\x0B\f\r]+)?(("[^"]+")?))/g;
  const REGEXP_USERNAME_PREFIX = /^(user:|@)/gi;
  const REGEXP_CATEGORY_PREFIX = /^(category:|#)/gi;
  const REGEXP_TAGS_PREFIX = /^(tags?:|#(?=[a-z0-9\-]+::tag))/gi;
  const REGEXP_IN_PREFIX = /^(in|with):/gi;
  const REGEXP_STATUS_PREFIX = /^status:/gi;
  const REGEXP_MIN_POSTS_PREFIX = /^min_posts:/gi;
  const REGEXP_MAX_POSTS_PREFIX = /^max_posts:/gi;
  const REGEXP_MIN_VIEWS_PREFIX = /^min_views:/gi;
  const REGEXP_MAX_VIEWS_PREFIX = /^max_views:/gi;
  const REGEXP_POST_TIME_PREFIX = /^(before|after):/gi;
  const REGEXP_TAGS_REPLACE = /(^(tags?:|#(?=[a-z0-9\-]+::tag))|::tag\s?$)/gi;
  const REGEXP_SPECIAL_IN_LIKES_MATCH = /^in:likes$/gi;
  const REGEXP_SPECIAL_IN_TITLE_MATCH = /^in:title$/gi;
  const REGEXP_SPECIAL_IN_MESSAGES_MATCH = /^in:(personal|messages)$/gi;
  const REGEXP_SPECIAL_IN_SEEN_MATCH = /^in:seen$/gi;
  const REGEXP_CATEGORY_SLUG = /^(\#[a-zA-Z0-9\-:]+)/gi;
  const REGEXP_CATEGORY_ID = /^(category:[0-9]+)/gi;
  const REGEXP_POST_TIME_WHEN = /^(before|after)/gi;
  const IN_OPTIONS_MAPPING = {
    images: "with"
  };
  let _extraOptions = [];
  function inOptionsForUsers() {
    return [{
      name: _I18n.default.t("search.advanced.filters.unseen"),
      value: "unseen"
    }, {
      name: _I18n.default.t("search.advanced.filters.posted"),
      value: "posted"
    }, {
      name: _I18n.default.t("search.advanced.filters.created"),
      value: "created"
    }, {
      name: _I18n.default.t("search.advanced.filters.watching"),
      value: "watching"
    }, {
      name: _I18n.default.t("search.advanced.filters.tracking"),
      value: "tracking"
    }, {
      name: _I18n.default.t("search.advanced.filters.bookmarks"),
      value: "bookmarks"
    }].concat(..._extraOptions.map(eo => eo.inOptionsForUsers).filter(Boolean));
  }
  function inOptionsForAll() {
    return [{
      name: _I18n.default.t("search.advanced.filters.first"),
      value: "first"
    }, {
      name: _I18n.default.t("search.advanced.filters.pinned"),
      value: "pinned"
    }, {
      name: _I18n.default.t("search.advanced.filters.wiki"),
      value: "wiki"
    }, {
      name: _I18n.default.t("search.advanced.filters.images"),
      value: "images"
    }].concat(..._extraOptions.map(eo => eo.inOptionsForAll).filter(Boolean));
  }
  function statusOptions() {
    return [{
      name: _I18n.default.t("search.advanced.statuses.open"),
      value: "open"
    }, {
      name: _I18n.default.t("search.advanced.statuses.closed"),
      value: "closed"
    }, {
      name: _I18n.default.t("search.advanced.statuses.public"),
      value: "public"
    }, {
      name: _I18n.default.t("search.advanced.statuses.archived"),
      value: "archived"
    }, {
      name: _I18n.default.t("search.advanced.statuses.noreplies"),
      value: "noreplies"
    }, {
      name: _I18n.default.t("search.advanced.statuses.single_user"),
      value: "single_user"
    }].concat(..._extraOptions.map(eo => eo.statusOptions).filter(Boolean));
  }
  function postTimeOptions() {
    return [{
      name: _I18n.default.t("search.advanced.post.time.before"),
      value: "before"
    }, {
      name: _I18n.default.t("search.advanced.post.time.after"),
      value: "after"
    }].concat(..._extraOptions.map(eo => eo.postTimeOptions).filter(Boolean));
  }
  function addAdvancedSearchOptions(options) {
    _extraOptions.push(options);
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    tagName: "details",
    attributeBindings: ["expandFilters:open"],
    classNames: ["advanced-filters"],
    category: null,
    init() {
      this._super(...arguments);
      this.setProperties({
        searchedTerms: {
          username: null,
          category: null,
          tags: null,
          in: null,
          special: {
            in: {
              title: false,
              likes: false,
              messages: false,
              seen: false
            },
            all_tags: false
          },
          status: null,
          min_posts: null,
          max_posts: null,
          min_views: null,
          max_views: null,
          time: {
            when: "before",
            days: null
          }
        },
        inOptions: this.currentUser ? inOptionsForUsers().concat(inOptionsForAll()) : inOptionsForAll(),
        statusOptions: statusOptions(),
        postTimeOptions: postTimeOptions(),
        showAllTagsCheckbox: false
      });
    },
    didReceiveAttrs() {
      this._super(...arguments);
      this.setSearchedTermValue("searchedTerms.username", REGEXP_USERNAME_PREFIX);
      this.setSearchedTermValueForCategory();
      this.setSearchedTermValueForTags();
      let regExpInMatch = this.inOptions.map(option => option.value).join("|");
      const REGEXP_IN_MATCH = new RegExp(`(in|with):(${regExpInMatch})`, "i");
      this.setSearchedTermValue("searchedTerms.in", REGEXP_IN_PREFIX, REGEXP_IN_MATCH);
      this.setSearchedTermSpecialInValue("searchedTerms.special.in.likes", REGEXP_SPECIAL_IN_LIKES_MATCH);
      this.setSearchedTermSpecialInValue("searchedTerms.special.in.title", REGEXP_SPECIAL_IN_TITLE_MATCH);
      this.setSearchedTermSpecialInValue("searchedTerms.special.in.messages", REGEXP_SPECIAL_IN_MESSAGES_MATCH);
      this.setSearchedTermSpecialInValue("searchedTerms.special.in.seen", REGEXP_SPECIAL_IN_SEEN_MATCH);
      let regExpStatusMatch = this.statusOptions.map(status => status.value).join("|");
      const REGEXP_STATUS_MATCH = new RegExp(`status:(${regExpStatusMatch})`, "i");
      this.setSearchedTermValue("searchedTerms.status", REGEXP_STATUS_PREFIX, REGEXP_STATUS_MATCH);
      this.setSearchedTermValueForPostTime();
      this.setSearchedTermValue("searchedTerms.min_posts", REGEXP_MIN_POSTS_PREFIX);
      this.setSearchedTermValue("searchedTerms.max_posts", REGEXP_MAX_POSTS_PREFIX);
      this.setSearchedTermValue("searchedTerms.min_views", REGEXP_MIN_VIEWS_PREFIX);
      this.setSearchedTermValue("searchedTerms.max_views", REGEXP_MAX_VIEWS_PREFIX);
    },
    findSearchTerms() {
      const searchTerm = (0, _utilities.escapeExpression)(this.searchTerm);
      if (!searchTerm) {
        return [];
      }
      const blocks = searchTerm.match(REGEXP_BLOCKS);
      if (!blocks) {
        return [];
      }
      let result = [];
      blocks.forEach(block => {
        if (block.length !== 0) {
          result.push(block);
        }
      });
      return result;
    },
    filterBlocks(regexPrefix) {
      const blocks = this.findSearchTerms();
      if (!blocks) {
        return [];
      }
      let result = [];
      blocks.forEach(block => {
        if (block.search(regexPrefix) !== -1) {
          result.push(block);
        }
      });
      return result;
    },
    setSearchedTermValue(key, replaceRegEx) {
      let matchRegEx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      matchRegEx = matchRegEx || replaceRegEx;
      const match = this.filterBlocks(matchRegEx);
      let val = this.get(key);
      if (match.length !== 0) {
        const userInput = match[0].replace(replaceRegEx, "").toLowerCase();
        if (val !== userInput && userInput.length) {
          this.set(key, userInput);
        }
      } else if (val && val.length !== 0) {
        this.set(key, null);
      }
    },
    setSearchedTermSpecialInValue(key, replaceRegEx) {
      const match = this.filterBlocks(replaceRegEx);
      if (match.length !== 0) {
        if (this.get(key) !== true) {
          this.set(key, true);
        }
      } else if (this.get(key) !== false) {
        this.set(key, false);
      }
    },
    setSearchedTermValueForCategory() {
      const match = this.filterBlocks(REGEXP_CATEGORY_PREFIX);
      if (match.length !== 0) {
        const existingInput = this.get("searchedTerms.category");
        const subcategories = match[0].replace(REGEXP_CATEGORY_PREFIX, "").split(":");
        let userInput;
        if (subcategories.length > 1) {
          userInput = _category.default.list().find(category => category.get("parentCategory.slug") === subcategories[0] && category.slug === subcategories[1]);
        } else {
          userInput = _category.default.list().find(category => !category.parentCategory && category.slug === subcategories[0]);
          if (!userInput) {
            userInput = _category.default.list().find(category => category.slug === subcategories[0]);
          }
        }
        if (!existingInput && userInput || existingInput && userInput && existingInput.id !== userInput.id) {
          this.set("searchedTerms.category", userInput);
        }
      } else {
        this.set("searchedTerms.category", null);
      }
    },
    setSearchedTermValueForTags() {
      if (!this.siteSettings.tagging_enabled) {
        return;
      }
      const match = this.filterBlocks(REGEXP_TAGS_PREFIX);
      const tags = this.get("searchedTerms.tags");
      if (match.length) {
        this.set("searchedTerms.special.all_tags", match[0].includes("+"));
      }
      const containAllTags = this.get("searchedTerms.special.all_tags");
      if (match.length !== 0) {
        const joinChar = containAllTags ? "+" : ",";
        const existingInput = Array.isArray(tags) ? tags.join(joinChar) : tags;
        const userInput = match[0].replace(REGEXP_TAGS_REPLACE, "");
        if (existingInput !== userInput) {
          const updatedTags = userInput?.split(joinChar);
          this.set("searchedTerms.tags", updatedTags);
          this.set("showAllTagsCheckbox", !!(updatedTags.length > 1));
        }
      } else if (!tags) {
        this.set("searchedTerms.tags", null);
      }
    },
    setSearchedTermValueForPostTime() {
      const match = this.filterBlocks(REGEXP_POST_TIME_PREFIX);
      if (match.length !== 0) {
        const existingInputWhen = this.get("searchedTerms.time.when");
        const userInputWhen = match[0].match(REGEXP_POST_TIME_WHEN)[0].toLowerCase();
        const existingInputDays = this.get("searchedTerms.time.days");
        const userInputDays = match[0].replace(REGEXP_POST_TIME_PREFIX, "");
        const properties = {};
        if (existingInputWhen !== userInputWhen) {
          properties["searchedTerms.time.when"] = userInputWhen;
        }
        if (existingInputDays !== userInputDays) {
          properties["searchedTerms.time.days"] = userInputDays;
        }
        this.setProperties(properties);
      } else {
        this.set("searchedTerms.time.when", "before");
        this.set("searchedTerms.time.days", null);
      }
    },
    updateInRegex(regex, filter) {
      const match = this.filterBlocks(regex);
      const inFilter = this.get("searchedTerms.special.in." + filter);
      let searchTerm = this.searchTerm || "";
      if (inFilter) {
        if (match.length === 0) {
          searchTerm += ` in:${filter}`;
          this._updateSearchTerm(searchTerm);
        }
      } else if (match.length !== 0) {
        searchTerm = searchTerm.replace(match, "");
        this._updateSearchTerm(searchTerm);
      }
    },
    onChangeSearchTermMinPostCount(value) {
      this.set("searchedTerms.min_posts", value.length ? value : null);
      this._updateSearchTermForMinPostCount();
    },
    onChangeSearchTermMaxPostCount(value) {
      this.set("searchedTerms.max_posts", value.length ? value : null);
      this._updateSearchTermForMaxPostCount();
    },
    onChangeSearchTermMinViews(value) {
      this.set("searchedTerms.min_views", value.length ? value : null);
      this._updateSearchTermForMinViews();
    },
    onChangeSearchTermMaxViews(value) {
      this.set("searchedTerms.max_views", value.length ? value : null);
      this._updateSearchTermForMaxViews();
    },
    onChangeSearchTermForIn(value) {
      this.set("searchedTerms.in", value);
      this._updateSearchTermForIn();
    },
    onChangeSearchTermForStatus(value) {
      this.set("searchedTerms.status", value);
      this._updateSearchTermForStatus();
    },
    onChangeWhenTime(time) {
      if (time) {
        this.set("searchedTerms.time.when", time);
        this._updateSearchTermForPostTime();
      }
    },
    onChangeWhenDate(date) {
      if (date) {
        this.set("searchedTerms.time.days", date.format("YYYY-MM-DD"));
        this._updateSearchTermForPostTime();
      }
    },
    onChangeSearchTermForCategory(categoryId) {
      if (categoryId) {
        const category = _category.default.findById(categoryId);
        this.onChangeCategory && this.onChangeCategory(category);
        this.set("searchedTerms.category", category);
      } else {
        this.onChangeCategory && this.onChangeCategory(null);
        this.set("searchedTerms.category", null);
      }
      this._updateSearchTermForCategory();
    },
    onChangeSearchTermForUsername(username) {
      this.set("searchedTerms.username", username.length ? username : null);
      this._updateSearchTermForUsername();
    },
    onChangeSearchTermForTags(tags) {
      this.set("searchedTerms.tags", tags.length ? tags : null);
      this._updateSearchTermForTags();
    },
    onChangeSearchTermForAllTags(checked) {
      this.set("searchedTerms.special.all_tags", checked);
      this._updateSearchTermForTags();
    },
    onChangeSearchTermForSpecialInLikes(checked) {
      this.set("searchedTerms.special.in.likes", checked);
      this.updateInRegex(REGEXP_SPECIAL_IN_LIKES_MATCH, "likes");
    },
    onChangeSearchTermForSpecialInMessages(checked) {
      this.set("searchedTerms.special.in.messages", checked);
      this.updateInRegex(REGEXP_SPECIAL_IN_MESSAGES_MATCH, "messages");
    },
    onChangeSearchTermForSpecialInSeen(checked) {
      this.set("searchedTerms.special.in.seen", checked);
      this.updateInRegex(REGEXP_SPECIAL_IN_SEEN_MATCH, "seen");
    },
    onChangeSearchTermForSpecialInTitle(checked) {
      this.set("searchedTerms.special.in.title", checked);
      this.updateInRegex(REGEXP_SPECIAL_IN_TITLE_MATCH, "title");
    },
    onChangeSearchedTermField(path, updateFnName, value) {
      this.set(`searchedTerms.${path}`, value);
      this[updateFnName]();
    },
    _updateSearchTermForTags() {
      const match = this.filterBlocks(REGEXP_TAGS_PREFIX);
      const tagFilter = this.get("searchedTerms.tags");
      let searchTerm = this.searchTerm || "";
      const containAllTags = this.get("searchedTerms.special.all_tags");
      if (tagFilter && tagFilter.length !== 0) {
        const joinChar = containAllTags ? "+" : ",";
        const tags = tagFilter.join(joinChar);
        if (match.length !== 0) {
          searchTerm = searchTerm.replace(match[0], `tags:${tags}`);
        } else {
          searchTerm += ` tags:${tags}`;
        }
        if (tagFilter.length > 1) {
          this.set("showAllTagsCheckbox", true);
        }
        this._updateSearchTerm(searchTerm);
      } else if (match.length !== 0) {
        searchTerm = searchTerm.replace(match[0], "");
        this._updateSearchTerm(searchTerm);
      }
    },
    _updateSearchTermForCategory() {
      const match = this.filterBlocks(REGEXP_CATEGORY_PREFIX);
      const categoryFilter = this.get("searchedTerms.category");
      let searchTerm = this.searchTerm || "";
      const slugCategoryMatches = match.length !== 0 ? match[0].match(REGEXP_CATEGORY_SLUG) : null;
      const idCategoryMatches = match.length !== 0 ? match[0].match(REGEXP_CATEGORY_ID) : null;
      if (categoryFilter) {
        const id = categoryFilter.id;
        const slug = categoryFilter.slug;
        if (categoryFilter.parentCategory) {
          const parentSlug = categoryFilter.parentCategory.slug;
          if (slugCategoryMatches) {
            searchTerm = searchTerm.replace(slugCategoryMatches[0], `#${parentSlug}:${slug}`);
          } else if (idCategoryMatches) {
            searchTerm = searchTerm.replace(idCategoryMatches[0], `category:${id}`);
          } else if (slug) {
            searchTerm += ` #${parentSlug}:${slug}`;
          } else {
            searchTerm += ` category:${id}`;
          }
          this._updateSearchTerm(searchTerm);
        } else {
          if (slugCategoryMatches) {
            searchTerm = searchTerm.replace(slugCategoryMatches[0], `#${slug}`);
          } else if (idCategoryMatches) {
            searchTerm = searchTerm.replace(idCategoryMatches[0], `category:${id}`);
          } else if (slug) {
            searchTerm += ` #${slug}`;
          } else {
            searchTerm += ` category:${id}`;
          }
          this._updateSearchTerm(searchTerm);
        }
      } else {
        if (slugCategoryMatches) {
          searchTerm = searchTerm.replace(slugCategoryMatches[0], "");
        }
        if (idCategoryMatches) {
          searchTerm = searchTerm.replace(idCategoryMatches[0], "");
        }
        this._updateSearchTerm(searchTerm);
      }
    },
    _updateSearchTermForUsername() {
      const match = this.filterBlocks(REGEXP_USERNAME_PREFIX);
      const userFilter = this.get("searchedTerms.username");
      let searchTerm = this.searchTerm || "";
      if (userFilter && userFilter.length !== 0) {
        if (match.length !== 0) {
          searchTerm = searchTerm.replace(match[0], `@${userFilter}`);
        } else {
          searchTerm += ` @${userFilter}`;
        }
        this._updateSearchTerm(searchTerm);
      } else if (match.length !== 0) {
        searchTerm = searchTerm.replace(match[0], "");
        this._updateSearchTerm(searchTerm);
      }
    },
    _updateSearchTermForPostTime() {
      const match = this.filterBlocks(REGEXP_POST_TIME_PREFIX);
      const timeDaysFilter = this.get("searchedTerms.time.days");
      let searchTerm = this.searchTerm || "";
      if (timeDaysFilter) {
        const when = this.get("searchedTerms.time.when");
        if (match.length !== 0) {
          searchTerm = searchTerm.replace(match[0], `${when}:${timeDaysFilter}`);
        } else {
          searchTerm += ` ${when}:${timeDaysFilter}`;
        }
        this._updateSearchTerm(searchTerm);
      } else if (match.length !== 0) {
        searchTerm = searchTerm.replace(match[0], "");
        this._updateSearchTerm(searchTerm);
      }
    },
    _updateSearchTermForIn() {
      let regExpInMatch = this.inOptions.map(option => option.value).join("|");
      const REGEXP_IN_MATCH = new RegExp(`(in|with):(${regExpInMatch})`, "i");
      const match = this.filterBlocks(REGEXP_IN_MATCH);
      const inFilter = this.get("searchedTerms.in");
      let keyword = "in";
      if (inFilter in IN_OPTIONS_MAPPING) {
        keyword = IN_OPTIONS_MAPPING[inFilter];
      }
      let searchTerm = this.searchTerm || "";
      if (inFilter) {
        if (match.length !== 0) {
          searchTerm = searchTerm.replace(match[0], `${keyword}:${inFilter}`);
        } else {
          searchTerm += ` ${keyword}:${inFilter}`;
        }
        this._updateSearchTerm(searchTerm);
      } else if (match.length !== 0) {
        searchTerm = searchTerm.replace(match, "");
        this._updateSearchTerm(searchTerm);
      }
    },
    _updateSearchTermForStatus() {
      let regExpStatusMatch = this.statusOptions.map(status => status.value).join("|");
      const REGEXP_STATUS_MATCH = new RegExp(`status:(${regExpStatusMatch})`, "i");
      const match = this.filterBlocks(REGEXP_STATUS_MATCH);
      const statusFilter = this.get("searchedTerms.status");
      let searchTerm = this.searchTerm || "";
      if (statusFilter) {
        if (match.length !== 0) {
          searchTerm = searchTerm.replace(match[0], `status:${statusFilter}`);
        } else {
          searchTerm += ` status:${statusFilter}`;
        }
        this._updateSearchTerm(searchTerm);
      } else if (match.length !== 0) {
        searchTerm = searchTerm.replace(match[0], "");
        this._updateSearchTerm(searchTerm);
      }
    },
    _updateSearchTermForMinPostCount() {
      const match = this.filterBlocks(REGEXP_MIN_POSTS_PREFIX);
      const postsCountFilter = this.get("searchedTerms.min_posts");
      let searchTerm = this.searchTerm || "";
      if (postsCountFilter) {
        if (match.length !== 0) {
          searchTerm = searchTerm.replace(match[0], `min_posts:${postsCountFilter}`);
        } else {
          searchTerm += ` min_posts:${postsCountFilter}`;
        }
        this._updateSearchTerm(searchTerm);
      } else if (match.length !== 0) {
        searchTerm = searchTerm.replace(match[0], "");
        this._updateSearchTerm(searchTerm);
      }
    },
    _updateSearchTermForMaxPostCount() {
      const match = this.filterBlocks(REGEXP_MAX_POSTS_PREFIX);
      const postsCountFilter = this.get("searchedTerms.max_posts");
      let searchTerm = this.searchTerm || "";
      if (postsCountFilter) {
        if (match.length !== 0) {
          searchTerm = searchTerm.replace(match[0], `max_posts:${postsCountFilter}`);
        } else {
          searchTerm += ` max_posts:${postsCountFilter}`;
        }
        this._updateSearchTerm(searchTerm);
      } else if (match.length !== 0) {
        searchTerm = searchTerm.replace(match[0], "");
        this._updateSearchTerm(searchTerm);
      }
    },
    _updateSearchTermForMinViews() {
      const match = this.filterBlocks(REGEXP_MIN_VIEWS_PREFIX);
      const viewsCountFilter = this.get("searchedTerms.min_views");
      let searchTerm = this.searchTerm || "";
      if (viewsCountFilter) {
        if (match.length !== 0) {
          searchTerm = searchTerm.replace(match[0], `min_views:${viewsCountFilter}`);
        } else {
          searchTerm += ` min_views:${viewsCountFilter}`;
        }
        this._updateSearchTerm(searchTerm);
      } else if (match.length !== 0) {
        searchTerm = searchTerm.replace(match[0], "");
        this._updateSearchTerm(searchTerm);
      }
    },
    _updateSearchTermForMaxViews() {
      const match = this.filterBlocks(REGEXP_MAX_VIEWS_PREFIX);
      const viewsCountFilter = this.get("searchedTerms.max_views");
      let searchTerm = this.searchTerm || "";
      if (viewsCountFilter) {
        if (match.length !== 0) {
          searchTerm = searchTerm.replace(match[0], `max_views:${viewsCountFilter}`);
        } else {
          searchTerm += ` max_views:${viewsCountFilter}`;
        }
        this._updateSearchTerm(searchTerm);
      } else if (match.length !== 0) {
        searchTerm = searchTerm.replace(match[0], "");
        this._updateSearchTerm(searchTerm);
      }
    },
    _updateSearchTerm(searchTerm) {
      this.onChangeSearchTerm(searchTerm.trim());
    }
  }, (_applyDecoratedDescriptor(_obj, "onChangeSearchTermMinPostCount", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermMinPostCount"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchTermMaxPostCount", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermMaxPostCount"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchTermMinViews", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermMinViews"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchTermMaxViews", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermMaxViews"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchTermForIn", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermForIn"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchTermForStatus", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermForStatus"), _obj), _applyDecoratedDescriptor(_obj, "onChangeWhenTime", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeWhenTime"), _obj), _applyDecoratedDescriptor(_obj, "onChangeWhenDate", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeWhenDate"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchTermForCategory", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermForCategory"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchTermForUsername", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermForUsername"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchTermForTags", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermForTags"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchTermForAllTags", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermForAllTags"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchTermForSpecialInLikes", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermForSpecialInLikes"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchTermForSpecialInMessages", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermForSpecialInMessages"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchTermForSpecialInSeen", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermForSpecialInSeen"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchTermForSpecialInTitle", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchTermForSpecialInTitle"), _obj), _applyDecoratedDescriptor(_obj, "onChangeSearchedTermField", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChangeSearchedTermField"), _obj)), _obj)));
  _exports.default = _default;
});
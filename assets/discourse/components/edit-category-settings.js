define("discourse/components/edit-category-settings", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "discourse/models/group", "I18n", "discourse/lib/constants", "discourse/components/edit-category-panel", "discourse-common/utils/decorators", "discourse/lib/computed", "@ember/object"], function (_exports, _component, _templateFactory, _computed, _group, _I18n, _constants, _editCategoryPanel, _decorators, _computed2, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addCategorySortCriteria = addCategorySortCriteria;
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object/computed",0,"discourse/models/group",0,"I18n",0,"discourse/lib/constants",0,"discourse/components/edit-category-panel",0,"discourse-common/utils/decorators",0,"discourse/lib/computed",0,"@ember/object"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <section>
    {{#if this.showPositionInput}}
      <section class="field position-fields">
        <label for="category-position">
          {{i18n "category.position"}}
        </label>
        <NumberField
          @number={{this.category.position}}
          @id="category-position"
          @class="position-input"
          @type="number"
          @min="0"
        />
      </section>
    {{/if}}
  
    {{#unless this.showPositionInput}}
      <section class="field position-disabled">
        {{html-safe
          (i18n
            "category.position_disabled"
            url=(get-url
              "/admin/site_settings/category/all_results?filter=fixed_category_positions"
            )
          )
        }}
      </section>
    {{/unless}}
  
    <section class="field num-featured-topics">
      <label for="category-number-featured-topics">
        {{#if this.category.parent_category_id}}
          {{i18n "category.subcategory_num_featured_topics"}}
        {{else}}
          {{i18n "category.num_featured_topics"}}
        {{/if}}
      </label>
      <NumberField
        @number={{this.category.num_featured_topics}}
        @id="category-number-featured-topics"
        @type="number"
        @min="1"
      />
    </section>
  
    <section class="field search-priority">
      <label>
        {{i18n "category.search_priority.label"}}
      </label>
      <div class="controls">
        <ComboBox
          @valueProperty="value"
          @id="category-search-priority"
          @content={{this.searchPrioritiesOptions}}
          @value={{this.category.search_priority}}
          @onChange={{action (mut this.category.search_priority)}}
          @options={{hash placementStrategy="absolute"}}
        />
      </div>
    </section>
  
    {{#if this.siteSettings.enable_badges}}
      <section class="field allow-badges">
        <label>
          <Input @type="checkbox" @checked={{this.category.allow_badges}} />
          {{i18n "category.allow_badges_label"}}
        </label>
      </section>
    {{/if}}
  
    {{#if this.siteSettings.topic_featured_link_enabled}}
      <section class="field topic-featured-link-allowed">
        <div class="allowed-topic-featured-link-category">
          <label class="checkbox-label">
            <Input
              @type="checkbox"
              @checked={{this.category.topic_featured_link_allowed}}
            />
            {{i18n "category.topic_featured_link_allowed"}}
          </label>
        </div>
      </section>
    {{/if}}
  
    <section class="field navigate-to-first-post-after-read">
      <label>
        <Input
          @type="checkbox"
          @checked={{this.category.navigate_to_first_post_after_read}}
        />
        {{i18n "category.navigate_to_first_post_after_read"}}
      </label>
    </section>
  
    <section class="field all-topics-wiki">
      <label>
        <Input @type="checkbox" @checked={{this.category.all_topics_wiki}} />
        {{i18n "category.all_topics_wiki"}}
      </label>
    </section>
  
    <section class="field allow-unlimited-owner-edits-on-first-post">
      <label>
        <Input
          @type="checkbox"
          @checked={{this.category.allow_unlimited_owner_edits_on_first_post}}
        />
        {{i18n "category.allow_unlimited_owner_edits_on_first_post"}}
      </label>
    </section>
  </section>
  
  <section>
    <h3>{{i18n "category.settings_sections.moderation"}}</h3>
    {{#if this.siteSettings.enable_category_group_moderation}}
      <section class="field reviewable-by-group">
        <label>{{i18n "category.reviewable_by_group"}}</label>
        <GroupSelector
          @groupFinder={{this.groupFinder}}
          @single="true"
          @groupNames={{this.category.reviewable_by_group_name}}
          @placeholderKey="category.review_group_name"
        />
      </section>
    {{/if}}
  
    <section class="field require-topic-approval">
      <label>
        <Input
          @type="checkbox"
          @checked={{this.category.custom_fields.require_topic_approval}}
        />
        {{i18n "category.require_topic_approval"}}
      </label>
    </section>
  
    <section class="field require-reply-approval">
      <label>
        <Input
          @type="checkbox"
          @checked={{this.category.custom_fields.require_reply_approval}}
        />
        {{i18n "category.require_reply_approval"}}
      </label>
    </section>
  
    <section class="field default-slow-mode">
      <div class="control-group">
        <label for="category-default-slow-mode">
          {{i18n "category.default_slow_mode"}}
        </label>
        <div class="category-default-slow-mode-seconds">
          <RelativeTimePicker
            @id="category-default-slow-mode"
            @durationMinutes={{this.category.defaultSlowModeMinutes}}
            @onChange={{action "onDefaultSlowModeDurationChange"}}
          />
        </div>
      </div>
    </section>
  
    <section class="field auto-close">
      <div class="control-group">
        <label for="topic-auto-close">
          {{i18n "topic.auto_close.label"}}
        </label>
        <div class="category-topic-auto-close-hours">
          <RelativeTimePicker
            @id="topic-auto-close"
            @durationHours={{this.category.auto_close_hours}}
            @hiddenIntervals={{this.hiddenRelativeIntervals}}
            @onChange={{action "onAutoCloseDurationChange"}}
          />
        </div>
        <label>
          <Input
            @type="checkbox"
            @checked={{this.category.auto_close_based_on_last_post}}
          />
          {{i18n "topic.auto_close.based_on_last_post"}}
        </label>
      </div>
    </section>
  
    <section class="field num-auto-bump-daily">
      <label for="category-number-daily-bump">
        {{i18n "category.num_auto_bump_daily"}}
      </label>
      <NumberField
        @number={{this.category.custom_fields.num_auto_bump_daily}}
        @id="category-number-daily-bump"
        @type="number"
        @min="0"
      />
    </section>
  
    <section class="field auto-bump-cooldown-days">
      <label for="category-auto-bump-cooldown-days">
        {{i18n "category.auto_bump_cooldown_days"}}
      </label>
      <NumberField
        @number={{this.category.category_setting.auto_bump_cooldown_days}}
        @id="category-auto-bump-cooldown-days"
        @type="number"
        @min="0"
      />
    </section>
  </section>
  
  <section>
    <h3>{{i18n "category.settings_sections.appearance"}}</h3>
  
    <section class="field default-view-field">
      <label>
        {{i18n "category.default_view"}}
      </label>
      <div class="controls">
        <ComboBox
          @valueProperty="value"
          @id="category-default-view"
          @content={{this.availableViews}}
          @value={{this.category.default_view}}
          @options={{hash placementStrategy="absolute"}}
        />
      </div>
    </section>
  
    <section class="field default-top-period-field">
      <label>
        {{i18n "category.default_top_period"}}
      </label>
      <div class="controls">
        <ComboBox
          @valueProperty="value"
          @id="category-default-period"
          @content={{this.availableTopPeriods}}
          @value={{this.category.default_top_period}}
          @options={{hash placementStrategy="absolute"}}
        />
      </div>
    </section>
  
    <section class="field sort-order">
      <label>
        {{i18n "category.sort_order"}}
      </label>
      <div class="controls">
        <ComboBox
          @valueProperty="value"
          @content={{this.availableSorts}}
          @value={{this.category.sort_order}}
          @options={{hash none="category.sort_options.default"}}
          @onChange={{action (mut this.category.sort_order)}}
        />
        {{#unless this.isDefaultSortOrder}}
          <ComboBox
            @valueProperty="value"
            @content={{this.sortAscendingOptions}}
            @value={{this.sortAscendingOption}}
            @options={{hash
              none="category.sort_options.default"
              placementStrategy="absolute"
            }}
            @onChange={{action (mut this.category.sort_ascending)}}
          />
        {{/unless}}
      </div>
    </section>
  
    <section class="field default-filter">
      <label>
        {{i18n "category.default_list_filter"}}
      </label>
      <div class="controls">
        <ComboBox
          @id="category-default-filter"
          @valueProperty="value"
          @content={{this.availableListFilters}}
          @value={{this.category.default_list_filter}}
        />
      </div>
    </section>
  
    {{#if this.isParentCategory}}
      <section class="field show-subcategory-list-field">
        <label>
          <Input
            @type="checkbox"
            @checked={{this.category.show_subcategory_list}}
          />
          {{i18n "category.show_subcategory_list"}}
        </label>
      </section>
    {{/if}}
  
    {{#if this.showSubcategoryListStyle}}
      <section class="field subcategory-list-style-field">
        <label>
          {{i18n "category.subcategory_list_style"}}
        </label>
        <ComboBox
          @valueProperty="value"
          @id="subcategory-list-style"
          @content={{this.availableSubcategoryListStyles}}
          @value={{this.category.subcategory_list_style}}
          @options={{hash placementStrategy="absolute"}}
        />
      </section>
    {{/if}}
  
    <section class="field category-read-only-banner">
      <label for="read-only-message">{{i18n "category.read_only_banner"}}</label>
      <TextField
        @valueProperty="value"
        @id="read-only-message"
        @value={{this.category.read_only_banner}}
        @options={{hash placementStrategy="absolute"}}
      />
    </section>
  </section>
  
  <section>
    <h3>{{i18n "category.settings_sections.email"}}</h3>
  
    {{#if this.emailInEnabled}}
      <section class="field category-email-in">
        <label for="category-email-in">
          {{d-icon "envelope"}}
          {{i18n "category.email_in"}}
        </label>
        <TextField
          @id="category-email-in"
          @class="email-in"
          @value={{this.category.email_in}}
        />
        <span>
          {{d-icon "info-circle"}}
          <DTooltip>{{i18n "category.email_in_tooltip"}}</DTooltip>
        </span>
      </section>
  
      <section class="field email-in-allow-strangers">
        <label>
          <Input
            @type="checkbox"
            @checked={{this.category.email_in_allow_strangers}}
          />
          {{i18n "category.email_in_allow_strangers"}}
        </label>
      </section>
  
      <section class="field mailinglist-mirror">
        <label>
          <Input @type="checkbox" @checked={{this.category.mailinglist_mirror}} />
          {{i18n "category.mailinglist_mirror"}}
        </label>
      </section>
  
      <span>
        <PluginOutlet
          @name="category-email-in"
          @connectorTagName="div"
          @outletArgs={{hash category=this.category}}
        />
      </span>
    {{/if}}
  
    {{#unless this.emailInEnabled}}
      <section class="field email-in-disabled">
        {{html-safe
          (i18n
            "category.email_in_disabled"
            setting_url=(get-url
              "/admin/site_settings/category/all_results?filter=email_in"
            )
          )
        }}
      </section>
    {{/unless}}
  </section>
  
  <section>
    <PluginOutlet
      @name="category-custom-settings"
      @outletArgs={{hash category=this.category}}
    />
  </section>
  */
  {
    "id": "bj6yzbk4",
    "block": "[[[10,\"section\"],[12],[1,\"\\n\"],[41,[30,0,[\"showPositionInput\"]],[[[1,\"    \"],[10,\"section\"],[14,0,\"field position-fields\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,\"for\",\"category-position\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[\"category.position\"],null]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[8,[39,2],null,[[\"@number\",\"@id\",\"@class\",\"@type\",\"@min\"],[[30,0,[\"category\",\"position\"]],\"category-position\",\"position-input\",\"number\",\"0\"]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[51,[30,0,[\"showPositionInput\"]]],[[[1,\"    \"],[10,\"section\"],[14,0,\"field position-disabled\"],[12],[1,\"\\n      \"],[1,[28,[35,4],[[28,[37,1],[\"category.position_disabled\"],[[\"url\"],[[28,[37,5],[\"/admin/site_settings/category/all_results?filter=fixed_category_positions\"],null]]]]],null]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,\"section\"],[14,0,\"field num-featured-topics\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"category-number-featured-topics\"],[12],[1,\"\\n\"],[41,[30,0,[\"category\",\"parent_category_id\"]],[[[1,\"        \"],[1,[28,[35,1],[\"category.subcategory_num_featured_topics\"],null]],[1,\"\\n\"]],[]],[[[1,\"        \"],[1,[28,[35,1],[\"category.num_featured_topics\"],null]],[1,\"\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n    \"],[8,[39,2],null,[[\"@number\",\"@id\",\"@type\",\"@min\"],[[30,0,[\"category\",\"num_featured_topics\"]],\"category-number-featured-topics\",\"number\",\"1\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"field search-priority\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"category.search_priority.label\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@valueProperty\",\"@id\",\"@content\",\"@value\",\"@onChange\",\"@options\"],[\"value\",\"category-search-priority\",[30,0,[\"searchPrioritiesOptions\"]],[30,0,[\"category\",\"search_priority\"]],[28,[37,7],[[30,0],[28,[37,8],[[30,0,[\"category\",\"search_priority\"]]],null]],null],[28,[37,9],null,[[\"placementStrategy\"],[\"absolute\"]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"siteSettings\",\"enable_badges\"]],[[[1,\"    \"],[10,\"section\"],[14,0,\"field allow-badges\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,\"\\n        \"],[8,[39,10],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"category\",\"allow_badges\"]]]],null],[1,\"\\n        \"],[1,[28,[35,1],[\"category.allow_badges_label\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"topic_featured_link_enabled\"]],[[[1,\"    \"],[10,\"section\"],[14,0,\"field topic-featured-link-allowed\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"allowed-topic-featured-link-category\"],[12],[1,\"\\n        \"],[10,\"label\"],[14,0,\"checkbox-label\"],[12],[1,\"\\n          \"],[8,[39,10],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"category\",\"topic_featured_link_allowed\"]]]],null],[1,\"\\n          \"],[1,[28,[35,1],[\"category.topic_featured_link_allowed\"],null]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,\"section\"],[14,0,\"field navigate-to-first-post-after-read\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[8,[39,10],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"category\",\"navigate_to_first_post_after_read\"]]]],null],[1,\"\\n      \"],[1,[28,[35,1],[\"category.navigate_to_first_post_after_read\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"field all-topics-wiki\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[8,[39,10],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"category\",\"all_topics_wiki\"]]]],null],[1,\"\\n      \"],[1,[28,[35,1],[\"category.all_topics_wiki\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"field allow-unlimited-owner-edits-on-first-post\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[8,[39,10],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"category\",\"allow_unlimited_owner_edits_on_first_post\"]]]],null],[1,\"\\n      \"],[1,[28,[35,1],[\"category.allow_unlimited_owner_edits_on_first_post\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[12],[1,\"\\n  \"],[10,\"h3\"],[12],[1,[28,[35,1],[\"category.settings_sections.moderation\"],null]],[13],[1,\"\\n\"],[41,[30,0,[\"siteSettings\",\"enable_category_group_moderation\"]],[[[1,\"    \"],[10,\"section\"],[14,0,\"field reviewable-by-group\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,[28,[35,1],[\"category.reviewable_by_group\"],null]],[13],[1,\"\\n      \"],[8,[39,11],null,[[\"@groupFinder\",\"@single\",\"@groupNames\",\"@placeholderKey\"],[[30,0,[\"groupFinder\"]],\"true\",[30,0,[\"category\",\"reviewable_by_group_name\"]],\"category.review_group_name\"]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,\"section\"],[14,0,\"field require-topic-approval\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[8,[39,10],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"category\",\"custom_fields\",\"require_topic_approval\"]]]],null],[1,\"\\n      \"],[1,[28,[35,1],[\"category.require_topic_approval\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"field require-reply-approval\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[8,[39,10],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"category\",\"custom_fields\",\"require_reply_approval\"]]]],null],[1,\"\\n      \"],[1,[28,[35,1],[\"category.require_reply_approval\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"field default-slow-mode\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,\"for\",\"category-default-slow-mode\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[\"category.default_slow_mode\"],null]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"category-default-slow-mode-seconds\"],[12],[1,\"\\n        \"],[8,[39,12],null,[[\"@id\",\"@durationMinutes\",\"@onChange\"],[\"category-default-slow-mode\",[30,0,[\"category\",\"defaultSlowModeMinutes\"]],[28,[37,7],[[30,0],\"onDefaultSlowModeDurationChange\"],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"field auto-close\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,\"for\",\"topic-auto-close\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[\"topic.auto_close.label\"],null]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"category-topic-auto-close-hours\"],[12],[1,\"\\n        \"],[8,[39,12],null,[[\"@id\",\"@durationHours\",\"@hiddenIntervals\",\"@onChange\"],[\"topic-auto-close\",[30,0,[\"category\",\"auto_close_hours\"]],[30,0,[\"hiddenRelativeIntervals\"]],[28,[37,7],[[30,0],\"onAutoCloseDurationChange\"],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,\"label\"],[12],[1,\"\\n        \"],[8,[39,10],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"category\",\"auto_close_based_on_last_post\"]]]],null],[1,\"\\n        \"],[1,[28,[35,1],[\"topic.auto_close.based_on_last_post\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"field num-auto-bump-daily\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"category-number-daily-bump\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"category.num_auto_bump_daily\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[8,[39,2],null,[[\"@number\",\"@id\",\"@type\",\"@min\"],[[30,0,[\"category\",\"custom_fields\",\"num_auto_bump_daily\"]],\"category-number-daily-bump\",\"number\",\"0\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"field auto-bump-cooldown-days\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"category-auto-bump-cooldown-days\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"category.auto_bump_cooldown_days\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[8,[39,2],null,[[\"@number\",\"@id\",\"@type\",\"@min\"],[[30,0,[\"category\",\"category_setting\",\"auto_bump_cooldown_days\"]],\"category-auto-bump-cooldown-days\",\"number\",\"0\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[12],[1,\"\\n  \"],[10,\"h3\"],[12],[1,[28,[35,1],[\"category.settings_sections.appearance\"],null]],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"field default-view-field\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"category.default_view\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@valueProperty\",\"@id\",\"@content\",\"@value\",\"@options\"],[\"value\",\"category-default-view\",[30,0,[\"availableViews\"]],[30,0,[\"category\",\"default_view\"]],[28,[37,9],null,[[\"placementStrategy\"],[\"absolute\"]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"field default-top-period-field\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"category.default_top_period\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@valueProperty\",\"@id\",\"@content\",\"@value\",\"@options\"],[\"value\",\"category-default-period\",[30,0,[\"availableTopPeriods\"]],[30,0,[\"category\",\"default_top_period\"]],[28,[37,9],null,[[\"placementStrategy\"],[\"absolute\"]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"field sort-order\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"category.sort_order\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@options\",\"@onChange\"],[\"value\",[30,0,[\"availableSorts\"]],[30,0,[\"category\",\"sort_order\"]],[28,[37,9],null,[[\"none\"],[\"category.sort_options.default\"]]],[28,[37,7],[[30,0],[28,[37,8],[[30,0,[\"category\",\"sort_order\"]]],null]],null]]],null],[1,\"\\n\"],[41,[51,[30,0,[\"isDefaultSortOrder\"]]],[[[1,\"        \"],[8,[39,6],null,[[\"@valueProperty\",\"@content\",\"@value\",\"@options\",\"@onChange\"],[\"value\",[30,0,[\"sortAscendingOptions\"]],[30,0,[\"sortAscendingOption\"]],[28,[37,9],null,[[\"none\",\"placementStrategy\"],[\"category.sort_options.default\",\"absolute\"]]],[28,[37,7],[[30,0],[28,[37,8],[[30,0,[\"category\",\"sort_ascending\"]]],null]],null]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"section\"],[14,0,\"field default-filter\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"category.default_list_filter\"],null]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[8,[39,6],null,[[\"@id\",\"@valueProperty\",\"@content\",\"@value\"],[\"category-default-filter\",\"value\",[30,0,[\"availableListFilters\"]],[30,0,[\"category\",\"default_list_filter\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"isParentCategory\"]],[[[1,\"    \"],[10,\"section\"],[14,0,\"field show-subcategory-list-field\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,\"\\n        \"],[8,[39,10],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"category\",\"show_subcategory_list\"]]]],null],[1,\"\\n        \"],[1,[28,[35,1],[\"category.show_subcategory_list\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showSubcategoryListStyle\"]],[[[1,\"    \"],[10,\"section\"],[14,0,\"field subcategory-list-style-field\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[\"category.subcategory_list_style\"],null]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[8,[39,6],null,[[\"@valueProperty\",\"@id\",\"@content\",\"@value\",\"@options\"],[\"value\",\"subcategory-list-style\",[30,0,[\"availableSubcategoryListStyles\"]],[30,0,[\"category\",\"subcategory_list_style\"]],[28,[37,9],null,[[\"placementStrategy\"],[\"absolute\"]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,\"section\"],[14,0,\"field category-read-only-banner\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,\"for\",\"read-only-message\"],[12],[1,[28,[35,1],[\"category.read_only_banner\"],null]],[13],[1,\"\\n    \"],[8,[39,13],null,[[\"@valueProperty\",\"@id\",\"@value\",\"@options\"],[\"value\",\"read-only-message\",[30,0,[\"category\",\"read_only_banner\"]],[28,[37,9],null,[[\"placementStrategy\"],[\"absolute\"]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,\"section\"],[12],[1,\"\\n  \"],[10,\"h3\"],[12],[1,[28,[35,1],[\"category.settings_sections.email\"],null]],[13],[1,\"\\n\\n\"],[41,[30,0,[\"emailInEnabled\"]],[[[1,\"    \"],[10,\"section\"],[14,0,\"field category-email-in\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,\"for\",\"category-email-in\"],[12],[1,\"\\n        \"],[1,[28,[35,14],[\"envelope\"],null]],[1,\"\\n        \"],[1,[28,[35,1],[\"category.email_in\"],null]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[8,[39,13],null,[[\"@id\",\"@class\",\"@value\"],[\"category-email-in\",\"email-in\",[30,0,[\"category\",\"email_in\"]]]],null],[1,\"\\n      \"],[10,1],[12],[1,\"\\n        \"],[1,[28,[35,14],[\"info-circle\"],null]],[1,\"\\n        \"],[8,[39,15],null,null,[[\"default\"],[[[[1,[28,[35,1],[\"category.email_in_tooltip\"],null]]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,\"section\"],[14,0,\"field email-in-allow-strangers\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,\"\\n        \"],[8,[39,10],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"category\",\"email_in_allow_strangers\"]]]],null],[1,\"\\n        \"],[1,[28,[35,1],[\"category.email_in_allow_strangers\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,\"section\"],[14,0,\"field mailinglist-mirror\"],[12],[1,\"\\n      \"],[10,\"label\"],[12],[1,\"\\n        \"],[8,[39,10],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"category\",\"mailinglist_mirror\"]]]],null],[1,\"\\n        \"],[1,[28,[35,1],[\"category.mailinglist_mirror\"],null]],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,1],[12],[1,\"\\n      \"],[8,[39,16],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"category-email-in\",\"div\",[28,[37,9],null,[[\"category\"],[[30,0,[\"category\"]]]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[51,[30,0,[\"emailInEnabled\"]]],[[[1,\"    \"],[10,\"section\"],[14,0,\"field email-in-disabled\"],[12],[1,\"\\n      \"],[1,[28,[35,4],[[28,[37,1],[\"category.email_in_disabled\"],[[\"setting_url\"],[[28,[37,5],[\"/admin/site_settings/category/all_results?filter=email_in\"],null]]]]],null]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13],[1,\"\\n\\n\"],[10,\"section\"],[12],[1,\"\\n  \"],[8,[39,16],null,[[\"@name\",\"@outletArgs\"],[\"category-custom-settings\",[28,[37,9],null,[[\"category\"],[[30,0,[\"category\"]]]]]]],null],[1,\"\\n\"],[13]],[],false,[\"if\",\"i18n\",\"number-field\",\"unless\",\"html-safe\",\"get-url\",\"combo-box\",\"action\",\"mut\",\"hash\",\"input\",\"group-selector\",\"relative-time-picker\",\"text-field\",\"d-icon\",\"d-tooltip\",\"plugin-outlet\"]]",
    "moduleName": "discourse/components/edit-category-settings.hbs",
    "isStrictMode": false
  });
  const categorySortCriteria = [];
  function addCategorySortCriteria(criteria) {
    categorySortCriteria.push(criteria);
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, (0, _editCategoryPanel.buildCategoryPanel)("settings", (_dec = (0, _decorators.default)("category.isParent", "category.parent_category_id"), _dec2 = (0, _decorators.default)("category.sort_ascending"), (_obj = {
    emailInEnabled: (0, _computed2.setting)("email_in"),
    showPositionInput: (0, _computed2.setting)("fixed_category_positions"),
    isParentCategory(isParent, parentCategoryId) {
      return isParent || !parentCategoryId;
    },
    showSubcategoryListStyle: (0, _computed.and)("category.show_subcategory_list", "isParentCategory"),
    isDefaultSortOrder: (0, _computed.empty)("category.sort_order"),
    availableSubcategoryListStyles() {
      return [{
        name: _I18n.default.t("category.subcategory_list_styles.rows"),
        value: "rows"
      }, {
        name: _I18n.default.t("category.subcategory_list_styles.rows_with_featured_topics"),
        value: "rows_with_featured_topics"
      }, {
        name: _I18n.default.t("category.subcategory_list_styles.boxes"),
        value: "boxes"
      }, {
        name: _I18n.default.t("category.subcategory_list_styles.boxes_with_featured_topics"),
        value: "boxes_with_featured_topics"
      }];
    },
    groupFinder(term) {
      return _group.default.findAll({
        term,
        ignore_automatic: true
      });
    },
    availableViews() {
      return [{
        name: _I18n.default.t("filters.latest.title"),
        value: "latest"
      }, {
        name: _I18n.default.t("filters.top.title"),
        value: "top"
      }];
    },
    availableTopPeriods() {
      return ["all", "yearly", "quarterly", "monthly", "weekly", "daily"].map(p => {
        return {
          name: _I18n.default.t(`filters.top.${p}.title`),
          value: p
        };
      });
    },
    availableListFilters() {
      return ["all", "none"].map(p => {
        return {
          name: _I18n.default.t(`category.list_filters.${p}`),
          value: p
        };
      });
    },
    searchPrioritiesOptions() {
      const options = [];
      Object.entries(_constants.SEARCH_PRIORITIES).forEach(entry => {
        const [name, value] = entry;
        options.push({
          name: _I18n.default.t(`category.search_priority.options.${name}`),
          value
        });
      });
      return options;
    },
    availableSorts() {
      return ["likes", "op_likes", "views", "posts", "activity", "posters", "category", "created"].concat(categorySortCriteria).map(s => ({
        name: _I18n.default.t("category.sort_options." + s),
        value: s
      })).sort((a, b) => a.name.localeCompare(b.name));
    },
    sortAscendingOption(sortAscending) {
      if (sortAscending === "false") {
        return false;
      }
      if (sortAscending === "true") {
        return true;
      }
      return sortAscending;
    },
    sortAscendingOptions() {
      return [{
        name: _I18n.default.t("category.sort_ascending"),
        value: true
      }, {
        name: _I18n.default.t("category.sort_descending"),
        value: false
      }];
    },
    hiddenRelativeIntervals() {
      return ["mins"];
    },
    onAutoCloseDurationChange(minutes) {
      let hours = minutes ? minutes / 60 : null;
      this.set("category.auto_close_hours", hours);
    },
    onDefaultSlowModeDurationChange(minutes) {
      let seconds = minutes ? minutes * 60 : null;
      this.set("category.default_slow_mode_seconds", seconds);
    }
  }, (_applyDecoratedDescriptor(_obj, "isParentCategory", [_dec], Object.getOwnPropertyDescriptor(_obj, "isParentCategory"), _obj), _applyDecoratedDescriptor(_obj, "availableSubcategoryListStyles", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "availableSubcategoryListStyles"), _obj), _applyDecoratedDescriptor(_obj, "availableViews", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "availableViews"), _obj), _applyDecoratedDescriptor(_obj, "availableTopPeriods", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "availableTopPeriods"), _obj), _applyDecoratedDescriptor(_obj, "availableListFilters", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "availableListFilters"), _obj), _applyDecoratedDescriptor(_obj, "searchPrioritiesOptions", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "searchPrioritiesOptions"), _obj), _applyDecoratedDescriptor(_obj, "availableSorts", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "availableSorts"), _obj), _applyDecoratedDescriptor(_obj, "sortAscendingOption", [_dec2], Object.getOwnPropertyDescriptor(_obj, "sortAscendingOption"), _obj), _applyDecoratedDescriptor(_obj, "sortAscendingOptions", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "sortAscendingOptions"), _obj), _applyDecoratedDescriptor(_obj, "hiddenRelativeIntervals", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "hiddenRelativeIntervals"), _obj), _applyDecoratedDescriptor(_obj, "onAutoCloseDurationChange", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onAutoCloseDurationChange"), _obj), _applyDecoratedDescriptor(_obj, "onDefaultSlowModeDurationChange", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onDefaultSlowModeDurationChange"), _obj)), _obj))));
  _exports.default = _default;
});
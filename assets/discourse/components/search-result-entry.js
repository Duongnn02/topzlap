define("discourse/components/search-result-entry", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse/lib/search", "discourse/lib/utilities"], function (_exports, _component, _templateFactory, _object, _search, _utilities) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"discourse/lib/search",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="author">
    <a href={{this.post.userPath}} data-user-card={{this.post.username}}>
      {{avatar this.post imageSize="large"}}
    </a>
  </div>
  
  <div class="fps-topic">
    <div class="topic">
      {{#if this.bulkSelectEnabled}}
        <TrackSelected
          @selectedList={{this.selected}}
          @selectedId={{this.post.topic}}
          @class="bulk-select"
        />
      {{/if}}
  
      <a
        href={{this.post.url}}
        {{on "click" (fn this.logClick this.post.topic_id)}}
        class="search-link{{if this.post.topic.visited ' visited'}}"
        role="heading"
        aria-level="2"
      >
        {{raw "topic-status" topic=this.post.topic showPrivateMessageIcon=true}}
        <span class="topic-title">
          {{#if this.post.useTopicTitleHeadline}}
            {{html-safe this.post.topicTitleHeadline}}
          {{else}}
            <HighlightSearch @highlight={{this.highlightQuery}}>
              {{html-safe this.post.topic.fancyTitle}}
            </HighlightSearch>
          {{/if}}
        </span>
      </a>
  
      <div class="search-category">
        {{#if this.post.topic.category.parentCategory}}
          {{category-link this.post.topic.category.parentCategory}}
        {{/if}}
        {{category-link this.post.topic.category hideParent=true}}
        {{#if this.post.topic}}
          {{discourse-tags this.post.topic}}
        {{/if}}
        <span>
          <PluginOutlet
            @name="full-page-search-category"
            @connectorTagName="div"
            @outletArgs={{hash post=this.post}}
          />
        </span>
      </div>
    </div>
  
    <div class="blurb container">
      <span class="date">
        {{format-date this.post.created_at format="tiny"}}
        {{#if this.post.blurb}}
          <span class="separator">-</span>
        {{/if}}
      </span>
  
      {{#if this.post.blurb}}
        {{#if this.siteSettings.use_pg_headlines_for_excerpt}}
          {{html-safe this.post.blurb}}
        {{else}}
          <HighlightSearch @highlight={{this.highlightQuery}}>
            {{html-safe this.post.blurb}}
          </HighlightSearch>
        {{/if}}
      {{/if}}
    </div>
  
    {{#if this.showLikeCount}}
      {{#if this.post.like_count}}
        <span class="like-count">
          <span class="value">{{this.post.like_count}}</span>
          {{d-icon "heart"}}
        </span>
      {{/if}}
    {{/if}}
  </div>
  */
  {
    "id": "q68ROFlI",
    "block": "[[[10,0],[14,0,\"author\"],[12],[1,\"\\n  \"],[10,3],[15,6,[30,0,[\"post\",\"userPath\"]]],[15,\"data-user-card\",[30,0,[\"post\",\"username\"]]],[12],[1,\"\\n    \"],[1,[28,[35,0],[[30,0,[\"post\"]]],[[\"imageSize\"],[\"large\"]]]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"fps-topic\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"topic\"],[12],[1,\"\\n\"],[41,[30,0,[\"bulkSelectEnabled\"]],[[[1,\"      \"],[8,[39,2],null,[[\"@selectedList\",\"@selectedId\",\"@class\"],[[30,0,[\"selected\"]],[30,0,[\"post\",\"topic\"]],\"bulk-select\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[11,3],[16,6,[30,0,[\"post\",\"url\"]]],[16,0,[29,[\"search-link\",[52,[30,0,[\"post\",\"topic\",\"visited\"]],\" visited\"]]]],[24,\"role\",\"heading\"],[24,\"aria-level\",\"2\"],[4,[38,3],[\"click\",[28,[37,4],[[30,0,[\"logClick\"]],[30,0,[\"post\",\"topic_id\"]]],null]],null],[12],[1,\"\\n      \"],[1,[28,[35,5],[\"topic-status\"],[[\"topic\",\"showPrivateMessageIcon\"],[[30,0,[\"post\",\"topic\"]],true]]]],[1,\"\\n      \"],[10,1],[14,0,\"topic-title\"],[12],[1,\"\\n\"],[41,[30,0,[\"post\",\"useTopicTitleHeadline\"]],[[[1,\"          \"],[1,[28,[35,6],[[30,0,[\"post\",\"topicTitleHeadline\"]]],null]],[1,\"\\n\"]],[]],[[[1,\"          \"],[8,[39,7],null,[[\"@highlight\"],[[30,0,[\"highlightQuery\"]]]],[[\"default\"],[[[[1,\"\\n            \"],[1,[28,[35,6],[[30,0,[\"post\",\"topic\",\"fancyTitle\"]]],null]],[1,\"\\n          \"]],[]]]]],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"search-category\"],[12],[1,\"\\n\"],[41,[30,0,[\"post\",\"topic\",\"category\",\"parentCategory\"]],[[[1,\"        \"],[1,[28,[35,8],[[30,0,[\"post\",\"topic\",\"category\",\"parentCategory\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"      \"],[1,[28,[35,8],[[30,0,[\"post\",\"topic\",\"category\"]]],[[\"hideParent\"],[true]]]],[1,\"\\n\"],[41,[30,0,[\"post\",\"topic\"]],[[[1,\"        \"],[1,[28,[35,9],[[30,0,[\"post\",\"topic\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"      \"],[10,1],[12],[1,\"\\n        \"],[8,[39,10],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"full-page-search-category\",\"div\",[28,[37,11],null,[[\"post\"],[[30,0,[\"post\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"blurb container\"],[12],[1,\"\\n    \"],[10,1],[14,0,\"date\"],[12],[1,\"\\n      \"],[1,[28,[35,12],[[30,0,[\"post\",\"created_at\"]]],[[\"format\"],[\"tiny\"]]]],[1,\"\\n\"],[41,[30,0,[\"post\",\"blurb\"]],[[[1,\"        \"],[10,1],[14,0,\"separator\"],[12],[1,\"-\"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"post\",\"blurb\"]],[[[41,[30,0,[\"siteSettings\",\"use_pg_headlines_for_excerpt\"]],[[[1,\"        \"],[1,[28,[35,6],[[30,0,[\"post\",\"blurb\"]]],null]],[1,\"\\n\"]],[]],[[[1,\"        \"],[8,[39,7],null,[[\"@highlight\"],[[30,0,[\"highlightQuery\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,6],[[30,0,[\"post\",\"blurb\"]]],null]],[1,\"\\n        \"]],[]]]]],[1,\"\\n\"]],[]]]],[]],null],[1,\"  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showLikeCount\"]],[[[41,[30,0,[\"post\",\"like_count\"]],[[[1,\"      \"],[10,1],[14,0,\"like-count\"],[12],[1,\"\\n        \"],[10,1],[14,0,\"value\"],[12],[1,[30,0,[\"post\",\"like_count\"]]],[13],[1,\"\\n        \"],[1,[28,[35,13],[\"heart\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[13]],[],false,[\"avatar\",\"if\",\"track-selected\",\"on\",\"fn\",\"raw\",\"html-safe\",\"highlight-search\",\"category-link\",\"discourse-tags\",\"plugin-outlet\",\"hash\",\"format-date\",\"d-icon\"]]",
    "moduleName": "discourse/components/search-result-entry.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    tagName: "div",
    classNames: ["fps-result"],
    classNameBindings: ["bulkSelectEnabled"],
    attributeBindings: ["role"],
    role: "listitem",
    logClick(topicId, event) {
      // Avoid click logging when any modifier keys are pressed.
      if (event && (0, _utilities.modKeysPressed)(event).length > 0) {
        return false;
      }
      if (this.searchLogId && topicId) {
        (0, _search.logSearchLinkClick)({
          searchLogId: this.searchLogId,
          searchResultId: topicId,
          searchResultType: "topic"
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "logClick", [_object.action], Object.getOwnPropertyDescriptor(_obj, "logClick"), _obj)), _obj)));
  _exports.default = _default;
});
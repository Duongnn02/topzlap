define("discourse/components/choose-topic", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/object", "discourse-common/lib/debounce", "@ember/utils", "discourse/lib/search", "discourse-common/config/environment"], function (_exports, _component, _templateFactory, _decorators, _object, _debounce, _utils, _search, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/component",0,"@ember/object",0,"discourse-common/lib/debounce",0,"@ember/utils",0,"discourse/lib/search",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <label for="choose-topic-title">
    {{#if this.labelIcon}}
      {{d-icon this.labelIcon}}
    {{/if}}
    <span>{{i18n this.labelText}}</span>
  </label>
  
  <TextField
    @value={{this.topicTitle}}
    @placeholderKey="choose_topic.title.placeholder"
    @id="choose-topic-title"
  />
  
  {{#if this.loading}}
    <p>{{i18n "loading"}}</p>
  {{else}}
    {{#if this.noResults}}
      <p>{{i18n "choose_topic.none_found"}}</p>
    {{else}}
      <div class="choose-topic-list" role="radiogroup">
        {{#each this.topics as |t|}}
          <div class="controls existing-topic">
            <label class="radio">
              <Input
                id={{concat "choose-topic-" t.id}}
                @checked={{eq t.id this.selectedTopicId}}
                @type="radio"
                name="choose_topic_id"
                {{on "click" (action "chooseTopic" t)}}
              />
              <TopicStatus @topic={{t}} @disableActions={{true}} />
              <span class="topic-title">
                {{replace-emoji t.title}}
              </span>
              <span class="topic-categories">
                {{bound-category-link
                  t.category
                  recursive=true
                  hideParent=true
                  link=false
                }}
              </span>
            </label>
          </div>
        {{/each}}
      </div>
    {{/if}}
  {{/if}}
  */
  {
    "id": "x765sMxB",
    "block": "[[[10,\"label\"],[14,\"for\",\"choose-topic-title\"],[12],[1,\"\\n\"],[41,[30,0,[\"labelIcon\"]],[[[1,\"    \"],[1,[28,[35,1],[[30,0,[\"labelIcon\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"  \"],[10,1],[12],[1,[28,[35,2],[[30,0,[\"labelText\"]]],null]],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,3],null,[[\"@value\",\"@placeholderKey\",\"@id\"],[[30,0,[\"topicTitle\"]],\"choose_topic.title.placeholder\",\"choose-topic-title\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"loading\"]],[[[1,\"  \"],[10,2],[12],[1,[28,[35,2],[\"loading\"],null]],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"noResults\"]],[[[1,\"    \"],[10,2],[12],[1,[28,[35,2],[\"choose_topic.none_found\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"choose-topic-list\"],[14,\"role\",\"radiogroup\"],[12],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,0,[\"topics\"]]],null]],null],null,[[[1,\"        \"],[10,0],[14,0,\"controls existing-topic\"],[12],[1,\"\\n          \"],[10,\"label\"],[14,0,\"radio\"],[12],[1,\"\\n            \"],[8,[39,6],[[16,1,[28,[37,7],[\"choose-topic-\",[30,1,[\"id\"]]],null]],[24,3,\"choose_topic_id\"],[4,[38,9],[\"click\",[28,[37,10],[[30,0],\"chooseTopic\",[30,1]],null]],null]],[[\"@checked\",\"@type\"],[[28,[37,8],[[30,1,[\"id\"]],[30,0,[\"selectedTopicId\"]]],null],\"radio\"]],null],[1,\"\\n            \"],[8,[39,11],null,[[\"@topic\",\"@disableActions\"],[[30,1],true]],null],[1,\"\\n            \"],[10,1],[14,0,\"topic-title\"],[12],[1,\"\\n              \"],[1,[28,[35,12],[[30,1,[\"title\"]]],null]],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,1],[14,0,\"topic-categories\"],[12],[1,\"\\n              \"],[1,[28,[35,13],[[30,1,[\"category\"]]],[[\"recursive\",\"hideParent\",\"link\"],[true,true,false]]]],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]]]],[]]]],[\"t\"],false,[\"if\",\"d-icon\",\"i18n\",\"text-field\",\"each\",\"-track-array\",\"input\",\"concat\",\"eq\",\"on\",\"action\",\"topic-status\",\"replace-emoji\",\"bound-category-link\"]]",
    "moduleName": "discourse/components/choose-topic.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.observes)("topicTitle"), _dec2 = (0, _decorators.default)("label"), _dec3 = (0, _decorators.observes)("topics"), (_obj = {
    loading: null,
    noResults: null,
    topics: null,
    selectedTopicId: null,
    currentTopicId: null,
    additionalFilters: null,
    topicTitle: null,
    label: null,
    loadOnInit: false,
    topicChangedCallback: null,
    init() {
      this._super(...arguments);
      this.additionalFilters = this.additionalFilters || "";
      this.topicTitle = this.topicTitle || "";
      if (this.loadOnInit && !(0, _utils.isEmpty)(this.additionalFilters)) {
        (0, _search.searchForTerm)(this.additionalFilters, {}).then(results => {
          if (results?.posts?.length > 0) {
            this.set("topics", results.posts.mapBy("topic").filter(t => t.id !== this.currentTopicId));
          } else {
            this.setProperties({
              topics: null,
              loading: false
            });
          }
        });
      }
    },
    didInsertElement() {
      this._super(...arguments);
      document.getElementById("choose-topic-title").addEventListener("keydown", this._handleEnter);
    },
    willDestroyElement() {
      this._super(...arguments);
      document.getElementById("choose-topic-title").removeEventListener("keydown", this._handleEnter);
    },
    topicTitleChanged() {
      if (this.oldTopicTitle === this.topicTitle) {
        return;
      }
      this.setProperties({
        loading: true,
        noResults: true,
        selectedTopicId: null,
        oldTopicTitle: this.topicTitle
      });
      this.searchDebounced(this.topicTitle);
    },
    labelText(label) {
      return label || "choose_topic.title.search";
    },
    topicsChanged() {
      if (this.topics) {
        this.set("noResults", this.topics.length === 0);
      }
      this.set("loading", false);
    },
    searchDebounced(title) {
      (0, _debounce.default)(this, this.search, title, _environment.INPUT_DELAY);
    },
    search(title) {
      if (!this.element || this.isDestroying || this.isDestroyed) {
        return;
      }
      if ((0, _utils.isEmpty)(title) && (0, _utils.isEmpty)(this.additionalFilters)) {
        this.setProperties({
          topics: null,
          loading: false
        });
        this.onSearchEmptied?.();
        return;
      }
      const currentTopicId = this.currentTopicId;
      const titleWithFilters = `${title} ${this.additionalFilters}`;
      const searchParams = {};
      if (!(0, _utils.isEmpty)(title)) {
        searchParams.typeFilter = "topic";
        searchParams.restrictToArchetype = "regular";
        searchParams.searchForId = true;
      }
      (0, _search.searchForTerm)(titleWithFilters, searchParams).then(results => {
        // search term changed after the request was fired but before we
        // got a response, ignore results.
        if (title !== this.topicTitle) {
          return;
        }
        if (results?.posts?.length > 0) {
          this.set("topics", results.posts.mapBy("topic").filter(t => t.id !== currentTopicId));
          if (this.topics.length === 1) {
            this.send("chooseTopic", this.topics[0]);
          }
        } else {
          this.setProperties({
            topics: null,
            loading: false
          });
        }
      });
    },
    chooseTopic(topic) {
      this.set("selectedTopicId", topic.id);
      if (this.topicChangedCallback) {
        this.topicChangedCallback(topic);
      }
    },
    _handleEnter(event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "topicTitleChanged", [_dec], Object.getOwnPropertyDescriptor(_obj, "topicTitleChanged"), _obj), _applyDecoratedDescriptor(_obj, "labelText", [_dec2], Object.getOwnPropertyDescriptor(_obj, "labelText"), _obj), _applyDecoratedDescriptor(_obj, "topicsChanged", [_dec3], Object.getOwnPropertyDescriptor(_obj, "topicsChanged"), _obj), _applyDecoratedDescriptor(_obj, "chooseTopic", [_object.action], Object.getOwnPropertyDescriptor(_obj, "chooseTopic"), _obj)), _obj))));
  _exports.default = _default;
});
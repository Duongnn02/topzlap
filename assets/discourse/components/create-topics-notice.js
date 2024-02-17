define("discourse/components/create-topics-notice", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "I18n", "discourse/models/live-post-counts", "@ember/object/computed", "@ember/template", "@ember/service"], function (_exports, _component, _templateFactory, _decorators, _I18n, _livePostCounts, _computed, _template, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/component",0,"I18n",0,"discourse/models/live-post-counts",0,"@ember/object/computed",0,"@ember/template",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.hidden}}
    <div class="row">
      <div class="alert alert-info alert-too-few-topics">
        {{this.message}}
      </div>
    </div>
  {{/unless}}
  */
  {
    "id": "V5UChiVE",
    "block": "[[[41,[51,[30,0,[\"hidden\"]]],[[[1,\"  \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"alert alert-info alert-too-few-topics\"],[12],[1,\"\\n      \"],[1,[30,0,[\"message\"]]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"unless\"]]",
    "moduleName": "discourse/components/create-topics-notice.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("siteSettings.show_create_topics_notice", "router.currentRouteName"), _dec2 = (0, _decorators.default)("enabled", "shouldSee", "publicTopicCount", "publicPostCount"), _dec3 = (0, _decorators.default)("publicTopicCount", "publicPostCount", "topicTrackingState.incomingCount"), _dec4 = (0, _decorators.observes)("topicTrackingState.incomingCount"), (_obj = {
    classNameBindings: ["hidden:hidden", ":create-topics-notice"],
    enabled: false,
    router: (0, _service.inject)(),
    publicTopicCount: null,
    publicPostCount: null,
    requiredTopics: 5,
    requiredPosts: (0, _computed.alias)("siteSettings.tl1_requires_read_posts"),
    init() {
      this._super(...arguments);
      if (this.shouldSee) {
        let topicCount = 0,
          postCount = 0;

        // Use data we already have before fetching live stats
        this.site.get("categories").forEach(c => {
          if (!c.get("read_restricted")) {
            topicCount += c.get("topic_count");
            postCount += c.get("post_count");
          }
        });
        if (topicCount < this.requiredTopics || postCount < this.requiredPosts) {
          this.set("enabled", true);
          this.fetchLiveStats();
        }
      }
    },
    shouldSee(showCreateTopicsNotice, currentRouteName) {
      return this.currentUser?.get("admin") && showCreateTopicsNotice && !this.site.get("wizard_required") && !currentRouteName.startsWith("wizard");
    },
    hidden(enabled, shouldSee, publicTopicCount, publicPostCount) {
      return !enabled || !shouldSee || publicTopicCount == null || publicPostCount == null;
    },
    message(publicTopicCount, publicPostCount) {
      let msg = null;
      if (publicTopicCount < this.requiredTopics && publicPostCount < this.requiredPosts) {
        msg = "too_few_topics_and_posts_notice_MF";
      } else if (publicTopicCount < this.requiredTopics) {
        msg = "too_few_topics_notice_MF";
      } else {
        msg = "too_few_posts_notice_MF";
      }
      return (0, _template.htmlSafe)(_I18n.default.messageFormat(msg, {
        requiredTopics: this.requiredTopics,
        requiredPosts: this.requiredPosts,
        currentTopics: publicTopicCount,
        currentPosts: publicPostCount
      }));
    },
    fetchLiveStats() {
      if (!this.enabled) {
        return;
      }
      _livePostCounts.default.find().then(stats => {
        if (stats) {
          this.set("publicTopicCount", stats.get("public_topic_count"));
          this.set("publicPostCount", stats.get("public_post_count"));
          if (this.publicTopicCount >= this.requiredTopics && this.publicPostCount >= this.requiredPosts) {
            this.set("enabled", false); // No more checks
          }
        }
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "shouldSee", [_dec], Object.getOwnPropertyDescriptor(_obj, "shouldSee"), _obj), _applyDecoratedDescriptor(_obj, "hidden", [_dec2], Object.getOwnPropertyDescriptor(_obj, "hidden"), _obj), _applyDecoratedDescriptor(_obj, "message", [_dec3], Object.getOwnPropertyDescriptor(_obj, "message"), _obj), _applyDecoratedDescriptor(_obj, "fetchLiveStats", [_dec4], Object.getOwnPropertyDescriptor(_obj, "fetchLiveStats"), _obj)), _obj))));
  _exports.default = _default;
});
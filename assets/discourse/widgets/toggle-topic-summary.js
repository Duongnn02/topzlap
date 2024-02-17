define("discourse/widgets/toggle-topic-summary", ["exports", "I18n", "discourse/widgets/raw-html", "discourse/widgets/widget"], function (_exports, _I18n, _rawHtml, _widget) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addTopicSummaryCallback = addTopicSummaryCallback;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/widgets/raw-html",0,"discourse/widgets/widget"eaimeta@70e063a35619d71f
  const MIN_POST_READ_TIME = 4;
  (0, _widget.createWidget)("toggle-summary-description", {
    description(attrs) {
      if (attrs.topicSummaryEnabled) {
        return _I18n.default.t("summary.enabled_description");
      }
      if (attrs.topicWordCount && this.siteSettings.read_time_word_count > 0) {
        const readingTime = Math.ceil(Math.max(attrs.topicWordCount / this.siteSettings.read_time_word_count, attrs.topicPostsCount * MIN_POST_READ_TIME / 60));
        return _I18n.default.messageFormat("summary.description_time_MF", {
          replyCount: attrs.topicReplyCount,
          readingTime
        });
      }
      return _I18n.default.t("summary.description", {
        count: attrs.topicReplyCount
      });
    },
    html(attrs) {
      // vdom makes putting html in the i18n difficult
      return new _rawHtml.default({
        html: `<p>${this.description(attrs)}</p>`
      });
    }
  });
  let topicSummaryCallbacks = null;
  function addTopicSummaryCallback(callback) {
    topicSummaryCallbacks = topicSummaryCallbacks || [];
    topicSummaryCallbacks.push(callback);
  }
  var _default = (0, _widget.createWidget)("toggle-topic-summary", {
    tagName: "section.information.toggle-summary",
    html(attrs) {
      let html = [this.attach("toggle-summary-description", attrs), this.attach("button", {
        className: "btn btn-primary",
        icon: attrs.topicSummaryEnabled ? null : "layer-group",
        title: attrs.topicSummaryEnabled ? null : "summary.short_title",
        label: attrs.topicSummaryEnabled ? "summary.disable" : "summary.enable",
        action: attrs.topicSummaryEnabled ? "cancelFilter" : "showSummary"
      })];
      if (topicSummaryCallbacks) {
        topicSummaryCallbacks.forEach(callback => {
          html = callback(html, attrs, this);
        });
      }
      return html;
    }
  });
  _exports.default = _default;
});
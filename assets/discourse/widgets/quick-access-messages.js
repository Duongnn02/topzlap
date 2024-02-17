define("discourse/widgets/quick-access-messages", ["discourse/widgets/raw-html", "discourse-common/lib/icon-library", "virtual-dom", "discourse/widgets/quick-access-panel", "discourse/widgets/widget", "discourse/lib/utilities", "discourse-common/lib/get-url", "I18n", "@ember/template"], function (_rawHtml, _iconLibrary, _virtualDom, _quickAccessPanel, _widget, _utilities, _getUrl, _I18n, _template) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/raw-html",0,"discourse-common/lib/icon-library",0,"virtual-dom",0,"discourse/widgets/quick-access-panel",0,"discourse/widgets/widget",0,"discourse/lib/utilities",0,"discourse-common/lib/get-url",0,"I18n",0,"@ember/template"eaimeta@70e063a35619d71f
  const ICON = "notification.private_message";
  function toItem(message) {
    const lastReadPostNumber = message.last_read_post_number || 0;
    const nextUnreadPostNumber = Math.min(lastReadPostNumber + 1, message.highest_post_number);
    return {
      escapedContent: message.fancy_title,
      href: (0, _utilities.postUrl)(message.slug, message.id, nextUnreadPostNumber),
      icon: ICON,
      read: message.last_read_post_number >= message.highest_post_number,
      username: message.last_poster_username
    };
  }
  (0, _widget.createWidget)("no-quick-access-messages", {
    html() {
      return (0, _virtualDom.h)("div.empty-state", [(0, _virtualDom.h)("span.empty-state-title", _I18n.default.t("user.no_messages_title")), (0, _virtualDom.h)("div.empty-state-body", new _rawHtml.default({
        html: "<p>" + (0, _template.htmlSafe)(_I18n.default.t("user.no_messages_body", {
          aboutUrl: (0, _getUrl.default)("/about"),
          icon: (0, _iconLibrary.iconHTML)("envelope")
        })) + "</p>"
      }))]);
    }
  });
  (0, _widget.createWidgetFrom)(_quickAccessPanel.default, "quick-access-messages", {
    buildKey: () => "quick-access-messages",
    emptyStateWidget: "no-quick-access-messages",
    showAllHref() {
      return `${this.attrs.path}/messages`;
    },
    findNewItems() {
      return this.store.findFiltered("topicList", {
        filter: `topics/private-messages/${this.currentUser.username_lower}`
      }).then(_ref => {
        let {
          topic_list
        } = _ref;
        return topic_list.topics.map(toItem);
      });
    },
    itemHtml(message) {
      return this.attach("quick-access-item", message);
    }
  });
});
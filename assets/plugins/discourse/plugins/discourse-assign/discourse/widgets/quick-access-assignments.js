define("discourse/plugins/discourse-assign/discourse/widgets/quick-access-assignments", ["discourse/widgets/raw-html", "discourse-common/lib/icon-library", "discourse/widgets/widget", "discourse-common/lib/get-url", "discourse/lib/utilities", "virtual-dom", "I18n", "@ember/template"], function (_rawHtml, _iconLibrary, _widget, _getUrl, _utilities, _virtualDom, _I18n, _template) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/raw-html",0,"discourse-common/lib/icon-library",0,"discourse/widgets/widget",0,"discourse-common/lib/get-url",0,"discourse/lib/utilities",0,"virtual-dom",0,"I18n",0,"@ember/template"eaimeta@70e063a35619d71f
  const ICON = "user-plus";
  const GROUP_ICON = "group-plus";
  (0, _widget.createWidget)("no-quick-access-assignments", {
    html() {
      return (0, _virtualDom.h)("div.empty-state", [(0, _virtualDom.h)("span.empty-state-title", _I18n.default.t("user.no_assignments_title")), (0, _virtualDom.h)("div.empty-state-body", new _rawHtml.default({
        html: "<p>" + (0, _template.htmlSafe)(_I18n.default.t("user.no_assignments_body", {
          preferencesUrl: (0, _getUrl.default)("/my/preferences/notifications"),
          icon: (0, _iconLibrary.iconHTML)(ICON)
        })) + "</p>"
      }))]);
    }
  });
  const QuickAccessPanel = (0, _widget.queryRegistry)("quick-access-panel");
  if (QuickAccessPanel) {
    (0, _widget.createWidgetFrom)(QuickAccessPanel, "quick-access-assignments", {
      buildKey: () => "quick-access-assignments",
      emptyStateWidget: "no-quick-access-assignments",
      showAllHref() {
        return `${this.attrs.path}/activity/assigned`;
      },
      findNewItems() {
        return this.store.findFiltered("topicList", {
          filter: `topics/messages-assigned/${this.currentUser.username_lower}`,
          params: {
            exclude_category_ids: [-1]
          }
        }).then(_ref => {
          let {
            topic_list
          } = _ref;
          return topic_list.topics;
        });
      },
      itemHtml(assignedTopic) {
        return this.attach("quick-access-item", {
          icon: assignedTopic.assigned_to_group ? GROUP_ICON : ICON,
          href: (0, _utilities.postUrl)(assignedTopic.slug, assignedTopic.id, assignedTopic.last_read_post_number + 1),
          escapedContent: assignedTopic.fancy_title
        });
      }
    });
  }
});
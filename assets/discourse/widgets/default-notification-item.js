define("discourse/widgets/default-notification-item", ["exports", "discourse/lib/url", "discourse/lib/ajax", "discourse/lib/utilities", "I18n", "discourse/widgets/raw-html", "discourse/widgets/widget", "discourse/lib/text", "discourse-common/lib/get-url", "virtual-dom", "discourse-common/lib/icon-library", "@ember/utils", "discourse/lib/intercept-click", "discourse/lib/cookie"], function (_exports, _url, _ajax, _utilities, _I18n, _rawHtml, _widget, _text, _getUrl, _virtualDom, _iconLibrary, _utils, _interceptClick, _cookie) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.DefaultNotificationItem = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"discourse/lib/ajax",0,"discourse/lib/utilities",0,"I18n",0,"discourse/widgets/raw-html",0,"discourse/widgets/widget",0,"discourse/lib/text",0,"discourse-common/lib/get-url",0,"virtual-dom",0,"discourse-common/lib/icon-library",0,"@ember/utils",0,"discourse/lib/intercept-click",0,"discourse/lib/cookie"eaimeta@70e063a35619d71f
  const DefaultNotificationItem = (0, _widget.createWidget)("default-notification-item", {
    tagName: "li",
    buildClasses(attrs) {
      const classNames = [];
      if (attrs.get("read")) {
        classNames.push("read");
      }
      if (attrs.is_warning) {
        classNames.push("is-warning");
      }
      const notificationName = this.lookupNotificationName(attrs.notification_type);
      if (notificationName) {
        classNames.push(notificationName.replace(/_/g, "-"));
      }
      return classNames;
    },
    url(data) {
      const attrs = this.attrs;
      const badgeId = data.badge_id;
      if (badgeId) {
        let badgeSlug = data.badge_slug;
        if (!badgeSlug) {
          const badgeName = data.badge_name;
          badgeSlug = badgeName.replace(/[^A-Za-z0-9_]+/g, "-").toLowerCase();
        }
        let username = data.username;
        username = username ? "?username=" + username.toLowerCase() : "";
        return (0, _getUrl.default)("/badges/" + badgeId + "/" + badgeSlug + username);
      }
      const topicId = attrs.topic_id;
      if (topicId) {
        return (0, _utilities.postUrl)(attrs.slug, topicId, attrs.post_number);
      }
      if (data.group_id) {
        return (0, _url.userPath)(data.username + "/messages/group/" + data.group_name);
      }
      if (data.bookmarkable_url) {
        return (0, _getUrl.default)(data.bookmarkable_url);
      }
    },
    description(data) {
      const badgeName = data.badge_name;
      if (badgeName) {
        return (0, _utilities.escapeExpression)(badgeName);
      }
      const groupName = data.group_name;
      if (groupName) {
        if (this.attrs.fancy_title) {
          if (this.attrs.topic_id) {
            return `<span class="mention-group notify">@${groupName}</span><span data-topic-id="${this.attrs.topic_id}"> ${this.attrs.fancy_title}</span>`;
          }
          return `<span class="mention-group notify">@${groupName}</span> ${this.attrs.fancy_title}`;
        }
      }
      if (this.attrs.fancy_title) {
        if (this.attrs.topic_id) {
          return `<span data-topic-id="${this.attrs.topic_id}">${this.attrs.fancy_title}</span>`;
        }
        return this.attrs.fancy_title;
      }
      const description = data.topic_title || data.title;
      return (0, _utils.isEmpty)(description) ? "" : (0, _utilities.escapeExpression)(description);
    },
    text(notificationName, data) {
      const username = (0, _utilities.formatUsername)(data.display_username);
      const description = this.description(data, notificationName);
      return _I18n.default.t(`notifications.${notificationName}`, {
        description,
        username
      });
    },
    icon(notificationName) {
      return (0, _iconLibrary.iconNode)(`notification.${notificationName}`);
    },
    _addA11yAttrsTo(icon, notificationName) {
      icon.properties.attributes["aria-label"] = _I18n.default.t(`notifications.titles.${notificationName}`);
      icon.properties.attributes["aria-hidden"] = false;
      icon.properties.attributes["role"] = "img";
      return icon;
    },
    notificationTitle(notificationName) {
      if (notificationName) {
        return _I18n.default.t(`notifications.titles.${notificationName}`);
      } else {
        return "";
      }
    },
    lookupNotificationName(notificationType) {
      const lookup = this.site.get("notificationLookup");
      return lookup[notificationType];
    },
    html(attrs) {
      const notificationName = this.lookupNotificationName(attrs.notification_type);
      let {
        data
      } = attrs;
      let text = (0, _text.emojiUnescape)(this.text(notificationName, data));
      let icon = this.icon(notificationName, data);
      this._addA11yAttrsTo(icon, notificationName);
      const title = this.notificationTitle(notificationName, data);

      // We can use a `<p>` tag here once other languages have fixed their HTML
      // translations.
      let html = new _rawHtml.default({
        html: `<div>${text}</div>`
      });
      let contents = [icon, html];
      const href = this.url(data);
      return href ? (0, _virtualDom.h)("a", {
        attributes: {
          href,
          title,
          "data-auto-route": true
        }
      }, contents) : contents;
    },
    click(e) {
      this.attrs.set("read", true);
      const id = this.attrs.id;
      (0, _ajax.setTransientHeader)("Discourse-Clear-Notifications", id);
      (0, _cookie.default)("cn", id, {
        path: (0, _getUrl.default)("/")
      });
      if ((0, _interceptClick.wantsNewWindow)(e)) {
        return;
      }
      e.preventDefault();
      this.sendWidgetEvent("linkClicked");
      if (this.attrs.data.revision_number) {
        this.appEvents.trigger("edit-notification:clicked", {
          topicId: this.attrs.topic_id,
          postNumber: this.attrs.post_number,
          revisionNumber: this.attrs.data.revision_number
        });
      }
      _url.default.routeTo(this.url(this.attrs.data));
    },
    mouseUp(event) {
      // dismiss notification on middle click
      if (event.which === 2 && !this.attrs.read) {
        this.attrs.set("read", true);
        (0, _ajax.ajax)("/notifications/mark-read", {
          method: "PUT",
          data: {
            id: this.attrs.id
          }
        });
      }
    }
  });
  _exports.DefaultNotificationItem = DefaultNotificationItem;
});
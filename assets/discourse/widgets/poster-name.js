define("discourse/widgets/poster-name", ["exports", "discourse/widgets/widget", "I18n", "discourse/lib/utilities", "discourse-common/lib/get-url", "virtual-dom", "discourse-common/lib/icon-library", "discourse/lib/settings"], function (_exports, _widget, _I18n, _utilities, _getUrl, _virtualDom, _iconLibrary, _settings) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.disableNameSuppression = disableNameSuppression;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/widget",0,"I18n",0,"discourse/lib/utilities",0,"discourse-common/lib/get-url",0,"virtual-dom",0,"discourse-common/lib/icon-library",0,"discourse/lib/settings"eaimeta@70e063a35619d71f
  let sanitizeName = function (name) {
    return name.toLowerCase().replace(/[\s\._-]/g, "");
  };
  function disableNameSuppression() {
    sanitizeName = name => name;
  }
  (0, _widget.createWidget)("poster-name-title", {
    tagName: "span.user-title",
    buildClasses(attrs) {
      let classNames = [];
      classNames.push(attrs.title);
      if (attrs.titleIsGroup) {
        classNames.push(attrs.primaryGroupName);
      }
      classNames = classNames.map(className => `user-title--${className.replace(/\s+/g, "-").toLowerCase()}`);
      return classNames;
    },
    html(attrs) {
      let titleContents = attrs.title;
      if (attrs.primaryGroupName && attrs.titleIsGroup) {
        const href = (0, _getUrl.default)(`/g/${attrs.primaryGroupName}`);
        titleContents = (0, _virtualDom.h)("a.user-group", {
          className: attrs.extraClasses,
          attributes: {
            href,
            "data-group-card": attrs.primaryGroupName
          }
        }, attrs.title);
      }
      return titleContents;
    }
  });
  var _default = (0, _widget.createWidget)("poster-name", {
    tagName: "div.names.trigger-user-card",
    settings: {
      showNameAndGroup: true,
      showGlyph: true
    },
    didRenderWidget() {
      if (this.attrs.user) {
        this.attrs.user.trackStatus();
        this.attrs.user.on("status-changed", this, "scheduleRerender");
      }
    },
    willRerenderWidget() {
      if (this.attrs.user) {
        this.attrs.user.off("status-changed", this, "scheduleRerender");
        this.attrs.user.stopTrackingStatus();
      }
    },
    // TODO: Allow extensibility
    posterGlyph(attrs) {
      if (attrs.moderator || attrs.groupModerator) {
        return (0, _iconLibrary.iconNode)("shield-alt", {
          title: _I18n.default.t("user.moderator_tooltip")
        });
      }
    },
    userLink(attrs, text) {
      return (0, _virtualDom.h)("a", {
        attributes: {
          href: attrs.usernameUrl,
          "data-user-card": attrs.username,
          class: `${this.siteSettings.hide_user_profiles_from_public && !this.currentUser ? "non-clickable" : ""}`
        }
      }, (0, _utilities.formatUsername)(text));
    },
    html(attrs) {
      const username = attrs.username;
      const name = attrs.name;
      const nameFirst = this.siteSettings.display_name_on_posts && (0, _settings.prioritizeNameInUx)(name);
      const classNames = nameFirst ? ["first", "full-name"] : ["first", "username"];
      if (attrs.staff) {
        classNames.push("staff");
      }
      if (attrs.admin) {
        classNames.push("admin");
      }
      if (attrs.moderator) {
        classNames.push("moderator");
      }
      if (attrs.groupModerator) {
        classNames.push("category-moderator");
      }
      if (attrs.new_user) {
        classNames.push("new-user");
      }
      const primaryGroupName = attrs.primary_group_name;
      if (primaryGroupName && primaryGroupName.length) {
        classNames.push(`group--${primaryGroupName}`);
      }
      let nameContents = [this.userLink(attrs, nameFirst ? name : username)];
      if (this.settings.showGlyph) {
        const glyph = this.posterGlyph(attrs);
        if (glyph) {
          nameContents.push(glyph);
        }
      }
      const afterNameContents = (0, _widget.applyDecorators)(this, "after-name", attrs, this.state) || [];
      nameContents = nameContents.concat(afterNameContents);
      const contents = [(0, _virtualDom.h)("span", {
        className: classNames.join(" ")
      }, nameContents)];
      if (!this.settings.showNameAndGroup) {
        return contents;
      }
      if (name && this.siteSettings.display_name_on_posts && sanitizeName(name) !== sanitizeName(username)) {
        contents.push((0, _virtualDom.h)("span.second." + (nameFirst ? "username" : "full-name"), [this.userLink(attrs, nameFirst ? username : name)].concat(afterNameContents)));
      }
      const title = attrs.user_title,
        titleIsGroup = attrs.title_is_group;
      if (title && title.length) {
        contents.push(this.attach("poster-name-title", {
          title,
          primaryGroupName,
          titleIsGroup
        }));
      }
      if (this.siteSettings.enable_user_status) {
        this.addUserStatus(contents, attrs);
      }
      return contents;
    },
    addUserStatus(contents, attrs) {
      if (attrs.user && attrs.user.status) {
        contents.push(this.attach("post-user-status", attrs.user.status));
      }
    }
  });
  _exports.default = _default;
});
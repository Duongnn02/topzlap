define("discourse/widgets/header-topic-info", ["exports", "discourse/widgets/widget", "discourse/lib/url", "I18n", "discourse/widgets/raw-html", "discourse/widgets/post", "discourse-common/lib/get-url", "virtual-dom", "discourse-common/lib/icon-library", "discourse/lib/render-tags", "discourse/lib/render-topic-featured-link"], function (_exports, _widget, _url, _I18n, _rawHtml, _post, _getUrl, _virtualDom, _iconLibrary, _renderTags, _renderTopicFeaturedLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/widget",0,"discourse/lib/url",0,"I18n",0,"discourse/widgets/raw-html",0,"discourse/widgets/post",0,"discourse-common/lib/get-url",0,"virtual-dom",0,"discourse-common/lib/icon-library",0,"discourse/lib/render-tags",0,"discourse/lib/render-topic-featured-link"eaimeta@70e063a35619d71f
  (0, _widget.createWidget)("topic-header-participant", {
    tagName: "span",
    buildClasses(attrs) {
      return `trigger-${attrs.type}-card`;
    },
    html(attrs) {
      const {
        user,
        group
      } = attrs;
      let content, url;
      if (attrs.type === "user") {
        content = (0, _post.avatarImg)("tiny", {
          template: user.avatar_template,
          username: user.username
        });
        url = user.get("path");
      } else {
        content = [(0, _iconLibrary.iconNode)("users")];
        url = (0, _getUrl.default)(`/g/${group.name}`);
        content.push((0, _virtualDom.h)("span", group.name));
      }
      return (0, _virtualDom.h)("a.icon", {
        attributes: {
          href: url,
          "data-auto-route": true,
          title: attrs.username
        }
      }, content);
    },
    click(e) {
      this.appEvents.trigger(`topic-header:trigger-${this.attrs.type}-card`, this.attrs.username, e.target);
      e.preventDefault();
    }
  });
  var _default = (0, _widget.createWidget)("header-topic-info", {
    tagName: "div.extra-info-wrapper",
    contents: null,
    title: null,
    buildClasses(attrs, state) {
      this.buildAttributes(attrs, state);
      return this.containerClassName();
    },
    buildFancyTitleClass() {
      const baseClass = ["topic-link"];
      const flatten = array => [].concat.apply([], array);
      const extraClass = flatten((0, _widget.applyDecorators)(this, "fancyTitleClass", this.attrs, this.state));
      return baseClass.concat(extraClass).filter(Boolean).join(" ");
    },
    buildAttributes(attrs, state) {
      const topic = attrs.topic;
      const heading = [];
      const showPM = !topic.get("is_warning") && topic.get("isPrivateMessage");
      if (showPM) {
        const href = this.currentUser && this.currentUser.pmPath(topic);
        if (href) {
          heading.push((0, _virtualDom.h)("a.private-message-glyph-wrapper", {
            attributes: {
              href,
              "aria-label": _I18n.default.t("user.messages.inbox")
            }
          }, (0, _iconLibrary.iconNode)("envelope", {
            class: "private-message-glyph"
          })));
        }
      }
      const loaded = topic.get("details.loaded");
      const fancyTitle = topic.get("fancyTitle");
      const href = topic.get("url");
      if (fancyTitle && href) {
        heading.push(this.attach("topic-status", attrs));
        const titleHTML = new _rawHtml.default({
          html: `<span>${fancyTitle}</span>`
        });
        heading.push(this.attach("link", {
          className: this.buildFancyTitleClass(),
          action: "jumpToTopPost",
          href,
          attributes: {
            "data-topic-id": topic.get("id")
          },
          contents: () => titleHTML
        }));
      }
      this.headerElements = [(0, _virtualDom.h)("h1.header-title", heading)];
      const category = topic.get("category");
      if (loaded || category) {
        if (category && (!category.isUncategorizedCategory || !this.siteSettings.suppress_uncategorized_badge)) {
          const parentCategory = category.get("parentCategory");
          const categories = [];
          if (parentCategory) {
            if (this.siteSettings.max_category_nesting > 2 && !this.site.mobileView) {
              const grandParentCategory = parentCategory.get("parentCategory");
              if (grandParentCategory) {
                categories.push(this.attach("category-link", {
                  category: grandParentCategory
                }));
              }
            }
            categories.push(this.attach("category-link", {
              category: parentCategory
            }));
          }
          categories.push(this.attach("category-link", {
            category
          }));
          this.headerElements.push((0, _virtualDom.h)("div.categories-wrapper", categories));
        }
        let extra = [];
        const tags = (0, _renderTags.default)(topic);
        if (tags && tags.length > 0) {
          extra.push(new _rawHtml.default({
            html: tags
          }));
        }
        if (showPM) {
          const maxHeaderParticipants = extra.length > 0 ? 5 : 10;
          const participants = [];
          const topicDetails = topic.get("details");
          const totalParticipants = topicDetails.allowed_users.length + topicDetails.allowed_groups.length;
          topicDetails.allowed_users.some(user => {
            if (participants.length >= maxHeaderParticipants) {
              return true;
            }
            participants.push(this.attach("topic-header-participant", {
              type: "user",
              user,
              username: user.username
            }));
          });
          topicDetails.allowed_groups.some(group => {
            if (participants.length >= maxHeaderParticipants) {
              return true;
            }
            participants.push(this.attach("topic-header-participant", {
              type: "group",
              group,
              username: group.name
            }));
          });
          if (totalParticipants > maxHeaderParticipants) {
            const remaining = totalParticipants - maxHeaderParticipants;
            participants.push(this.attach("link", {
              className: "more-participants",
              action: "jumpToTopPost",
              href,
              attributes: {
                "data-topic-id": topic.get("id")
              },
              contents: () => `+${remaining}`
            }));
          }
          extra.push((0, _virtualDom.h)("div.topic-header-participants", participants));
        }
        extra = extra.concat((0, _widget.applyDecorators)(this, "after-tags", attrs, state));
        if (this.siteSettings.topic_featured_link_enabled) {
          const featured = (0, _renderTopicFeaturedLink.topicFeaturedLinkNode)(attrs.topic);
          if (featured) {
            extra.push(featured);
          }
        }
        if (extra.length) {
          this.headerElements.push((0, _virtualDom.h)("div.topic-header-extra", extra));
        }
      }
      this.contents = (0, _virtualDom.h)("div.title-wrapper", this.headerElements);
    },
    html() {
      return (0, _virtualDom.h)("div.extra-info", {
        className: this.containerClassName()
      }, this.contents);
    },
    containerClassName() {
      return this.headerElements.length > 1 ? "two-rows" : "";
    },
    jumpToTopPost() {
      const topic = this.attrs.topic;
      if (topic) {
        _url.default.routeTo(topic.get("firstPostUrl"), {
          keepFilter: true
        });
      }
    }
  });
  _exports.default = _default;
});
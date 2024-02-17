define("discourse/widgets/topic-map", ["exports", "discourse/widgets/post", "discourse/helpers/node", "I18n", "discourse/widgets/widget", "virtual-dom", "discourse/widgets/emoji", "discourse/lib/avatar-flair", "discourse/lib/url"], function (_exports, _post, _node, _I18n, _widget, _virtualDom, _emoji, _avatarFlair, _url) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addTopicParticipantClassesCallback = addTopicParticipantClassesCallback;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/post",0,"discourse/helpers/node",0,"I18n",0,"discourse/widgets/widget",0,"virtual-dom",0,"discourse/widgets/emoji",0,"discourse/lib/avatar-flair",0,"discourse/lib/url"eaimeta@70e063a35619d71f
  const LINKS_SHOWN = 5;
  function renderParticipants(userFilters, participants) {
    if (!participants) {
      return;
    }
    userFilters = userFilters || [];
    return participants.map(p => {
      return this.attach("topic-participant", p, {
        state: {
          toggled: userFilters.includes(p.username)
        }
      });
    });
  }
  (0, _widget.createWidget)("topic-map-show-links", {
    tagName: "div.link-summary",
    html() {
      return (0, _virtualDom.h)("span", this.attach("button", {
        title: "topic_map.links_shown",
        icon: "chevron-down",
        action: "showLinks",
        className: "btn"
      }));
    },
    showLinks() {
      this.sendWidgetAction("showAllLinks");
    }
  });
  let addTopicParticipantClassesCallbacks = null;
  function addTopicParticipantClassesCallback(callback) {
    addTopicParticipantClassesCallbacks = addTopicParticipantClassesCallbacks || [];
    addTopicParticipantClassesCallbacks.push(callback);
  }
  (0, _widget.createWidget)("topic-participant", {
    buildClasses(attrs) {
      const classNames = [];
      if (attrs.primary_group_name) {
        classNames.push(`group-${attrs.primary_group_name}`);
      }
      if (addTopicParticipantClassesCallbacks) {
        for (let i = 0; i < addTopicParticipantClassesCallbacks.length; i++) {
          let pluginClasses = addTopicParticipantClassesCallbacks[i].call(this, attrs);
          if (pluginClasses) {
            classNames.push.apply(classNames, pluginClasses);
          }
        }
      }
      return classNames;
    },
    html(attrs, state) {
      const linkContents = [(0, _post.avatarImg)("medium", {
        username: attrs.username,
        template: attrs.avatar_template,
        name: attrs.name
      })];
      if (attrs.post_count > 1) {
        linkContents.push((0, _virtualDom.h)("span.post-count", attrs.post_count.toString()));
      }
      if (attrs.flair_group_id) {
        if (attrs.flair_url || attrs.flair_bg_color) {
          linkContents.push(this.attach("avatar-flair", attrs));
        } else {
          const autoFlairAttrs = (0, _avatarFlair.default)(this.site, attrs);
          if (autoFlairAttrs) {
            linkContents.push(this.attach("avatar-flair", autoFlairAttrs));
          }
        }
      }
      return (0, _virtualDom.h)("a.poster.trigger-user-card", {
        className: state.toggled ? "toggled" : null,
        attributes: {
          title: attrs.username,
          "data-user-card": attrs.username,
          href: (0, _url.userPath)(attrs.username)
        }
      }, linkContents);
    }
  });
  (0, _widget.createWidget)("topic-map-summary", {
    tagName: "section.map",
    buildClasses(attrs, state) {
      if (state.collapsed) {
        return "map-collapsed";
      }
    },
    html(attrs, state) {
      const contents = [];
      contents.push((0, _virtualDom.h)("li.created-at", [(0, _virtualDom.h)("h4", {
        attributes: {
          role: "presentation"
        }
      }, _I18n.default.t("created_lowercase")), (0, _virtualDom.h)("div.topic-map-post.created-at", [(0, _post.avatarFor)("tiny", {
        username: attrs.createdByUsername,
        template: attrs.createdByAvatarTemplate,
        name: attrs.createdByName
      }), (0, _node.dateNode)(attrs.topicCreatedAt)])]));
      contents.push((0, _virtualDom.h)("li.last-reply", (0, _virtualDom.h)("a", {
        attributes: {
          href: attrs.lastPostUrl
        }
      }, [(0, _virtualDom.h)("h4", {
        attributes: {
          role: "presentation"
        }
      }, _I18n.default.t("last_reply_lowercase")), (0, _virtualDom.h)("div.topic-map-post.last-reply", [(0, _post.avatarFor)("tiny", {
        username: attrs.lastPostUsername,
        template: attrs.lastPostAvatarTemplate,
        name: attrs.lastPostName
      }), (0, _node.dateNode)(attrs.lastPostAt)])])));
      contents.push((0, _virtualDom.h)("li.replies", [(0, _node.numberNode)(attrs.topicReplyCount), (0, _virtualDom.h)("h4", {
        attributes: {
          role: "presentation"
        }
      }, _I18n.default.t("replies_lowercase", {
        count: attrs.topicReplyCount
      }).toString())]));
      contents.push((0, _virtualDom.h)("li.secondary.views", [(0, _node.numberNode)(attrs.topicViews, {
        className: attrs.topicViewsHeat
      }), (0, _virtualDom.h)("h4", {
        attributes: {
          role: "presentation"
        }
      }, _I18n.default.t("views_lowercase", {
        count: attrs.topicViews
      }).toString())]));
      if (attrs.participantCount > 0) {
        contents.push((0, _virtualDom.h)("li.secondary.users", [(0, _node.numberNode)(attrs.participantCount), (0, _virtualDom.h)("h4", {
          attributes: {
            role: "presentation"
          }
        }, _I18n.default.t("users_lowercase", {
          count: attrs.participantCount
        }).toString())]));
      }
      if (attrs.topicLikeCount) {
        contents.push((0, _virtualDom.h)("li.secondary.likes", [(0, _node.numberNode)(attrs.topicLikeCount), (0, _virtualDom.h)("h4", {
          attributes: {
            role: "presentation"
          }
        }, _I18n.default.t("likes_lowercase", {
          count: attrs.topicLikeCount
        }).toString())]));
      }
      if (attrs.topicLinkLength > 0) {
        contents.push((0, _virtualDom.h)("li.secondary.links", [(0, _node.numberNode)(attrs.topicLinkLength), (0, _virtualDom.h)("h4", {
          attributes: {
            role: "presentation"
          }
        }, _I18n.default.t("links_lowercase", {
          count: attrs.topicLinkLength
        }).toString())]));
      }
      if (state.collapsed && attrs.topicPostsCount > 2 && attrs.participants && attrs.participants.length > 0) {
        const participants = renderParticipants.call(this, attrs.userFilters, attrs.participants.slice(0, 3));
        contents.push((0, _virtualDom.h)("li.avatars", participants));
      }
      const nav = (0, _virtualDom.h)("nav.buttons", this.attach("button", {
        title: state.collapsed ? "topic.expand_details" : "topic.collapse_details",
        icon: state.collapsed ? "chevron-down" : "chevron-up",
        ariaExpanded: state.collapsed ? "false" : "true",
        ariaControls: "topic-map-expanded",
        action: "toggleMap",
        className: "btn"
      }));
      return [nav, (0, _virtualDom.h)("ul.clearfix", contents)];
    }
  });
  (0, _widget.createWidget)("topic-map-link", {
    tagName: "a.topic-link.track-link",
    buildClasses(attrs) {
      if (attrs.attachment) {
        return "attachment";
      }
    },
    buildAttributes(attrs) {
      return {
        href: attrs.url,
        target: "_blank",
        "data-user-id": attrs.user_id,
        "data-ignore-post-id": "true",
        title: attrs.url,
        rel: "nofollow ugc noopener"
      };
    },
    html(attrs) {
      let content = attrs.title || attrs.url;
      const truncateLength = 85;
      if (content.length > truncateLength) {
        content = `${content.slice(0, truncateLength).trim()}...`;
      }
      return attrs.title ? (0, _emoji.replaceEmoji)(content) : content;
    }
  });
  (0, _widget.createWidget)("topic-map-expanded", {
    tagName: "section.topic-map-expanded#topic-map-expanded",
    buildKey: attrs => `topic-map-expanded-${attrs.id}`,
    defaultState() {
      return {
        allLinksShown: false
      };
    },
    html(attrs, state) {
      let avatars;
      if (attrs.participants && attrs.participants.length > 0) {
        avatars = (0, _virtualDom.h)("section.avatars.clearfix", [(0, _virtualDom.h)("h3", _I18n.default.t("topic_map.participants_title")), renderParticipants.call(this, attrs.userFilters, attrs.participants)]);
      }
      const result = [avatars];
      if (attrs.topicLinks) {
        const toShow = state.allLinksShown ? attrs.topicLinks : attrs.topicLinks.slice(0, LINKS_SHOWN);
        const links = toShow.map(l => {
          let host = "";
          if (l.title && l.title.length) {
            const rootDomain = l.root_domain;
            if (rootDomain && rootDomain.length) {
              host = (0, _virtualDom.h)("span.domain", rootDomain);
            }
          }
          return (0, _virtualDom.h)("tr", [(0, _virtualDom.h)("td", (0, _virtualDom.h)("span.badge.badge-notification.clicks", {
            attributes: {
              title: _I18n.default.t("topic_map.clicks", {
                count: l.clicks
              })
            }
          }, l.clicks.toString())), (0, _virtualDom.h)("td", [this.attach("topic-map-link", l), " ", host])]);
        });
        const showAllLinksContent = [(0, _virtualDom.h)("h3", _I18n.default.t("topic_map.links_title")), (0, _virtualDom.h)("table.topic-links", links)];
        if (!state.allLinksShown && links.length < attrs.topicLinks.length) {
          showAllLinksContent.push(this.attach("topic-map-show-links"));
        }
        const section = (0, _virtualDom.h)("section.links", showAllLinksContent);
        result.push(section);
      }
      return result;
    },
    showAllLinks() {
      this.state.allLinksShown = true;
    }
  });
  var _default = (0, _widget.createWidget)("topic-map", {
    tagName: "div.topic-map",
    buildKey: attrs => `topic-map-${attrs.id}`,
    defaultState(attrs) {
      return {
        collapsed: !attrs.hasTopicSummary
      };
    },
    html(attrs, state) {
      const contents = [this.attach("topic-map-summary", attrs, {
        state
      })];
      if (!state.collapsed) {
        contents.push(this.attach("topic-map-expanded", attrs));
      }
      if (attrs.hasTopicSummary) {
        contents.push(this.attach("toggle-topic-summary", attrs));
      }
      if (attrs.showPMMap) {
        contents.push(this.attach("private-message-map", attrs));
      }
      return contents;
    },
    toggleMap() {
      this.state.collapsed = !this.state.collapsed;
    }
  });
  _exports.default = _default;
});
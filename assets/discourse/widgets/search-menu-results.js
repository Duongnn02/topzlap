define("discourse/widgets/search-menu-results", ["exports", "discourse/lib/utilities", "discourse-common/lib/object", "I18n", "discourse/widgets/raw-html", "discourse/widgets/post", "discourse/widgets/widget", "discourse/helpers/node", "discourse/lib/text", "discourse-common/lib/get-url", "virtual-dom", "discourse/lib/highlight-search", "discourse-common/lib/icon-library", "discourse/lib/render-tag", "discourse/widgets/search-menu", "discourse/models/user"], function (_exports, _utilities, _object, _I18n, _rawHtml, _post, _widget, _node, _text, _getUrl, _virtualDom, _highlightSearch, _iconLibrary, _renderTag, _searchMenu, _user) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addQuickSearchRandomTip = addQuickSearchRandomTip;
  _exports.addSearchSuggestion = addSearchSuggestion;
  _exports.resetQuickSearchRandomTips = resetQuickSearchRandomTips;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/utilities",0,"discourse-common/lib/object",0,"I18n",0,"discourse/widgets/raw-html",0,"discourse/widgets/post",0,"discourse/widgets/widget",0,"discourse/helpers/node",0,"discourse/lib/text",0,"discourse-common/lib/get-url",0,"virtual-dom",0,"discourse/widgets/hbs-compiler",0,"discourse/lib/highlight-search",0,"discourse-common/lib/icon-library",0,"discourse/lib/render-tag",0,"discourse/widgets/search-menu",0,"discourse/models/user"eaimeta@70e063a35619d71f
  const suggestionShortcuts = ["in:title", "in:pinned", "status:open", "status:closed", "status:public", "status:noreplies", "order:latest", "order:views", "order:likes", "order:latest_topic"];
  const DEFAULT_QUICK_TIPS = [{
    label: "#",
    description: _I18n.default.t("search.tips.category_tag"),
    clickable: true
  }, {
    label: "@",
    description: _I18n.default.t("search.tips.author"),
    clickable: true
  }, {
    label: "in:",
    description: _I18n.default.t("search.tips.in"),
    clickable: true
  }, {
    label: "status:",
    description: _I18n.default.t("search.tips.status"),
    clickable: true
  }, {
    label: _I18n.default.t("search.tips.full_search_key", {
      modifier: "Ctrl"
    }),
    description: _I18n.default.t("search.tips.full_search")
  }, {
    label: "@me",
    description: _I18n.default.t("search.tips.me")
  }];
  let QUICK_TIPS = [];
  function addSearchSuggestion(value) {
    if (!suggestionShortcuts.includes(value)) {
      suggestionShortcuts.push(value);
    }
  }
  function addQuickSearchRandomTip(tip) {
    if (!QUICK_TIPS.includes(tip)) {
      QUICK_TIPS.push(tip);
    }
  }
  function resetQuickSearchRandomTips() {
    QUICK_TIPS = [].concat(DEFAULT_QUICK_TIPS);
  }
  resetQuickSearchRandomTips();
  class Highlighted extends _rawHtml.default {
    constructor(html, term) {
      super({
        html: `<span>${html}</span>`
      });
      this.term = term;
    }
    decorate($html) {
      (0, _highlightSearch.default)($html[0], this.term);
    }
  }
  function createSearchResult(_ref2) {
    let {
      type,
      linkField,
      builder
    } = _ref2;
    return (0, _widget.createWidget)(`search-result-${type}`, {
      tagName: "ul.list",
      buildAttributes() {
        return {
          "aria-label": `${type} ${_I18n.default.t("search.results")}`
        };
      },
      html(attrs) {
        return attrs.results.map(r => {
          let searchResultId;
          if (type === "topic") {
            searchResultId = r.topic_id;
          } else {
            searchResultId = r.id;
          }
          return (0, _virtualDom.h)("li.item", this.attach("link", {
            href: r[linkField],
            contents: () => builder.call(this, r, attrs.term),
            className: "search-link",
            searchResultId,
            searchResultType: type,
            searchLogId: attrs.searchLogId
          }));
        });
      }
    });
  }
  function postResult(result, link, term) {
    const html = [link];
    if (!this.site.mobileView) {
      html.push((0, _virtualDom.h)("span.blurb", [(0, _node.dateNode)(result.created_at), (0, _virtualDom.h)("span", " - "), this.siteSettings.use_pg_headlines_for_excerpt ? new _rawHtml.default({
        html: `<span>${result.blurb}</span>`
      }) : new Highlighted(result.blurb, term)]));
    }
    return html;
  }
  createSearchResult({
    type: "tag",
    linkField: "url",
    builder(t) {
      const tag = (0, _utilities.escapeExpression)(t.id);
      return [(0, _iconLibrary.iconNode)("tag"), new _rawHtml.default({
        html: (0, _renderTag.default)(tag, {
          tagName: "span"
        })
      })];
    }
  });
  createSearchResult({
    type: "category",
    linkField: "url",
    builder(c) {
      return this.attach("category-link", {
        category: c,
        link: false
      });
    }
  });
  createSearchResult({
    type: "group",
    linkField: "url",
    builder(group) {
      const fullName = (0, _utilities.escapeExpression)(group.fullName);
      const name = (0, _utilities.escapeExpression)(group.name);
      const groupNames = [(0, _virtualDom.h)("span.name", fullName || name)];
      if (fullName) {
        groupNames.push((0, _virtualDom.h)("span.slug", name));
      }
      let avatarFlair;
      if (group.flairUrl) {
        avatarFlair = this.attach("avatar-flair", {
          flair_name: name,
          flair_url: group.flairUrl,
          flair_bg_color: group.flairBgColor,
          flair_color: group.flairColor
        });
      } else {
        avatarFlair = (0, _iconLibrary.iconNode)("users");
      }
      const groupResultContents = [avatarFlair, (0, _virtualDom.h)("div.group-names", groupNames)];
      return (0, _virtualDom.h)("div.group-result", groupResultContents);
    }
  });
  createSearchResult({
    type: "user",
    linkField: "path",
    builder(u) {
      const userTitles = [];
      if (u.name) {
        userTitles.push((0, _virtualDom.h)("span.name", u.name));
      }
      userTitles.push((0, _virtualDom.h)("span.username", (0, _utilities.formatUsername)(u.username)));
      if (u.custom_data) {
        u.custom_data.forEach(row => userTitles.push((0, _virtualDom.h)("span.custom-field", `${row.name}: ${row.value}`)));
      }
      const userResultContents = [(0, _post.avatarImg)("small", {
        template: u.avatar_template,
        username: u.username
      }), (0, _virtualDom.h)("div.user-titles", userTitles)];
      return (0, _virtualDom.h)("div.user-result", userResultContents);
    }
  });
  createSearchResult({
    type: "topic",
    linkField: "url",
    builder(result, term) {
      const topic = result.topic;
      const firstLine = [this.attach("topic-status", {
        topic,
        disableActions: true
      }), (0, _virtualDom.h)("span.topic-title", {
        attributes: {
          "data-topic-id": topic.id
        }
      }, this.siteSettings.use_pg_headlines_for_excerpt && result.topic_title_headline ? new _rawHtml.default({
        html: `<span>${(0, _text.emojiUnescape)(result.topic_title_headline)}</span>`
      }) : new Highlighted(topic.fancyTitle, term))];
      const secondLine = [this.attach("category-link", {
        category: topic.category,
        link: false
      })];
      if (this.siteSettings.tagging_enabled) {
        secondLine.push(this.attach("discourse-tags", {
          topic,
          tagName: "span"
        }));
      }
      const link = (0, _virtualDom.h)("span.topic", [(0, _virtualDom.h)("span.first-line", firstLine), (0, _virtualDom.h)("span.second-line", secondLine)]);
      return postResult.call(this, result, link, term);
    }
  });
  createSearchResult({
    type: "post",
    linkField: "url",
    builder(result, term) {
      return postResult.call(this, result, _I18n.default.t("search.post_format", result), term);
    }
  });
  (0, _widget.createWidget)("search-menu-results", {
    tagName: "div.results",
    html(attrs) {
      const {
        term,
        suggestionKeyword,
        results,
        searchTopics
      } = attrs;
      if (suggestionKeyword) {
        return this.attach("search-menu-assistant", {
          term,
          suggestionKeyword,
          results: attrs.suggestionResults || []
        });
      }
      if (searchTopics && attrs.invalidTerm) {
        return (0, _virtualDom.h)("div.no-results", _I18n.default.t("search.too_short"));
      }
      if (searchTopics && attrs.noResults) {
        return (0, _virtualDom.h)("div.no-results", _I18n.default.t("search.no_results"));
      }
      if (!term && !attrs.inPMInboxContext) {
        return this.attach("search-menu-initial-options", {
          term
        });
      }
      const resultTypes = results.resultTypes || [];
      const mainResultsContent = [];
      const usersAndGroups = [];
      const categoriesAndTags = [];
      const buildMoreNode = result => {
        const moreArgs = {
          className: "filter search-link",
          contents: () => [_I18n.default.t("more"), "..."]
        };
        if (result.moreUrl) {
          return this.attach("link", (0, _object.deepMerge)(moreArgs, {
            href: result.moreUrl
          }));
        } else if (result.more) {
          return this.attach("link", (0, _object.deepMerge)(moreArgs, {
            action: "moreOfType",
            actionParam: result.type
          }));
        }
      };
      const assignContainer = (result, node) => {
        if (searchTopics) {
          if (["topic"].includes(result.type)) {
            mainResultsContent.push(node);
          }
        } else {
          if (["user", "group"].includes(result.type)) {
            usersAndGroups.push(node);
          }
          if (["category", "tag"].includes(result.type)) {
            categoriesAndTags.push(node);
          }
        }
      };
      resultTypes.forEach(rt => {
        const resultNodeContents = [this.attach(rt.componentName, {
          searchLogId: attrs.results.grouped_search_result.search_log_id,
          results: rt.results,
          term
        })];
        if (["topic"].includes(rt.type)) {
          const more = buildMoreNode(rt);
          if (more) {
            resultNodeContents.push((0, _virtualDom.h)("div.search-menu__show-more", more));
          }
        }
        assignContainer(rt, (0, _virtualDom.h)(`div.${rt.componentName}`, resultNodeContents));
      });
      const content = [];
      if (!searchTopics) {
        if (!attrs.inPMInboxContext) {
          content.push(this.attach("search-menu-initial-options", {
            term
          }));
        }
      } else {
        if (mainResultsContent.length) {
          content.push(mainResultsContent);
        } else {
          return (0, _virtualDom.h)("div.no-results", _I18n.default.t("search.no_results"));
        }
      }
      content.push(categoriesAndTags);
      content.push(usersAndGroups);
      return content;
    }
  });
  (0, _widget.createWidget)("search-menu-assistant", {
    tagName: "ul.search-menu-assistant",
    buildKey: () => `search-menu-assistant`,
    services: ["router"],
    html(attrs) {
      if (this.currentUser) {
        addSearchSuggestion("in:likes");
        addSearchSuggestion("in:bookmarks");
        addSearchSuggestion("in:mine");
        addSearchSuggestion("in:messages");
        addSearchSuggestion("in:seen");
        addSearchSuggestion("in:tracking");
        addSearchSuggestion("in:unseen");
        addSearchSuggestion("in:watching");
      }
      if (this.siteSettings.tagging_enabled) {
        addSearchSuggestion("in:tagged");
        addSearchSuggestion("in:untagged");
      }
      const content = [];
      const {
        suggestionKeyword,
        term
      } = attrs;
      let prefix;
      if (suggestionKeyword !== "+") {
        prefix = term?.split(suggestionKeyword)[0].trim() || "";
        if (prefix.length) {
          prefix = `${prefix} `;
        }
      }
      switch (suggestionKeyword) {
        case "+":
          attrs.results.forEach(item => {
            if (item.additionalTags) {
              prefix = term?.split(" ").slice(0, -1).join(" ").trim() || "";
            } else {
              prefix = term?.split("#")[0].trim() || "";
            }
            if (prefix.length) {
              prefix = `${prefix} `;
            }
            content.push(this.attach("search-menu-assistant-item", {
              prefix,
              tag: item.tagName,
              additionalTags: item.additionalTags,
              category: item.category,
              slug: term,
              withInLabel: attrs.withInLabel,
              isIntersection: true
            }));
          });
          break;
        case "#":
          attrs.results.forEach(item => {
            if (item.model) {
              const fullSlug = item.model.parentCategory ? `#${item.model.parentCategory.slug}:${item.model.slug}` : `#${item.model.slug}`;
              content.push(this.attach("search-menu-assistant-item", {
                prefix,
                category: item.model,
                slug: `${prefix}${fullSlug}`,
                withInLabel: attrs.withInLabel
              }));
            } else {
              content.push(this.attach("search-menu-assistant-item", {
                prefix,
                tag: item.name,
                slug: `${prefix}#${item.name}`,
                withInLabel: attrs.withInLabel
              }));
            }
          });
          break;
        case "@":
          // when only one user matches while in topic
          // quick suggest user search in the topic or globally
          if (attrs.results.length === 1 && this.router.currentRouteName.startsWith("topic.")) {
            const user = attrs.results[0];
            content.push(this.attach("search-menu-assistant-item", {
              extraHint: _I18n.default.t("search.enter_hint"),
              prefix,
              user,
              slug: `${prefix}@${user.username}`,
              suffix: (0, _virtualDom.h)("span.label-suffix", ` ${_I18n.default.t("search.in_topics_posts")}`)
            }));
            content.push(this.attach("search-menu-assistant-item", {
              prefix,
              user,
              setTopicContext: true,
              slug: `${prefix}@${user.username}`,
              suffix: (0, _virtualDom.h)("span.label-suffix", ` ${_I18n.default.t("search.in_this_topic")}`)
            }));
          } else {
            attrs.results.forEach(user => {
              content.push(this.attach("search-menu-assistant-item", {
                prefix,
                user,
                slug: `${prefix}@${user.username}`
              }));
            });
          }
          break;
        default:
          suggestionShortcuts.forEach(item => {
            if (item.includes(suggestionKeyword) || !suggestionKeyword) {
              content.push(this.attach("search-menu-assistant-item", {
                slug: `${prefix}${item}`
              }));
            }
          });
          break;
      }
      return content.filter((c, i) => i <= 8);
    }
  });
  (0, _widget.createWidget)("search-menu-initial-options", {
    tagName: "ul.search-menu-initial-options",
    services: ["search"],
    html(attrs) {
      if (attrs.term?.match(_searchMenu.MODIFIER_REGEXP)) {
        return this.defaultRow(attrs.term);
      }
      const ctx = this.search.searchContext;
      const content = [];
      if (attrs.term || ctx) {
        if (attrs.term) {
          content.push(this.defaultRow(attrs.term, {
            withLabel: true
          }));
        }
        if (ctx) {
          const term = attrs.term || "";
          switch (ctx.type) {
            case "topic":
              content.push(this.attach("search-menu-assistant-item", {
                slug: term,
                setTopicContext: true,
                label: [(0, _virtualDom.h)("span", `${term} `), (0, _virtualDom.h)("span.label-suffix", _I18n.default.t("search.in_this_topic"))]
              }));
              break;
            case "private_messages":
              content.push(this.attach("search-menu-assistant-item", {
                slug: `${term} in:messages`
              }));
              break;
            case "category":
              const fullSlug = ctx.category.parentCategory ? `#${ctx.category.parentCategory.slug}:${ctx.category.slug}` : `#${ctx.category.slug}`;
              content.push(this.attach("search-menu-assistant", {
                term: `${term} ${fullSlug}`,
                suggestionKeyword: "#",
                results: [{
                  model: ctx.category
                }],
                withInLabel: true
              }));
              break;
            case "tag":
              content.push(this.attach("search-menu-assistant", {
                term: `${term} #${ctx.name}`,
                suggestionKeyword: "#",
                results: [{
                  name: ctx.name
                }],
                withInLabel: true
              }));
              break;
            case "tagIntersection":
              let tagTerm;
              if (ctx.additionalTags) {
                const tags = [ctx.tagId, ...ctx.additionalTags];
                tagTerm = `${term} tags:${tags.join("+")}`;
              } else {
                tagTerm = `${term} #${ctx.tagId}`;
              }
              let suggestionOptions = {
                tagName: ctx.tagId,
                additionalTags: ctx.additionalTags
              };
              if (ctx.category) {
                const categorySlug = ctx.category.parentCategory ? `#${ctx.category.parentCategory.slug}:${ctx.category.slug}` : `#${ctx.category.slug}`;
                suggestionOptions.categoryName = categorySlug;
                suggestionOptions.category = ctx.category;
                tagTerm = tagTerm + ` ${categorySlug}`;
              }
              content.push(this.attach("search-menu-assistant", {
                term: tagTerm,
                suggestionKeyword: "+",
                results: [suggestionOptions],
                withInLabel: true
              }));
              break;
            case "user":
              content.push(this.attach("search-menu-assistant-item", {
                slug: `${term} @${ctx.user.username}`,
                label: [(0, _virtualDom.h)("span", `${term} `), (0, _virtualDom.h)("span.label-suffix", _I18n.default.t("search.in_posts_by", {
                  username: ctx.user.username
                }))]
              }));
              break;
          }
        }
        return content;
      }
      if (content.length === 0) {
        content.push(this.attach("random-quick-tip"));
        if (this.currentUser && this.siteSettings.log_search_queries) {
          if (this.currentUser.recent_searches?.length) {
            content.push(this.attach("search-menu-recent-searches"));
          } else {
            this.loadRecentSearches();
          }
        }
      }
      return content;
    },
    defaultRow(term) {
      let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        withLabel: false
      };
      return this.attach("search-menu-assistant-item", {
        slug: term,
        extraHint: _I18n.default.t("search.enter_hint"),
        label: [(0, _virtualDom.h)("span.keyword", `${term}`), opts.withLabel ? (0, _virtualDom.h)("span.label-suffix", _I18n.default.t("search.in_topics_posts")) : null]
      });
    },
    refreshSearchMenuResults() {
      this.scheduleRerender();
    },
    loadRecentSearches() {
      _user.default.loadRecentSearches().then(result => {
        if (result.success && result.recent_searches?.length) {
          this.currentUser.set("recent_searches", Object.assign(result.recent_searches));
          this.scheduleRerender();
        }
      });
    }
  });
  (0, _widget.createWidget)("search-menu-assistant-item", {
    tagName: "li.search-menu-assistant-item",
    html(attrs) {
      const prefix = attrs.prefix?.trim();
      const attributes = {};
      attributes.href = "#";
      let content = [(0, _virtualDom.h)("span", {
        attributes: {
          "aria-label": _I18n.default.t("search.title")
        }
      }, (0, _iconLibrary.iconNode)(attrs.icon || "search"))];
      if (prefix) {
        content.push((0, _virtualDom.h)("span.search-item-prefix", `${prefix} `));
      }
      if (attrs.withInLabel) {
        content.push((0, _virtualDom.h)("span.label-suffix", `${_I18n.default.t("search.in")} `));
      }
      if (attrs.category) {
        attributes.href = attrs.category.url;
        content.push(this.attach("category-link", {
          category: attrs.category,
          allowUncategorized: true,
          recursive: true,
          link: false
        }));

        // category and tag combination
        if (attrs.tag && attrs.isIntersection) {
          attributes.href = (0, _getUrl.default)(`/tag/${attrs.tag}`);
          content.push((0, _virtualDom.h)("span.search-item-tag", [(0, _iconLibrary.iconNode)("tag"), attrs.tag]));
        }
      } else if (attrs.tag) {
        if (attrs.isIntersection && attrs.additionalTags?.length) {
          const tags = [attrs.tag, ...attrs.additionalTags];
          content.push((0, _virtualDom.h)("span.search-item-tag", `tags:${tags.join("+")}`));
        } else {
          attributes.href = (0, _getUrl.default)(`/tag/${attrs.tag}`);
          content.push((0, _virtualDom.h)("span.search-item-tag", [(0, _iconLibrary.iconNode)("tag"), attrs.tag]));
        }
      } else if (attrs.user) {
        const userResult = [(0, _post.avatarImg)("small", {
          template: attrs.user.avatar_template,
          username: attrs.user.username
        }), (0, _virtualDom.h)("span.username", (0, _utilities.formatUsername)(attrs.user.username)), attrs.suffix];
        content.push((0, _virtualDom.h)("span.search-item-user", userResult));
      } else {
        content.push((0, _virtualDom.h)("span.search-item-slug", attrs.label || attrs.slug));
      }
      if (attrs.extraHint) {
        content.push((0, _virtualDom.h)("span.extra-hint", attrs.extraHint));
      }
      return (0, _virtualDom.h)("a.widget-link.search-link", {
        attributes
      }, content);
    },
    click(e) {
      const searchInput = document.querySelector("#search-term");
      searchInput.value = this.attrs.slug;
      searchInput.focus();
      this.sendWidgetAction("triggerAutocomplete", {
        value: this.attrs.slug,
        searchTopics: true,
        setTopicContext: this.attrs.setTopicContext
      });
      e.preventDefault();
      return false;
    }
  });
  (0, _widget.createWidget)("random-quick-tip", {
    tagName: "li.search-random-quick-tip",
    buildKey: () => "random-quick-tip",
    defaultState() {
      return QUICK_TIPS[Math.floor(Math.random() * QUICK_TIPS.length)];
    },
    html(attrs, state) {
      return [(0, _virtualDom.h)(`span.tip-label${state.clickable ? ".tip-clickable" : ""}`, state.label), (0, _virtualDom.h)("span.tip-description", state.description)];
    },
    click(e) {
      if (e.target.classList.contains("tip-clickable")) {
        const searchInput = document.querySelector("#search-term");
        searchInput.value = this.state.label;
        searchInput.focus();
        this.sendWidgetAction("triggerAutocomplete", {
          value: this.state.label,
          searchTopics: this.state.searchTopics
        });
      }
    }
  });
  (0, _widget.createWidget)("search-menu-recent-searches", {
    tagName: "div.search-menu-recent",
    template: function (attrs, state) {
      var _r = [];
      _r.push("\n    ");
      var _a0 = [];
      _a0.push("\n      ");
      var _a1 = [];
      _a1.push(_I18n.default.t("search.recent"));
      _a0.push(virtualDom.h('h4', _a1));
      _a0.push("\n      ");
      _a0.push(this.attach("flat-button", {
        "className": "clear-recent-searches",
        "title": "search.clear_recent",
        "icon": "times",
        "action": "clearRecent"
      }));
      _a0.push("\n    ");
      _r.push(virtualDom.h('div', {
        "className": "heading",
        "attributes": {}
      }, _a0));
      _r.push("\n\n");
      if (this.currentUser.recent_searches && this.currentUser.recent_searches.length) {
        this.currentUser.recent_searches.forEach(slug => {
          _r.push("      ");
          _r.push(this.attach("search-menu-assistant-item", {
            "slug": slug,
            "icon": "history"
          }, undefined, undefined));
          _r.push("\n");
        });
      }
      _r.push("  ");
      return _r;
    },
    clearRecent() {
      return _user.default.resetRecentSearches().then(result => {
        if (result.success) {
          this.currentUser.recent_searches.clear();
          this.sendWidgetAction("refreshSearchMenuResults");
        }
      });
    }
  });
});
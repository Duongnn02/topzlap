define("discourse/lib/search", ["exports", "discourse/models/category", "@ember/object", "I18n", "rsvp", "discourse/models/post", "discourse/models/topic", "discourse/models/user", "discourse/lib/ajax", "discourse-common/lib/object", "discourse/lib/text", "discourse/lib/utilities", "discourse-common/lib/raw-templates", "discourse-common/lib/get-url", "@ember/utils", "discourse/lib/category-tag-search", "discourse/lib/url", "discourse/lib/user-search"], function (_exports, _category, _object, _I18n, _rsvp, _post, _topic, _user, _ajax, _object2, _text, _utilities, _rawTemplates, _getUrl, _utils, _categoryTagSearch, _url, _userSearch) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addSearchResultsCallback = addSearchResultsCallback;
  _exports.applySearchAutocomplete = applySearchAutocomplete;
  _exports.getSearchKey = getSearchKey;
  _exports.isValidSearchTerm = isValidSearchTerm;
  _exports.logSearchLinkClick = logSearchLinkClick;
  _exports.searchContextDescription = searchContextDescription;
  _exports.searchForTerm = searchForTerm;
  _exports.translateResults = translateResults;
  _exports.updateRecentSearches = updateRecentSearches;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/category",0,"@ember/object",0,"I18n",0,"rsvp",0,"discourse/models/post",0,"discourse/models/topic",0,"discourse/models/user",0,"discourse/lib/ajax",0,"discourse-common/lib/object",0,"discourse/lib/text",0,"discourse/lib/utilities",0,"discourse-common/lib/raw-templates",0,"discourse-common/lib/get-url",0,"@ember/utils",0,"discourse/lib/category-tag-search",0,"discourse/lib/url",0,"discourse/lib/user-search"eaimeta@70e063a35619d71f
  const translateResultsCallbacks = [];
  const MAX_RECENT_SEARCHES = 5; // should match backend constant with the same name

  function addSearchResultsCallback(callback) {
    translateResultsCallbacks.push(callback);
  }
  function translateResults(results, opts) {
    opts = opts || {};
    results.topics = results.topics || [];
    results.users = results.users || [];
    results.posts = results.posts || [];
    results.categories = results.categories || [];
    results.tags = results.tags || [];
    results.groups = results.groups || [];
    const topicMap = {};
    results.topics = results.topics.map(function (topic) {
      topic = _topic.default.create(topic);
      topicMap[topic.id] = topic;
      return topic;
    });
    results.posts = results.posts.map(post => {
      if (post.username) {
        post.userPath = (0, _url.userPath)(post.username.toLowerCase());
      }
      post = _post.default.create(post);
      post.set("topic", topicMap[post.topic_id]);
      post.blurb = (0, _text.emojiUnescape)(post.blurb);
      return post;
    });
    results.users = results.users.map(function (user) {
      return _user.default.create(user);
    });
    results.categories = results.categories.map(function (category) {
      return _category.default.list().findBy("id", category.id || category.model.id);
    }).compact();
    results.groups = results.groups.map(group => {
      const name = (0, _utilities.escapeExpression)(group.name);
      const fullName = (0, _utilities.escapeExpression)(group.full_name || group.display_name);
      const flairUrl = (0, _utils.isEmpty)(group.flair_url) ? null : (0, _utilities.escapeExpression)(group.flair_url);
      const flairColor = (0, _utilities.escapeExpression)(group.flair_color);
      const flairBgColor = (0, _utilities.escapeExpression)(group.flair_bg_color);
      return {
        id: group.id,
        flairUrl,
        flairColor,
        flairBgColor,
        fullName,
        name,
        url: (0, _getUrl.default)(`/g/${name}`)
      };
    }).compact();
    results.tags = results.tags.map(function (tag) {
      const tagName = (0, _utilities.escapeExpression)(tag.name);
      return _object.default.create({
        id: tagName,
        url: (0, _getUrl.default)("/tag/" + tagName)
      });
    }).compact();
    return translateResultsCallbacks.reduce((promise, callback) => promise.then(r => callback(r)), _rsvp.Promise.resolve(results)).then(results_ => {
      translateGroupedSearchResults(results_, opts);
      return _object.default.create(results_);
    });
  }
  function translateGroupedSearchResults(results, opts) {
    results.resultTypes = [];
    const groupedSearchResult = results.grouped_search_result;
    if (groupedSearchResult) {
      [["topic", "posts"], ["user", "users"], ["group", "groups"], ["category", "categories"], ["tag", "tags"]].forEach(function (pair) {
        const type = pair[0];
        const name = pair[1];
        if (results[name].length > 0) {
          const componentName = opts.searchContext?.type === "topic" && type === "topic" ? "post" : type;
          const result = {
            results: results[name],
            componentName: `search-result-${componentName}`,
            type,
            more: groupedSearchResult[`more_${name}`]
          };
          if (result.more && componentName === "topic" && opts.fullSearchUrl) {
            result.more = false;
            result.moreUrl = opts.fullSearchUrl;
          }
          results.resultTypes.push(result);
        }
      });
    }
  }
  function searchForTerm(term, opts) {
    if (!opts) {
      opts = {};
    }

    // Only include the data we have
    const data = {
      term
    };
    if (opts.typeFilter) {
      data.type_filter = opts.typeFilter;
    }
    if (opts.searchForId) {
      data.search_for_id = true;
    }
    if (opts.restrictToArchetype) {
      data.restrict_to_archetype = opts.restrictToArchetype;
    }
    if (opts.searchContext) {
      data.search_context = {
        type: opts.searchContext.type,
        id: opts.searchContext.id,
        name: opts.searchContext.name
      };
    }
    let ajaxPromise = (0, _ajax.ajax)("/search/query", {
      data
    });
    const promise = ajaxPromise.then(res => translateResults(res, opts));
    promise.abort = ajaxPromise.abort;
    return promise;
  }
  function searchContextDescription(type, name) {
    if (type) {
      switch (type) {
        case "topic":
          return _I18n.default.t("search.context.topic");
        case "user":
          return _I18n.default.t("search.context.user", {
            username: name
          });
        case "category":
          return _I18n.default.t("search.context.category", {
            category: name
          });
        case "tag":
          return _I18n.default.t("search.context.tag", {
            tag: name
          });
        case "private_messages":
          return _I18n.default.t("search.context.private_messages");
      }
    }
  }
  function getSearchKey(args) {
    return args.q + "|" + (args.searchContext && args.searchContext.type || "") + "|" + (args.searchContext && args.searchContext.id || "");
  }
  function isValidSearchTerm(searchTerm, siteSettings) {
    if (searchTerm) {
      return searchTerm.trim().length >= siteSettings.min_search_term_length;
    } else {
      return false;
    }
  }
  function applySearchAutocomplete($input, siteSettings) {
    $input.autocomplete((0, _object2.deepMerge)({
      template: (0, _rawTemplates.findRawTemplate)("category-tag-autocomplete"),
      key: "#",
      width: "100%",
      treatAsTextarea: true,
      autoSelectFirstSuggestion: false,
      transformComplete: obj => obj.text,
      dataSource: term => (0, _categoryTagSearch.search)(term, siteSettings)
    }));
    if (siteSettings.enable_mentions) {
      $input.autocomplete((0, _object2.deepMerge)({
        template: (0, _rawTemplates.findRawTemplate)("user-selector-autocomplete"),
        key: "@",
        width: "100%",
        treatAsTextarea: true,
        autoSelectFirstSuggestion: false,
        transformComplete: v => v.username || v.name,
        dataSource: term => (0, _userSearch.default)({
          term,
          includeGroups: true
        })
      }));
    }
  }
  function updateRecentSearches(currentUser, term) {
    let recentSearches = Object.assign(currentUser.recent_searches || []);
    if (recentSearches.includes(term)) {
      recentSearches = recentSearches.without(term);
    } else if (recentSearches.length === MAX_RECENT_SEARCHES) {
      recentSearches.popObject();
    }
    recentSearches.unshiftObject(term);
    currentUser.set("recent_searches", recentSearches);
  }
  function logSearchLinkClick(params) {
    (0, _ajax.ajax)("/search/click", {
      type: "POST",
      data: {
        search_log_id: params.searchLogId,
        search_result_id: params.searchResultId,
        search_result_type: params.searchResultType
      }
    });
  }
});
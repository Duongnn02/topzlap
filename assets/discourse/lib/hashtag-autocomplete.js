define("discourse/lib/hashtag-autocomplete", ["exports", "discourse-common/lib/raw-templates", "discourse-common/lib/later", "discourse-common/config/environment", "@ember/runloop", "discourse/lib/autocomplete", "discourse/lib/ajax", "discourse-common/lib/debounce", "discourse/lib/utilities", "discourse/lib/category-tag-search", "discourse/lib/text", "@ember/template"], function (_exports, _rawTemplates, _later, _environment, _runloop, _autocomplete, _ajax, _debounce, _utilities, _categoryTagSearch, _text, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.cleanUpHashtagTypeClasses = cleanUpHashtagTypeClasses;
  _exports.fetchUnseenHashtagsInContext = fetchUnseenHashtagsInContext;
  _exports.getHashtagTypeClasses = getHashtagTypeClasses;
  _exports.hashtagTriggerRule = hashtagTriggerRule;
  _exports.linkSeenHashtagsInContext = linkSeenHashtagsInContext;
  _exports.registerHashtagType = registerHashtagType;
  _exports.setupHashtagAutocomplete = setupHashtagAutocomplete;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/raw-templates",0,"discourse-common/lib/later",0,"discourse-common/config/environment",0,"@ember/runloop",0,"discourse/lib/autocomplete",0,"discourse/lib/ajax",0,"discourse-common/lib/debounce",0,"discourse/lib/utilities",0,"discourse/lib/category-tag-search",0,"discourse/lib/text",0,"@ember/template"eaimeta@70e063a35619d71f
  let hashtagTypeClasses = {};
  function registerHashtagType(type, typeClass) {
    hashtagTypeClasses[type] = typeClass;
  }
  function cleanUpHashtagTypeClasses() {
    hashtagTypeClasses = {};
  }
  function getHashtagTypeClasses() {
    return hashtagTypeClasses;
  }

  /**
   * Sets up a textarea using the jQuery autocomplete plugin, specifically
   * to match on the hashtag (#) character for autocompletion of categories,
   * tags, and other resource data types.
   *
   * @param {Array} contextualHashtagConfiguration - The hashtag datasource types in priority order
   *   that should be used when searching for or looking up hashtags from the server, determines
   *   the order of search results and the priority for looking up conflicting hashtags. See also
   *   Site.hashtag_configurations.
   * @param {$Element} $textarea - jQuery element to use for the autocompletion
   *   plugin to attach to, this is what will watch for the # matcher when the user is typing.
   * @param {Hash} siteSettings - The clientside site settings.
   * @param {Function} autocompleteOptions - Options to pass to the jQuery plugin. Must at least include:
   *
   *  - afterComplete - Called with the selected autocomplete option once it is selected.
   *
   *  Can also include:
   *
   *  - treatAsTextarea - Whether to anchor the autocompletion to the start of the input and
   *                      ensure the popper is always on top.
   **/
  function setupHashtagAutocomplete(contextualHashtagConfiguration, $textArea, siteSettings) {
    let autocompleteOptions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    if (siteSettings.enable_experimental_hashtag_autocomplete) {
      _setupExperimental(contextualHashtagConfiguration, $textArea, siteSettings, autocompleteOptions);
    } else {
      _setup($textArea, siteSettings, autocompleteOptions.afterComplete);
    }
  }
  function hashtagTriggerRule(textarea) {
    if ((0, _utilities.inCodeBlock)(textarea.value, (0, _utilities.caretPosition)(textarea))) {
      return false;
    }
    return true;
  }
  const checkedHashtags = new Set();
  let seenHashtags = {};

  // NOTE: For future maintainers, the hashtag lookup here does not take
  // into account mixed contexts -- for instance, a chat quote inside a post
  // or a post quote inside a chat message, so this may
  // not provide an accurate priority lookup for hashtags without a ::type suffix in those
  // cases.
  function fetchUnseenHashtagsInContext(contextualHashtagConfiguration, slugs) {
    return (0, _ajax.ajax)("/hashtags", {
      data: {
        slugs,
        order: contextualHashtagConfiguration
      }
    }).then(response => {
      Object.keys(response).forEach(type => {
        seenHashtags[type] = seenHashtags[type] || {};
        response[type].forEach(item => {
          seenHashtags[type][item.ref] = seenHashtags[type][item.ref] || item;
        });
      });
      slugs.forEach(checkedHashtags.add, checkedHashtags);
    });
  }
  function linkSeenHashtagsInContext(contextualHashtagConfiguration, elem) {
    const hashtagSpans = [...(elem?.querySelectorAll("span.hashtag-raw") || [])];
    if (hashtagSpans.length === 0) {
      return [];
    }
    const slugs = [...hashtagSpans.map(span => span.innerText.replace("#", ""))];
    hashtagSpans.forEach((hashtagSpan, index) => {
      _findAndReplaceSeenHashtagPlaceholder(slugs[index], contextualHashtagConfiguration, hashtagSpan);
    });
    return slugs.map(slug => slug.toLowerCase()).uniq().filter(slug => !checkedHashtags.has(slug));
  }
  function _setupExperimental(contextualHashtagConfiguration, $textArea, siteSettings, autocompleteOptions) {
    $textArea.autocomplete({
      template: (0, _rawTemplates.findRawTemplate)("hashtag-autocomplete"),
      key: "#",
      afterComplete: autocompleteOptions.afterComplete,
      treatAsTextarea: autocompleteOptions.treatAsTextarea,
      scrollElementSelector: ".hashtag-autocomplete__fadeout",
      autoSelectFirstSuggestion: true,
      transformComplete: obj => obj.ref,
      dataSource: term => {
        if (term.match(/\s/)) {
          return null;
        }
        return _searchGeneric(term, siteSettings, contextualHashtagConfiguration);
      },
      triggerRule: (textarea, opts) => hashtagTriggerRule(textarea, opts)
    });
  }
  function _setup($textArea, siteSettings, afterComplete) {
    $textArea.autocomplete({
      template: (0, _rawTemplates.findRawTemplate)("category-tag-autocomplete"),
      key: "#",
      afterComplete,
      transformComplete: obj => obj.text,
      dataSource: term => {
        if (term.match(/\s/)) {
          return null;
        }
        return (0, _categoryTagSearch.search)(term, siteSettings);
      },
      triggerRule: (textarea, opts) => hashtagTriggerRule(textarea, opts)
    });
  }
  let searchCache = {};
  let searchCacheTime;
  let currentSearch;
  function _updateSearchCache(term, results) {
    searchCache[term] = results;
    searchCacheTime = new Date();
    return results;
  }

  // Note that the search term is _not_ required here, and we follow special
  // logic similar to @mentions when there is no search term, to show some
  // useful default categories, tags, etc.
  function _searchGeneric(term, siteSettings, contextualHashtagConfiguration) {
    if (currentSearch) {
      currentSearch.abort();
      currentSearch = null;
    }
    if (new Date() - searchCacheTime > 30000) {
      searchCache = {};
    }
    const cached = searchCache[term];
    if (cached) {
      return cached;
    }
    return new Promise(resolve => {
      let timeoutPromise = (0, _environment.isTesting)() ? null : (0, _later.default)(() => {
        resolve(_autocomplete.CANCELLED_STATUS);
      }, 5000);
      if (!siteSettings.enable_experimental_hashtag_autocomplete && term === "") {
        return resolve(_autocomplete.CANCELLED_STATUS);
      }
      const debouncedSearch = (q, ctx, resultFunc) => {
        (0, _debounce.default)(this, _searchRequest, q, ctx, resultFunc, _environment.INPUT_DELAY);
      };
      debouncedSearch(term, contextualHashtagConfiguration, result => {
        (0, _runloop.cancel)(timeoutPromise);
        resolve(_updateSearchCache(term, result));
      });
    });
  }
  function _searchRequest(term, contextualHashtagConfiguration, resultFunc) {
    currentSearch = (0, _ajax.ajax)("/hashtags/search.json", {
      data: {
        term,
        order: contextualHashtagConfiguration
      }
    });
    currentSearch.then(r => {
      r.results?.forEach(result => {
        // Convert :emoji: in the result text to HTML safely.
        result.text = (0, _template.htmlSafe)((0, _text.emojiUnescape)((0, _utilities.escapeExpression)(result.text)));
      });
      resultFunc(r.results || _autocomplete.CANCELLED_STATUS);
    }).finally(() => {
      currentSearch = null;
    });
    return currentSearch;
  }
  function _findAndReplaceSeenHashtagPlaceholder(slugRef, contextualHashtagConfiguration, hashtagSpan) {
    contextualHashtagConfiguration.forEach(type => {
      // replace raw span for the hashtag with a cooked one
      const matchingSeenHashtag = seenHashtags[type]?.[slugRef];
      if (matchingSeenHashtag) {
        // NOTE: When changing the HTML structure here, you must also change
        // it in the hashtag-autocomplete markdown rule, and vice-versa.
        const link = document.createElement("a");
        link.classList.add("hashtag-cooked");
        link.href = matchingSeenHashtag.relative_url;
        link.dataset.type = type;
        link.dataset.slug = matchingSeenHashtag.slug;
        link.innerHTML = `<svg class="fa d-icon d-icon-${matchingSeenHashtag.icon} svg-icon svg-node"><use href="#${matchingSeenHashtag.icon}"></use></svg><span>${matchingSeenHashtag.text}</span>`;
        hashtagSpan.replaceWith(link);
      }
    });
  }
});
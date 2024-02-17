define("discourse/lib/user-search", ["exports", "@ember/runloop", "discourse-common/lib/later", "discourse/lib/autocomplete", "rsvp", "discourse-common/lib/debounce", "discourse/lib/utilities", "discourse-common/config/environment", "discourse/lib/url", "discourse/lib/ajax"], function (_exports, _runloop, _later, _autocomplete, _rsvp, _debounce, _utilities, _environment, _url, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.camelCaseToSnakeCase = camelCaseToSnakeCase;
  _exports.default = userSearch;
  _exports.eagerCompleteSearch = eagerCompleteSearch;
  _exports.resetUserSearchCache = resetUserSearchCache;
  _exports.skipSearch = skipSearch;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse/lib/autocomplete",0,"rsvp",0,"discourse-common/lib/debounce",0,"discourse/lib/utilities",0,"discourse-common/config/environment",0,"discourse/lib/url",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  let cache = {},
    cacheKey,
    cacheTime,
    currentTerm,
    oldSearch;
  function resetUserSearchCache() {
    cache = {};
    cacheKey = null;
    cacheTime = null;
    currentTerm = null;
    oldSearch = null;
  }
  function camelCaseToSnakeCase(text) {
    return text.replace(/([a-zA-Z])(?=[A-Z])/g, "$1_").toLowerCase();
  }
  function performSearch(term, topicId, categoryId, includeGroups, includeMentionableGroups, includeMessageableGroups, customUserSearchOptions, allowedUsers, groupMembersOf, includeStagedUsers, lastSeenUsers, limit, resultsFn) {
    let cached = cache[term];
    if (cached) {
      resultsFn(cached);
      return;
    }
    const eagerComplete = eagerCompleteSearch(term, topicId || categoryId);
    if (term === "" && !eagerComplete && !lastSeenUsers) {
      // The server returns no results in this case, so no point checking
      // do not return empty list, because autocomplete will get terminated
      resultsFn(_autocomplete.CANCELLED_STATUS);
      return;
    }
    let data = {
      term,
      topic_id: topicId,
      category_id: categoryId,
      include_groups: includeGroups,
      include_mentionable_groups: includeMentionableGroups,
      include_messageable_groups: includeMessageableGroups,
      groups: groupMembersOf,
      topic_allowed_users: allowedUsers,
      include_staged_users: includeStagedUsers,
      last_seen_users: lastSeenUsers,
      limit
    };
    if (customUserSearchOptions) {
      Object.keys(customUserSearchOptions).forEach(key => {
        data[camelCaseToSnakeCase(key)] = customUserSearchOptions[key];
      });
    }

    // need to be able to cancel this
    oldSearch = (0, _ajax.ajax)((0, _url.userPath)("search/users"), {
      data
    });
    let returnVal = _autocomplete.CANCELLED_STATUS;
    oldSearch.then(function (r) {
      const hasResults = !!(r.users && r.users.length || r.groups && r.groups.length || r.emails && r.emails.length);
      if (eagerComplete && !hasResults) {
        // we are trying to eager load, but received no results
        // do not return empty list, because autocomplete will get terminated
        r = _autocomplete.CANCELLED_STATUS;
      }
      cache[term] = r;
      cacheTime = new Date();
      // If there is a newer search term, return null
      if (term === currentTerm) {
        returnVal = r;
      }
    }).finally(function () {
      oldSearch = null;
      resultsFn(returnVal);
    });
  }
  let debouncedSearch = function (term, topicId, categoryId, includeGroups, includeMentionableGroups, includeMessageableGroups, customUserSearchOptions, allowedUsers, groupMembersOf, includeStagedUsers, lastSeenUsers, limit, resultsFn) {
    (0, _debounce.default)(this, performSearch, term, topicId, categoryId, includeGroups, includeMentionableGroups, includeMessageableGroups, customUserSearchOptions, allowedUsers, groupMembersOf, includeStagedUsers, lastSeenUsers, limit, resultsFn, 300);
  };
  function lowerCaseIncludes(string, term) {
    return string && term && string.toLowerCase().includes(term.toLowerCase());
  }
  function organizeResults(r, options) {
    if (r === _autocomplete.CANCELLED_STATUS) {
      return r;
    }
    const exclude = options.exclude || [];

    // Sometimes the term passed contains spaces, but the search is limited
    // to the first word only.
    const term = options.term?.trim()?.split(/\s/, 1)?.[0];
    const users = [],
      emails = [],
      groups = [];
    let resultsLength = 0;
    if (r.users) {
      r.users.forEach(user => {
        if (resultsLength < options.limit && !exclude.includes(user.username)) {
          user.isUser = true;
          user.isMetadataMatch = !lowerCaseIncludes(user.username, term) && !lowerCaseIncludes(user.name, term);
          users.push(user);
          resultsLength += 1;
        }
      });
    }
    if (options.allowEmails && (0, _utilities.emailValid)(options.term)) {
      emails.push({
        username: options.term,
        isEmail: true
      });
      resultsLength += 1;
    }
    if (r.groups) {
      r.groups.forEach(group => {
        if ((options.term.toLowerCase() === group.name.toLowerCase() || resultsLength < options.limit) && !exclude.includes(group.name)) {
          group.isGroup = true;
          groups.push(group);
          resultsLength += 1;
        }
      });
    }
    const results = [...users.filter(u => !u.isMetadataMatch), ...emails, ...groups, ...users.filter(u => u.isMetadataMatch)];
    results.users = users;
    results.emails = emails;
    results.groups = groups;
    return results;
  }

  // all punctuation except for -, _ and . which are allowed in usernames
  // note: these are valid in names, but will end up tripping search anyway so just skip
  // this means searching for `sam saffron` is OK but if my name is `sam$ saffron` autocomplete
  // will not find me, which is a reasonable compromise
  //
  // we also ignore if we notice a double space or a string that is only a space
  const ignoreRegex = /([\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*,\/:;<=>?\[\]^`{|}~])|\s\s|^\s$|^[^+]*\+[^@]*$/;
  function skipSearch(term, allowEmails) {
    let lastSeenUsers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    if (lastSeenUsers) {
      return false;
    }
    if (term.includes("@") && !allowEmails) {
      return true;
    }
    return !!term.match(ignoreRegex);
  }
  function eagerCompleteSearch(term, scopedId) {
    return term === "" && !!scopedId;
  }
  function userSearch(options) {
    if (options.term && options.term.length > 0 && options.term[0] === "@") {
      options.term = options.term.substring(1);
    }
    let term = options.term || "",
      includeGroups = options.includeGroups,
      includeMentionableGroups = options.includeMentionableGroups,
      includeMessageableGroups = options.includeMessageableGroups,
      customUserSearchOptions = options.customUserSearchOptions,
      allowedUsers = options.allowedUsers,
      topicId = options.topicId,
      categoryId = options.categoryId,
      groupMembersOf = options.groupMembersOf,
      includeStagedUsers = options.includeStagedUsers,
      lastSeenUsers = options.lastSeenUsers,
      limit = options.limit || 6;
    if (oldSearch) {
      oldSearch.abort();
      oldSearch = null;
    }
    currentTerm = term;
    return new _rsvp.Promise(function (resolve) {
      const newCacheKey = `${topicId}-${categoryId}`;
      if (new Date() - cacheTime > 30000 || cacheKey !== newCacheKey) {
        cache = {};
      }
      cacheKey = newCacheKey;
      let clearPromise;
      if (!(0, _environment.isTesting)()) {
        clearPromise = (0, _later.default)(() => resolve(_autocomplete.CANCELLED_STATUS), 5000);
      }
      if (skipSearch(term, options.allowEmails, options.lastSeenUsers)) {
        resolve([]);
        return;
      }
      debouncedSearch(term, topicId, categoryId, includeGroups, includeMentionableGroups, includeMessageableGroups, customUserSearchOptions, allowedUsers, groupMembersOf, includeStagedUsers, lastSeenUsers, limit, function (r) {
        (0, _runloop.cancel)(clearPromise);
        resolve(organizeResults(r, {
          ...options,
          limit
        }));
      });
    });
  }
});
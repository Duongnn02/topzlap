define("discourse/lib/category-tag-search", ["exports", "@ember/runloop", "discourse-common/lib/later", "discourse/lib/autocomplete", "discourse/models/category", "rsvp", "discourse/lib/category-hashtags", "discourse/lib/tag-hashtags", "discourse-common/lib/debounce", "discourse-common/config/environment", "discourse/lib/ajax"], function (_exports, _runloop, _later, _autocomplete, _category, _rsvp, _categoryHashtags, _tagHashtags, _debounce, _environment, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.search = search;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse/lib/autocomplete",0,"discourse/models/category",0,"rsvp",0,"discourse/lib/category-hashtags",0,"discourse/lib/tag-hashtags",0,"discourse-common/lib/debounce",0,"discourse-common/config/environment",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  let cache = {};
  let cacheTime;
  let oldSearch;
  function updateCache(term, results) {
    cache[term] = results;
    cacheTime = new Date();
    return results;
  }
  function searchFunc(q, limit, cats, resultFunc) {
    oldSearch = (0, _ajax.ajax)("/tags/filter/search", {
      data: {
        limit,
        q
      }
    });
    let returnVal = _autocomplete.CANCELLED_STATUS;
    oldSearch.then(r => {
      const categoryNames = cats.map(c => c.model.get("name"));
      const tags = r.results.map(tag => {
        tag.text = categoryNames.includes(tag.text) ? `${tag.text}${_tagHashtags.TAG_HASHTAG_POSTFIX}` : tag.text;
        return tag;
      });
      returnVal = cats.concat(tags);
    }).finally(() => {
      oldSearch = null;
      resultFunc(returnVal);
    });
  }
  function searchTags(term, categories, limit) {
    return new _rsvp.Promise(resolve => {
      let clearPromise = (0, _environment.isTesting)() ? null : (0, _later.default)(() => {
        resolve(_autocomplete.CANCELLED_STATUS);
      }, 5000);
      (0, _debounce.default)(this, searchFunc, term, limit, categories, result => {
        (0, _runloop.cancel)(clearPromise);
        resolve(updateCache(term, result));
      }, 300);
    });
  }
  function search(term, siteSettings) {
    if (oldSearch) {
      oldSearch.abort();
      oldSearch = null;
    }
    if (new Date() - cacheTime > 30000) {
      cache = {};
    }
    const cached = cache[term];
    if (cached) {
      return cached;
    }
    const limit = 5;
    let categories = _category.default.search(term, {
      limit
    });
    let numOfCategories = categories.length;
    categories = categories.map(category => {
      return {
        model: category,
        text: _category.default.slugFor(category, _categoryHashtags.SEPARATOR, 2)
      };
    });
    if (numOfCategories !== limit && siteSettings.tagging_enabled) {
      return searchTags(term, categories, limit - numOfCategories);
    } else {
      return updateCache(term, categories);
    }
  }
});
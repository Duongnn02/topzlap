define("discourse/lib/link-hashtags", ["exports", "discourse-common/lib/deprecated", "discourse/lib/tag-hashtags", "discourse/lib/ajax", "discourse/lib/category-hashtags", "jquery"], function (_exports, _deprecated, _tagHashtags, _ajax, _categoryHashtags, _jquery) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.fetchUnseenHashtags = fetchUnseenHashtags;
  _exports.linkSeenHashtags = linkSeenHashtags;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/deprecated",0,"discourse/lib/tag-hashtags",0,"discourse/lib/ajax",0,"discourse/lib/category-hashtags",0,"jquery"eaimeta@70e063a35619d71f
  const categoryHashtags = {};
  const tagHashtags = {};
  const checkedHashtags = new Set();
  function linkSeenHashtags(elem) {
    if (elem instanceof _jquery.default) {
      elem = elem[0];
      (0, _deprecated.default)("linkSeenHashtags now expects a DOM node as first parameter", {
        since: "2.8.0.beta7",
        dropFrom: "2.9.0.beta1",
        id: "discourse.link-hashtags.dom-node"
      });
    }
    const hashtags = [...(elem?.querySelectorAll("span.hashtag") || [])];
    if (hashtags.length === 0) {
      return [];
    }
    const slugs = [...hashtags.map(hashtag => hashtag.innerText.slice(1))];
    hashtags.forEach((hashtag, index) => {
      let slug = slugs[index];
      const hasTagSuffix = slug.endsWith(_tagHashtags.TAG_HASHTAG_POSTFIX);
      if (hasTagSuffix) {
        slug = slug.slice(0, slug.length - _tagHashtags.TAG_HASHTAG_POSTFIX.length);
      }
      const lowerSlug = slug.toLowerCase();
      if (categoryHashtags[lowerSlug] && !hasTagSuffix) {
        (0, _categoryHashtags.replaceSpan)($(hashtag), slug, categoryHashtags[lowerSlug]);
      } else if (tagHashtags[lowerSlug]) {
        (0, _categoryHashtags.replaceSpan)($(hashtag), slug, tagHashtags[lowerSlug]);
      }
    });
    return slugs.map(slug => slug.toLowerCase()).uniq().filter(slug => !checkedHashtags.has(slug));
  }
  function fetchUnseenHashtags(slugs) {
    return (0, _ajax.ajax)("/hashtags", {
      data: {
        slugs
      }
    }).then(response => {
      Object.keys(response.categories).forEach(slug => {
        categoryHashtags[slug] = response.categories[slug];
      });
      Object.keys(response.tags).forEach(slug => {
        tagHashtags[slug] = response.tags[slug];
      });
      slugs.forEach(checkedHashtags.add, checkedHashtags);
    });
  }
});
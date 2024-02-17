define("discourse/lib/category-hashtags", ["exports", "discourse/lib/hashtag-autocomplete", "discourse-common/lib/deprecated"], function (_exports, _hashtagAutocomplete, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.SEPARATOR = void 0;
  _exports.categoryHashtagTriggerRule = categoryHashtagTriggerRule;
  _exports.replaceSpan = replaceSpan;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/hashtag-autocomplete",0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  const SEPARATOR = ":";
  _exports.SEPARATOR = SEPARATOR;
  function replaceSpan($elem, categorySlug, categoryLink, type) {
    type = type ? ` data-type="${type}"` : "";
    $elem.replaceWith(`<a href="${categoryLink}" class="hashtag"${type}>#<span>${categorySlug}</span></a>`);
  }
  function categoryHashtagTriggerRule(textarea, opts) {
    (0, _deprecated.default)("categoryHashtagTriggerRule is being replaced by hashtagTriggerRule and the new hashtag-autocomplete plugin APIs", {
      since: "2.9.0.beta10",
      dropFrom: "3.0.0.beta1",
      id: "discourse.category-hashtags.categoryHashtagTriggerRule"
    });
    return (0, _hashtagAutocomplete.hashtagTriggerRule)(textarea, opts);
  }
});
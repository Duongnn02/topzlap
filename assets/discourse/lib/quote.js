define("discourse/lib/quote", ["exports", "discourse/lib/settings", "discourse-common/lib/helpers"], function (_exports, _settings, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.QUOTE_REGEXP = void 0;
  _exports.buildQuote = buildQuote;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/settings",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  const QUOTE_REGEXP = /\[quote=([^\]]*)\]((?:[\s\S](?!\[quote=[^\]]*\]))*?)\[\/quote\]/im;

  // Build the BBCode quote around the selected text
  _exports.QUOTE_REGEXP = QUOTE_REGEXP;
  function buildQuote(post, contents) {
    let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (!post || !contents) {
      return "";
    }
    let fullName = post.name;
    // if the quote username data attr is present but it does not
    // match the post username then fallback to the quote username instead of fetching
    // the full name from the post
    if (opts.username && opts.username !== post.username) {
      fullName = null;
    }
    const name = (0, _settings.prioritizeNameFallback)(fullName, opts.username || post.username);
    const params = [name, `post:${opts.post || post.post_number}`, `topic:${opts.topic || post.topic_id}`];
    if (opts.full) {
      params.push("full:true");
    }
    if ((0, _helpers.helperContext)().siteSettings.display_name_on_posts && !(0, _helpers.helperContext)().siteSettings.prioritize_username_in_ux && fullName) {
      params.push(`username:${opts.username || post.username}`);
    }
    return `[quote="${params.join(", ")}"]\n${contents.trim()}\n[/quote]\n\n`;
  }
});
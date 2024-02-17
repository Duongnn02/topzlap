define("pretty-text/pretty-text", ["exports", "pretty-text/engines/discourse-markdown-it", "discourse-common/lib/object", "discourse-common/lib/deprecated"], function (_exports, _discourseMarkdownIt, _object, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.buildOptions = buildOptions;
  _exports.default = void 0;
  _exports.registerOption = registerOption;
  0; //eaimeta@70e063a35619d71f0,"pretty-text/engines/discourse-markdown-it",0,"discourse-common/lib/object",0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  function registerOption() {
    (0, _deprecated.default)("`registerOption() from `pretty-text` is deprecated. Use `helper.registerOptions()` instead.", {
      since: "2.8.0.beta9",
      dropFrom: "2.9.0.beta1",
      id: "discourse.pretty-text.registerOption"
    });
  }

  // see also: __optInput in PrettyText#cook and PrettyText#markdown,
  // the options are passed here and must be explicitly allowed with
  // the const options & state below
  function buildOptions(state) {
    const {
      siteSettings,
      getURL,
      lookupAvatar,
      lookupPrimaryUserGroup,
      getTopicInfo,
      topicId,
      forceQuoteLink,
      categoryHashtagLookup,
      userId,
      getCurrentUser,
      currentUser,
      lookupAvatarByPostNumber,
      lookupPrimaryUserGroupByPostNumber,
      formatUsername,
      emojiUnicodeReplacer,
      lookupUploadUrls,
      previewing,
      censoredRegexp,
      disableEmojis,
      customEmojiTranslation,
      watchedWordsReplace,
      watchedWordsLink,
      emojiDenyList,
      featuresOverride,
      markdownItRules,
      additionalOptions,
      hashtagTypesInPriorityOrder,
      hashtagIcons,
      hashtagLookup
    } = state;
    let features = {};
    if (state.features) {
      features = (0, _object.deepMerge)(features, state.features);
    }
    const options = {
      sanitize: true,
      getURL,
      features,
      lookupAvatar,
      lookupPrimaryUserGroup,
      getTopicInfo,
      topicId,
      forceQuoteLink,
      categoryHashtagLookup,
      userId,
      getCurrentUser,
      currentUser,
      lookupAvatarByPostNumber,
      lookupPrimaryUserGroupByPostNumber,
      formatUsername,
      emojiUnicodeReplacer,
      lookupUploadUrls,
      censoredRegexp,
      customEmojiTranslation,
      allowedHrefSchemes: siteSettings.allowed_href_schemes ? siteSettings.allowed_href_schemes.split("|") : null,
      allowedIframes: siteSettings.allowed_iframes ? siteSettings.allowed_iframes.split("|") : [],
      markdownIt: true,
      previewing,
      disableEmojis,
      watchedWordsReplace,
      watchedWordsLink,
      emojiDenyList,
      featuresOverride,
      markdownItRules,
      additionalOptions,
      hashtagTypesInPriorityOrder,
      hashtagIcons,
      hashtagLookup
    };

    // note, this will mutate options due to the way the API is designed
    // may need a refactor
    (0, _discourseMarkdownIt.setup)(options, siteSettings, state);
    return options;
  }
  class _default {
    constructor(opts) {
      if (!opts) {
        opts = buildOptions({
          siteSettings: {}
        });
      }
      this.opts = opts;
    }
    disableSanitizer() {
      this.opts.sanitizer = this.opts.discourse.sanitizer = ident => ident;
    }
    cook(raw) {
      if (!raw || raw.length === 0) {
        return "";
      }
      let result;
      result = (0, _discourseMarkdownIt.cook)(raw, this.opts);
      return result ? result : "";
    }
    sanitize(html) {
      return this.opts.sanitizer(html).trim();
    }
  }
  _exports.default = _default;
});
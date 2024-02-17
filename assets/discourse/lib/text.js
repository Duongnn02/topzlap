define("discourse/lib/text", ["exports", "pretty-text/pretty-text", "pretty-text/emoji", "pretty-text/allow-lister", "rsvp", "discourse/models/session", "discourse/lib/utilities", "discourse-common/lib/get-url", "discourse-common/lib/helpers", "@ember/template", "discourse/lib/load-script", "pretty-text/sanitizer"], function (_exports, _prettyText, _emoji, _allowLister, _rsvp, _session, _utilities, _getUrl, _helpers, _template, _loadScript, _sanitizer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.cook = cook;
  _exports.cookAsync = cookAsync;
  _exports.emojiUnescape = emojiUnescape;
  _exports.emojiUrlFor = emojiUrlFor;
  _exports.excerpt = excerpt;
  _exports.generateCookFunction = generateCookFunction;
  _exports.generateLinkifyFunction = generateLinkifyFunction;
  _exports.parseAsync = parseAsync;
  _exports.sanitize = sanitize;
  _exports.sanitizeAsync = sanitizeAsync;
  0; //eaimeta@70e063a35619d71f0,"pretty-text/pretty-text",0,"pretty-text/emoji",0,"pretty-text/allow-lister",0,"rsvp",0,"discourse/models/session",0,"discourse/lib/utilities",0,"discourse-common/lib/get-url",0,"discourse-common/lib/helpers",0,"@ember/template",0,"discourse/lib/load-script",0,"pretty-text/sanitizer"eaimeta@70e063a35619d71f
  function getOpts(opts) {
    let context = (0, _helpers.helperContext)();
    opts = Object.assign({
      getURL: _getUrl.getURLWithCDN,
      currentUser: context.currentUser,
      censoredRegexp: context.site.censored_regexp,
      customEmojiTranslation: context.site.custom_emoji_translation,
      emojiDenyList: context.site.denied_emojis,
      siteSettings: context.siteSettings,
      formatUsername: _utilities.formatUsername,
      watchedWordsReplace: context.site.watched_words_replace,
      watchedWordsLink: context.site.watched_words_link,
      additionalOptions: context.site.markdown_additional_options
    }, opts);
    return (0, _prettyText.buildOptions)(opts);
  }

  // Use this to easily create a pretty text instance with proper options
  function cook(text, options) {
    return (0, _template.htmlSafe)(createPrettyText(options).cook(text));
  }

  // everything should eventually move to async API and this should be renamed
  // cook
  function cookAsync(text, options) {
    return loadMarkdownIt().then(() => cook(text, options));
  }

  // Warm up pretty text with a set of options and return a function
  // which can be used to cook without rebuilding pretty-text every time
  function generateCookFunction(options) {
    return loadMarkdownIt().then(() => {
      const prettyText = createPrettyText(options);
      return text => prettyText.cook(text);
    });
  }
  function generateLinkifyFunction(options) {
    return loadMarkdownIt().then(() => {
      const prettyText = createPrettyText(options);
      return prettyText.opts.engine.linkify;
    });
  }
  function sanitize(text, options) {
    return (0, _sanitizer.sanitize)(text, new _allowLister.default(options));
  }
  function sanitizeAsync(text, options) {
    return loadMarkdownIt().then(() => {
      return createPrettyText(options).sanitize(text);
    });
  }
  function parseAsync(md) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let env = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return loadMarkdownIt().then(() => {
      return createPrettyText(options).opts.engine.parse(md, env);
    });
  }
  function loadMarkdownIt() {
    return new _rsvp.Promise(resolve => {
      let markdownItURL = _session.default.currentProp("markdownItURL");
      if (markdownItURL) {
        (0, _loadScript.default)(markdownItURL).then(() => resolve()).catch(e => {
          // eslint-disable-next-line no-console
          console.error(e);
        });
      } else {
        resolve();
      }
    });
  }
  function createPrettyText(options) {
    return new _prettyText.default(getOpts(options));
  }
  function emojiOptions() {
    let siteSettings = (0, _helpers.helperContext)().siteSettings;
    let context = (0, _helpers.helperContext)();
    if (!siteSettings.enable_emoji) {
      return;
    }
    return {
      getURL: url => (0, _getUrl.getURLWithCDN)(url),
      emojiSet: siteSettings.emoji_set,
      enableEmojiShortcuts: siteSettings.enable_emoji_shortcuts,
      inlineEmoji: siteSettings.enable_inline_emoji_translation,
      emojiDenyList: context.site.denied_emojis,
      emojiCDNUrl: siteSettings.external_emoji_url
    };
  }
  function emojiUnescape(string, options) {
    const opts = emojiOptions();
    if (opts) {
      return (0, _emoji.performEmojiUnescape)(string, Object.assign(opts, options || {}));
    } else {
      return string;
    }
  }
  function emojiUrlFor(code) {
    const opts = emojiOptions();
    if (opts) {
      return (0, _emoji.buildEmojiUrl)(code, opts);
    }
  }
  function encode(str) {
    return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }
  function traverse(element, callback) {
    if (callback(element)) {
      element.childNodes.forEach(child => traverse(child, callback));
    }
  }
  function excerpt(cooked, length) {
    let result = "";
    let resultLength = 0;
    const div = document.createElement("div");
    div.innerHTML = cooked;
    traverse(div, element => {
      if (resultLength >= length) {
        return;
      }
      if (element.nodeType === Node.TEXT_NODE) {
        if (resultLength + element.textContent.length > length) {
          const text = element.textContent.slice(0, length - resultLength);
          result += encode(text);
          result += "&hellip;";
          resultLength += text.length;
        } else {
          result += encode(element.textContent);
          resultLength += element.textContent.length;
        }
      } else if (element.tagName === "A") {
        result += element.outerHTML;
        resultLength += element.innerText.length;
      } else if (element.tagName === "IMG") {
        if (element.classList.contains("emoji")) {
          result += element.outerHTML;
        } else {
          result += "[image]";
          resultLength += "[image]".length;
        }
      } else {
        return true;
      }
    });
    return result;
  }
});
define("discourse/lib/render-tag", ["exports", "discourse/models/user", "discourse/lib/utilities", "discourse-common/lib/get-url", "discourse-common/lib/helpers", "pretty-text/sanitizer"], function (_exports, _user, _utilities, _getUrl, _helpers, _sanitizer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = renderTag;
  _exports.defaultRenderTag = defaultRenderTag;
  _exports.replaceTagRenderer = replaceTagRenderer;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/user",0,"discourse/lib/utilities",0,"discourse-common/lib/get-url",0,"discourse-common/lib/helpers",0,"pretty-text/sanitizer"eaimeta@70e063a35619d71f
  let _renderer = defaultRenderTag;
  function replaceTagRenderer(fn) {
    _renderer = fn;
  }
  function defaultRenderTag(tag, params) {
    // This file is in lib but it's used as a helper
    let siteSettings = (0, _helpers.helperContext)().siteSettings;
    params = params || {};
    const visibleName = (0, _utilities.escapeExpression)(tag);
    tag = visibleName.toLowerCase();
    const classes = ["discourse-tag"];
    const tagName = params.tagName || "a";
    let path;
    if (tagName === "a" && !params.noHref) {
      if ((params.isPrivateMessage || params.pmOnly) && _user.default.current()) {
        const username = params.tagsForUser ? params.tagsForUser : _user.default.current().username;
        path = `/u/${username}/messages/tags/${tag}`;
      } else {
        path = `/tag/${tag}`;
      }
    }
    const href = path ? ` href='${(0, _getUrl.default)(path)}' ` : "";
    if (siteSettings.tag_style || params.style) {
      classes.push(params.style || siteSettings.tag_style);
    }
    if (params.size) {
      classes.push(params.size);
    }
    let val = "<" + tagName + href + " data-tag-name=" + tag + (params.description ? ' title="' + (0, _sanitizer.escape)(params.description) + '" ' : "") + " class='" + classes.join(" ") + "'>" + visibleName + "</" + tagName + ">";
    if (params.count) {
      val += " <span class='discourse-tag-count'>x" + params.count + "</span>";
    }
    return val;
  }
  function renderTag(tag, params) {
    return _renderer(tag, params);
  }
});
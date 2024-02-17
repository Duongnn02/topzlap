define("discourse/lib/theme-selector", ["exports", "discourse/lib/cookie", "I18n", "discourse-common/lib/deprecated"], function (_exports, _cookie, _I18n, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.currentThemeId = currentThemeId;
  _exports.currentThemeIds = currentThemeIds;
  _exports.currentThemeKey = currentThemeKey;
  _exports.extendThemeCookie = extendThemeCookie;
  _exports.listThemes = listThemes;
  _exports.setLocalTheme = setLocalTheme;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/cookie",0,"I18n",0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  const keySelector = "meta[name=discourse_theme_id]";
  const COOKIE_NAME = "theme_ids";
  const COOKIE_EXPIRY_DAYS = 365;
  function currentThemeKey() {
    // eslint-disable-next-line no-console
    if (console && console.warn && console.trace) {
      // TODO: Remove this code Jan 2019
      (0, _deprecated.default)("'currentThemeKey' is is deprecated use 'currentThemeId' instead. A theme component may require updating.", {
        id: "discourse.current-theme-key"
      });
    }
  }
  function currentThemeIds() {
    const themeIds = [];
    const elem = document.querySelector(keySelector);
    if (elem) {
      elem.content.split(",").forEach(num => {
        num = parseInt(num, 10);
        if (!isNaN(num)) {
          themeIds.push(num);
        }
      });
    }
    return themeIds;
  }
  function currentThemeId() {
    return currentThemeIds()[0];
  }
  function setLocalTheme(ids, themeSeq) {
    ids = ids.reject(id => !id);
    if (ids && ids.length > 0) {
      (0, _cookie.default)(COOKIE_NAME, `${ids.join(",")}|${themeSeq}`, {
        path: "/",
        expires: COOKIE_EXPIRY_DAYS
      });
    } else {
      (0, _cookie.removeCookie)(COOKIE_NAME, {
        path: "/"
      });
    }
  }
  function extendThemeCookie() {
    const currentValue = (0, _cookie.default)(COOKIE_NAME);
    if (currentValue) {
      (0, _cookie.default)(COOKIE_NAME, currentValue, {
        path: "/",
        expires: COOKIE_EXPIRY_DAYS
      });
    }
  }
  function listThemes(site) {
    let themes = site.get("user_themes");
    if (!themes) {
      return null;
    }
    let hasDefault = !!themes.findBy("default", true);
    let results = [];
    if (!hasDefault) {
      results.push({
        name: _I18n.default.t("themes.default_description"),
        id: null
      });
    }
    themes.forEach(t => {
      results.push({
        name: t.name,
        id: t.theme_id,
        color_scheme_id: t.color_scheme_id
      });
    });
    return results.length === 0 ? null : results;
  }
});
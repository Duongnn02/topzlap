define("discourse/lib/color-scheme-picker", ["exports", "discourse/lib/cookie", "I18n", "discourse/models/session", "discourse/lib/ajax", "discourse-common/lib/later"], function (_exports, _cookie, _I18n, _session, _ajax, _later) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.extendColorSchemeCookies = extendColorSchemeCookies;
  _exports.listColorSchemes = listColorSchemes;
  _exports.loadColorSchemeStylesheet = loadColorSchemeStylesheet;
  _exports.updateColorSchemeCookie = updateColorSchemeCookie;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/cookie",0,"I18n",0,"discourse/models/session",0,"discourse/lib/ajax",0,"discourse-common/lib/later"eaimeta@70e063a35619d71f
  function listColorSchemes(site) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let schemes = site.get("user_color_schemes");
    if (!schemes || !Array.isArray(schemes)) {
      return null;
    }
    let results = [];
    if (!options.darkOnly) {
      schemes = schemes.sort((a, b) => Number(a.is_dark) - Number(b.is_dark));
    }
    schemes.forEach(s => {
      if (options.darkOnly && s.is_dark || !options.darkOnly) {
        results.push({
          name: s.name,
          id: s.id
        });
      }
    });
    if (options.darkOnly) {
      const defaultDarkColorScheme = site.get("default_dark_color_scheme");
      if (defaultDarkColorScheme) {
        const existing = schemes.findBy("id", defaultDarkColorScheme.id);
        if (!existing) {
          results.unshift({
            id: defaultDarkColorScheme.id,
            name: `${defaultDarkColorScheme.name} ${_I18n.default.t("user.color_schemes.default_dark_scheme")}`
          });
        }
      }
      results.unshift({
        id: -1,
        name: _I18n.default.t("user.color_schemes.disable_dark_scheme")
      });
    }
    return results.length === 0 ? null : results;
  }
  function loadColorSchemeStylesheet(colorSchemeId, theme_id) {
    let darkMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    const themeId = theme_id ? `/${theme_id}` : "";
    (0, _ajax.ajax)(`/color-scheme-stylesheet/${colorSchemeId}${themeId}.json`).then(result => {
      if (result && result.new_href) {
        const elementId = darkMode ? "cs-preview-dark" : "cs-preview-light";
        const existingElement = document.querySelector(`link#${elementId}`);
        if (existingElement) {
          existingElement.href = result.new_href;
        } else {
          let link = document.createElement("link");
          link.href = result.new_href;
          link.media = darkMode ? "(prefers-color-scheme: dark)" : "(prefers-color-scheme: light)";
          link.rel = "stylesheet";
          link.id = elementId;
          document.body.appendChild(link);
        }
        if (!darkMode) {
          (0, _later.default)(() => {
            const schemeType = getComputedStyle(document.body).getPropertyValue("--scheme-type");
            _session.default.currentProp("defaultColorSchemeIsDark", schemeType.trim() === "dark");
          }, 500);
        }
      }
    });
  }
  const COLOR_SCHEME_COOKIE_NAME = "color_scheme_id";
  const DARK_SCHEME_COOKIE_NAME = "dark_scheme_id";
  const COOKIE_EXPIRY_DAYS = 365;
  function updateColorSchemeCookie(id) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const cookieName = options.dark ? DARK_SCHEME_COOKIE_NAME : COLOR_SCHEME_COOKIE_NAME;
    if (id) {
      (0, _cookie.default)(cookieName, id, {
        path: "/",
        expires: COOKIE_EXPIRY_DAYS
      });
    } else {
      (0, _cookie.removeCookie)(cookieName, {
        path: "/"
      });
    }
  }
  function extendColorSchemeCookies() {
    for (const cookieName of [COLOR_SCHEME_COOKIE_NAME, DARK_SCHEME_COOKIE_NAME]) {
      const currentValue = (0, _cookie.default)(cookieName);
      if (currentValue) {
        (0, _cookie.default)(cookieName, currentValue, {
          path: "/",
          expires: COOKIE_EXPIRY_DAYS
        });
      }
    }
  }
});
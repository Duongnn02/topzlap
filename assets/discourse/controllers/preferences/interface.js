define("discourse/controllers/preferences/interface", ["exports", "@ember/controller", "discourse/models/bookmark", "discourse/models/session", "discourse/lib/utilities", "discourse/lib/color-scheme-picker", "discourse/lib/theme-selector", "@ember/object/computed", "I18n", "@ember/object", "discourse-common/utils/decorators", "discourse/lib/ajax-error", "discourse/helpers/page-reloader", "discourse/lib/computed"], function (_exports, _controller, _bookmark, _session, _utilities, _colorSchemePicker, _themeSelector, _computed, _I18n, _object, _decorators, _ajaxError, _pageReloader, _computed2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/models/bookmark",0,"discourse/models/session",0,"discourse/lib/utilities",0,"discourse/lib/color-scheme-picker",0,"discourse/lib/theme-selector",0,"@ember/object/computed",0,"I18n",0,"@ember/object",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error",0,"discourse/helpers/page-reloader",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const USER_HOMES = {
    1: "latest",
    2: "categories",
    3: "unread",
    4: "new",
    5: "top",
    6: "bookmarks",
    7: "unseen"
  };
  const TEXT_SIZES = ["smallest", "smaller", "normal", "larger", "largest"];
  const TITLE_COUNT_MODES = ["notifications", "contextual"];
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("makeThemeDefault"), _dec2 = (0, _decorators.default)(), _dec3 = (0, _decorators.default)("userSelectableThemes"), _dec4 = (0, _decorators.default)("themeId"), _dec5 = (0, _decorators.default)("userSelectableThemes", "userSelectableColorSchemes", "themeId"), _dec6 = (0, _decorators.default)("model.user_option.theme_ids", "themeId"), _dec7 = (0, _decorators.default)("model.user_option.text_size", "textSize"), _dec8 = (0, _decorators.default)(), _dec9 = (0, _decorators.default)("userSelectableDarkColorSchemes"), (_obj = {
    currentThemeId: -1,
    previewingColorScheme: false,
    selectedDarkColorSchemeId: null,
    preferencesController: (0, _controller.inject)("preferences"),
    makeColorSchemeDefault: true,
    canPreviewColorScheme: (0, _computed2.propertyEqual)("model.id", "currentUser.id"),
    subpageTitle: _I18n.default.t("user.preferences_nav.interface"),
    init() {
      this._super(...arguments);
      this.set("selectedDarkColorSchemeId", this.session.userDarkSchemeId);
    },
    saveAttrNames(makeThemeDefault) {
      let attrs = ["locale", "external_links_in_new_tab", "dynamic_favicon", "enable_quoting", "enable_defer", "automatically_unpin_topics", "allow_private_messages", "enable_allowed_pm_users", "homepage_id", "hide_profile_and_presence", "text_size", "title_count_mode", "skip_new_user_tips", "seen_popups", "color_scheme_id", "dark_scheme_id", "bookmark_auto_delete_preference"];
      if (makeThemeDefault) {
        attrs.push("theme_ids");
      }
      return attrs;
    },
    availableLocales() {
      return JSON.parse(this.siteSettings.available_locales);
    },
    defaultDarkSchemeId() {
      return this.siteSettings.default_dark_mode_color_scheme_id;
    },
    textSizes() {
      return TEXT_SIZES.map(value => {
        return {
          name: _I18n.default.t(`user.text_size.${value}`),
          value
        };
      });
    },
    homepageId: (0, _object.computed)("model.user_option.homepage_id", "userSelectableHome.[]", function () {
      return this.model.user_option.homepage_id || this.userSelectableHome.firstObject.value;
    }),
    titleCountModes() {
      return TITLE_COUNT_MODES.map(value => {
        return {
          name: _I18n.default.t(`user.title_count_mode.${value}`),
          value
        };
      });
    },
    bookmarkAfterNotificationModes() {
      return Object.keys(_bookmark.AUTO_DELETE_PREFERENCES).map(key => {
        return {
          value: _bookmark.AUTO_DELETE_PREFERENCES[key],
          name: _I18n.default.t(`bookmarks.auto_delete_preference.${key.toLowerCase()}`)
        };
      });
    },
    userSelectableThemes() {
      return (0, _themeSelector.listThemes)(this.site);
    },
    showThemeSelector(themes) {
      return themes && themes.length > 1;
    },
    themeIdChanged(themeId) {
      if (this.currentThemeId === -1) {
        this.set("currentThemeId", themeId);
        return false;
      } else {
        return this.currentThemeId !== themeId;
      }
    },
    userSelectableColorSchemes() {
      return (0, _colorSchemePicker.listColorSchemes)(this.site);
    },
    showColorSchemeSelector: (0, _computed.reads)("userSelectableColorSchemes.length"),
    selectedColorSchemeNoneLabel: _I18n.default.t("user.color_schemes.default_description"),
    currentSchemeCanBeSelected(userThemes, userColorSchemes, themeId) {
      if (!userThemes || !themeId) {
        return false;
      }
      const theme = userThemes.findBy("id", themeId);
      if (!theme) {
        return false;
      }
      return userColorSchemes.findBy("id", theme.color_scheme_id);
    },
    showColorSchemeNoneItem: (0, _computed.not)("currentSchemeCanBeSelected"),
    showThemeSetDefault(userOptionThemes, selectedTheme) {
      return !userOptionThemes || userOptionThemes[0] !== selectedTheme;
    },
    showTextSetDefault(userOptionTextSize, selectedTextSize) {
      return userOptionTextSize !== selectedTextSize;
    },
    homeChanged() {
      const siteHome = this.siteSettings.top_menu.split("|")[0].split(",")[0];
      const userHome = USER_HOMES[this.get("model.user_option.homepage_id")];
      (0, _utilities.setDefaultHomepage)(userHome || siteHome);
    },
    userSelectableHome() {
      let homeValues = {};
      Object.keys(USER_HOMES).forEach(newValue => {
        const newKey = USER_HOMES[newValue];
        homeValues[newKey] = newValue;
      });
      let result = [];
      this.siteSettings.top_menu.split("|").forEach(m => {
        let id = homeValues[m];
        if (id) {
          result.push({
            name: _I18n.default.t(`filters.${m}.title`),
            value: Number(id)
          });
        }
      });
      return result;
    },
    showDarkModeToggle() {
      return this.defaultDarkSchemeId > 0 && !this.showDarkColorSchemeSelector;
    },
    userSelectableDarkColorSchemes() {
      return (0, _colorSchemePicker.listColorSchemes)(this.site, {
        darkOnly: true
      });
    },
    showDarkColorSchemeSelector(darkSchemes) {
      // when a default dark scheme is set
      // dropdown has two items (disable / use site default)
      // but we show a checkbox in that case
      const minToShow = this.defaultDarkSchemeId > 0 ? 2 : 1;
      return darkSchemes && darkSchemes.length > minToShow;
    },
    enableDarkMode: (0, _object.computed)({
      set(key, value) {
        return value;
      },
      get() {
        return this.get("model.user_option.dark_scheme_id") === -1 ? false : true;
      }
    }),
    selectedColorSchemeId: (0, _object.computed)({
      set(key, value) {
        return value;
      },
      get() {
        if (!this.session.userColorSchemeId) {
          return;
        }
        const theme = this.userSelectableThemes?.findBy("id", this.themeId);

        // we don't want to display the numeric ID of a scheme
        // when it is set by the theme but not marked as user selectable
        if (theme?.color_scheme_id === this.session.userColorSchemeId && !this.userSelectableColorSchemes.findBy("id", this.session.userColorSchemeId)) {
          return;
        } else {
          return this.session.userColorSchemeId;
        }
      }
    }),
    actions: {
      save() {
        this.set("saved", false);
        const makeThemeDefault = this.makeThemeDefault;
        if (makeThemeDefault) {
          this.set("model.user_option.theme_ids", [this.themeId]);
        }
        const makeTextSizeDefault = this.makeTextSizeDefault;
        if (makeTextSizeDefault) {
          this.set("model.user_option.text_size", this.textSize);
        }
        if (!this.showColorSchemeSelector) {
          this.set("model.user_option.color_scheme_id", null);
        } else if (this.makeColorSchemeDefault) {
          this.set("model.user_option.color_scheme_id", this.selectedColorSchemeId);
        }
        if (this.showDarkModeToggle) {
          this.set("model.user_option.dark_scheme_id", this.enableDarkMode ? null : -1);
        } else {
          // if chosen dark scheme matches site dark scheme, no need to store
          if (this.defaultDarkSchemeId > 0 && this.selectedDarkColorSchemeId === this.defaultDarkSchemeId) {
            this.set("model.user_option.dark_scheme_id", null);
          } else {
            this.set("model.user_option.dark_scheme_id", this.selectedDarkColorSchemeId);
          }
        }
        return this.model.save(this.saveAttrNames).then(() => {
          this.set("saved", true);
          if (makeThemeDefault) {
            (0, _themeSelector.setLocalTheme)([]);
          } else {
            (0, _themeSelector.setLocalTheme)([this.themeId], this.get("model.user_option.theme_key_seq"));
          }
          if (makeTextSizeDefault) {
            this.model.updateTextSizeCookie(null);
          } else {
            this.model.updateTextSizeCookie(this.textSize);
          }
          if (this.makeColorSchemeDefault) {
            (0, _colorSchemePicker.updateColorSchemeCookie)(null);
            (0, _colorSchemePicker.updateColorSchemeCookie)(null, {
              dark: true
            });
          } else {
            (0, _colorSchemePicker.updateColorSchemeCookie)(this.selectedColorSchemeId);
            if (this.defaultDarkSchemeId > 0 && this.selectedDarkColorSchemeId === this.defaultDarkSchemeId) {
              (0, _colorSchemePicker.updateColorSchemeCookie)(null, {
                dark: true
              });
            } else {
              (0, _colorSchemePicker.updateColorSchemeCookie)(this.selectedDarkColorSchemeId, {
                dark: true
              });
            }
          }
          this.homeChanged();
          if (this.themeId !== this.currentThemeId) {
            (0, _pageReloader.reload)();
          }
        }).catch(_ajaxError.popupAjaxError);
      },
      selectTextSize(newSize) {
        const classList = document.documentElement.classList;
        TEXT_SIZES.forEach(name => {
          const className = `text-size-${name}`;
          if (newSize === name) {
            classList.add(className);
          } else {
            classList.remove(className);
          }
        });

        // Force refresh when leaving this screen
        this.session.requiresRefresh = true;
        this.set("textSize", newSize);
      },
      loadColorScheme(colorSchemeId) {
        this.setProperties({
          selectedColorSchemeId: colorSchemeId,
          previewingColorScheme: this.canPreviewColorScheme
        });
        if (!this.canPreviewColorScheme) {
          return;
        }
        if (colorSchemeId < 0) {
          const defaultTheme = this.userSelectableThemes.findBy("id", this.themeId);
          if (defaultTheme && defaultTheme.color_scheme_id) {
            colorSchemeId = defaultTheme.color_scheme_id;
          }
        }
        (0, _colorSchemePicker.loadColorSchemeStylesheet)(colorSchemeId, this.themeId);
        if (this.selectedDarkColorSchemeId === -1) {
          // set this same scheme for dark mode preview when dark scheme is disabled
          (0, _colorSchemePicker.loadColorSchemeStylesheet)(colorSchemeId, this.themeId, true);
        }
      },
      loadDarkColorScheme(colorSchemeId) {
        this.setProperties({
          selectedDarkColorSchemeId: colorSchemeId,
          previewingColorScheme: this.canPreviewColorScheme
        });
        if (!this.canPreviewColorScheme) {
          return;
        }
        if (colorSchemeId === -1) {
          // load preview of regular scheme when dark scheme is disabled
          (0, _colorSchemePicker.loadColorSchemeStylesheet)(this.selectedColorSchemeId, this.themeId, true);
          _session.default.currentProp("darkModeAvailable", false);
        } else {
          (0, _colorSchemePicker.loadColorSchemeStylesheet)(colorSchemeId, this.themeId, true);
          _session.default.currentProp("darkModeAvailable", true);
        }
      },
      undoColorSchemePreview() {
        this.setProperties({
          selectedColorSchemeId: this.session.userColorSchemeId,
          selectedDarkColorSchemeId: this.session.userDarkSchemeId,
          previewingColorScheme: false
        });
        const darkStylesheet = document.querySelector("link#cs-preview-dark"),
          lightStylesheet = document.querySelector("link#cs-preview-light");
        if (darkStylesheet) {
          darkStylesheet.remove();
        }
        if (lightStylesheet) {
          lightStylesheet.remove();
        }
      },
      resetSeenUserTips() {
        this.model.set("user_option.skip_new_user_tips", false);
        this.model.set("user_option.seen_popups", null);
        return this.model.save(["skip_new_user_tips", "seen_popups"]);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "saveAttrNames", [_dec], Object.getOwnPropertyDescriptor(_obj, "saveAttrNames"), _obj), _applyDecoratedDescriptor(_obj, "availableLocales", [_dec2], Object.getOwnPropertyDescriptor(_obj, "availableLocales"), _obj), _applyDecoratedDescriptor(_obj, "defaultDarkSchemeId", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "defaultDarkSchemeId"), _obj), _applyDecoratedDescriptor(_obj, "textSizes", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "textSizes"), _obj), _applyDecoratedDescriptor(_obj, "titleCountModes", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "titleCountModes"), _obj), _applyDecoratedDescriptor(_obj, "bookmarkAfterNotificationModes", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "bookmarkAfterNotificationModes"), _obj), _applyDecoratedDescriptor(_obj, "userSelectableThemes", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "userSelectableThemes"), _obj), _applyDecoratedDescriptor(_obj, "showThemeSelector", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showThemeSelector"), _obj), _applyDecoratedDescriptor(_obj, "themeIdChanged", [_dec4], Object.getOwnPropertyDescriptor(_obj, "themeIdChanged"), _obj), _applyDecoratedDescriptor(_obj, "userSelectableColorSchemes", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "userSelectableColorSchemes"), _obj), _applyDecoratedDescriptor(_obj, "currentSchemeCanBeSelected", [_dec5], Object.getOwnPropertyDescriptor(_obj, "currentSchemeCanBeSelected"), _obj), _applyDecoratedDescriptor(_obj, "showThemeSetDefault", [_dec6], Object.getOwnPropertyDescriptor(_obj, "showThemeSetDefault"), _obj), _applyDecoratedDescriptor(_obj, "showTextSetDefault", [_dec7], Object.getOwnPropertyDescriptor(_obj, "showTextSetDefault"), _obj), _applyDecoratedDescriptor(_obj, "userSelectableHome", [_dec8], Object.getOwnPropertyDescriptor(_obj, "userSelectableHome"), _obj), _applyDecoratedDescriptor(_obj, "showDarkModeToggle", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "showDarkModeToggle"), _obj), _applyDecoratedDescriptor(_obj, "userSelectableDarkColorSchemes", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "userSelectableDarkColorSchemes"), _obj), _applyDecoratedDescriptor(_obj, "showDarkColorSchemeSelector", [_dec9], Object.getOwnPropertyDescriptor(_obj, "showDarkColorSchemeSelector"), _obj)), _obj)));
  _exports.default = _default;
});
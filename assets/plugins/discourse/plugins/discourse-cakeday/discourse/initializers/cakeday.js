define("discourse/plugins/discourse-cakeday/discourse/initializers/cakeday", ["exports", "I18n", "discourse/lib/plugin-api", "discourse/plugins/discourse-cakeday/discourse/lib/cakeday", "discourse-common/lib/helpers"], function (_exports, _I18n, _pluginApi, _cakeday, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/plugin-api",0,"discourse/plugins/discourse-cakeday/discourse/lib/cakeday",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  function initializeCakeday(api) {
    const currentUser = api.getCurrentUser();
    if (!currentUser) {
      return;
    }
    const store = api.container.lookup("service:store");
    store.addPluralization("anniversary", "anniversaries");
    const siteSettings = api.container.lookup("site-settings:main");
    const emojiEnabled = siteSettings.enable_emoji;
    const cakedayEnabled = siteSettings.cakeday_enabled;
    const birthdayEnabled = siteSettings.cakeday_birthday_enabled;
    if (cakedayEnabled) {
      api.includePostAttributes("user_cakedate");
      api.addPosterIcon((_, _ref) => {
        let {
          user_cakedate,
          user_id
        } = _ref;
        if ((0, _cakeday.cakeday)(user_cakedate)) {
          let result = {};
          if (emojiEnabled) {
            result.emoji = siteSettings.cakeday_emoji;
          } else {
            result.icon = "birthday-cake";
          }
          if (user_id === currentUser?.id) {
            result.title = _I18n.default.t("user.anniversary.user_title");
          } else {
            result.title = _I18n.default.t("user.anniversary.title");
          }
          return result;
        }
      });
    }
    if (birthdayEnabled) {
      api.includePostAttributes("user_birthdate");
      api.addPosterIcon((_, _ref2) => {
        let {
          user_birthdate,
          user_id
        } = _ref2;
        if ((0, _cakeday.birthday)(user_birthdate)) {
          let result = {};
          if (emojiEnabled) {
            result.emoji = siteSettings.cakeday_birthday_emoji;
          } else {
            result.icon = "birthday-cake";
          }
          if (user_id === currentUser?.id) {
            result.title = _I18n.default.t("user.date_of_birth.user_title");
          } else {
            result.title = _I18n.default.t("user.date_of_birth.title");
          }
          return result;
        }
      });
    }
    if (cakedayEnabled || birthdayEnabled) {
      (0, _helpers.registerUnbound)("cakeday-date", (val, _ref3) => {
        let {
          isBirthday
        } = _ref3;
        const date = moment(val);
        if (isBirthday) {
          return date.format(_I18n.default.t("dates.full_no_year_no_time"));
        } else {
          return date.format(_I18n.default.t("dates.full_with_year_no_time"));
        }
      });
      if (siteSettings.navigation_menu !== "legacy" && api.addCommunitySectionLink) {
        if (cakedayEnabled) {
          api.addCommunitySectionLink({
            name: "anniversaries",
            route: "cakeday.anniversaries.today",
            title: _I18n.default.t("anniversaries.title"),
            text: _I18n.default.t("anniversaries.title")
          });
        }
        if (birthdayEnabled) {
          api.addCommunitySectionLink({
            name: "birthdays",
            route: "cakeday.birthdays.today",
            title: _I18n.default.t("birthdays.title"),
            text: _I18n.default.t("birthdays.title")
          });
        }
      } else {
        api.decorateWidget("hamburger-menu:generalLinks", () => {
          let route;
          if (cakedayEnabled) {
            route = "cakeday.anniversaries.today";
          } else if (birthdayEnabled) {
            route = "cakeday.birthdays.today";
          }
          return {
            route,
            label: "cakeday.title",
            className: "cakeday-link"
          };
        });
      }
    }
  }
  var _default = {
    name: "cakeday",
    initialize() {
      (0, _pluginApi.withPluginApi)("0.1", api => initializeCakeday(api));
    }
  };
  _exports.default = _default;
});
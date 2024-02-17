define("discourse/plugins/discourse-cakeday/discourse/lib/cakeday", ["exports", "@ember/utils"], function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.birthday = birthday;
  _exports.birthdayTitle = birthdayTitle;
  _exports.cakeday = cakeday;
  _exports.cakedayTitle = cakedayTitle;
  0; //eaimeta@70e063a35619d71f0,"@ember/utils"eaimeta@70e063a35619d71f
  function cakeday(date) {
    return !(0, _utils.isEmpty)(date) && isSameDay(date, {
      anniversary: true
    });
  }
  function birthday(date) {
    return !(0, _utils.isEmpty)(date) && isSameDay(date);
  }
  function cakedayTitle(user, currentUser) {
    if (user.id === currentUser?.id) {
      return "user.anniversary.user_title";
    } else {
      return "user.anniversary.title";
    }
  }
  function birthdayTitle(user, currentUser) {
    if (user.id === currentUser?.id) {
      return "user.date_of_birth.user_title";
    } else {
      return "user.date_of_birth.title";
    }
  }
  function isSameDay(dateString, opts) {
    const now = moment();
    const date = moment(dateString);
    if (opts?.anniversary) {
      if (now.format("YYYY") <= date.format("YYYY")) {
        return false;
      }
    }
    return now.format("MMDD") === date.format("MMDD");
  }
});
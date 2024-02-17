define("discourse/helpers/user-avatar", ["exports", "discourse/lib/utilities", "I18n", "@ember/object", "@ember/template", "discourse/lib/settings", "discourse-common/lib/helpers"], function (_exports, _utilities, _I18n, _object, _template, _settings, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addExtraUserClasses = addExtraUserClasses;
  _exports.classesForUser = classesForUser;
  _exports.registerCustomAvatarHelper = registerCustomAvatarHelper;
  _exports.renderAvatar = renderAvatar;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/utilities",0,"I18n",0,"@ember/object",0,"@ember/template",0,"discourse/lib/settings",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  let _customAvatarHelpers;
  function registerCustomAvatarHelper(fn) {
    _customAvatarHelpers = _customAvatarHelpers || [];
    _customAvatarHelpers.push(fn);
  }
  function addExtraUserClasses(u, args) {
    let extraClasses = classesForUser(u).join(" ");
    if (extraClasses && extraClasses.length) {
      args.extraClasses = extraClasses;
    }
    return args;
  }
  function classesForUser(u) {
    let result = [];
    if (_customAvatarHelpers) {
      for (let i = 0; i < _customAvatarHelpers.length; i++) {
        result = result.concat(_customAvatarHelpers[i](u));
      }
    }
    return result;
  }
  function renderAvatar(user, options) {
    options = options || {};
    if (user) {
      const name = (0, _object.get)(user, options.namePath || "name");
      const username = (0, _object.get)(user, options.usernamePath || "username");
      const avatarTemplate = (0, _object.get)(user, options.avatarTemplatePath || "avatar_template");
      if (!username || !avatarTemplate) {
        return "";
      }
      let displayName = (0, _settings.prioritizeNameInUx)(name) ? name : (0, _utilities.formatUsername)(username);
      let title = options.title;
      if (!title && !options.ignoreTitle) {
        // first try to get a title
        title = (0, _object.get)(user, "title");
        // if there was no title provided
        if (!title) {
          // try to retrieve a description
          const description = (0, _object.get)(user, "description");
          // if a description has been provided
          if (description && description.length > 0) {
            // prepend the username before the description
            title = _I18n.default.t("user.avatar.name_and_description", {
              name: displayName,
              description
            });
          }
        }
      }
      return (0, _utilities.avatarImg)({
        size: options.imageSize,
        extraClasses: (0, _object.get)(user, "extras") || options.extraClasses,
        title: title || displayName,
        avatarTemplate
      });
    } else {
      return "";
    }
  }
  (0, _helpers.registerUnbound)("avatar", function (user, params) {
    return (0, _template.htmlSafe)(renderAvatar.call(this, user, params));
  });
});
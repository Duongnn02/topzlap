define("select-kit/components/user-chooser", ["exports", "discourse/lib/user-search", "select-kit/components/multi-select", "@ember/object", "@ember/utils", "discourse-common/lib/helpers"], function (_exports, _userSearch, _multiSelect, _object, _utils, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.CUSTOM_USER_SEARCH_OPTIONS = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/user-search",0,"select-kit/components/multi-select",0,"@ember/object",0,"@ember/utils",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  const CUSTOM_USER_SEARCH_OPTIONS = [];
  _exports.CUSTOM_USER_SEARCH_OPTIONS = CUSTOM_USER_SEARCH_OPTIONS;
  var _default = _multiSelect.default.extend({
    pluginApiIdentifiers: ["user-chooser"],
    classNames: ["user-chooser"],
    valueProperty: "username",
    modifyComponentForRow() {
      return "user-chooser/user-row";
    },
    selectKitOptions: {
      topicId: undefined,
      categoryId: undefined,
      includeGroups: false,
      allowedUsers: false,
      includeMentionableGroups: false,
      includeMessageableGroups: false,
      allowEmails: false,
      groupMembersOf: undefined,
      excludeCurrentUser: false,
      customSearchOptions: undefined,
      excludedUsernames: undefined
    },
    content: (0, _object.computed)("value.[]", function () {
      return (0, _helpers.makeArray)(this.value).map(x => this.defaultItem(x, x));
    }),
    excludedUsers: (0, _object.computed)("value", "currentUser", "selectKit.options.{excludeCurrentUser,excludedUsernames}", {
      get() {
        const options = this.selectKit.options;
        let usernames = (0, _helpers.makeArray)(this.value);
        if (this.currentUser && options.excludeCurrentUser) {
          usernames = usernames.concat([this.currentUser.username]);
        }
        return usernames.concat(options.excludedUsernames || []);
      }
    }),
    search() {
      let filter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      filter = filter || "";
      filter = filter.replace(/^@/, "");
      const options = this.selectKit.options;
      if (filter === "" && options?.customSearchOptions?.defaultSearchResults) {
        return Promise.resolve(options.customSearchOptions.defaultSearchResults);
      }

      // prevents doing ajax request for nothing
      const skippedSearch = (0, _userSearch.skipSearch)(filter, options.allowEmails);
      const eagerComplete = (0, _userSearch.eagerCompleteSearch)(filter, options.topicId || options.categoryId);
      if (skippedSearch || filter === "" && !eagerComplete) {
        return;
      }
      let customUserSearchOptions = {};
      if (options.customSearchOptions && (0, _utils.isPresent)(CUSTOM_USER_SEARCH_OPTIONS)) {
        customUserSearchOptions = CUSTOM_USER_SEARCH_OPTIONS.reduce((obj, option) => {
          return {
            ...obj,
            [option]: options.customSearchOptions[option]
          };
        }, {});
      }
      return (0, _userSearch.default)({
        term: filter,
        topicId: options.topicId,
        categoryId: options.categoryId,
        exclude: this.excludedUsers,
        includeGroups: options.includeGroups,
        allowedUsers: options.allowedUsers,
        includeMentionableGroups: options.includeMentionableGroups,
        includeMessageableGroups: options.includeMessageableGroups,
        groupMembersOf: options.groupMembersOf,
        allowEmails: options.allowEmails,
        includeStagedUsers: this.includeStagedUsers,
        customUserSearchOptions
      }).then(result => {
        if (typeof result === "string") {
          // do nothing promise probably got cancelled
        } else {
          return result;
        }
      });
    }
  });
  _exports.default = _default;
});
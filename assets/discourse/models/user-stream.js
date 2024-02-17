define("discourse/models/user-stream", ["exports", "discourse-common/utils/decorators", "@ember/array", "rsvp", "discourse/models/rest", "discourse/models/user-action", "discourse/lib/ajax", "discourse/lib/text", "discourse/lib/utilities", "discourse/lib/computed"], function (_exports, _decorators, _array, _rsvp, _rest, _userAction, _ajax, _text, _utilities, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"@ember/array",0,"rsvp",0,"discourse/models/rest",0,"discourse/models/user-action",0,"discourse/lib/ajax",0,"discourse/lib/text",0,"discourse/lib/utilities",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _rest.default.extend((_dec = (0, _decorators.on)("init"), _dec2 = (0, _decorators.default)("filter"), _dec3 = (0, _decorators.default)("loaded", "content.[]"), (_obj = {
    loaded: false,
    _initialize() {
      this.setProperties({
        itemsLoaded: 0,
        content: []
      });
    },
    filterParam(filter) {
      if (filter === _userAction.default.TYPES.replies) {
        return [_userAction.default.TYPES.replies, _userAction.default.TYPES.quotes].join(",");
      }
      if (!filter) {
        return [_userAction.default.TYPES.topics, _userAction.default.TYPES.posts].join(",");
      }
      return filter;
    },
    baseUrl: (0, _computed.url)("itemsLoaded", "user.username_lower", "/user_actions.json?offset=%@&username=%@"),
    filterBy(opts) {
      this.setProperties(Object.assign({
        itemsLoaded: 0,
        content: [],
        lastLoadedUrl: null
      }, opts));
      return this.findItems();
    },
    noContent(loaded, content) {
      return loaded && content.length === 0;
    },
    remove(userAction) {
      // 1) remove the user action from the child groups
      this.content.forEach(ua => {
        ["likes", "stars", "edits", "bookmarks"].forEach(group => {
          const items = ua.get(`childGroups.${group}.items`);
          if (items) {
            items.removeObject(userAction);
          }
        });
      });

      // 2) remove the parents that have no children
      const content = this.content.filter(ua => {
        return ["likes", "stars", "edits", "bookmarks"].some(group => {
          return ua.get(`childGroups.${group}.items.length`) > 0;
        });
      });
      this.setProperties({
        content,
        itemsLoaded: content.length
      });
    },
    findItems() {
      let findUrl = this.baseUrl;
      if (this.filterParam) {
        findUrl += `&filter=${this.filterParam}`;
      }
      if (this.actingUsername) {
        findUrl += `&acting_username=${this.actingUsername}`;
      }

      // Don't load the same stream twice. We're probably at the end.
      const lastLoadedUrl = this.lastLoadedUrl;
      if (lastLoadedUrl === findUrl) {
        return _rsvp.Promise.resolve();
      }
      if (this.loading) {
        return _rsvp.Promise.resolve();
      }
      this.set("loading", true);
      return (0, _ajax.ajax)(findUrl).then(result => {
        if (result && result.user_actions) {
          const copy = (0, _array.A)();
          result.user_actions.forEach(action => {
            action.title = (0, _text.emojiUnescape)((0, _utilities.escapeExpression)(action.title));
            copy.pushObject(_userAction.default.create(action));
          });
          this.content.pushObjects(_userAction.default.collapseStream(copy));
          this.setProperties({
            itemsLoaded: this.itemsLoaded + result.user_actions.length
          });
        }
      }).finally(() => this.setProperties({
        loaded: true,
        loading: false,
        lastLoadedUrl: findUrl
      }));
    }
  }, (_applyDecoratedDescriptor(_obj, "_initialize", [_dec], Object.getOwnPropertyDescriptor(_obj, "_initialize"), _obj), _applyDecoratedDescriptor(_obj, "filterParam", [_dec2], Object.getOwnPropertyDescriptor(_obj, "filterParam"), _obj), _applyDecoratedDescriptor(_obj, "noContent", [_dec3], Object.getOwnPropertyDescriptor(_obj, "noContent"), _obj)), _obj)));
  _exports.default = _default;
});
define("discourse/models/nav-item", ["exports", "discourse/models/category", "@ember/object", "I18n", "discourse/models/site", "discourse/models/user", "discourse-common/lib/object", "discourse-common/lib/deprecated", "discourse-common/utils/decorators", "discourse/lib/text", "discourse-common/lib/get-owner", "discourse/lib/topic-list-tracked-filter", "discourse-common/lib/get-url", "@ember/object/computed"], function (_exports, _category, _object, _I18n, _site, _user, _object2, _deprecated, _decorators, _text, _getOwner, _topicListTrackedFilter, _getUrl, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addNavItem = addNavItem;
  _exports.clearNavItems = clearNavItems;
  _exports.customNavItemHref = customNavItemHref;
  _exports.default = void 0;
  _exports.extraNavItemProperties = extraNavItemProperties;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj, _init, _init2;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/category",0,"@ember/object",0,"I18n",0,"discourse/models/site",0,"discourse/models/user",0,"discourse-common/lib/object",0,"discourse-common/lib/deprecated",0,"discourse-common/utils/decorators",0,"discourse/lib/text",0,"discourse-common/lib/get-owner",0,"discourse/lib/topic-list-tracked-filter",0,"discourse-common/lib/get-url",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const NavItem = _object.default.extend((_dec = (0, _decorators.default)("name"), _dec2 = (0, _decorators.default)("name", "count"), _dec3 = (0, _decorators.default)("filterType", "category", "noSubcategories", "tagId"), _dec4 = (0, _decorators.default)("name", "category", "noSubcategories"), _dec5 = (0, _decorators.default)("name", "category", "tagId", "noSubcategories", "currentRouteQueryParams", "topicTrackingState.messageCount"), (_obj = {
    title: {
      get(name) {
        if (this._title) {
          return this._title;
        }
        return _I18n.default.t("filters." + name.replace("/", ".") + ".help", {});
      },
      set(value) {
        return this.set("_title", value);
      }
    },
    displayName: {
      get(name, count) {
        if (this._displayName) {
          return this._displayName;
        }
        count = count || 0;
        if (name === "latest" && (!_site.default.currentProp("mobileView") || this.tagId !== undefined)) {
          count = 0;
        }
        let extra = {
          count
        };
        const titleKey = count === 0 ? ".title" : ".title_with_count";
        return (0, _text.emojiUnescape)(_I18n.default.t(`filters.${name.replace("/", ".") + titleKey}`, extra));
      },
      set(value) {
        return this.set("_displayName", value);
      }
    },
    href(filterType, category, noSubcategories, tagId) {
      let customHref = null;
      NavItem.customNavItemHrefs.forEach(function (cb) {
        customHref = cb.call(this, this);
        if (customHref) {
          return false;
        }
      }, this);
      if (customHref) {
        return (0, _getUrl.default)(customHref);
      }
      const context = {
        category,
        noSubcategories,
        tagId
      };
      return NavItem.pathFor(filterType, context);
    },
    filterType: (0, _computed.reads)("name"),
    filterMode(name, category, noSubcategories) {
      let mode = "";
      if (category) {
        mode += "c/";
        mode += _category.default.slugFor(category);
        if (noSubcategories) {
          mode += "/none";
        }
        mode += "/l/";
      }
      return mode + name.replace(" ", "-");
    },
    count(name, category, tagId, noSubcategories, currentRouteQueryParams) {
      const state = this.topicTrackingState;
      if (state) {
        return state.lookupCount({
          type: name,
          category,
          tagId,
          noSubcategories,
          customFilterFn: (0, _topicListTrackedFilter.hasTrackedFilter)(currentRouteQueryParams) ? _topicListTrackedFilter.isTrackedTopic : undefined
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "title", [_dec], (_init = Object.getOwnPropertyDescriptor(_obj, "title"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "displayName", [_dec2], (_init2 = Object.getOwnPropertyDescriptor(_obj, "displayName"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "href", [_dec3], Object.getOwnPropertyDescriptor(_obj, "href"), _obj), _applyDecoratedDescriptor(_obj, "filterMode", [_dec4], Object.getOwnPropertyDescriptor(_obj, "filterMode"), _obj), _applyDecoratedDescriptor(_obj, "count", [_dec5], Object.getOwnPropertyDescriptor(_obj, "count"), _obj)), _obj)));
  const ExtraNavItem = NavItem.extend({
    href: (0, _decorators.default)("href", {
      get() {
        if (this._href) {
          return this._href;
        }
        return this.href;
      },
      set(key, value) {
        return this._href = value;
      }
    }),
    count: 0,
    customFilter: null
  });
  NavItem.reopenClass({
    extraArgsCallbacks: [],
    customNavItemHrefs: [],
    extraNavItemDescriptors: [],
    pathFor(filterType, context) {
      let path = (0, _getUrl.default)("");
      let includesCategoryContext = false;
      let includesTagContext = false;
      if (filterType === "categories") {
        path += "/categories";
        return path;
      }
      if (context.tagId && _site.default.currentProp("filters").includes(filterType)) {
        includesTagContext = true;
        if (context.category) {
          path += "/tags";
        } else {
          path += "/tag";
        }
      }
      if (context.category) {
        includesCategoryContext = true;
        path += `/c/${_category.default.slugFor(context.category)}/${context.category.id}`;
        if (context.noSubcategories) {
          path += "/none";
        }
      }
      if (includesTagContext) {
        path += `/${context.tagId}`;
      }
      if (includesTagContext || includesCategoryContext) {
        path += "/l";
      }
      path += `/${filterType}`;

      // In the case of top, the nav item doesn't include a period because the
      // period has its own selector just below

      return path;
    },
    // Create a nav item given a filterType. It returns null if there is not
    // valid nav item. The name is a historical artifact.
    fromText(filterType, opts) {
      const anonymous = !_user.default.current();
      opts = opts || {};
      if (anonymous) {
        const topMenuItems = _site.default.currentProp("anonymous_top_menu_items");
        if (!topMenuItems || !topMenuItems.includes(filterType)) {
          return null;
        }
      }
      if (!_category.default.list() && filterType === "categories") {
        return null;
      }
      if (!_site.default.currentProp("top_menu_items").includes(filterType)) {
        return null;
      }
      let args = {
        name: filterType,
        hasIcon: filterType === "unread"
      };
      if (opts.category) {
        args.category = opts.category;
      }
      if (opts.tagId) {
        args.tagId = opts.tagId;
      }
      if (opts.currentRouteQueryParams) {
        args.currentRouteQueryParams = opts.currentRouteQueryParams;
      }
      if (opts.noSubcategories) {
        args.noSubcategories = true;
      }
      NavItem.extraArgsCallbacks.forEach(cb => (0, _object2.deepMerge)(args, cb.call(this, filterType, opts)));
      let store = (0, _getOwner.getOwner)(this).lookup("service:store");
      return store.createRecord("nav-item", args);
    },
    buildList(category, args) {
      args = args || {};
      if (category) {
        args.category = category;
      }
      if (!args.siteSettings) {
        (0, _deprecated.default)("You must supply `buildList` with a `siteSettings` object", {
          since: "2.6.0",
          dropFrom: "2.7.0",
          id: "discourse.nav-item.built-list-site-settings"
        });
        args.siteSettings = (0, _getOwner.getOwner)(this).lookup("service:site-settings");
      }
      let items = args.siteSettings.top_menu.split("|");
      const user = (0, _getOwner.getOwner)(this).lookup("service:current-user");
      if (user?.new_new_view_enabled) {
        items = items.reject(item => item === "unread");
      }
      const filterType = (args.filterMode || "").split("/").pop();
      if (!items.some(i => filterType === i)) {
        items.push(filterType);
      }
      items = items.map(i => NavItem.fromText(i, args)).filter(i => {
        if (i === null) {
          return false;
        }
        if ((category || args.skipCategoriesNavItem) && i.name.startsWith("categor")) {
          return false;
        }
        return true;
      });
      const context = {
        category: args.category,
        tagId: args.tagId,
        noSubcategories: args.noSubcategories
      };
      const extraItems = NavItem.extraNavItemDescriptors.map(descriptor => ExtraNavItem.create((0, _object2.deepMerge)({}, context, descriptor))).filter(item => {
        if (!item.customFilter) {
          return true;
        }
        return item.customFilter(category, args);
      });
      let forceActive = false;
      extraItems.forEach(item => {
        if (item.init) {
          item.init(item, category, args);
        }
        if (item.href) {
          item.href = (0, _getUrl.default)(item.href);
        }
        const before = item.before;
        if (before) {
          let i = 0;
          for (i = 0; i < items.length; i++) {
            if (items[i].name === before) {
              break;
            }
          }
          items.splice(i, 0, item);
        } else {
          items.push(item);
        }
        if (item.customHref) {
          item.set("href", item.customHref(category, args));
        }
        if (item.forceActive && item.forceActive(category, args)) {
          item.active = true;
          forceActive = true;
        } else {
          item.active = undefined;
        }
      });
      if (forceActive) {
        items.forEach(i => {
          if (i.active === undefined) {
            i.active = false;
          }
        });
      }
      return items;
    }
  });
  var _default = NavItem;
  _exports.default = _default;
  function extraNavItemProperties(cb) {
    NavItem.extraArgsCallbacks.push(cb);
  }
  function customNavItemHref(cb) {
    NavItem.customNavItemHrefs.push(cb);
  }
  function clearNavItems() {
    NavItem.customNavItemHrefs.clear();
    NavItem.extraArgsCallbacks.clear();
    NavItem.extraNavItemDescriptors.clear();
  }
  function addNavItem(item) {
    NavItem.extraNavItemDescriptors.push(item);
  }
});
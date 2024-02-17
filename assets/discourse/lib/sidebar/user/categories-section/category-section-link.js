define("discourse/lib/sidebar/user/categories-section/category-section-link", ["exports", "I18n", "@glimmer/tracking", "@ember/object", "discourse-common/utils/decorators", "discourse/models/category", "discourse/controllers/preferences/sidebar"], function (_exports, _I18n, _tracking, _object, _decorators, _category, _sidebar) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.registerCustomCountable = registerCustomCountable;
  _exports.resetCustomCountables = resetCustomCountables;
  var _class, _descriptor, _countables, _linkToNew;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"@glimmer/tracking",0,"@ember/object",0,"discourse-common/utils/decorators",0,"discourse/models/category",0,"discourse/controllers/preferences/sidebar"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
  function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
  function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
  function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
  function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
  function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const UNREAD_AND_NEW_COUNTABLE = {
    propertyName: "unreadAndNewCount",
    badgeTextFunction: count => count.toString(),
    route: "discovery.newCategory",
    refreshCountFunction: _ref => {
      let {
        topicTrackingState,
        category
      } = _ref;
      return topicTrackingState.countNewAndUnread({
        categoryId: category.id
      });
    }
  };
  const DEFAULT_COUNTABLES = [{
    propertyName: "totalUnread",
    badgeTextFunction: count => {
      return _I18n.default.t("sidebar.unread_count", {
        count
      });
    },
    route: "discovery.unreadCategory",
    refreshCountFunction: _ref2 => {
      let {
        topicTrackingState,
        category
      } = _ref2;
      return topicTrackingState.countUnread({
        categoryId: category.id
      });
    }
  }, {
    propertyName: "totalNew",
    badgeTextFunction: count => {
      return _I18n.default.t("sidebar.new_count", {
        count
      });
    },
    route: "discovery.newCategory",
    refreshCountFunction: _ref3 => {
      let {
        topicTrackingState,
        category
      } = _ref3;
      return topicTrackingState.countNew({
        categoryId: category.id
      });
    }
  }];
  const customCountables = [];
  function registerCustomCountable(_ref4) {
    let {
      badgeTextFunction,
      route,
      routeQuery,
      shouldRegister,
      refreshCountFunction,
      prioritizeOverDefaults
    } = _ref4;
    const length = customCountables.length + 1;
    customCountables.push({
      propertyName: `customCountableProperty${length}`,
      badgeTextFunction,
      route,
      routeQuery,
      shouldRegister,
      refreshCountFunction,
      prioritizeOverDefaults
    });
  }
  function resetCustomCountables() {
    customCountables.length = 0;
  }
  let CategorySectionLink = (_class = (_countables = /*#__PURE__*/new WeakSet(), _linkToNew = /*#__PURE__*/new WeakMap(), class CategorySectionLink {
    constructor(_ref5) {
      let {
        category,
        topicTrackingState,
        currentUser
      } = _ref5;
      _classPrivateFieldInitSpec(this, _linkToNew, {
        get: _get_linkToNew,
        set: void 0
      });
      _classPrivateMethodInitSpec(this, _countables);
      _initializerDefineProperty(this, "activeCountable", _descriptor, this);
      this.category = category;
      this.topicTrackingState = topicTrackingState;
      this.currentUser = currentUser;
      this.countables = _classPrivateMethodGet(this, _countables, _countables2).call(this);
      this.refreshCounts();
    }
    get hideCount() {
      return this.currentUser?.sidebarListDestination !== _sidebar.UNREAD_LIST_DESTINATION;
    }
    refreshCounts() {
      this.countables = _classPrivateMethodGet(this, _countables, _countables2).call(this);
      this.activeCountable = this.countables.find(countable => {
        const count = countable.refreshCountFunction({
          topicTrackingState: this.topicTrackingState,
          category: this.category
        });
        (0, _object.set)(this, countable.propertyName, count);
        return count > 0;
      });
    }
    get name() {
      return this.category.slug;
    }
    get model() {
      return `${_category.default.slugFor(this.category)}/${this.category.id}`;
    }
    get currentWhen() {
      return "discovery.unreadCategory discovery.topCategory discovery.newCategory discovery.latestCategory discovery.category discovery.categoryNone discovery.categoryAll";
    }
    get title() {
      return this.category.description_text;
    }
    get text() {
      return this.category.name;
    }
    get prefixType() {
      return "span";
    }
    get prefixElementColors() {
      return [this.category.parentCategory?.color, this.category.color];
    }
    get prefixColor() {
      return this.category.color;
    }
    get prefixBadge() {
      if (this.category.read_restricted) {
        return "lock";
      }
    }
    get badgeText() {
      if (this.hideCount && !_classPrivateFieldGet(this, _linkToNew)) {
        return;
      }
      const activeCountable = this.activeCountable;
      if (activeCountable) {
        return activeCountable.badgeTextFunction((0, _object.get)(this, activeCountable.propertyName));
      }
    }
    get route() {
      if (this.currentUser?.sidebarListDestination === _sidebar.UNREAD_LIST_DESTINATION || _classPrivateFieldGet(this, _linkToNew)) {
        const activeCountable = this.activeCountable;
        if (activeCountable) {
          return activeCountable.route;
        }
      }
      return "discovery.category";
    }
    get query() {
      if (this.currentUser?.sidebarListDestination === _sidebar.UNREAD_LIST_DESTINATION) {
        const activeCountable = this.activeCountable;
        if (activeCountable?.routeQuery) {
          return activeCountable.routeQuery;
        }
      }
    }
    get suffixCSSClass() {
      return "unread";
    }
    get suffixType() {
      return "icon";
    }
    get suffixValue() {
      if (this.hideCount && this.activeCountable && !_classPrivateFieldGet(this, _linkToNew)) {
        return "circle";
      }
    }
  }), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "activeCountable", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "refreshCounts", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "refreshCounts"), _class.prototype)), _class);
  _exports.default = CategorySectionLink;
  function _countables2() {
    const countables = [];
    if (_classPrivateFieldGet(this, _linkToNew)) {
      countables.push(UNREAD_AND_NEW_COUNTABLE);
    } else {
      countables.push(...DEFAULT_COUNTABLES);
    }
    if (customCountables.length > 0) {
      customCountables.forEach(customCountable => {
        if (!customCountable.shouldRegister || customCountable.shouldRegister({
          category: this.category
        })) {
          if (customCountable?.prioritizeOverDefaults({
            category: this.category,
            currentUser: this.currentUser
          })) {
            countables.unshift(customCountable);
          } else {
            countables.push(customCountable);
          }
        }
      });
    }
    return countables;
  }
  function _get_linkToNew() {
    return !!this.currentUser?.new_new_view_enabled;
  }
});
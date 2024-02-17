define("discourse/lib/sidebar/user/messages-section/group-message-section-link", ["exports", "I18n", "discourse/lib/sidebar/user/messages-section/message-section-link"], function (_exports, _I18n, _messageSectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/sidebar/user/messages-section/message-section-link"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  class GroupMessageSectionLink extends _messageSectionLink.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "routeNames", new Set(["userPrivateMessages.group", "userPrivateMessages.group.index", "userPrivateMessages.group.unread", "userPrivateMessages.group.new", "userPrivateMessages.group.archive"]));
    }
    get name() {
      return `group-messages-${this.type}`;
    }
    get class() {
      return this.group.name;
    }
    get route() {
      if (this._isInbox) {
        return "userPrivateMessages.group";
      } else {
        return `userPrivateMessages.group.${this.type}`;
      }
    }
    get currentWhen() {
      if (this._isInbox) {
        return [...this.routeNames].join(" ");
      }
    }
    get models() {
      return [this.currentUser, this.group.name];
    }
    get text() {
      if (this._isInbox) {
        return this.group.name;
      } else if (this.count > 0) {
        return _I18n.default.t(`sidebar.sections.messages.links.${this.type}_with_count`, {
          count: this.count
        });
      } else {
        return _I18n.default.t(`sidebar.sections.messages.links.${this.type}`);
      }
    }
    pageChanged(_ref) {
      let {
        currentRouteName,
        currentRouteParentParams,
        privateMessageTopic
      } = _ref;
      if (this._isInbox) {
        return;
      }
      if (privateMessageTopic?.allowedGroups?.some(g => g.name === this.group.name)) {
        this.setDisplayState = true;
        return;
      }
      this.setDisplayState = this.routeNames.has(currentRouteName) && currentRouteParentParams.name.toLowerCase() === this.group.name.toLowerCase();
    }
  }
  _exports.default = GroupMessageSectionLink;
});
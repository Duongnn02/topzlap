define("discourse/lib/sidebar/user/messages-section/personal-message-section-link", ["exports", "I18n", "discourse/lib/sidebar/user/messages-section/message-section-link"], function (_exports, _I18n, _messageSectionLink) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/lib/sidebar/user/messages-section/message-section-link"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  class PersonalMessageSectionLink extends _messageSectionLink.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "routeNames", new Set(["userPrivateMessages.user", "userPrivateMessages.user.index", "userPrivateMessages.user.unread", "userPrivateMessages.user.sent", "userPrivateMessages.user.new", "userPrivateMessages.user.archive"]));
    }
    get name() {
      return `personal-messages-${this.type}`;
    }
    get class() {
      return `personal-messages`;
    }
    get route() {
      if (this._isInbox) {
        return "userPrivateMessages.user.index";
      } else {
        return `userPrivateMessages.user.${this.type}`;
      }
    }
    get currentWhen() {
      if (this._isInbox) {
        return [...this.routeNames].join(" ");
      }
    }
    get model() {
      return this.currentUser;
    }
    get text() {
      if (this.count > 0) {
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
        privateMessageTopic
      } = _ref;
      if (this._isInbox) {
        return;
      }
      if (privateMessageTopic?.allowedGroups?.length === 0) {
        this.setDisplayState = true;
        return;
      }
      this.setDisplayState = this.routeNames.has(currentRouteName);
    }
  }
  _exports.default = PersonalMessageSectionLink;
});
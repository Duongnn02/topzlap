define("discourse/controllers/preferences/tracking", ["exports", "@ember/controller", "discourse/lib/notification-levels", "I18n", "discourse/lib/ajax-error", "@ember/object", "@ember/service", "@glimmer/tracking"], function (_exports, _controller, _notificationLevels, _I18n, _ajaxError, _object, _service, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _class2, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/lib/notification-levels",0,"I18n",0,"discourse/lib/ajax-error",0,"@ember/object",0,"@ember/service",0,"@glimmer/tracking"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  let _class = (_dec = (0, _object.computed)("model.watched_tags.[]", "model.watching_first_post_tags.[]", "model.tracked_tags.[]", "model.muted_tags.[]"), _dec2 = (0, _object.computed)("model.watchedCategories", "model.watchedFirstPostCategories", "model.trackedCategories", "model.mutedCategories", "model.regularCategories", "siteSettings.mute_all_categories_by_default"), _dec3 = (0, _object.computed)("siteSettings.remove_muted_tags_from_latest"), _dec4 = (0, _object.computed)("siteSettings.tagging_enabled", "siteSettings.mute_all_categories_by_default"), (_class2 = class _class2 extends _controller.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "currentUser", _descriptor, this);
      _initializerDefineProperty(this, "siteSettings", _descriptor2, this);
      _initializerDefineProperty(this, "saved", _descriptor3, this);
      _defineProperty(this, "likeNotificationFrequencies", [{
        name: _I18n.default.t("user.like_notification_frequency.always"),
        value: 0
      }, {
        name: _I18n.default.t("user.like_notification_frequency.first_time_and_daily"),
        value: 1
      }, {
        name: _I18n.default.t("user.like_notification_frequency.first_time"),
        value: 2
      }, {
        name: _I18n.default.t("user.like_notification_frequency.never"),
        value: 3
      }]);
      _defineProperty(this, "autoTrackDurations", [{
        name: _I18n.default.t("user.auto_track_options.never"),
        value: -1
      }, {
        name: _I18n.default.t("user.auto_track_options.immediately"),
        value: 0
      }, {
        name: _I18n.default.t("user.auto_track_options.after_30_seconds"),
        value: 30000
      }, {
        name: _I18n.default.t("user.auto_track_options.after_1_minute"),
        value: 60000
      }, {
        name: _I18n.default.t("user.auto_track_options.after_2_minutes"),
        value: 120000
      }, {
        name: _I18n.default.t("user.auto_track_options.after_3_minutes"),
        value: 180000
      }, {
        name: _I18n.default.t("user.auto_track_options.after_4_minutes"),
        value: 240000
      }, {
        name: _I18n.default.t("user.auto_track_options.after_5_minutes"),
        value: 300000
      }, {
        name: _I18n.default.t("user.auto_track_options.after_10_minutes"),
        value: 600000
      }]);
      _defineProperty(this, "notificationLevelsForReplying", [{
        name: _I18n.default.t("topic.notifications.watching.title"),
        value: _notificationLevels.NotificationLevels.WATCHING
      }, {
        name: _I18n.default.t("topic.notifications.tracking.title"),
        value: _notificationLevels.NotificationLevels.TRACKING
      }, {
        name: _I18n.default.t("topic.notifications.regular.title"),
        value: _notificationLevels.NotificationLevels.REGULAR
      }]);
      _defineProperty(this, "considerNewTopicOptions", [{
        name: _I18n.default.t("user.new_topic_duration.not_viewed"),
        value: -1
      }, {
        name: _I18n.default.t("user.new_topic_duration.after_1_day"),
        value: 60 * 24
      }, {
        name: _I18n.default.t("user.new_topic_duration.after_2_days"),
        value: 60 * 48
      }, {
        name: _I18n.default.t("user.new_topic_duration.after_1_week"),
        value: 7 * 60 * 24
      }, {
        name: _I18n.default.t("user.new_topic_duration.after_2_weeks"),
        value: 2 * 7 * 60 * 24
      }, {
        name: _I18n.default.t("user.new_topic_duration.last_here"),
        value: -2
      }]);
    }
    get canSee() {
      return this.currentUser.id === this.model.id;
    }
    get selectedTags() {
      return [].concat(this.model.watched_tags, this.model.watching_first_post_tags, this.model.tracked_tags, this.model.muted_tags).filter(t => t);
    }
    get selectedCategories() {
      return [].concat(this.model.watchedCategories, this.model.watchedFirstPostCategories, this.model.trackedCategories, this.siteSettings.mute_all_categories_by_default ? this.model.regularCategories : this.model.mutedCategories).filter(t => t);
    }
    get hideMutedTags() {
      return this.siteSettings.remove_muted_tags_from_latest !== "never";
    }
    get canSave() {
      return this.canSee || this.currentUser.admin;
    }
    get saveAttrNames() {
      const attrs = ["new_topic_duration_minutes", "auto_track_topics_after_msecs", "notification_level_when_replying", this.siteSettings.mute_all_categories_by_default ? "regular_category_ids" : "muted_category_ids", "watched_category_ids", "tracked_category_ids", "watched_first_post_category_ids"];
      if (this.siteSettings.tagging_enabled) {
        attrs.push("muted_tags", "tracked_tags", "watched_tags", "watching_first_post_tags");
      }
      return attrs;
    }
    save() {
      this.saved = false;
      return this.model.save(this.saveAttrNames).then(() => {
        this.saved = true;
      }).catch(_ajaxError.popupAjaxError);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "siteSettings", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "saved", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class2.prototype, "selectedTags", [_dec], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedTags"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "selectedCategories", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "selectedCategories"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "hideMutedTags", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "hideMutedTags"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "saveAttrNames", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "saveAttrNames"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "save", [_object.action], Object.getOwnPropertyDescriptor(_class2.prototype, "save"), _class2.prototype)), _class2));
  _exports.default = _class;
});
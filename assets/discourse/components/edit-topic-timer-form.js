define("discourse/components/edit-topic-timer-form", ["exports", "@ember/component", "@ember/template-factory", "discourse/controllers/edit-topic-timer", "select-kit/components/future-date-input-selector", "discourse-common/utils/decorators", "@ember/object/computed", "I18n", "@ember/object", "@ember/utils", "discourse/lib/keyboard-shortcuts", "discourse/lib/time-shortcut", "@discourse/itsatrap"], function (_exports, _component, _templateFactory, _editTopicTimer, _futureDateInputSelector, _decorators, _computed, _I18n, _object, _utils, _keyboardShortcuts, _timeShortcut, _itsatrap) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/controllers/edit-topic-timer",0,"select-kit/components/future-date-input-selector",0,"discourse-common/utils/decorators",0,"@ember/object/computed",0,"I18n",0,"@ember/object",0,"@ember/component",0,"@ember/utils",0,"discourse/lib/keyboard-shortcuts",0,"discourse/lib/time-shortcut",0,"@discourse/itsatrap"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <form>
    <div class="control-group">
      <ComboBox
        @class="timer-type"
        @onChange={{this.onChangeStatusType}}
        @content={{this.timerTypes}}
        @value={{this.statusType}}
      />
    </div>
    {{#if this.publishToCategory}}
      <div class="control-group">
        <label class="control-label">{{i18n
            "topic.topic_status_update.publish_to"
          }}</label>
        <CategoryChooser
          @value={{this.topicTimer.category_id}}
          @onChange={{action (mut this.topicTimer.category_id)}}
          @options={{hash excludeCategoryId=this.excludeCategoryId}}
        />
      </div>
    {{/if}}
    {{#if this.showFutureDateInput}}
      <label class="control-label">{{i18n
          "topic.topic_status_update.when"
        }}</label>
      <TimeShortcutPicker
        @timeShortcuts={{this.timeOptions}}
        @prefilledDatetime={{this.topicTimer.execute_at}}
        @onTimeSelected={{this.onTimeSelected}}
        @hiddenOptions={{this.hiddenTimeShortcutOptions}}
        @_itsatrap={{this._itsatrap}}
      />
    {{/if}}
    {{#if this.useDuration}}
      <div class="controls">
        <label class="control-label">{{i18n
            "topic.topic_status_update.duration"
          }}</label>
        <RelativeTimePicker
          @onChange={{action "durationChanged"}}
          @durationMinutes={{readonly this.topicTimer.duration_minutes}}
        />
      </div>
    {{/if}}
    {{#if this.willCloseImmediately}}
      <div class="warning">
        {{d-icon "exclamation-triangle"}}
        {{this.willCloseI18n}}
      </div>
    {{/if}}
    {{#if this.showTopicTimerInfo}}
      <div class="alert alert-info modal-topic-timer-info">
        <TopicTimerInfo
          @statusType={{this.statusType}}
          @executeAt={{this.executeAt}}
          @basedOnLastPost={{this.topicTimer.based_on_last_post}}
          @durationMinutes={{this.topicTimer.duration_minutes}}
          @categoryId={{this.topicTimer.category_id}}
        />
      </div>
    {{/if}}
  </form>
  */
  {
    "id": "wd3LjfKa",
    "block": "[[[10,\"form\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@class\",\"@onChange\",\"@content\",\"@value\"],[\"timer-type\",[30,0,[\"onChangeStatusType\"]],[30,0,[\"timerTypes\"]],[30,0,[\"statusType\"]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[41,[30,0,[\"publishToCategory\"]],[[[1,\"    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,2],[\"topic.topic_status_update.publish_to\"],null]],[13],[1,\"\\n      \"],[8,[39,3],null,[[\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"topicTimer\",\"category_id\"]],[28,[37,4],[[30,0],[28,[37,5],[[30,0,[\"topicTimer\",\"category_id\"]]],null]],null],[28,[37,6],null,[[\"excludeCategoryId\"],[[30,0,[\"excludeCategoryId\"]]]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showFutureDateInput\"]],[[[1,\"    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,2],[\"topic.topic_status_update.when\"],null]],[13],[1,\"\\n    \"],[8,[39,7],null,[[\"@timeShortcuts\",\"@prefilledDatetime\",\"@onTimeSelected\",\"@hiddenOptions\",\"@_itsatrap\"],[[30,0,[\"timeOptions\"]],[30,0,[\"topicTimer\",\"execute_at\"]],[30,0,[\"onTimeSelected\"]],[30,0,[\"hiddenTimeShortcutOptions\"]],[30,0,[\"_itsatrap\"]]]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"useDuration\"]],[[[1,\"    \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,[28,[35,2],[\"topic.topic_status_update.duration\"],null]],[13],[1,\"\\n      \"],[8,[39,8],null,[[\"@onChange\",\"@durationMinutes\"],[[28,[37,4],[[30,0],\"durationChanged\"],null],[28,[37,9],[[30,0,[\"topicTimer\",\"duration_minutes\"]]],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"willCloseImmediately\"]],[[[1,\"    \"],[10,0],[14,0,\"warning\"],[12],[1,\"\\n      \"],[1,[28,[35,10],[\"exclamation-triangle\"],null]],[1,\"\\n      \"],[1,[30,0,[\"willCloseI18n\"]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showTopicTimerInfo\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-info modal-topic-timer-info\"],[12],[1,\"\\n      \"],[8,[39,11],null,[[\"@statusType\",\"@executeAt\",\"@basedOnLastPost\",\"@durationMinutes\",\"@categoryId\"],[[30,0,[\"statusType\"]],[30,0,[\"executeAt\"]],[30,0,[\"topicTimer\",\"based_on_last_post\"]],[30,0,[\"topicTimer\",\"duration_minutes\"]],[30,0,[\"topicTimer\",\"category_id\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[13]],[],false,[\"combo-box\",\"if\",\"i18n\",\"category-chooser\",\"action\",\"mut\",\"hash\",\"time-shortcut-picker\",\"relative-time-picker\",\"readonly\",\"d-icon\",\"topic-timer-info\"]]",
    "moduleName": "discourse/components/edit-topic-timer-form.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("autoDeleteReplies"), _dec2 = (0, _decorators.default)("topic.visible"), _dec3 = (0, _decorators.default)(), _dec4 = (0, _decorators.default)("topicTimer.updateTime", "topicTimer.duration_minutes", "useDuration"), _dec5 = (0, _decorators.default)("isBasedOnLastPost", "topicTimer.duration_minutes", "topic.last_posted_at"), _dec6 = (0, _decorators.default)("isBasedOnLastPost", "topic.last_posted_at"), _dec7 = (0, _decorators.default)("durationType"), _dec8 = (0, _decorators.default)("statusType", "isCustom", "topicTimer.updateTime", "willCloseImmediately", "topicTimer.category_id", "useDuration", "topicTimer.duration_minutes"), (_obj = {
    statusType: (0, _computed.readOnly)("topicTimer.status_type"),
    autoOpen: (0, _computed.equal)("statusType", _editTopicTimer.OPEN_STATUS_TYPE),
    autoClose: (0, _computed.equal)("statusType", _editTopicTimer.CLOSE_STATUS_TYPE),
    autoCloseAfterLastPost: (0, _computed.equal)("statusType", _editTopicTimer.CLOSE_AFTER_LAST_POST_STATUS_TYPE),
    autoDelete: (0, _computed.equal)("statusType", _editTopicTimer.DELETE_STATUS_TYPE),
    autoBump: (0, _computed.equal)("statusType", _editTopicTimer.BUMP_TYPE),
    publishToCategory: (0, _computed.equal)("statusType", _editTopicTimer.PUBLISH_TO_CATEGORY_STATUS_TYPE),
    autoDeleteReplies: (0, _computed.equal)("statusType", _editTopicTimer.DELETE_REPLIES_TYPE),
    showTimeOnly: (0, _computed.or)("autoOpen", "autoDelete", "autoBump"),
    showFutureDateInput: (0, _computed.or)("showTimeOnly", "publishToCategory", "autoClose"),
    useDuration: (0, _computed.or)("isBasedOnLastPost", "autoDeleteReplies", "autoCloseAfterLastPost"),
    duration: null,
    _itsatrap: null,
    init() {
      this._super(...arguments);
      _keyboardShortcuts.default.pause();
      this.set("_itsatrap", new _itsatrap.default());
      this.set("duration", this.initialDuration);
    },
    get initialDuration() {
      if (!this.useDuration || !this.topicTimer.duration_minutes) {
        return null;
      } else if (this.durationType === "days") {
        return this.topicTimer.duration_minutes / 60 / 24;
      } else {
        return this.topicTimer.duration_minutes / 60;
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      this._itsatrap.destroy();
      this.set("_itsatrap", null);
      _keyboardShortcuts.default.unpause();
    },
    durationType(autoDeleteReplies) {
      return autoDeleteReplies ? "days" : "hours";
    },
    excludeCategoryId(visible) {
      if (visible) {
        return this.get("topic.category_id");
      }
    },
    timeOptions() {
      const timezone = this.currentUser.user_option.timezone;
      const shortcuts = (0, _timeShortcut.timeShortcuts)(timezone);
      return [shortcuts.laterToday(), shortcuts.tomorrow(), shortcuts.laterThisWeek(), shortcuts.thisWeekend(), shortcuts.monday(), shortcuts.twoWeeks(), shortcuts.nextMonth(), shortcuts.sixMonths()];
    },
    hiddenTimeShortcutOptions() {
      return [_timeShortcut.TIME_SHORTCUT_TYPES.NONE, _timeShortcut.TIME_SHORTCUT_TYPES.LATER_TODAY, _timeShortcut.TIME_SHORTCUT_TYPES.LATER_THIS_WEEK];
    },
    isCustom: (0, _computed.equal)("timerType", "custom"),
    isBasedOnLastPost: (0, _computed.equal)("statusType", "close_after_last_post"),
    executeAt(updateTime, duration, useDuration) {
      if (useDuration) {
        return moment().add(parseFloat(duration), "minutes").format(_futureDateInputSelector.FORMAT);
      } else {
        return updateTime;
      }
    },
    willCloseImmediately(isBasedOnLastPost, duration, lastPostedAt) {
      if (isBasedOnLastPost && duration) {
        let closeDate = moment(lastPostedAt);
        closeDate = closeDate.add(duration, "minutes");
        return closeDate < moment();
      }
    },
    willCloseI18n(isBasedOnLastPost, lastPostedAt) {
      if (isBasedOnLastPost) {
        const diff = Math.round((new Date() - new Date(lastPostedAt)) / (1000 * 60 * 60));
        return _I18n.default.t("topic.auto_close_momentarily", {
          count: diff
        });
      }
    },
    durationLabel(durationType) {
      return _I18n.default.t(`topic.topic_status_update.num_of_${durationType}`);
    },
    showTopicTimerInfo(statusType, isCustom, updateTime, willCloseImmediately, categoryId, useDuration, duration) {
      if (!statusType || willCloseImmediately) {
        return false;
      }
      if (statusType === _editTopicTimer.PUBLISH_TO_CATEGORY_STATUS_TYPE && (0, _utils.isEmpty)(categoryId)) {
        return false;
      }
      if (isCustom && updateTime) {
        if (moment(updateTime) < moment()) {
          return false;
        }
      } else if (useDuration) {
        return duration;
      }
      return updateTime;
    },
    onTimeSelected(type, time) {
      this.set("timerType", type);
      this.onChangeInput(type, time);
    },
    durationChanged(newDurationMins) {
      this.set("topicTimer.duration_minutes", newDurationMins);
    }
  }, (_applyDecoratedDescriptor(_obj, "durationType", [_dec], Object.getOwnPropertyDescriptor(_obj, "durationType"), _obj), _applyDecoratedDescriptor(_obj, "excludeCategoryId", [_dec2], Object.getOwnPropertyDescriptor(_obj, "excludeCategoryId"), _obj), _applyDecoratedDescriptor(_obj, "timeOptions", [_dec3], Object.getOwnPropertyDescriptor(_obj, "timeOptions"), _obj), _applyDecoratedDescriptor(_obj, "hiddenTimeShortcutOptions", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "hiddenTimeShortcutOptions"), _obj), _applyDecoratedDescriptor(_obj, "executeAt", [_dec4], Object.getOwnPropertyDescriptor(_obj, "executeAt"), _obj), _applyDecoratedDescriptor(_obj, "willCloseImmediately", [_dec5], Object.getOwnPropertyDescriptor(_obj, "willCloseImmediately"), _obj), _applyDecoratedDescriptor(_obj, "willCloseI18n", [_dec6], Object.getOwnPropertyDescriptor(_obj, "willCloseI18n"), _obj), _applyDecoratedDescriptor(_obj, "durationLabel", [_dec7], Object.getOwnPropertyDescriptor(_obj, "durationLabel"), _obj), _applyDecoratedDescriptor(_obj, "showTopicTimerInfo", [_dec8], Object.getOwnPropertyDescriptor(_obj, "showTopicTimerInfo"), _obj), _applyDecoratedDescriptor(_obj, "onTimeSelected", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onTimeSelected"), _obj), _applyDecoratedDescriptor(_obj, "durationChanged", [_object.action], Object.getOwnPropertyDescriptor(_obj, "durationChanged"), _obj)), _obj))));
  _exports.default = _default;
});
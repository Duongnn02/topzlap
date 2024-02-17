define("discourse/components/bookmark", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/time-utils", "discourse/models/bookmark", "I18n", "discourse/lib/keyboard-shortcuts", "@discourse/itsatrap", "rsvp", "discourse/lib/time-shortcut", "@ember/object", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse/lib/bookmark", "@ember/object/computed", "discourse/lib/ajax-error", "discourse-common/lib/later", "@ember/service"], function (_exports, _component, _templateFactory, _timeUtils, _bookmark, _I18n, _keyboardShortcuts, _itsatrap, _rsvp, _timeShortcut, _object, _ajax, _decorators, _bookmark2, _computed, _ajaxError, _later, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/lib/time-utils",0,"discourse/models/bookmark",0,"@ember/component",0,"I18n",0,"discourse/lib/keyboard-shortcuts",0,"@discourse/itsatrap",0,"rsvp",0,"discourse/lib/time-shortcut",0,"@ember/object",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse/lib/bookmark",0,"@ember/object/computed",0,"discourse/lib/ajax-error",0,"discourse-common/lib/later",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <ConditionalLoadingSpinner @condition={{this.loading}}>
    {{#if this.errorMessage}}
      <div class="control-group">
        <div class="controls">
          <div class="alert alert-error">{{this.errorMessage}}</div>
        </div>
      </div>
    {{/if}}
  
    <div class="control-group bookmark-name-wrap">
      <Input
        id="bookmark-name"
        @value={{this.model.name}}
        name="bookmark-name"
        class="bookmark-name"
        @enter={{action "saveAndClose"}}
        placeholder={{i18n "post.bookmarks.name_placeholder"}}
        maxlength="100"
        aria-label={{i18n "post.bookmarks.name_input_label"}}
      />
      <DButton
        @icon="cog"
        @action={{action "toggleShowOptions"}}
        @class="bookmark-options-button"
        @ariaLabel="post.bookmarks.options"
        @title="post.bookmarks.options"
      />
    </div>
  
    {{#if this.showOptions}}
      <div class="bookmark-options-panel">
        <label class="control-label" for="bookmark_auto_delete_preference">{{i18n
            "bookmarks.auto_delete_preference.label"
          }}</label>
        <ComboBox
          @content={{this.autoDeletePreferences}}
          @value={{this.autoDeletePreference}}
          @class="bookmark-option-selector"
          @onChange={{action (mut this.autoDeletePreference)}}
        />
      </div>
    {{/if}}
  
    {{#if this.showExistingReminderAt}}
      <div class="alert alert-info existing-reminder-at-alert">
        {{d-icon "far-clock"}}
        <span>{{i18n
            "bookmarks.reminders.existing_reminder"
            at_date_time=this.existingReminderAtFormatted
          }}</span>
      </div>
    {{/if}}
  
    <div class="control-group">
      <label class="control-label">
        {{i18n "post.bookmarks.set_reminder"}}
      </label>
  
      {{#if this.userHasTimezoneSet}}
        <TimeShortcutPicker
          @timeShortcuts={{this.timeOptions}}
          @prefilledDatetime={{this.prefilledDatetime}}
          @onTimeSelected={{action "onTimeSelected"}}
          @hiddenOptions={{this.hiddenTimeShortcutOptions}}
          @customLabels={{this.customTimeShortcutLabels}}
          @_itsatrap={{this._itsatrap}}
        />
      {{else}}
        <div class="alert alert-info">{{html-safe
            (i18n "bookmarks.no_timezone" basePath=(base-path))
          }}</div>
      {{/if}}
    </div>
  
    <div class="modal-footer control-group">
      <DButton
        @id="save-bookmark"
        @label="bookmarks.save"
        @class="btn-primary"
        @action={{action "saveAndClose"}}
      />
      <DModalCancel @close={{action "closeWithoutSavingBookmark"}} />
      {{#if this.showDelete}}
        <DButton
          @id="delete-bookmark"
          @icon="trash-alt"
          @class="delete-bookmark btn-danger"
          @action={{action "delete"}}
          @ariaLabel="post.bookmarks.actions.delete_bookmark.name"
          @title="post.bookmarks.actions.delete_bookmark.name"
        />
      {{/if}}
    </div>
  </ConditionalLoadingSpinner>
  */
  {
    "id": "t79huieq",
    "block": "[[[8,[39,0],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"errorMessage\"]],[[[1,\"    \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"alert alert-error\"],[12],[1,[30,0,[\"errorMessage\"]]],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,0],[14,0,\"control-group bookmark-name-wrap\"],[12],[1,\"\\n    \"],[8,[39,2],[[24,1,\"bookmark-name\"],[24,3,\"bookmark-name\"],[24,0,\"bookmark-name\"],[16,\"placeholder\",[28,[37,3],[\"post.bookmarks.name_placeholder\"],null]],[24,\"maxlength\",\"100\"],[16,\"aria-label\",[28,[37,3],[\"post.bookmarks.name_input_label\"],null]]],[[\"@value\",\"@enter\"],[[30,0,[\"model\",\"name\"]],[28,[37,4],[[30,0],\"saveAndClose\"],null]]],null],[1,\"\\n    \"],[8,[39,5],null,[[\"@icon\",\"@action\",\"@class\",\"@ariaLabel\",\"@title\"],[\"cog\",[28,[37,4],[[30,0],\"toggleShowOptions\"],null],\"bookmark-options-button\",\"post.bookmarks.options\",\"post.bookmarks.options\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showOptions\"]],[[[1,\"    \"],[10,0],[14,0,\"bookmark-options-panel\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,0,\"control-label\"],[14,\"for\",\"bookmark_auto_delete_preference\"],[12],[1,[28,[35,3],[\"bookmarks.auto_delete_preference.label\"],null]],[13],[1,\"\\n      \"],[8,[39,6],null,[[\"@content\",\"@value\",\"@class\",\"@onChange\"],[[30,0,[\"autoDeletePreferences\"]],[30,0,[\"autoDeletePreference\"]],\"bookmark-option-selector\",[28,[37,4],[[30,0],[28,[37,7],[[30,0,[\"autoDeletePreference\"]]],null]],null]]],null],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showExistingReminderAt\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-info existing-reminder-at-alert\"],[12],[1,\"\\n      \"],[1,[28,[35,8],[\"far-clock\"],null]],[1,\"\\n      \"],[10,1],[12],[1,[28,[35,3],[\"bookmarks.reminders.existing_reminder\"],[[\"at_date_time\"],[[30,0,[\"existingReminderAtFormatted\"]]]]]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[10,0],[14,0,\"control-group\"],[12],[1,\"\\n    \"],[10,\"label\"],[14,0,\"control-label\"],[12],[1,\"\\n      \"],[1,[28,[35,3],[\"post.bookmarks.set_reminder\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"userHasTimezoneSet\"]],[[[1,\"      \"],[8,[39,9],null,[[\"@timeShortcuts\",\"@prefilledDatetime\",\"@onTimeSelected\",\"@hiddenOptions\",\"@customLabels\",\"@_itsatrap\"],[[30,0,[\"timeOptions\"]],[30,0,[\"prefilledDatetime\"]],[28,[37,4],[[30,0],\"onTimeSelected\"],null],[30,0,[\"hiddenTimeShortcutOptions\"]],[30,0,[\"customTimeShortcutLabels\"]],[30,0,[\"_itsatrap\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,0],[14,0,\"alert alert-info\"],[12],[1,[28,[35,10],[[28,[37,3],[\"bookmarks.no_timezone\"],[[\"basePath\"],[[28,[37,11],null,null]]]]],null]],[13],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\\n  \"],[10,0],[14,0,\"modal-footer control-group\"],[12],[1,\"\\n    \"],[8,[39,5],null,[[\"@id\",\"@label\",\"@class\",\"@action\"],[\"save-bookmark\",\"bookmarks.save\",\"btn-primary\",[28,[37,4],[[30,0],\"saveAndClose\"],null]]],null],[1,\"\\n    \"],[8,[39,12],null,[[\"@close\"],[[28,[37,4],[[30,0],\"closeWithoutSavingBookmark\"],null]]],null],[1,\"\\n\"],[41,[30,0,[\"showDelete\"]],[[[1,\"      \"],[8,[39,5],null,[[\"@id\",\"@icon\",\"@class\",\"@action\",\"@ariaLabel\",\"@title\"],[\"delete-bookmark\",\"trash-alt\",\"delete-bookmark btn-danger\",[28,[37,4],[[30,0],\"delete\"],null],\"post.bookmarks.actions.delete_bookmark.name\",\"post.bookmarks.actions.delete_bookmark.name\"]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]]]]]],[],false,[\"conditional-loading-spinner\",\"if\",\"input\",\"i18n\",\"action\",\"d-button\",\"combo-box\",\"mut\",\"d-icon\",\"time-shortcut-picker\",\"html-safe\",\"base-path\",\"d-modal-cancel\"]]",
    "moduleName": "discourse/components/bookmark.hbs",
    "isStrictMode": false
  });
  const BOOKMARK_BINDINGS = {
    enter: {
      handler: "saveAndClose"
    },
    "d d": {
      handler: "delete"
    }
  };
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("model.reminderAt"), _dec2 = (0, _decorators.default)("postDetectedLocalDate", "postDetectedLocalTime"), _dec3 = (0, _decorators.default)(), _dec4 = (0, _decorators.default)("userTimezone"), _dec5 = (0, _decorators.default)("existingBookmarkHasReminder"), _dec6 = (0, _decorators.default)("editingExistingBookmark", "existingBookmarkHasReminder"), _dec7 = (0, _decorators.default)("model.reminderAt"), (_obj = {
    dialog: (0, _service.inject)(),
    tagName: "",
    errorMessage: null,
    selectedReminderType: null,
    _closeWithoutSaving: null,
    _savingBookmarkManually: null,
    _saving: null,
    _deleting: null,
    _itsatrap: null,
    postDetectedLocalDate: null,
    postDetectedLocalTime: null,
    postDetectedLocalTimezone: null,
    prefilledDatetime: null,
    userTimezone: null,
    showOptions: null,
    model: null,
    afterSave: null,
    init() {
      this._super(...arguments);
      this.setProperties({
        errorMessage: null,
        selectedReminderType: _timeShortcut.TIME_SHORTCUT_TYPES.NONE,
        _closeWithoutSaving: false,
        _savingBookmarkManually: false,
        _saving: false,
        _deleting: false,
        postDetectedLocalDate: null,
        postDetectedLocalTime: null,
        postDetectedLocalTimezone: null,
        prefilledDatetime: null,
        userTimezone: this.currentUser.user_option.timezone,
        showOptions: false,
        _itsatrap: new _itsatrap.default(),
        autoDeletePreference: this.model.autoDeletePreference ?? _bookmark.AUTO_DELETE_PREFERENCES.CLEAR_REMINDER
      });
      this.registerOnCloseHandler(this._onModalClose);
      this._bindKeyboardShortcuts();
      if (this.editingExistingBookmark) {
        this._initializeExistingBookmarkData();
      }
      this._loadPostLocalDates();
    },
    didInsertElement() {
      this._super(...arguments);
      (0, _later.default)(() => {
        if (this.site.isMobileDevice) {
          document.getElementById("bookmark-name").blur();
        }
      });

      // we want to make sure the options panel opens so the user
      // knows they have set these options previously.
      if (this.model.id) {
        this.set("showOptions", true);
      } else {
        document.getElementById("tap_tile_none").classList.add("active");
      }
    },
    _initializeExistingBookmarkData() {
      if (this.existingBookmarkHasReminder) {
        this.set("prefilledDatetime", this.model.reminderAt);
        let parsedDatetime = (0, _timeUtils.parseCustomDatetime)(this.prefilledDatetime, null, this.userTimezone);
        this.set("selectedDatetime", parsedDatetime);
      }
    },
    _bindKeyboardShortcuts() {
      _keyboardShortcuts.default.pause();
      Object.keys(BOOKMARK_BINDINGS).forEach(shortcut => {
        this._itsatrap.bind(shortcut, () => {
          let binding = BOOKMARK_BINDINGS[shortcut];
          this.send(binding.handler);
          return false;
        });
      });
    },
    _loadPostLocalDates() {
      if (this.model.bookmarkableType !== "Post") {
        return;
      }
      let postEl = document.querySelector(`[data-post-id="${this.model.bookmarkableId}"]`);
      let localDateEl;
      if (postEl) {
        localDateEl = postEl.querySelector(".discourse-local-date");
      }
      if (localDateEl) {
        this.setProperties({
          postDetectedLocalDate: localDateEl.dataset.date,
          postDetectedLocalTime: localDateEl.dataset.time,
          postDetectedLocalTimezone: localDateEl.dataset.timezone
        });
      }
    },
    _saveBookmark() {
      let reminderAt;
      if (this.selectedReminderType) {
        reminderAt = this.selectedDatetime;
      }
      const reminderAtISO = reminderAt ? reminderAt.toISOString() : null;
      if (this.selectedReminderType === _timeShortcut.TIME_SHORTCUT_TYPES.CUSTOM) {
        if (!reminderAt) {
          return _rsvp.Promise.reject(_I18n.default.t("bookmarks.invalid_custom_datetime"));
        }
      }
      const data = {
        reminder_at: reminderAtISO,
        name: this.model.name,
        id: this.model.id,
        auto_delete_preference: this.autoDeletePreference
      };
      data.bookmarkable_id = this.model.bookmarkableId;
      data.bookmarkable_type = this.model.bookmarkableType;
      if (this.editingExistingBookmark) {
        return (0, _ajax.ajax)(`/bookmarks/${this.model.id}`, {
          type: "PUT",
          data
        }).then(response => {
          this._executeAfterSave(response, reminderAtISO);
        });
      } else {
        return (0, _ajax.ajax)("/bookmarks", {
          type: "POST",
          data
        }).then(response => {
          this._executeAfterSave(response, reminderAtISO);
        });
      }
    },
    _executeAfterSave(response, reminderAtISO) {
      if (!this.afterSave) {
        return;
      }
      const data = {
        reminder_at: reminderAtISO,
        auto_delete_preference: this.autoDeletePreference,
        id: this.model.id || response.id,
        name: this.model.name
      };
      data.bookmarkable_id = this.model.bookmarkableId;
      data.bookmarkable_type = this.model.bookmarkableType;
      this.afterSave(data);
    },
    _deleteBookmark() {
      return (0, _ajax.ajax)("/bookmarks/" + this.model.id, {
        type: "DELETE"
      }).then(response => {
        if (this.afterDelete) {
          this.afterDelete(response.topic_bookmarked, this.model.id);
        }
      });
    },
    _postLocalDate() {
      let parsedPostLocalDate = (0, _timeUtils.parseCustomDatetime)(this.postDetectedLocalDate, this.postDetectedLocalTime, this.userTimezone, this.postDetectedLocalTimezone);
      if (!this.postDetectedLocalTime) {
        return (0, _timeUtils.startOfDay)(parsedPostLocalDate);
      }
      return parsedPostLocalDate;
    },
    _handleSaveError(e) {
      this._savingBookmarkManually = false;
      if (typeof e === "string") {
        this.dialog.alert(e);
      } else {
        (0, _ajaxError.popupAjaxError)(e);
      }
    },
    _onModalClose(closeOpts) {
      // we want to close without saving if the user already saved
      // manually or deleted the bookmark, as well as when the modal
      // is just closed with the X button
      this._closeWithoutSaving = this._closeWithoutSaving || closeOpts.initiatedByCloseButton || closeOpts.initiatedByESC;
      if (!this._closeWithoutSaving && !this._savingBookmarkManually) {
        this._saveBookmark().catch(e => this._handleSaveError(e));
      }
      if (this.onCloseWithoutSaving && this._closeWithoutSaving) {
        this.onCloseWithoutSaving();
      }
    },
    willDestroyElement() {
      this._super(...arguments);
      this._itsatrap?.destroy();
      this.set("_itsatrap", null);
      _keyboardShortcuts.default.unpause();
    },
    showExistingReminderAt(reminderAt) {
      return reminderAt && Date.parse(reminderAt) > new Date().getTime();
    },
    showDelete: (0, _computed.notEmpty)("model.id"),
    userHasTimezoneSet: (0, _computed.notEmpty)("userTimezone"),
    editingExistingBookmark: (0, _computed.and)("model", "model.id"),
    existingBookmarkHasReminder: (0, _computed.and)("model", "model.id", "model.reminderAt"),
    showPostLocalDate(postDetectedLocalDate, postDetectedLocalTime) {
      if (!postDetectedLocalTime || !postDetectedLocalDate) {
        return;
      }
      let postLocalDateTime = this._postLocalDate();
      if (postLocalDateTime < (0, _timeUtils.now)(this.userTimezone)) {
        return;
      }
      return true;
    },
    autoDeletePreferences: () => {
      return Object.keys(_bookmark.AUTO_DELETE_PREFERENCES).map(key => {
        return {
          id: _bookmark.AUTO_DELETE_PREFERENCES[key],
          name: _I18n.default.t(`bookmarks.auto_delete_preference.${key.toLowerCase()}`)
        };
      });
    },
    timeOptions(userTimezone) {
      const options = (0, _timeShortcut.defaultTimeShortcuts)(userTimezone);
      if (this.showPostLocalDate) {
        options.push({
          icon: "globe-americas",
          id: _timeShortcut.TIME_SHORTCUT_TYPES.POST_LOCAL_DATE,
          label: "time_shortcut.post_local_date",
          time: this._postLocalDate(),
          timeFormatKey: "dates.long_no_year",
          hidden: false
        });
      }
      return options;
    },
    customTimeShortcutLabels(existingBookmarkHasReminder) {
      const labels = {};
      if (existingBookmarkHasReminder) {
        labels[_timeShortcut.TIME_SHORTCUT_TYPES.NONE] = "bookmarks.remove_reminder_keep_bookmark";
      }
      return labels;
    },
    hiddenTimeShortcutOptions(editingExistingBookmark, existingBookmarkHasReminder) {
      if (editingExistingBookmark && !existingBookmarkHasReminder) {
        return [_timeShortcut.TIME_SHORTCUT_TYPES.NONE];
      }
      return [];
    },
    existingReminderAtFormatted(existingReminderAt) {
      return (0, _bookmark2.formattedReminderTime)(existingReminderAt, this.userTimezone);
    },
    saveAndClose() {
      if (this._saving || this._deleting) {
        return;
      }
      this._saving = true;
      this._savingBookmarkManually = true;
      return this._saveBookmark().then(() => this.closeModal()).catch(e => this._handleSaveError(e)).finally(() => this._saving = false);
    },
    toggleShowOptions() {
      this.toggleProperty("showOptions");
    },
    delete() {
      if (!this.model.id) {
        return;
      }
      this._deleting = true;
      let deleteAction = () => {
        this._closeWithoutSaving = true;
        this._deleteBookmark().then(() => {
          this._deleting = false;
          this.closeModal();
        }).catch(e => this._handleSaveError(e));
      };
      if (this.existingBookmarkHasReminder) {
        this.dialog.deleteConfirm({
          message: _I18n.default.t("bookmarks.confirm_delete"),
          didConfirm: () => deleteAction()
        });
      } else {
        deleteAction();
      }
    },
    closeWithoutSavingBookmark() {
      this._closeWithoutSaving = true;
      this.closeModal();
    },
    onTimeSelected(type, time) {
      this.setProperties({
        selectedReminderType: type,
        selectedDatetime: time
      });

      // if the type is custom, we need to wait for the user to click save, as
      // they could still be adjusting the date and time
      if (![_timeShortcut.TIME_SHORTCUT_TYPES.CUSTOM, _timeShortcut.TIME_SHORTCUT_TYPES.RELATIVE].includes(type)) {
        return this.saveAndClose();
      }
    },
    selectPostLocalDate(date) {
      this.setProperties({
        selectedReminderType: this.reminderTypes.POST_LOCAL_DATE,
        postLocalDate: date
      });
      return this.saveAndClose();
    }
  }, (_applyDecoratedDescriptor(_obj, "_onModalClose", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_onModalClose"), _obj), _applyDecoratedDescriptor(_obj, "showExistingReminderAt", [_dec], Object.getOwnPropertyDescriptor(_obj, "showExistingReminderAt"), _obj), _applyDecoratedDescriptor(_obj, "showPostLocalDate", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showPostLocalDate"), _obj), _applyDecoratedDescriptor(_obj, "autoDeletePreferences", [_dec3], (_init = Object.getOwnPropertyDescriptor(_obj, "autoDeletePreferences"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "timeOptions", [_dec4], Object.getOwnPropertyDescriptor(_obj, "timeOptions"), _obj), _applyDecoratedDescriptor(_obj, "customTimeShortcutLabels", [_dec5], Object.getOwnPropertyDescriptor(_obj, "customTimeShortcutLabels"), _obj), _applyDecoratedDescriptor(_obj, "hiddenTimeShortcutOptions", [_dec6], Object.getOwnPropertyDescriptor(_obj, "hiddenTimeShortcutOptions"), _obj), _applyDecoratedDescriptor(_obj, "existingReminderAtFormatted", [_dec7], Object.getOwnPropertyDescriptor(_obj, "existingReminderAtFormatted"), _obj), _applyDecoratedDescriptor(_obj, "saveAndClose", [_object.action], Object.getOwnPropertyDescriptor(_obj, "saveAndClose"), _obj), _applyDecoratedDescriptor(_obj, "toggleShowOptions", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleShowOptions"), _obj), _applyDecoratedDescriptor(_obj, "delete", [_object.action], Object.getOwnPropertyDescriptor(_obj, "delete"), _obj), _applyDecoratedDescriptor(_obj, "closeWithoutSavingBookmark", [_object.action], Object.getOwnPropertyDescriptor(_obj, "closeWithoutSavingBookmark"), _obj), _applyDecoratedDescriptor(_obj, "onTimeSelected", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onTimeSelected"), _obj), _applyDecoratedDescriptor(_obj, "selectPostLocalDate", [_object.action], Object.getOwnPropertyDescriptor(_obj, "selectPostLocalDate"), _obj)), _obj))));
  _exports.default = _default;
});
define("discourse/controllers/edit-topic-timer", ["exports", "@ember/object", "@ember/controller", "select-kit/components/future-date-input-selector", "I18n", "discourse/mixins/modal-functionality", "discourse/models/topic-timer", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/lib/ajax-error"], function (_exports, _object, _controller, _futureDateInputSelector, _I18n, _modalFunctionality, _topicTimer, _computed, _decorators, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.PUBLISH_TO_CATEGORY_STATUS_TYPE = _exports.OPEN_STATUS_TYPE = _exports.DELETE_STATUS_TYPE = _exports.DELETE_REPLIES_TYPE = _exports.CLOSE_STATUS_TYPE = _exports.CLOSE_AFTER_LAST_POST_STATUS_TYPE = _exports.BUMP_TYPE = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/controller",0,"select-kit/components/future-date-input-selector",0,"I18n",0,"discourse/mixins/modal-functionality",0,"discourse/models/topic-timer",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const CLOSE_STATUS_TYPE = "close";
  _exports.CLOSE_STATUS_TYPE = CLOSE_STATUS_TYPE;
  const CLOSE_AFTER_LAST_POST_STATUS_TYPE = "close_after_last_post";
  _exports.CLOSE_AFTER_LAST_POST_STATUS_TYPE = CLOSE_AFTER_LAST_POST_STATUS_TYPE;
  const OPEN_STATUS_TYPE = "open";
  _exports.OPEN_STATUS_TYPE = OPEN_STATUS_TYPE;
  const PUBLISH_TO_CATEGORY_STATUS_TYPE = "publish_to_category";
  _exports.PUBLISH_TO_CATEGORY_STATUS_TYPE = PUBLISH_TO_CATEGORY_STATUS_TYPE;
  const DELETE_STATUS_TYPE = "delete";
  _exports.DELETE_STATUS_TYPE = DELETE_STATUS_TYPE;
  const BUMP_TYPE = "bump";
  _exports.BUMP_TYPE = BUMP_TYPE;
  const DELETE_REPLIES_TYPE = "delete_replies";
  _exports.DELETE_REPLIES_TYPE = DELETE_REPLIES_TYPE;
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("model.closed", "model.category", "model.isPrivateMessage", "model.invisible"), _dec2 = (0, _decorators.default)("publicTimerTypes"), (_obj = {
    loading: false,
    isPublic: "true",
    publicTimerTypes(closed, category, isPrivateMessage, invisible) {
      let types = [];
      if (!closed) {
        types.push({
          id: CLOSE_STATUS_TYPE,
          name: _I18n.default.t("topic.auto_close.title")
        });
        types.push({
          id: CLOSE_AFTER_LAST_POST_STATUS_TYPE,
          name: _I18n.default.t("topic.auto_close_after_last_post.title")
        });
      }
      if (closed) {
        types.push({
          id: OPEN_STATUS_TYPE,
          name: _I18n.default.t("topic.auto_reopen.title")
        });
      }
      if (this.model.details.can_delete) {
        types.push({
          id: DELETE_STATUS_TYPE,
          name: _I18n.default.t("topic.auto_delete.title")
        });
      }
      types.push({
        id: BUMP_TYPE,
        name: _I18n.default.t("topic.auto_bump.title")
      });
      if (this.model.details.can_delete) {
        types.push({
          id: DELETE_REPLIES_TYPE,
          name: _I18n.default.t("topic.auto_delete_replies.title")
        });
      }
      if (closed) {
        types.push({
          id: CLOSE_STATUS_TYPE,
          name: _I18n.default.t("topic.temp_open.title")
        });
      }
      if (!closed) {
        types.push({
          id: OPEN_STATUS_TYPE,
          name: _I18n.default.t("topic.temp_close.title")
        });
      }
      if (category && category.read_restricted || isPrivateMessage || invisible) {
        types.push({
          id: PUBLISH_TO_CATEGORY_STATUS_TYPE,
          name: _I18n.default.t("topic.publish_to_category.title")
        });
      }
      return types;
    },
    topicTimer: (0, _computed.alias)("model.topic_timer"),
    _setTimer(time, durationMinutes, statusType, basedOnLastPost, categoryId) {
      this.set("loading", true);
      _topicTimer.default.update(this.get("model.id"), time, basedOnLastPost, statusType, categoryId, durationMinutes).then(result => {
        if (time || durationMinutes) {
          this.send("closeModal");
          (0, _object.setProperties)(this.topicTimer, {
            execute_at: result.execute_at,
            duration_minutes: result.duration_minutes,
            category_id: result.category_id
          });
          this.set("model.closed", result.closed);
        } else {
          this.set("model.topic_timer", _object.default.create({
            status_type: this.defaultStatusType
          }));
          this.send("onChangeInput", null, null);
        }
      }).catch(_ajaxError.popupAjaxError).finally(() => this.set("loading", false));
    },
    onShow() {
      let time = null;
      const executeAt = this.get("topicTimer.execute_at");
      if (executeAt) {
        const closeTime = moment(executeAt);
        if (closeTime > moment()) {
          time = closeTime.format(_futureDateInputSelector.FORMAT);
        }
      }
      this.send("onChangeInput", null, time);
      if (!this.get("topicTimer.status_type")) {
        this.send("onChangeStatusType", this.defaultStatusType);
      }
      if (this.get("topicTimer.status_type") === CLOSE_STATUS_TYPE && this.get("topicTimer.based_on_last_post")) {
        this.send("onChangeStatusType", CLOSE_AFTER_LAST_POST_STATUS_TYPE);
      }
    },
    defaultStatusType(publicTimerTypes) {
      return publicTimerTypes[0].id;
    },
    actions: {
      onChangeStatusType(value) {
        this.setProperties({
          "topicTimer.based_on_last_post": CLOSE_AFTER_LAST_POST_STATUS_TYPE === value,
          "topicTimer.status_type": value
        });
      },
      onChangeInput(_type, time) {
        if (moment.isMoment(time)) {
          time = time.format(_futureDateInputSelector.FORMAT);
        }
        this.set("topicTimer.updateTime", time);
      },
      saveTimer() {
        if (!this.get("topicTimer.updateTime") && !this.get("topicTimer.duration_minutes")) {
          this.flash(_I18n.default.t("topic.topic_status_update.time_frame_required"), "error");
          return;
        }
        if (this.get("topicTimer.duration_minutes") && !this.get("topicTimer.updateTime")) {
          if (this.get("topicTimer.duration_minutes") <= 0) {
            this.flash(_I18n.default.t("topic.topic_status_update.min_duration"), "error");
            return;
          }

          // cannot be more than 20 years
          if (this.get("topicTimer.duration_minutes") > 20 * 365 * 1440) {
            this.flash(_I18n.default.t("topic.topic_status_update.max_duration"), "error");
            return;
          }
        }
        let statusType = this.get("topicTimer.status_type");
        if (statusType === CLOSE_AFTER_LAST_POST_STATUS_TYPE) {
          statusType = CLOSE_STATUS_TYPE;
        }
        this._setTimer(this.get("topicTimer.updateTime"), this.get("topicTimer.duration_minutes"), statusType, this.get("topicTimer.based_on_last_post"), this.get("topicTimer.category_id"));
      },
      removeTimer() {
        let statusType = this.get("topicTimer.status_type");
        if (statusType === CLOSE_AFTER_LAST_POST_STATUS_TYPE) {
          statusType = CLOSE_STATUS_TYPE;
        }
        this._setTimer(null, null, statusType);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "publicTimerTypes", [_dec], Object.getOwnPropertyDescriptor(_obj, "publicTimerTypes"), _obj), _applyDecoratedDescriptor(_obj, "defaultStatusType", [_dec2], Object.getOwnPropertyDescriptor(_obj, "defaultStatusType"), _obj)), _obj)));
  _exports.default = _default;
});
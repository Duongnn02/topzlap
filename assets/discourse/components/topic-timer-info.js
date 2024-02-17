define("discourse/components/topic-timer-info", ["exports", "@ember/component", "@ember/template-factory", "@ember/runloop", "discourse-common/lib/later", "discourse/models/category", "discourse/controllers/edit-topic-timer", "I18n", "discourse-common/utils/decorators", "discourse-common/lib/icon-library", "discourse-common/config/environment", "@ember/template"], function (_exports, _component, _templateFactory, _runloop, _later, _category, _editTopicTimer, _I18n, _decorators, _iconLibrary, _environment, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse/models/category",0,"@ember/component",0,"discourse/controllers/edit-topic-timer",0,"I18n",0,"discourse-common/utils/decorators",0,"discourse-common/lib/icon-library",0,"discourse-common/config/environment",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.showTopicTimer}}
    <h3 class="topic-timer-heading">
      <span title={{this.title}}>
        {{this.clockIcon}}
        {{this.notice}}
      </span>
      <div class="topic-timer-modify">
        {{#if this.showEdit}}
          <DButton
            @title="post.controls.edit_timer"
            @icon="pencil-alt"
            @class="btn topic-timer-edit no-text"
            @action={{this.showTopicTimerModal}}
          />
        {{/if}}
        {{#if this.showTrashCan}}
          <DButton
            @title="post.controls.remove_timer"
            @icon="trash-alt"
            @class="btn topic-timer-remove no-text"
            @action={{this.removeTopicTimer}}
          />
        {{/if}}
      </div>
    </h3>
  {{/if}}
  */
  {
    "id": "lW6mDbXh",
    "block": "[[[41,[30,0,[\"showTopicTimer\"]],[[[1,\"  \"],[10,\"h3\"],[14,0,\"topic-timer-heading\"],[12],[1,\"\\n    \"],[10,1],[15,\"title\",[30,0,[\"title\"]]],[12],[1,\"\\n      \"],[1,[30,0,[\"clockIcon\"]]],[1,\"\\n      \"],[1,[30,0,[\"notice\"]]],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"topic-timer-modify\"],[12],[1,\"\\n\"],[41,[30,0,[\"showEdit\"]],[[[1,\"        \"],[8,[39,1],null,[[\"@title\",\"@icon\",\"@class\",\"@action\"],[\"post.controls.edit_timer\",\"pencil-alt\",\"btn topic-timer-edit no-text\",[30,0,[\"showTopicTimerModal\"]]]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showTrashCan\"]],[[[1,\"        \"],[8,[39,1],null,[[\"@title\",\"@icon\",\"@class\",\"@action\"],[\"post.controls.remove_timer\",\"trash-alt\",\"btn topic-timer-remove no-text\",[30,0,[\"removeTopicTimer\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"d-button\"]]",
    "moduleName": "discourse/components/topic-timer-info.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.on)("didReceiveAttrs"), _dec2 = (0, _decorators.on)("willDestroyElement"), _dec3 = (0, _decorators.default)("canModifyTimer", "removeTopicTimer"), _dec4 = (0, _decorators.default)("canModifyTimer", "showTopicTimerModal"), (_obj = {
    classNames: ["topic-timer-info"],
    _delayedRerender: null,
    clockIcon: (0, _template.htmlSafe)(`${(0, _iconLibrary.iconHTML)("far-clock")}`),
    trashLabel: _I18n.default.t("post.controls.remove_timer"),
    title: null,
    notice: null,
    showTopicTimer: null,
    showTopicTimerModal: null,
    removeTopicTimer: null,
    setupRenderer() {
      this.renderTopicTimer();
    },
    cancelDelayedRenderer() {
      if (this._delayedRerender) {
        (0, _runloop.cancel)(this._delayedRerender);
      }
    },
    canModifyTimer() {
      return this.currentUser && this.currentUser.get("canManageTopic");
    },
    showTrashCan(canModifyTimer, removeTopicTimer) {
      return canModifyTimer && removeTopicTimer;
    },
    showEdit(canModifyTimer, showTopicTimerModal) {
      return canModifyTimer && showTopicTimerModal;
    },
    additionalOpts() {
      return {};
    },
    renderTopicTimer() {
      const isDeleteRepliesType = this.statusType === _editTopicTimer.DELETE_REPLIES_TYPE;
      if (!isDeleteRepliesType && !this.basedOnLastPost && (!this.executeAt || this.executeAt < moment())) {
        this.set("showTopicTimer", null);
        return;
      }
      if (this.isDestroyed) {
        return;
      }
      const topicStatus = this.topicClosed ? "close" : "open";
      const topicStatusKnown = this.topicClosed !== undefined;
      if (topicStatusKnown && topicStatus === this.statusType) {
        return;
      }
      const statusUpdateAt = moment(this.executeAt);
      const duration = moment.duration(statusUpdateAt - moment());
      const minutesLeft = duration.asMinutes();
      if (minutesLeft > 0 || isDeleteRepliesType || this.basedOnLastPost) {
        // We don't want to display a notice before a topic timer time has been set
        if (!this.executeAt) {
          return;
        }
        let durationMinutes = parseInt(this.durationMinutes, 10) || 0;
        let options = {
          timeLeft: duration.humanize(true),
          duration: moment.duration(durationMinutes, "minutes").humanize({
            s: 60,
            m: 60,
            h: 24
          })
        };
        const categoryId = this.categoryId;
        if (categoryId) {
          const category = _category.default.findById(categoryId);
          options = Object.assign({
            categoryName: category.get("slug"),
            categoryUrl: category.get("url")
          }, options);
        }
        options = Object.assign(options, this.additionalOpts());
        this.setProperties({
          title: (0, _template.htmlSafe)(`${moment(this.executeAt).format("LLLL")}`),
          notice: (0, _template.htmlSafe)(`${_I18n.default.t(this._noticeKey(), options)}`),
          showTopicTimer: true
        });

        // TODO Sam: concerned this can cause a heavy rerender loop
        if (!(0, _environment.isTesting)()) {
          this._delayedRerender = (0, _later.default)(() => {
            this.renderTopicTimer();
          }, this.rerenderDelay(minutesLeft));
        }
      } else {
        this.set("showTopicTimer", null);
      }
    },
    rerenderDelay(minutesLeft) {
      if (minutesLeft > 2160) {
        return 12 * 60 * 60000;
      } else if (minutesLeft > 1410) {
        return 60 * 60000;
      } else if (minutesLeft > 90) {
        return 30 * 60000;
      } else if (minutesLeft > 2) {
        return 60000;
      }
      return 1000;
    },
    _noticeKey() {
      let statusType = this.statusType;
      if (statusType === "silent_close") {
        statusType = "close";
      }
      if (this.basedOnLastPost && statusType === "close") {
        statusType = "close_after_last_post";
      }
      return `topic.status_update_notice.auto_${statusType}`;
    }
  }, (_applyDecoratedDescriptor(_obj, "setupRenderer", [_dec], Object.getOwnPropertyDescriptor(_obj, "setupRenderer"), _obj), _applyDecoratedDescriptor(_obj, "cancelDelayedRenderer", [_dec2], Object.getOwnPropertyDescriptor(_obj, "cancelDelayedRenderer"), _obj), _applyDecoratedDescriptor(_obj, "canModifyTimer", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "canModifyTimer"), _obj), _applyDecoratedDescriptor(_obj, "showTrashCan", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showTrashCan"), _obj), _applyDecoratedDescriptor(_obj, "showEdit", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showEdit"), _obj)), _obj))));
  _exports.default = _default;
});
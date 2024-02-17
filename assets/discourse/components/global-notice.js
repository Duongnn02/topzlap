define("discourse/components/global-notice", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse/lib/cookie", "I18n", "discourse-common/utils/decorators", "@ember/template", "@ember/service"], function (_exports, _component, _templateFactory, _object, _cookie, _I18n, _decorators, _template, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addGlobalNotice = addGlobalNotice;
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"discourse/lib/cookie",0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators",0,"@ember/template",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="global-notice">
    {{#if this.visible}}
      {{#each this.notices as |notice|}}
        <div class="row">
          <div
            id="global-notice-{{notice.id}}"
            class="alert alert-{{notice.options.level}} {{notice.id}}"
          >
            {{#if notice.options.html}}
              {{html-safe notice.options.html}}
            {{/if}}
  
            <span class="text">{{html-safe notice.text}}</span>
  
            {{#if notice.options.dismissable}}
              <DButton
                @class="btn-flat close"
                @icon="times"
                @action={{action "dismissNotice"}}
                @actionParam={{notice}}
              />
            {{/if}}
          </div>
        </div>
      {{/each}}
    {{/if}}
  </div>
  */
  {
    "id": "mNSdtos2",
    "block": "[[[10,0],[14,0,\"global-notice\"],[12],[1,\"\\n\"],[41,[30,0,[\"visible\"]],[[[42,[28,[37,2],[[28,[37,2],[[30,0,[\"notices\"]]],null]],null],null,[[[1,\"      \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n        \"],[10,0],[15,1,[29,[\"global-notice-\",[30,1,[\"id\"]]]]],[15,0,[29,[\"alert alert-\",[30,1,[\"options\",\"level\"]],\" \",[30,1,[\"id\"]]]]],[12],[1,\"\\n\"],[41,[30,1,[\"options\",\"html\"]],[[[1,\"            \"],[1,[28,[35,3],[[30,1,[\"options\",\"html\"]]],null]],[1,\"\\n\"]],[]],null],[1,\"\\n          \"],[10,1],[14,0,\"text\"],[12],[1,[28,[35,3],[[30,1,[\"text\"]]],null]],[13],[1,\"\\n\\n\"],[41,[30,1,[\"options\",\"dismissable\"]],[[[1,\"            \"],[8,[39,4],null,[[\"@class\",\"@icon\",\"@action\",\"@actionParam\"],[\"btn-flat close\",\"times\",[28,[37,5],[[30,0],\"dismissNotice\"],null],[30,1]]],null],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[1]],null]],[]],null],[13]],[\"notice\"],false,[\"if\",\"each\",\"-track-array\",\"html-safe\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/components/global-notice.hbs",
    "isStrictMode": false
  });
  const _pluginNotices = [];
  function addGlobalNotice(text, id) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    _pluginNotices.push(Notice.create({
      text,
      id,
      options
    }));
  }
  const GLOBAL_NOTICE_DISMISSED_PROMPT_KEY = "dismissed-global-notice-v2";
  const Notice = _object.default.extend({
    logsNoticeService: (0, _service.inject)("logsNotice"),
    text: null,
    id: null,
    options: null,
    init() {
      this._super(...arguments);
      const defaults = {
        // can this banner be hidden
        dismissable: false,
        // prepend html content
        html: null,
        // will define the style of the banner, follows alerts styling
        level: "info",
        // should the banner be permanently hidden?
        persistentDismiss: true,
        // callback function when dismissing a banner
        onDismiss: null,
        // show/hide banner function, will take precedence over everything
        visibility: null,
        // how long before banner should show again, eg: moment.duration(1, "week")
        dismissDuration: null
      };
      this.options = this.set("options", Object.assign(defaults, this.options || {}));
    }
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("site.isReadOnly", "site.isStaffWritesOnly", "siteSettings.login_required", "siteSettings.disable_emails", "siteSettings.global_notice", "session.safe_mode", "logNotice.{id,text,hidden}"), (_obj = {
    tagName: "",
    router: (0, _service.inject)(),
    logsNoticeService: (0, _service.inject)("logsNotice"),
    logNotice: null,
    init() {
      this._super(...arguments);
      this.logsNoticeService.addObserver("hidden", this._handleLogsNoticeUpdate);
      this.logsNoticeService.addObserver("text", this._handleLogsNoticeUpdate);
    },
    willDestroyElement() {
      this._super(...arguments);
      this.logsNoticeService.removeObserver("text", this._handleLogsNoticeUpdate);
      this.logsNoticeService.removeObserver("hidden", this._handleLogsNoticeUpdate);
    },
    get visible() {
      return !this.router.currentRouteName.startsWith("wizard.");
    },
    notices(isReadOnly, isStaffWritesOnly, loginRequired, disableEmails, globalNotice, safeMode, logNotice) {
      let notices = [];
      if ((0, _cookie.default)("dosp") === "1") {
        (0, _cookie.removeCookie)("dosp", {
          path: "/"
        });
        notices.push(Notice.create({
          text: loginRequired ? _I18n.default.t("forced_anonymous_login_required") : _I18n.default.t("forced_anonymous"),
          id: "forced-anonymous"
        }));
      }
      if (safeMode) {
        notices.push(Notice.create({
          text: _I18n.default.t("safe_mode.enabled"),
          id: "safe-mode"
        }));
      }
      if (isStaffWritesOnly) {
        notices.push(Notice.create({
          text: _I18n.default.t("staff_writes_only_mode.enabled"),
          id: "alert-staff-writes-only"
        }));
      } else if (isReadOnly) {
        notices.push(Notice.create({
          text: _I18n.default.t("read_only_mode.enabled"),
          id: "alert-read-only"
        }));
      }
      if (disableEmails === "yes") {
        notices.push(Notice.create({
          text: _I18n.default.t("emails_are_disabled"),
          id: "alert-emails-disabled"
        }));
      } else if (disableEmails === "non-staff") {
        notices.push(Notice.create({
          text: _I18n.default.t("emails_are_disabled_non_staff"),
          id: "alert-emails-disabled"
        }));
      }
      if (globalNotice?.length > 0) {
        notices.push(Notice.create({
          text: globalNotice,
          id: "alert-global-notice"
        }));
      }
      if (logNotice) {
        notices.push(logNotice);
      }
      return notices.concat(_pluginNotices).filter(notice => {
        if (notice.options.visibility) {
          return notice.options.visibility(notice);
        }
        const key = `${GLOBAL_NOTICE_DISMISSED_PROMPT_KEY}-${notice.id}`;
        const value = this.keyValueStore.get(key);

        // banner has never been dismissed
        if (!value) {
          return true;
        }

        // banner has no persistent dismiss and should always show on load
        if (!notice.options.persistentDismiss) {
          return true;
        }
        if (notice.options.dismissDuration) {
          const resetAt = moment(value).add(notice.options.dismissDuration);
          return moment().isAfter(resetAt);
        } else {
          return false;
        }
      });
    },
    dismissNotice(notice) {
      if (notice.options.onDismiss) {
        notice.options.onDismiss(notice);
      }
      if (notice.options.persistentDismiss) {
        this.keyValueStore.set({
          key: `${GLOBAL_NOTICE_DISMISSED_PROMPT_KEY}-${notice.id}`,
          value: moment().toISOString(true)
        });
      }
      const alert = document.getElementById(`global-notice-${notice.id}`);
      if (alert) {
        alert.style.display = "none";
      }
    },
    _handleLogsNoticeUpdate() {
      const {
        logsNoticeService
      } = this;
      const logNotice = Notice.create({
        text: (0, _template.htmlSafe)(this.logsNoticeService.message),
        id: "alert-logs-notice",
        options: {
          dismissable: true,
          persistentDismiss: false,
          visibility() {
            return !logsNoticeService.hidden;
          },
          onDismiss() {
            logsNoticeService.set("text", "");
          }
        }
      });
      this.set("logNotice", logNotice);
    }
  }, (_applyDecoratedDescriptor(_obj, "notices", [_dec], Object.getOwnPropertyDescriptor(_obj, "notices"), _obj), _applyDecoratedDescriptor(_obj, "dismissNotice", [_object.action], Object.getOwnPropertyDescriptor(_obj, "dismissNotice"), _obj), _applyDecoratedDescriptor(_obj, "_handleLogsNoticeUpdate", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_handleLogsNoticeUpdate"), _obj)), _obj))));
  _exports.default = _default;
});
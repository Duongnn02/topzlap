define("discourse/components/software-update-prompt", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/lib/get-url", "@ember/runloop", "discourse-common/lib/later", "discourse-common/utils/decorators", "@ember/object", "discourse-common/config/environment"], function (_exports, _component, _templateFactory, _getUrl, _runloop, _later, _decorators, _object, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/lib/get-url",0,"@ember/runloop",0,"discourse-common/lib/later",0,"discourse-common/utils/decorators",0,"@ember/component",0,"@ember/object",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.showPrompt}}
    <div
      class="software-update-prompt{{if
          this.animatePrompt
          ' require-software-refresh'
        }}"
    >
      <div class="wrap">
        <div class="update-prompt-main-content" aria-live="polite">
          <span
            role="button"
            onclick={{action "refreshPage"}}
            class="update-prompt-message"
          >{{d-icon "redo"}}
            {{html-safe (i18n "software_update_prompt.message")}}</span>
          <span class="update-prompt-dismiss"><span
              aria-label={{i18n "software_update_prompt.dismiss"}}
              role="button"
              onclick={{action "dismiss"}}
            >{{d-icon "times"}}</span></span>
        </div>
      </div>
    </div>
  {{/if}}
  */
  {
    "id": "Sh7MsQp1",
    "block": "[[[41,[30,0,[\"showPrompt\"]],[[[1,\"  \"],[10,0],[15,0,[29,[\"software-update-prompt\",[52,[30,0,[\"animatePrompt\"]],\" require-software-refresh\"]]]],[12],[1,\"\\n    \"],[10,0],[14,0,\"wrap\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"update-prompt-main-content\"],[14,\"aria-live\",\"polite\"],[12],[1,\"\\n        \"],[10,1],[14,\"role\",\"button\"],[15,\"onclick\",[28,[37,1],[[30,0],\"refreshPage\"],null]],[14,0,\"update-prompt-message\"],[12],[1,[28,[35,2],[\"redo\"],null]],[1,\"\\n          \"],[1,[28,[35,3],[[28,[37,4],[\"software_update_prompt.message\"],null]],null]],[13],[1,\"\\n        \"],[10,1],[14,0,\"update-prompt-dismiss\"],[12],[10,1],[15,\"aria-label\",[28,[37,4],[\"software_update_prompt.dismiss\"],null]],[14,\"role\",\"button\"],[15,\"onclick\",[28,[37,1],[[30,0],\"dismiss\"],null]],[12],[1,[28,[35,2],[\"times\"],null]],[13],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"action\",\"d-icon\",\"html-safe\",\"i18n\"]]",
    "moduleName": "discourse/components/software-update-prompt.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.on)("willDestroyElement"), (_obj = {
    tagName: "",
    showPrompt: false,
    animatePrompt: false,
    _timeoutHandler: null,
    init() {
      this._super(...arguments);
      this.messageBus.subscribe("/refresh_client", this.onRefresh);
      this.messageBus.subscribe("/global/asset-version", this.onAsset);
    },
    willDestroy() {
      this._super(...arguments);
      this.messageBus.unsubscribe("/refresh_client", this.onRefresh);
      this.messageBus.unsubscribe("/global/asset-version", this.onAsset);
    },
    onRefresh() {
      this.session.requiresRefresh = true;
    },
    onAsset(version) {
      if (this.session.assetVersion !== version) {
        this.session.requiresRefresh = true;
      }
      if (!this._timeoutHandler && this.session.requiresRefresh) {
        if ((0, _environment.isTesting)()) {
          this.updatePromptState(true);
        } else {
          // Since we can do this transparently for people browsing the forum
          // hold back the message 24 hours.
          this._timeoutHandler = (0, _later.default)(() => {
            this.updatePromptState(true);
          }, 1000 * 60 * 24 * 60);
        }
      }
    },
    rootUrl() {
      return (0, _getUrl.default)("/");
    },
    updatePromptState(value) {
      // when adding the message, we inject the HTML then add the animation
      // when dismissing, things need to happen in the opposite order
      const firstProp = value ? "showPrompt" : "animatePrompt",
        secondProp = value ? "animatePrompt" : "showPrompt";
      this.set(firstProp, value);
      if ((0, _environment.isTesting)()) {
        this.set(secondProp, value);
      } else {
        (0, _later.default)(() => {
          this.set(secondProp, value);
        }, 500);
      }
    },
    refreshPage() {
      document.location.reload();
    },
    dismiss() {
      this.updatePromptState(false);
    },
    _resetTimeoutHandler() {
      this._timeoutHandler && (0, _runloop.cancel)(this._timeoutHandler);
      this._timeoutHandler = null;
    }
  }, (_applyDecoratedDescriptor(_obj, "onRefresh", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onRefresh"), _obj), _applyDecoratedDescriptor(_obj, "onAsset", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onAsset"), _obj), _applyDecoratedDescriptor(_obj, "rootUrl", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "rootUrl"), _obj), _applyDecoratedDescriptor(_obj, "refreshPage", [_object.action], Object.getOwnPropertyDescriptor(_obj, "refreshPage"), _obj), _applyDecoratedDescriptor(_obj, "dismiss", [_object.action], Object.getOwnPropertyDescriptor(_obj, "dismiss"), _obj), _applyDecoratedDescriptor(_obj, "_resetTimeoutHandler", [_dec], Object.getOwnPropertyDescriptor(_obj, "_resetTimeoutHandler"), _obj)), _obj))));
  _exports.default = _default;
});
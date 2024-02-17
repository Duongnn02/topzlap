define("discourse/components/slow-mode-info", ["exports", "@ember/component", "@ember/template-factory", "discourse/models/topic", "@ember/object", "discourse-common/utils/decorators", "discourse/helpers/slow-mode", "discourse/lib/ajax-error"], function (_exports, _component, _templateFactory, _topic, _object, _decorators, _slowMode, _ajaxError) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/models/topic",0,"@ember/object",0,"discourse-common/utils/decorators",0,"discourse/helpers/slow-mode",0,"discourse/lib/ajax-error"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.showSlowModeNotice}}
    <div class="topic-status-info">
      <h3 class="slow-mode-heading">
        <span>
          {{d-icon "hourglass-start"}}
          {{i18n "topic.slow_mode_notice.duration" duration=this.durationText}}
        </span>
  
        {{#if this.user.canManageTopic}}
          <DButton
            @class="slow-mode-remove"
            @action={{action "disableSlowMode"}}
            @icon="trash-alt"
          />
        {{/if}}
      </h3>
    </div>
  {{/if}}
  */
  {
    "id": "xcHlcnHr",
    "block": "[[[41,[30,0,[\"showSlowModeNotice\"]],[[[1,\"  \"],[10,0],[14,0,\"topic-status-info\"],[12],[1,\"\\n    \"],[10,\"h3\"],[14,0,\"slow-mode-heading\"],[12],[1,\"\\n      \"],[10,1],[12],[1,\"\\n        \"],[1,[28,[35,1],[\"hourglass-start\"],null]],[1,\"\\n        \"],[1,[28,[35,2],[\"topic.slow_mode_notice.duration\"],[[\"duration\"],[[30,0,[\"durationText\"]]]]]],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"user\",\"canManageTopic\"]],[[[1,\"        \"],[8,[39,3],null,[[\"@class\",\"@action\",\"@icon\"],[\"slow-mode-remove\",[28,[37,4],[[30,0],\"disableSlowMode\"],null],\"trash-alt\"]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"d-icon\",\"i18n\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/components/slow-mode-info.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("topic.slow_mode_seconds"), _dec2 = (0, _decorators.default)("topic.slow_mode_seconds", "topic.closed"), (_obj = {
    durationText(seconds) {
      return (0, _slowMode.durationTextFromSeconds)(seconds);
    },
    showSlowModeNotice(seconds, closed) {
      return seconds > 0 && !closed;
    },
    disableSlowMode() {
      _topic.default.setSlowMode(this.topic.id, 0).catch(_ajaxError.popupAjaxError).then(() => this.set("topic.slow_mode_seconds", 0));
    }
  }, (_applyDecoratedDescriptor(_obj, "durationText", [_dec], Object.getOwnPropertyDescriptor(_obj, "durationText"), _obj), _applyDecoratedDescriptor(_obj, "showSlowModeNotice", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showSlowModeNotice"), _obj), _applyDecoratedDescriptor(_obj, "disableSlowMode", [_object.action], Object.getOwnPropertyDescriptor(_obj, "disableSlowMode"), _obj)), _obj))));
  _exports.default = _default;
});
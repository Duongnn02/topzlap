define("discourse/components/user-status-message", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse/lib/formatter"], function (_exports, _component, _templateFactory, _object, _formatter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _class;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"discourse/lib/formatter"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <span class={{concat-class "user-status-message" @class}}>
    {{emoji @status.emoji skipTitle=true}}
    {{#if @showDescription}}
      <span class="user-status-message-description">
        {{@status.description}}
      </span>
    {{/if}}
    {{#if this.showTooltip}}
      <DTooltip>
        <div class="user-status-message-tooltip">
          {{emoji @status.emoji skipTitle=true}}
          <span class="user-status-tooltip-description">
            {{@status.description}}
          </span>
          {{#if this.until}}
            <div class="user-status-tooltip-until">
              {{this.until}}
            </div>
          {{/if}}
        </div>
      </DTooltip>
    {{/if}}
  </span>
  */
  {
    "id": "MAQQ3ZTB",
    "block": "[[[10,1],[15,0,[28,[37,0],[\"user-status-message\",[30,1]],null]],[12],[1,\"\\n  \"],[1,[28,[35,1],[[30,2,[\"emoji\"]]],[[\"skipTitle\"],[true]]]],[1,\"\\n\"],[41,[30,3],[[[1,\"    \"],[10,1],[14,0,\"user-status-message-description\"],[12],[1,\"\\n      \"],[1,[30,2,[\"description\"]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showTooltip\"]],[[[1,\"    \"],[8,[39,3],null,null,[[\"default\"],[[[[1,\"\\n      \"],[10,0],[14,0,\"user-status-message-tooltip\"],[12],[1,\"\\n        \"],[1,[28,[35,1],[[30,2,[\"emoji\"]]],[[\"skipTitle\"],[true]]]],[1,\"\\n        \"],[10,1],[14,0,\"user-status-tooltip-description\"],[12],[1,\"\\n          \"],[1,[30,2,[\"description\"]]],[1,\"\\n        \"],[13],[1,\"\\n\"],[41,[30,0,[\"until\"]],[[[1,\"          \"],[10,0],[14,0,\"user-status-tooltip-until\"],[12],[1,\"\\n            \"],[1,[30,0,[\"until\"]]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\"]],[]],null],[13]],[\"@class\",\"@status\",\"@showDescription\"],false,[\"concat-class\",\"emoji\",\"if\",\"d-tooltip\"]]",
    "moduleName": "discourse/components/user-status-message.hbs",
    "isStrictMode": false
  });
  let UserStatusMessage = (_dec = (0, _object.computed)("status.ends_at"), (_class = class UserStatusMessage extends _component.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "tagName", "");
      _defineProperty(this, "showTooltip", true);
    }
    get until() {
      if (!this.status.ends_at) {
        return null;
      }
      const timezone = this.currentUser ? this.currentUser.user_option?.timezone : moment.tz.guess();
      return (0, _formatter.until)(this.status.ends_at, timezone, this.currentUser?.locale);
    }
  }, (_applyDecoratedDescriptor(_class.prototype, "until", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "until"), _class.prototype)), _class));
  _exports.default = UserStatusMessage;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserStatusMessage);
});
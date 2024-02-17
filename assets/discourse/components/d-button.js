define("discourse/components/d-button", ["exports", "@ember/component", "@ember/template-factory", "@ember/service", "@ember/object", "@ember/object/computed", "discourse/components/glimmer-component-with-deprecated-parent-view", "discourse-common/lib/deprecated", "discourse/lib/url", "I18n"], function (_exports, _component, _templateFactory, _service, _object, _computed, _glimmerComponentWithDeprecatedParentView, _deprecated, _url, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/service",0,"@ember/object",0,"@ember/object/computed",0,"discourse/components/glimmer-component-with-deprecated-parent-view",0,"discourse-common/lib/deprecated",0,"discourse/lib/url",0,"I18n"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{! template-lint-disable no-down-event-binding }}
  <button
    {{! For legacy compatibility. Prefer passing class as attributes. }}
    class="{{@class}}
      {{if @isLoading 'is-loading'}}
      {{if this.btnLink 'btn-link' 'btn'}}
      {{if this.noText 'no-text'}}
      {{this.btnType}}"
    {{! For legacy compatibility. Prefer passing these as html attributes. }}
    id={{@id}}
    form={{@form}}
    aria-controls={{@ariaControls}}
    aria-expanded={{this.computedAriaExpanded}}
    tabindex={{@tabindex}}
    type={{or @type "button"}}
    ...attributes
    disabled={{this.isDisabled}}
    title={{this.computedTitle}}
    aria-label={{this.computedAriaLabel}}
    {{on "keydown" this.keyDown}}
    {{on "click" this.click}}
    {{on "mousedown" this.mouseDown}}
  >
    {{#if @isLoading}}
      {{~d-icon "spinner" class="loading-icon"~}}
    {{else}}
      {{#if @icon}}
        {{~d-icon @icon~}}
      {{/if}}
    {{/if}}
  
    {{~#if this.computedLabel~}}
      <span class="d-button-label">
        {{~html-safe this.computedLabel~}}
        {{~#if @ellipsis~}}
          &hellip;
        {{~/if~}}
      </span>
    {{~else if (not (has-block))~}}
      &#8203;
      {{! Zero-width space character, so icon-only button height = regular button height }}
    {{~/if~}}
  
    {{yield}}
  </button>
  */
  {
    "id": "92FdjVGG",
    "block": "[[[11,\"button\"],[16,0,[29,[[30,1],\"\\n    \",[52,[30,2],\"is-loading\"],\"\\n    \",[52,[30,0,[\"btnLink\"]],\"btn-link\",\"btn\"],\"\\n    \",[52,[30,0,[\"noText\"]],\"no-text\"],\"\\n    \",[30,0,[\"btnType\"]]]]],[16,1,[30,3]],[16,\"form\",[30,4]],[16,\"aria-controls\",[30,5]],[16,\"aria-expanded\",[30,0,[\"computedAriaExpanded\"]]],[16,\"tabindex\",[30,6]],[16,4,[28,[37,1],[[30,7],\"button\"],null]],[17,8],[16,\"disabled\",[30,0,[\"isDisabled\"]]],[16,\"title\",[30,0,[\"computedTitle\"]]],[16,\"aria-label\",[30,0,[\"computedAriaLabel\"]]],[4,[38,2],[\"keydown\",[30,0,[\"keyDown\"]]],null],[4,[38,2],[\"click\",[30,0,[\"click\"]]],null],[4,[38,2],[\"mousedown\",[30,0,[\"mouseDown\"]]],null],[12],[1,\"\\n\"],[41,[30,2],[[[1,[28,[35,3],[\"spinner\"],[[\"class\"],[\"loading-icon\"]]]]],[]],[[[41,[30,9],[[[1,[28,[35,3],[[30,9]],null]]],[]],null]],[]]],[41,[30,0,[\"computedLabel\"]],[[[10,1],[14,0,\"d-button-label\"],[12],[1,[28,[35,4],[[30,0,[\"computedLabel\"]]],null]],[41,[30,10],[[[1,\"…\"]],[]],null],[13]],[]],[[[41,[28,[37,5],[[48,[30,11]]],null],[[[1,\"​\\n\"]],[]],null]],[]]],[18,11,null],[1,\"\\n\"],[13]],[\"@class\",\"@isLoading\",\"@id\",\"@form\",\"@ariaControls\",\"@tabindex\",\"@type\",\"&attrs\",\"@icon\",\"@ellipsis\",\"&default\"],false,[\"if\",\"or\",\"on\",\"d-icon\",\"html-safe\",\"not\",\"has-block\",\"yield\"]]",
    "moduleName": "discourse/components/d-button.hbs",
    "isStrictMode": false
  });
  const ACTION_AS_STRING_DEPRECATION_ARGS = ["DButton no longer supports @action as a string. Please refactor to use an closure action instead.", {
    id: "discourse.d-button-action-string"
  }];
  let DButton = (_dec = (0, _computed.notEmpty)("args.icon"), _dec2 = (0, _computed.equal)("args.display", "link"), _dec3 = (0, _computed.empty)("computedLabel"), (_class = class DButton extends _glimmerComponentWithDeprecatedParentView.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "router", _descriptor, this);
      _initializerDefineProperty(this, "btnIcon", _descriptor2, this);
      _initializerDefineProperty(this, "btnLink", _descriptor3, this);
      _initializerDefineProperty(this, "noText", _descriptor4, this);
      if (typeof this.args.action === "string") {
        (0, _deprecated.default)(...ACTION_AS_STRING_DEPRECATION_ARGS);
      }
    }
    get forceDisabled() {
      return !!this.args.isLoading;
    }
    get isDisabled() {
      return this.forceDisabled || this.args.disabled;
    }
    get btnType() {
      if (this.args.icon) {
        return this.computedLabel ? "btn-icon-text" : "btn-icon";
      } else if (this.computedLabel) {
        return "btn-text";
      }
    }
    get computedTitle() {
      if (this.args.title) {
        return _I18n.default.t(this.args.title);
      }
      return this.args.translatedTitle;
    }
    get computedLabel() {
      if (this.args.label) {
        return _I18n.default.t(this.args.label);
      }
      return this.args.translatedLabel;
    }
    get computedAriaLabel() {
      if (this.args.ariaLabel) {
        return _I18n.default.t(this.args.ariaLabel);
      }
      if (this.args.translatedAriaLabel) {
        return this.args.translatedAriaLabel;
      }
    }
    get computedAriaExpanded() {
      if (this.args.ariaExpanded === true) {
        return "true";
      }
      if (this.args.ariaExpanded === false) {
        return "false";
      }
    }
    keyDown(e) {
      if (this.args.onKeyDown) {
        e.stopPropagation();
        this.args.onKeyDown(e);
      } else if (e.key === "Enter") {
        this._triggerAction(e);
      }
    }
    click(event) {
      return this._triggerAction(event);
    }
    mouseDown(event) {
      if (this.args.preventFocus) {
        event.preventDefault();
      }
    }
    _triggerAction(event) {
      const {
        action: actionVal,
        route,
        href
      } = this.args;
      if (actionVal || route || href?.length) {
        if (actionVal) {
          const {
            actionParam,
            forwardEvent
          } = this.args;
          if (typeof actionVal === "string") {
            (0, _deprecated.default)(...ACTION_AS_STRING_DEPRECATION_ARGS);
            if (this._target?.send) {
              this._target.send(actionVal, actionParam);
            } else {
              throw new Error("DButton could not find a target for the action. Use a closure action instead");
            }
          } else if (typeof actionVal === "object" && actionVal.value) {
            if (forwardEvent) {
              actionVal.value(actionParam, event);
            } else {
              actionVal.value(actionParam);
            }
          } else if (typeof actionVal === "function") {
            if (forwardEvent) {
              actionVal(actionParam, event);
            } else {
              actionVal(actionParam);
            }
          }
        } else if (route) {
          this.router.transitionTo(route);
        } else if (href?.length) {
          _url.default.routeTo(href);
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "btnIcon", [_dec], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "btnLink", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, "noText", [_dec3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "keyDown", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "keyDown"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "click", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "click"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "mouseDown", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "mouseDown"), _class.prototype)), _class));
  _exports.default = DButton;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, DButton);
});
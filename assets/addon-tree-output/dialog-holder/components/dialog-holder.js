define("dialog-holder/components/dialog-holder", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service", "@ember/object"], function (_exports, _component, _templateFactory, _component2, _service, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service",0,"@ember/object"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div
    id="dialog-holder"
    class="dialog-container {{this.dialog.class}}"
    aria-labelledby={{this.dialog.titleElementId}}
    aria-hidden="true"
  >
    <div class="dialog-overlay" data-a11y-dialog-hide></div>
  
    {{#if this.dialog.type}}
      <div class="dialog-content" role="document">
        {{#if this.dialog.title}}
          <div class="dialog-header">
            <h3 id={{this.dialog.titleElementId}}>{{this.dialog.title}}</h3>
            <DButton
              @icon="times"
              @action={{action this.dialog.cancel}}
              @class="btn-flat dialog-close close"
              @title="modal.close"
            />
          </div>
        {{/if}}
  
        {{#if (or this.dialog.message this.dialog.bodyComponent)}}
          <div class="dialog-body">
            {{#if this.dialog.bodyComponent}}
              <this.dialog.bodyComponent
                @model={{this.dialog.bodyComponentModel}}
              />
            {{else if this.dialog.message}}
              <p>{{this.dialog.message}}</p>
            {{/if}}
          </div>
        {{/if}}
  
        {{#if (notEq this.dialog.type "notice")}}
          <div class="dialog-footer">
            {{#each this.dialog.buttons as |button|}}
              <DButton
                @icon={{button.icon}}
                @class={{button.class}}
                @action={{action "handleButtonAction" button}}
                @translatedLabel={{button.label}}
              />
            {{else}}
              <DButton
                @class={{this.dialog.confirmButtonClass}}
                @disabled={{this.dialog.confirmButtonDisabled}}
                @action={{this.dialog.didConfirmWrapped}}
                @icon={{this.dialog.confirmButtonIcon}}
                @label={{this.dialog.confirmButtonLabel}}
              />
              {{#if this.dialog.shouldDisplayCancel}}
                <DButton
                  @class={{this.dialog.cancelButtonClass}}
                  @action={{this.dialog.cancel}}
                  @label={{this.dialog.cancelButtonLabel}}
                />
              {{/if}}
            {{/each}}
          </div>
        {{/if}}
      </div>
    {{/if}}
  </div>
  */
  {
    "id": "2/GOLufq",
    "block": "[[[10,0],[14,1,\"dialog-holder\"],[15,0,[29,[\"dialog-container \",[30,0,[\"dialog\",\"class\"]]]]],[15,\"aria-labelledby\",[30,0,[\"dialog\",\"titleElementId\"]]],[14,\"aria-hidden\",\"true\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"dialog-overlay\"],[14,\"data-a11y-dialog-hide\",\"\"],[12],[13],[1,\"\\n\\n\"],[41,[30,0,[\"dialog\",\"type\"]],[[[1,\"    \"],[10,0],[14,0,\"dialog-content\"],[14,\"role\",\"document\"],[12],[1,\"\\n\"],[41,[30,0,[\"dialog\",\"title\"]],[[[1,\"        \"],[10,0],[14,0,\"dialog-header\"],[12],[1,\"\\n          \"],[10,\"h3\"],[15,1,[30,0,[\"dialog\",\"titleElementId\"]]],[12],[1,[30,0,[\"dialog\",\"title\"]]],[13],[1,\"\\n          \"],[8,[39,1],null,[[\"@icon\",\"@action\",\"@class\",\"@title\"],[\"times\",[28,[37,2],[[30,0],[30,0,[\"dialog\",\"cancel\"]]],null],\"btn-flat dialog-close close\",\"modal.close\"]],null],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,3],[[30,0,[\"dialog\",\"message\"]],[30,0,[\"dialog\",\"bodyComponent\"]]],null],[[[1,\"        \"],[10,0],[14,0,\"dialog-body\"],[12],[1,\"\\n\"],[41,[30,0,[\"dialog\",\"bodyComponent\"]],[[[1,\"            \"],[8,[30,0,[\"dialog\",\"bodyComponent\"]],null,[[\"@model\"],[[30,0,[\"dialog\",\"bodyComponentModel\"]]]],null],[1,\"\\n\"]],[]],[[[41,[30,0,[\"dialog\",\"message\"]],[[[1,\"            \"],[10,2],[12],[1,[30,0,[\"dialog\",\"message\"]]],[13],[1,\"\\n          \"]],[]],null]],[]]],[1,\"        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,4],[[30,0,[\"dialog\",\"type\"]],\"notice\"],null],[[[1,\"        \"],[10,0],[14,0,\"dialog-footer\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,0,[\"dialog\",\"buttons\"]]],null]],null],null,[[[1,\"            \"],[8,[39,1],null,[[\"@icon\",\"@class\",\"@action\",\"@translatedLabel\"],[[30,1,[\"icon\"]],[30,1,[\"class\"]],[28,[37,2],[[30,0],\"handleButtonAction\",[30,1]],null],[30,1,[\"label\"]]]],null],[1,\"\\n\"]],[1]],[[[1,\"            \"],[8,[39,1],null,[[\"@class\",\"@disabled\",\"@action\",\"@icon\",\"@label\"],[[30,0,[\"dialog\",\"confirmButtonClass\"]],[30,0,[\"dialog\",\"confirmButtonDisabled\"]],[30,0,[\"dialog\",\"didConfirmWrapped\"]],[30,0,[\"dialog\",\"confirmButtonIcon\"]],[30,0,[\"dialog\",\"confirmButtonLabel\"]]]],null],[1,\"\\n\"],[41,[30,0,[\"dialog\",\"shouldDisplayCancel\"]],[[[1,\"              \"],[8,[39,1],null,[[\"@class\",\"@action\",\"@label\"],[[30,0,[\"dialog\",\"cancelButtonClass\"]],[30,0,[\"dialog\",\"cancel\"]],[30,0,[\"dialog\",\"cancelButtonLabel\"]]]],null],[1,\"\\n\"]],[]],null]],[]]],[1,\"        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]],null],[13]],[\"button\"],false,[\"if\",\"d-button\",\"action\",\"or\",\"notEq\",\"each\",\"-track-array\"]]",
    "moduleName": "dialog-holder/components/dialog-holder.hbs",
    "isStrictMode": false
  });
  let DialogHolder = (_class = class DialogHolder extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "dialog", _descriptor, this);
    }
    async handleButtonAction(btn) {
      if (btn.action && typeof btn.action === "function") {
        await btn.action();
      }
      this.dialog.cancel();
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "dialog", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "handleButtonAction", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "handleButtonAction"), _class.prototype)), _class);
  _exports.default = DialogHolder;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, DialogHolder);
});
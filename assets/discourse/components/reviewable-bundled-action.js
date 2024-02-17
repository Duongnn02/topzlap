define("discourse/components/reviewable-bundled-action", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/lib/text-direction"], function (_exports, _component, _templateFactory, _computed, _decorators, _textDirection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object/computed",0,"@ember/component",0,"discourse-common/utils/decorators",0,"discourse/lib/text-direction"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.multiple}}
    <DropdownSelectBox
      @class="reviewable-action-dropdown btn-icon-text"
      @nameProperty="label"
      @content={{this.bundle.actions}}
      @onChange={{action "performById"}}
      @options={{hash
        showCaret=true
        disabled=this.reviewableUpdating
        placement=this.placement
        translatedNone=this.bundle.label
      }}
    />
  {{else}}
    <DButton
      @class={{concat
        "reviewable-action "
        (dasherize this.first.id)
        " "
        this.first.button_class
      }}
      @action={{action "perform" this.first}}
      @translatedLabel={{this.first.label}}
      @disabled={{this.reviewableUpdating}}
    />
  {{/if}}
  */
  {
    "id": "AnthLQER",
    "block": "[[[41,[30,0,[\"multiple\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@class\",\"@nameProperty\",\"@content\",\"@onChange\",\"@options\"],[\"reviewable-action-dropdown btn-icon-text\",\"label\",[30,0,[\"bundle\",\"actions\"]],[28,[37,2],[[30,0],\"performById\"],null],[28,[37,3],null,[[\"showCaret\",\"disabled\",\"placement\",\"translatedNone\"],[true,[30,0,[\"reviewableUpdating\"]],[30,0,[\"placement\"]],[30,0,[\"bundle\",\"label\"]]]]]]],null],[1,\"\\n\"]],[]],[[[1,\"  \"],[8,[39,4],null,[[\"@class\",\"@action\",\"@translatedLabel\",\"@disabled\"],[[28,[37,5],[\"reviewable-action \",[28,[37,6],[[30,0,[\"first\",\"id\"]]],null],\" \",[30,0,[\"first\",\"button_class\"]]],null],[28,[37,2],[[30,0],\"perform\",[30,0,[\"first\"]]],null],[30,0,[\"first\",\"label\"]],[30,0,[\"reviewableUpdating\"]]]],null],[1,\"\\n\"]],[]]]],[],false,[\"if\",\"dropdown-select-box\",\"action\",\"hash\",\"d-button\",\"concat\",\"dasherize\"]]",
    "moduleName": "discourse/components/reviewable-bundled-action.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)(), (_obj = {
    tagName: "",
    multiple: (0, _computed.gt)("bundle.actions.length", 1),
    first: (0, _computed.alias)("bundle.actions.firstObject"),
    placement() {
      const vertical = this.site.mobileView ? "top" : "bottom",
        horizontal = (0, _textDirection.isRTL)() ? "end" : "start";
      return `${vertical}-${horizontal}`;
    },
    actions: {
      performById(id) {
        this.attrs.performAction(this.get("bundle.actions").findBy("id", id));
      },
      perform(action) {
        this.attrs.performAction(action);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "placement", [_dec], Object.getOwnPropertyDescriptor(_obj, "placement"), _obj)), _obj))));
  _exports.default = _default;
});
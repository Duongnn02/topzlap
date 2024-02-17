define("discourse/components/login-buttons", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "discourse/models/login-method"], function (_exports, _component, _templateFactory, _decorators, _loginMethod) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators",0,"discourse/models/login-method"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each this.buttons as |b|}}
    <button
      type="button"
      class="btn btn-social {{b.name}}"
      {{on "click" (action this.externalLogin b)}}
      aria-label={{b.screenReaderTitle}}
      tabindex="3"
    >
      {{#if b.isGoogle}}
        <GoogleIcon />
      {{else if b.icon}}
        {{d-icon b.icon}}
      {{else}}
        {{d-icon "sign-in-alt"}}
      {{/if}}
      {{b.title}}
    </button>
  {{/each}}
  <PluginOutlet @name="after-login-buttons" />
  */
  {
    "id": "QLQXuuL/",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,0,[\"buttons\"]]],null]],null],null,[[[1,\"  \"],[11,\"button\"],[16,0,[29,[\"btn btn-social \",[30,1,[\"name\"]]]]],[16,\"aria-label\",[30,1,[\"screenReaderTitle\"]]],[24,\"tabindex\",\"3\"],[24,4,\"button\"],[4,[38,2],[\"click\",[28,[37,3],[[30,0],[30,0,[\"externalLogin\"]],[30,1]],null]],null],[12],[1,\"\\n\"],[41,[30,1,[\"isGoogle\"]],[[[1,\"      \"],[8,[39,5],null,null,null],[1,\"\\n\"]],[]],[[[41,[30,1,[\"icon\"]],[[[1,\"      \"],[1,[28,[35,6],[[30,1,[\"icon\"]]],null]],[1,\"\\n\"]],[]],[[[1,\"      \"],[1,[28,[35,6],[\"sign-in-alt\"],null]],[1,\"\\n    \"]],[]]]],[]]],[1,\"    \"],[1,[30,1,[\"title\"]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[1]],null],[8,[39,7],null,[[\"@name\"],[\"after-login-buttons\"]],null]],[\"b\"],false,[\"each\",\"-track-array\",\"on\",\"action\",\"if\",\"google-icon\",\"d-icon\",\"plugin-outlet\"]]",
    "moduleName": "discourse/components/login-buttons.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("buttons.length", "showLoginWithEmailLink"), (_obj = {
    elementId: "login-buttons",
    classNameBindings: ["hidden"],
    hidden(buttonsCount, showLoginWithEmailLink) {
      return buttonsCount === 0 && !showLoginWithEmailLink;
    },
    buttons() {
      return (0, _loginMethod.findAll)();
    },
    actions: {
      externalLogin(provider) {
        this.externalLogin(provider);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "hidden", [_dec], Object.getOwnPropertyDescriptor(_obj, "hidden"), _obj), _applyDecoratedDescriptor(_obj, "buttons", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "buttons"), _obj)), _obj))));
  _exports.default = _default;
});
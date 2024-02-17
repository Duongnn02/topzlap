define("discourse/components/signup-cta", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/lib/later", "@ember/object", "@ember/object/evented"], function (_exports, _component, _templateFactory, _later, _object, _evented) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/lib/later",0,"@ember/object",0,"@ember/object/evented"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="signup-cta alert alert-info">
    {{#if this.session.hideSignupCta}}
      <h3>
        {{i18n "signup_cta.hidden_for_session"}}
      </h3>
    {{else}}
      <h3>{{replace-emoji (i18n "signup_cta.intro")}}</h3>
      <p>{{replace-emoji (i18n "signup_cta.value_prop")}}</p>
  
      <div class="buttons">
        <DButton
          @action={{route-action "showCreateAccount"}}
          @label="signup_cta.sign_up"
          @icon="user"
          @class="btn-primary"
        />
        <DButton
          @action={{action "hideForSession"}}
          @label="signup_cta.hide_session"
          @class="no-icon"
        />
        <a href {{on "click" this.neverShow}}>{{i18n
            "signup_cta.hide_forever"
          }}</a>
      </div>
    {{/if}}
  </div>
  */
  {
    "id": "4ujhsD4m",
    "block": "[[[10,0],[14,0,\"signup-cta alert alert-info\"],[12],[1,\"\\n\"],[41,[30,0,[\"session\",\"hideSignupCta\"]],[[[1,\"    \"],[10,\"h3\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"signup_cta.hidden_for_session\"],null]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,\"h3\"],[12],[1,[28,[35,2],[[28,[37,1],[\"signup_cta.intro\"],null]],null]],[13],[1,\"\\n    \"],[10,2],[12],[1,[28,[35,2],[[28,[37,1],[\"signup_cta.value_prop\"],null]],null]],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"buttons\"],[12],[1,\"\\n      \"],[8,[39,3],null,[[\"@action\",\"@label\",\"@icon\",\"@class\"],[[28,[37,4],[\"showCreateAccount\"],null],\"signup_cta.sign_up\",\"user\",\"btn-primary\"]],null],[1,\"\\n      \"],[8,[39,3],null,[[\"@action\",\"@label\",\"@class\"],[[28,[37,5],[[30,0],\"hideForSession\"],null],\"signup_cta.hide_session\",\"no-icon\"]],null],[1,\"\\n      \"],[11,3],[24,6,\"\"],[4,[38,6],[\"click\",[30,0,[\"neverShow\"]]],null],[12],[1,[28,[35,1],[\"signup_cta.hide_forever\"],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]],[13]],[],false,[\"if\",\"i18n\",\"replace-emoji\",\"d-button\",\"route-action\",\"action\",\"on\"]]",
    "moduleName": "discourse/components/signup-cta.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_obj = {
    action: "showCreateAccount",
    neverShow(event) {
      event?.preventDefault();
      this.keyValueStore.setItem("anon-cta-never", "t");
      this.session.set("showSignupCta", false);
    },
    actions: {
      hideForSession() {
        this.session.set("hideSignupCta", true);
        this.keyValueStore.setItem("anon-cta-hidden", Date.now());
        (0, _later.default)(() => this.session.set("showSignupCta", false), 20 * 1000);
      }
    },
    _turnOffIfHidden: (0, _evented.on)("willDestroyElement", function () {
      if (this.session.get("hideSignupCta")) {
        this.session.set("showSignupCta", false);
      }
    })
  }, (_applyDecoratedDescriptor(_obj, "neverShow", [_object.action], Object.getOwnPropertyDescriptor(_obj, "neverShow"), _obj)), _obj)));
  _exports.default = _default;
});
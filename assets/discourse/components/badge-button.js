define("discourse/components/badge-button", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "discourse-common/lib/dom-from-string"], function (_exports, _component, _templateFactory, _component2, _domFromString) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"discourse-common/lib/dom-from-string"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <span
    class="user-badge
      {{@badge.badgeTypeClassName}}
      {{unless @badge.enabled 'disabled'}}"
    title={{this.title}}
    data-badge-name={{@badge.name}}
  >
    {{icon-or-image @badge}}
    <span class="badge-display-name">{{@badge.name}}</span>
    {{yield}}
  </span>
  */
  {
    "id": "3aNjZv4z",
    "block": "[[[10,1],[15,0,[29,[\"user-badge\\n    \",[30,1,[\"badgeTypeClassName\"]],\"\\n    \",[52,[51,[30,1,[\"enabled\"]]],\"disabled\"]]]],[15,\"title\",[30,0,[\"title\"]]],[15,\"data-badge-name\",[30,1,[\"name\"]]],[12],[1,\"\\n  \"],[1,[28,[35,1],[[30,1]],null]],[1,\"\\n  \"],[10,1],[14,0,\"badge-display-name\"],[12],[1,[30,1,[\"name\"]]],[13],[1,\"\\n  \"],[18,2,null],[1,\"\\n\"],[13]],[\"@badge\",\"&default\"],false,[\"unless\",\"icon-or-image\",\"yield\"]]",
    "moduleName": "discourse/components/badge-button.hbs",
    "isStrictMode": false
  });
  // Takes @badge as argument.
  class BadgeButtonComponent extends _component2.default {
    get title() {
      const description = this.args.badge?.description;
      if (description) {
        return (0, _domFromString.default)(`<div>${description}</div>`)[0].innerText;
      }
    }
  }
  _exports.default = BadgeButtonComponent;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, BadgeButtonComponent);
});
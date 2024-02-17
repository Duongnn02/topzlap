define("discourse/components/user-menu/menu-tab", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component"], function (_exports, _component, _templateFactory, _component2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <a
    role="tab"
    class={{this.classNames}}
    id={{this.id}}
    tabindex={{this.tabIndex}}
    title={{@tab.title}}
    aria-selected={{if this.isActive "true" "false"}}
    aria-controls={{this.ariaControls}}
    data-tab-number={{@tab.position}}
    href={{@tab.linkWhenActive}}
    {{on "click" @onTabClick}}
  >
    {{d-icon @tab.icon}}
    {{#if @tab.count}}
      <span aria-hidden="true" class="badge-notification">{{@tab.count}}</span>
    {{/if}}
    {{yield}}
  </a>
  */
  {
    "id": "9qIk+apY",
    "block": "[[[11,3],[24,\"role\",\"tab\"],[16,0,[30,0,[\"classNames\"]]],[16,1,[30,0,[\"id\"]]],[16,\"tabindex\",[30,0,[\"tabIndex\"]]],[16,\"title\",[30,1,[\"title\"]]],[16,\"aria-selected\",[52,[30,0,[\"isActive\"]],\"true\",\"false\"]],[16,\"aria-controls\",[30,0,[\"ariaControls\"]]],[16,\"data-tab-number\",[30,1,[\"position\"]]],[16,6,[30,1,[\"linkWhenActive\"]]],[4,[38,1],[\"click\",[30,2]],null],[12],[1,\"\\n  \"],[1,[28,[35,2],[[30,1,[\"icon\"]]],null]],[1,\"\\n\"],[41,[30,1,[\"count\"]],[[[1,\"    \"],[10,1],[14,\"aria-hidden\",\"true\"],[14,0,\"badge-notification\"],[12],[1,[30,1,[\"count\"]]],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[18,3,null],[1,\"\\n\"],[13]],[\"@tab\",\"@onTabClick\",\"&default\"],false,[\"if\",\"on\",\"d-icon\",\"yield\"]]",
    "moduleName": "discourse/components/user-menu/menu-tab.hbs",
    "isStrictMode": false
  });
  class UserMenuTab extends _component2.default {
    get isActive() {
      return this.args.tab.id === this.args.currentTabId;
    }
    get classNames() {
      const list = ["btn", "btn-flat", "btn-icon", "no-text", "user-menu-tab"];
      if (this.isActive) {
        list.push("active");
      }
      return list.join(" ");
    }
    get id() {
      return `user-menu-button-${this.args.tab.id}`;
    }
    get tabIndex() {
      return this.isActive ? "0" : "-1";
    }
    get ariaControls() {
      return `quick-access-${this.args.tab.id}`;
    }
  }
  _exports.default = UserMenuTab;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, UserMenuTab);
});
define("discourse/components/d-navigation-item", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "@ember/service"], function (_exports, _component, _templateFactory, _object, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"@ember/service"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <LinkTo @route={{this.route}}>
    {{yield}}
  </LinkTo>
  */
  {
    "id": "1aNQ5RvD",
    "block": "[[[8,[39,0],null,[[\"@route\"],[[30,0,[\"route\"]]]],[[\"default\"],[[[[1,\"\\n  \"],[18,1,null],[1,\"\\n\"]],[]]]]]],[\"&default\"],false,[\"link-to\",\"yield\"]]",
    "moduleName": "discourse/components/d-navigation-item.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "li",
    route: null,
    router: (0, _service.inject)(),
    attributeBindings: ["ariaCurrent:aria-current", "title"],
    ariaCurrent: (0, _object.computed)("router.currentRouteName", "router.currentRoute.parent.name", "route", "ariaCurrentContext", function () {
      let ariaCurrentValue = "page";

      // when there are multiple levels of navigation
      // we want the active parent to get `aria-current="page"`
      // and the active child to get `aria-current="location"`
      if (this.ariaCurrentContext === "subNav") {
        ariaCurrentValue = "location";
      } else if (this.ariaCurrentContext === "parentNav") {
        if (this.router.currentRouteName !== this.route &&
        // not the current route
        this.router.currentRoute.parent.name.includes(this.route) // but is the current parent route
        ) {
          return "page";
        }
      }
      return this.router.currentRouteName === this.route ? ariaCurrentValue : null;
    })
  }));
  _exports.default = _default;
});
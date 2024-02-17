define("discourse/components/nav-item", ["exports", "@ember/component", "@ember/template-factory", "I18n", "discourse-common/utils/decorators", "discourse-common/lib/icon-library", "@ember/service", "@ember/template"], function (_exports, _component, _templateFactory, _I18n, _decorators, _iconLibrary, _service, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators",0,"discourse-common/lib/icon-library",0,"@ember/service",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.routeParam}}
    <LinkTo
      @route={{this.route}}
      @model={{this.routeParam}}
    >{{this.contents}}</LinkTo>
  {{else if this.route}}
    <LinkTo @route={{this.route}}>{{this.contents}}</LinkTo>
  {{else}}
    <a href={{get-url this.path}} data-auto-route="true">{{this.contents}}</a>
  {{/if}}
  */
  {
    "id": "PSWcUtEC",
    "block": "[[[41,[30,0,[\"routeParam\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@route\",\"@model\"],[[30,0,[\"route\"]],[30,0,[\"routeParam\"]]]],[[\"default\"],[[[[1,[30,0,[\"contents\"]]]],[]]]]],[1,\"\\n\"]],[]],[[[41,[30,0,[\"route\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@route\"],[[30,0,[\"route\"]]]],[[\"default\"],[[[[1,[30,0,[\"contents\"]]]],[]]]]],[1,\"\\n\"]],[]],[[[1,\"  \"],[10,3],[15,6,[28,[37,2],[[30,0,[\"path\"]]],null]],[14,\"data-auto-route\",\"true\"],[12],[1,[30,0,[\"contents\"]]],[13],[1,\"\\n\"]],[]]]],[]]]],[],false,[\"if\",\"link-to\",\"get-url\"]]",
    "moduleName": "discourse/components/nav-item.hbs",
    "isStrictMode": false
  });

  /* You might be looking for navigation-item. */
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("label", "i18nLabel", "icon"), _dec2 = (0, _decorators.default)("route", "router.currentRoute"), (_obj = {
    tagName: "li",
    classNameBindings: ["active"],
    router: (0, _service.inject)(),
    contents(label, i18nLabel, icon) {
      let text = i18nLabel || _I18n.default.t(label);
      if (icon) {
        return (0, _template.htmlSafe)(`${(0, _iconLibrary.iconHTML)(icon)} ${text}`);
      }
      return text;
    },
    active(route, currentRoute) {
      if (!route) {
        return;
      }
      const routeParam = this.routeParam;
      if (routeParam && currentRoute) {
        return currentRoute.params["filter"] === routeParam;
      }
      return this.router.isActive(route);
    }
  }, (_applyDecoratedDescriptor(_obj, "contents", [_dec], Object.getOwnPropertyDescriptor(_obj, "contents"), _obj), _applyDecoratedDescriptor(_obj, "active", [_dec2], Object.getOwnPropertyDescriptor(_obj, "active"), _obj)), _obj))));
  _exports.default = _default;
});
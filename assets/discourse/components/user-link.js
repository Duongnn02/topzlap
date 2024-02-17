define("discourse/components/user-link", ["exports", "@ember/component", "@ember/object/computed"], function (_exports, _component, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  var _default = _component.default.extend({
    tagName: "a",
    attributeBindings: ["href", "data-user-card"],
    href: (0, _computed.alias)("user.path"),
    "data-user-card": (0, _computed.alias)("user.username")
  });
  _exports.default = _default;
});
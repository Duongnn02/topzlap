define("discourse-common/lib/attribute-hook", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  // FROM: https://github.com/Matt-Esch/virtual-dom
  // License: MIT

  function AttributeHook(namespace, value) {
    if (!(this instanceof AttributeHook)) {
      return new AttributeHook(namespace, value);
    }
    this.namespace = namespace;
    this.value = value;
  }
  AttributeHook.prototype.hook = function (node, prop, prev) {
    if (prev && prev.type === "AttributeHook" && prev.value === this.value && prev.namespace === this.namespace) {
      return;
    }
    node.setAttributeNS(this.namespace, prop, this.value);
  };
  AttributeHook.prototype.unhook = function (node, prop, next) {
    if (next && next.type === "AttributeHook" && next.namespace === this.namespace) {
      return;
    }
    let colonPosition = prop.indexOf(":");
    let localName = colonPosition > -1 ? prop.slice(colonPosition + 1) : prop;
    node.removeAttributeNS(this.namespace, localName);
  };
  AttributeHook.prototype.type = "AttributeHook";
  var _default = AttributeHook;
  _exports.default = _default;
});
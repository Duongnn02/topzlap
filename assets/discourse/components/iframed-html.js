define("discourse/components/iframed-html", ["exports", "@ember/component"], function (_exports, _component) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/component"eaimeta@70e063a35619d71f
  var _default = _component.default.extend({
    tagName: "iframe",
    html: null,
    className: "",
    classNameBindings: ["html:iframed-html", "className"],
    sandbox: "allow-same-origin",
    attributeBindings: ["sandbox:sandbox"],
    didRender() {
      this._super(...arguments);
      const iframeDoc = this.element.contentWindow.document;
      iframeDoc.open("text/html", "replace");
      iframeDoc.write(this.html);
      iframeDoc.close();
    }
  });
  _exports.default = _default;
});
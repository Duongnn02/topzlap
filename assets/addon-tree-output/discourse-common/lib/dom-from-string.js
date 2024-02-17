define("discourse-common/lib/dom-from-string", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = domFromString;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function domFromString(string) {
    const template = document.createElement("template");
    string = string.trim();
    template.innerHTML = string;
    return template.content.children;
  }
});
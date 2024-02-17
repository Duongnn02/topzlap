define("discourse/lib/highlight-html", ["exports", "discourse-common/lib/helpers"], function (_exports, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  _exports.unhighlightHTML = unhighlightHTML;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  function highlight(node, pattern, nodeName, className) {
    if (![Node.ELEMENT_NODE, Node.TEXT_NODE].includes(node.nodeType) || ["SCRIPT", "STYLE"].includes(node.tagName) || node.tagName === nodeName && node.className === className) {
      return 0;
    }
    if (node.nodeType === Node.ELEMENT_NODE && node.childNodes) {
      for (let i = 0; i < node.childNodes.length; i++) {
        i += highlight(node.childNodes[i], pattern, nodeName, className);
      }
      return 0;
    }
    if (node.nodeType === Node.TEXT_NODE) {
      const match = node.data.match(pattern);
      if (!match) {
        return 0;
      }
      const element = document.createElement(nodeName);
      element.className = className;
      element.innerText = match[0];
      const matchNode = node.splitText(match.index);
      matchNode.splitText(match[0].length);
      matchNode.parentNode.replaceChild(element, matchNode);
      return 1;
    }
    return 0;
  }
  function _default(node, words) {
    let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let settings = {
      nodeName: "span",
      className: "highlighted",
      matchCase: false
    };
    settings = Object.assign({}, settings, opts);
    words = (0, _helpers.makeArray)(words).filter(Boolean).map(word => word.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
    if (!words.length) {
      return node;
    }
    const pattern = `(${words.join(" ")})`;
    let flag;
    if (!settings.matchCase) {
      flag = "i";
    }
    highlight(node, new RegExp(pattern, flag), settings.nodeName.toUpperCase(), settings.className);
    return node;
  }
  function unhighlightHTML() {
    let opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let settings = {
      nodeName: "span",
      className: "highlighted"
    };
    settings = Object.assign({}, settings, opts);
    document.querySelectorAll(`${settings.nodeName}.${settings.className}`).forEach(element => {
      const parentNode = element.parentNode;
      parentNode.replaceChild(element.firstChild, element);
      parentNode.normalize();
    });
  }
});
define("discourse/widgets/post-placeholder", ["exports", "discourse/widgets/widget"], function (_exports, _widget) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/widget",0,"discourse/widgets/hbs-compiler"eaimeta@70e063a35619d71f
  var _default = (0, _widget.createWidget)("post-placeholder", {
    tagName: "article.placeholder",
    template: function (attrs, state) {
      var _r = [];
      _r.push("\n    ");
      var _a0 = [];
      _a0.push("\n      ");
      var _a1 = [];
      _a1.push("\n        ");
      var _a2 = [];
      _a1.push(virtualDom.h('div', {
        "className": "placeholder-avatar placeholder-animation",
        "attributes": {}
      }, _a2));
      _a1.push("\n      ");
      _a0.push(virtualDom.h('div', {
        "className": "topic-avatar",
        "attributes": {}
      }, _a1));
      _a0.push("\n      ");
      var _a3 = [];
      _a3.push("\n        ");
      var _a4 = [];
      _a3.push(virtualDom.h('div', {
        "className": "placeholder-text placeholder-animation",
        "attributes": {}
      }, _a4));
      _a3.push("\n        ");
      var _a5 = [];
      _a3.push(virtualDom.h('div', {
        "className": "placeholder-text placeholder-animation",
        "attributes": {}
      }, _a5));
      _a3.push("\n        ");
      var _a6 = [];
      _a3.push(virtualDom.h('div', {
        "className": "placeholder-text placeholder-animation",
        "attributes": {}
      }, _a6));
      _a3.push("\n      ");
      _a0.push(virtualDom.h('div', {
        "className": "topic-body",
        "attributes": {}
      }, _a3));
      _a0.push("\n    ");
      _r.push(virtualDom.h('div', {
        "className": "row",
        "attributes": {}
      }, _a0));
      _r.push("\n  ");
      return _r;
    }
  });
  _exports.default = _default;
});
define("discourse/widgets/menu-panel", ["discourse/widgets/widget", "virtual-dom"], function (_widget, _virtualDom) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/widget",0,"virtual-dom",0,"discourse/widgets/hbs-compiler"eaimeta@70e063a35619d71f
  (0, _widget.createWidget)("menu-links", {
    buildClasses(attrs) {
      if (attrs.name && attrs.name.length) {
        return `menu-container-${attrs.name}`;
      }
    },
    html(attrs) {
      const links = [].concat(attrs.contents());
      const liOpts = {};
      if (attrs.heading) {
        liOpts.className = "header";
      }
      const result = [];
      result.push((0, _virtualDom.h)("ul.menu-links.columned", links.map(l => (0, _virtualDom.h)("li", liOpts, l))));
      result.push((0, _virtualDom.h)("div.clearfix"));
      if (!attrs.omitRule) {
        result.push((0, _virtualDom.h)("hr"));
      }
      return result;
    }
  });
  (0, _widget.createWidget)("menu-panel", {
    tagName: "div.menu-panel",
    template: function (attrs, state) {
      var _r = [];
      _r.push("\n    ");
      var _a0 = [];
      _a0.push("\n      ");
      var _a1 = [];
      _a1.push("\n        ");
      _a1.push(this.attrs.contents());
      _a1.push("\n      ");
      _a0.push(virtualDom.h('div', {
        "className": "panel-body-contents",
        "attributes": {}
      }, _a1));
      _a0.push("\n    ");
      _r.push(virtualDom.h('div', {
        "className": "panel-body",
        "attributes": {}
      }, _a0));
      _r.push("\n  ");
      return _r;
    },
    buildAttributes(attrs) {
      if (attrs.maxWidth) {
        return {
          "data-max-width": attrs.maxWidth
        };
      }
    }
  });
});
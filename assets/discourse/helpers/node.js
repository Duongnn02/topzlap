define("discourse/helpers/node", ["exports", "discourse/lib/formatter", "virtual-dom"], function (_exports, _formatter, _virtualDom) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.dateNode = dateNode;
  _exports.numberNode = numberNode;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/formatter",0,"virtual-dom"eaimeta@70e063a35619d71f
  function dateNode(dt) {
    if (typeof dt === "string") {
      dt = new Date(dt);
    }
    if (dt) {
      const attributes = {
        title: (0, _formatter.longDate)(dt),
        "data-time": dt.getTime(),
        "data-format": "tiny"
      };
      return (0, _virtualDom.h)("span.relative-date", {
        attributes
      }, (0, _formatter.relativeAge)(dt));
    }
  }
  function numberNode(num, opts) {
    opts = opts || {};
    num = parseInt(num, 10);
    if (isNaN(num)) {
      num = 0;
    }
    const numString = num.toString();
    const attributes = {};
    const formatted = (0, _formatter.number)(num);
    if (formatted !== numString) {
      attributes.title = numString;
    }
    return (0, _virtualDom.h)("span.number", {
      className: opts.className,
      attributes
    }, formatted);
  }
});
define("discourse/widgets/connector", ["exports", "@ember/application", "@ember/runloop"], function (_exports, _application, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"@ember/runloop"eaimeta@70e063a35619d71f
  class Connector {
    constructor(widget, opts) {
      this.widget = widget;
      this.opts = opts;
    }
    init() {
      const elem = document.createElement("div");
      elem.classList.add("widget-connector");
      const {
        opts,
        widget
      } = this;
      (0, _runloop.next)(() => {
        const mounted = widget._findView();
        if (opts.component) {
          const component = (0, _application.getOwner)(mounted).factoryFor("component:connector-container").create({
            layoutName: `components/${opts.component}`,
            model: widget.findAncestorModel()
          });
          mounted._connected.push(component);
          component.renderer.appendTo(component, elem);
        }
      });
      return elem;
    }
    update() {}
  }
  _exports.default = Connector;
  Connector.prototype.type = "Widget";
});
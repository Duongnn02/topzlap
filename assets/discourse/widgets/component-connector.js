define("discourse/widgets/component-connector", ["exports", "@ember/application", "@ember/runloop"], function (_exports, _application, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/application",0,"@ember/runloop"eaimeta@70e063a35619d71f
  class ComponentConnector {
    constructor(widget, componentName, opts, trackedProperties) {
      let {
        applyStyle = true
      } = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      this.widget = widget;
      this.opts = opts;
      this.componentName = componentName;
      this.trackedProperties = trackedProperties || [];
      this.applyStyle = applyStyle;
      this._component = null;
    }
    init() {
      const elem = document.createElement("div");
      if (this.applyStyle) {
        elem.style.display = "inline-flex";
      }
      elem.className = "widget-component-connector";
      this.elem = elem;
      (0, _runloop.scheduleOnce)("afterRender", this, this.connectComponent);
      return this.elem;
    }
    destroy() {
      this._component?.destroy();
    }
    update(prev) {
      // mutated external properties might not correctly update the underlying component
      // in this case we can define trackedProperties, if different from previous
      // state we will re-init the whole component, be careful when using this
      // to not track a property which would be updated too often (on scroll for example)
      let shouldInit = false;
      this.trackedProperties.forEach(prop => {
        if (prev.opts[prop] !== this.opts[prop]) {
          shouldInit = true;
        }
      });
      if (shouldInit) {
        return this.init();
      }
      return null;
    }
    connectComponent() {
      const {
        elem,
        opts,
        widget,
        componentName
      } = this;
      const mounted = widget._findView();
      const component = (0, _application.getOwner)(mounted).factoryFor(`component:${componentName}`).create(opts);

      // component connector is not triggering didReceiveAttrs
      // we force it for selectKit components
      if (component.selectKit) {
        component.didReceiveAttrs();
      }
      mounted._connected.push(component);
      component.renderer.appendTo(component, elem);
      this._component = component;
    }
  }
  _exports.default = ComponentConnector;
  ComponentConnector.prototype.type = "Widget";
});
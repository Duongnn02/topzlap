define("discourse/widgets/render-glimmer", ["exports", "@ember/component/template-only", "@ember/component", "@glimmer/tracking", "@ember/debug", "discourse/widgets/widget"], function (_exports, _templateOnly, _component, _tracking, _debug, _widget) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.registerWidgetShim = registerWidgetShim;
  0; //eaimeta@70e063a35619d71f0,"@ember/component/template-only",0,"@ember/component",0,"@glimmer/tracking",0,"@ember/debug",0,"discourse/widgets/widget"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  /*
  
  This class allows you to render arbitrary Glimmer templates inside widgets.
  That glimmer template can include Classic and/or Glimmer components.
  
  Example usage:
  
  ```
  import { hbs } from "ember-cli-htmlbars";
  
  // NOTE: If your file is already importing the `hbs` helper from "discourse/widgets/hbs-compiler"
  // you'll need to rename that import to `import widgetHbs from "discourse/widgets/hbs-compiler"`
  // before adding the `ember-cli-htmlbars` import.
  
  ...
  
  // (inside an existing widget)
  html(){
    return [
      new RenderGlimmer(
        this,
        "div.my-wrapper-class",
        hbs`<MyComponent @arg1={{@data.arg1}} />`,
        {
          arg1: "some argument value"
        }
      ),
    ]
  }
  ```
  
  You can also include function references in the `data` object, and use them as actions within the Ember component.
  You will need to `bind` the function to ensure it maintains a reference to the widget, and you'll need to manually
  call `this.scheduleRerender()` after making any changes to widget state (the normal widget auto-rerendering does not apply).
  
  Note that the @bind decorator will only work if you're using class-based Widget syntax. When using createWidget, you'll need to
  call `.bind(this)` manually when passing the function to RenderGlimmer.
  
  For example:
  ```
  createWidget("my-widget", {
    tagName: "div",
    buildKey: () => `my-widget`,
  
    defaultState() {
      return { counter: 0 };
    },
  
    html(args, state){
      return [
        new RenderGlimmer(
          this,
          "div.my-wrapper-class",
          hbs`<MyComponent @counter={{@data.counter}} @incrementCounter={{@data.incrementCounter}} />`,
          {
            counter: state.counter,
            incrementCounter: this.incrementCounter.bind(this),
          }
        ),
      ]
    },
  
    incrementCounter() {
      this.state.counter++;
      this.scheduleRerender();
    },
  });
  ```
  
  */

  class RenderGlimmer {
    /**
     * Create a RenderGlimmer instance
     * @param widget - the widget instance which is rendering this content
     * @param renderInto - a string describing a new wrapper element (e.g. `div.my-class`),
     *  or an existing HTML element to append content into.
     * @param template - a glimmer template compiled via ember-cli-htmlbars
     * @param data - will be made available at `@data` in your template
     */
    constructor(widget, renderInto, template, data) {
      (false && !(template.name === "factory") && (0, _debug.assert)("`template` should be a template compiled via `ember-cli-htmlbars`", template.name === "factory"));
      this.renderInto = renderInto;
      if (widget) {
        this.widget = widget;
      }
      this.template = template;
      this.data = data;
    }
    init() {
      if (this.renderInto instanceof Element) {
        this.element = this.renderInto;
      } else {
        const [type, ...classNames] = this.renderInto.split(".");
        this.element = document.createElement(type);
        this.element.classList.add(...classNames);
      }
      this.connectComponent();
      return this.element;
    }
    destroy() {
      if (this._componentInfo) {
        this.parentMountWidgetComponent.unmountChildComponent(this._componentInfo);
      }
    }
    update(prev) {
      if (prev.template.__id !== this.template.__id || prev.renderInto !== this.renderInto) {
        // Totally different component, but the widget framework guessed it was the
        // same widget. Destroy old component and re-init the new one.
        prev.destroy();
        return this.init();
      }
      this._componentInfo = prev._componentInfo;
      if (prev.data !== this.data) {
        this._componentInfo.data = this.data;
      }
      return null;
    }
    connectComponent() {
      var _obj, _init;
      const {
        element,
        template
      } = this;
      const component = (0, _templateOnly.default)();
      component.name = "Widgets/RenderGlimmer";
      (0, _component.setComponentTemplate)(template, component);
      this._componentInfo = (_obj = {
        element,
        component,
        data: this.data
      }, (_applyDecoratedDescriptor(_obj, "data", [_tracking.tracked], (_init = Object.getOwnPropertyDescriptor(_obj, "data"), _init = _init ? _init.value : undefined, {
        enumerable: true,
        configurable: true,
        writable: true,
        initializer: function () {
          return _init;
        }
      }), _obj)), _obj);
      this.parentMountWidgetComponent.mountChildComponent(this._componentInfo);
    }
    get parentMountWidgetComponent() {
      return this.widget?._findView() || this._emberView;
    }
  }
  _exports.default = RenderGlimmer;
  RenderGlimmer.prototype.type = "Widget";

  /**
   * Define a widget shim which renders a Glimmer template. Designed for incrementally migrating
   * a widget-based UI to Glimmer. Widget attrs will be made available to your template at `@data`.
   * For more details, see documentation for the RenderGlimmer class.
   * @param name - the widget's name (which can then be used in `.attach` elsewhere)
   * @param tagName - a string describing a new wrapper element (e.g. `div.my-class`)
   * @param template - a glimmer template compiled via ember-cli-htmlbars
   */
  function registerWidgetShim(name, tagName, template) {
    const RenderGlimmerShim = class MyClass extends RenderGlimmer {
      constructor(attrs) {
        super(null, tagName, template, attrs);
        return this;
      }
      get widget() {
        return this.parentWidget;
      }
      didRenderWidget() {}
      willRerenderWidget() {}
    };
    (0, _widget.createWidgetFrom)(RenderGlimmerShim, name, {});
  }
});
define("discourse/widgets/widget", ["exports", "discourse/widgets/hooks", "discourse/widgets/decorator-helper", "I18n", "rsvp", "discourse-common/lib/object", "@ember/object", "virtual-dom", "discourse-common/config/environment"], function (_exports, _hooks, _decoratorHelper, _I18n, _rsvp, _object, _object2, _virtualDom, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.applyDecorators = applyDecorators;
  _exports.changeSetting = changeSetting;
  _exports.createWidget = createWidget;
  _exports.createWidgetFrom = createWidgetFrom;
  _exports.decorateWidget = decorateWidget;
  _exports.default = void 0;
  _exports.deleteFromRegistry = deleteFromRegistry;
  _exports.queryRegistry = queryRegistry;
  _exports.reopenWidget = reopenWidget;
  _exports.resetDecorators = resetDecorators;
  _exports.traverseCustomWidgets = traverseCustomWidgets;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/hooks",0,"discourse/widgets/decorator-helper",0,"I18n",0,"rsvp",0,"discourse-common/lib/object",0,"@ember/object",0,"virtual-dom",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  const _registry = {};
  function queryRegistry(name) {
    return _registry[name];
  }
  function deleteFromRegistry(name) {
    return delete _registry[name];
  }
  const _decorators = {};
  function decorateWidget(widgetName, cb) {
    _decorators[widgetName] = _decorators[widgetName] || [];
    _decorators[widgetName].push(cb);
  }
  function traverseCustomWidgets(tree, callback) {
    if (!tree) {
      return;
    }
    if (tree.__type === "CustomWidget") {
      callback(tree);
    }
    (tree.children || (tree.vnode ? tree.vnode.children : [])).forEach(node => {
      traverseCustomWidgets(node, callback);
    });
  }
  function applyDecorators(widget, type, attrs, state) {
    const decorators = _decorators[`${widget.name}:${type}`] || [];
    if (decorators.length) {
      const helper = new _decoratorHelper.default(widget, attrs, state);
      return decorators.map(d => d(helper));
    }
    return [];
  }
  function resetDecorators() {
    Object.keys(_decorators).forEach(key => delete _decorators[key]);
  }
  const _customSettings = {};
  function changeSetting(widgetName, settingName, newValue) {
    _customSettings[widgetName] = _customSettings[widgetName] || {};
    _customSettings[widgetName][settingName] = newValue;
  }
  function createWidgetFrom(base, name, opts) {
    const result = class CustomWidget extends base {};

    // todo this shouldn't been needed anymore once we don't transpile for IE anymore
    // see: https://discuss.emberjs.com/t/constructor-name-behaves-differently-in-dev-and-prod-builds-for-models-defined-with-the-es6-class-syntax/15572/6
    // once done, we can just check on constructor.name
    result.prototype.__type = "CustomWidget";
    if (name) {
      _registry[name] = result;
    }
    opts.name = name;
    if (opts.template) {
      opts.html = opts.template;
    }
    Object.keys(opts).forEach(k => result.prototype[k] = opts[k]);
    return result;
  }
  function createWidget(name, opts) {
    return createWidgetFrom(Widget, name, opts);
  }
  function reopenWidget(name, opts) {
    let existing = _registry[name];
    if (!existing) {
      // eslint-disable-next-line no-console
      console.error(`Could not find widget ${name} in registry`);
      return;
    }
    if (opts.template) {
      opts.html = opts.template;
    }
    Object.keys(opts).forEach(k => {
      let old = existing.prototype[k];
      if (old instanceof Function) {
        // Add support for `this._super()` to reopened widgets if the prototype exists in the
        // base object
        existing.prototype[k] = function () {
          var _this = this;
          let ctx = Object.create(this);
          ctx._super = function () {
            for (var _len2 = arguments.length, superArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              superArgs[_key2] = arguments[_key2];
            }
            return old.apply(_this, superArgs);
          };
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return opts[k].apply(ctx, args);
        };
      } else {
        existing.prototype[k] = opts[k];
      }
    });
    return existing;
  }
  class Widget {
    constructor(attrs, register, opts) {
      opts = opts || {};
      this.attrs = attrs || {};
      this.mergeState = opts.state;
      this.model = opts.model;
      this.register = register;
      this.dirtyKeys = opts.dirtyKeys;
      register.deprecateContainer(this);
      this.key = this.buildKey ? this.buildKey(attrs) : null;
      this.site = register.lookup("service:site");
      this.siteSettings = register.lookup("service:site-settings");
      this.currentUser = register.lookup("service:current-user");
      this.capabilities = register.lookup("service:capabilities");
      this.store = register.lookup("service:store");
      this.appEvents = register.lookup("service:app-events");
      this.keyValueStore = register.lookup("service:key-value-store");

      // We can inject services into widgets by passing a `services` parameter on creation
      (this.services || []).forEach(s => {
        this[s] = register.lookup(`service:${s}`);
      });
      this.init(this.attrs);
      if (this.name) {
        const custom = _customSettings[this.name];
        if (custom) {
          Object.keys(custom).forEach(k => this.settings[k] = custom[k]);
        }
      }
    }
    transform() {
      return {};
    }
    defaultState() {
      return {};
    }
    init() {}
    destroy() {}
    get(propertyPath) {
      return (0, _object2.get)(this, propertyPath);
    }
    render(prev) {
      const {
        dirtyKeys
      } = this;
      if (prev && prev.key && prev.key === this.key) {
        this.state = prev.state;
      } else {
        // Helps debug widgets
        this.state = this.defaultState(this.attrs, this.state);
        if (!(0, _environment.isProduction)()) {
          if (typeof this.state !== "object") {
            throw new Error(`defaultState must return an object`);
          } else if (Object.keys(this.state).length > 0 && !this.key) {
            throw new Error(`you need a key when using state in ${this.name}`);
          }
        }
      }

      // Sometimes we pass state down from the parent
      if (this.mergeState) {
        this.state = (0, _object.deepMerge)(this.state, this.mergeState);
      }
      if (prev) {
        const dirtyOpts = dirtyKeys.optionsFor(prev.key);
        if (prev.shadowTree) {
          this.shadowTree = true;
          if (!dirtyOpts.dirty && !dirtyKeys.allDirty()) {
            return prev.vnode;
          }
        }
        if (prev.key) {
          dirtyKeys.renderedKey(prev.key);
        }
        const refreshAction = dirtyOpts.onRefresh;
        if (refreshAction) {
          this.sendWidgetAction(refreshAction, dirtyOpts.refreshArg);
        }
      }
      return this.draw(_virtualDom.h, this.attrs, this.state);
    }
    _findAncestorWithProperty(property) {
      let widget = this;
      while (widget) {
        const value = widget[property];
        if (value) {
          return widget;
        }
        widget = widget.parentWidget;
      }
    }
    _findView() {
      const widget = this._findAncestorWithProperty("_emberView");
      if (widget) {
        return widget._emberView;
      }
    }
    lookupWidgetClass(widgetName) {
      let WidgetClass = _registry[widgetName];
      if (WidgetClass) {
        return WidgetClass;
      }
      if (!this.register) {
        // eslint-disable-next-line no-console
        console.error("couldn't find register");
        return null;
      }
      WidgetClass = this.register.lookupFactory(`widget:${widgetName}`);
      if (WidgetClass && WidgetClass.class) {
        return WidgetClass.class;
      }
      return null;
    }
    attach(widgetName, attrs, opts) {
      let otherOpts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      let WidgetClass = this.lookupWidgetClass(widgetName);
      if (!WidgetClass && otherOpts.fallbackWidgetName) {
        WidgetClass = this.lookupWidgetClass(otherOpts.fallbackWidgetName);
      }
      if (WidgetClass) {
        const result = new WidgetClass(attrs, this.register, opts);
        result.parentWidget = this;
        result.dirtyKeys = this.dirtyKeys;
        if (otherOpts.tagName) {
          result.tagName = otherOpts.tagName;
        }
        return result;
      } else {
        throw new Error(`Couldn't find ${widgetName} or fallback ${otherOpts.fallbackWidgetName}`);
      }
    }
    didRenderWidget() {}
    willRerenderWidget() {}
    scheduleRerender() {
      let widget = this;
      while (widget) {
        if (widget.shadowTree) {
          this.dirtyKeys.keyDirty(widget.key);
        }
        const rerenderable = widget._rerenderable;
        if (rerenderable) {
          return rerenderable.queueRerender();
        }
        widget = widget.parentWidget;
      }
    }
    _sendComponentAction(name, param) {
      let promise;
      const view = this._findView();
      if (view) {
        const method = view.get(name);
        if (!method) {
          // eslint-disable-next-line no-console
          console.warn(`${name} not found`);
          return;
        }
        if (typeof method === "string") {
          view[method](param);
          promise = _rsvp.Promise.resolve();
        } else {
          const target = view.get("target") || view;
          promise = method.call(target, param);
          if (!promise || !promise.then) {
            promise = _rsvp.Promise.resolve(promise);
          }
        }
      }
      return this.rerenderResult(() => promise);
    }
    findAncestorModel() {
      const modelWidget = this._findAncestorWithProperty("model");
      if (modelWidget) {
        return modelWidget.model;
      }
    }
    rerenderResult(fn) {
      this.scheduleRerender();
      const result = fn();
      // re-render after any promises complete, too!
      if (result && result.then) {
        return result.then(() => this.scheduleRerender());
      }
      return result;
    }
    sendWidgetEvent(name, attrs) {
      const methodName = `${name}Event`;
      return this.rerenderResult(() => {
        const widget = this._findAncestorWithProperty(methodName);
        if (widget) {
          return widget[methodName](attrs);
        }
      });
    }
    callWidgetFunction(name, param) {
      const widget = this._findAncestorWithProperty(name);
      if (widget) {
        return widget[name].call(widget, param);
      }
    }
    sendWidgetAction(name, param) {
      return this.rerenderResult(() => {
        const widget = this._findAncestorWithProperty(name);
        if (widget) {
          return widget[name].call(widget, param);
        }
        return this._sendComponentAction(name, param || this.findAncestorModel());
      });
    }
    html() {}
    draw(builder, attrs, state) {
      const properties = {};
      if (this.buildClasses) {
        let classes = this.buildClasses(attrs, state) || [];
        if (!Array.isArray(classes)) {
          classes = [classes];
        }
        const customClasses = applyDecorators(this, "classNames", attrs, state);
        if (customClasses && customClasses.length) {
          classes = classes.concat(customClasses);
        }
        if (classes.length) {
          properties.className = classes.join(" ");
        }
      }
      if (this.buildId) {
        properties.id = this.buildId(attrs);
      }
      if (this.buildAttributes) {
        properties.attributes = this.buildAttributes(attrs);
      }
      if (this.keyUp) {
        properties["widget-key-up"] = new _hooks.WidgetKeyUpHook(this);
      }
      if (this.keyDown) {
        properties["widget-key-down"] = new _hooks.WidgetKeyDownHook(this);
      }
      if (this.clickOutside) {
        properties["widget-click-outside"] = new _hooks.WidgetClickOutsideHook(this);
      }
      if (this.click) {
        properties["widget-click"] = new _hooks.WidgetClickHook(this);
      }
      if (this.doubleClick) {
        properties["widget-double-click"] = new _hooks.WidgetDoubleClickHook(this);
      }
      if (this.mouseDownOutside) {
        properties["widget-mouse-down-outside"] = new _hooks.WidgetMouseDownOutsideHook(this);
      }
      if (this.drag) {
        properties["widget-drag"] = new _hooks.WidgetDragHook(this);
      }
      if (this.input) {
        properties["widget-input"] = new _hooks.WidgetInputHook(this);
      }
      if (this.change) {
        properties["widget-change"] = new _hooks.WidgetChangeHook(this);
      }
      if (this.mouseDown) {
        properties["widget-mouse-down"] = new _hooks.WidgetMouseDownHook(this);
      }
      if (this.mouseUp) {
        properties["widget-mouse-up"] = new _hooks.WidgetMouseUpHook(this);
      }
      if (this.mouseMove) {
        properties["widget-mouse-move"] = new _hooks.WidgetMouseMoveHook(this);
      }
      if (this.mouseOver) {
        properties["widget-mouse-over"] = new _hooks.WidgetMouseOverHook(this);
      }
      if (this.mouseOut) {
        properties["widget-mouse-out"] = new _hooks.WidgetMouseOutHook(this);
      }
      if (this.touchStart) {
        properties["widget-touch-start"] = new _hooks.WidgetTouchStartHook(this);
      }
      if (this.touchEnd) {
        properties["widget-touch-end"] = new _hooks.WidgetTouchEndHook(this);
      }
      const attributes = properties["attributes"] || {};
      properties.attributes = attributes;
      if (this.title) {
        if (typeof this.title === "function") {
          attributes.title = this.title(attrs, state);
        } else {
          attributes.title = _I18n.default.t(this.title);
        }
      }
      this.transformed = this.transform(this.attrs, this.state);
      let contents = this.html(attrs, state);
      if (this.name) {
        const beforeContents = applyDecorators(this, "before", attrs, state) || [];
        const afterContents = applyDecorators(this, "after", attrs, state) || [];
        contents = beforeContents.concat(contents).concat(afterContents);
      }
      return (0, _virtualDom.h)(this.tagName || "div", properties, contents);
    }
  }
  _exports.default = Widget;
  Widget.prototype.type = "Thunk";
});
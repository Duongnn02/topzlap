define("discourse/components/mount-widget", ["exports", "@ember/component", "@ember/template-factory", "@ember/runloop", "virtual-dom", "discourse/widgets/widget", "discourse/lib/dirty-keys", "discourse/widgets/hooks", "@ember/string", "discourse-common/lib/get-owner", "@ember/array/proxy"], function (_exports, _component, _templateFactory, _runloop, _virtualDom, _widget, _dirtyKeys, _hooks, _string, _getOwner, _proxy) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addWidgetCleanCallback = addWidgetCleanCallback;
  _exports.default = void 0;
  _exports.resetWidgetCleanCallbacks = resetWidgetCleanCallbacks;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/runloop",0,"virtual-dom",0,"discourse/widgets/widget",0,"@ember/component",0,"discourse/lib/dirty-keys",0,"discourse/widgets/hooks",0,"@ember/string",0,"discourse-common/lib/get-owner",0,"@ember/array/proxy"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each this._childComponents as |info|}}
    {{#in-element info.element insertBefore=null}}
      <info.component @data={{info.data}} />
    {{/in-element}}
  {{/each}}
  */
  {
    "id": "PIUkwqeT",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,0,[\"_childComponents\"]]],null]],null],null,[[[40,[[[1,\"    \"],[8,[30,1,[\"component\"]],null,[[\"@data\"],[[30,1,[\"data\"]]]],null],[1,\"\\n\"]],[]],\"%cursor:0%\",[28,[37,3],[[30,1,[\"element\"]]],null],null]],[1]],null]],[\"info\"],false,[\"each\",\"-track-array\",\"in-element\",\"-in-el-null\"]]",
    "moduleName": "discourse/components/mount-widget.hbs",
    "isStrictMode": false
  });
  let _cleanCallbacks = {};
  function addWidgetCleanCallback(widgetName, fn) {
    _cleanCallbacks[widgetName] = _cleanCallbacks[widgetName] || [];
    _cleanCallbacks[widgetName].push(fn);
  }
  function resetWidgetCleanCallbacks() {
    _cleanCallbacks = {};
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    _tree: null,
    _rootNode: null,
    _timeout: null,
    _widgetClass: null,
    _renderCallback: null,
    _childEvents: null,
    _dispatched: null,
    dirtyKeys: null,
    init() {
      this._super(...arguments);
      const name = this.widget;
      this.register = (0, _getOwner.getRegister)(this);
      this._widgetClass = (0, _widget.queryRegistry)(name) || this.register.lookupFactory(`widget:${name}`);
      if (this._widgetClass?.class) {
        this._widgetClass = this._widgetClass.class;
      }
      if (!this._widgetClass) {
        // eslint-disable-next-line no-console
        console.error(`Error: Could not find widget: ${name}`);
      }
      this._childEvents = [];
      this._connected = [];
      this._childComponents = _proxy.default.create({
        content: []
      });
      this._dispatched = [];
      this.dirtyKeys = new _dirtyKeys.default(name);
    },
    didInsertElement() {
      _hooks.WidgetClickHook.setupDocumentCallback();
      this._rootNode = document.createElement("div");
      this.element.appendChild(this._rootNode);
      this._timeout = (0, _runloop.scheduleOnce)("render", this, this.rerenderWidget);
    },
    willClearRender() {
      const callbacks = _cleanCallbacks[this.widget];
      if (callbacks) {
        callbacks.forEach(cb => cb(this._tree));
      }
      this._connected.forEach(v => v.destroy());
      this._connected.length = 0;
      (0, _widget.traverseCustomWidgets)(this._tree, w => w.destroy());
      this._rootNode = (0, _virtualDom.patch)(this._rootNode, (0, _virtualDom.diff)(this._tree, null));
      this._tree = null;
    },
    willDestroyElement() {
      this._dispatched.forEach(evt => {
        const [eventName, caller] = evt;
        this.appEvents.off(eventName, this, caller);
      });
      (0, _runloop.cancel)(this._timeout);
    },
    afterRender() {},
    beforePatch() {},
    afterPatch() {},
    eventDispatched(eventName, key, refreshArg) {
      key = typeof key === "function" ? key(refreshArg) : key;
      const onRefresh = (0, _string.camelize)(eventName.replace(/:/, "-"));
      this.dirtyKeys.keyDirty(key, {
        onRefresh,
        refreshArg
      });
      this.queueRerender();
    },
    dispatch(eventName, key) {
      this._childEvents.push(eventName);
      const caller = refreshArg => this.eventDispatched(eventName, key, refreshArg);
      this._dispatched.push([eventName, caller]);
      this.appEvents.on(eventName, this, caller);
    },
    queueRerender(callback) {
      if (callback && !this._renderCallback) {
        this._renderCallback = callback;
      }
      (0, _runloop.scheduleOnce)("render", this, this.rerenderWidget);
    },
    buildArgs() {},
    rerenderWidget() {
      (0, _runloop.cancel)(this._timeout);
      if (this._rootNode) {
        if (!this._widgetClass) {
          return;
        }
        const t0 = Date.now();
        const args = this.args || this.buildArgs();
        const opts = {
          model: this.model,
          dirtyKeys: this.dirtyKeys
        };
        const newTree = new this._widgetClass(args, this.register, opts);
        newTree._rerenderable = this;
        newTree._emberView = this;
        const patches = (0, _virtualDom.diff)(this._tree || this._rootNode, newTree);
        (0, _widget.traverseCustomWidgets)(this._tree, w => w.willRerenderWidget());
        this.beforePatch();
        this._rootNode = (0, _virtualDom.patch)(this._rootNode, patches);
        this.afterPatch();
        this._tree = newTree;
        (0, _widget.traverseCustomWidgets)(newTree, w => w.didRenderWidget());
        if (this._renderCallback) {
          this._renderCallback();
          this._renderCallback = null;
        }
        this.afterRender();
        this.dirtyKeys.renderedKey("*");
        if (this.profileWidget) {
          // eslint-disable-next-line no-console
          console.log(Date.now() - t0);
        }
      }
    },
    mountChildComponent(info) {
      this._childComponents.pushObject(info);
    },
    unmountChildComponent(info) {
      this._childComponents.removeObject(info);
    }
  }));
  _exports.default = _default;
});
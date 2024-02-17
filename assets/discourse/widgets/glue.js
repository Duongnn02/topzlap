define("discourse/widgets/glue", ["exports", "@ember/runloop", "virtual-dom", "discourse/widgets/widget", "discourse/lib/dirty-keys", "discourse-common/config/environment"], function (_exports, _runloop, _virtualDom, _widget, _dirtyKeys, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"virtual-dom",0,"discourse/widgets/widget",0,"discourse/lib/dirty-keys",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  class WidgetGlue {
    constructor(name, register, attrs) {
      this._tree = null;
      this._rootNode = null;
      this.register = register;
      this.attrs = attrs;
      this._timeout = null;
      this.dirtyKeys = new _dirtyKeys.default(name);
      this._widgetClass = (0, _widget.queryRegistry)(name) || this.register.lookupFactory(`widget:${name}`);
      if (!this._widgetClass) {
        // eslint-disable-next-line no-console
        console.error(`Error: Could not find widget: ${name}`);
      }
    }
    appendTo(elem) {
      this._rootNode = elem;
      this.queueRerender();
    }
    queueRerender() {
      this._timeout = (0, _runloop.scheduleOnce)("render", this, this.rerenderWidget);
    }
    rerenderWidget() {
      (0, _runloop.cancel)(this._timeout);

      // in test mode return early if store cannot be found
      if ((0, _environment.isTesting)()) {
        try {
          this.register.lookup("service:store");
        } catch (e) {
          return;
        }
      }
      const newTree = new this._widgetClass(this.attrs, this.register, {
        dirtyKeys: this.dirtyKeys
      });
      const patches = (0, _virtualDom.diff)(this._tree || this._rootNode, newTree);
      (0, _widget.traverseCustomWidgets)(this._tree, w => w.willRerenderWidget());
      newTree._rerenderable = this;
      this._rootNode = (0, _virtualDom.patch)(this._rootNode, patches);
      this._tree = newTree;
      (0, _widget.traverseCustomWidgets)(newTree, w => w.didRenderWidget());
    }
    cleanUp() {
      (0, _widget.traverseCustomWidgets)(this._tree, w => w.destroy());
      (0, _runloop.cancel)(this._timeout);
      this._rootNode = (0, _virtualDom.patch)(this._rootNode, (0, _virtualDom.diff)(this._tree, null));
      this._tree = null;
    }
  }
  _exports.default = WidgetGlue;
});
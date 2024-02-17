define("discourse/components/plugin-connector", ["exports", "@ember/object", "@ember/component", "discourse-common/utils/decorators", "discourse/lib/plugin-connectors", "discourse-common/lib/deprecated"], function (_exports, _object, _component, _decorators2, _pluginConnectors, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addPluginOutletDecorator = addPluginOutletDecorator;
  _exports.default = void 0;
  _exports.resetDecorators = resetDecorators;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/component",0,"discourse-common/utils/decorators",0,"discourse/lib/plugin-connectors",0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  let _decorators = {};

  // Don't call this directly: use `plugin-api/decoratePluginOutlet`
  function addPluginOutletDecorator(outletName, callback) {
    _decorators[outletName] = _decorators[outletName] || [];
    _decorators[outletName].push(callback);
  }
  function resetDecorators() {
    _decorators = {};
  }
  var _default = _component.default.extend((_obj = {
    init() {
      this._super(...arguments);
      const args = this.args || {};
      Object.keys(args).forEach(key => {
        (0, _object.defineProperty)(this, key, (0, _object.computed)("args", () => (this.args || {})[key]));
      });
      const deprecatedArgs = this.deprecatedArgs || {};
      Object.keys(deprecatedArgs).forEach(key => {
        (0, _object.defineProperty)(this, key, (0, _object.computed)("deprecatedArgs", () => {
          (0, _deprecated.default)(`The ${key} property is deprecated, but is being used in ${this.layoutName}`, {
            id: "discourse.plugin-connector.deprecated-arg"
          });
          return (this.deprecatedArgs || {})[key];
        }));
      });
      const connectorClass = this.connector.connectorClass;
      this.set("actions", connectorClass?.actions);
      if (this.actions) {
        for (const [name, action] of Object.entries(this.actions)) {
          this.set(name, action.bind(this));
        }
      }
      const merged = (0, _pluginConnectors.buildArgsWithDeprecations)(args, deprecatedArgs);
      connectorClass?.setupComponent?.call(this, merged, this);
    },
    didReceiveAttrs() {
      this._super(...arguments);
      this._decoratePluginOutlets();
    },
    _decoratePluginOutlets() {
      (_decorators[this.connector.outletName] || []).forEach(dec => dec(this.element, this.args));
    },
    willDestroyElement() {
      this._super(...arguments);
      const connectorClass = this.connector.connectorClass;
      connectorClass?.teardownComponent?.call(this, this);
    },
    send(name) {
      const connectorClass = this.connector.connectorClass;
      const action = connectorClass?.actions?.[name];
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      return action ? action.call(this, ...args) : this._super(name, ...args);
    }
  }, (_applyDecoratedDescriptor(_obj, "_decoratePluginOutlets", [_decorators2.afterRender], Object.getOwnPropertyDescriptor(_obj, "_decoratePluginOutlets"), _obj)), _obj));
  _exports.default = _default;
});
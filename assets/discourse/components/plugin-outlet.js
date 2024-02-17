define("discourse/components/plugin-outlet", ["exports", "@embroider/macros/es-compat", "@ember/component", "@ember/template-factory", "discourse/components/glimmer-component-with-deprecated-parent-view", "discourse/lib/plugin-connectors", "discourse-common/lib/helpers", "discourse-common/lib/deprecated", "@ember/object", "@glimmer/tracking"], function (_exports, _esCompat, _component, _templateFactory, _glimmerComponentWithDeprecatedParentView, _pluginConnectors, _helpers, _deprecated, _object, _tracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/components/glimmer-component-with-deprecated-parent-view",0,"@ember/component",0,"discourse/lib/plugin-connectors",0,"discourse-common/lib/helpers",0,"discourse-common/lib/deprecated",0,"@ember/object",0,"@glimmer/tracking",0,"ember-cached-decorator-polyfill"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if @tagName}}
    {{!
      Older outlets have a wrapper tagName. RFC0389 proposes an interface for dynamic tag names, which we may want to use in future.
      But for now, this classic component wrapper takes care of the tagName.
    }}
    <this.wrapperComponent @tagName={{@tagName}}>
      {{#each this.connectors as |c|}}
        {{#if c.componentClass}}
          <c.componentClass @outletArgs={{this.outletArgsWithDeprecations}} />
        {{else if @defaultGlimmer}}
          <c.templateOnly @outletArgs={{this.outletArgsWithDeprecations}} />
        {{else}}
          <PluginConnector
            @connector={{c}}
            @args={{this.outletArgs}}
            @deprecatedArgs={{@deprecatedArgs}}
            @outletArgs={{this.outletArgsWithDeprecations}}
            @class={{c.classicClassNames}}
            @tagName={{or @connectorTagName ""}}
            @layout={{c.template}}
          />
        {{/if}}
      {{/each}}
    </this.wrapperComponent>
  {{else}}
    {{! The modern path: no wrapper element = no classic component }}
    {{#each this.connectors as |c|}}
      {{#if c.componentClass}}
        <c.componentClass @outletArgs={{this.outletArgsWithDeprecations}} />
      {{else if @defaultGlimmer}}
        <c.templateOnly @outletArgs={{this.outletArgsWithDeprecations}} />
      {{else}}
        <PluginConnector
          @connector={{c}}
          @args={{this.outletArgs}}
          @deprecatedArgs={{@deprecatedArgs}}
          @outletArgs={{this.outletArgsWithDeprecations}}
          @class={{c.classicClassNames}}
          @tagName={{or @connectorTagName ""}}
          @layout={{c.template}}
        />
      {{/if}}
    {{/each}}
  {{/if}}
  */
  {
    "id": "W3f9Lk6U",
    "block": "[[[41,[30,1],[[[1,\"  \"],[8,[30,0,[\"wrapperComponent\"]],null,[[\"@tagName\"],[[30,1]]],[[\"default\"],[[[[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"connectors\"]]],null]],null],null,[[[41,[30,2,[\"componentClass\"]],[[[1,\"        \"],[8,[30,2,[\"componentClass\"]],null,[[\"@outletArgs\"],[[30,0,[\"outletArgsWithDeprecations\"]]]],null],[1,\"\\n\"]],[]],[[[41,[30,3],[[[1,\"        \"],[8,[30,2,[\"templateOnly\"]],null,[[\"@outletArgs\"],[[30,0,[\"outletArgsWithDeprecations\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"        \"],[8,[39,3],null,[[\"@connector\",\"@args\",\"@deprecatedArgs\",\"@outletArgs\",\"@class\",\"@tagName\",\"@layout\"],[[30,2],[30,0,[\"outletArgs\"]],[30,4],[30,0,[\"outletArgsWithDeprecations\"]],[30,2,[\"classicClassNames\"]],[28,[37,4],[[30,5],\"\"],null],[30,2,[\"template\"]]]],null],[1,\"\\n      \"]],[]]]],[]]]],[2]],null],[1,\"  \"]],[]]]]],[1,\"\\n\"]],[]],[[[42,[28,[37,2],[[28,[37,2],[[30,0,[\"connectors\"]]],null]],null],null,[[[41,[30,6,[\"componentClass\"]],[[[1,\"      \"],[8,[30,6,[\"componentClass\"]],null,[[\"@outletArgs\"],[[30,0,[\"outletArgsWithDeprecations\"]]]],null],[1,\"\\n\"]],[]],[[[41,[30,3],[[[1,\"      \"],[8,[30,6,[\"templateOnly\"]],null,[[\"@outletArgs\"],[[30,0,[\"outletArgsWithDeprecations\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"      \"],[8,[39,3],null,[[\"@connector\",\"@args\",\"@deprecatedArgs\",\"@outletArgs\",\"@class\",\"@tagName\",\"@layout\"],[[30,6],[30,0,[\"outletArgs\"]],[30,4],[30,0,[\"outletArgsWithDeprecations\"]],[30,6,[\"classicClassNames\"]],[28,[37,4],[[30,5],\"\"],null],[30,6,[\"template\"]]]],null],[1,\"\\n    \"]],[]]]],[]]]],[6]],null]],[]]]],[\"@tagName\",\"c\",\"@defaultGlimmer\",\"@deprecatedArgs\",\"@connectorTagName\",\"c\"],false,[\"if\",\"each\",\"-track-array\",\"plugin-connector\",\"or\"]]",
    "moduleName": "discourse/components/plugin-outlet.hbs",
    "isStrictMode": false
  });
  let cached = (0, _esCompat.default)(require("ember-cached-decorator-polyfill")).cached;
  const PARENT_VIEW_DEPRECATION_MSG = "parentView should not be used within plugin outlets. Use the available outlet arguments, or inject a service which can provide the context you need.";
  const GET_DEPRECATION_MSG = "Plugin outlet context is no longer an EmberObject - using `get()` is deprecated.";
  const TAG_NAME_DEPRECATION_MSG = "The `tagName` argument to PluginOutlet is deprecated. If a wrapper element is required, define it manually around the outlet call.";
  const ARGS_DEPRECATION_MSG = "PluginOutlet arguments should now be passed using `@outletArgs=` instead of `@args=`";

  /**
     A plugin outlet is an extension point for templates where other templates can
     be inserted by plugins.
  
     ## Usage
  
     If your handlebars template has:
  
     ```handlebars
       <PluginOutlet @name="evil-trout" />
     ```
  
     Then any handlebars files you create in the `connectors/evil-trout` directory
     will automatically be appended. For example:
  
     plugins/hello/assets/javascripts/discourse/templates/connectors/evil-trout/hello.hbs
  
     With the contents:
  
     ```handlebars
       <b>Hello World</b>
     ```
  
     Will insert <b>Hello World</b> at that point in the template.
  
  **/
  let PluginOutletComponent = (_class = class PluginOutletComponent extends _glimmerComponentWithDeprecatedParentView.default {
    constructor() {
      const result = (super(...arguments), _defineProperty(this, "context", {
        ...(0, _helpers.helperContext)(),
        get parentView() {
          return this.parentView;
        },
        get() {
          (0, _deprecated.default)(GET_DEPRECATION_MSG, {
            id: "discourse.plugin-outlet-context-get"
          });
          return (0, _object.get)(this, ...arguments);
        }
      }), this);
      if (this.args.tagName) {
        (0, _deprecated.default)(`${TAG_NAME_DEPRECATION_MSG} (outlet: ${this.args.name})`, {
          id: "discourse.plugin-outlet-tag-name"
        });
      }
      if (this.args.args) {
        (0, _deprecated.default)(`${ARGS_DEPRECATION_MSG} (outlet: ${this.args.name})`, {
          id: "discourse.plugin-outlet-args"
        });
      }
      return result;
    }
    get connectors() {
      return (0, _pluginConnectors.renderedConnectorsFor)(this.args.name, this.outletArgsWithDeprecations, this.context);
    }

    // Traditionally, pluginOutlets had an argument named 'args'. However, that name is reserved
    // in recent versions of ember so we need to migrate to outletArgs
    get outletArgs() {
      return this.args.outletArgs || this.args.args || {};
    }
    get outletArgsWithDeprecations() {
      if (!this.args.deprecatedArgs) {
        return this.outletArgs;
      }
      return (0, _pluginConnectors.buildArgsWithDeprecations)(this.outletArgs, this.args.deprecatedArgs || {});
    }
    get parentView() {
      (0, _deprecated.default)(`${PARENT_VIEW_DEPRECATION_MSG} (outlet: ${this.args.name})`, {
        id: "discourse.plugin-outlet-parent-view"
      });
      return this._parentView;
    }
    set parentView(value) {
      this._parentView = value;
    }

    // Older plugin outlets have a `tagName` which we need to preserve for backwards-compatibility
    get wrapperComponent() {
      return PluginOutletWithTagNameWrapper;
    }
  }, (_applyDecoratedDescriptor(_class.prototype, "outletArgs", [cached], Object.getOwnPropertyDescriptor(_class.prototype, "outletArgs"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "outletArgsWithDeprecations", [cached], Object.getOwnPropertyDescriptor(_class.prototype, "outletArgsWithDeprecations"), _class.prototype)), _class);
  _exports.default = PluginOutletComponent;
  class PluginOutletWithTagNameWrapper extends _component.default {
    // Overridden parentView to make this wrapper 'transparent'
    // Calling this will trigger the deprecation notice in PluginOutletComponent
    get parentView() {
      return this._parentView.parentView;
    }
    set parentView(value) {
      this._parentView = value;
    }
  }
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, PluginOutletComponent);
});
define("discourse/app", ["exports", "discourse/global-compat", "@ember/application", "discourse-common/resolver", "discourse-common/config/environment", "discourse/lib/ember-events"], function (_exports, _globalCompat, _application, _resolver, _environment, _emberEvents) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.getAndClearUnhandledThemeErrors = getAndClearUnhandledThemeErrors;
  0; //eaimeta@70e063a35619d71f0,"discourse/global-compat",0,"@ember/application",0,"discourse-common/resolver",0,"discourse-common/config/environment",0,"discourse/lib/ember-events"eaimeta@70e063a35619d71f
  const _pluginCallbacks = [];
  let _unhandledThemeErrors = [];
  const Discourse = _application.default.extend({
    modulePrefix: "discourse",
    rootElement: "#main",
    customEvents: {
      paste: "paste"
    },
    Resolver: (0, _resolver.buildResolver)("discourse"),
    _prepareInitializer(moduleName) {
      const themeId = moduleThemeId(moduleName);
      let module = null;
      try {
        module = requirejs(moduleName, null, null, true);
        if (!module) {
          throw new Error(moduleName + " must export an initializer.");
        }
      } catch (error) {
        if (!themeId || (0, _environment.isTesting)()) {
          throw error;
        }
        fireThemeErrorEvent({
          themeId,
          error
        });
        return;
      }
      const init = module.default;
      const oldInitialize = init.initialize;
      init.initialize = app => {
        try {
          return oldInitialize.call(init, app.__container__, app);
        } catch (error) {
          if (!themeId || (0, _environment.isTesting)()) {
            throw error;
          }
          fireThemeErrorEvent({
            themeId,
            error
          });
        }
      };
      return init;
    },
    // Start up the Discourse application by running all the initializers we've defined.
    start() {
      document.querySelector("noscript")?.remove();

      // Rewire event handling to eliminate event delegation for better compat
      // between Glimmer and Classic components.
      (0, _emberEvents.normalizeEmberEventHandling)(this);
      if (Error.stackTraceLimit) {
        // We need Errors to have full stack traces for `lib/source-identifier`
        Error.stackTraceLimit = Infinity;
      }
      Object.keys(requirejs._eak_seen).forEach(key => {
        if (/\/pre\-initializers\//.test(key)) {
          const initializer = this._prepareInitializer(key);
          if (initializer) {
            this.initializer(initializer);
          }
        } else if (/\/(api\-)?initializers\//.test(key)) {
          const initializer = this._prepareInitializer(key);
          if (initializer) {
            this.instanceInitializer(initializer);
          }
        }
      });

      // Plugins that are registered via `<script>` tags.
      const withPluginApi = requirejs("discourse/lib/plugin-api").withPluginApi;
      let initCount = 0;
      _pluginCallbacks.forEach(cb => {
        this.instanceInitializer({
          name: `_discourse_plugin_${++initCount}`,
          after: "inject-objects",
          initialize: () => withPluginApi(cb.version, cb.code)
        });
      });
    },
    _registerPluginCode(version, code) {
      _pluginCallbacks.push({
        version,
        code
      });
    },
    ready() {
      performance.mark("discourse-ready");
      const event = new CustomEvent("discourse-ready");
      document.dispatchEvent(event);
    }
  });
  function moduleThemeId(moduleName) {
    const match = moduleName.match(/^discourse\/theme\-(\d+)\//);
    if (match) {
      return parseInt(match[1], 10);
    }
  }
  function fireThemeErrorEvent(_ref) {
    let {
      themeId,
      error
    } = _ref;
    const event = new CustomEvent("discourse-error", {
      cancelable: true,
      detail: {
        themeId,
        error
      }
    });
    const unhandled = document.dispatchEvent(event);
    if (unhandled) {
      _unhandledThemeErrors.push(event);
    }
  }
  function getAndClearUnhandledThemeErrors() {
    const copy = _unhandledThemeErrors;
    _unhandledThemeErrors = [];
    return copy;
  }
  var _default = Discourse;
  _exports.default = _default;
});
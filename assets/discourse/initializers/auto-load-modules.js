define("discourse/initializers/auto-load-modules", ["exports", "discourse-common/lib/helpers", "handlebars", "discourse-common/lib/raw-handlebars", "discourse-common/lib/raw-handlebars-helpers", "@ember/application"], function (_exports, _helpers, _handlebars, _rawHandlebars, _rawHandlebarsHelpers, _application) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.autoLoadModules = autoLoadModules;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers",0,"handlebars",0,"discourse-common/lib/raw-handlebars",0,"discourse-common/lib/raw-handlebars-helpers",0,"@ember/application"eaimeta@70e063a35619d71f
  function autoLoadModules(container, registry) {
    Object.keys(requirejs.entries).forEach(entry => {
      if (/\/helpers\//.test(entry) && !/-test/.test(entry)) {
        requirejs(entry, null, null, true);
      }
      if (/\/widgets\//.test(entry) && !/-test/.test(entry)) {
        requirejs(entry, null, null, true);
      }
    });
    let context = {
      siteSettings: container.lookup("service:site-settings"),
      keyValueStore: container.lookup("service:key-value-store"),
      capabilities: container.lookup("service:capabilities"),
      currentUser: container.lookup("service:current-user"),
      site: container.lookup("service:site"),
      session: container.lookup("service:session"),
      topicTrackingState: container.lookup("service:topic-tracking-state"),
      registry
    };
    (0, _application.setOwner)(context, container);
    (0, _helpers.createHelperContext)(context);
    (0, _helpers.registerHelpers)(registry);
    (0, _rawHandlebarsHelpers.registerRawHelpers)(_rawHandlebars.default, _handlebars.default);
  }
  var _default = {
    name: "auto-load-modules",
    after: "inject-objects",
    initialize: container => autoLoadModules(container, container.registry)
  };
  _exports.default = _default;
});
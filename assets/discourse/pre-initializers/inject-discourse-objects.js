define("discourse/pre-initializers/inject-discourse-objects", ["exports", "discourse/models/topic-tracking-state", "discourse/lib/discourse-location", "discourse/models/session", "discourse/models/site", "discourse/models/user"], function (_exports, _topicTrackingState, _discourseLocation, _session, _site, _user) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.injectServiceIntoService = injectServiceIntoService;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/topic-tracking-state",0,"discourse/lib/discourse-location",0,"discourse/models/session",0,"discourse/models/site",0,"discourse/models/user"eaimeta@70e063a35619d71f
  const ALL_TARGETS = ["controller", "component", "route", "model", "adapter"];
  function injectServiceIntoService(_ref) {
    let {
      app,
      property,
      specifier
    } = _ref;
    // app.inject doesn't allow implicit injection of services into services.
    // However, we need to do it in order to convert our old service-like objects
    // into true services, without breaking existing implicit injections.
    // This hack will be removed when we remove implicit injections for the Ember 4.0 update.

    // Supplying a specific injection with the same property name prevents the infinite
    // which would be caused by injecting a service into itself
    app.register("discourse:null", null, {
      instantiate: false
    });
    app.inject(specifier, property, "discourse:null");

    // Bypass the validation in `app.inject` by adding directly to the array
    app.__registry__._typeInjections["service"] ??= [];
    app.__registry__._typeInjections["service"].push({
      property,
      specifier
    });
  }
  var _default = {
    name: "inject-discourse-objects",
    after: "discourse-bootstrap",
    initialize(container, app) {
      const siteSettings = container.lookup("service:site-settings");
      const currentUser = _user.default.current();

      // We can't use a 'real' service factory (i.e. services/current-user.js) because we need
      // to register a null value for anon
      app.register("service:current-user", currentUser, {
        instantiate: false
      });
      this.topicTrackingState = _topicTrackingState.default.create({
        messageBus: container.lookup("service:message-bus"),
        siteSettings,
        currentUser
      });
      app.register("service:topic-tracking-state", this.topicTrackingState, {
        instantiate: false
      });
      const site = _site.default.current();
      app.register("service:site", site, {
        instantiate: false
      });
      const session = _session.default.current();
      app.register("service:session", session, {
        instantiate: false
      });
      app.register("location:discourse-location", _discourseLocation.default);
      app.inject("controller", "capabilities", "service:capabilities");
      app.inject("component", "capabilities", "service:capabilities");
      ALL_TARGETS.forEach(t => {
        app.inject(t, "appEvents", "service:app-events");
        app.inject(t, "pmTopicTrackingState", "service:pm-topic-tracking-state");
        app.inject(t, "store", "service:store");
        app.inject(t, "site", "service:site");
        app.inject(t, "searchService", "service:search");
        app.inject(t, "session", "service:session");
        app.inject(t, "messageBus", "service:message-bus");
        app.inject(t, "siteSettings", "service:site-settings");
        app.inject(t, "topicTrackingState", "service:topic-tracking-state");
        app.inject(t, "keyValueStore", "service:key-value-store");
      });
      injectServiceIntoService({
        app,
        property: "session",
        specifier: "service:session"
      });
      injectServiceIntoService({
        app,
        property: "messageBus",
        specifier: "service:message-bus"
      });
      injectServiceIntoService({
        app,
        property: "siteSettings",
        specifier: "service:site-settings"
      });
      injectServiceIntoService({
        app,
        property: "topicTrackingState",
        specifier: "service:topic-tracking-state"
      });
      injectServiceIntoService({
        app,
        property: "keyValueStore",
        specifier: "service:key-value-store"
      });
      if (currentUser) {
        ["controller", "component", "route"].forEach(t => {
          app.inject(t, "currentUser", "service:current-user");
        });
        injectServiceIntoService({
          app,
          property: "currentUser",
          specifier: "service:current-user"
        });
      }
      (0, _topicTrackingState.startTracking)(this.topicTrackingState);
    },
    teardown() {
      // Manually call `willDestroy` as this isn't an actual `Service`
      this.topicTrackingState.willDestroy();
    }
  };
  _exports.default = _default;
});
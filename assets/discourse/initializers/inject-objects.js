define("discourse/initializers/inject-objects", ["exports", "discourse-common/lib/get-owner", "discourse/models/user", "discourse/models/site", "discourse-common/lib/deprecated"], function (_exports, _getOwner, _user, _site, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/get-owner",0,"discourse/models/user",0,"discourse/models/site",0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  var _default = {
    name: "inject-objects",
    after: "sniff-capabilities",
    initialize(container, app) {
      // This is required for Ember CLI tests to work
      (0, _getOwner.setDefaultOwner)(app.__container__);
      Object.defineProperty(app, "SiteSettings", {
        get() {
          (0, _deprecated.default)(`use injected siteSettings instead of Discourse.SiteSettings`, {
            since: "2.8",
            dropFrom: "2.9",
            id: "discourse.global.site-settings"
          });
          return container.lookup("service:site-settings");
        }
      });
      Object.defineProperty(app, "User", {
        get() {
          (0, _deprecated.default)(`import discourse/models/user instead of using Discourse.User`, {
            since: "2.8",
            dropFrom: "2.9",
            id: "discourse.global.user"
          });
          return _user.default;
        }
      });
      Object.defineProperty(app, "Site", {
        get() {
          (0, _deprecated.default)(`import discourse/models/site instead of using Discourse.Site`, {
            since: "2.8",
            dropFrom: "2.9",
            id: "discourse.global.site"
          });
          return _site.default;
        }
      });
    }
  };
  _exports.default = _default;
});
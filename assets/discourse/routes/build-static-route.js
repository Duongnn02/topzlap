define("discourse/routes/build-static-route", ["exports", "discourse/routes/discourse", "discourse/models/static-page"], function (_exports, _discourse, _staticPage) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/models/static-page"eaimeta@70e063a35619d71f
  function _default(pageName) {
    const route = {
      model() {
        return _staticPage.default.find(pageName);
      },
      renderTemplate() {
        this.render("static");
      },
      setupController(controller, model) {
        this.controllerFor("static").set("model", model);
      }
    };
    return _discourse.default.extend(route);
  }
});
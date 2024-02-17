define("discourse/helpers/decorate-username-selector", ["exports", "@ember/template", "discourse-common/lib/helpers"], function (_exports, _template, _helpers) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addUsernameSelectorDecorator = addUsernameSelectorDecorator;
  _exports.decorateUsername = decorateUsername;
  _exports.default = void 0;
  _exports.resetUsernameDecorators = resetUsernameDecorators;
  0; //eaimeta@70e063a35619d71f0,"@ember/template",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  let usernameDecorators = [];
  function addUsernameSelectorDecorator(decorator) {
    usernameDecorators.push(decorator);
  }
  function resetUsernameDecorators() {
    usernameDecorators = [];
  }
  function decorateUsername(username) {
    const decorations = [];
    usernameDecorators.forEach(decorator => {
      decorations.push(decorator(username));
    });
    return decorations.length ? (0, _template.htmlSafe)(decorations.join("")) : "";
  }
  var _default = (0, _helpers.registerUnbound)("decorate-username-selector", username => {
    return decorateUsername(username);
  });
  _exports.default = _default;
});
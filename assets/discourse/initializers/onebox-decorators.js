define("discourse/initializers/onebox-decorators", ["exports", "discourse/lib/plugin-api"], function (_exports, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.decorateGithubOneboxBody = decorateGithubOneboxBody;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/plugin-api"eaimeta@70e063a35619d71f
  let _showMoreClickPostsElements = [];
  function decorateGithubOneboxBody(element) {
    const containers = element.querySelectorAll(".onebox.githubcommit .show-more-container, .onebox.githubpullrequest .show-more-container, .onebox.githubissue .show-more-container");
    if (containers.length) {
      _showMoreClickPostsElements.push(element);
      element.addEventListener("click", _handleClick, false);
    }
  }
  function _handleClick(event) {
    if (!event.target.classList.contains("show-more")) {
      return;
    }
    event.preventDefault();
    const showMoreContainer = event.target.parentNode;
    const bodyContainer = showMoreContainer.parentNode;
    showMoreContainer.classList.add("hidden");
    bodyContainer.querySelector(".excerpt.hidden").classList.remove("hidden");
    return false;
  }
  function _cleanUp() {
    (_showMoreClickPostsElements || []).forEach(element => {
      element.removeEventListener("click", _handleClick);
    });
    _showMoreClickPostsElements = [];
  }
  var _default = {
    name: "onebox-decorators",
    initialize() {
      (0, _pluginApi.withPluginApi)("0.8.42", api => {
        api.decorateCookedElement(element => {
          decorateGithubOneboxBody(element);
        }, {
          id: "onebox-github-body"
        });
        api.cleanupStream(_cleanUp);
      });
    }
  };
  _exports.default = _default;
});
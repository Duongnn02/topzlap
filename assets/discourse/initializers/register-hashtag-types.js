define("discourse/initializers/register-hashtag-types", ["exports", "discourse/lib/plugin-api", "discourse/lib/hashtag-types/category", "discourse/lib/hashtag-types/tag"], function (_exports, _pluginApi, _category, _tag) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/plugin-api",0,"discourse/lib/hashtag-types/category",0,"discourse/lib/hashtag-types/tag"eaimeta@70e063a35619d71f
  var _default = {
    name: "register-hashtag-types",
    before: "hashtag-css-generator",
    initialize() {
      (0, _pluginApi.withPluginApi)("0.8.7", api => {
        api.registerHashtagType("category", _category.default);
        api.registerHashtagType("tag", _tag.default);
      });
    }
  };
  _exports.default = _default;
});
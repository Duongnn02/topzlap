define("discourse/routes/tags-intersection", ["exports", "discourse/routes/tag-show"], function (_exports, _tagShow) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/tag-show"eaimeta@70e063a35619d71f
  var _default = _tagShow.default.extend({}); // The tags-intersection route is exactly the same as the tags-show route, but the wildcard at the
  // end of the route (*additional_tags) will cause a match when query parameters are present,
  // breaking all other tags-show routes. Ember thinks the query params are addition tags and should
  // be handled by the intersection logic. Defining tags-intersection as something separate avoids
  // that confusion.
  _exports.default = _default;
});
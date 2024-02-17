define("discourse/models/live-post-counts", ["exports", "@ember/object", "discourse/lib/ajax"], function (_exports, _object, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  const LivePostCounts = _object.default.extend({});
  LivePostCounts.reopenClass({
    find() {
      return (0, _ajax.ajax)("/about/live_post_counts.json").then(result => LivePostCounts.create(result));
    }
  });
  var _default = LivePostCounts;
  _exports.default = _default;
});
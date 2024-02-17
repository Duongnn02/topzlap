define("discourse/routes/topic-by-slug-or-id", ["exports", "discourse/models/topic", "discourse/routes/discourse", "@ember/service"], function (_exports, _topic, _discourse, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/models/topic",0,"discourse/routes/discourse",0,"@ember/service"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    router: (0, _service.inject)(),
    model(params) {
      if (params.slugOrId.match(_topic.ID_CONSTRAINT)) {
        return {
          url: `/t/topic/${params.slugOrId}`
        };
      } else {
        return _topic.default.idForSlug(params.slugOrId).then(data => {
          return {
            url: `/t/${data.slug}/${data.topic_id}`
          };
        });
      }
    },
    afterModel(result) {
      this.router.transitionTo(result.url);
    }
  });
  _exports.default = _default;
});
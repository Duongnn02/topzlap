define("discourse/controllers/group-activity-posts", ["exports", "@ember/controller", "discourse/lib/computed", "discourse-common/utils/decorators"], function (_exports, _controller, _computed, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/lib/computed",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.observes)("canLoadMore"), (_obj = {
    group: (0, _controller.inject)(),
    groupActivity: (0, _controller.inject)(),
    application: (0, _controller.inject)(),
    canLoadMore: true,
    loading: false,
    emptyText: (0, _computed.fmt)("type", "groups.empty.%@"),
    actions: {
      loadMore() {
        if (!this.canLoadMore) {
          return;
        }
        if (this.loading) {
          return;
        }
        this.set("loading", true);
        const posts = this.model;
        if (posts && posts.length) {
          const beforePostId = posts[posts.length - 1].get("id");
          const group = this.get("group.model");
          let categoryId = this.get("groupActivity.category_id");
          const opts = {
            beforePostId,
            type: this.type,
            categoryId
          };
          group.findPosts(opts).then(newPosts => {
            posts.addObjects(newPosts);
            if (newPosts.length === 0) {
              this.set("canLoadMore", false);
            }
          }).finally(() => {
            this.set("loading", false);
          });
        }
      }
    },
    _showFooter() {
      this.set("application.showFooter", !this.canLoadMore);
    }
  }, (_applyDecoratedDescriptor(_obj, "_showFooter", [_dec], Object.getOwnPropertyDescriptor(_obj, "_showFooter"), _obj)), _obj)));
  _exports.default = _default;
});
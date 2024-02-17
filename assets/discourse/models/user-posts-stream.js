define("discourse/models/user-posts-stream", ["exports", "@ember/object", "rsvp", "discourse/models/user-action", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse/lib/computed"], function (_exports, _object, _rsvp, _userAction, _ajax, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"rsvp",0,"discourse/models/user-action",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse/lib/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _object.default.extend((_dec = (0, _decorators.on)("init"), (_obj = {
    loaded: false,
    _initialize() {
      this.setProperties({
        itemsLoaded: 0,
        canLoadMore: true,
        content: []
      });
    },
    url: (0, _computed.url)("user.username_lower", "filter", "itemsLoaded", "/posts/%@/%@?offset=%@"),
    filterBy(opts) {
      if (this.loaded && this.filter === opts.filter) {
        return _rsvp.Promise.resolve();
      }
      this.setProperties(Object.assign({
        itemsLoaded: 0,
        content: [],
        lastLoadedUrl: null
      }, opts));
      return this.findItems();
    },
    findItems() {
      if (this.loading || !this.canLoadMore) {
        return _rsvp.Promise.reject();
      }
      this.set("loading", true);
      return (0, _ajax.ajax)(this.url).then(result => {
        if (result) {
          const posts = result.map(post => _userAction.default.create(post));
          this.content.pushObjects(posts);
          this.setProperties({
            loaded: true,
            itemsLoaded: this.itemsLoaded + posts.length,
            canLoadMore: posts.length > 0
          });
        }
      }).finally(() => this.set("loading", false));
    }
  }, (_applyDecoratedDescriptor(_obj, "_initialize", [_dec], Object.getOwnPropertyDescriptor(_obj, "_initialize"), _obj)), _obj)));
  _exports.default = _default;
});
define("discourse/models/user-drafts-stream", ["exports", "discourse-common/utils/decorators", "discourse/lib/ajax", "discourse/lib/text", "discourse/lib/utilities", "discourse/models/composer", "discourse/models/rest", "discourse/models/user-draft", "rsvp"], function (_exports, _decorators, _ajax, _text, _utilities, _composer, _rest, _userDraft, _rsvp) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"discourse/lib/ajax",0,"discourse/lib/text",0,"discourse/lib/utilities",0,"discourse/models/composer",0,"discourse/models/rest",0,"discourse/models/user-draft",0,"rsvp"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _rest.default.extend((_dec = (0, _decorators.default)("content.length", "loading"), (_obj = {
    limit: 30,
    loading: false,
    hasMore: false,
    content: null,
    init() {
      this._super(...arguments);
      this.reset();
    },
    reset() {
      this.setProperties({
        loading: false,
        hasMore: true,
        content: []
      });
    },
    noContent(contentLength, loading) {
      return contentLength === 0 && !loading;
    },
    remove(draft) {
      this.set("content", this.content.filter(item => item.draft_key !== draft.draft_key));
    },
    findItems(site) {
      if (site) {
        this.set("site", site);
      }
      if (this.loading || !this.hasMore) {
        return _rsvp.Promise.resolve();
      }
      this.set("loading", true);
      const url = `/drafts.json?offset=${this.content.length}&limit=${this.limit}`;
      return (0, _ajax.ajax)(url).then(result => {
        if (!result) {
          return;
        }
        if (!result.drafts) {
          return;
        }
        this.set("hasMore", result.drafts.size >= this.limit);
        const promises = result.drafts.map(draft => {
          draft.data = JSON.parse(draft.data);
          return (0, _text.cookAsync)(draft.data.reply).then(cooked => {
            draft.excerpt = (0, _text.excerpt)(cooked.string, 300);
            draft.post_number = draft.data.postId || null;
            if (draft.draft_key === _composer.NEW_PRIVATE_MESSAGE_KEY || draft.draft_key === _composer.NEW_TOPIC_KEY) {
              draft.title = draft.data.title;
            }
            draft.title = (0, _text.emojiUnescape)((0, _utilities.escapeExpression)(draft.title));
            if (draft.data.categoryId) {
              draft.category = this.site.categories.findBy("id", draft.data.categoryId) || null;
            }
            this.content.push(_userDraft.default.create(draft));
          });
        });
        return _rsvp.Promise.all(promises);
      }).finally(() => {
        this.set("loading", false);
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "noContent", [_dec], Object.getOwnPropertyDescriptor(_obj, "noContent"), _obj)), _obj)));
  _exports.default = _default;
});
define("discourse/models/reviewable", ["exports", "discourse-common/utils/category-macro", "@ember/string", "I18n", "rsvp", "discourse/models/rest", "discourse/lib/ajax", "discourse-common/utils/decorators"], function (_exports, _categoryMacro, _string, _I18n, _rsvp, _rest, _ajax, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.REJECTED = _exports.PENDING = _exports.IGNORED = _exports.DELETED = _exports.APPROVED = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/category-macro",0,"@ember/string",0,"I18n",0,"rsvp",0,"discourse/models/rest",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const PENDING = 0;
  _exports.PENDING = PENDING;
  const APPROVED = 1;
  _exports.APPROVED = APPROVED;
  const REJECTED = 2;
  _exports.REJECTED = REJECTED;
  const IGNORED = 3;
  _exports.IGNORED = IGNORED;
  const DELETED = 4;
  _exports.DELETED = DELETED;
  const Reviewable = _rest.default.extend((_dec = (0, _decorators.default)("type", "topic"), _dec2 = (0, _decorators.default)("resolvedType"), _dec3 = (0, _decorators.default)("humanType"), (_obj = {
    resolvedType(type, topic) {
      // Display "Queued Topic" if the post will create a topic
      if (type === "ReviewableQueuedPost" && !topic) {
        return "ReviewableQueuedTopic";
      }
      return type;
    },
    humanType(resolvedType) {
      return _I18n.default.t(`review.types.${(0, _string.underscore)(resolvedType)}.title`, {
        defaultValue: ""
      });
    },
    humanTypeCssClass(humanType) {
      return "-" + (0, _string.dasherize)(humanType);
    },
    flaggedPostContextQuestion() {
      const uniqueReviewableScores = this.reviewable_scores.uniqBy("score_type.type");
      if (uniqueReviewableScores.length === 1) {
        if (uniqueReviewableScores[0].score_type.type === "notify_moderators") {
          return _I18n.default.t("review.context_question.something_else_wrong");
        }
      }
      const listOfQuestions = _I18n.default.listJoiner(uniqueReviewableScores.map(score => score.score_type.title.toLowerCase()).uniq(), _I18n.default.t("review.context_question.delimiter"));
      return _I18n.default.t("review.context_question.is_this_post", {
        reviewable_human_score_types: listOfQuestions
      });
    },
    category: (0, _categoryMacro.default)("category_id"),
    update(updates) {
      // If no changes, do nothing
      if (Object.keys(updates).length === 0) {
        return _rsvp.Promise.resolve();
      }
      let adapter = this.store.adapterFor("reviewable");
      return (0, _ajax.ajax)(`/review/${this.id}?version=${this.version}`, adapter.getPayload("PUT", {
        reviewable: updates
      })).then(updated => {
        updated.payload = Object.assign({}, this.payload || {}, updated.payload || {});
        this.setProperties(updated);
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "resolvedType", [_dec], Object.getOwnPropertyDescriptor(_obj, "resolvedType"), _obj), _applyDecoratedDescriptor(_obj, "humanType", [_dec2], Object.getOwnPropertyDescriptor(_obj, "humanType"), _obj), _applyDecoratedDescriptor(_obj, "humanTypeCssClass", [_dec3], Object.getOwnPropertyDescriptor(_obj, "humanTypeCssClass"), _obj), _applyDecoratedDescriptor(_obj, "flaggedPostContextQuestion", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "flaggedPostContextQuestion"), _obj)), _obj)));
  Reviewable.reopenClass({
    munge(json) {
      // ensure we are not overriding category computed property
      delete json.category;
      return json;
    }
  });
  var _default = Reviewable;
  _exports.default = _default;
});
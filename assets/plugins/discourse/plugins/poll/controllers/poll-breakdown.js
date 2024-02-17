define("discourse/plugins/poll/controllers/poll-breakdown", ["exports", "@ember/controller", "I18n", "discourse/mixins/modal-functionality", "@ember/object", "discourse/lib/ajax", "@ember/string", "discourse-common/utils/decorators", "@ember/template", "discourse/lib/load-script", "discourse/lib/ajax-error", "@ember/service"], function (_exports, _controller, _I18n, _modalFunctionality, _object, _ajax, _string, _decorators, _template, _loadScript, _ajaxError, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"I18n",0,"discourse/mixins/modal-functionality",0,"@ember/object",0,"discourse/lib/ajax",0,"@ember/string",0,"discourse-common/utils/decorators",0,"@ember/template",0,"discourse/lib/load-script",0,"discourse/lib/ajax-error",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("model.poll.title", "model.post.topic.title"), _dec2 = (0, _decorators.default)("model.groupableUserFields"), _dec3 = (0, _decorators.default)("model.poll.options"), (_obj = {
    dialog: (0, _service.inject)(),
    model: null,
    charts: null,
    groupedBy: null,
    highlightedOption: null,
    displayMode: "percentage",
    title(pollTitle, topicTitle) {
      return pollTitle ? (0, _template.htmlSafe)(pollTitle) : topicTitle;
    },
    groupableUserFields(fields) {
      return fields.map(field => {
        const transformed = field.split("_").filter(Boolean);
        if (transformed.length > 1) {
          transformed[0] = (0, _string.classify)(transformed[0]);
        }
        return {
          id: field,
          label: transformed.join(" ")
        };
      });
    },
    totalVotes(options) {
      return options.reduce((sum, option) => sum + option.votes, 0);
    },
    onShow() {
      this.set("charts", null);
      this.set("displayMode", "percentage");
      this.set("groupedBy", this.model.groupableUserFields[0]);
      (0, _loadScript.default)("/javascripts/Chart.min.js").then(() => (0, _loadScript.default)("/javascripts/chartjs-plugin-datalabels.min.js")).then(() => {
        this.fetchGroupedPollData();
      });
    },
    fetchGroupedPollData() {
      return (0, _ajax.ajax)("/polls/grouped_poll_results.json", {
        data: {
          post_id: this.model.post.id,
          poll_name: this.model.poll.name,
          user_field_name: this.groupedBy
        }
      }).catch(error => {
        if (error) {
          (0, _ajaxError.popupAjaxError)(error);
        } else {
          this.dialog.alert(_I18n.default.t("poll.error_while_fetching_voters"));
        }
      }).then(result => {
        if (this.isDestroying || this.isDestroyed) {
          return;
        }
        this.set("charts", result.grouped_results);
      });
    },
    setGrouping(value) {
      this.set("groupedBy", value);
      this.fetchGroupedPollData();
    },
    onSelectPanel(panel) {
      this.set("displayMode", panel.id);
    }
  }, (_applyDecoratedDescriptor(_obj, "title", [_dec], Object.getOwnPropertyDescriptor(_obj, "title"), _obj), _applyDecoratedDescriptor(_obj, "groupableUserFields", [_dec2], Object.getOwnPropertyDescriptor(_obj, "groupableUserFields"), _obj), _applyDecoratedDescriptor(_obj, "totalVotes", [_dec3], Object.getOwnPropertyDescriptor(_obj, "totalVotes"), _obj), _applyDecoratedDescriptor(_obj, "setGrouping", [_object.action], Object.getOwnPropertyDescriptor(_obj, "setGrouping"), _obj), _applyDecoratedDescriptor(_obj, "onSelectPanel", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onSelectPanel"), _obj)), _obj)));
  _exports.default = _default;
});
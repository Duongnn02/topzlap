define("discourse/controllers/change-timestamp", ["exports", "@ember/controller", "discourse/lib/url", "I18n", "discourse/mixins/modal-functionality", "discourse/models/topic", "discourse-common/utils/decorators", "@ember/utils", "@ember/runloop"], function (_exports, _controller, _url, _I18n, _modalFunctionality, _topic, _decorators, _utils, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"discourse/lib/url",0,"I18n",0,"discourse/mixins/modal-functionality",0,"discourse/models/topic",0,"discourse-common/utils/decorators",0,"@ember/utils",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  // Modal related to changing the timestamp of posts
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("saving"), _dec2 = (0, _decorators.default)("date", "time"), _dec3 = (0, _decorators.default)("createdAt"), _dec4 = (0, _decorators.default)("saving", "date", "validTimestamp"), (_obj = {
    topicController: (0, _controller.inject)("topic"),
    saving: false,
    date: "",
    time: "",
    buttonTitle(saving) {
      return saving ? _I18n.default.t("saving") : _I18n.default.t("topic.change_timestamp.action");
    },
    createdAt(date, time) {
      return moment(`${date} ${time}`, "YYYY-MM-DD HH:mm:ss");
    },
    validTimestamp(createdAt) {
      return moment().diff(createdAt, "minutes") < 0;
    },
    buttonDisabled(saving, date, validTimestamp) {
      if (saving || validTimestamp) {
        return true;
      }
      return (0, _utils.isEmpty)(date);
    },
    onShow() {
      this.set("date", moment().format("YYYY-MM-DD"));
    },
    actions: {
      changeTimestamp() {
        this.set("saving", true);
        const topic = this.topicController.model;
        _topic.default.changeTimestamp(topic.id, this.createdAt.unix()).then(() => {
          this.send("closeModal");
          this.setProperties({
            date: "",
            time: "",
            saving: false
          });
          (0, _runloop.next)(() => _url.default.routeTo(topic.url));
        }).catch(() => this.flash(_I18n.default.t("topic.change_timestamp.error"), "error")).finally(() => this.set("saving", false));
        return false;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "buttonTitle", [_dec], Object.getOwnPropertyDescriptor(_obj, "buttonTitle"), _obj), _applyDecoratedDescriptor(_obj, "createdAt", [_dec2], Object.getOwnPropertyDescriptor(_obj, "createdAt"), _obj), _applyDecoratedDescriptor(_obj, "validTimestamp", [_dec3], Object.getOwnPropertyDescriptor(_obj, "validTimestamp"), _obj), _applyDecoratedDescriptor(_obj, "buttonDisabled", [_dec4], Object.getOwnPropertyDescriptor(_obj, "buttonDisabled"), _obj)), _obj)));
  _exports.default = _default;
});
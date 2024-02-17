define("discourse/plugins/poll/initializers/add-poll-ui-builder", ["exports", "discourse-common/utils/decorators", "discourse/lib/show-modal", "discourse/lib/plugin-api"], function (_exports, _decorators, _showModal, _pluginApi) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"discourse/lib/show-modal",0,"discourse/lib/plugin-api"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function initializePollUIBuilder(api) {
    var _dec, _obj;
    api.modifyClass("controller:composer", (_dec = (0, _decorators.default)("siteSettings.poll_enabled", "siteSettings.poll_minimum_trust_level_to_create", "model.topic.pm_with_non_human_user"), (_obj = {
      pluginId: "discourse-poll-ui-builder",
      canBuildPoll(pollEnabled, minimumTrustLevel, pmWithNonHumanUser) {
        return pollEnabled && (pmWithNonHumanUser || this.currentUser && (this.currentUser.staff || this.currentUser.trust_level >= minimumTrustLevel));
      },
      actions: {
        showPollBuilder() {
          (0, _showModal.default)("poll-ui-builder").set("toolbarEvent", this.toolbarEvent);
        }
      }
    }, (_applyDecoratedDescriptor(_obj, "canBuildPoll", [_dec], Object.getOwnPropertyDescriptor(_obj, "canBuildPoll"), _obj)), _obj)));
    api.addToolbarPopupMenuOptionsCallback(() => {
      return {
        action: "showPollBuilder",
        icon: "chart-bar",
        label: "poll.ui_builder.title",
        condition: "canBuildPoll"
      };
    });
  }
  var _default = {
    name: "add-poll-ui-builder",
    initialize() {
      (0, _pluginApi.withPluginApi)("0.8.7", initializePollUIBuilder);
    }
  };
  _exports.default = _default;
});
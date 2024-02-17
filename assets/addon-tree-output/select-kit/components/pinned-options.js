define("select-kit/components/pinned-options", ["exports", "@ember/object", "select-kit/components/dropdown-select-box", "I18n", "@ember/template"], function (_exports, _object, _dropdownSelectBox, _I18n, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"select-kit/components/dropdown-select-box",0,"I18n",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const UNPINNED = "unpinned";
  const PINNED = "pinned";
  var _default = _dropdownSelectBox.default.extend((_obj = {
    pluginApiIdentifiers: ["pinned-options"],
    classNames: ["pinned-options"],
    selectKitOptions: {
      showCaret: true
    },
    modifySelection(content) {
      const pinnedGlobally = this.get("topic.pinned_globally");
      const pinned = this.value;
      const globally = pinnedGlobally ? "_globally" : "";
      const state = pinned ? `pinned${globally}` : UNPINNED;
      const title = _I18n.default.t(`topic_statuses.${state}.title`);
      content.label = (0, _template.htmlSafe)(`<span>${title}</span>`);
      content.title = title;
      content.name = state;
      content.icon = `thumbtack${state === UNPINNED ? " unpinned" : ""}`;
      return content;
    },
    content: (0, _object.computed)(function () {
      const globally = this.topic.pinned_globally ? "_globally" : "";
      return [{
        id: PINNED,
        name: _I18n.default.t(`topic_statuses.pinned${globally}.title`),
        description: this.site.mobileView ? null : _I18n.default.t(`topic_statuses.pinned${globally}.help`),
        icon: "thumbtack"
      }, {
        id: UNPINNED,
        name: _I18n.default.t("topic_statuses.unpinned.title"),
        icon: "thumbtack unpinned",
        description: this.site.mobileView ? null : _I18n.default.t("topic_statuses.unpinned.help")
      }];
    }),
    onChange(value) {
      const topic = this.topic;
      if (value === UNPINNED) {
        return topic.clearPin();
      } else {
        return topic.rePin();
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "onChange", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onChange"), _obj)), _obj));
  _exports.default = _default;
});
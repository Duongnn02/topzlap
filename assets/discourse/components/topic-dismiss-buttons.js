define("discourse/components/topic-dismiss-buttons", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "discourse/lib/show-modal", "discourse-common/lib/later", "discourse/lib/is-element-in-viewport", "discourse-common/utils/decorators", "I18n"], function (_exports, _component, _templateFactory, _object, _showModal, _later, _isElementInViewport, _decorators, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"discourse/lib/show-modal",0,"discourse-common/lib/later",0,"discourse/lib/is-element-in-viewport",0,"discourse-common/utils/decorators",0,"I18n",0,"@ember/component"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.showBasedOnPosition}}
    <div class="row {{this.containerClass}}">
      {{#if this.showDismissRead}}
        <DButton
          @class="btn-default dismiss-read"
          @id={{this.dismissReadId}}
          @action={{action "dismissReadPosts"}}
          @translatedLabel={{this.dismissLabel}}
          @title="topics.bulk.dismiss_tooltip"
        />
      {{/if}}
      {{#if this.showResetNew}}
        <DButton
          @class="btn-default dismiss-read"
          @id={{this.dismissNewId}}
          @action={{this.resetNew}}
          @icon="check"
          @translatedLabel={{this.dismissNewLabel}}
        />
      {{/if}}
    </div>
  {{/if}}
  */
  {
    "id": "gsoZUzTA",
    "block": "[[[41,[30,0,[\"showBasedOnPosition\"]],[[[1,\"  \"],[10,0],[15,0,[29,[\"row \",[30,0,[\"containerClass\"]]]]],[12],[1,\"\\n\"],[41,[30,0,[\"showDismissRead\"]],[[[1,\"      \"],[8,[39,1],null,[[\"@class\",\"@id\",\"@action\",\"@translatedLabel\",\"@title\"],[\"btn-default dismiss-read\",[30,0,[\"dismissReadId\"]],[28,[37,2],[[30,0],\"dismissReadPosts\"],null],[30,0,[\"dismissLabel\"]],\"topics.bulk.dismiss_tooltip\"]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"showResetNew\"]],[[[1,\"      \"],[8,[39,1],null,[[\"@class\",\"@id\",\"@action\",\"@icon\",\"@translatedLabel\"],[\"btn-default dismiss-read\",[30,0,[\"dismissNewId\"]],[30,0,[\"resetNew\"]],\"check\",[30,0,[\"dismissNewLabel\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"d-button\",\"action\"]]",
    "moduleName": "discourse/components/topic-dismiss-buttons.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("position"), _dec2 = (0, _decorators.default)("position"), _dec3 = (0, _decorators.default)("position"), _dec4 = (0, _decorators.default)("position", "isOtherDismissUnreadButtonVisible", "isOtherDismissNewButtonVisible"), _dec5 = (0, _decorators.default)("selectedTopics.length"), _dec6 = (0, _decorators.default)("selectedTopics.length"), _dec7 = (0, _decorators.on)("didInsertElement"), (_obj = {
    tagName: "",
    classNames: ["topic-dismiss-buttons"],
    position: null,
    selectedTopics: null,
    model: null,
    containerClass(position) {
      return `dismiss-container-${position}`;
    },
    dismissReadId(position) {
      return `dismiss-topics-${position}`;
    },
    dismissNewId(position) {
      return `dismiss-new-${position}`;
    },
    showBasedOnPosition(position, isOtherDismissUnreadButtonVisible, isOtherDismissNewButtonVisible) {
      if (position !== "top") {
        return true;
      }
      return !(isOtherDismissUnreadButtonVisible || isOtherDismissNewButtonVisible);
    },
    dismissLabel(selectedTopicCount) {
      if (selectedTopicCount === 0) {
        return _I18n.default.t("topics.bulk.dismiss_button");
      }
      return _I18n.default.t("topics.bulk.dismiss_button_with_selected", {
        count: selectedTopicCount
      });
    },
    dismissNewLabel(selectedTopicCount) {
      if (selectedTopicCount === 0) {
        return _I18n.default.t("topics.bulk.dismiss_new");
      }
      return _I18n.default.t("topics.bulk.dismiss_new_with_selected", {
        count: selectedTopicCount
      });
    },
    _determineOtherDismissVisibility() {
      (0, _later.default)(() => {
        if (this.position === "top") {
          this.set("isOtherDismissUnreadButtonVisible", (0, _isElementInViewport.default)(document.getElementById("dismiss-topics-bottom")));
          this.set("isOtherDismissNewButtonVisible", (0, _isElementInViewport.default)(document.getElementById("dismiss-new-bottom")));
        } else {
          this.set("isOtherDismissUnreadButtonVisible", true);
          this.set("isOtherDismissNewButtonVisible", true);
        }
      });
    },
    dismissReadPosts() {
      let dismissTitle = "topics.bulk.dismiss_read";
      if (this.selectedTopics.length > 0) {
        dismissTitle = "topics.bulk.dismiss_read_with_selected";
      }
      (0, _showModal.default)("dismiss-read", {
        titleTranslated: _I18n.default.t(dismissTitle, {
          count: this.selectedTopics.length
        })
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "containerClass", [_dec], Object.getOwnPropertyDescriptor(_obj, "containerClass"), _obj), _applyDecoratedDescriptor(_obj, "dismissReadId", [_dec2], Object.getOwnPropertyDescriptor(_obj, "dismissReadId"), _obj), _applyDecoratedDescriptor(_obj, "dismissNewId", [_dec3], Object.getOwnPropertyDescriptor(_obj, "dismissNewId"), _obj), _applyDecoratedDescriptor(_obj, "showBasedOnPosition", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showBasedOnPosition"), _obj), _applyDecoratedDescriptor(_obj, "dismissLabel", [_dec5], Object.getOwnPropertyDescriptor(_obj, "dismissLabel"), _obj), _applyDecoratedDescriptor(_obj, "dismissNewLabel", [_dec6], Object.getOwnPropertyDescriptor(_obj, "dismissNewLabel"), _obj), _applyDecoratedDescriptor(_obj, "_determineOtherDismissVisibility", [_dec7], Object.getOwnPropertyDescriptor(_obj, "_determineOtherDismissVisibility"), _obj), _applyDecoratedDescriptor(_obj, "dismissReadPosts", [_object.action], Object.getOwnPropertyDescriptor(_obj, "dismissReadPosts"), _obj)), _obj))));
  _exports.default = _default;
});
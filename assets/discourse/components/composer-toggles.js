define("discourse/components/composer-toggles", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="composer-controls">
    <span>
      <PluginOutlet @name="before-composer-toggles" @connectorTagName="div" />
    </span>
  
    {{#if this.site.mobileView}}
      <DButton
        @class="btn-flat toggle-toolbar btn-mini-toggle"
        @icon="bars"
        @action={{this.toggleToolbar}}
        @title={{this.toggleToolbarTitle}}
        @preventFocus={{true}}
      />
    {{/if}}
  
    {{#if this.showFullScreenButton}}
      <DButton
        @class="btn-flat toggle-fullscreen btn-mini-toggle"
        @icon={{this.fullscreenIcon}}
        @action={{this.toggleFullscreen}}
        @title={{this.fullscreenTitle}}
      />
    {{/if}}
  
    <DButton
      @class="btn-flat toggler toggle-minimize btn-mini-toggle"
      @icon={{this.toggleIcon}}
      @action={{this.toggleComposer}}
      @title={{this.toggleTitle}}
    />
  </div>
  */
  {
    "id": "Sq1nta7E",
    "block": "[[[10,0],[14,0,\"composer-controls\"],[12],[1,\"\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@name\",\"@connectorTagName\"],[\"before-composer-toggles\",\"div\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"site\",\"mobileView\"]],[[[1,\"    \"],[8,[39,2],null,[[\"@class\",\"@icon\",\"@action\",\"@title\",\"@preventFocus\"],[\"btn-flat toggle-toolbar btn-mini-toggle\",\"bars\",[30,0,[\"toggleToolbar\"]],[30,0,[\"toggleToolbarTitle\"]],true]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showFullScreenButton\"]],[[[1,\"    \"],[8,[39,2],null,[[\"@class\",\"@icon\",\"@action\",\"@title\"],[\"btn-flat toggle-fullscreen btn-mini-toggle\",[30,0,[\"fullscreenIcon\"]],[30,0,[\"toggleFullscreen\"]],[30,0,[\"fullscreenTitle\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[8,[39,2],null,[[\"@class\",\"@icon\",\"@action\",\"@title\"],[\"btn-flat toggler toggle-minimize btn-mini-toggle\",[30,0,[\"toggleIcon\"]],[30,0,[\"toggleComposer\"]],[30,0,[\"toggleTitle\"]]]],null],[1,\"\\n\"],[13]],[],false,[\"plugin-outlet\",\"if\",\"d-button\"]]",
    "moduleName": "discourse/components/composer-toggles.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("composeState"), _dec2 = (0, _decorators.default)("showToolbar"), _dec3 = (0, _decorators.default)("composeState"), _dec4 = (0, _decorators.default)("composeState"), _dec5 = (0, _decorators.default)("composeState"), _dec6 = (0, _decorators.default)("disableTextarea"), (_obj = {
    tagName: "",
    toggleTitle(composeState) {
      return composeState === "draft" || composeState === "saving" ? "composer.abandon" : "composer.collapse";
    },
    toggleToolbarTitle(showToolbar) {
      return showToolbar ? "composer.hide_toolbar" : "composer.show_toolbar";
    },
    fullscreenTitle(composeState) {
      return composeState === "draft" ? "composer.open" : composeState === "fullscreen" ? "composer.exit_fullscreen" : "composer.enter_fullscreen";
    },
    toggleIcon(composeState) {
      return composeState === "draft" || composeState === "saving" ? "times" : "chevron-down";
    },
    fullscreenIcon(composeState) {
      return composeState === "draft" ? "chevron-up" : composeState === "fullscreen" ? "discourse-compress" : "discourse-expand";
    },
    showFullScreenButton(disableTextarea) {
      if (this.site.mobileView) {
        return false;
      }
      return !disableTextarea;
    }
  }, (_applyDecoratedDescriptor(_obj, "toggleTitle", [_dec], Object.getOwnPropertyDescriptor(_obj, "toggleTitle"), _obj), _applyDecoratedDescriptor(_obj, "toggleToolbarTitle", [_dec2], Object.getOwnPropertyDescriptor(_obj, "toggleToolbarTitle"), _obj), _applyDecoratedDescriptor(_obj, "fullscreenTitle", [_dec3], Object.getOwnPropertyDescriptor(_obj, "fullscreenTitle"), _obj), _applyDecoratedDescriptor(_obj, "toggleIcon", [_dec4], Object.getOwnPropertyDescriptor(_obj, "toggleIcon"), _obj), _applyDecoratedDescriptor(_obj, "fullscreenIcon", [_dec5], Object.getOwnPropertyDescriptor(_obj, "fullscreenIcon"), _obj), _applyDecoratedDescriptor(_obj, "showFullScreenButton", [_dec6], Object.getOwnPropertyDescriptor(_obj, "showFullScreenButton"), _obj)), _obj))));
  _exports.default = _default;
});
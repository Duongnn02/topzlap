define("discourse/components/share-panel", ["exports", "@ember/component", "@ember/template-factory", "I18n", "discourse/lib/sharing", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/lib/utilities", "@ember/utils", "discourse-common/lib/later"], function (_exports, _component, _templateFactory, _I18n, _sharing, _computed, _decorators, _utilities, _utils, _later) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"discourse/lib/sharing",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse/lib/utilities",0,"@ember/utils",0,"discourse-common/lib/later"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="header">
    <h3 class="title">{{html-safe this.shareTitle}}</h3>
  </div>
  
  <div class="body">
    <DTextarea
      @value={{this.shareUrl}}
      @class="topic-share-url"
      @aria-label={{I18n "share.url"}}
    />
  
    <div class="sources">
      {{#each this.sources as |source|}}
        <ShareSource
          @source={{source}}
          @title={{this.topic.title}}
          @action={{action "share"}}
        />
      {{/each}}
    </div>
  </div>
  */
  {
    "id": "FxBrba7P",
    "block": "[[[10,0],[14,0,\"header\"],[12],[1,\"\\n  \"],[10,\"h3\"],[14,0,\"title\"],[12],[1,[28,[35,0],[[30,0,[\"shareTitle\"]]],null]],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[10,0],[14,0,\"body\"],[12],[1,\"\\n  \"],[8,[39,1],null,[[\"@value\",\"@class\",\"@aria-label\"],[[30,0,[\"shareUrl\"]],\"topic-share-url\",[28,[37,2],[\"share.url\"],null]]],null],[1,\"\\n\\n  \"],[10,0],[14,0,\"sources\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"sources\"]]],null]],null],null,[[[1,\"      \"],[8,[39,5],null,[[\"@source\",\"@title\",\"@action\"],[[30,1],[30,0,[\"topic\",\"title\"]],[28,[37,6],[[30,0],\"share\"],null]]],null],[1,\"\\n\"]],[1]],null],[1,\"  \"],[13],[1,\"\\n\"],[13]],[\"source\"],false,[\"html-safe\",\"d-textarea\",\"I18n\",\"each\",\"-track-array\",\"share-source\",\"action\"]]",
    "moduleName": "discourse/components/share-panel.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("topic.{isPrivateMessage,invisible,category}"), _dec2 = (0, _decorators.default)("type", "topic.title"), _dec3 = (0, _decorators.default)("panel.model.shareUrl", "topic.shareUrl"), (_obj = {
    tagName: null,
    type: (0, _computed.alias)("panel.model.type"),
    topic: (0, _computed.alias)("panel.model.topic"),
    privateCategory: (0, _computed.alias)("panel.model.topic.category.read_restricted"),
    sources(topic) {
      const privateContext = this.siteSettings.login_required || topic && topic.isPrivateMessage || topic && topic.invisible || this.privateCategory;
      return _sharing.default.activeSources(this.siteSettings.share_links, privateContext);
    },
    shareTitle(type, topicTitle) {
      topicTitle = (0, _utilities.escapeExpression)(topicTitle);
      return _I18n.default.t("share.topic_html", {
        topicTitle
      });
    },
    shareUrl(forcedShareUrl, shareUrl) {
      shareUrl = forcedShareUrl || shareUrl;
      if ((0, _utils.isEmpty)(shareUrl)) {
        return;
      }

      // Relative urls
      if (shareUrl.startsWith("/")) {
        const location = window.location;
        shareUrl = `${location.protocol}//${location.host}${shareUrl}`;
      }
      return encodeURI(shareUrl);
    },
    didInsertElement() {
      this._super(...arguments);
      (0, _later.default)(() => {
        if (this.element) {
          const textArea = this.element.querySelector(".topic-share-url");
          textArea.style.height = textArea.scrollHeight + "px";
          textArea.focus();
          textArea.setSelectionRange(0, this.shareUrl.length);
        }
      }, 200);
    },
    actions: {
      share(source) {
        _sharing.default.shareSource(source, {
          url: this.shareUrl,
          title: this.get("topic.title")
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "sources", [_dec], Object.getOwnPropertyDescriptor(_obj, "sources"), _obj), _applyDecoratedDescriptor(_obj, "shareTitle", [_dec2], Object.getOwnPropertyDescriptor(_obj, "shareTitle"), _obj), _applyDecoratedDescriptor(_obj, "shareUrl", [_dec3], Object.getOwnPropertyDescriptor(_obj, "shareUrl"), _obj)), _obj))));
  _exports.default = _default;
});
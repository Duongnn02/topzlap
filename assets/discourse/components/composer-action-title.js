define("discourse/components/composer-action-title", ["exports", "@ember/component", "@ember/template-factory", "discourse/models/composer", "I18n", "@ember/object/computed", "discourse-common/utils/decorators", "discourse-common/lib/icon-library", "@ember/template", "pretty-text/sanitizer"], function (_exports, _component, _templateFactory, _composer, _I18n, _computed, _decorators, _iconLibrary, _template, _sanitizer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/models/composer",0,"@ember/component",0,"I18n",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"discourse-common/lib/icon-library",0,"@ember/template",0,"pretty-text/sanitizer"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <ComposerActions
    @composerModel={{this.model}}
    @replyOptions={{this.model.replyOptions}}
    @canWhisper={{this.canWhisper}}
    @openComposer={{this.openComposer}}
    @closeComposer={{this.closeComposer}}
    @action={{this.model.action}}
    @tabindex={{this.tabindex}}
    @topic={{this.model.topic}}
    @post={{this.model.post}}
    @whisper={{this.model.whisper}}
    @noBump={{this.model.noBump}}
    @options={{hash mobilePlacementStrategy="fixed"}}
  />
  
  <span class="action-title">
    {{this.actionTitle}}
  </span>
  */
  {
    "id": "kE5+VbA9",
    "block": "[[[8,[39,0],null,[[\"@composerModel\",\"@replyOptions\",\"@canWhisper\",\"@openComposer\",\"@closeComposer\",\"@action\",\"@tabindex\",\"@topic\",\"@post\",\"@whisper\",\"@noBump\",\"@options\"],[[30,0,[\"model\"]],[30,0,[\"model\",\"replyOptions\"]],[30,0,[\"canWhisper\"]],[30,0,[\"openComposer\"]],[30,0,[\"closeComposer\"]],[30,0,[\"model\",\"action\"]],[30,0,[\"tabindex\"]],[30,0,[\"model\",\"topic\"]],[30,0,[\"model\",\"post\"]],[30,0,[\"model\",\"whisper\"]],[30,0,[\"model\",\"noBump\"]],[28,[37,1],null,[[\"mobilePlacementStrategy\"],[\"fixed\"]]]]],null],[1,\"\\n\\n\"],[10,1],[14,0,\"action-title\"],[12],[1,\"\\n  \"],[1,[30,0,[\"actionTitle\"]]],[1,\"\\n\"],[13]],[],false,[\"composer-actions\",\"hash\"]]",
    "moduleName": "discourse/components/composer-action-title.hbs",
    "isStrictMode": false
  });
  const TITLES = {
    [_composer.PRIVATE_MESSAGE]: "topic.private_message",
    [_composer.CREATE_TOPIC]: "topic.create_long",
    [_composer.CREATE_SHARED_DRAFT]: "composer.create_shared_draft",
    [_composer.EDIT_SHARED_DRAFT]: "composer.edit_shared_draft"
  };
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("options", "action", "model.tags", "model.category"), (_obj = {
    classNames: ["composer-action-title"],
    options: (0, _computed.alias)("model.replyOptions"),
    action: (0, _computed.alias)("model.action"),
    actionTitle(opts, action) {
      let result = this.model.customizationFor("actionTitle");
      if (result) {
        return result;
      }
      if (TITLES[action]) {
        return _I18n.default.t(TITLES[action]);
      }
      switch (action) {
        case _composer.REPLY:
          if (opts.userAvatar && opts.userLink) {
            return this._formatReplyToUserPost(opts.userAvatar, opts.userLink);
          } else if (opts.topicLink) {
            return this._formatReplyToTopic(opts.topicLink);
          }
        case _composer.EDIT:
          if (opts.userAvatar && opts.userLink && opts.postLink) {
            return this._formatEditUserPost(opts.userAvatar, opts.userLink, opts.postLink, opts.originalUser);
          }
      }
    },
    _formatEditUserPost(userAvatar, userLink, postLink, originalUser) {
      let editTitle = `
      <a class="post-link" href="${postLink.href}">${postLink.anchor}</a>
      ${userAvatar}
      <span class="username">${userLink.anchor}</span>
    `;
      if (originalUser) {
        editTitle += `
        ${(0, _iconLibrary.iconHTML)("share", {
          class: "reply-to-glyph"
        })}
        ${originalUser.avatar}
        <span class="original-username">${originalUser.username}</span>
      `;
      }
      return (0, _template.htmlSafe)(editTitle);
    },
    _formatReplyToTopic(link) {
      return (0, _template.htmlSafe)(`<a class="topic-link" href="${link.href}" data-topic-id="${this.get("model.topic.id")}">${link.anchor}</a>`);
    },
    _formatReplyToUserPost(avatar, link) {
      const htmlLink = `<a class="user-link" href="${link.href}">${(0, _sanitizer.escape)(link.anchor)}</a>`;
      return (0, _template.htmlSafe)(`${avatar}${htmlLink}`);
    }
  }, (_applyDecoratedDescriptor(_obj, "actionTitle", [_dec], Object.getOwnPropertyDescriptor(_obj, "actionTitle"), _obj)), _obj))));
  _exports.default = _default;
});
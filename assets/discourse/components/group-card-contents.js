define("discourse/components/group-card-contents", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "@ember/object/computed", "discourse/mixins/card-contents-base", "discourse/mixins/cleans-up", "rsvp", "discourse-common/utils/decorators", "discourse/lib/url", "discourse/lib/computed", "discourse/lib/utilities"], function (_exports, _component, _templateFactory, _object, _computed, _cardContentsBase, _cleansUp, _rsvp, _decorators, _url, _computed2, _utilities) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj, _init, _init2;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object",0,"@ember/object/computed",0,"discourse/mixins/card-contents-base",0,"discourse/mixins/cleans-up",0,"@ember/component",0,"rsvp",0,"discourse-common/utils/decorators",0,"discourse/lib/url",0,"discourse/lib/computed",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.visible}}
    <div class="card-content">
      {{#if this.loading}}
        <div class="card-row first-row">
          <div class="group-card-avatar">
            <div
              class="card-avatar-placeholder animated-placeholder placeholder-animation"
            ></div>
          </div>
        </div>
  
        <div class="card-row second-row">
          <div class="animated-placeholder placeholder-animation"></div>
        </div>
      {{else}}
        <div class="card-row first-row">
          <div class="group-card-avatar">
            <a
              href={{this.groupPath}}
              {{on "click" (fn this.handleShowGroup this.group)}}
              class="card-huge-avatar"
            >
              <AvatarFlair
                @flairName={{this.group.name}}
                @flairUrl={{this.group.flair_url}}
                @flairBgColor={{this.group.flair_bg_color}}
                @flairColor={{this.group.flair_color}}
              />
            </a>
          </div>
          <div class="names">
            <span>
              <h1 class={{this.group.name}}>
                <a
                  href={{this.groupPath}}
                  {{on "click" (fn this.handleShowGroup this.group)}}
                  class="group-page-link"
                >{{this.group.name}}</a>
              </h1>
              {{#if this.group.full_name}}
                <h2 class="full-name">{{this.group.full_name}}</h2>
              {{else}}
                <h2 class="username">{{this.group.name}}</h2>
              {{/if}}
            </span>
          </div>
          <ul class="usercard-controls group-details-button">
            <li>
              <GroupMembershipButton
                @model={{this.group}}
                @showLogin={{route-action "showLogin"}}
              />
            </li>
            {{#if this.group.messageable}}
              <li>
                <DButton
                  @action={{action "messageGroup"}}
                  @class="btn-primary group-message-button inline"
                  @icon="envelope"
                  @label="groups.message"
                />
              </li>
            {{/if}}
          </ul>
        </div>
  
        {{#if this.group.bio_excerpt}}
          <div class="card-row second-row">
            <div class="bio">
              {{html-safe this.group.bio_excerpt}}
            </div>
          </div>
        {{/if}}
  
        {{#if this.group.members}}
          <div class="card-row third-row">
            <div class="members metadata">
              {{#each this.group.members as |user|}}
                <a
                  {{on "click" this.close}}
                  href={{user.path}}
                  class="card-tiny-avatar"
                >{{bound-avatar user "tiny"}}</a>
              {{/each}}
              {{#if this.showMoreMembers}}
                <a
                  href={{this.groupPath}}
                  {{on "click" (fn this.handleShowGroup this.group)}}
                  class="more-members-link"
                >
                  <span class="more-members-count">+{{this.moreMembersCount}}
                    {{i18n "more"}}</span>
                </a>
              {{/if}}
            </div>
          </div>
        {{/if}}
      {{/if}}
    </div>
  {{/if}}
  */
  {
    "id": "KjYrcb7p",
    "block": "[[[41,[30,0,[\"visible\"]],[[[1,\"  \"],[10,0],[14,0,\"card-content\"],[12],[1,\"\\n\"],[41,[30,0,[\"loading\"]],[[[1,\"      \"],[10,0],[14,0,\"card-row first-row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"group-card-avatar\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"card-avatar-placeholder animated-placeholder placeholder-animation\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"card-row second-row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"animated-placeholder placeholder-animation\"],[12],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,0],[14,0,\"card-row first-row\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"group-card-avatar\"],[12],[1,\"\\n          \"],[11,3],[16,6,[30,0,[\"groupPath\"]]],[24,0,\"card-huge-avatar\"],[4,[38,1],[\"click\",[28,[37,2],[[30,0,[\"handleShowGroup\"]],[30,0,[\"group\"]]],null]],null],[12],[1,\"\\n            \"],[8,[39,3],null,[[\"@flairName\",\"@flairUrl\",\"@flairBgColor\",\"@flairColor\"],[[30,0,[\"group\",\"name\"]],[30,0,[\"group\",\"flair_url\"]],[30,0,[\"group\",\"flair_bg_color\"]],[30,0,[\"group\",\"flair_color\"]]]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,0],[14,0,\"names\"],[12],[1,\"\\n          \"],[10,1],[12],[1,\"\\n            \"],[10,\"h1\"],[15,0,[30,0,[\"group\",\"name\"]]],[12],[1,\"\\n              \"],[11,3],[16,6,[30,0,[\"groupPath\"]]],[24,0,\"group-page-link\"],[4,[38,1],[\"click\",[28,[37,2],[[30,0,[\"handleShowGroup\"]],[30,0,[\"group\"]]],null]],null],[12],[1,[30,0,[\"group\",\"name\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"],[41,[30,0,[\"group\",\"full_name\"]],[[[1,\"              \"],[10,\"h2\"],[14,0,\"full-name\"],[12],[1,[30,0,[\"group\",\"full_name\"]]],[13],[1,\"\\n\"]],[]],[[[1,\"              \"],[10,\"h2\"],[14,0,\"username\"],[12],[1,[30,0,[\"group\",\"name\"]]],[13],[1,\"\\n\"]],[]]],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,\"ul\"],[14,0,\"usercard-controls group-details-button\"],[12],[1,\"\\n          \"],[10,\"li\"],[12],[1,\"\\n            \"],[8,[39,4],null,[[\"@model\",\"@showLogin\"],[[30,0,[\"group\"]],[28,[37,5],[\"showLogin\"],null]]],null],[1,\"\\n          \"],[13],[1,\"\\n\"],[41,[30,0,[\"group\",\"messageable\"]],[[[1,\"            \"],[10,\"li\"],[12],[1,\"\\n              \"],[8,[39,6],null,[[\"@action\",\"@class\",\"@icon\",\"@label\"],[[28,[37,7],[[30,0],\"messageGroup\"],null],\"btn-primary group-message-button inline\",\"envelope\",\"groups.message\"]],null],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"group\",\"bio_excerpt\"]],[[[1,\"        \"],[10,0],[14,0,\"card-row second-row\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"bio\"],[12],[1,\"\\n            \"],[1,[28,[35,8],[[30,0,[\"group\",\"bio_excerpt\"]]],null]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"group\",\"members\"]],[[[1,\"        \"],[10,0],[14,0,\"card-row third-row\"],[12],[1,\"\\n          \"],[10,0],[14,0,\"members metadata\"],[12],[1,\"\\n\"],[42,[28,[37,10],[[28,[37,10],[[30,0,[\"group\",\"members\"]]],null]],null],null,[[[1,\"              \"],[11,3],[16,6,[30,1,[\"path\"]]],[24,0,\"card-tiny-avatar\"],[4,[38,1],[\"click\",[30,0,[\"close\"]]],null],[12],[1,[28,[35,11],[[30,1],\"tiny\"],null]],[13],[1,\"\\n\"]],[1]],null],[41,[30,0,[\"showMoreMembers\"]],[[[1,\"              \"],[11,3],[16,6,[30,0,[\"groupPath\"]]],[24,0,\"more-members-link\"],[4,[38,1],[\"click\",[28,[37,2],[[30,0,[\"handleShowGroup\"]],[30,0,[\"group\"]]],null]],null],[12],[1,\"\\n                \"],[10,1],[14,0,\"more-members-count\"],[12],[1,\"+\"],[1,[30,0,[\"moreMembersCount\"]]],[1,\"\\n                  \"],[1,[28,[35,12],[\"more\"],null]],[13],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null]],[]]],[1,\"  \"],[13],[1,\"\\n\"]],[]],null]],[\"user\"],false,[\"if\",\"on\",\"fn\",\"avatar-flair\",\"group-membership-button\",\"route-action\",\"d-button\",\"action\",\"html-safe\",\"each\",\"-track-array\",\"bound-avatar\",\"i18n\"]]",
    "moduleName": "discourse/components/group-card-contents.hbs",
    "isStrictMode": false
  });
  const maxMembersToDisplay = 10;
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_cardContentsBase.default, _cleansUp.default, (_dec = (0, _decorators.default)("group.user_count", "group.members.length"), _dec2 = (0, _decorators.default)("group.name"), _dec3 = (0, _decorators.default)("group"), (_obj = {
    elementId: "group-card",
    mentionSelector: "a.mention-group",
    classNames: ["no-bg", "group-card"],
    classNameBindings: ["visible:show", "showBadges", "hasCardBadgeImage", "isFixed:fixed", "groupClass"],
    allowBackgrounds: (0, _computed2.setting)("allow_profile_backgrounds"),
    showBadges: (0, _computed2.setting)("enable_badges"),
    postStream: (0, _computed.alias)("topic.postStream"),
    showMoreMembers: (0, _computed.gt)("moreMembersCount", 0),
    group: null,
    moreMembersCount: (memberCount, maxMemberDisplay) => memberCount - maxMemberDisplay,
    groupClass: name => name ? `group-card-${name}` : "",
    groupPath(group) {
      return (0, _url.groupPath)(group.name);
    },
    _showCallback(username, $target) {
      this._positionCard($target);
      this.setProperties({
        visible: true,
        loading: true
      });
      return this.store.find("group", username).then(group => {
        this.setProperties({
          group
        });
        if (!group.flair_url && !group.flair_bg_color) {
          group.set("flair_url", "fa-users");
        }
        return group.can_see_members && group.members.length < maxMembersToDisplay ? group.reloadMembers({
          limit: maxMembersToDisplay
        }, true) : _rsvp.Promise.resolve();
      }).catch(() => this._close()).finally(() => this.set("loading", null));
    },
    _close() {
      this.set("group", null);
      this._super(...arguments);
    },
    cleanUp() {
      this._close();
    },
    close(event) {
      event?.preventDefault();
      this._close();
    },
    handleShowGroup(group, event) {
      if (event && (0, _utilities.modKeysPressed)(event).length > 0) {
        return false;
      }
      event?.preventDefault();
      // Invokes `showGroup` argument. Convert to `this.args.showGroup` when
      // refactoring this to a glimmer component.
      this.showGroup(group);
      this._close();
    },
    actions: {
      cancelFilter() {
        const postStream = this.postStream;
        postStream.cancelFilter();
        postStream.refresh();
        this._close();
      },
      messageGroup() {
        this.createNewMessageViaParams({
          recipients: this.get("group.name"),
          hasGroups: true
        });
      },
      showGroup(group) {
        this.handleShowGroup(group);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "moreMembersCount", [_dec], (_init = Object.getOwnPropertyDescriptor(_obj, "moreMembersCount"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "groupClass", [_dec2], (_init2 = Object.getOwnPropertyDescriptor(_obj, "groupClass"), _init2 = _init2 ? _init2.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init2;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "groupPath", [_dec3], Object.getOwnPropertyDescriptor(_obj, "groupPath"), _obj), _applyDecoratedDescriptor(_obj, "close", [_object.action], Object.getOwnPropertyDescriptor(_obj, "close"), _obj), _applyDecoratedDescriptor(_obj, "handleShowGroup", [_object.action], Object.getOwnPropertyDescriptor(_obj, "handleShowGroup"), _obj)), _obj))));
  _exports.default = _default;
});
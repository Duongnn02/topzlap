define("discourse/components/topic-status", ["exports", "@ember/component", "@ember/template-factory", "I18n", "discourse-common/utils/decorators", "discourse-common/lib/icon-library", "@ember/template"], function (_exports, _component, _templateFactory, _I18n, _decorators, _iconLibrary, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"I18n",0,"discourse-common/utils/decorators",0,"discourse-common/lib/icon-library",0,"@ember/template"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{~#if this.topicClosedArchived~}}
    <span
      title={{this.closedArchivedTitle}}
      class="topic-status"
    >{{this.closedArchivedIcon}}</span>
  {{~/if~}}
  {{~#if this.closedIcon~}}
    <span
      title={{this.closedTitle}}
      class="topic-status"
    >{{this.closedIcon}}</span>
  {{~/if~}}
  {{~#if this.archivedIcon~}}
    <span
      title={{this.archivedTitle}}
      class="topic-status"
    >{{this.archivedIcon}}</span>
  {{~/if~}}
  {{~#if this.topicPrivateMessage~}}
    <span
      title={{this.privateMessageTitle}}
      class="topic-status"
    >{{this.privateMessageIcon}}</span>
  {{~/if~}}
  {{~#if this.topicWarning~}}
    <span
      title={{this.warningTitle}}
      class="topic-status topic-status-warning"
    >{{this.warningIcon}}</span>
  {{~/if~}}
  {{~#if this.topicPinned~}}
    {{~#if this.canAct~}}
      <a
        href=""
        title={{this.pinnedTitle}}
        class="topic-status"
      >{{this.pinnedIcon}}</a>
    {{~else~}}
      <span
        title={{this.pinnedTitle}}
        class="topic-status"
      >{{this.pinnedIcon}}</span>
    {{~/if~}}
  {{~/if~}}
  {{~#if this.topicUnpinned~}}
    {{~#if this.canAct~}}
      <a
        href=""
        title={{this.unpinnedTitle}}
        class="topic-status"
      >{{this.unpinnedIcon}}</a>
    {{~else~}}
      <span
        title={{this.unpinnedTitle}}
        class="topic-status"
      >{{this.unpinnedIcon}}</span>
    {{~/if~}}
  {{~/if~}}
  {{~#if this.topicInvisible~}}
    <span
      title={{this.invisibleTitle}}
      class="topic-status"
    >{{this.invisibleIcon}}</span>
  {{~/if~}}
  <PluginOutlet
    @name="after-topic-status"
    @connectorTagName="div"
    @outletArgs={{hash topic=this.topic}}
  />
  */
  {
    "id": "l1iM1Gha",
    "block": "[[[41,[30,0,[\"topicClosedArchived\"]],[[[10,1],[15,\"title\",[30,0,[\"closedArchivedTitle\"]]],[14,0,\"topic-status\"],[12],[1,[30,0,[\"closedArchivedIcon\"]]],[13]],[]],null],[41,[30,0,[\"closedIcon\"]],[[[10,1],[15,\"title\",[30,0,[\"closedTitle\"]]],[14,0,\"topic-status\"],[12],[1,[30,0,[\"closedIcon\"]]],[13]],[]],null],[41,[30,0,[\"archivedIcon\"]],[[[10,1],[15,\"title\",[30,0,[\"archivedTitle\"]]],[14,0,\"topic-status\"],[12],[1,[30,0,[\"archivedIcon\"]]],[13]],[]],null],[41,[30,0,[\"topicPrivateMessage\"]],[[[10,1],[15,\"title\",[30,0,[\"privateMessageTitle\"]]],[14,0,\"topic-status\"],[12],[1,[30,0,[\"privateMessageIcon\"]]],[13]],[]],null],[41,[30,0,[\"topicWarning\"]],[[[10,1],[15,\"title\",[30,0,[\"warningTitle\"]]],[14,0,\"topic-status topic-status-warning\"],[12],[1,[30,0,[\"warningIcon\"]]],[13]],[]],null],[41,[30,0,[\"topicPinned\"]],[[[41,[30,0,[\"canAct\"]],[[[10,3],[14,6,\"\"],[15,\"title\",[30,0,[\"pinnedTitle\"]]],[14,0,\"topic-status\"],[12],[1,[30,0,[\"pinnedIcon\"]]],[13]],[]],[[[10,1],[15,\"title\",[30,0,[\"pinnedTitle\"]]],[14,0,\"topic-status\"],[12],[1,[30,0,[\"pinnedIcon\"]]],[13]],[]]]],[]],null],[41,[30,0,[\"topicUnpinned\"]],[[[41,[30,0,[\"canAct\"]],[[[10,3],[14,6,\"\"],[15,\"title\",[30,0,[\"unpinnedTitle\"]]],[14,0,\"topic-status\"],[12],[1,[30,0,[\"unpinnedIcon\"]]],[13]],[]],[[[10,1],[15,\"title\",[30,0,[\"unpinnedTitle\"]]],[14,0,\"topic-status\"],[12],[1,[30,0,[\"unpinnedIcon\"]]],[13]],[]]]],[]],null],[41,[30,0,[\"topicInvisible\"]],[[[10,1],[15,\"title\",[30,0,[\"invisibleTitle\"]]],[14,0,\"topic-status\"],[12],[1,[30,0,[\"invisibleIcon\"]]],[13]],[]],null],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"after-topic-status\",\"div\",[28,[37,2],null,[[\"topic\"],[[30,0,[\"topic\"]]]]]]],null]],[],false,[\"if\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/components/topic-status.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("disableActions"), _dec2 = (0, _decorators.default)("topic.closed", "topic.archived"), _dec3 = (0, _decorators.default)("topic.is_warning"), _dec4 = (0, _decorators.default)("showPrivateMessageIcon", "topic.isPrivateMessage", "topic.is_warning"), _dec5 = (0, _decorators.default)("topic.pinned"), _dec6 = (0, _decorators.default)("topic.unpinned"), _dec7 = (0, _decorators.default)("topic.invisible"), (_obj = {
    disableActions: false,
    classNames: ["topic-statuses"],
    click(e) {
      // only pin unpin for now
      if (this.canAct && $(e.target).hasClass("d-icon-thumbtack")) {
        const topic = this.topic;
        topic.get("pinned") ? topic.clearPin() : topic.rePin();
        return false;
      }
    },
    canAct(disableActions) {
      return this.currentUser && !disableActions;
    },
    topicClosedArchived(closed, archived) {
      if (closed && archived) {
        this._set("closedArchived", "lock", "locked_and_archived");
        this._reset("closed");
        this._reset("archived");
        return true;
      } else {
        this._reset("closedArchived");
        closed ? this._set("closed", "lock", "locked") : this._reset("closed");
        archived ? this._set("archived", "lock", "archived") : this._reset("archived");
        return false;
      }
    },
    topicWarning(warning) {
      return warning ? this._set("warning", "envelope", "warning") : this._reset("warning");
    },
    topicPrivateMessage(showPrivateMessageIcon, privateMessage, warning) {
      return showPrivateMessageIcon && privateMessage && !warning ? this._set("privateMessage", "envelope", "personal_message") : this._reset("privateMessage");
    },
    topicPinned(pinned) {
      return pinned ? this._set("pinned", "thumbtack", "pinned") : this._reset("pinned");
    },
    topicUnpinned(unpinned) {
      return unpinned ? this._set("unpinned", "thumbtack", "unpinned", {
        class: "unpinned"
      }) : this._reset("unpinned");
    },
    topicInvisible(invisible) {
      return invisible ? this._set("invisible", "far-eye-slash", "unlisted") : this._reset("invisible");
    },
    _set(name, icon, key, iconArgs) {
      this.set(`${name}Icon`, (0, _template.htmlSafe)((0, _iconLibrary.iconHTML)(`${icon}`, iconArgs)));
      this.set(`${name}Title`, _I18n.default.t(`topic_statuses.${key}.help`));
      return true;
    },
    _reset(name) {
      this.set(`${name}Icon`, null);
      this.set(`${name}Title`, null);
      return false;
    }
  }, (_applyDecoratedDescriptor(_obj, "canAct", [_dec], Object.getOwnPropertyDescriptor(_obj, "canAct"), _obj), _applyDecoratedDescriptor(_obj, "topicClosedArchived", [_dec2], Object.getOwnPropertyDescriptor(_obj, "topicClosedArchived"), _obj), _applyDecoratedDescriptor(_obj, "topicWarning", [_dec3], Object.getOwnPropertyDescriptor(_obj, "topicWarning"), _obj), _applyDecoratedDescriptor(_obj, "topicPrivateMessage", [_dec4], Object.getOwnPropertyDescriptor(_obj, "topicPrivateMessage"), _obj), _applyDecoratedDescriptor(_obj, "topicPinned", [_dec5], Object.getOwnPropertyDescriptor(_obj, "topicPinned"), _obj), _applyDecoratedDescriptor(_obj, "topicUnpinned", [_dec6], Object.getOwnPropertyDescriptor(_obj, "topicUnpinned"), _obj), _applyDecoratedDescriptor(_obj, "topicInvisible", [_dec7], Object.getOwnPropertyDescriptor(_obj, "topicInvisible"), _obj)), _obj))));
  _exports.default = _default;
});
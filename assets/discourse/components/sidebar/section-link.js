define("discourse/components/sidebar/section-link", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service"], function (_exports, _component, _templateFactory, _component2, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.shouldDisplay}}
    <li
      class="sidebar-section-link-wrapper"
      {{did-insert this.didInsert this.args}}
    >
      {{#if @href}}
        <a
          href={{@href}}
          rel="noopener noreferrer"
          target={{this.target}}
          class={{this.classNames}}
          title={{@title}}
          data-link-name={{@linkName}}
          ...attributes
        >
          <Sidebar::SectionLinkPrefix
            @prefixType={{@prefixType}}
            @prefixValue={{@prefixValue}}
            @prefixCSSClass={{@prefixCSSClass}}
            @prefixColor={{this.prefixColor}}
            @prefixElementColors={{this.prefixElementColors}}
            @prefixBadge={{@prefixBadge}}
          />
  
          <span class="sidebar-section-link-content-text">
            {{@content}}
          </span>
        </a>
      {{else}}
        <LinkTo
          class={{this.classNames}}
          @route={{@route}}
          @query={{or @query (hash)}}
          @models={{this.models}}
          @current-when={{@currentWhen}}
          title={{@title}}
          data-link-name={{@linkName}}
          ...attributes
        >
  
          <Sidebar::SectionLinkPrefix
            @prefixType={{@prefixType}}
            @prefixValue={{@prefixValue}}
            @prefixCSSClass={{@prefixCSSClass}}
            @prefixColor={{this.prefixColor}}
            @prefixElementColors={{this.prefixElementColors}}
            @prefixBadge={{@prefixBadge}}
          />
  
          <span
            class={{concat-class
              "sidebar-section-link-content-text"
              @contentCSSClass
            }}
          >
            {{@content}}
          </span>
  
          {{#if @badgeText}}
            <span class="sidebar-section-link-content-badge">
              {{@badgeText}}
            </span>
          {{/if}}
  
          {{#if @suffixValue}}
            <span
              class={{concat-class
                "sidebar-section-link-suffix"
                @suffixType
                @suffixCSSClass
              }}
            >
              {{#if (eq @suffixType "icon")}}
                {{d-icon @suffixValue}}
              {{/if}}
            </span>
          {{/if}}
  
          {{#if @hoverValue}}
            <span class="sidebar-section-link-hover">
              <button
                type="button"
                title={{@hoverTitle}}
                class="sidebar-section-hover-button"
                {{on "click" @hoverAction}}
              >
                {{#if (eq @hoverType "icon")}}
                  {{d-icon @hoverValue class="hover-icon"}}
                {{/if}}
              </button>
            </span>
          {{/if}}
        </LinkTo>
      {{/if}}
    </li>
  {{/if}}
  */
  {
    "id": "OO0/OgTw",
    "block": "[[[41,[30,0,[\"shouldDisplay\"]],[[[1,\"  \"],[11,\"li\"],[24,0,\"sidebar-section-link-wrapper\"],[4,[38,1],[[30,0,[\"didInsert\"]],[30,0,[\"args\"]]],null],[12],[1,\"\\n\"],[41,[30,1],[[[1,\"      \"],[11,3],[16,6,[30,1]],[24,\"rel\",\"noopener noreferrer\"],[16,\"target\",[30,0,[\"target\"]]],[16,0,[30,0,[\"classNames\"]]],[16,\"title\",[30,2]],[16,\"data-link-name\",[30,3]],[17,4],[12],[1,\"\\n        \"],[8,[39,2],null,[[\"@prefixType\",\"@prefixValue\",\"@prefixCSSClass\",\"@prefixColor\",\"@prefixElementColors\",\"@prefixBadge\"],[[30,5],[30,6],[30,7],[30,0,[\"prefixColor\"]],[30,0,[\"prefixElementColors\"]],[30,8]]],null],[1,\"\\n\\n        \"],[10,1],[14,0,\"sidebar-section-link-content-text\"],[12],[1,\"\\n          \"],[1,[30,9]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[8,[39,3],[[16,0,[30,0,[\"classNames\"]]],[16,\"title\",[30,2]],[16,\"data-link-name\",[30,3]],[17,4]],[[\"@route\",\"@query\",\"@models\",\"@current-when\"],[[30,10],[28,[37,4],[[30,11],[28,[37,5],null,null]],null],[30,0,[\"models\"]],[30,12]]],[[\"default\"],[[[[1,\"\\n\\n        \"],[8,[39,2],null,[[\"@prefixType\",\"@prefixValue\",\"@prefixCSSClass\",\"@prefixColor\",\"@prefixElementColors\",\"@prefixBadge\"],[[30,5],[30,6],[30,7],[30,0,[\"prefixColor\"]],[30,0,[\"prefixElementColors\"]],[30,8]]],null],[1,\"\\n\\n        \"],[10,1],[15,0,[28,[37,6],[\"sidebar-section-link-content-text\",[30,13]],null]],[12],[1,\"\\n          \"],[1,[30,9]],[1,\"\\n        \"],[13],[1,\"\\n\\n\"],[41,[30,14],[[[1,\"          \"],[10,1],[14,0,\"sidebar-section-link-content-badge\"],[12],[1,\"\\n            \"],[1,[30,14]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,15],[[[1,\"          \"],[10,1],[15,0,[28,[37,6],[\"sidebar-section-link-suffix\",[30,16],[30,17]],null]],[12],[1,\"\\n\"],[41,[28,[37,7],[[30,16],\"icon\"],null],[[[1,\"              \"],[1,[28,[35,8],[[30,15]],null]],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,18],[[[1,\"          \"],[10,1],[14,0,\"sidebar-section-link-hover\"],[12],[1,\"\\n            \"],[11,\"button\"],[16,\"title\",[30,19]],[24,0,\"sidebar-section-hover-button\"],[24,4,\"button\"],[4,[38,9],[\"click\",[30,20]],null],[12],[1,\"\\n\"],[41,[28,[37,7],[[30,21],\"icon\"],null],[[[1,\"                \"],[1,[28,[35,8],[[30,18]],[[\"class\"],[\"hover-icon\"]]]],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"]],[]]]]],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"]],[]],null]],[\"@href\",\"@title\",\"@linkName\",\"&attrs\",\"@prefixType\",\"@prefixValue\",\"@prefixCSSClass\",\"@prefixBadge\",\"@content\",\"@route\",\"@query\",\"@currentWhen\",\"@contentCSSClass\",\"@badgeText\",\"@suffixValue\",\"@suffixType\",\"@suffixCSSClass\",\"@hoverValue\",\"@hoverTitle\",\"@hoverAction\",\"@hoverType\"],false,[\"if\",\"did-insert\",\"sidebar/section-link-prefix\",\"link-to\",\"or\",\"hash\",\"concat-class\",\"eq\",\"d-icon\",\"on\"]]",
    "moduleName": "discourse/components/sidebar/section-link.hbs",
    "isStrictMode": false
  });
  let SectionLink = (_class = class SectionLink extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "currentUser", _descriptor, this);
    }
    willDestroy() {
      if (this.args.willDestroy) {
        this.args.willDestroy();
      }
    }
    didInsert(_element, _ref) {
      let [args] = _ref;
      if (args.didInsert) {
        args.didInsert();
      }
    }
    get shouldDisplay() {
      if (this.args.shouldDisplay === undefined) {
        return true;
      }
      return this.args.shouldDisplay;
    }
    get classNames() {
      let classNames = ["sidebar-section-link", "sidebar-row"];
      if (this.args.class) {
        classNames.push(this.args.class);
      }
      return classNames.join(" ");
    }
    get target() {
      return this.currentUser?.user_option?.external_links_in_new_tab ? "_blank" : "_self";
    }
    get models() {
      if (this.args.model) {
        return [this.args.model];
      }
      if (this.args.models) {
        return this.args.models;
      }
      return [];
    }
    get prefixColor() {
      const color = this.args.prefixColor;
      if (!color || !color.match(/^\w{6}$/)) {
        return "";
      }
      return "#" + color;
    }
    get prefixElementColors() {
      if (!this.args.prefixElementColors) {
        return;
      }
      const prefixElementColors = this.args.prefixElementColors.filter(color => color?.slice(0, 6));
      if (prefixElementColors.length === 1) {
        prefixElementColors.push(prefixElementColors[0]);
      }
      return prefixElementColors.map(color => `#${color} 50%`).join(", ");
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = SectionLink;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SectionLink);
});
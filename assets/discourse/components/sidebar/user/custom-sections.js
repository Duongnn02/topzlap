define("discourse/components/sidebar/user/custom-sections", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse/components/sidebar/user/section"], function (_exports, _component, _templateFactory, _component2, _service, _ajax, _decorators, _section) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2, _descriptor3;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse/components/sidebar/user/section"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="sidebar-custom-sections">
    {{#each this.sections as |section|}}
      <Sidebar::Section
        @sectionName={{section.slug}}
        @headerLinkText={{section.decoratedTitle}}
        @collapsable={{true}}
        @headerActions={{section.headerActions}}
        @headerActionsIcon="pencil-alt"
        @class={{section.dragCss}}
      >
        {{#each section.links as |link|}}
          {{#if link.external}}
            <Sidebar::SectionLink
              @linkName={{link.name}}
              @content={{replace-emoji link.name}}
              @prefixType="icon"
              @prefixValue={{link.icon}}
              @href={{link.value}}
              @class={{link.linkDragCss}}
              {{draggable
                didStartDrag=link.didStartDrag
                didEndDrag=link.didEndDrag
                dragMove=link.dragMove
              }}
            />
          {{else}}
            <Sidebar::SectionLink
              @linkName={{link.name}}
              @route={{link.route}}
              @models={{link.models}}
              @query={{link.query}}
              @content={{replace-emoji link.name}}
              @prefixType="icon"
              @prefixValue={{link.icon}}
              @class={{link.linkDragCss}}
              {{draggable
                didStartDrag=link.didStartDrag
                didEndDrag=link.didEndDrag
                dragMove=link.dragMove
              }}
            />
          {{/if}}
        {{/each}}
      </Sidebar::Section>
    {{/each}}
  </div>
  */
  {
    "id": "W9xt7nbC",
    "block": "[[[10,0],[14,0,\"sidebar-custom-sections\"],[12],[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,0,[\"sections\"]]],null]],null],null,[[[1,\"    \"],[8,[39,2],null,[[\"@sectionName\",\"@headerLinkText\",\"@collapsable\",\"@headerActions\",\"@headerActionsIcon\",\"@class\"],[[30,1,[\"slug\"]],[30,1,[\"decoratedTitle\"]],true,[30,1,[\"headerActions\"]],\"pencil-alt\",[30,1,[\"dragCss\"]]]],[[\"default\"],[[[[1,\"\\n\"],[42,[28,[37,1],[[28,[37,1],[[30,1,[\"links\"]]],null]],null],null,[[[41,[30,2,[\"external\"]],[[[1,\"          \"],[8,[39,4],[[4,[38,6],null,[[\"didStartDrag\",\"didEndDrag\",\"dragMove\"],[[30,2,[\"didStartDrag\"]],[30,2,[\"didEndDrag\"]],[30,2,[\"dragMove\"]]]]]],[[\"@linkName\",\"@content\",\"@prefixType\",\"@prefixValue\",\"@href\",\"@class\"],[[30,2,[\"name\"]],[28,[37,5],[[30,2,[\"name\"]]],null],\"icon\",[30,2,[\"icon\"]],[30,2,[\"value\"]],[30,2,[\"linkDragCss\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"          \"],[8,[39,4],[[4,[38,6],null,[[\"didStartDrag\",\"didEndDrag\",\"dragMove\"],[[30,2,[\"didStartDrag\"]],[30,2,[\"didEndDrag\"]],[30,2,[\"dragMove\"]]]]]],[[\"@linkName\",\"@route\",\"@models\",\"@query\",\"@content\",\"@prefixType\",\"@prefixValue\",\"@class\"],[[30,2,[\"name\"]],[30,2,[\"route\"]],[30,2,[\"models\"]],[30,2,[\"query\"]],[28,[37,5],[[30,2,[\"name\"]]],null],\"icon\",[30,2,[\"icon\"]],[30,2,[\"linkDragCss\"]]]],null],[1,\"\\n\"]],[]]]],[2]],null],[1,\"    \"]],[]]]]],[1,\"\\n\"]],[1]],null],[13]],[\"section\",\"link\"],false,[\"each\",\"-track-array\",\"sidebar/section\",\"if\",\"sidebar/section-link\",\"replace-emoji\",\"draggable\"]]",
    "moduleName": "discourse/components/sidebar/user/custom-sections.hbs",
    "isStrictMode": false
  });
  let SidebarUserCustomSections = (_class = class SidebarUserCustomSections extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "currentUser", _descriptor, this);
      _initializerDefineProperty(this, "router", _descriptor2, this);
      _initializerDefineProperty(this, "messageBus", _descriptor3, this);
      this.messageBus.subscribe("/refresh-sidebar-sections", this._refresh);
    }
    willDestroy() {
      this.messageBus.unsubscribe("/refresh-sidebar-sections");
    }
    get sections() {
      return this.currentUser.sidebarSections.map(section => {
        return new _section.default({
          section,
          currentUser: this.currentUser,
          router: this.router
        });
      });
    }
    _refresh() {
      return (0, _ajax.ajax)("/sidebar_sections.json", {}).then(json => {
        this.currentUser.set("sidebar_sections", json.sidebar_sections);
      });
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "currentUser", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "router", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, "messageBus", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class.prototype, "_refresh", [_decorators.bind], Object.getOwnPropertyDescriptor(_class.prototype, "_refresh"), _class.prototype)), _class);
  _exports.default = SidebarUserCustomSections;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, SidebarUserCustomSections);
});
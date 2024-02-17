define("discourse/plugins/discourse-lazy-videos/discourse/components/lazy-video", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/object", "@glimmer/tracking", "@ember/template"], function (_exports, _component, _templateFactory, _component2, _object, _tracking, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/object",0,"@glimmer/tracking",0,"@ember/template"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div
    class={{concat-class
      "lazy-video-container"
      (concat @videoAttributes.providerName "-onebox")
      (if this.isLoaded "video-loaded")
    }}
    data-video-id={{@videoAttributes.id}}
    data-video-title={{@videoAttributes.title}}
    data-video-start-time={{@videoAttributes.startTime}}
    data-provider-name={{@videoAttributes.providerName}}
  >
    {{#if this.isLoaded}}
      <LazyIframe
        @providerName={{@videoAttributes.providerName}}
        @title={{@videoAttributes.title}}
        @videoId={{@videoAttributes.id}}
        @startTime={{@videoAttributes.startTime}}
      />
    {{else}}
      <div
        class={{concat-class "video-thumbnail" @videoAttributes.providerName}}
        tabindex="0"
        style={{this.thumbnailStyle}}
        {{on "click" this.loadEmbed}}
        {{on "keypress" this.loadEmbed}}
      >
        <img
          class={{concat @videoAttributes.providerName "-thumbnail"}}
          src={{@videoAttributes.thumbnail}}
          title={{@videoAttributes.title}}
          loading="lazy"
        />
        <div
          class={{concat-class
            "icon"
            (concat @videoAttributes.providerName "-icon")
          }}
        ></div>
      </div>
      <div class="title-container">
        <div class="title-wrapper">
          <a
            target="_blank"
            rel="noopener noreferrer"
            class="title-link"
            href={{@videoAttributes.url}}
            title={{@videoAttributes.title}}
          >
            {{@videoAttributes.title}}
          </a>
        </div>
      </div>
    {{/if}}
  </div>
  */
  {
    "id": "5+HCJd+d",
    "block": "[[[10,0],[15,0,[28,[37,0],[\"lazy-video-container\",[28,[37,1],[[30,1,[\"providerName\"]],\"-onebox\"],null],[52,[30,0,[\"isLoaded\"]],\"video-loaded\"]],null]],[15,\"data-video-id\",[30,1,[\"id\"]]],[15,\"data-video-title\",[30,1,[\"title\"]]],[15,\"data-video-start-time\",[30,1,[\"startTime\"]]],[15,\"data-provider-name\",[30,1,[\"providerName\"]]],[12],[1,\"\\n\"],[41,[30,0,[\"isLoaded\"]],[[[1,\"    \"],[8,[39,3],null,[[\"@providerName\",\"@title\",\"@videoId\",\"@startTime\"],[[30,1,[\"providerName\"]],[30,1,[\"title\"]],[30,1,[\"id\"]],[30,1,[\"startTime\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"    \"],[11,0],[16,0,[28,[37,0],[\"video-thumbnail\",[30,1,[\"providerName\"]]],null]],[24,\"tabindex\",\"0\"],[16,5,[30,0,[\"thumbnailStyle\"]]],[4,[38,4],[\"click\",[30,0,[\"loadEmbed\"]]],null],[4,[38,4],[\"keypress\",[30,0,[\"loadEmbed\"]]],null],[12],[1,\"\\n      \"],[10,\"img\"],[15,0,[28,[37,1],[[30,1,[\"providerName\"]],\"-thumbnail\"],null]],[15,\"src\",[30,1,[\"thumbnail\"]]],[15,\"title\",[30,1,[\"title\"]]],[14,\"loading\",\"lazy\"],[12],[13],[1,\"\\n      \"],[10,0],[15,0,[28,[37,0],[\"icon\",[28,[37,1],[[30,1,[\"providerName\"]],\"-icon\"],null]],null]],[12],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"title-container\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"title-wrapper\"],[12],[1,\"\\n        \"],[10,3],[14,\"target\",\"_blank\"],[14,\"rel\",\"noopener noreferrer\"],[14,0,\"title-link\"],[15,6,[30,1,[\"url\"]]],[15,\"title\",[30,1,[\"title\"]]],[12],[1,\"\\n          \"],[1,[30,1,[\"title\"]]],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]]],[13]],[\"@videoAttributes\"],false,[\"concat-class\",\"concat\",\"if\",\"lazy-iframe\",\"on\"]]",
    "moduleName": "discourse/plugins/discourse-lazy-videos/discourse/components/lazy-video.hbs",
    "isStrictMode": false
  });
  let LazyVideo = (_class = class LazyVideo extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "isLoaded", _descriptor, this);
    }
    loadEmbed() {
      if (!this.isLoaded) {
        this.isLoaded = true;
        this.args.onLoadedVideo?.();
      }
    }
    onKeyPress(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        this.loadEmbed();
      }
    }
    get thumbnailStyle() {
      const color = this.args.videoAttributes.dominantColor;
      if (color?.match(/^[0-9A-Fa-f]+$/)) {
        return (0, _template.htmlSafe)(`background-color: #${color};`);
      }
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "isLoaded", [_tracking.tracked], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: function () {
      return false;
    }
  }), _applyDecoratedDescriptor(_class.prototype, "loadEmbed", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "loadEmbed"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "onKeyPress", [_object.action], Object.getOwnPropertyDescriptor(_class.prototype, "onKeyPress"), _class.prototype)), _class);
  _exports.default = LazyVideo;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, LazyVideo);
});
define("discourse/plugins/discourse-lazy-videos/discourse/components/lazy-iframe", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component"], function (_exports, _component, _templateFactory, _component2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if @providerName}}
    <iframe
      src={{this.iframeSrc}}
      title={{@title}}
      allowFullScreen
      scrolling="no"
      frameborder="0"
      seamless="seamless"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    ></iframe>
  {{/if}}
  */
  {
    "id": "aRGjz/CC",
    "block": "[[[41,[30,1],[[[1,\"  \"],[10,\"iframe\"],[15,\"src\",[30,0,[\"iframeSrc\"]]],[15,\"title\",[30,2]],[14,\"allowFullScreen\",\"\"],[14,\"scrolling\",\"no\"],[14,\"frameborder\",\"0\"],[14,\"seamless\",\"seamless\"],[14,\"allow\",\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\"],[12],[13],[1,\"\\n\"]],[]],null]],[\"@providerName\",\"@title\"],false,[\"if\"]]",
    "moduleName": "discourse/plugins/discourse-lazy-videos/discourse/components/lazy-iframe.hbs",
    "isStrictMode": false
  });
  class LazyVideo extends _component2.default {
    get iframeSrc() {
      switch (this.args.providerName) {
        case "youtube":
          let url = `https://www.youtube.com/embed/${this.args.videoId}?autoplay=1`;
          if (this.args.startTime > 0) {
            url += `&start=${this.args.startTime}`;
          }
          return url;
        case "vimeo":
          return `https://player.vimeo.com/video/${this.args.videoId}${this.args.videoId.includes("?") ? "&" : "?"}autoplay=1`;
        case "tiktok":
          return `https://www.tiktok.com/embed/v2/${this.args.videoId}`;
      }
    }
  }
  _exports.default = LazyVideo;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, LazyVideo);
});
define("discourse/widgets/post-user-status", ["@ember/template-factory", "discourse/widgets/widget", "discourse/widgets/render-glimmer"], function (_templateFactory, _widget, _renderGlimmer) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/widget",0,"discourse/widgets/render-glimmer",0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  (0, _widget.createWidget)("post-user-status", {
    tagName: "span.user-status-message-wrap",
    html(attrs) {
      return [new _renderGlimmer.default(this, "div", (0, _templateFactory.createTemplateFactory)(
      /*
        <UserStatusMessage @status={{@data.attrs}} />
      */
      {
        "id": "+3SEKifK",
        "block": "[[[8,[39,0],null,[[\"@status\"],[[30,1,[\"attrs\"]]]],null]],[\"@data\"],false,[\"user-status-message\"]]",
        "moduleName": "/var/www/discourse/app/assets/javascripts/discourse/discourse/widgets/post-user-status.js",
        "isStrictMode": false
      }), {
        attrs
      })];
    }
  });
});
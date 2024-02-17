define("discourse/components/share-source", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <DButton
    @action={{action "share" this.source}}
    @class={{concat "btn-default share-" this.source.id}}
    @translatedTitle={{this.source.title}}
    @icon={{if this.source.icon this.source.icon this.source.htmlIcon}}
  />
  */
  {
    "id": "As1cmGYB",
    "block": "[[[8,[39,0],null,[[\"@action\",\"@class\",\"@translatedTitle\",\"@icon\"],[[28,[37,1],[[30,0],\"share\",[30,0,[\"source\"]]],null],[28,[37,2],[\"btn-default share-\",[30,0,[\"source\",\"id\"]]],null],[30,0,[\"source\",\"title\"]],[52,[30,0,[\"source\",\"icon\"]],[30,0,[\"source\",\"icon\"]],[30,0,[\"source\",\"htmlIcon\"]]]]],null]],[],false,[\"d-button\",\"action\",\"concat\",\"if\"]]",
    "moduleName": "discourse/components/share-source.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "",
    actions: {
      share(source) {
        this.action(source);
      }
    }
  }));
  _exports.default = _default;
});
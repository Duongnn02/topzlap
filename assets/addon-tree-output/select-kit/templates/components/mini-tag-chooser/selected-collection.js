define("select-kit/templates/components/mini-tag-chooser/selected-collection", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.tags}}
    <div class="mini-tag-chooser-selected-collection selected-tags">
      {{#each this.tags as |tag|}}
        <DButton
          @translatedTitle={{tag.value}}
          @icon="times"
          @action={{action this.selectKit.deselect}}
          @actionParam={{tag.value}}
          @class={{tag.classNames}}
          @tabindex={{0}}
        >
          {{discourse-tag tag.value noHref=true}}
        </DButton>
      {{/each}}
    </div>
  {{/if}}
  */
  {
    "id": "EgSFv/cV",
    "block": "[[[41,[30,0,[\"tags\"]],[[[1,\"  \"],[10,0],[14,0,\"mini-tag-chooser-selected-collection selected-tags\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,0,[\"tags\"]]],null]],null],null,[[[1,\"      \"],[8,[39,3],null,[[\"@translatedTitle\",\"@icon\",\"@action\",\"@actionParam\",\"@class\",\"@tabindex\"],[[30,1,[\"value\"]],\"times\",[28,[37,4],[[30,0],[30,0,[\"selectKit\",\"deselect\"]]],null],[30,1,[\"value\"]],[30,1,[\"classNames\"]],0]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,5],[[30,1,[\"value\"]]],[[\"noHref\"],[true]]]],[1,\"\\n      \"]],[]]]]],[1,\"\\n\"]],[1]],null],[1,\"  \"],[13],[1,\"\\n\"]],[]],null]],[\"tag\"],false,[\"if\",\"each\",\"-track-array\",\"d-button\",\"action\",\"discourse-tag\"]]",
    "moduleName": "select-kit/templates/components/mini-tag-chooser/selected-collection.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("select-kit/templates/components/single-select", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.selectKit.isHidden}}
    {{component
      this.selectKit.options.headerComponent
      tabindex=this.tabindex
      value=this.value
      selectedContent=this.selectedContent
      selectKit=this.selectKit
      id=(concat this.selectKit.uniqueID "-header")
    }}
  
    <SelectKit::SelectKitBody
      @selectKit={{this.selectKit}}
      @id={{concat this.selectKit.uniqueID "-body"}}
    >
      {{component
        this.selectKit.options.filterComponent
        selectKit=this.selectKit
        id=(concat this.selectKit.uniqueID "-filter")
      }}
  
      {{#if this.selectKit.isLoading}}
        <span class="is-loading">
          {{#if this.site}}
            {{loading-spinner size="small"}}
          {{/if}}
        </span>
      {{else}}
        {{#each this.collections as |collection|}}
          {{component
            (component-for-collection collection.identifier this.selectKit)
            collection=collection
            selectKit=this.selectKit
            value=this.value
          }}
        {{/each}}
  
        {{#if this.selectKit.filter}}
          {{#if this.selectKit.hasNoContent}}
            <span class="no-content" role="alert">
              {{i18n "select_kit.no_content"}}
            </span>
          {{else}}
            <span class="results-count" role="alert">
              {{i18n "select_kit.results_count" count=this.mainCollection.length}}
            </span>
          {{/if}}
        {{/if}}
      {{/if}}
    </SelectKit::SelectKitBody>
  {{/unless}}
  */
  {
    "id": "yAcurnvP",
    "block": "[[[41,[51,[30,0,[\"selectKit\",\"isHidden\"]]],[[[1,\"  \"],[46,[30,0,[\"selectKit\",\"options\",\"headerComponent\"]],null,[[\"tabindex\",\"value\",\"selectedContent\",\"selectKit\",\"id\"],[[30,0,[\"tabindex\"]],[30,0,[\"value\"]],[30,0,[\"selectedContent\"]],[30,0,[\"selectKit\"]],[28,[37,2],[[30,0,[\"selectKit\",\"uniqueID\"]],\"-header\"],null]]],null],[1,\"\\n\\n  \"],[8,[39,3],null,[[\"@selectKit\",\"@id\"],[[30,0,[\"selectKit\"]],[28,[37,2],[[30,0,[\"selectKit\",\"uniqueID\"]],\"-body\"],null]]],[[\"default\"],[[[[1,\"\\n    \"],[46,[30,0,[\"selectKit\",\"options\",\"filterComponent\"]],null,[[\"selectKit\",\"id\"],[[30,0,[\"selectKit\"]],[28,[37,2],[[30,0,[\"selectKit\",\"uniqueID\"]],\"-filter\"],null]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"selectKit\",\"isLoading\"]],[[[1,\"      \"],[10,1],[14,0,\"is-loading\"],[12],[1,\"\\n\"],[41,[30,0,[\"site\"]],[[[1,\"          \"],[1,[28,[35,5],null,[[\"size\"],[\"small\"]]]],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n\"]],[]],[[[42,[28,[37,7],[[28,[37,7],[[30,0,[\"collections\"]]],null]],null],null,[[[1,\"        \"],[46,[28,[37,8],[[30,1,[\"identifier\"]],[30,0,[\"selectKit\"]]],null],null,[[\"collection\",\"selectKit\",\"value\"],[[30,1],[30,0,[\"selectKit\"]],[30,0,[\"value\"]]]],null],[1,\"\\n\"]],[1]],null],[1,\"\\n\"],[41,[30,0,[\"selectKit\",\"filter\"]],[[[41,[30,0,[\"selectKit\",\"hasNoContent\"]],[[[1,\"          \"],[10,1],[14,0,\"no-content\"],[14,\"role\",\"alert\"],[12],[1,\"\\n            \"],[1,[28,[35,9],[\"select_kit.no_content\"],null]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,1],[14,0,\"results-count\"],[14,\"role\",\"alert\"],[12],[1,\"\\n            \"],[1,[28,[35,9],[\"select_kit.results_count\"],[[\"count\"],[[30,0,[\"mainCollection\",\"length\"]]]]]],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]]]],[]],null]],[]]],[1,\"  \"]],[]]]]],[1,\"\\n\"]],[]],null]],[\"collection\"],false,[\"unless\",\"component\",\"concat\",\"select-kit/select-kit-body\",\"if\",\"loading-spinner\",\"each\",\"-track-array\",\"component-for-collection\",\"i18n\"]]",
    "moduleName": "select-kit/templates/components/single-select.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
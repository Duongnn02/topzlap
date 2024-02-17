define("discourse/templates/navigation/filter", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection
    @bodyClass="navigation-filter"
    @class="navigation-container"
    @scrollTop={{false}}
  >
    <div class="topic-query-filter">
      <div class="topic-query-filter__input">
        {{d-icon "filter" class="topic-query-filter__icon"}}
        <Input
          class="topic-query-filter__filter-term"
          @value={{this.queryString}}
          @enter={{action
            this.discoveryFilter.updateTopicsListQueryParams
            this.queryString
          }}
          @type="text"
        />
      </div>
    </div>
  </DSection>
  */
  {
    "id": "jw1PGvKW",
    "block": "[[[8,[39,0],null,[[\"@bodyClass\",\"@class\",\"@scrollTop\"],[\"navigation-filter\",\"navigation-container\",false]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"topic-query-filter\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"topic-query-filter__input\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"filter\"],[[\"class\"],[\"topic-query-filter__icon\"]]]],[1,\"\\n      \"],[8,[39,2],[[24,0,\"topic-query-filter__filter-term\"]],[[\"@value\",\"@enter\",\"@type\"],[[30,0,[\"queryString\"]],[28,[37,3],[[30,0],[30,0,[\"discoveryFilter\",\"updateTopicsListQueryParams\"]],[30,0,[\"queryString\"]]],null],\"text\"]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]]],[],false,[\"d-section\",\"d-icon\",\"input\",\"action\"]]",
    "moduleName": "discourse/templates/navigation/filter.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
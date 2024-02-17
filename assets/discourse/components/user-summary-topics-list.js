define("discourse/components/user-summary-topics-list", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if @items}}
    <ul>
      {{#each @items as |item|}}
        {{yield item}}
      {{/each}}
    </ul>
    {{#if this.hasMore}}
      <p>
        <LinkTo
          @route={{concat "userActivity." @type}}
          @model={{@user}}
          class="more"
        >
          {{i18n (concat "user.summary.more_" @type)}}
        </LinkTo>
      </p>
    {{/if}}
  {{else}}
    <p>{{i18n (concat "user.summary.no_" @type)}}</p>
  {{/if}}
  */
  {
    "id": "0A+RIA2U",
    "block": "[[[41,[30,1],[[[1,\"  \"],[10,\"ul\"],[12],[1,\"\\n\"],[42,[28,[37,2],[[28,[37,2],[[30,1]],null]],null],null,[[[1,\"      \"],[18,5,[[30,2]]],[1,\"\\n\"]],[2]],null],[1,\"  \"],[13],[1,\"\\n\"],[41,[30,0,[\"hasMore\"]],[[[1,\"    \"],[10,2],[12],[1,\"\\n      \"],[8,[39,4],[[24,0,\"more\"]],[[\"@route\",\"@model\"],[[28,[37,5],[\"userActivity.\",[30,3]],null],[30,4]]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,6],[[28,[37,5],[\"user.summary.more_\",[30,3]],null]],null]],[1,\"\\n      \"]],[]]]]],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]],[[[1,\"  \"],[10,2],[12],[1,[28,[35,6],[[28,[37,5],[\"user.summary.no_\",[30,3]],null]],null]],[13],[1,\"\\n\"]],[]]]],[\"@items\",\"item\",\"@type\",\"@user\",\"&default\"],false,[\"if\",\"each\",\"-track-array\",\"yield\",\"link-to\",\"concat\",\"i18n\"]]",
    "moduleName": "discourse/components/user-summary-topics-list.hbs",
    "isStrictMode": false
  });
  // should be kept in sync with 'UserSummary::MAX_SUMMARY_RESULTS'
  const MAX_SUMMARY_RESULTS = 6;
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("items.length"), (_obj = {
    tagName: "",
    hasMore(length) {
      return length >= MAX_SUMMARY_RESULTS;
    }
  }, (_applyDecoratedDescriptor(_obj, "hasMore", [_dec], Object.getOwnPropertyDescriptor(_obj, "hasMore"), _obj)), _obj))));
  _exports.default = _default;
});
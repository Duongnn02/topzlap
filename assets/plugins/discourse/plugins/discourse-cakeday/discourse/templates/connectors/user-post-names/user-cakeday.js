define("discourse/plugins/discourse-cakeday/discourse/templates/connectors/user-post-names/user-cakeday", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if siteSettings.cakeday_birthday_enabled}}
    {{#if isBirthday}}
      {{emoji-images
        list=siteSettings.cakeday_birthday_emoji
        title=birthdayTitle
      }}
    {{/if}}
  {{/if}}
  {{#if siteSettings.cakeday_enabled}}
    {{#if isCakeday}}
      {{emoji-images list=siteSettings.cakeday_emoji title=cakedayTitle}}
    {{/if}}
  {{/if}}
  */
  {
    "id": "ojodDajG",
    "block": "[[[41,[33,1,[\"cakeday_birthday_enabled\"]],[[[41,[33,2],[[[1,\"    \"],[1,[28,[35,3],null,[[\"list\",\"title\"],[[33,1,[\"cakeday_birthday_emoji\"]],[33,4]]]]],[1,\"\\n\"]],[]],null]],[]],null],[41,[33,1,[\"cakeday_enabled\"]],[[[41,[33,5],[[[1,\"    \"],[1,[28,[35,3],null,[[\"list\",\"title\"],[[33,1,[\"cakeday_emoji\"]],[33,6]]]]],[1,\"\\n\"]],[]],null]],[]],null]],[],false,[\"if\",\"siteSettings\",\"isBirthday\",\"emoji-images\",\"birthdayTitle\",\"isCakeday\",\"cakedayTitle\"]]",
    "moduleName": "discourse/plugins/discourse-cakeday/discourse/templates/connectors/user-post-names/user-cakeday.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
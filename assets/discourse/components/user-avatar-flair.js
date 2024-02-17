define("discourse/components/user-avatar-flair", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/avatar-flair", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _avatarFlair, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/lib/avatar-flair",0,"discourse-common/utils/decorators"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.flair}}
    <AvatarFlair
      @flairName={{this.flair.flairName}}
      @flairUrl={{this.flair.flairUrl}}
      @flairBgColor={{this.flair.flairBgColor}}
      @flairColor={{this.flair.flairColor}}
    />
  {{/if}}
  */
  {
    "id": "/5P0TS+t",
    "block": "[[[41,[30,0,[\"flair\"]],[[[1,\"  \"],[8,[39,1],null,[[\"@flairName\",\"@flairUrl\",\"@flairBgColor\",\"@flairColor\"],[[30,0,[\"flair\",\"flairName\"]],[30,0,[\"flair\",\"flairUrl\"]],[30,0,[\"flair\",\"flairBgColor\"]],[30,0,[\"flair\",\"flairColor\"]]]],null],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"avatar-flair\"]]",
    "moduleName": "discourse/components/user-avatar-flair.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("user"), (_obj = {
    tagName: "",
    flair(user) {
      if (!user || !user.flair_group_id) {
        return;
      }
      if (user.flair_url || user.flair_bg_color) {
        return {
          flairName: user.flair_name,
          flairUrl: user.flair_url,
          flairBgColor: user.flair_bg_color,
          flairColor: user.flair_color
        };
      }
      const autoFlairAttrs = (0, _avatarFlair.default)(this.site, user);
      if (autoFlairAttrs) {
        return {
          flairName: autoFlairAttrs.flair_name,
          flairUrl: autoFlairAttrs.flair_url,
          flairBgColor: autoFlairAttrs.flair_bg_color,
          flairColor: autoFlairAttrs.flair_color
        };
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "flair", [_dec], Object.getOwnPropertyDescriptor(_obj, "flair"), _obj)), _obj))));
  _exports.default = _default;
});
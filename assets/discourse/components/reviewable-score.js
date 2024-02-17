define("discourse/components/reviewable-score", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/object/computed"], function (_exports, _component, _templateFactory, _decorators, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse-common/utils/decorators",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <tr class="reviewable-score">
    <td class="user">
      <UserLink @user={{this.rs.user}}>
        {{avatar this.rs.user imageSize="tiny"}}
        {{this.rs.user.username}}
      </UserLink>
    </td>
  
    <td>
      {{format-date this.rs.created_at format="tiny"}}
    </td>
  
    <td>
      {{d-icon this.rs.score_type.icon}}
      {{this.title}}
    </td>
  
    {{#if this.showStatus}}
      <td class="reviewed-by">
        {{#if this.rs.reviewed_by}}
          <UserLink @user={{this.rs.reviewed_by}}>
            {{avatar this.rs.reviewed_by imageSize="tiny"}}
            {{this.rs.reviewed_by.username}}
          </UserLink>
        {{else}}
          &mdash;
        {{/if}}
      </td>
  
      <td>
        {{#if this.rs.reviewed_by}}
          {{format-date this.rs.reviewed_at format="tiny"}}
        {{/if}}
      </td>
  
      <td>
        {{reviewable-status this.rs.status this.reviewable.type}}
      </td>
  
    {{else}}
      <td colspan="4"></td>
    {{/if}}
  </tr>
  */
  {
    "id": "lxHMsd8I",
    "block": "[[[10,\"tr\"],[14,0,\"reviewable-score\"],[12],[1,\"\\n  \"],[10,\"td\"],[14,0,\"user\"],[12],[1,\"\\n    \"],[8,[39,0],null,[[\"@user\"],[[30,0,[\"rs\",\"user\"]]]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,1],[[30,0,[\"rs\",\"user\"]]],[[\"imageSize\"],[\"tiny\"]]]],[1,\"\\n      \"],[1,[30,0,[\"rs\",\"user\",\"username\"]]],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"td\"],[12],[1,\"\\n    \"],[1,[28,[35,2],[[30,0,[\"rs\",\"created_at\"]]],[[\"format\"],[\"tiny\"]]]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"td\"],[12],[1,\"\\n    \"],[1,[28,[35,3],[[30,0,[\"rs\",\"score_type\",\"icon\"]]],null]],[1,\"\\n    \"],[1,[30,0,[\"title\"]]],[1,\"\\n  \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"showStatus\"]],[[[1,\"    \"],[10,\"td\"],[14,0,\"reviewed-by\"],[12],[1,\"\\n\"],[41,[30,0,[\"rs\",\"reviewed_by\"]],[[[1,\"        \"],[8,[39,0],null,[[\"@user\"],[[30,0,[\"rs\",\"reviewed_by\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,1],[[30,0,[\"rs\",\"reviewed_by\"]]],[[\"imageSize\"],[\"tiny\"]]]],[1,\"\\n          \"],[1,[30,0,[\"rs\",\"reviewed_by\",\"username\"]]],[1,\"\\n        \"]],[]]]]],[1,\"\\n\"]],[]],[[[1,\"        —\\n\"]],[]]],[1,\"    \"],[13],[1,\"\\n\\n    \"],[10,\"td\"],[12],[1,\"\\n\"],[41,[30,0,[\"rs\",\"reviewed_by\"]],[[[1,\"        \"],[1,[28,[35,2],[[30,0,[\"rs\",\"reviewed_at\"]]],[[\"format\"],[\"tiny\"]]]],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n    \"],[10,\"td\"],[12],[1,\"\\n      \"],[1,[28,[35,5],[[30,0,[\"rs\",\"status\"]],[30,0,[\"reviewable\",\"type\"]]],null]],[1,\"\\n    \"],[13],[1,\"\\n\\n\"]],[]],[[[1,\"    \"],[10,\"td\"],[14,\"colspan\",\"4\"],[12],[13],[1,\"\\n\"]],[]]],[13]],[],false,[\"user-link\",\"avatar\",\"format-date\",\"d-icon\",\"if\",\"reviewable-status\"]]",
    "moduleName": "discourse/components/reviewable-score.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("rs.score_type.title", "reviewable.target_created_by"), (_obj = {
    tagName: "",
    showStatus: (0, _computed.gt)("rs.status", 0),
    title(title, targetCreatedBy) {
      if (title && targetCreatedBy) {
        return title.replace(/{{username}}|%{username}/, targetCreatedBy.username);
      }
      return title;
    }
  }, (_applyDecoratedDescriptor(_obj, "title", [_dec], Object.getOwnPropertyDescriptor(_obj, "title"), _obj)), _obj))));
  _exports.default = _default;
});
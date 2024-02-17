define("discourse/components/selected-posts", ["exports", "@ember/component", "@ember/template-factory"], function (_exports, _component, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <p>
    <CountI18n
      @key="topic.multi_select.description"
      @count={{this.selectedPostsCount}}
    />
  </p>
  
  {{#if this.canSelectAll}}
    <p>
      <a class="select-all" href {{on "click" this.selectAll}}>
        {{i18n "topic.multi_select.select_all"}}
      </a>
    </p>
  {{/if}}
  
  {{#if this.canDeselectAll}}
    <p>
      <a href {{on "click" this.deselectAll}}>
        {{i18n "topic.multi_select.deselect_all"}}
      </a>
    </p>
  {{/if}}
  
  {{#if this.canDeleteSelected}}
    <DButton
      @action={{this.deleteSelected}}
      @icon="far-trash-alt"
      @label="topic.multi_select.delete"
      @class="btn-danger"
    />
  {{/if}}
  
  {{#if this.canMergeTopic}}
    <DButton
      @action={{route-action "moveToTopic"}}
      @icon="sign-out-alt"
      @label="topic.move_to.action"
      @class="btn-primary move-to-topic"
    />
  {{/if}}
  
  {{#if this.canChangeOwner}}
    <DButton
      @action={{route-action "changeOwner"}}
      @icon="user"
      @label="topic.change_owner.action"
      @class="btn-primary"
    />
  {{/if}}
  
  {{#if this.canMergePosts}}
    <DButton
      @action={{this.mergePosts}}
      @icon="arrows-alt-v"
      @label="topic.merge_posts.action"
      @class="btn-primary"
    />
  {{/if}}
  
  <p class="cancel">
    <a href {{on "click" this.toggleMultiSelect}}>
      {{i18n "topic.multi_select.cancel"}}
    </a>
  </p>
  */
  {
    "id": "dRYpa6qa",
    "block": "[[[10,2],[12],[1,\"\\n  \"],[8,[39,0],null,[[\"@key\",\"@count\"],[\"topic.multi_select.description\",[30,0,[\"selectedPostsCount\"]]]],null],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"canSelectAll\"]],[[[1,\"  \"],[10,2],[12],[1,\"\\n    \"],[11,3],[24,0,\"select-all\"],[24,6,\"\"],[4,[38,2],[\"click\",[30,0,[\"selectAll\"]]],null],[12],[1,\"\\n      \"],[1,[28,[35,3],[\"topic.multi_select.select_all\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canDeselectAll\"]],[[[1,\"  \"],[10,2],[12],[1,\"\\n    \"],[11,3],[24,6,\"\"],[4,[38,2],[\"click\",[30,0,[\"deselectAll\"]]],null],[12],[1,\"\\n      \"],[1,[28,[35,3],[\"topic.multi_select.deselect_all\"],null]],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canDeleteSelected\"]],[[[1,\"  \"],[8,[39,4],null,[[\"@action\",\"@icon\",\"@label\",\"@class\"],[[30,0,[\"deleteSelected\"]],\"far-trash-alt\",\"topic.multi_select.delete\",\"btn-danger\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canMergeTopic\"]],[[[1,\"  \"],[8,[39,4],null,[[\"@action\",\"@icon\",\"@label\",\"@class\"],[[28,[37,5],[\"moveToTopic\"],null],\"sign-out-alt\",\"topic.move_to.action\",\"btn-primary move-to-topic\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canChangeOwner\"]],[[[1,\"  \"],[8,[39,4],null,[[\"@action\",\"@icon\",\"@label\",\"@class\"],[[28,[37,5],[\"changeOwner\"],null],\"user\",\"topic.change_owner.action\",\"btn-primary\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canMergePosts\"]],[[[1,\"  \"],[8,[39,4],null,[[\"@action\",\"@icon\",\"@label\",\"@class\"],[[30,0,[\"mergePosts\"]],\"arrows-alt-v\",\"topic.merge_posts.action\",\"btn-primary\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,2],[14,0,\"cancel\"],[12],[1,\"\\n  \"],[11,3],[24,6,\"\"],[4,[38,2],[\"click\",[30,0,[\"toggleMultiSelect\"]]],null],[12],[1,\"\\n    \"],[1,[28,[35,3],[\"topic.multi_select.cancel\"],null]],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[],false,[\"count-i18n\",\"if\",\"on\",\"i18n\",\"d-button\",\"route-action\"]]",
    "moduleName": "discourse/components/selected-posts.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({}));
  _exports.default = _default;
});
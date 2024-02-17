define("discourse/components/expand-post", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/ajax"], function (_exports, _component, _templateFactory, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#if this.item.truncated}}
    <a
      href
      class={{if this.expanded "collapse-item" "expand-item"}}
      onclick={{action "toggleItem"}}
      title={{i18n "post.expand_collapse"}}
    >
      {{#if this.expanded}}
        {{d-icon "chevron-up"}}
      {{else}}
        {{d-icon "chevron-down"}}
      {{/if}}
    </a>
  {{/if}}
  */
  {
    "id": "ySzYa6KQ",
    "block": "[[[41,[30,0,[\"item\",\"truncated\"]],[[[1,\"  \"],[10,3],[14,6,\"\"],[15,0,[52,[30,0,[\"expanded\"]],\"collapse-item\",\"expand-item\"]],[15,\"onclick\",[28,[37,1],[[30,0],\"toggleItem\"],null]],[15,\"title\",[28,[37,2],[\"post.expand_collapse\"],null]],[12],[1,\"\\n\"],[41,[30,0,[\"expanded\"]],[[[1,\"      \"],[1,[28,[35,3],[\"chevron-up\"],null]],[1,\"\\n\"]],[]],[[[1,\"      \"],[1,[28,[35,3],[\"chevron-down\"],null]],[1,\"\\n\"]],[]]],[1,\"  \"],[13],[1,\"\\n\"]],[]],null]],[],false,[\"if\",\"action\",\"i18n\",\"d-icon\"]]",
    "moduleName": "discourse/components/expand-post.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend({
    tagName: "",
    expanded: null,
    _loading: false,
    actions: {
      toggleItem() {
        if (this._loading) {
          return false;
        }
        const item = this.item;
        if (this.expanded) {
          this.set("expanded", false);
          item.set("expandedExcerpt", null);
          return false;
        }
        const topicId = item.get("topic_id");
        const postNumber = item.get("post_number");
        this._loading = true;
        (0, _ajax.ajax)(`/posts/by_number/${topicId}/${postNumber}.json`).then(result => {
          this.set("expanded", true);
          item.set("expandedExcerpt", result.cooked);
        }).finally(() => this._loading = false);
        return false;
      }
    }
  }));
  _exports.default = _default;
});
define("discourse/templates/selected-posts", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <SelectedPosts
    @selectedPostsCount={{this.selectedPostsCount}}
    @canSelectAll={{this.canSelectAll}}
    @canDeselectAll={{this.canDeselectAll}}
    @canDeleteSelected={{this.canDeleteSelected}}
    @canMergeTopic={{this.canMergeTopic}}
    @canChangeOwner={{this.canChangeOwner}}
    @canMergePosts={{this.canMergePosts}}
    @toggleMultiSelect={{action "toggleMultiSelect"}}
    @mergePosts={{action "mergePosts"}}
    @deleteSelected={{action "deleteSelected"}}
    @deselectAll={{action "deselectAll"}}
    @selectAll={{action "selectAll"}}
  />
  */
  {
    "id": "bJwEhhN1",
    "block": "[[[8,[39,0],null,[[\"@selectedPostsCount\",\"@canSelectAll\",\"@canDeselectAll\",\"@canDeleteSelected\",\"@canMergeTopic\",\"@canChangeOwner\",\"@canMergePosts\",\"@toggleMultiSelect\",\"@mergePosts\",\"@deleteSelected\",\"@deselectAll\",\"@selectAll\"],[[30,0,[\"selectedPostsCount\"]],[30,0,[\"canSelectAll\"]],[30,0,[\"canDeselectAll\"]],[30,0,[\"canDeleteSelected\"]],[30,0,[\"canMergeTopic\"]],[30,0,[\"canChangeOwner\"]],[30,0,[\"canMergePosts\"]],[28,[37,1],[[30,0],\"toggleMultiSelect\"],null],[28,[37,1],[[30,0],\"mergePosts\"],null],[28,[37,1],[[30,0],\"deleteSelected\"],null],[28,[37,1],[[30,0],\"deselectAll\"],null],[28,[37,1],[[30,0],\"selectAll\"],null]]],null]],[],false,[\"selected-posts\",\"action\"]]",
    "moduleName": "discourse/templates/selected-posts.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
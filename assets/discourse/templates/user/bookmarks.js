define("discourse/templates/user/bookmarks", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <ConditionalLoadingSpinner @condition={{this.loading}}>
    {{#if this.permissionDenied}}
      <div class="alert alert-info">{{i18n
          "bookmarks.list_permission_denied"
        }}</div>
    {{else if this.userDoesNotHaveBookmarks}}
      <EmptyState
        @title={{i18n "user.no_bookmarks_title"}}
        @body={{this.emptyStateBody}}
      />
    {{else}}
      <div class="inline-form full-width bookmark-search-form">
        <Input
          @type="text"
          @value={{this.searchTerm}}
          placeholder={{i18n "bookmarks.search_placeholder"}}
          @enter={{action "search"}}
          id="bookmark-search"
          autocomplete="off"
        />
        <DButton
          @class="btn-primary"
          @action={{action "search"}}
          @type="button"
          @icon="search"
        />
      </div>
      {{#if this.nothingFound}}
        <div class="alert alert-info">{{i18n "user.no_bookmarks_search"}}</div>
      {{else}}
        <BookmarkList
          @loadMore={{action "loadMore"}}
          @reload={{action "reload"}}
          @loadingMore={{this.loadingMore}}
          @content={{this.model.bookmarks}}
        />
      {{/if}}
    {{/if}}
  </ConditionalLoadingSpinner>
  */
  {
    "id": "w54p9h7w",
    "block": "[[[8,[39,0],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"permissionDenied\"]],[[[1,\"    \"],[10,0],[14,0,\"alert alert-info\"],[12],[1,[28,[35,2],[\"bookmarks.list_permission_denied\"],null]],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"userDoesNotHaveBookmarks\"]],[[[1,\"    \"],[8,[39,3],null,[[\"@title\",\"@body\"],[[28,[37,2],[\"user.no_bookmarks_title\"],null],[30,0,[\"emptyStateBody\"]]]],null],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"inline-form full-width bookmark-search-form\"],[12],[1,\"\\n      \"],[8,[39,4],[[16,\"placeholder\",[28,[37,2],[\"bookmarks.search_placeholder\"],null]],[24,1,\"bookmark-search\"],[24,\"autocomplete\",\"off\"]],[[\"@type\",\"@value\",\"@enter\"],[\"text\",[30,0,[\"searchTerm\"]],[28,[37,5],[[30,0],\"search\"],null]]],null],[1,\"\\n      \"],[8,[39,6],null,[[\"@class\",\"@action\",\"@type\",\"@icon\"],[\"btn-primary\",[28,[37,5],[[30,0],\"search\"],null],\"button\",\"search\"]],null],[1,\"\\n    \"],[13],[1,\"\\n\"],[41,[30,0,[\"nothingFound\"]],[[[1,\"      \"],[10,0],[14,0,\"alert alert-info\"],[12],[1,[28,[35,2],[\"user.no_bookmarks_search\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[8,[39,7],null,[[\"@loadMore\",\"@reload\",\"@loadingMore\",\"@content\"],[[28,[37,5],[[30,0],\"loadMore\"],null],[28,[37,5],[[30,0],\"reload\"],null],[30,0,[\"loadingMore\"]],[30,0,[\"model\",\"bookmarks\"]]]],null],[1,\"\\n\"]],[]]],[1,\"  \"]],[]]]],[]]]],[]]]]]],[],false,[\"conditional-loading-spinner\",\"if\",\"i18n\",\"empty-state\",\"input\",\"action\",\"d-button\",\"bookmark-list\"]]",
    "moduleName": "discourse/templates/user/bookmarks.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
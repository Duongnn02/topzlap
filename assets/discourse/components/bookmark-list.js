define("discourse/components/bookmark-list", ["exports", "@ember/component", "@ember/template-factory", "@ember/object", "@ember/runloop", "discourse/controllers/bookmark", "discourse/lib/ajax", "discourse/lib/click-track", "discourse/mixins/scrolling", "I18n", "rsvp", "@ember/service"], function (_exports, _component, _templateFactory, _object, _runloop, _bookmark, _ajax, _clickTrack, _scrolling, _I18n, _rsvp, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"@ember/object",0,"@ember/runloop",0,"discourse/controllers/bookmark",0,"discourse/lib/ajax",0,"discourse/lib/click-track",0,"discourse/mixins/scrolling",0,"I18n",0,"rsvp",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <ConditionalLoadingSpinner @condition={{this.loading}}>
    <LoadMore
      @selector=".bookmark-list .bookmark-list-item"
      @action={{this.loadMore}}
    >
      <table class="topic-list bookmark-list">
        <thead class="topic-list-header">
          {{#unless this.site.mobileView}}
            <th class="topic-list-data">{{i18n "topic.title"}}</th>
            <th class="topic-list-data">&nbsp;</th>
            <th class="post-metadata topic-list-data">{{i18n
                "post.bookmarks.updated"
              }}</th>
            <th class="post-metadata topic-list-data">{{i18n "activity"}}</th>
            <th>&nbsp;</th>
          {{/unless}}
        </thead>
        <tbody class="topic-list-body">
          {{#each this.content as |bookmark|}}
            <tr class="topic-list-item bookmark-list-item">
              <th scope="row" class="main-link topic-list-data">
                <span class="link-top-line">
                  <div class="bookmark-metadata">
                    {{#if bookmark.reminder_at}}
                      <span
                        class="bookmark-metadata-item bookmark-reminder
                          {{if
                            bookmark.reminderAtExpired
                            'bookmark-expired-reminder'
                          }}"
                      >
                        {{d-icon "far-clock"}}{{bookmark.formattedReminder}}
                      </span>
                    {{/if}}
                    {{#if bookmark.name}}
                      <span class="bookmark-metadata-item">
                        {{d-icon "info-circle"}}<span>{{bookmark.name}}</span>
                      </span>
                    {{/if}}
                  </div>
                  <div class="bookmark-status-with-link">
                    {{#if bookmark.pinned}}
                      {{d-icon "thumbtack" class="bookmark-pinned"}}
                    {{/if}}
                    {{#if bookmark.bookmarkableTopicAlike}}
                      <TopicStatus @topic={{bookmark.topicStatus}} />
                      {{topic-link bookmark.topicForList}}
                    {{else}}
                      <a
                        href={{bookmark.bookmarkable_url}}
                        role="heading"
                        aria-level="2"
                        class="title"
                        data-topic-id="${topic.id}"
                      >
                        {{bookmark.fancy_title}}
                      </a>
                    {{/if}}
                  </div>
                </span>
                {{#if bookmark.bookmarkableTopicAlike}}
                  <div class="link-bottom-line">
                    {{category-link bookmark.category}}
                    {{discourse-tags
                      bookmark
                      mode="list"
                      tagsForUser=this.tagsForUser
                    }}
                  </div>
                {{/if}}
                {{#if
                  (and
                    this.site.mobileView
                    bookmark.excerpt
                    bookmark.user.avatar_template
                  )
                }}
                  <a
                    href={{bookmark.bookmarkableUser.path}}
                    data-user-card={{bookmark.user.username}}
                    class="avatar"
                  >
                    {{avatar
                      bookmark.bookmarkableUser
                      avatarTemplatePath="avatar_template"
                      usernamePath="username"
                      namePath="name"
                      imageSize="small"
                    }}
                  </a>
                {{/if}}
                {{! template-lint-disable }}
                <p
                  class="post-excerpt"
                  {{on "click" this.screenExcerptForExternalLink}}
                >{{html-safe bookmark.excerpt}}</p>
              </th>
              {{#unless this.site.mobileView}}
                <td class="topic-list-data">
                  {{#if bookmark.user.avatar_template}}
                    <a
                      href={{bookmark.user.path}}
                      data-user-card={{bookmark.user.username}}
                      class="avatar"
                    >
                      {{avatar
                        bookmark.user
                        avatarTemplatePath="avatar_template"
                        usernamePath="username"
                        namePath="name"
                        imageSize="small"
                      }}
                    </a>
                  {{/if}}
                </td>
                <td class="post-metadata topic-list-data">{{format-date
                    bookmark.updated_at
                    format="tiny"
                  }}</td>
                {{raw
                  "list/activity-column"
                  topic=bookmark
                  class="num post-metadata"
                  tagName="td"
                }}
              {{/unless}}
              <td class="topic-list-data">
                <BookmarkActionsDropdown
                  @bookmark={{bookmark}}
                  @removeBookmark={{action "removeBookmark"}}
                  @editBookmark={{action "editBookmark"}}
                  @clearBookmarkReminder={{action "clearBookmarkReminder"}}
                  @togglePinBookmark={{action "togglePinBookmark"}}
                />
              </td>
            </tr>
          {{/each}}
        </tbody>
      </table>
      <ConditionalLoadingSpinner @condition={{this.loadingMore}} />
    </LoadMore>
  </ConditionalLoadingSpinner>
  */
  {
    "id": "UUY4EkpS",
    "block": "[[[8,[39,0],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@selector\",\"@action\"],[\".bookmark-list .bookmark-list-item\",[30,0,[\"loadMore\"]]]],[[\"default\"],[[[[1,\"\\n    \"],[10,\"table\"],[14,0,\"topic-list bookmark-list\"],[12],[1,\"\\n      \"],[10,\"thead\"],[14,0,\"topic-list-header\"],[12],[1,\"\\n\"],[41,[51,[30,0,[\"site\",\"mobileView\"]]],[[[1,\"          \"],[10,\"th\"],[14,0,\"topic-list-data\"],[12],[1,[28,[35,3],[\"topic.title\"],null]],[13],[1,\"\\n          \"],[10,\"th\"],[14,0,\"topic-list-data\"],[12],[1,\" \"],[13],[1,\"\\n          \"],[10,\"th\"],[14,0,\"post-metadata topic-list-data\"],[12],[1,[28,[35,3],[\"post.bookmarks.updated\"],null]],[13],[1,\"\\n          \"],[10,\"th\"],[14,0,\"post-metadata topic-list-data\"],[12],[1,[28,[35,3],[\"activity\"],null]],[13],[1,\"\\n          \"],[10,\"th\"],[12],[1,\" \"],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n      \"],[10,\"tbody\"],[14,0,\"topic-list-body\"],[12],[1,\"\\n\"],[42,[28,[37,5],[[28,[37,5],[[30,0,[\"content\"]]],null]],null],null,[[[1,\"          \"],[10,\"tr\"],[14,0,\"topic-list-item bookmark-list-item\"],[12],[1,\"\\n            \"],[10,\"th\"],[14,\"scope\",\"row\"],[14,0,\"main-link topic-list-data\"],[12],[1,\"\\n              \"],[10,1],[14,0,\"link-top-line\"],[12],[1,\"\\n                \"],[10,0],[14,0,\"bookmark-metadata\"],[12],[1,\"\\n\"],[41,[30,1,[\"reminder_at\"]],[[[1,\"                    \"],[10,1],[15,0,[29,[\"bookmark-metadata-item bookmark-reminder\\n                        \",[52,[30,1,[\"reminderAtExpired\"]],\"bookmark-expired-reminder\"]]]],[12],[1,\"\\n                      \"],[1,[28,[35,7],[\"far-clock\"],null]],[1,[30,1,[\"formattedReminder\"]]],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[]],null],[41,[30,1,[\"name\"]],[[[1,\"                    \"],[10,1],[14,0,\"bookmark-metadata-item\"],[12],[1,\"\\n                      \"],[1,[28,[35,7],[\"info-circle\"],null]],[10,1],[12],[1,[30,1,[\"name\"]]],[13],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[]],null],[1,\"                \"],[13],[1,\"\\n                \"],[10,0],[14,0,\"bookmark-status-with-link\"],[12],[1,\"\\n\"],[41,[30,1,[\"pinned\"]],[[[1,\"                    \"],[1,[28,[35,7],[\"thumbtack\"],[[\"class\"],[\"bookmark-pinned\"]]]],[1,\"\\n\"]],[]],null],[41,[30,1,[\"bookmarkableTopicAlike\"]],[[[1,\"                    \"],[8,[39,8],null,[[\"@topic\"],[[30,1,[\"topicStatus\"]]]],null],[1,\"\\n                    \"],[1,[28,[35,9],[[30,1,[\"topicForList\"]]],null]],[1,\"\\n\"]],[]],[[[1,\"                    \"],[10,3],[15,6,[30,1,[\"bookmarkable_url\"]]],[14,\"role\",\"heading\"],[14,\"aria-level\",\"2\"],[14,0,\"title\"],[14,\"data-topic-id\",\"${topic.id}\"],[12],[1,\"\\n                      \"],[1,[30,1,[\"fancy_title\"]]],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[]]],[1,\"                \"],[13],[1,\"\\n              \"],[13],[1,\"\\n\"],[41,[30,1,[\"bookmarkableTopicAlike\"]],[[[1,\"                \"],[10,0],[14,0,\"link-bottom-line\"],[12],[1,\"\\n                  \"],[1,[28,[35,10],[[30,1,[\"category\"]]],null]],[1,\"\\n                  \"],[1,[28,[35,11],[[30,1]],[[\"mode\",\"tagsForUser\"],[\"list\",[30,0,[\"tagsForUser\"]]]]]],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[41,[28,[37,12],[[30,0,[\"site\",\"mobileView\"]],[30,1,[\"excerpt\"]],[30,1,[\"user\",\"avatar_template\"]]],null],[[[1,\"                \"],[10,3],[15,6,[30,1,[\"bookmarkableUser\",\"path\"]]],[15,\"data-user-card\",[30,1,[\"user\",\"username\"]]],[14,0,\"avatar\"],[12],[1,\"\\n                  \"],[1,[28,[35,13],[[30,1,[\"bookmarkableUser\"]]],[[\"avatarTemplatePath\",\"usernamePath\",\"namePath\",\"imageSize\"],[\"avatar_template\",\"username\",\"name\",\"small\"]]]],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"              \"],[11,2],[24,0,\"post-excerpt\"],[4,[38,14],[\"click\",[30,0,[\"screenExcerptForExternalLink\"]]],null],[12],[1,[28,[35,15],[[30,1,[\"excerpt\"]]],null]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"],[41,[51,[30,0,[\"site\",\"mobileView\"]]],[[[1,\"              \"],[10,\"td\"],[14,0,\"topic-list-data\"],[12],[1,\"\\n\"],[41,[30,1,[\"user\",\"avatar_template\"]],[[[1,\"                  \"],[10,3],[15,6,[30,1,[\"user\",\"path\"]]],[15,\"data-user-card\",[30,1,[\"user\",\"username\"]]],[14,0,\"avatar\"],[12],[1,\"\\n                    \"],[1,[28,[35,13],[[30,1,[\"user\"]]],[[\"avatarTemplatePath\",\"usernamePath\",\"namePath\",\"imageSize\"],[\"avatar_template\",\"username\",\"name\",\"small\"]]]],[1,\"\\n                  \"],[13],[1,\"\\n\"]],[]],null],[1,\"              \"],[13],[1,\"\\n              \"],[10,\"td\"],[14,0,\"post-metadata topic-list-data\"],[12],[1,[28,[35,16],[[30,1,[\"updated_at\"]]],[[\"format\"],[\"tiny\"]]]],[13],[1,\"\\n              \"],[1,[28,[35,17],[\"list/activity-column\"],[[\"topic\",\"class\",\"tagName\"],[[30,1],\"num post-metadata\",\"td\"]]]],[1,\"\\n\"]],[]],null],[1,\"            \"],[10,\"td\"],[14,0,\"topic-list-data\"],[12],[1,\"\\n              \"],[8,[39,18],null,[[\"@bookmark\",\"@removeBookmark\",\"@editBookmark\",\"@clearBookmarkReminder\",\"@togglePinBookmark\"],[[30,1],[28,[37,19],[[30,0],\"removeBookmark\"],null],[28,[37,19],[[30,0],\"editBookmark\"],null],[28,[37,19],[[30,0],\"clearBookmarkReminder\"],null],[28,[37,19],[[30,0],\"togglePinBookmark\"],null]]],null],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[1]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n    \"],[8,[39,0],null,[[\"@condition\"],[[30,0,[\"loadingMore\"]]]],null],[1,\"\\n  \"]],[]]]]],[1,\"\\n\"]],[]]]]]],[\"bookmark\"],false,[\"conditional-loading-spinner\",\"load-more\",\"unless\",\"i18n\",\"each\",\"-track-array\",\"if\",\"d-icon\",\"topic-status\",\"topic-link\",\"category-link\",\"discourse-tags\",\"and\",\"avatar\",\"on\",\"html-safe\",\"format-date\",\"raw\",\"bookmark-actions-dropdown\",\"action\"]]",
    "moduleName": "discourse/components/bookmark-list.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_scrolling.default, (_obj = {
    dialog: (0, _service.inject)(),
    classNames: ["bookmark-list-wrapper"],
    didInsertElement() {
      this._super(...arguments);
      this.bindScrolling();
      this.scrollToLastPosition();
    },
    willDestroyElement() {
      this._super(...arguments);
      this.unbindScrolling();
    },
    scrollToLastPosition() {
      const scrollTo = this.session.bookmarkListScrollPosition;
      if (scrollTo >= 0) {
        (0, _runloop.schedule)("afterRender", () => {
          if (this.element && !this.isDestroying && !this.isDestroyed) {
            (0, _runloop.next)(() => window.scrollTo(0, scrollTo));
          }
        });
      }
    },
    scrolled() {
      this._super(...arguments);
      this.session.set("bookmarkListScrollPosition", window.scrollY);
    },
    removeBookmark(bookmark) {
      return new _rsvp.Promise((resolve, reject) => {
        const deleteBookmark = () => {
          bookmark.destroy().then(() => {
            this.appEvents.trigger("bookmarks:changed", null, bookmark.attachedTo());
            this._removeBookmarkFromList(bookmark);
            resolve(true);
          }).catch(error => {
            reject(error);
          });
        };
        if (!bookmark.reminder_at) {
          return deleteBookmark();
        }
        this.dialog.deleteConfirm({
          message: _I18n.default.t("bookmarks.confirm_delete"),
          didConfirm: () => deleteBookmark(),
          didCancel: () => resolve(false)
        });
      });
    },
    screenExcerptForExternalLink(event) {
      if (event?.target?.tagName === "A") {
        if ((0, _clickTrack.shouldOpenInNewTab)(event.target.href)) {
          (0, _clickTrack.openLinkInNewTab)(event, event.target);
        }
      }
    },
    editBookmark(bookmark) {
      (0, _bookmark.openBookmarkModal)(bookmark, {
        onAfterSave: savedData => {
          this.appEvents.trigger("bookmarks:changed", savedData, bookmark.attachedTo());
          this.reload();
        },
        onAfterDelete: () => {
          this.reload();
        }
      });
    },
    clearBookmarkReminder(bookmark) {
      return (0, _ajax.ajax)(`/bookmarks/${bookmark.id}`, {
        type: "PUT",
        data: {
          reminder_at: null
        }
      }).then(() => {
        bookmark.set("reminder_at", null);
      });
    },
    togglePinBookmark(bookmark) {
      bookmark.togglePin().then(this.reload);
    },
    _removeBookmarkFromList(bookmark) {
      this.content.removeObject(bookmark);
    }
  }, (_applyDecoratedDescriptor(_obj, "removeBookmark", [_object.action], Object.getOwnPropertyDescriptor(_obj, "removeBookmark"), _obj), _applyDecoratedDescriptor(_obj, "screenExcerptForExternalLink", [_object.action], Object.getOwnPropertyDescriptor(_obj, "screenExcerptForExternalLink"), _obj), _applyDecoratedDescriptor(_obj, "editBookmark", [_object.action], Object.getOwnPropertyDescriptor(_obj, "editBookmark"), _obj), _applyDecoratedDescriptor(_obj, "clearBookmarkReminder", [_object.action], Object.getOwnPropertyDescriptor(_obj, "clearBookmarkReminder"), _obj), _applyDecoratedDescriptor(_obj, "togglePinBookmark", [_object.action], Object.getOwnPropertyDescriptor(_obj, "togglePinBookmark"), _obj)), _obj)));
  _exports.default = _default;
});
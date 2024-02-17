define("discourse/components/user-stream", ["exports", "@ember/component", "@ember/template-factory", "discourse/lib/click-track", "discourse/lib/url", "discourse/models/draft", "I18n", "discourse/mixins/load-more", "discourse/models/post", "discourse/models/composer", "discourse-common/utils/decorators", "@ember/object/evented", "discourse/lib/ajax-error", "@ember/runloop", "@ember/service"], function (_exports, _component, _templateFactory, _clickTrack, _url, _draft, _I18n, _loadMore, _post, _composer, _decorators, _evented, _ajaxError, _runloop, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse/lib/click-track",0,"@ember/component",0,"discourse/lib/url",0,"discourse/models/draft",0,"I18n",0,"discourse/mixins/load-more",0,"discourse/models/post",0,"discourse/models/composer",0,"discourse-common/utils/decorators",0,"@ember/object/evented",0,"discourse/lib/ajax-error",0,"@ember/runloop",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#each @stream.content as |item|}}
    <UserStreamItem
      @item={{item}}
      @removeBookmark={{action "removeBookmark"}}
      @resumeDraft={{action "resumeDraft"}}
      @removeDraft={{action "removeDraft"}}
    />
  {{/each}}
  */
  {
    "id": "3ZQh1mmf",
    "block": "[[[42,[28,[37,1],[[28,[37,1],[[30,1,[\"content\"]]],null]],null],null,[[[1,\"  \"],[8,[39,2],null,[[\"@item\",\"@removeBookmark\",\"@resumeDraft\",\"@removeDraft\"],[[30,2],[28,[37,3],[[30,0],\"removeBookmark\"],null],[28,[37,3],[[30,0],\"resumeDraft\"],null],[28,[37,3],[[30,0],\"removeDraft\"],null]]],null],[1,\"\\n\"]],[2]],null]],[\"@stream\",\"item\"],false,[\"each\",\"-track-array\",\"user-stream-item\",\"action\"]]",
    "moduleName": "discourse/components/user-stream.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_loadMore.default, (_dec = (0, _decorators.observes)("stream.user.id"), (_obj = {
    tagName: "ul",
    dialog: (0, _service.inject)(),
    composer: (0, _service.inject)(),
    _lastDecoratedElement: null,
    _initialize: (0, _evented.on)("init", function () {
      const filter = this.get("stream.filter");
      if (filter) {
        this.set("classNames", ["user-stream", "filter-" + filter.toString().replace(",", "-")]);
      }
    }),
    loading: false,
    eyelineSelector: ".user-stream .item",
    classNames: ["user-stream"],
    _scrollTopOnModelChange() {
      (0, _runloop.schedule)("afterRender", () => $(document).scrollTop(0));
    },
    _inserted: (0, _evented.on)("didInsertElement", function () {
      $(window).on("resize.discourse-on-scroll", () => this.scrolled());
      $(this.element).on("click.details-disabled", "details.disabled", () => false);
      $(this.element).on("click.discourse-redirect", ".excerpt a", e => {
        return _clickTrack.default.trackClick(e, this.siteSettings);
      });
      this._updateLastDecoratedElement();
      this._scrollToLastPosition();
    }),
    // This view is being removed. Shut down operations
    _destroyed: (0, _evented.on)("willDestroyElement", function () {
      $(window).unbind("resize.discourse-on-scroll");
      $(this.element).off("click.details-disabled", "details.disabled");

      // Unbind link tracking
      $(this.element).off("click.discourse-redirect", ".excerpt a");
    }),
    _updateLastDecoratedElement() {
      const nodes = this.element.querySelectorAll(".user-stream-item");
      if (nodes.length === 0) {
        return;
      }
      const lastElement = nodes[nodes.length - 1];
      if (lastElement === this._lastDecoratedElement) {
        return;
      }
      this._lastDecoratedElement = lastElement;
    },
    _scrollToLastPosition() {
      const scrollTo = this.session.userStreamScrollPosition;
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
      this.session.set("userStreamScrollPosition", window.scrollY);
    },
    actions: {
      removeBookmark(userAction) {
        const stream = this.stream;
        _post.default.updateBookmark(userAction.get("post_id"), false).then(() => {
          stream.remove(userAction);
        }).catch(_ajaxError.popupAjaxError);
      },
      resumeDraft(item) {
        if (this.composer.get("model.viewOpen")) {
          this.composer.close();
        }
        if (item.get("postUrl")) {
          _url.default.routeTo(item.get("postUrl"));
        } else {
          _draft.default.get(item.draft_key).then(d => {
            const draft = d.draft || item.data;
            if (!draft) {
              return;
            }
            this.composer.open({
              draft,
              draftKey: item.draft_key,
              draftSequence: d.draft_sequence
            });
          }).catch(error => {
            (0, _ajaxError.popupAjaxError)(error);
          });
        }
      },
      removeDraft(draft) {
        const stream = this.stream;
        this.dialog.yesNoConfirm({
          message: _I18n.default.t("drafts.remove_confirmation"),
          didConfirm: () => {
            _draft.default.clear(draft.draft_key, draft.sequence).then(() => {
              stream.remove(draft);
              if (draft.draft_key === _composer.NEW_TOPIC_KEY) {
                this.currentUser.set("has_topic_draft", false);
              }
            }).catch(error => {
              (0, _ajaxError.popupAjaxError)(error);
            });
          }
        });
      },
      loadMore() {
        if (this.loading) {
          return;
        }
        this.set("loading", true);
        const stream = this.stream;
        stream.findItems().then(() => {
          this.set("loading", false);
          let element = this._lastDecoratedElement?.nextElementSibling;
          while (element) {
            this.trigger("user-stream:new-item-inserted", element);
            element = element.nextElementSibling;
          }
          this._updateLastDecoratedElement();
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_scrollTopOnModelChange", [_dec], Object.getOwnPropertyDescriptor(_obj, "_scrollTopOnModelChange"), _obj)), _obj))));
  _exports.default = _default;
});
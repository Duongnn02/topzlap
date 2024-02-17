define("discourse/components/scrolling-post-stream", ["exports", "discourse/widgets/post-stream", "@ember/runloop", "discourse/lib/url", "discourse/components/mount-widget", "discourse-common/lib/debounce", "discourse/lib/safari-hacks", "discourse/lib/offset-calculator", "@ember/service", "discourse-common/utils/decorators", "discourse-common/utils/dom-utils"], function (_exports, _postStream, _runloop, _url, _mountWidget, _debounce, _safariHacks, _offsetCalculator, _service, _decorators, _domUtils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse/widgets/post-stream",0,"@ember/runloop",0,"discourse/lib/url",0,"discourse/components/mount-widget",0,"discourse-common/lib/debounce",0,"discourse/lib/safari-hacks",0,"discourse/lib/offset-calculator",0,"@ember/service",0,"discourse-common/utils/decorators",0,"discourse-common/utils/dom-utils"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const DEBOUNCE_DELAY = 50;
  function findTopView(posts, viewportTop, postsWrapperTop, min, max) {
    if (max < min) {
      return min;
    }
    while (max > min) {
      const mid = Math.floor((min + max) / 2);
      const post = posts.item(mid);
      const viewBottom = _domUtils.default.offset(post).top - postsWrapperTop + post.clientHeight;
      if (viewBottom > viewportTop) {
        max = mid - 1;
      } else {
        min = mid + 1;
      }
    }
    return min;
  }
  var _default = _mountWidget.default.extend((_obj = {
    screenTrack: (0, _service.inject)(),
    widget: "post-stream",
    _topVisible: null,
    _bottomVisible: null,
    _currentPost: null,
    _currentVisible: null,
    _currentPercent: null,
    buildArgs() {
      return this.getProperties("posts", "canCreatePost", "filteredPostsCount", "multiSelect", "gaps", "selectedQuery", "selectedPostsCount", "searchService", "showReadIndicator", "streamFilters", "lastReadPostNumber", "highestPostNumber");
    },
    scrolled() {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }
      if ((0, _safariHacks.isWorkaroundActive)() || document.webkitFullscreenElement || document.fullscreenElement) {
        return;
      }

      // We use this because watching videos fullscreen in Chrome was super buggy
      // otherwise. Thanks to arrendek from q23 for the technique.
      const topLeftCornerElement = document.elementFromPoint(0, 0);
      if (topLeftCornerElement && topLeftCornerElement.tagName.toUpperCase() === "IFRAME") {
        return;
      }
      const windowHeight = window.innerHeight;
      const slack = Math.round(windowHeight * 5);
      const onscreen = [];
      const nearby = [];
      const windowTop = document.scrollingElement.scrollTop;
      const postsWrapperTop = _domUtils.default.offset(document.querySelector(".posts-wrapper")).top;
      const postsNodes = this.element.querySelectorAll(".onscreen-post, .cloaked-post");
      const viewportTop = windowTop - slack;
      const topView = findTopView(postsNodes, viewportTop, postsWrapperTop, 0, postsNodes.length - 1);
      let windowBottom = windowTop + windowHeight;
      let viewportBottom = windowBottom + slack;
      const bodyHeight = document.body.clientHeight;
      if (windowBottom > bodyHeight) {
        windowBottom = bodyHeight;
      }
      if (viewportBottom > bodyHeight) {
        viewportBottom = bodyHeight;
      }
      let currentPost = null;
      let percent = null;
      const offset = (0, _offsetCalculator.default)();
      const topCheck = Math.ceil(windowTop + offset + 5);

      // uncomment to debug the eyeline
      /*
      let $eyeline = $('.debug-eyeline');
      if ($eyeline.length === 0) {
        $('body').prepend('<div class="debug-eyeline"></div>');
        $eyeline = $('.debug-eyeline');
      }
      $eyeline.css({ height: '5px', width: '100%', backgroundColor: 'blue', position: 'absolute', top: `${topCheck}px`, zIndex: 999999 });
      */

      let allAbove = true;
      let bottomView = topView;
      let lastBottom = 0;
      while (bottomView < postsNodes.length) {
        const post = postsNodes.item(bottomView);
        if (!post) {
          break;
        }
        const viewTop = _domUtils.default.offset(post).top;
        const postHeight = post.clientHeight;
        const viewBottom = Math.ceil(viewTop + postHeight);
        allAbove = allAbove && viewTop < topCheck;
        if (viewTop > viewportBottom) {
          break;
        }
        if (viewBottom >= windowTop && viewTop <= windowBottom) {
          onscreen.push(bottomView);
        }
        if (currentPost === null && (viewTop <= topCheck && viewBottom >= topCheck || lastBottom <= topCheck && viewTop >= topCheck)) {
          percent = (topCheck - viewTop) / postHeight;
          currentPost = bottomView;
        }
        lastBottom = viewBottom;
        nearby.push(bottomView);
        bottomView++;
      }
      if (allAbove) {
        if (percent === null) {
          percent = 1.0;
        }
        if (currentPost === null) {
          currentPost = bottomView - 1;
        }
      }
      const posts = this.posts;
      const refresh = cb => this.queueRerender(cb);
      if (onscreen.length) {
        const first = posts.objectAt(onscreen[0]);
        if (this._topVisible !== first) {
          this._topVisible = first;
          const elem = postsNodes.item(onscreen[0]);
          const elemId = elem.id;
          const elemPos = _domUtils.default.position(elem);
          const distToElement = elemPos?.top || 0;
          const topRefresh = () => {
            refresh(() => {
              const refreshedElem = document.getElementById(elemId);
              if (!refreshedElem) {
                return;
              }
              const position = _domUtils.default.position(refreshedElem);
              const top = position.top - distToElement;
              document.documentElement.scroll({
                top,
                left: 0
              });

              // This seems weird, but somewhat infrequently a rerender
              // will cause the browser to scroll to the top of the document
              // in Chrome. This makes sure the scroll works correctly if that
              // happens.
              (0, _runloop.schedule)("afterRender", () => {
                document.documentElement.scroll({
                  top,
                  left: 0
                });
              });
            });
          };
          this.topVisibleChanged({
            post: first,
            refresh: topRefresh
          });
        }
        const last = posts.objectAt(onscreen[onscreen.length - 1]);
        if (this._bottomVisible !== last) {
          this._bottomVisible = last;
          this.bottomVisibleChanged({
            post: last,
            refresh
          });
        }
        const changedPost = this._currentPost !== currentPost;
        if (changedPost) {
          this._currentPost = currentPost;
          const post = posts.objectAt(currentPost);
          this.currentPostChanged({
            post
          });
        }
        if (percent !== null) {
          percent = Math.max(0.0, Math.min(1.0, percent));
          if (changedPost || this._currentPercent !== percent) {
            this._currentPercent = percent;
            this.currentPostScrolled({
              percent
            });
          }
        }
      } else {
        this._topVisible = null;
        this._bottomVisible = null;
        this._currentPost = null;
        this._currentPercent = null;
      }
      const onscreenPostNumbers = [];
      const readPostNumbers = [];
      const prev = this._previouslyNearby;
      const newPrev = {};
      nearby.forEach(idx => {
        const post = posts.objectAt(idx);
        const postNumber = post.post_number;
        delete prev[postNumber];
        if (onscreen.includes(idx)) {
          onscreenPostNumbers.push(postNumber);
          if (post.read) {
            readPostNumbers.push(postNumber);
          }
        }
        newPrev[postNumber] = post;
        (0, _postStream.uncloak)(post, this);
      });
      Object.values(prev).forEach(node => (0, _postStream.cloak)(node, this));
      this._previouslyNearby = newPrev;
      this.screenTrack.setOnscreen(onscreenPostNumbers, readPostNumbers);
    },
    _scrollTriggered() {
      (0, _runloop.scheduleOnce)("afterRender", this, this.scrolled);
    },
    _posted(staged) {
      this.queueRerender(() => {
        if (staged) {
          const postNumber = staged.post_number;
          _url.default.jumpToPost(postNumber, {
            skipIfOnScreen: true
          });
        }
      });
    },
    _refresh(args) {
      if (args) {
        if (args.id) {
          this.dirtyKeys.keyDirty(`post-${args.id}`);
          if (args.refreshLikes) {
            this.dirtyKeys.keyDirty(`post-menu-${args.id}`, {
              onRefresh: "refreshLikes"
            });
          }
          if (args.refreshReaders) {
            this.dirtyKeys.keyDirty(`post-menu-${args.id}`, {
              onRefresh: "refreshReaders"
            });
          }
        } else if (args.force) {
          this.dirtyKeys.forceAll();
        }
      }
      this.queueRerender();
    },
    _debouncedScroll() {
      (0, _debounce.default)(this, this._scrollTriggered, DEBOUNCE_DELAY);
    },
    didInsertElement() {
      this._super(...arguments);
      this._previouslyNearby = {};
      this.appEvents.on("post-stream:refresh", this, "_debouncedScroll");
      const opts = {
        passive: true
      };
      document.addEventListener("touchmove", this._debouncedScroll, opts);
      window.addEventListener("scroll", this._debouncedScroll, opts);
      this._scrollTriggered();
      this.appEvents.on("post-stream:posted", this, "_posted");
      this.element.addEventListener("mouseenter", this._handleWidgetButtonHoverState, true);
      this.element.addEventListener("mouseleave", this._removeWidgetButtonHoverState, true);
      this.appEvents.on("post-stream:refresh", this, "_refresh");

      // restore scroll position on browsers with aggressive BFCaches (like Safari)
      window.onpageshow = function (event) {
        if (event.persisted) {
          _url.default.routeTo(this.location.pathname);
        }
      };
    },
    willDestroyElement() {
      this._super(...arguments);
      document.removeEventListener("touchmove", this._debouncedScroll);
      window.removeEventListener("scroll", this._debouncedScroll);
      this.appEvents.off("post-stream:refresh", this, "_debouncedScroll");
      this.element.removeEventListener("mouseenter", this._handleWidgetButtonHoverState);
      this.element.removeEventListener("mouseleave", this._removeWidgetButtonHoverState);
      this.appEvents.off("post-stream:refresh", this, "_refresh");
      this.appEvents.off("post-stream:posted", this, "_posted");
    },
    _handleWidgetButtonHoverState(event) {
      if (event.target.classList.contains("widget-button")) {
        document.querySelectorAll("button.widget-button").forEach(widgetButton => {
          widgetButton.classList.remove("d-hover");
        });
        event.target.classList.add("d-hover");
      }
    },
    _removeWidgetButtonHoverState() {
      document.querySelectorAll("button.widget-button").forEach(button => {
        button.classList.remove("d-hover");
      });
    }
  }, (_applyDecoratedDescriptor(_obj, "_debouncedScroll", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_debouncedScroll"), _obj)), _obj));
  _exports.default = _default;
});
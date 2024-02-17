define("discourse/components/topic-progress", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/object/computed", "@ember/runloop", "discourse-common/lib/later", "@ember/object", "discourse-common/config/environment"], function (_exports, _component, _templateFactory, _decorators, _computed, _runloop, _later, _object, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/component",0,"@ember/object/computed",0,"@ember/runloop",0,"discourse-common/lib/later",0,"@ember/object",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{#unless this.hideProgress}}
    {{yield}}
  {{/unless}}
  
  {{#if this.showBackButton}}
    <div class="progress-back-container">
      <DButton
        @label="topic.timeline.back"
        @class="btn-primary progress-back"
        @action={{action "goBack"}}
        @icon="arrow-down"
      />
    </div>
  {{/if}}
  
  <nav
    title={{i18n "topic.progress.title"}}
    aria-label={{i18n "topic.progress.title"}}
    class={{if this.hideProgress "hidden"}}
    id="topic-progress"
    style={{html-safe this.progressStyle}}
  >
    <div class="nums">
      <h4>{{this.progressPosition}}</h4>
      <span class={{if this.hugeNumberOfPosts "hidden"}}>
        <span>/</span>
        <h4>{{this.postStream.filteredPostsCount}}</h4>
      </span>
    </div>
    <div class="bg"></div>
  </nav>
  
  <PluginOutlet @name="after-topic-progress" @connectorTagName="div" />
  */
  {
    "id": "162Cw6yS",
    "block": "[[[41,[51,[30,0,[\"hideProgress\"]]],[[[1,\"  \"],[18,1,null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showBackButton\"]],[[[1,\"  \"],[10,0],[14,0,\"progress-back-container\"],[12],[1,\"\\n    \"],[8,[39,3],null,[[\"@label\",\"@class\",\"@action\",\"@icon\"],[\"topic.timeline.back\",\"btn-primary progress-back\",[28,[37,4],[[30,0],\"goBack\"],null],\"arrow-down\"]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,\"nav\"],[15,\"title\",[28,[37,5],[\"topic.progress.title\"],null]],[15,\"aria-label\",[28,[37,5],[\"topic.progress.title\"],null]],[15,0,[52,[30,0,[\"hideProgress\"]],\"hidden\"]],[14,1,\"topic-progress\"],[15,5,[28,[37,6],[[30,0,[\"progressStyle\"]]],null]],[12],[1,\"\\n  \"],[10,0],[14,0,\"nums\"],[12],[1,\"\\n    \"],[10,\"h4\"],[12],[1,[30,0,[\"progressPosition\"]]],[13],[1,\"\\n    \"],[10,1],[15,0,[52,[30,0,[\"hugeNumberOfPosts\"]],\"hidden\"]],[12],[1,\"\\n      \"],[10,1],[12],[1,\"/\"],[13],[1,\"\\n      \"],[10,\"h4\"],[12],[1,[30,0,[\"postStream\",\"filteredPostsCount\"]]],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,0],[14,0,\"bg\"],[12],[13],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,7],null,[[\"@name\",\"@connectorTagName\"],[\"after-topic-progress\",\"div\"]],null]],[\"&default\"],false,[\"unless\",\"yield\",\"if\",\"d-button\",\"action\",\"i18n\",\"html-safe\",\"plugin-outlet\"]]",
    "moduleName": "discourse/components/topic-progress.hbs",
    "isStrictMode": false
  });
  const CSS_TRANSITION_DELAY = (0, _environment.isTesting)() ? 0 : 500;
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("postStream.loaded", "topic.currentPost", "postStream.filteredPostsCount"), _dec2 = (0, _decorators.default)("postStream.filteredPostsCount"), _dec3 = (0, _decorators.default)("progressPosition", "topic.last_read_post_id"), _dec4 = (0, _decorators.default)("_streamPercentage"), (_obj = {
    elementId: "topic-progress-wrapper",
    classNameBindings: ["docked", "withTransitions"],
    docked: false,
    withTransitions: null,
    progressPosition: null,
    postStream: (0, _computed.alias)("topic.postStream"),
    _streamPercentage: null,
    hideProgress(loaded, currentPost, filteredPostsCount) {
      const hideOnShortStream = !this.site.mobileView && filteredPostsCount < 2;
      return !loaded || !currentPost || hideOnShortStream;
    },
    hugeNumberOfPosts(filteredPostsCount) {
      return filteredPostsCount >= this.siteSettings.short_progress_text_threshold;
    },
    showBackButton(position, lastReadId) {
      if (!lastReadId) {
        return;
      }
      const stream = this.get("postStream.stream");
      const readPos = stream.indexOf(lastReadId) || 0;
      return readPos < stream.length - 1 && readPos > position;
    },
    _topicScrolled(event) {
      if (this.docked) {
        this.setProperties({
          progressPosition: this.get("postStream.filteredPostsCount"),
          _streamPercentage: 100
        });
      } else {
        this.setProperties({
          progressPosition: event.postIndex,
          _streamPercentage: (event.percent * 100).toFixed(2)
        });
      }
    },
    progressStyle(_streamPercentage) {
      return `--progress-bg-width: ${_streamPercentage || 0}%`;
    },
    didInsertElement() {
      this._super(...arguments);
      this.appEvents.on("composer:resized", this, this._composerEvent).on("topic:current-post-scrolled", this, this._topicScrolled);
      if (this.prevEvent) {
        (0, _runloop.scheduleOnce)("afterRender", this, this._topicScrolled, this.prevEvent);
      }
      (0, _runloop.scheduleOnce)("afterRender", this, this._startObserver);

      // start CSS transitions a tiny bit later
      // to avoid jumpiness on initial topic load
      (0, _later.default)(this._addCssTransitions, CSS_TRANSITION_DELAY);
    },
    willDestroyElement() {
      this._super(...arguments);
      this._topicBottomObserver?.disconnect();
      this.appEvents.off("composer:resized", this, this._composerEvent).off("topic:current-post-scrolled", this, this._topicScrolled);
    },
    _addCssTransitions() {
      if (this.isDestroying || this.isDestroyed) {
        return;
      }
      this.set("withTransitions", true);
    },
    _startObserver() {
      if ("IntersectionObserver" in window) {
        this._topicBottomObserver = this._setupObserver();
        this._topicBottomObserver.observe(document.querySelector("#topic-bottom"));
      }
    },
    _setupObserver() {
      // minimum 50px here ensures element is not docked when
      // scrolling down quickly, it causes post stream refresh loop
      // on Android
      const bottomIntersectionMargin = document.querySelector("#reply-control")?.clientHeight || 50;
      return new IntersectionObserver(this._intersectionHandler, {
        threshold: 1,
        rootMargin: `0px 0px -${bottomIntersectionMargin}px 0px`
      });
    },
    _composerEvent() {
      // reinitializing needed to account for composer height
      // might be no longer necessary if IntersectionObserver API supports dynamic rootMargin
      // see https://github.com/w3c/IntersectionObserver/issues/428
      if ("IntersectionObserver" in window) {
        this._topicBottomObserver?.disconnect();
        this._startObserver();
      }
    },
    _intersectionHandler(entries) {
      if (!this.element || this.isDestroying || this.isDestroyed) {
        return;
      }
      const composerH = document.querySelector("#reply-control")?.clientHeight || 0;

      // on desktop, pin this element to the composer
      // otherwise the grid layout will change too much when toggling the composer
      // and jitter when the viewport is near the topic bottom
      if (!this.site.mobileView && composerH) {
        this.set("docked", false);
        this.element.style.setProperty("bottom", `${composerH}px`);
        return;
      }
      if (entries[0].isIntersecting === true) {
        this.set("docked", true);
        this.element.style.removeProperty("bottom");
      } else {
        if (entries[0].boundingClientRect.top > 0) {
          this.set("docked", false);
          if (composerH === 0) {
            const filteredPostsHeight = document.querySelector(".posts-filtered-notice")?.clientHeight || 0;
            filteredPostsHeight === 0 ? this.element.style.removeProperty("bottom") : this.element.style.setProperty("bottom", `${filteredPostsHeight}px`);
          } else {
            this.element.style.setProperty("bottom", `${composerH}px`);
          }
        }
      }
    },
    click(e) {
      if (e.target.closest("#topic-progress")) {
        this.toggleProperty("expanded");
      }
    },
    goBack() {
      this.attrs.jumpToPost(this.get("topic.last_read_post_number"));
    }
  }, (_applyDecoratedDescriptor(_obj, "hideProgress", [_dec], Object.getOwnPropertyDescriptor(_obj, "hideProgress"), _obj), _applyDecoratedDescriptor(_obj, "hugeNumberOfPosts", [_dec2], Object.getOwnPropertyDescriptor(_obj, "hugeNumberOfPosts"), _obj), _applyDecoratedDescriptor(_obj, "showBackButton", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showBackButton"), _obj), _applyDecoratedDescriptor(_obj, "progressStyle", [_dec4], Object.getOwnPropertyDescriptor(_obj, "progressStyle"), _obj), _applyDecoratedDescriptor(_obj, "_addCssTransitions", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_addCssTransitions"), _obj), _applyDecoratedDescriptor(_obj, "_intersectionHandler", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "_intersectionHandler"), _obj), _applyDecoratedDescriptor(_obj, "goBack", [_object.action], Object.getOwnPropertyDescriptor(_obj, "goBack"), _obj)), _obj))));
  _exports.default = _default;
});
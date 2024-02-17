define("discourse/components/discovery-topics-list", ["exports", "@ember/component", "@ember/template-factory", "discourse-common/utils/decorators", "@ember/runloop", "discourse/mixins/load-more", "discourse/mixins/url-refresh", "@ember/service"], function (_exports, _component, _templateFactory, _decorators, _runloop, _loadMore, _urlRefresh, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"discourse-common/utils/decorators",0,"@ember/runloop",0,"@ember/component",0,"discourse/mixins/load-more",0,"discourse/mixins/url-refresh",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    {{yield (hash saveScrollPosition=this.saveScrollPosition)}}
  */
  {
    "id": "2dYw8TOC",
    "block": "[[[18,1,[[28,[37,1],null,[[\"saveScrollPosition\"],[[30,0,[\"saveScrollPosition\"]]]]]]]],[\"&default\"],false,[\"yield\",\"hash\"]]",
    "moduleName": "discourse/components/discovery-topics-list.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_urlRefresh.default, _loadMore.default, (_dec = (0, _decorators.on)("didInsertElement"), _dec2 = (0, _decorators.observes)("model"), _dec3 = (0, _decorators.on)("didInsertElement"), _dec4 = (0, _decorators.on)("willDestroyElement"), _dec5 = (0, _decorators.observes)("incomingCount"), (_obj = {
    classNames: ["contents"],
    eyelineSelector: ".topic-list-item",
    documentTitle: (0, _service.inject)(),
    _readjustScrollPosition() {
      const scrollTo = this.session.topicListScrollPosition;
      if (scrollTo >= 0) {
        (0, _runloop.schedule)("afterRender", () => {
          if (this.element && !this.isDestroying && !this.isDestroyed) {
            (0, _runloop.next)(() => window.scrollTo(0, scrollTo));
          }
        });
      } else {
        (0, _runloop.scheduleOnce)("afterRender", this, this.loadMoreUnlessFull);
      }
    },
    _monitorTrackingState() {
      this.stateChangeCallbackId = this.topicTrackingState.onStateChange(() => this._updateTrackingTopics());
    },
    _removeTrackingStateChangeMonitor() {
      if (this.stateChangeCallbackId) {
        this.topicTrackingState.offStateChange(this.stateChangeCallbackId);
      }
    },
    _updateTrackingTopics() {
      this.topicTrackingState.updateTopics(this.model.topics);
    },
    _updateTitle() {
      this.documentTitle.updateContextCount(this.incomingCount);
    },
    saveScrollPosition() {
      this.session.set("topicListScrollPosition", $(window).scrollTop());
    },
    actions: {
      loadMore() {
        var _this = this;
        this.documentTitle.updateContextCount(0);
        this.model.loadMore().then(function () {
          let {
            moreTopicsUrl,
            newTopics
          } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          if (newTopics && newTopics.length && _this.autoAddTopicsToBulkSelect && _this.bulkSelectEnabled) {
            _this.addTopicsToBulkSelect(newTopics);
          }
          (0, _runloop.schedule)("afterRender", () => _this.saveScrollPosition());
          if (moreTopicsUrl && $(window).height() >= $(document).height()) {
            _this.send("loadMore");
          }
          if (_this.loadingComplete) {
            _this.loadingComplete();
          }
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "_readjustScrollPosition", [_dec, _dec2], Object.getOwnPropertyDescriptor(_obj, "_readjustScrollPosition"), _obj), _applyDecoratedDescriptor(_obj, "_monitorTrackingState", [_dec3], Object.getOwnPropertyDescriptor(_obj, "_monitorTrackingState"), _obj), _applyDecoratedDescriptor(_obj, "_removeTrackingStateChangeMonitor", [_dec4], Object.getOwnPropertyDescriptor(_obj, "_removeTrackingStateChangeMonitor"), _obj), _applyDecoratedDescriptor(_obj, "_updateTitle", [_dec5], Object.getOwnPropertyDescriptor(_obj, "_updateTitle"), _obj)), _obj))));
  _exports.default = _default;
});
define("discourse/components/topic-list", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "discourse-common/utils/decorators", "discourse/mixins/load-more", "@ember/object/evented", "@ember/runloop", "discourse/lib/show-modal"], function (_exports, _component, _templateFactory, _computed, _decorators, _loadMore, _evented, _runloop, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"@ember/component",0,"discourse/mixins/load-more",0,"@ember/object/evented",0,"@ember/runloop",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <thead class="topic-list-header">
    {{raw
      "topic-list-header"
      canBulkSelect=this.canBulkSelect
      toggleInTitle=this.toggleInTitle
      hideCategory=this.hideCategory
      showPosters=this.showPosters
      showLikes=this.showLikes
      showOpLikes=this.showOpLikes
      order=this.order
      ascending=this.ascending
      sortable=this.sortable
      listTitle=this.listTitle
      bulkSelectEnabled=this.bulkSelectEnabled
      canDoBulkActions=this.canDoBulkActions
    }}
  </thead>
  
  <PluginOutlet
    @name="before-topic-list-body"
    @outletArgs={{hash
      topics=this.topics
      selected=this.selected
      bulkSelectEnabled=this.bulkSelectEnabled
      lastVisitedTopic=this.lastVisitedTopic
      discoveryList=this.discoveryList
      hideCategory=this.hideCategory
    }}
  />
  
  <tbody class="topic-list-body">
    {{#each this.filteredTopics as |topic index|}}
      <TopicListItem
        @topic={{topic}}
        @bulkSelectEnabled={{this.bulkSelectEnabled}}
        @showTopicPostBadges={{this.showTopicPostBadges}}
        @hideCategory={{this.hideCategory}}
        @showPosters={{this.showPosters}}
        @showLikes={{this.showLikes}}
        @showOpLikes={{this.showOpLikes}}
        @expandGloballyPinned={{this.expandGloballyPinned}}
        @expandAllPinned={{this.expandAllPinned}}
        @lastVisitedTopic={{this.lastVisitedTopic}}
        @selected={{this.selected}}
        @lastChecked={{this.lastChecked}}
        @tagsForUser={{this.tagsForUser}}
        @focusLastVisitedTopic={{this.focusLastVisitedTopic}}
        @index={{index}}
      />
      {{raw
        "list/visited-line"
        lastVisitedTopic=this.lastVisitedTopic
        topic=topic
      }}
      <PluginOutlet
        @name="after-topic-list-item"
        @outletArgs={{hash topic=topic index=index}}
        @connectorTagName="tr"
      />
    {{/each}}
  </tbody>
  
  <PluginOutlet
    @name="after-topic-list-body"
    @outletArgs={{hash
      topics=this.topics
      selected=this.selected
      bulkSelectEnabled=this.bulkSelectEnabled
      lastVisitedTopic=this.lastVisitedTopic
      discoveryList=this.discoveryList
      hideCategory=this.hideCategory
    }}
  />
  */
  {
    "id": "Y0/Hy7Ma",
    "block": "[[[10,\"thead\"],[14,0,\"topic-list-header\"],[12],[1,\"\\n  \"],[1,[28,[35,0],[\"topic-list-header\"],[[\"canBulkSelect\",\"toggleInTitle\",\"hideCategory\",\"showPosters\",\"showLikes\",\"showOpLikes\",\"order\",\"ascending\",\"sortable\",\"listTitle\",\"bulkSelectEnabled\",\"canDoBulkActions\"],[[30,0,[\"canBulkSelect\"]],[30,0,[\"toggleInTitle\"]],[30,0,[\"hideCategory\"]],[30,0,[\"showPosters\"]],[30,0,[\"showLikes\"]],[30,0,[\"showOpLikes\"]],[30,0,[\"order\"]],[30,0,[\"ascending\"]],[30,0,[\"sortable\"]],[30,0,[\"listTitle\"]],[30,0,[\"bulkSelectEnabled\"]],[30,0,[\"canDoBulkActions\"]]]]]],[1,\"\\n\"],[13],[1,\"\\n\\n\"],[8,[39,1],null,[[\"@name\",\"@outletArgs\"],[\"before-topic-list-body\",[28,[37,2],null,[[\"topics\",\"selected\",\"bulkSelectEnabled\",\"lastVisitedTopic\",\"discoveryList\",\"hideCategory\"],[[30,0,[\"topics\"]],[30,0,[\"selected\"]],[30,0,[\"bulkSelectEnabled\"]],[30,0,[\"lastVisitedTopic\"]],[30,0,[\"discoveryList\"]],[30,0,[\"hideCategory\"]]]]]]],null],[1,\"\\n\\n\"],[10,\"tbody\"],[14,0,\"topic-list-body\"],[12],[1,\"\\n\"],[42,[28,[37,4],[[28,[37,4],[[30,0,[\"filteredTopics\"]]],null]],null],null,[[[1,\"    \"],[8,[39,5],null,[[\"@topic\",\"@bulkSelectEnabled\",\"@showTopicPostBadges\",\"@hideCategory\",\"@showPosters\",\"@showLikes\",\"@showOpLikes\",\"@expandGloballyPinned\",\"@expandAllPinned\",\"@lastVisitedTopic\",\"@selected\",\"@lastChecked\",\"@tagsForUser\",\"@focusLastVisitedTopic\",\"@index\"],[[30,1],[30,0,[\"bulkSelectEnabled\"]],[30,0,[\"showTopicPostBadges\"]],[30,0,[\"hideCategory\"]],[30,0,[\"showPosters\"]],[30,0,[\"showLikes\"]],[30,0,[\"showOpLikes\"]],[30,0,[\"expandGloballyPinned\"]],[30,0,[\"expandAllPinned\"]],[30,0,[\"lastVisitedTopic\"]],[30,0,[\"selected\"]],[30,0,[\"lastChecked\"]],[30,0,[\"tagsForUser\"]],[30,0,[\"focusLastVisitedTopic\"]],[30,2]]],null],[1,\"\\n    \"],[1,[28,[35,0],[\"list/visited-line\"],[[\"lastVisitedTopic\",\"topic\"],[[30,0,[\"lastVisitedTopic\"]],[30,1]]]]],[1,\"\\n    \"],[8,[39,1],null,[[\"@name\",\"@outletArgs\",\"@connectorTagName\"],[\"after-topic-list-item\",[28,[37,2],null,[[\"topic\",\"index\"],[[30,1],[30,2]]]],\"tr\"]],null],[1,\"\\n\"]],[1,2]],null],[13],[1,\"\\n\\n\"],[8,[39,1],null,[[\"@name\",\"@outletArgs\"],[\"after-topic-list-body\",[28,[37,2],null,[[\"topics\",\"selected\",\"bulkSelectEnabled\",\"lastVisitedTopic\",\"discoveryList\",\"hideCategory\"],[[30,0,[\"topics\"]],[30,0,[\"selected\"]],[30,0,[\"bulkSelectEnabled\"]],[30,0,[\"lastVisitedTopic\"]],[30,0,[\"discoveryList\"]],[30,0,[\"hideCategory\"]]]]]]],null]],[\"topic\",\"index\"],false,[\"raw\",\"plugin-outlet\",\"hash\",\"each\",\"-track-array\",\"topic-list-item\"]]",
    "moduleName": "discourse/components/topic-list.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_loadMore.default, (_dec = (0, _decorators.default)("bulkSelectEnabled"), _dec2 = (0, _decorators.default)("order"), _dec3 = (0, _decorators.default)("order"), _dec4 = (0, _decorators.observes)("topics.[]"), _dec5 = (0, _decorators.observes)("topics", "order", "ascending", "category", "top"), (_obj = {
    tagName: "table",
    classNames: ["topic-list"],
    classNameBindings: ["bulkSelectEnabled:sticky-header"],
    showTopicPostBadges: true,
    listTitle: "topic.title",
    canDoBulkActions: (0, _computed.and)("currentUser.canManageTopic", "selected.length"),
    // Overwrite this to perform client side filtering of topics, if desired
    filteredTopics: (0, _computed.alias)("topics"),
    _init: (0, _evented.on)("init", function () {
      this.addObserver("hideCategory", this.rerender);
      this.addObserver("order", this.rerender);
      this.addObserver("ascending", this.rerender);
      this.refreshLastVisited();
    }),
    toggleInTitle(bulkSelectEnabled) {
      return !bulkSelectEnabled && this.canBulkSelect;
    },
    sortable() {
      return !!this.changeSort;
    },
    showLikes(order) {
      return order === "likes";
    },
    showOpLikes(order) {
      return order === "op_likes";
    },
    topicsAdded() {
      // special case so we don't keep scanning huge lists
      if (!this.lastVisitedTopic) {
        this.refreshLastVisited();
      }
    },
    lastVisitedTopicChanged() {
      this.refreshLastVisited();
    },
    scrolled() {
      this._super(...arguments);
      let onScroll = this.onScroll;
      if (!onScroll) {
        return;
      }
      onScroll.call(this);
    },
    scrollToLastPosition() {
      if (!this.scrollOnLoad) {
        return;
      }
      const scrollTo = this.session.topicListScrollPosition;
      if (scrollTo >= 0) {
        (0, _runloop.schedule)("afterRender", () => {
          if (this.element && !this.isDestroying && !this.isDestroyed) {
            (0, _runloop.next)(() => window.scrollTo(0, scrollTo));
          }
        });
      }
    },
    didInsertElement() {
      this._super(...arguments);
      this.scrollToLastPosition();
    },
    _updateLastVisitedTopic(topics, order, ascending, top) {
      this.set("lastVisitedTopic", null);
      if (!this.highlightLastVisited) {
        return;
      }
      if (order && order !== "activity") {
        return;
      }
      if (top) {
        return;
      }
      if (!topics || topics.length === 1) {
        return;
      }
      if (ascending) {
        return;
      }
      let user = this.currentUser;
      if (!user || !user.previous_visit_at) {
        return;
      }
      let lastVisitedTopic, topic;
      let prevVisit = user.get("previousVisitAt");

      // this is more efficient cause we keep appending to list
      // work backwards
      let start = 0;
      while (topics[start] && topics[start].get("pinned")) {
        start++;
      }
      let i;
      for (i = topics.length - 1; i >= start; i--) {
        if (topics[i].get("bumpedAt") > prevVisit) {
          lastVisitedTopic = topics[i];
          break;
        }
        topic = topics[i];
      }
      if (!lastVisitedTopic || !topic) {
        return;
      }

      // end of list that was scanned
      if (topic.get("bumpedAt") > prevVisit) {
        return;
      }
      this.set("lastVisitedTopic", lastVisitedTopic);
    },
    refreshLastVisited() {
      this._updateLastVisitedTopic(this.topics, this.order, this.ascending, this.top);
    },
    updateAutoAddTopicsToBulkSelect(newVal) {
      this.set("autoAddTopicsToBulkSelect", newVal);
    },
    click(e) {
      const onClick = (sel, callback) => {
        let target = e.target.closest(sel);
        if (target) {
          callback.call(this, target);
        }
      };
      onClick("button.bulk-select", function () {
        this.toggleBulkSelect();
        this.rerender();
      });
      onClick("button.bulk-select-all", function () {
        this.updateAutoAddTopicsToBulkSelect(true);
        document.querySelectorAll("input.bulk-select:not(:checked)").forEach(el => el.click());
      });
      onClick("button.bulk-clear-all", function () {
        this.updateAutoAddTopicsToBulkSelect(false);
        document.querySelectorAll("input.bulk-select:checked").forEach(el => el.click());
      });
      onClick("th.sortable", function (element) {
        this.changeSort(element.dataset.sortOrder);
        this.rerender();
      });
      onClick("button.bulk-select-actions", function () {
        const controller = (0, _showModal.default)("topic-bulk-actions", {
          model: {
            topics: this.selected,
            category: this.category
          },
          title: "topics.bulk.actions"
        });
        const action = this.bulkSelectAction;
        if (action) {
          controller.set("refreshClosure", () => action());
        }
      });
    },
    keyDown(e) {
      if (e.key === "Enter" || e.key === " ") {
        let onKeyDown = (sel, callback) => {
          let target = e.target.closest(sel);
          if (target) {
            callback.call(this, target);
          }
        };
        onKeyDown("th.sortable", element => {
          this.changeSort(element.dataset.sortOrder);
          this.rerender();
        });
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "toggleInTitle", [_dec], Object.getOwnPropertyDescriptor(_obj, "toggleInTitle"), _obj), _applyDecoratedDescriptor(_obj, "sortable", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "sortable"), _obj), _applyDecoratedDescriptor(_obj, "showLikes", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showLikes"), _obj), _applyDecoratedDescriptor(_obj, "showOpLikes", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showOpLikes"), _obj), _applyDecoratedDescriptor(_obj, "topicsAdded", [_dec4], Object.getOwnPropertyDescriptor(_obj, "topicsAdded"), _obj), _applyDecoratedDescriptor(_obj, "lastVisitedTopicChanged", [_dec5], Object.getOwnPropertyDescriptor(_obj, "lastVisitedTopicChanged"), _obj)), _obj))));
  _exports.default = _default;
});
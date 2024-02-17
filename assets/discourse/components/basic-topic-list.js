define("discourse/components/basic-topic-list", ["exports", "@ember/component", "@ember/template-factory", "@ember/object/computed", "discourse-common/utils/decorators"], function (_exports, _component, _templateFactory, _computed, _decorators) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _obj;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/object/computed",0,"discourse-common/utils/decorators",0,"@ember/component"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <ConditionalLoadingSpinner @condition={{this.loading}}>
    {{#if this.topics}}
      <TopicList
        @showPosters={{this.showPosters}}
        @hideCategory={{this.hideCategory}}
        @topics={{this.topics}}
        @expandExcerpts={{this.expandExcerpts}}
        @bulkSelectEnabled={{this.bulkSelectEnabled}}
        @bulkSelectAction={{this.bulkSelectAction}}
        @canBulkSelect={{this.canBulkSelect}}
        @selected={{this.selected}}
        @tagsForUser={{this.tagsForUser}}
        @onScroll={{this.onScroll}}
        @scrollOnLoad={{this.scrollOnLoad}}
        @toggleBulkSelect={{this.toggleBulkSelect}}
        @updateAutoAddTopicsToBulkSelect={{this.updateAutoAddTopicsToBulkSelect}}
      />
    {{else}}
      {{#unless this.loadingMore}}
        <div class="alert alert-info">
          {{i18n "choose_topic.none_found"}}
        </div>
      {{/unless}}
    {{/if}}
  </ConditionalLoadingSpinner>
  */
  {
    "id": "tx/FLaaU",
    "block": "[[[8,[39,0],null,[[\"@condition\"],[[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"topics\"]],[[[1,\"    \"],[8,[39,2],null,[[\"@showPosters\",\"@hideCategory\",\"@topics\",\"@expandExcerpts\",\"@bulkSelectEnabled\",\"@bulkSelectAction\",\"@canBulkSelect\",\"@selected\",\"@tagsForUser\",\"@onScroll\",\"@scrollOnLoad\",\"@toggleBulkSelect\",\"@updateAutoAddTopicsToBulkSelect\"],[[30,0,[\"showPosters\"]],[30,0,[\"hideCategory\"]],[30,0,[\"topics\"]],[30,0,[\"expandExcerpts\"]],[30,0,[\"bulkSelectEnabled\"]],[30,0,[\"bulkSelectAction\"]],[30,0,[\"canBulkSelect\"]],[30,0,[\"selected\"]],[30,0,[\"tagsForUser\"]],[30,0,[\"onScroll\"]],[30,0,[\"scrollOnLoad\"]],[30,0,[\"toggleBulkSelect\"]],[30,0,[\"updateAutoAddTopicsToBulkSelect\"]]]],null],[1,\"\\n\"]],[]],[[[41,[51,[30,0,[\"loadingMore\"]]],[[[1,\"      \"],[10,0],[14,0,\"alert alert-info\"],[12],[1,\"\\n        \"],[1,[28,[35,4],[\"choose_topic.none_found\"],null]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[]]]],[]]]]]],[],false,[\"conditional-loading-spinner\",\"if\",\"topic-list\",\"unless\",\"i18n\"]]",
    "moduleName": "discourse/components/basic-topic-list.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend((_dec = (0, _decorators.default)("topicList.loaded"), _dec2 = (0, _decorators.observes)("topicList.[]"), _dec3 = (0, _decorators.default)("topics"), (_obj = {
    loadingMore: (0, _computed.alias)("topicList.loadingMore"),
    loading: (0, _computed.not)("loaded"),
    loaded() {
      let topicList = this.topicList;
      if (topicList) {
        return topicList.get("loaded");
      } else {
        return true;
      }
    },
    _topicListChanged() {
      this._initFromTopicList(this.topicList);
    },
    _initFromTopicList(topicList) {
      if (topicList !== null) {
        this.set("topics", topicList.get("topics"));
        this.rerender();
      }
    },
    init() {
      this._super(...arguments);
      const topicList = this.topicList;
      if (topicList) {
        this._initFromTopicList(topicList);
      }
    },
    didInsertElement() {
      this._super(...arguments);
      this.topics.forEach(topic => {
        if (typeof topic.unread_by_group_member !== "undefined") {
          this.messageBus.subscribe(`/private-messages/unread-indicator/${topic.id}`, this.onMessage);
        }
      });
    },
    willDestroyElement() {
      this._super(...arguments);
      this.messageBus.unsubscribe("/private-messages/unread-indicator/*", this.onMessage);
    },
    onMessage(data) {
      const nodeClassList = document.querySelector(`.indicator-topic-${data.topic_id}`).classList;
      nodeClassList.toggle("read", !data.show_indicator);
    },
    showUnreadIndicator(topics) {
      return topics.some(topic => typeof topic.unread_by_group_member !== "undefined");
    },
    click(e) {
      // Mobile basic-topic-list doesn't use the `topic-list-item` view so
      // the event for the topic entrance is never wired up.
      if (!this.site.mobileView) {
        return;
      }
      let target = $(e.target);
      if (target.closest(".posts-map").length) {
        const topicId = target.closest("tr").attr("data-topic-id");
        if (topicId) {
          if (target.prop("tagName") !== "A") {
            let targetLinks = target.find("a");
            if (targetLinks.length) {
              target = targetLinks;
            } else {
              targetLinks = target.closest("a");
              if (targetLinks.length) {
                target = targetLinks;
              } else {
                return false;
              }
            }
          }
          const topic = this.topics.findBy("id", parseInt(topicId, 10));
          this.appEvents.trigger("topic-entrance:show", {
            topic,
            position: target.offset()
          });
        }
        return false;
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "loaded", [_dec], Object.getOwnPropertyDescriptor(_obj, "loaded"), _obj), _applyDecoratedDescriptor(_obj, "_topicListChanged", [_dec2], Object.getOwnPropertyDescriptor(_obj, "_topicListChanged"), _obj), _applyDecoratedDescriptor(_obj, "onMessage", [_decorators.bind], Object.getOwnPropertyDescriptor(_obj, "onMessage"), _obj), _applyDecoratedDescriptor(_obj, "showUnreadIndicator", [_dec3], Object.getOwnPropertyDescriptor(_obj, "showUnreadIndicator"), _obj)), _obj))));
  _exports.default = _default;
});
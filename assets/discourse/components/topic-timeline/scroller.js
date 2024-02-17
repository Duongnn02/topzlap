define("discourse/components/topic-timeline/scroller", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "discourse/components/topic-timeline/container", "I18n", "@ember/template"], function (_exports, _component, _templateFactory, _component2, _container, _I18n, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"discourse/components/topic-timeline/container",0,"I18n",0,"@ember/template"eaimeta@70e063a35619d71f
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div
    style={{this.style}}
    class="timeline-scroller"
    {{draggable
      didStartDrag=@didStartDrag
      didEndDrag=@didEndDrag
      dragMove=@dragMove
    }}
  >
    {{#if @fullscreen}}
      <div class="timeline-scroller-content">
        <div class="timeline-replies">
          {{this.repliesShort}}
        </div>
        {{#if @date}}
          <div class="timeline-ago">
            {{this.timelineAgo}}
          </div>
        {{/if}}
        {{#if (and @showDockedButton (not @dragging))}}
          <TopicTimeline::BackButton @onGoBack={{@onGoBack}} />
        {{/if}}
      </div>
      <div class="timeline-handle"></div>
    {{else}}
      <div class="timeline-handle"></div>
      <div class="timeline-scroller-content">
        <div class="timeline-replies">
          {{this.repliesShort}}
        </div>
        {{#if @date}}
          <div class="timeline-ago">
            {{this.timelineAgo}}
          </div>
        {{/if}}
        {{#if (and @showDockedButton (not @dragging))}}
          <TopicTimeline::BackButton @onGoBack={{@onGoBack}} />
        {{/if}}
      </div>
    {{/if}}
  </div>
  */
  {
    "id": "Wpva3lPa",
    "block": "[[[11,0],[16,5,[30,0,[\"style\"]]],[24,0,\"timeline-scroller\"],[4,[38,0],null,[[\"didStartDrag\",\"didEndDrag\",\"dragMove\"],[[30,1],[30,2],[30,3]]]],[12],[1,\"\\n\"],[41,[30,4],[[[1,\"    \"],[10,0],[14,0,\"timeline-scroller-content\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"timeline-replies\"],[12],[1,\"\\n        \"],[1,[30,0,[\"repliesShort\"]]],[1,\"\\n      \"],[13],[1,\"\\n\"],[41,[30,5],[[[1,\"        \"],[10,0],[14,0,\"timeline-ago\"],[12],[1,\"\\n          \"],[1,[30,0,[\"timelineAgo\"]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[41,[28,[37,2],[[30,6],[28,[37,3],[[30,7]],null]],null],[[[1,\"        \"],[8,[39,4],null,[[\"@onGoBack\"],[[30,8]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n    \"],[10,0],[14,0,\"timeline-handle\"],[12],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"timeline-handle\"],[12],[13],[1,\"\\n    \"],[10,0],[14,0,\"timeline-scroller-content\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"timeline-replies\"],[12],[1,\"\\n        \"],[1,[30,0,[\"repliesShort\"]]],[1,\"\\n      \"],[13],[1,\"\\n\"],[41,[30,5],[[[1,\"        \"],[10,0],[14,0,\"timeline-ago\"],[12],[1,\"\\n          \"],[1,[30,0,[\"timelineAgo\"]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[41,[28,[37,2],[[30,6],[28,[37,3],[[30,7]],null]],null],[[[1,\"        \"],[8,[39,4],null,[[\"@onGoBack\"],[[30,8]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\"]],[]]],[13]],[\"@didStartDrag\",\"@didEndDrag\",\"@dragMove\",\"@fullscreen\",\"@date\",\"@showDockedButton\",\"@dragging\",\"@onGoBack\"],false,[\"draggable\",\"if\",\"and\",\"not\",\"topic-timeline/back-button\"]]",
    "moduleName": "discourse/components/topic-timeline/scroller.hbs",
    "isStrictMode": false
  });
  class TopicTimelineScroller extends _component2.default {
    constructor() {
      super(...arguments);
      _defineProperty(this, "style", (0, _template.htmlSafe)(`height: ${_container.SCROLLER_HEIGHT}px`));
    }
    get repliesShort() {
      const current = this.args.current;
      const total = this.args.total;
      return _I18n.default.t(`topic.timeline.replies_short`, {
        current,
        total
      });
    }
    get timelineAgo() {
      return (0, _container.timelineDate)(this.args.date);
    }
  }
  _exports.default = TopicTimelineScroller;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, TopicTimelineScroller);
});
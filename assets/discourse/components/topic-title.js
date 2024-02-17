define("discourse/components/topic-title", ["exports", "@ember/component", "@ember/template-factory", "discourse/mixins/key-enter-escape", "@ember/runloop"], function (_exports, _component, _templateFactory, _keyEnterEscape, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addTopicTitleDecorator = addTopicTitleDecorator;
  _exports.default = void 0;
  _exports.resetTopicTitleDecorators = resetTopicTitleDecorators;
  _exports.topicTitleDecorators = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/mixins/key-enter-escape",0,"@ember/runloop"eaimeta@70e063a35619d71f
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <div class="container">
    <div class="title-wrapper">
      {{yield}}
    </div>
    <span>
      <PluginOutlet
        @name="topic-title"
        @connectorTagName="div"
        @outletArgs={{hash model=this.model}}
      />
    </span>
  </div>
  */
  {
    "id": "57nlOKqN",
    "block": "[[[10,0],[14,0,\"container\"],[12],[1,\"\\n  \"],[10,0],[14,0,\"title-wrapper\"],[12],[1,\"\\n    \"],[18,1,null],[1,\"\\n  \"],[13],[1,\"\\n  \"],[10,1],[12],[1,\"\\n    \"],[8,[39,1],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"topic-title\",\"div\",[28,[37,2],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"],[13]],[\"&default\"],false,[\"yield\",\"plugin-outlet\",\"hash\"]]",
    "moduleName": "discourse/components/topic-title.hbs",
    "isStrictMode": false
  });
  let topicTitleDecorators = [];
  _exports.topicTitleDecorators = topicTitleDecorators;
  function addTopicTitleDecorator(decorator) {
    topicTitleDecorators.push(decorator);
  }
  function resetTopicTitleDecorators() {
    topicTitleDecorators.length = 0;
  }
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_keyEnterEscape.default, {
    elementId: "topic-title",
    didInsertElement() {
      this._super(...arguments);
      (0, _runloop.schedule)("afterRender", () => {
        if (this.element && !this.isDestroying && !this.isDestroyed) {
          const fancyTitle = this.element.querySelector(".fancy-title");
          fancyTitle && topicTitleDecorators && topicTitleDecorators.forEach(cb => cb(this.model, fancyTitle, "topic-title"));
        }
      });
    }
  }));
  _exports.default = _default;
});
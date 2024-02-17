define("discourse/templates/modal/feature-topic-on-profile", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @class="feature-topic-on-profile" @id="choosing-topic">
    <ChooseTopic
      @currentTopicId={{this.model.featured_topic.id}}
      @selectedTopicId={{this.newFeaturedTopicId}}
      @additionalFilters="status:public"
      @label="user.feature_topic_on_profile.search_label"
      @topicChangedCallback={{action "newTopicSelected"}}
      @loadOnInit={{true}}
    />
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @action={{action "save"}}
      @class="btn-primary save-featured-topic-on-profile"
      @disabled={{this.noTopicSelected}}
      @label="user.feature_topic_on_profile.save"
    />
    <DButton
      @action={{route-action "closeModal"}}
      @label="cancel"
      @class="btn-flat"
    />
  </div>
  */
  {
    "id": "G8WaaqqE",
    "block": "[[[8,[39,0],null,[[\"@class\",\"@id\"],[\"feature-topic-on-profile\",\"choosing-topic\"]],[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@currentTopicId\",\"@selectedTopicId\",\"@additionalFilters\",\"@label\",\"@topicChangedCallback\",\"@loadOnInit\"],[[30,0,[\"model\",\"featured_topic\",\"id\"]],[30,0,[\"newFeaturedTopicId\"]],\"status:public\",\"user.feature_topic_on_profile.search_label\",[28,[37,2],[[30,0],\"newTopicSelected\"],null],true]],null],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,3],null,[[\"@action\",\"@class\",\"@disabled\",\"@label\"],[[28,[37,2],[[30,0],\"save\"],null],\"btn-primary save-featured-topic-on-profile\",[30,0,[\"noTopicSelected\"]],\"user.feature_topic_on_profile.save\"]],null],[1,\"\\n  \"],[8,[39,3],null,[[\"@action\",\"@label\",\"@class\"],[[28,[37,4],[\"closeModal\"],null],\"cancel\",\"btn-flat\"]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"choose-topic\",\"action\",\"d-button\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/feature-topic-on-profile.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/templates/modal/move-to-topic", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @id="choosing-topic">
  
    {{#if this.model.isPrivateMessage}}
      <div class="radios">
        {{#if this.canSplitToPM}}
          <label class="radio-label" for="move-to-new-message">
            <RadioButton
              @id="move-to-new-message"
              @name="move-to-entity"
              @value="new_message"
              @selection={{this.selection}}
            />
            <b>{{i18n "topic.move_to_new_message.radio_label"}}</b>
          </label>
        {{/if}}
  
        <label class="radio-label" for="move-to-existing-message">
          <RadioButton
            @id="move-to-existing-message"
            @name="move-to-entity"
            @value="existing_message"
            @selection={{this.selection}}
          />
          <b>{{i18n "topic.move_to_existing_message.radio_label"}}</b>
        </label>
      </div>
  
      {{#if this.canSplitTopic}}
        {{#if this.newMessage}}
          <p>{{html-safe
              (i18n
                "topic.move_to_new_message.instructions"
                count=this.selectedPostsCount
              )
            }}</p>
          <form>
            <label>{{i18n "topic.move_to_new_message.message_title"}}</label>
            <TextField
              @value={{this.topicName}}
              @placeholderKey="composer.title_placeholder"
              @id="split-topic-name"
            />
  
            {{#if this.canTagMessages}}
              <label>{{i18n "tagging.tags"}}</label>
              <TagChooser @tags={{this.tags}} />
            {{/if}}
          </form>
        {{/if}}
      {{/if}}
  
      {{#if this.existingMessage}}
        <p>{{html-safe
            (i18n
              "topic.move_to_existing_message.instructions"
              count=this.selectedPostsCount
            )
          }}</p>
        <form>
          <ChooseMessage
            @currentTopicId={{this.model.id}}
            @selectedTopicId={{this.selectedTopicId}}
          />
  
          <label>{{i18n "topic.move_to_new_message.participants"}}</label>
          <EmailGroupUserChooser
            @class="participant-selector"
            @value={{this.participants}}
            @onChange={{action (mut this.participants)}}
          />
        </form>
      {{/if}}
  
    {{else}}
  
      <div class="radios">
        {{#if this.canSplitTopic}}
          <label class="radio-label" for="move-to-new-topic">
            <RadioButton
              @id="move-to-new-topic"
              @name="move-to-entity"
              @value="new_topic"
              @selection={{this.selection}}
            />
            <b>{{i18n "topic.split_topic.radio_label"}}</b>
          </label>
        {{/if}}
  
        <label class="radio-label" for="move-to-existing-topic">
          <RadioButton
            @id="move-to-existing-topic"
            @name="move-to-entity"
            @value="existing_topic"
            @selection={{this.selection}}
          />
          <b>{{i18n "topic.merge_topic.radio_label"}}</b>
        </label>
  
        {{#if this.canSplitToPM}}
          <label class="radio-label" for="move-to-new-message">
            <RadioButton
              @id="move-to-new-message"
              @name="move-to-entity"
              @value="new_message"
              @selection={{this.selection}}
            />
            <b>{{i18n "topic.move_to_new_message.radio_label"}}</b>
          </label>
        {{/if}}
      </div>
  
      {{#if this.existingTopic}}
        <p>{{html-safe
            (i18n "topic.merge_topic.instructions" count=this.selectedPostsCount)
          }}</p>
        <form>
          <ChooseTopic
            @currentTopicId={{this.model.id}}
            @selectedTopicId={{this.selectedTopicId}}
          />
        </form>
      {{/if}}
  
      {{#if this.canSplitTopic}}
        {{#if this.newTopic}}
          <p>{{html-safe
              (i18n
                "topic.split_topic.instructions" count=this.selectedPostsCount
              )
            }}</p>
          <form>
            <label>{{i18n "topic.split_topic.topic_name"}}</label>
            <TextField
              @value={{this.topicName}}
              @placeholderKey="composer.title_placeholder"
              @id="split-topic-name"
            />
  
            <label>{{i18n "categories.category"}}</label>
            <CategoryChooser
              @value={{this.categoryId}}
              @class="small"
              @onChange={{action (mut this.categoryId)}}
            />
            {{#if this.canAddTags}}
              <label>{{i18n "tagging.tags"}}</label>
              <TagChooser @tags={{this.tags}} @categoryId={{this.categoryId}} />
            {{/if}}
          </form>
        {{/if}}
      {{/if}}
  
      {{#if this.canSplitTopic}}
        {{#if this.newMessage}}
          <p>{{html-safe
              (i18n
                "topic.move_to_new_message.instructions"
                count=this.selectedPostsCount
              )
            }}</p>
          <form>
            <label>{{i18n "topic.move_to_new_message.message_title"}}</label>
            <TextField
              @value={{this.topicName}}
              @placeholderKey="composer.title_placeholder"
              @id="split-topic-name"
            />
  
            {{#if this.canTagMessages}}
              <label>{{i18n "tagging.tags"}}</label>
              <TagChooser @tags={{this.tags}} />
            {{/if}}
          </form>
        {{/if}}
      {{/if}}
    {{/if}}
  
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @disabled={{this.buttonDisabled}}
      @action={{action "performMove"}}
      @icon="sign-out-alt"
      @translatedLabel={{this.buttonTitle}}
    />
  </div>
  */
  {
    "id": "01hGfuYS",
    "block": "[[[8,[39,0],null,[[\"@id\"],[\"choosing-topic\"]],[[\"default\"],[[[[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"isPrivateMessage\"]],[[[1,\"    \"],[10,0],[14,0,\"radios\"],[12],[1,\"\\n\"],[41,[30,0,[\"canSplitToPM\"]],[[[1,\"        \"],[10,\"label\"],[14,0,\"radio-label\"],[14,\"for\",\"move-to-new-message\"],[12],[1,\"\\n          \"],[8,[39,2],null,[[\"@id\",\"@name\",\"@value\",\"@selection\"],[\"move-to-new-message\",\"move-to-entity\",\"new_message\",[30,0,[\"selection\"]]]],null],[1,\"\\n          \"],[10,\"b\"],[12],[1,[28,[35,3],[\"topic.move_to_new_message.radio_label\"],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[10,\"label\"],[14,0,\"radio-label\"],[14,\"for\",\"move-to-existing-message\"],[12],[1,\"\\n        \"],[8,[39,2],null,[[\"@id\",\"@name\",\"@value\",\"@selection\"],[\"move-to-existing-message\",\"move-to-entity\",\"existing_message\",[30,0,[\"selection\"]]]],null],[1,\"\\n        \"],[10,\"b\"],[12],[1,[28,[35,3],[\"topic.move_to_existing_message.radio_label\"],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"canSplitTopic\"]],[[[41,[30,0,[\"newMessage\"]],[[[1,\"        \"],[10,2],[12],[1,[28,[35,4],[[28,[37,3],[\"topic.move_to_new_message.instructions\"],[[\"count\"],[[30,0,[\"selectedPostsCount\"]]]]]],null]],[13],[1,\"\\n        \"],[10,\"form\"],[12],[1,\"\\n          \"],[10,\"label\"],[12],[1,[28,[35,3],[\"topic.move_to_new_message.message_title\"],null]],[13],[1,\"\\n          \"],[8,[39,5],null,[[\"@value\",\"@placeholderKey\",\"@id\"],[[30,0,[\"topicName\"]],\"composer.title_placeholder\",\"split-topic-name\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"canTagMessages\"]],[[[1,\"            \"],[10,\"label\"],[12],[1,[28,[35,3],[\"tagging.tags\"],null]],[13],[1,\"\\n            \"],[8,[39,6],null,[[\"@tags\"],[[30,0,[\"tags\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n\"],[41,[30,0,[\"existingMessage\"]],[[[1,\"      \"],[10,2],[12],[1,[28,[35,4],[[28,[37,3],[\"topic.move_to_existing_message.instructions\"],[[\"count\"],[[30,0,[\"selectedPostsCount\"]]]]]],null]],[13],[1,\"\\n      \"],[10,\"form\"],[12],[1,\"\\n        \"],[8,[39,7],null,[[\"@currentTopicId\",\"@selectedTopicId\"],[[30,0,[\"model\",\"id\"]],[30,0,[\"selectedTopicId\"]]]],null],[1,\"\\n\\n        \"],[10,\"label\"],[12],[1,[28,[35,3],[\"topic.move_to_new_message.participants\"],null]],[13],[1,\"\\n        \"],[8,[39,8],null,[[\"@class\",\"@value\",\"@onChange\"],[\"participant-selector\",[30,0,[\"participants\"]],[28,[37,9],[[30,0],[28,[37,10],[[30,0,[\"participants\"]]],null]],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"]],[]],[[[1,\"\\n    \"],[10,0],[14,0,\"radios\"],[12],[1,\"\\n\"],[41,[30,0,[\"canSplitTopic\"]],[[[1,\"        \"],[10,\"label\"],[14,0,\"radio-label\"],[14,\"for\",\"move-to-new-topic\"],[12],[1,\"\\n          \"],[8,[39,2],null,[[\"@id\",\"@name\",\"@value\",\"@selection\"],[\"move-to-new-topic\",\"move-to-entity\",\"new_topic\",[30,0,[\"selection\"]]]],null],[1,\"\\n          \"],[10,\"b\"],[12],[1,[28,[35,3],[\"topic.split_topic.radio_label\"],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[10,\"label\"],[14,0,\"radio-label\"],[14,\"for\",\"move-to-existing-topic\"],[12],[1,\"\\n        \"],[8,[39,2],null,[[\"@id\",\"@name\",\"@value\",\"@selection\"],[\"move-to-existing-topic\",\"move-to-entity\",\"existing_topic\",[30,0,[\"selection\"]]]],null],[1,\"\\n        \"],[10,\"b\"],[12],[1,[28,[35,3],[\"topic.merge_topic.radio_label\"],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"canSplitToPM\"]],[[[1,\"        \"],[10,\"label\"],[14,0,\"radio-label\"],[14,\"for\",\"move-to-new-message\"],[12],[1,\"\\n          \"],[8,[39,2],null,[[\"@id\",\"@name\",\"@value\",\"@selection\"],[\"move-to-new-message\",\"move-to-entity\",\"new_message\",[30,0,[\"selection\"]]]],null],[1,\"\\n          \"],[10,\"b\"],[12],[1,[28,[35,3],[\"topic.move_to_new_message.radio_label\"],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"existingTopic\"]],[[[1,\"      \"],[10,2],[12],[1,[28,[35,4],[[28,[37,3],[\"topic.merge_topic.instructions\"],[[\"count\"],[[30,0,[\"selectedPostsCount\"]]]]]],null]],[13],[1,\"\\n      \"],[10,\"form\"],[12],[1,\"\\n        \"],[8,[39,11],null,[[\"@currentTopicId\",\"@selectedTopicId\"],[[30,0,[\"model\",\"id\"]],[30,0,[\"selectedTopicId\"]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canSplitTopic\"]],[[[41,[30,0,[\"newTopic\"]],[[[1,\"        \"],[10,2],[12],[1,[28,[35,4],[[28,[37,3],[\"topic.split_topic.instructions\"],[[\"count\"],[[30,0,[\"selectedPostsCount\"]]]]]],null]],[13],[1,\"\\n        \"],[10,\"form\"],[12],[1,\"\\n          \"],[10,\"label\"],[12],[1,[28,[35,3],[\"topic.split_topic.topic_name\"],null]],[13],[1,\"\\n          \"],[8,[39,5],null,[[\"@value\",\"@placeholderKey\",\"@id\"],[[30,0,[\"topicName\"]],\"composer.title_placeholder\",\"split-topic-name\"]],null],[1,\"\\n\\n          \"],[10,\"label\"],[12],[1,[28,[35,3],[\"categories.category\"],null]],[13],[1,\"\\n          \"],[8,[39,12],null,[[\"@value\",\"@class\",\"@onChange\"],[[30,0,[\"categoryId\"]],\"small\",[28,[37,9],[[30,0],[28,[37,10],[[30,0,[\"categoryId\"]]],null]],null]]],null],[1,\"\\n\"],[41,[30,0,[\"canAddTags\"]],[[[1,\"            \"],[10,\"label\"],[12],[1,[28,[35,3],[\"tagging.tags\"],null]],[13],[1,\"\\n            \"],[8,[39,6],null,[[\"@tags\",\"@categoryId\"],[[30,0,[\"tags\"]],[30,0,[\"categoryId\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n\"],[41,[30,0,[\"canSplitTopic\"]],[[[41,[30,0,[\"newMessage\"]],[[[1,\"        \"],[10,2],[12],[1,[28,[35,4],[[28,[37,3],[\"topic.move_to_new_message.instructions\"],[[\"count\"],[[30,0,[\"selectedPostsCount\"]]]]]],null]],[13],[1,\"\\n        \"],[10,\"form\"],[12],[1,\"\\n          \"],[10,\"label\"],[12],[1,[28,[35,3],[\"topic.move_to_new_message.message_title\"],null]],[13],[1,\"\\n          \"],[8,[39,5],null,[[\"@value\",\"@placeholderKey\",\"@id\"],[[30,0,[\"topicName\"]],\"composer.title_placeholder\",\"split-topic-name\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"canTagMessages\"]],[[[1,\"            \"],[10,\"label\"],[12],[1,[28,[35,3],[\"tagging.tags\"],null]],[13],[1,\"\\n            \"],[8,[39,6],null,[[\"@tags\"],[[30,0,[\"tags\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n\"]],[]],null]],[]],null]],[]]],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,13],null,[[\"@class\",\"@disabled\",\"@action\",\"@icon\",\"@translatedLabel\"],[\"btn-primary\",[30,0,[\"buttonDisabled\"]],[28,[37,9],[[30,0],\"performMove\"],null],\"sign-out-alt\",[30,0,[\"buttonTitle\"]]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"if\",\"radio-button\",\"i18n\",\"html-safe\",\"text-field\",\"tag-chooser\",\"choose-message\",\"email-group-user-chooser\",\"action\",\"mut\",\"choose-topic\",\"category-chooser\",\"d-button\"]]",
    "moduleName": "discourse/templates/modal/move-to-topic.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
define("discourse/templates/modal/share-topic", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody
    @rawTitle={{if
      this.post
      (i18n "post.share.title" post_number=this.post.post_number)
      (i18n "topic.share.title")
    }}
    @rawSubtitle={{if this.post this.displayDate}}
  >
    <form>
      <div class="input-group invite-link">
        <label for="invite-link">
          {{if
            this.post
            (i18n "post.share.instructions" post_number=this.post.post_number)
            (i18n "topic.share.instructions")
          }}
        </label>
        <div class="link-share-container">
          <Input
            id="invite-link"
            name="invite-link"
            class="invite-link"
            @value={{this.url}}
            readonly={{true}}
          />
          <CopyButton @selector="input.invite-link" />
        </div>
      </div>
  
      <div class="link-share-actions">
        <div class="sources">
          {{#each this.sources as |s|}}
            <ShareSource
              @source={{s}}
              @title={{this.topic.title}}
              @action={{action "share"}}
            />
          {{/each}}
  
          {{#if this.allowInvites}}
            <DButton
              @class="btn-default invite"
              @label="topic.share.invite_users"
              @icon="user-plus"
              @action={{action "inviteUsers"}}
            />
          {{/if}}
  
          {{#if this.topic.details.can_reply_as_new_topic}}
            {{#if this.topic.isPrivateMessage}}
              <DButton
                @action={{action "replyAsNewTopic"}}
                @class="btn-default new-topic"
                @icon="plus"
                @aria-label="post.reply_as_new_private_message"
                @title="post.reply_as_new_private_message"
                @label="user.new_private_message"
              />
            {{else}}
              <DButton
                @action={{action "replyAsNewTopic"}}
                @class="btn-default new-topic"
                @icon="plus"
                @aria-label="post.reply_as_new_topic"
                @title="post.reply_as_new_topic"
                @label="topic.create"
              />
            {{/if}}
          {{/if}}
        </div>
      </div>
    </form>
  </DModalBody>
  */
  {
    "id": "e9X+ZZ+e",
    "block": "[[[8,[39,0],null,[[\"@rawTitle\",\"@rawSubtitle\"],[[52,[30,0,[\"post\"]],[28,[37,2],[\"post.share.title\"],[[\"post_number\"],[[30,0,[\"post\",\"post_number\"]]]]],[28,[37,2],[\"topic.share.title\"],null]],[52,[30,0,[\"post\"]],[30,0,[\"displayDate\"]]]]],[[\"default\"],[[[[1,\"\\n  \"],[10,\"form\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"input-group invite-link\"],[12],[1,\"\\n      \"],[10,\"label\"],[14,\"for\",\"invite-link\"],[12],[1,\"\\n        \"],[1,[52,[30,0,[\"post\"]],[28,[37,2],[\"post.share.instructions\"],[[\"post_number\"],[[30,0,[\"post\",\"post_number\"]]]]],[28,[37,2],[\"topic.share.instructions\"],null]]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"link-share-container\"],[12],[1,\"\\n        \"],[8,[39,3],[[24,1,\"invite-link\"],[24,3,\"invite-link\"],[24,0,\"invite-link\"],[16,\"readonly\",true]],[[\"@value\"],[[30,0,[\"url\"]]]],null],[1,\"\\n        \"],[8,[39,4],null,[[\"@selector\"],[\"input.invite-link\"]],null],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,0,\"link-share-actions\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"sources\"],[12],[1,\"\\n\"],[42,[28,[37,6],[[28,[37,6],[[30,0,[\"sources\"]]],null]],null],null,[[[1,\"          \"],[8,[39,7],null,[[\"@source\",\"@title\",\"@action\"],[[30,1],[30,0,[\"topic\",\"title\"]],[28,[37,8],[[30,0],\"share\"],null]]],null],[1,\"\\n\"]],[1]],null],[1,\"\\n\"],[41,[30,0,[\"allowInvites\"]],[[[1,\"          \"],[8,[39,9],null,[[\"@class\",\"@label\",\"@icon\",\"@action\"],[\"btn-default invite\",\"topic.share.invite_users\",\"user-plus\",[28,[37,8],[[30,0],\"inviteUsers\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"topic\",\"details\",\"can_reply_as_new_topic\"]],[[[41,[30,0,[\"topic\",\"isPrivateMessage\"]],[[[1,\"            \"],[8,[39,9],null,[[\"@action\",\"@class\",\"@icon\",\"@aria-label\",\"@title\",\"@label\"],[[28,[37,8],[[30,0],\"replyAsNewTopic\"],null],\"btn-default new-topic\",\"plus\",\"post.reply_as_new_private_message\",\"post.reply_as_new_private_message\",\"user.new_private_message\"]],null],[1,\"\\n\"]],[]],[[[1,\"            \"],[8,[39,9],null,[[\"@action\",\"@class\",\"@icon\",\"@aria-label\",\"@title\",\"@label\"],[[28,[37,8],[[30,0],\"replyAsNewTopic\"],null],\"btn-default new-topic\",\"plus\",\"post.reply_as_new_topic\",\"post.reply_as_new_topic\",\"topic.create\"]],null],[1,\"\\n\"]],[]]]],[]],null],[1,\"      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]]],[\"s\"],false,[\"d-modal-body\",\"if\",\"i18n\",\"input\",\"copy-button\",\"each\",\"-track-array\",\"share-source\",\"action\",\"d-button\"]]",
    "moduleName": "discourse/templates/modal/share-topic.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
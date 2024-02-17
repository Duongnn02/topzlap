define("discourse/templates/modal/change-owner", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @class="change-ownership">
    <span>
      {{html-safe
        (i18n
          (if
            this.selectedPostsUsername
            "topic.change_owner.instructions"
            "topic.change_owner.instructions_without_old_user"
          )
          count=this.selectedPostsCount
          old_user=this.selectedPostsUsername
        )
      }}
    </span>
  
    <form>
      <label></label>
      <EmailGroupUserChooser
        @value={{this.newOwner}}
        @autofocus={{true}}
        @onChange={{action "updateNewOwner"}}
        @options={{hash
          maximum=1
          filterPlaceholder="topic.change_owner.placeholder"
        }}
      />
    </form>
  </DModalBody>
  
  <div class="modal-footer">
    <DButton
      @class="btn-primary"
      @action={{action "changeOwnershipOfPosts"}}
      @disabled={{this.buttonDisabled}}
      @label={{if this.saving "saving" "topic.change_owner.action"}}
    />
  </div>
  */
  {
    "id": "CCZGPp/E",
    "block": "[[[8,[39,0],null,[[\"@class\"],[\"change-ownership\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,1],[12],[1,\"\\n    \"],[1,[28,[35,1],[[28,[37,2],[[52,[30,0,[\"selectedPostsUsername\"]],\"topic.change_owner.instructions\",\"topic.change_owner.instructions_without_old_user\"]],[[\"count\",\"old_user\"],[[30,0,[\"selectedPostsCount\"]],[30,0,[\"selectedPostsUsername\"]]]]]],null]],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[10,\"form\"],[12],[1,\"\\n    \"],[10,\"label\"],[12],[13],[1,\"\\n    \"],[8,[39,4],null,[[\"@value\",\"@autofocus\",\"@onChange\",\"@options\"],[[30,0,[\"newOwner\"]],true,[28,[37,5],[[30,0],\"updateNewOwner\"],null],[28,[37,6],null,[[\"maximum\",\"filterPlaceholder\"],[1,\"topic.change_owner.placeholder\"]]]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,7],null,[[\"@class\",\"@action\",\"@disabled\",\"@label\"],[\"btn-primary\",[28,[37,5],[[30,0],\"changeOwnershipOfPosts\"],null],[30,0,[\"buttonDisabled\"]],[52,[30,0,[\"saving\"]],\"saving\",\"topic.change_owner.action\"]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"html-safe\",\"i18n\",\"if\",\"email-group-user-chooser\",\"action\",\"hash\",\"d-button\"]]",
    "moduleName": "discourse/templates/modal/change-owner.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
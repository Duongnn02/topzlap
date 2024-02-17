define("discourse/templates/modal/create-invite-bulk", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <CreateInviteUploader as |status|>
    <DModalBody @title="user.invited.bulk_invite.text">
      {{#if status.uploaded}}
        {{i18n "user.invited.bulk_invite.success"}}
      {{else}}
        {{html-safe (i18n "user.invited.bulk_invite.instructions")}}
  
        <input
          id="csv-file"
          disabled={{status.uploading}}
          type="file"
          accept=".csv"
        />
      {{/if}}
    </DModalBody>
  
    <div class="modal-footer">
      {{#unless status.uploaded}}
        <DButton
          @icon={{if this.isEmail "envelope" "link"}}
          @translatedLabel={{if
            status.uploading
            (i18n
              "user.invited.bulk_invite.progress" progress=status.uploadProgress
            )
            (i18n "user.invited.bulk_invite.text")
          }}
          @class="btn-primary"
          @action={{status.startUpload}}
          @disabled={{status.submitDisabled}}
        />
      {{/unless}}
  
      <DButton
        @label="close"
        @class="btn-primary"
        @action={{route-action "closeModal"}}
      />
    </div>
  </CreateInviteUploader>
  */
  {
    "id": "ax3AIx2p",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[8,[39,1],null,[[\"@title\"],[\"user.invited.bulk_invite.text\"]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,1,[\"uploaded\"]],[[[1,\"      \"],[1,[28,[35,3],[\"user.invited.bulk_invite.success\"],null]],[1,\"\\n\"]],[]],[[[1,\"      \"],[1,[28,[35,4],[[28,[37,3],[\"user.invited.bulk_invite.instructions\"],null]],null]],[1,\"\\n\\n      \"],[10,\"input\"],[14,1,\"csv-file\"],[15,\"disabled\",[30,1,[\"uploading\"]]],[14,\"accept\",\".csv\"],[14,4,\"file\"],[12],[13],[1,\"\\n\"]],[]]],[1,\"  \"]],[]]]]],[1,\"\\n\\n  \"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n\"],[41,[51,[30,1,[\"uploaded\"]]],[[[1,\"      \"],[8,[39,6],null,[[\"@icon\",\"@translatedLabel\",\"@class\",\"@action\",\"@disabled\"],[[52,[30,0,[\"isEmail\"]],\"envelope\",\"link\"],[52,[30,1,[\"uploading\"]],[28,[37,3],[\"user.invited.bulk_invite.progress\"],[[\"progress\"],[[30,1,[\"uploadProgress\"]]]]],[28,[37,3],[\"user.invited.bulk_invite.text\"],null]],\"btn-primary\",[30,1,[\"startUpload\"]],[30,1,[\"submitDisabled\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[8,[39,6],null,[[\"@label\",\"@class\",\"@action\"],[\"close\",\"btn-primary\",[28,[37,7],[\"closeModal\"],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[1]]]]]],[\"status\"],false,[\"create-invite-uploader\",\"d-modal-body\",\"if\",\"i18n\",\"html-safe\",\"unless\",\"d-button\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/create-invite-bulk.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
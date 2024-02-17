define("discourse/templates/modal/avatar-selector", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @title="user.change_avatar.title" @class="avatar-selector">
    {{#if this.showSelectableAvatars}}
      <div class="selectable-avatars">
        {{#each this.selectableAvatars as |avatar|}}
          <a
            href
            class="selectable-avatar"
            {{on "click" (fn this.selectAvatar avatar)}}
          >
            {{bound-avatar-template avatar "huge"}}
          </a>
        {{/each}}
      </div>
      {{#if this.showAvatarUploader}}
        <h4>{{html-safe (i18n "user.change_avatar.use_custom")}}</h4>
      {{/if}}
    {{/if}}
    {{#if this.showAvatarUploader}}
      {{#if this.user.use_logo_small_as_avatar}}
        <div class="avatar-choice">
          <RadioButton
            @id="logo-small"
            @name="logo"
            @value="logo"
            @selection={{this.selected}}
            @onChange={{this.onSelectedChanged}}
          />
          <label class="radio" for="logo-small">{{bound-avatar-template
              this.siteSettings.site_logo_small_url
              "large"
            }}
            {{html-safe (i18n "user.change_avatar.logo_small")}}</label>
        </div>
      {{/if}}
      <div class="avatar-choice">
        <RadioButton
          @id="system-avatar"
          @name="avatar"
          @value="system"
          @selection={{this.selected}}
          @onChange={{this.onSelectedChanged}}
        />
        <label class="radio" for="system-avatar">{{bound-avatar-template
            this.user.system_avatar_template
            "large"
          }}
          {{html-safe (i18n "user.change_avatar.letter_based")}}</label>
      </div>
      {{#if this.allowAvatarUpload}}
        <div class="avatar-choice">
          <RadioButton
            @id="gravatar"
            @name="avatar"
            @value="gravatar"
            @selection={{this.selected}}
            @onChange={{this.onSelectedChanged}}
          />
          <label class="radio" for="gravatar">{{bound-avatar-template
              this.user.gravatar_avatar_template
              "large"
            }}
            <span>{{html-safe
                (i18n
                  "user.change_avatar.gravatar"
                  gravatarName=this.gravatarName
                  gravatarBaseUrl=this.gravatarBaseUrl
                  gravatarLoginUrl=this.gravatarLoginUrl
                )
              }}
              {{this.user.email}}</span></label>
  
          <DButton
            @action={{action "refreshGravatar"}}
            @translatedTitle={{i18n
              "user.change_avatar.refresh_gravatar_title"
              gravatarName=this.gravatarName
            }}
            @disabled={{this.gravatarRefreshDisabled}}
            @icon="sync"
            @class="btn-default avatar-selector-refresh-gravatar"
          />
  
          {{#if this.gravatarFailed}}
            <p class="error">{{I18n
                "user.change_avatar.gravatar_failed"
                gravatarName=this.gravatarName
              }}</p>
          {{/if}}
        </div>
        <div class="avatar-choice">
          <RadioButton
            @id="uploaded-avatar"
            @name="avatar"
            @value="custom"
            @selection={{this.selected}}
            @onChange={{this.onSelectedChanged}}
          />
          <label class="radio" for="uploaded-avatar">
            {{#if this.user.custom_avatar_template}}
              {{bound-avatar-template this.user.custom_avatar_template "large"}}
              {{i18n "user.change_avatar.uploaded_avatar"}}
            {{else}}
              {{i18n "user.change_avatar.uploaded_avatar_empty"}}
            {{/if}}
          </label>
          <AvatarUploader
            @user_id={{this.user.id}}
            @uploadedAvatarTemplate={{this.user.custom_avatar_template}}
            @uploadedAvatarId={{this.user.custom_avatar_upload_id}}
            @uploading={{this.uploading}}
            @class="avatar-uploader"
            @id="avatar-uploader"
            @done={{action "uploadComplete"}}
          />
        </div>
      {{/if}}
    {{/if}}
  </DModalBody>
  
  {{#if this.showAvatarUploader}}
    <div class="modal-footer">
      <DButton
        @action={{action "saveAvatarSelection"}}
        @class="btn-primary"
        @disabled={{this.submitDisabled}}
        @label="save"
      />
      <DModalCancel @close={{route-action "closeModal"}} />
    </div>
  {{/if}}
  */
  {
    "id": "iCLUrTYw",
    "block": "[[[8,[39,0],null,[[\"@title\",\"@class\"],[\"user.change_avatar.title\",\"avatar-selector\"]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"showSelectableAvatars\"]],[[[1,\"    \"],[10,0],[14,0,\"selectable-avatars\"],[12],[1,\"\\n\"],[42,[28,[37,3],[[28,[37,3],[[30,0,[\"selectableAvatars\"]]],null]],null],null,[[[1,\"        \"],[11,3],[24,6,\"\"],[24,0,\"selectable-avatar\"],[4,[38,4],[\"click\",[28,[37,5],[[30,0,[\"selectAvatar\"]],[30,1]],null]],null],[12],[1,\"\\n          \"],[1,[28,[35,6],[[30,1],\"huge\"],null]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[1]],null],[1,\"    \"],[13],[1,\"\\n\"],[41,[30,0,[\"showAvatarUploader\"]],[[[1,\"      \"],[10,\"h4\"],[12],[1,[28,[35,7],[[28,[37,8],[\"user.change_avatar.use_custom\"],null]],null]],[13],[1,\"\\n\"]],[]],null]],[]],null],[41,[30,0,[\"showAvatarUploader\"]],[[[41,[30,0,[\"user\",\"use_logo_small_as_avatar\"]],[[[1,\"      \"],[10,0],[14,0,\"avatar-choice\"],[12],[1,\"\\n        \"],[8,[39,9],null,[[\"@id\",\"@name\",\"@value\",\"@selection\",\"@onChange\"],[\"logo-small\",\"logo\",\"logo\",[30,0,[\"selected\"]],[30,0,[\"onSelectedChanged\"]]]],null],[1,\"\\n        \"],[10,\"label\"],[14,0,\"radio\"],[14,\"for\",\"logo-small\"],[12],[1,[28,[35,6],[[30,0,[\"siteSettings\",\"site_logo_small_url\"]],\"large\"],null]],[1,\"\\n          \"],[1,[28,[35,7],[[28,[37,8],[\"user.change_avatar.logo_small\"],null]],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"    \"],[10,0],[14,0,\"avatar-choice\"],[12],[1,\"\\n      \"],[8,[39,9],null,[[\"@id\",\"@name\",\"@value\",\"@selection\",\"@onChange\"],[\"system-avatar\",\"avatar\",\"system\",[30,0,[\"selected\"]],[30,0,[\"onSelectedChanged\"]]]],null],[1,\"\\n      \"],[10,\"label\"],[14,0,\"radio\"],[14,\"for\",\"system-avatar\"],[12],[1,[28,[35,6],[[30,0,[\"user\",\"system_avatar_template\"]],\"large\"],null]],[1,\"\\n        \"],[1,[28,[35,7],[[28,[37,8],[\"user.change_avatar.letter_based\"],null]],null]],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[41,[30,0,[\"allowAvatarUpload\"]],[[[1,\"      \"],[10,0],[14,0,\"avatar-choice\"],[12],[1,\"\\n        \"],[8,[39,9],null,[[\"@id\",\"@name\",\"@value\",\"@selection\",\"@onChange\"],[\"gravatar\",\"avatar\",\"gravatar\",[30,0,[\"selected\"]],[30,0,[\"onSelectedChanged\"]]]],null],[1,\"\\n        \"],[10,\"label\"],[14,0,\"radio\"],[14,\"for\",\"gravatar\"],[12],[1,[28,[35,6],[[30,0,[\"user\",\"gravatar_avatar_template\"]],\"large\"],null]],[1,\"\\n          \"],[10,1],[12],[1,[28,[35,7],[[28,[37,8],[\"user.change_avatar.gravatar\"],[[\"gravatarName\",\"gravatarBaseUrl\",\"gravatarLoginUrl\"],[[30,0,[\"gravatarName\"]],[30,0,[\"gravatarBaseUrl\"]],[30,0,[\"gravatarLoginUrl\"]]]]]],null]],[1,\"\\n            \"],[1,[30,0,[\"user\",\"email\"]]],[13],[13],[1,\"\\n\\n        \"],[8,[39,10],null,[[\"@action\",\"@translatedTitle\",\"@disabled\",\"@icon\",\"@class\"],[[28,[37,11],[[30,0],\"refreshGravatar\"],null],[28,[37,8],[\"user.change_avatar.refresh_gravatar_title\"],[[\"gravatarName\"],[[30,0,[\"gravatarName\"]]]]],[30,0,[\"gravatarRefreshDisabled\"]],\"sync\",\"btn-default avatar-selector-refresh-gravatar\"]],null],[1,\"\\n\\n\"],[41,[30,0,[\"gravatarFailed\"]],[[[1,\"          \"],[10,2],[14,0,\"error\"],[12],[1,[28,[35,12],[\"user.change_avatar.gravatar_failed\"],[[\"gravatarName\"],[[30,0,[\"gravatarName\"]]]]]],[13],[1,\"\\n\"]],[]],null],[1,\"      \"],[13],[1,\"\\n      \"],[10,0],[14,0,\"avatar-choice\"],[12],[1,\"\\n        \"],[8,[39,9],null,[[\"@id\",\"@name\",\"@value\",\"@selection\",\"@onChange\"],[\"uploaded-avatar\",\"avatar\",\"custom\",[30,0,[\"selected\"]],[30,0,[\"onSelectedChanged\"]]]],null],[1,\"\\n        \"],[10,\"label\"],[14,0,\"radio\"],[14,\"for\",\"uploaded-avatar\"],[12],[1,\"\\n\"],[41,[30,0,[\"user\",\"custom_avatar_template\"]],[[[1,\"            \"],[1,[28,[35,6],[[30,0,[\"user\",\"custom_avatar_template\"]],\"large\"],null]],[1,\"\\n            \"],[1,[28,[35,8],[\"user.change_avatar.uploaded_avatar\"],null]],[1,\"\\n\"]],[]],[[[1,\"            \"],[1,[28,[35,8],[\"user.change_avatar.uploaded_avatar_empty\"],null]],[1,\"\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n        \"],[8,[39,13],null,[[\"@user_id\",\"@uploadedAvatarTemplate\",\"@uploadedAvatarId\",\"@uploading\",\"@class\",\"@id\",\"@done\"],[[30,0,[\"user\",\"id\"]],[30,0,[\"user\",\"custom_avatar_template\"]],[30,0,[\"user\",\"custom_avatar_upload_id\"]],[30,0,[\"uploading\"]],\"avatar-uploader\",\"avatar-uploader\",[28,[37,11],[[30,0],\"uploadComplete\"],null]]],null],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[]],null]],[]]]]],[1,\"\\n\\n\"],[41,[30,0,[\"showAvatarUploader\"]],[[[1,\"  \"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n    \"],[8,[39,10],null,[[\"@action\",\"@class\",\"@disabled\",\"@label\"],[[28,[37,11],[[30,0],\"saveAvatarSelection\"],null],\"btn-primary\",[30,0,[\"submitDisabled\"]],\"save\"]],null],[1,\"\\n    \"],[8,[39,14],null,[[\"@close\"],[[28,[37,15],[\"closeModal\"],null]]],null],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"avatar\"],false,[\"d-modal-body\",\"if\",\"each\",\"-track-array\",\"on\",\"fn\",\"bound-avatar-template\",\"html-safe\",\"i18n\",\"radio-button\",\"d-button\",\"action\",\"I18n\",\"avatar-uploader\",\"d-modal-cancel\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/avatar-selector.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
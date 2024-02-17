define("discourse/components/composer-container", ["exports", "@ember/component", "@ember/template-factory", "@glimmer/component", "@ember/service"], function (_exports, _component, _templateFactory, _component2, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _class, _descriptor, _descriptor2;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@glimmer/component",0,"@ember/service"eaimeta@70e063a35619d71f
  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <ComposerBody
    @composer={{this.composer.model}}
    @showPreview={{this.composer.showPreview}}
    @openIfDraft={{this.composer.openIfDraft}}
    @typed={{this.composer.typed}}
    @cancelled={{this.composer.cancelled}}
    @save={{this.composer.saveAction}}
  >
    <div class="grippie"></div>
  
    {{#if this.composer.visible}}
      <ComposerMessages
        @composer={{this.composer.model}}
        @messageCount={{this.composer.messageCount}}
        @addLinkLookup={{this.composer.addLinkLookup}}
      />
  
      {{#if this.composer.showFullScreenPrompt}}
        <ComposerFullscreenPrompt
          @removeFullScreenExitPrompt={{this.composer.removeFullScreenExitPrompt}}
        />
      {{/if}}
  
      {{#if this.composer.model.viewOpenOrFullscreen}}
        <div
          role="form"
          aria-label={{I18n this.composer.saveLabel}}
          class="reply-area
            {{if this.composer.canEditTags 'with-tags' 'without-tags'}}"
        >
          <span class="composer-open-plugin-outlet-container">
            <PluginOutlet
              @name="composer-open"
              @connectorTagName="div"
              @outletArgs={{hash model=this.composer.model}}
            />
          </span>
  
          <div class="reply-to">
            {{#unless this.composer.model.viewFullscreen}}
              <div class="reply-details">
                <ComposerActionTitle
                  @model={{this.composer.model}}
                  @openComposer={{this.composer.openComposer}}
                  @closeComposer={{this.composer.closeComposer}}
                  @canWhisper={{this.composer.canWhisper}}
                />
  
                <PluginOutlet
                  @name="composer-action-after"
                  @outletArgs={{hash model=this.composer.model}}
                />
  
                {{#unless this.composer.site.mobileView}}
                  {{#if this.composer.model.unlistTopic}}
                    <span class="unlist">({{i18n "composer.unlist"}})</span>
                  {{/if}}
                  {{#if this.composer.isWhispering}}
                    {{#if this.composer.model.noBump}}
                      <span class="no-bump">{{d-icon "anchor"}}</span>
                    {{/if}}
                  {{/if}}
                {{/unless}}
  
                {{#if this.composer.canEdit}}
                  <LinkToInput
                    @onClick={{this.composer.displayEditReason}}
                    @showInput={{this.composer.showEditReason}}
                    @icon="info-circle"
                    @class="display-edit-reason"
                  >
                    <TextField
                      @value={{this.composer.editReason}}
                      @id="edit-reason"
                      @maxlength="255"
                      @placeholderKey="composer.edit_reason_placeholder"
                    />
                  </LinkToInput>
                {{/if}}
              </div>
            {{/unless}}
  
            <PluginOutlet
              @name="before-composer-controls"
              @outletArgs={{hash model=this.composer.model}}
            />
  
            <ComposerToggles
              @composeState={{this.composer.model.composeState}}
              @showToolbar={{this.composer.showToolbar}}
              @toggleComposer={{this.composer.toggle}}
              @toggleToolbar={{this.composer.toggleToolbar}}
              @toggleFullscreen={{this.composer.fullscreenComposer}}
              @disableTextarea={{this.composer.disableTextarea}}
            />
          </div>
  
          <ComposerEditor
            @topic={{this.composer.topic}}
            @composer={{this.composer.model}}
            @lastValidatedAt={{this.composer.lastValidatedAt}}
            @canWhisper={{this.composer.canWhisper}}
            @storeToolbarState={{this.composer.storeToolbarState}}
            @onPopupMenuAction={{this.composer.onPopupMenuAction}}
            @showUploadModal={{route-action "showUploadSelector"}}
            @popupMenuOptions={{this.composer.popupMenuOptions}}
            @draftStatus={{this.composer.model.draftStatus}}
            @isUploading={{this.composer.isUploading}}
            @isProcessingUpload={{this.composer.isProcessingUpload}}
            @allowUpload={{this.composer.allowUpload}}
            @uploadIcon={{this.composer.uploadIcon}}
            @isCancellable={{this.composer.isCancellable}}
            @uploadProgress={{this.composer.uploadProgress}}
            @groupsMentioned={{this.composer.groupsMentioned}}
            @cannotSeeMention={{this.composer.cannotSeeMention}}
            @hereMention={{this.composer.hereMention}}
            @importQuote={{this.composer.importQuote}}
            @togglePreview={{this.composer.togglePreview}}
            @processPreview={{this.composer.showPreview}}
            @showToolbar={{this.composer.showToolbar}}
            @afterRefresh={{this.composer.afterRefresh}}
            @focusTarget={{this.composer.focusTarget}}
            @disableTextarea={{this.composer.disableTextarea}}
          >
            <div class="composer-fields">
              <PluginOutlet
                @name="before-composer-fields"
                @outletArgs={{hash model=this.composer.model}}
              />
              {{#unless this.composer.model.viewFullscreen}}
                {{#if this.composer.model.canEditTitle}}
                  {{#if this.composer.model.creatingPrivateMessage}}
                    <div class="user-selector">
                      <ComposerUserSelector
                        @topicId={{this.composer.topicModel.id}}
                        @recipients={{this.composer.model.targetRecipients}}
                        @hasGroups={{this.composer.model.hasTargetGroups}}
                        @focusTarget={{this.composer.focusTarget}}
                        @class={{concat
                          "users-input"
                          (if this.composer.showWarning " can-warn")
                        }}
                      />
                      {{#if this.composer.showWarning}}
                        <label class="add-warning">
                          <Input
                            @type="checkbox"
                            @checked={{this.composer.model.isWarning}}
                          />
                          <span>{{i18n "composer.add_warning"}}</span>
                        </label>
                      {{/if}}
                    </div>
                  {{/if}}
  
                  <div
                    class="title-and-category
                      {{if this.composer.showPreview 'with-preview'}}"
                  >
                    <ComposerTitle
                      @composer={{this.composer.model}}
                      @lastValidatedAt={{this.composer.lastValidatedAt}}
                      @focusTarget={{this.composer.focusTarget}}
                    />
  
                    {{#if this.composer.model.showCategoryChooser}}
                      <div class="category-input">
                        <CategoryChooser
                          @value={{this.composer.model.categoryId}}
                          @onChange={{action
                            (mut this.composer.model.categoryId)
                          }}
                          @options={{hash
                            disabled=this.composer.disableCategoryChooser
                            scopedCategoryId=this.composer.scopedCategoryId
                            prioritizedCategoryId=this.composer.prioritizedCategoryId
                          }}
                        />
                        <PopupInputTip
                          @validation={{this.composer.categoryValidation}}
                        />
                      </div>
                    {{/if}}
  
                    {{#if this.composer.canEditTags}}
                      <MiniTagChooser
                        @value={{this.composer.model.tags}}
                        @onChange={{action (mut this.composer.model.tags)}}
                        @options={{hash
                          disabled=this.composer.disableTagsChooser
                          categoryId=this.composer.model.categoryId
                          minimum=this.composer.model.minimumRequiredTags
                        }}
                      />
                      <PopupInputTip
                        @validation={{this.composer.tagValidation}}
                      />
                    {{/if}}
  
                    <PluginOutlet
                      @name="after-title-and-category"
                      @outletArgs={{hash
                        model=this.composer.model
                        tagValidation=this.composer.tagValidation
                        canEditTags=this.composer.canEditTags
                        disabled=this.composer.disableTagsChooser
                      }}
                    />
                  </div>
                {{/if}}
  
                <span>
                  <PluginOutlet
                    @name="composer-fields"
                    @connectorTagName="div"
                    @outletArgs={{hash
                      model=this.composer.model
                      showPreview=this.composer.showPreview
                    }}
                  />
                </span>
              {{/unless}}
            </div>
          </ComposerEditor>
  
          <span>
            <PluginOutlet
              @name="composer-after-composer-editor"
              @outletArgs={{hash model=this.composer.model}}
            />
          </span>
  
          <div class="submit-panel">
            <span>
              <PluginOutlet
                @name="composer-fields-below"
                @connectorTagName="div"
                @outletArgs={{hash model=this.composer.model}}
              />
            </span>
  
            <div class="save-or-cancel">
              <ComposerSaveButton
                @action={{this.composer.saveAction}}
                @icon={{this.composer.saveIcon}}
                @label={{this.composer.saveLabel}}
                @forwardEvent={{true}}
                @disableSubmit={{this.composer.disableSubmit}}
              />
  
              {{#if this.composer.site.mobileView}}
                <a
                  href
                  {{on "click" this.composer.cancel}}
                  title={{i18n "cancel"}}
                  class="cancel"
                >
                  {{#if this.composer.canEdit}}
                    {{d-icon "times"}}
                  {{else}}
                    {{d-icon "far-trash-alt"}}
                  {{/if}}
                </a>
              {{else}}
                <a href {{on "click" this.composer.cancel}} class="cancel">{{i18n
                    "close"
                  }}</a>
              {{/if}}
  
              {{#if this.composer.site.mobileView}}
                {{#if this.composer.whisperOrUnlistTopic}}
                  <span class="whisper">
                    {{d-icon "far-eye-slash"}}
                  </span>
                {{/if}}
  
                {{#if this.composer.model.noBump}}
                  <span class="no-bump">{{d-icon "anchor"}}</span>
                {{/if}}
              {{/if}}
  
              <span>
                <PluginOutlet
                  @name="composer-after-save-or-cancel"
                  @outletArgs={{hash model=this.composer.model}}
                />
              </span>
            </div>
  
            {{#if this.composer.site.mobileView}}
              <span>
                <PluginOutlet
                  @name="composer-mobile-buttons-bottom"
                  @outletArgs={{hash model=this.composer.model}}
                />
              </span>
  
              {{#if this.composer.allowUpload}}
                <a
                  id="mobile-file-upload"
                  class="btn btn-default no-text mobile-file-upload
                    {{if this.composer.isUploading 'hidden'}}"
                  aria-label={{i18n "composer.upload_title"}}
                >
                  {{d-icon this.composer.uploadIcon}}
                </a>
              {{/if}}
  
              <a
                href
                class="btn btn-default no-text mobile-preview"
                title={{i18n "composer.show_preview"}}
                {{on "click" this.composer.togglePreview}}
                aria-label={{i18n "preview"}}
              >
                {{d-icon "desktop"}}
              </a>
  
              {{#if this.composer.showPreview}}
                <DButton
                  @action={{this.composer.togglePreview}}
                  @class="hide-preview"
                  @ariaLabel="composer.hide_preview"
                  @icon="pencil-alt"
                />
              {{/if}}
            {{/if}}
  
            {{#if
              (or this.composer.isUploading this.composer.isProcessingUpload)
            }}
              <div id="file-uploading">
                {{#if this.composer.isProcessingUpload}}
                  {{loading-spinner size="small"}}<span>{{i18n
                      "upload_selector.processing"
                    }}</span>
                {{else}}
                  {{loading-spinner size="small"}}<span>{{i18n
                      "upload_selector.uploading"
                    }}
                    {{this.composer.uploadProgress}}%</span>
                {{/if}}
  
                {{#if this.composer.isCancellable}}
                  <a
                    href
                    id="cancel-file-upload"
                    {{on "click" this.composer.cancelUpload}}
                  >{{d-icon "times"}}</a>
                {{/if}}
              </div>
            {{/if}}
  
            <div
              class={{if this.composer.isUploading "hidden"}}
              id="draft-status"
            >
              {{#if this.composer.model.draftStatus}}
                <span
                  class="draft-error"
                  title={{this.composer.model.draftStatus}}
                >
                  {{#if this.composer.model.draftConflictUser}}
                    {{avatar
                      this.composer.model.draftConflictUser
                      imageSize="small"
                    }}
                    {{d-icon "user-edit"}}
                  {{else}}
                    {{d-icon "exclamation-triangle"}}
                  {{/if}}
                  {{#unless this.composer.site.mobileView}}
                    {{this.composer.model.draftStatus}}
                  {{/unless}}
                </span>
              {{/if}}
            </div>
  
            {{#unless this.site.mobileView}}
              <DButton
                @action={{this.composer.togglePreview}}
                @translatedTitle={{this.composer.toggleText}}
                @icon="angle-double-left"
                @class={{concat
                  "btn-flat btn-mini-toggle toggle-preview "
                  (unless this.composer.showPreview "active")
                }}
              />
            {{/unless}}
          </div>
        </div>
      {{else}}
        <div class="saving-text">
          {{#if this.composer.model.createdPost}}
            {{i18n "composer.saved"}}
            <a
              href={{this.composer.createdPost.url}}
              {{on "click" this.composer.viewNewReply}}
              class="permalink"
            >{{i18n "composer.view_new_post"}}</a>
          {{else}}
            {{i18n "composer.saving"}}
            {{loading-spinner size="small"}}
          {{/if}}
        </div>
  
        <div class="draft-text">
          {{#if this.composer.model.topic}}
            {{d-icon "share"}}
            {{html-safe this.composer.draftTitle}}
          {{else}}
            {{i18n "composer.saved_draft"}}
          {{/if}}
        </div>
  
        <ComposerToggles
          @composeState={{this.composer.model.composeState}}
          @toggleFullscreen={{this.composer.openIfDraft}}
          @toggleComposer={{this.composer.toggle}}
          @toggleToolbar={{this.composer.toggleToolbar}}
        />
      {{/if}}
    {{/if}}
  </ComposerBody>
  */
  {
    "id": "EotzJboX",
    "block": "[[[8,[39,0],null,[[\"@composer\",\"@showPreview\",\"@openIfDraft\",\"@typed\",\"@cancelled\",\"@save\"],[[30,0,[\"composer\",\"model\"]],[30,0,[\"composer\",\"showPreview\"]],[30,0,[\"composer\",\"openIfDraft\"]],[30,0,[\"composer\",\"typed\"]],[30,0,[\"composer\",\"cancelled\"]],[30,0,[\"composer\",\"saveAction\"]]]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"grippie\"],[12],[13],[1,\"\\n\\n\"],[41,[30,0,[\"composer\",\"visible\"]],[[[1,\"    \"],[8,[39,2],null,[[\"@composer\",\"@messageCount\",\"@addLinkLookup\"],[[30,0,[\"composer\",\"model\"]],[30,0,[\"composer\",\"messageCount\"]],[30,0,[\"composer\",\"addLinkLookup\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"composer\",\"showFullScreenPrompt\"]],[[[1,\"      \"],[8,[39,3],null,[[\"@removeFullScreenExitPrompt\"],[[30,0,[\"composer\",\"removeFullScreenExitPrompt\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"composer\",\"model\",\"viewOpenOrFullscreen\"]],[[[1,\"      \"],[10,0],[14,\"role\",\"form\"],[15,\"aria-label\",[28,[37,4],[[30,0,[\"composer\",\"saveLabel\"]]],null]],[15,0,[29,[\"reply-area\\n          \",[52,[30,0,[\"composer\",\"canEditTags\"]],\"with-tags\",\"without-tags\"]]]],[12],[1,\"\\n        \"],[10,1],[14,0,\"composer-open-plugin-outlet-container\"],[12],[1,\"\\n          \"],[8,[39,5],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"composer-open\",\"div\",[28,[37,6],null,[[\"model\"],[[30,0,[\"composer\",\"model\"]]]]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,0,\"reply-to\"],[12],[1,\"\\n\"],[41,[51,[30,0,[\"composer\",\"model\",\"viewFullscreen\"]]],[[[1,\"            \"],[10,0],[14,0,\"reply-details\"],[12],[1,\"\\n              \"],[8,[39,8],null,[[\"@model\",\"@openComposer\",\"@closeComposer\",\"@canWhisper\"],[[30,0,[\"composer\",\"model\"]],[30,0,[\"composer\",\"openComposer\"]],[30,0,[\"composer\",\"closeComposer\"]],[30,0,[\"composer\",\"canWhisper\"]]]],null],[1,\"\\n\\n              \"],[8,[39,5],null,[[\"@name\",\"@outletArgs\"],[\"composer-action-after\",[28,[37,6],null,[[\"model\"],[[30,0,[\"composer\",\"model\"]]]]]]],null],[1,\"\\n\\n\"],[41,[51,[30,0,[\"composer\",\"site\",\"mobileView\"]]],[[[41,[30,0,[\"composer\",\"model\",\"unlistTopic\"]],[[[1,\"                  \"],[10,1],[14,0,\"unlist\"],[12],[1,\"(\"],[1,[28,[35,9],[\"composer.unlist\"],null]],[1,\")\"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"composer\",\"isWhispering\"]],[[[41,[30,0,[\"composer\",\"model\",\"noBump\"]],[[[1,\"                    \"],[10,1],[14,0,\"no-bump\"],[12],[1,[28,[35,10],[\"anchor\"],null]],[13],[1,\"\\n\"]],[]],null]],[]],null]],[]],null],[1,\"\\n\"],[41,[30,0,[\"composer\",\"canEdit\"]],[[[1,\"                \"],[8,[39,11],null,[[\"@onClick\",\"@showInput\",\"@icon\",\"@class\"],[[30,0,[\"composer\",\"displayEditReason\"]],[30,0,[\"composer\",\"showEditReason\"]],\"info-circle\",\"display-edit-reason\"]],[[\"default\"],[[[[1,\"\\n                  \"],[8,[39,12],null,[[\"@value\",\"@id\",\"@maxlength\",\"@placeholderKey\"],[[30,0,[\"composer\",\"editReason\"]],\"edit-reason\",\"255\",\"composer.edit_reason_placeholder\"]],null],[1,\"\\n                \"]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n          \"],[8,[39,5],null,[[\"@name\",\"@outletArgs\"],[\"before-composer-controls\",[28,[37,6],null,[[\"model\"],[[30,0,[\"composer\",\"model\"]]]]]]],null],[1,\"\\n\\n          \"],[8,[39,13],null,[[\"@composeState\",\"@showToolbar\",\"@toggleComposer\",\"@toggleToolbar\",\"@toggleFullscreen\",\"@disableTextarea\"],[[30,0,[\"composer\",\"model\",\"composeState\"]],[30,0,[\"composer\",\"showToolbar\"]],[30,0,[\"composer\",\"toggle\"]],[30,0,[\"composer\",\"toggleToolbar\"]],[30,0,[\"composer\",\"fullscreenComposer\"]],[30,0,[\"composer\",\"disableTextarea\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[8,[39,14],null,[[\"@topic\",\"@composer\",\"@lastValidatedAt\",\"@canWhisper\",\"@storeToolbarState\",\"@onPopupMenuAction\",\"@showUploadModal\",\"@popupMenuOptions\",\"@draftStatus\",\"@isUploading\",\"@isProcessingUpload\",\"@allowUpload\",\"@uploadIcon\",\"@isCancellable\",\"@uploadProgress\",\"@groupsMentioned\",\"@cannotSeeMention\",\"@hereMention\",\"@importQuote\",\"@togglePreview\",\"@processPreview\",\"@showToolbar\",\"@afterRefresh\",\"@focusTarget\",\"@disableTextarea\"],[[30,0,[\"composer\",\"topic\"]],[30,0,[\"composer\",\"model\"]],[30,0,[\"composer\",\"lastValidatedAt\"]],[30,0,[\"composer\",\"canWhisper\"]],[30,0,[\"composer\",\"storeToolbarState\"]],[30,0,[\"composer\",\"onPopupMenuAction\"]],[28,[37,15],[\"showUploadSelector\"],null],[30,0,[\"composer\",\"popupMenuOptions\"]],[30,0,[\"composer\",\"model\",\"draftStatus\"]],[30,0,[\"composer\",\"isUploading\"]],[30,0,[\"composer\",\"isProcessingUpload\"]],[30,0,[\"composer\",\"allowUpload\"]],[30,0,[\"composer\",\"uploadIcon\"]],[30,0,[\"composer\",\"isCancellable\"]],[30,0,[\"composer\",\"uploadProgress\"]],[30,0,[\"composer\",\"groupsMentioned\"]],[30,0,[\"composer\",\"cannotSeeMention\"]],[30,0,[\"composer\",\"hereMention\"]],[30,0,[\"composer\",\"importQuote\"]],[30,0,[\"composer\",\"togglePreview\"]],[30,0,[\"composer\",\"showPreview\"]],[30,0,[\"composer\",\"showToolbar\"]],[30,0,[\"composer\",\"afterRefresh\"]],[30,0,[\"composer\",\"focusTarget\"]],[30,0,[\"composer\",\"disableTextarea\"]]]],[[\"default\"],[[[[1,\"\\n          \"],[10,0],[14,0,\"composer-fields\"],[12],[1,\"\\n            \"],[8,[39,5],null,[[\"@name\",\"@outletArgs\"],[\"before-composer-fields\",[28,[37,6],null,[[\"model\"],[[30,0,[\"composer\",\"model\"]]]]]]],null],[1,\"\\n\"],[41,[51,[30,0,[\"composer\",\"model\",\"viewFullscreen\"]]],[[[41,[30,0,[\"composer\",\"model\",\"canEditTitle\"]],[[[41,[30,0,[\"composer\",\"model\",\"creatingPrivateMessage\"]],[[[1,\"                  \"],[10,0],[14,0,\"user-selector\"],[12],[1,\"\\n                    \"],[8,[39,16],null,[[\"@topicId\",\"@recipients\",\"@hasGroups\",\"@focusTarget\",\"@class\"],[[30,0,[\"composer\",\"topicModel\",\"id\"]],[30,0,[\"composer\",\"model\",\"targetRecipients\"]],[30,0,[\"composer\",\"model\",\"hasTargetGroups\"]],[30,0,[\"composer\",\"focusTarget\"]],[28,[37,17],[\"users-input\",[52,[30,0,[\"composer\",\"showWarning\"]],\" can-warn\"]],null]]],null],[1,\"\\n\"],[41,[30,0,[\"composer\",\"showWarning\"]],[[[1,\"                      \"],[10,\"label\"],[14,0,\"add-warning\"],[12],[1,\"\\n                        \"],[8,[39,18],null,[[\"@type\",\"@checked\"],[\"checkbox\",[30,0,[\"composer\",\"model\",\"isWarning\"]]]],null],[1,\"\\n                        \"],[10,1],[12],[1,[28,[35,9],[\"composer.add_warning\"],null]],[13],[1,\"\\n                      \"],[13],[1,\"\\n\"]],[]],null],[1,\"                  \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n                \"],[10,0],[15,0,[29,[\"title-and-category\\n                    \",[52,[30,0,[\"composer\",\"showPreview\"]],\"with-preview\"]]]],[12],[1,\"\\n                  \"],[8,[39,19],null,[[\"@composer\",\"@lastValidatedAt\",\"@focusTarget\"],[[30,0,[\"composer\",\"model\"]],[30,0,[\"composer\",\"lastValidatedAt\"]],[30,0,[\"composer\",\"focusTarget\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"composer\",\"model\",\"showCategoryChooser\"]],[[[1,\"                    \"],[10,0],[14,0,\"category-input\"],[12],[1,\"\\n                      \"],[8,[39,20],null,[[\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"composer\",\"model\",\"categoryId\"]],[28,[37,21],[[30,0],[28,[37,22],[[30,0,[\"composer\",\"model\",\"categoryId\"]]],null]],null],[28,[37,6],null,[[\"disabled\",\"scopedCategoryId\",\"prioritizedCategoryId\"],[[30,0,[\"composer\",\"disableCategoryChooser\"]],[30,0,[\"composer\",\"scopedCategoryId\"]],[30,0,[\"composer\",\"prioritizedCategoryId\"]]]]]]],null],[1,\"\\n                      \"],[8,[39,23],null,[[\"@validation\"],[[30,0,[\"composer\",\"categoryValidation\"]]]],null],[1,\"\\n                    \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"composer\",\"canEditTags\"]],[[[1,\"                    \"],[8,[39,24],null,[[\"@value\",\"@onChange\",\"@options\"],[[30,0,[\"composer\",\"model\",\"tags\"]],[28,[37,21],[[30,0],[28,[37,22],[[30,0,[\"composer\",\"model\",\"tags\"]]],null]],null],[28,[37,6],null,[[\"disabled\",\"categoryId\",\"minimum\"],[[30,0,[\"composer\",\"disableTagsChooser\"]],[30,0,[\"composer\",\"model\",\"categoryId\"]],[30,0,[\"composer\",\"model\",\"minimumRequiredTags\"]]]]]]],null],[1,\"\\n                    \"],[8,[39,23],null,[[\"@validation\"],[[30,0,[\"composer\",\"tagValidation\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n                  \"],[8,[39,5],null,[[\"@name\",\"@outletArgs\"],[\"after-title-and-category\",[28,[37,6],null,[[\"model\",\"tagValidation\",\"canEditTags\",\"disabled\"],[[30,0,[\"composer\",\"model\"]],[30,0,[\"composer\",\"tagValidation\"]],[30,0,[\"composer\",\"canEditTags\"]],[30,0,[\"composer\",\"disableTagsChooser\"]]]]]]],null],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n              \"],[10,1],[12],[1,\"\\n                \"],[8,[39,5],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"composer-fields\",\"div\",[28,[37,6],null,[[\"model\",\"showPreview\"],[[30,0,[\"composer\",\"model\"]],[30,0,[\"composer\",\"showPreview\"]]]]]]],null],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n        \"]],[]]]]],[1,\"\\n\\n        \"],[10,1],[12],[1,\"\\n          \"],[8,[39,5],null,[[\"@name\",\"@outletArgs\"],[\"composer-after-composer-editor\",[28,[37,6],null,[[\"model\"],[[30,0,[\"composer\",\"model\"]]]]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,0,\"submit-panel\"],[12],[1,\"\\n          \"],[10,1],[12],[1,\"\\n            \"],[8,[39,5],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"composer-fields-below\",\"div\",[28,[37,6],null,[[\"model\"],[[30,0,[\"composer\",\"model\"]]]]]]],null],[1,\"\\n          \"],[13],[1,\"\\n\\n          \"],[10,0],[14,0,\"save-or-cancel\"],[12],[1,\"\\n            \"],[8,[39,25],null,[[\"@action\",\"@icon\",\"@label\",\"@forwardEvent\",\"@disableSubmit\"],[[30,0,[\"composer\",\"saveAction\"]],[30,0,[\"composer\",\"saveIcon\"]],[30,0,[\"composer\",\"saveLabel\"]],true,[30,0,[\"composer\",\"disableSubmit\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"composer\",\"site\",\"mobileView\"]],[[[1,\"              \"],[11,3],[24,6,\"\"],[16,\"title\",[28,[37,9],[\"cancel\"],null]],[24,0,\"cancel\"],[4,[38,26],[\"click\",[30,0,[\"composer\",\"cancel\"]]],null],[12],[1,\"\\n\"],[41,[30,0,[\"composer\",\"canEdit\"]],[[[1,\"                  \"],[1,[28,[35,10],[\"times\"],null]],[1,\"\\n\"]],[]],[[[1,\"                  \"],[1,[28,[35,10],[\"far-trash-alt\"],null]],[1,\"\\n\"]],[]]],[1,\"              \"],[13],[1,\"\\n\"]],[]],[[[1,\"              \"],[11,3],[24,6,\"\"],[24,0,\"cancel\"],[4,[38,26],[\"click\",[30,0,[\"composer\",\"cancel\"]]],null],[12],[1,[28,[35,9],[\"close\"],null]],[13],[1,\"\\n\"]],[]]],[1,\"\\n\"],[41,[30,0,[\"composer\",\"site\",\"mobileView\"]],[[[41,[30,0,[\"composer\",\"whisperOrUnlistTopic\"]],[[[1,\"                \"],[10,1],[14,0,\"whisper\"],[12],[1,\"\\n                  \"],[1,[28,[35,10],[\"far-eye-slash\"],null]],[1,\"\\n                \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"composer\",\"model\",\"noBump\"]],[[[1,\"                \"],[10,1],[14,0,\"no-bump\"],[12],[1,[28,[35,10],[\"anchor\"],null]],[13],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n            \"],[10,1],[12],[1,\"\\n              \"],[8,[39,5],null,[[\"@name\",\"@outletArgs\"],[\"composer-after-save-or-cancel\",[28,[37,6],null,[[\"model\"],[[30,0,[\"composer\",\"model\"]]]]]]],null],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"composer\",\"site\",\"mobileView\"]],[[[1,\"            \"],[10,1],[12],[1,\"\\n              \"],[8,[39,5],null,[[\"@name\",\"@outletArgs\"],[\"composer-mobile-buttons-bottom\",[28,[37,6],null,[[\"model\"],[[30,0,[\"composer\",\"model\"]]]]]]],null],[1,\"\\n            \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"composer\",\"allowUpload\"]],[[[1,\"              \"],[10,3],[14,1,\"mobile-file-upload\"],[15,0,[29,[\"btn btn-default no-text mobile-file-upload\\n                  \",[52,[30,0,[\"composer\",\"isUploading\"]],\"hidden\"]]]],[15,\"aria-label\",[28,[37,9],[\"composer.upload_title\"],null]],[12],[1,\"\\n                \"],[1,[28,[35,10],[[30,0,[\"composer\",\"uploadIcon\"]]],null]],[1,\"\\n              \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n            \"],[11,3],[24,6,\"\"],[24,0,\"btn btn-default no-text mobile-preview\"],[16,\"title\",[28,[37,9],[\"composer.show_preview\"],null]],[16,\"aria-label\",[28,[37,9],[\"preview\"],null]],[4,[38,26],[\"click\",[30,0,[\"composer\",\"togglePreview\"]]],null],[12],[1,\"\\n              \"],[1,[28,[35,10],[\"desktop\"],null]],[1,\"\\n            \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"composer\",\"showPreview\"]],[[[1,\"              \"],[8,[39,27],null,[[\"@action\",\"@class\",\"@ariaLabel\",\"@icon\"],[[30,0,[\"composer\",\"togglePreview\"]],\"hide-preview\",\"composer.hide_preview\",\"pencil-alt\"]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n\"],[41,[28,[37,28],[[30,0,[\"composer\",\"isUploading\"]],[30,0,[\"composer\",\"isProcessingUpload\"]]],null],[[[1,\"            \"],[10,0],[14,1,\"file-uploading\"],[12],[1,\"\\n\"],[41,[30,0,[\"composer\",\"isProcessingUpload\"]],[[[1,\"                \"],[1,[28,[35,29],null,[[\"size\"],[\"small\"]]]],[10,1],[12],[1,[28,[35,9],[\"upload_selector.processing\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"                \"],[1,[28,[35,29],null,[[\"size\"],[\"small\"]]]],[10,1],[12],[1,[28,[35,9],[\"upload_selector.uploading\"],null]],[1,\"\\n                  \"],[1,[30,0,[\"composer\",\"uploadProgress\"]]],[1,\"%\"],[13],[1,\"\\n\"]],[]]],[1,\"\\n\"],[41,[30,0,[\"composer\",\"isCancellable\"]],[[[1,\"                \"],[11,3],[24,6,\"\"],[24,1,\"cancel-file-upload\"],[4,[38,26],[\"click\",[30,0,[\"composer\",\"cancelUpload\"]]],null],[12],[1,[28,[35,10],[\"times\"],null]],[13],[1,\"\\n\"]],[]],null],[1,\"            \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n          \"],[10,0],[15,0,[52,[30,0,[\"composer\",\"isUploading\"]],\"hidden\"]],[14,1,\"draft-status\"],[12],[1,\"\\n\"],[41,[30,0,[\"composer\",\"model\",\"draftStatus\"]],[[[1,\"              \"],[10,1],[14,0,\"draft-error\"],[15,\"title\",[30,0,[\"composer\",\"model\",\"draftStatus\"]]],[12],[1,\"\\n\"],[41,[30,0,[\"composer\",\"model\",\"draftConflictUser\"]],[[[1,\"                  \"],[1,[28,[35,30],[[30,0,[\"composer\",\"model\",\"draftConflictUser\"]]],[[\"imageSize\"],[\"small\"]]]],[1,\"\\n                  \"],[1,[28,[35,10],[\"user-edit\"],null]],[1,\"\\n\"]],[]],[[[1,\"                  \"],[1,[28,[35,10],[\"exclamation-triangle\"],null]],[1,\"\\n\"]],[]]],[41,[51,[30,0,[\"composer\",\"site\",\"mobileView\"]]],[[[1,\"                  \"],[1,[30,0,[\"composer\",\"model\",\"draftStatus\"]]],[1,\"\\n\"]],[]],null],[1,\"              \"],[13],[1,\"\\n\"]],[]],null],[1,\"          \"],[13],[1,\"\\n\\n\"],[41,[51,[30,0,[\"site\",\"mobileView\"]]],[[[1,\"            \"],[8,[39,27],null,[[\"@action\",\"@translatedTitle\",\"@icon\",\"@class\"],[[30,0,[\"composer\",\"togglePreview\"]],[30,0,[\"composer\",\"toggleText\"]],\"angle-double-left\",[28,[37,17],[\"btn-flat btn-mini-toggle toggle-preview \",[52,[51,[30,0,[\"composer\",\"showPreview\"]]],\"active\"]],null]]],null],[1,\"\\n\"]],[]],null],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],[[[1,\"      \"],[10,0],[14,0,\"saving-text\"],[12],[1,\"\\n\"],[41,[30,0,[\"composer\",\"model\",\"createdPost\"]],[[[1,\"          \"],[1,[28,[35,9],[\"composer.saved\"],null]],[1,\"\\n          \"],[11,3],[16,6,[30,0,[\"composer\",\"createdPost\",\"url\"]]],[24,0,\"permalink\"],[4,[38,26],[\"click\",[30,0,[\"composer\",\"viewNewReply\"]]],null],[12],[1,[28,[35,9],[\"composer.view_new_post\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[1,[28,[35,9],[\"composer.saving\"],null]],[1,\"\\n          \"],[1,[28,[35,29],null,[[\"size\"],[\"small\"]]]],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"draft-text\"],[12],[1,\"\\n\"],[41,[30,0,[\"composer\",\"model\",\"topic\"]],[[[1,\"          \"],[1,[28,[35,10],[\"share\"],null]],[1,\"\\n          \"],[1,[28,[35,31],[[30,0,[\"composer\",\"draftTitle\"]]],null]],[1,\"\\n\"]],[]],[[[1,\"          \"],[1,[28,[35,9],[\"composer.saved_draft\"],null]],[1,\"\\n\"]],[]]],[1,\"      \"],[13],[1,\"\\n\\n      \"],[8,[39,13],null,[[\"@composeState\",\"@toggleFullscreen\",\"@toggleComposer\",\"@toggleToolbar\"],[[30,0,[\"composer\",\"model\",\"composeState\"]],[30,0,[\"composer\",\"openIfDraft\"]],[30,0,[\"composer\",\"toggle\"]],[30,0,[\"composer\",\"toggleToolbar\"]]]],null],[1,\"\\n\"]],[]]]],[]],null]],[]]]]]],[],false,[\"composer-body\",\"if\",\"composer-messages\",\"composer-fullscreen-prompt\",\"I18n\",\"plugin-outlet\",\"hash\",\"unless\",\"composer-action-title\",\"i18n\",\"d-icon\",\"link-to-input\",\"text-field\",\"composer-toggles\",\"composer-editor\",\"route-action\",\"composer-user-selector\",\"concat\",\"input\",\"composer-title\",\"category-chooser\",\"action\",\"mut\",\"popup-input-tip\",\"mini-tag-chooser\",\"composer-save-button\",\"on\",\"d-button\",\"or\",\"loading-spinner\",\"avatar\",\"html-safe\"]]",
    "moduleName": "discourse/components/composer-container.hbs",
    "isStrictMode": false
  });
  let ComposerContainer = (_class = class ComposerContainer extends _component2.default {
    constructor() {
      super(...arguments);
      _initializerDefineProperty(this, "composer", _descriptor, this);
      _initializerDefineProperty(this, "site", _descriptor2, this);
    }
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, "composer", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, "site", [_service.inject], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class);
  _exports.default = ComposerContainer;
  (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, ComposerContainer);
});
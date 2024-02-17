define("discourse/templates/modal/history", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @title={{this.modalTitleKey}} @maxHeight="70%">
    <div id="revision">
      <div id="revision-details">
        {{d-icon "pencil-alt"}}
        <LinkTo @route="user" @model={{this.model.username}}>
          {{bound-avatar-template this.model.avatar_template "small"}}
          {{this.model.username}}
        </LinkTo>
        <PluginOutlet
          @name="revision-user-details-after"
          @outletArgs={{hash model=this.model}}
        />
        <span class="date">{{bound-date this.model.created_at}}</span>
        {{#if this.model.edit_reason}}
          &mdash;
          <span class="edit-reason">{{this.model.edit_reason}}</span>
        {{/if}}
        {{#unless this.site.mobileView}}
          {{#if this.model.user_changes}}
            &mdash;
            {{bound-avatar-template
              this.model.user_changes.previous.avatar_template
              "small"
            }}
            {{this.model.user_changes.previous.username}}
            &rarr;
            {{bound-avatar-template
              this.model.user_changes.current.avatar_template
              "small"
            }}
            {{this.model.user_changes.current.username}}
          {{/if}}
          {{#if this.model.wiki_changes}}
            &mdash;
            <DisabledIcon @icon="far-edit" @disabled={{this.wikiDisabled}} />
          {{/if}}
          {{#if this.model.post_type_changes}}
            &mdash;
            <DisabledIcon
              @icon="shield-alt"
              @disabled={{this.postTypeDisabled}}
            />
          {{/if}}
          {{#if this.model.category_id_changes}}
            &mdash;
            {{html-safe this.previousCategory}}
            &rarr;
            {{html-safe this.currentCategory}}
          {{/if}}
        {{/unless}}
      </div>
      {{#unless this.site.mobileView}}
        <div id="display-modes">
          <ul class="nav nav-pills">
            <li>
              <a
                href
                class={{this.inlineClass}}
                {{on "click" this.displayInline}}
                title={{i18n "post.revisions.displays.inline.title"}}
                aria-label={{i18n "post.revisions.displays.inline.title"}}
              >
                {{d-icon "far-square"}}
                {{i18n "post.revisions.displays.inline.button"}}
              </a>
            </li>
            <li>
              <a
                href
                class={{this.sideBySideClass}}
                {{on "click" this.displaySideBySide}}
                title={{i18n "post.revisions.displays.side_by_side.title"}}
                aria-label={{i18n "post.revisions.displays.side_by_side.title"}}
              >
                {{d-icon "columns"}}
                {{i18n "post.revisions.displays.side_by_side.button"}}
              </a>
            </li>
            <li>
              <a
                href
                class={{this.sideBySideMarkdownClass}}
                {{on "click" this.displaySideBySideMarkdown}}
                title={{i18n
                  "post.revisions.displays.side_by_side_markdown.title"
                }}
                aria-label={{i18n
                  "post.revisions.displays.side_by_side_markdown.title"
                }}
              >
                {{d-icon "columns"}}
                {{i18n "post.revisions.displays.side_by_side_markdown.button"}}
              </a>
            </li>
          </ul>
        </div>
      {{/unless}}
    </div>
    <div
      id="revisions"
      data-post-id={{this.model.post_id}}
      class={{this.hiddenClasses}}
    >
      {{#if this.model.title_changes}}
        <div class="row">
          <h2>{{html-safe this.titleDiff}}</h2>
        </div>
      {{/if}}
      {{#if this.site.mobileView}}
        {{#if this.user_changes}}
          <div class="row">
            {{bound-avatar-template
              this.model.user_changes.previous.avatar_template
              "small"
            }}
            {{this.model.user_changes.previous.username}}
            &rarr;
            {{bound-avatar-template
              this.model.user_changes.current.avatar_template
              "small"
            }}
            {{this.model.user_changes.current.username}}
          </div>
        {{/if}}
        {{#if this.model.wiki_changes}}
          <div class="row">
            <DisabledIcon @icon="far-edit" @disabled={{this.wikiDisabled}} />
          </div>
        {{/if}}
        {{#if this.model.post_type_changes}}
          <div class="row">
            <DisabledIcon
              @icon="shield-alt"
              @disabled={{this.postTypeDisabled}}
            />
          </div>
        {{/if}}
        {{#if this.model.category_id_changes}}
          <div class="row">
            {{html-safe this.previousCategory}}
            &rarr;
            {{html-safe this.currentCategory}}
          </div>
        {{/if}}
      {{/if}}
      {{#if this.model.tags_changes}}
        <div class="row">
          {{i18n "tagging.changed"}}
          {{#each this.previousTagChanges as |t|}}
            {{discourse-tag t.name style=(if t.deleted "diff-del")}}
          {{/each}}
          &rarr;&nbsp;
          {{#each this.currentTagChanges as |t|}}
            {{discourse-tag t.name style=(if t.inserted "diff-ins")}}
          {{/each}}
        </div>
      {{/if}}
      {{#if this.model.featured_link_changes}}
        <div class="row">
          {{this.model.featured_link_changes.previous}}
          &rarr;
          {{this.model.featured_link_changes.current}}
        </div>
      {{/if}}
  
      <span>
        <PluginOutlet
          @name="post-revisions"
          @connectorTagName="div"
          @outletArgs={{hash model=this.model}}
        />
      </span>
  
      <LinksRedirect @class="row">
        {{html-safe this.bodyDiff}}
      </LinksRedirect>
    </div>
  </DModalBody>
  {{#if this.topicController}}
    <div class="modal-footer">
      <div id="revision-controls">
        <DButton
          @class="btn-default"
          @action={{action "loadFirstVersion"}}
          @icon="fast-backward"
          @title="post.revisions.controls.first"
          @disabled={{this.loadFirstDisabled}}
        />
        <DButton
          @class="btn-default"
          @action={{action "loadPreviousVersion"}}
          @icon="backward"
          @title="post.revisions.controls.previous"
          @disabled={{this.loadPreviousDisabled}}
        />
        <div
          id="revision-numbers"
          class={{unless this.displayRevisions "invisible"}}
        >
          <ConditionalLoadingSpinner @condition={{this.loading}} @size="small">
            {{html-safe this.revisionsText}}
          </ConditionalLoadingSpinner>
        </div>
        <DButton
          @class="btn-default"
          @action={{action "loadNextVersion"}}
          @icon="forward"
          @title="post.revisions.controls.next"
          @disabled={{this.loadNextDisabled}}
        />
        <DButton
          @class="btn-default"
          @action={{action "loadLastVersion"}}
          @icon="fast-forward"
          @title="post.revisions.controls.last"
          @disabled={{this.loadLastDisabled}}
        />
      </div>
  
      <div id="revision-footer-buttons">
        {{#if this.displayEdit}}
          <DButton
            @action={{action "editPost"}}
            @icon="pencil-alt"
            @class="btn-default"
            @label={{this.editButtonLabel}}
          />
        {{/if}}
  
        {{#if this.displayRevert}}
          <DButton
            @action={{action "revertToVersion"}}
            @icon="undo"
            @translatedLabel={{this.revertToRevisionText}}
            @class="btn-danger"
            @disabled={{this.loading}}
          />
        {{/if}}
  
        {{#if this.displayHide}}
          <DButton
            @action={{action "hideVersion"}}
            @icon="far-eye-slash"
            @label="post.revisions.controls.hide"
            @class="btn-danger"
            @disabled={{this.loading}}
          />
        {{/if}}
  
        {{#if this.displayShow}}
          <DButton
            @action={{action "showVersion"}}
            @icon="far-eye"
            @label="post.revisions.controls.show"
            @class="btn-default"
            @disabled={{this.loading}}
          />
        {{/if}}
  
        {{#if this.displayPermanentlyDeleteButton}}
          <DButton
            @action={{action "permanentlyDeleteVersions"}}
            @icon="far-trash-alt"
            @label="post.revisions.controls.destroy"
            @class="btn-danger"
            @disabled={{this.loading}}
          />
        {{/if}}
      </div>
    </div>
  {{/if}}
  */
  {
    "id": "EF/HVCDk",
    "block": "[[[8,[39,0],null,[[\"@title\",\"@maxHeight\"],[[30,0,[\"modalTitleKey\"]],\"70%\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,1,\"revision\"],[12],[1,\"\\n    \"],[10,0],[14,1,\"revision-details\"],[12],[1,\"\\n      \"],[1,[28,[35,1],[\"pencil-alt\"],null]],[1,\"\\n      \"],[8,[39,2],null,[[\"@route\",\"@model\"],[\"user\",[30,0,[\"model\",\"username\"]]]],[[\"default\"],[[[[1,\"\\n        \"],[1,[28,[35,3],[[30,0,[\"model\",\"avatar_template\"]],\"small\"],null]],[1,\"\\n        \"],[1,[30,0,[\"model\",\"username\"]]],[1,\"\\n      \"]],[]]]]],[1,\"\\n      \"],[8,[39,4],null,[[\"@name\",\"@outletArgs\"],[\"revision-user-details-after\",[28,[37,5],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n      \"],[10,1],[14,0,\"date\"],[12],[1,[28,[35,6],[[30,0,[\"model\",\"created_at\"]]],null]],[13],[1,\"\\n\"],[41,[30,0,[\"model\",\"edit_reason\"]],[[[1,\"        —\\n        \"],[10,1],[14,0,\"edit-reason\"],[12],[1,[30,0,[\"model\",\"edit_reason\"]]],[13],[1,\"\\n\"]],[]],null],[41,[51,[30,0,[\"site\",\"mobileView\"]]],[[[41,[30,0,[\"model\",\"user_changes\"]],[[[1,\"          —\\n          \"],[1,[28,[35,3],[[30,0,[\"model\",\"user_changes\",\"previous\",\"avatar_template\"]],\"small\"],null]],[1,\"\\n          \"],[1,[30,0,[\"model\",\"user_changes\",\"previous\",\"username\"]]],[1,\"\\n          →\\n          \"],[1,[28,[35,3],[[30,0,[\"model\",\"user_changes\",\"current\",\"avatar_template\"]],\"small\"],null]],[1,\"\\n          \"],[1,[30,0,[\"model\",\"user_changes\",\"current\",\"username\"]]],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"wiki_changes\"]],[[[1,\"          —\\n          \"],[8,[39,9],null,[[\"@icon\",\"@disabled\"],[\"far-edit\",[30,0,[\"wikiDisabled\"]]]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"post_type_changes\"]],[[[1,\"          —\\n          \"],[8,[39,9],null,[[\"@icon\",\"@disabled\"],[\"shield-alt\",[30,0,[\"postTypeDisabled\"]]]],null],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"category_id_changes\"]],[[[1,\"          —\\n          \"],[1,[28,[35,10],[[30,0,[\"previousCategory\"]]],null]],[1,\"\\n          →\\n          \"],[1,[28,[35,10],[[30,0,[\"currentCategory\"]]],null]],[1,\"\\n\"]],[]],null]],[]],null],[1,\"    \"],[13],[1,\"\\n\"],[41,[51,[30,0,[\"site\",\"mobileView\"]]],[[[1,\"      \"],[10,0],[14,1,\"display-modes\"],[12],[1,\"\\n        \"],[10,\"ul\"],[14,0,\"nav nav-pills\"],[12],[1,\"\\n          \"],[10,\"li\"],[12],[1,\"\\n            \"],[11,3],[24,6,\"\"],[16,0,[30,0,[\"inlineClass\"]]],[16,\"title\",[28,[37,11],[\"post.revisions.displays.inline.title\"],null]],[16,\"aria-label\",[28,[37,11],[\"post.revisions.displays.inline.title\"],null]],[4,[38,12],[\"click\",[30,0,[\"displayInline\"]]],null],[12],[1,\"\\n              \"],[1,[28,[35,1],[\"far-square\"],null]],[1,\"\\n              \"],[1,[28,[35,11],[\"post.revisions.displays.inline.button\"],null]],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[12],[1,\"\\n            \"],[11,3],[24,6,\"\"],[16,0,[30,0,[\"sideBySideClass\"]]],[16,\"title\",[28,[37,11],[\"post.revisions.displays.side_by_side.title\"],null]],[16,\"aria-label\",[28,[37,11],[\"post.revisions.displays.side_by_side.title\"],null]],[4,[38,12],[\"click\",[30,0,[\"displaySideBySide\"]]],null],[12],[1,\"\\n              \"],[1,[28,[35,1],[\"columns\"],null]],[1,\"\\n              \"],[1,[28,[35,11],[\"post.revisions.displays.side_by_side.button\"],null]],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,\"li\"],[12],[1,\"\\n            \"],[11,3],[24,6,\"\"],[16,0,[30,0,[\"sideBySideMarkdownClass\"]]],[16,\"title\",[28,[37,11],[\"post.revisions.displays.side_by_side_markdown.title\"],null]],[16,\"aria-label\",[28,[37,11],[\"post.revisions.displays.side_by_side_markdown.title\"],null]],[4,[38,12],[\"click\",[30,0,[\"displaySideBySideMarkdown\"]]],null],[12],[1,\"\\n              \"],[1,[28,[35,1],[\"columns\"],null]],[1,\"\\n              \"],[1,[28,[35,11],[\"post.revisions.displays.side_by_side_markdown.button\"],null]],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"  \"],[13],[1,\"\\n  \"],[10,0],[14,1,\"revisions\"],[15,\"data-post-id\",[30,0,[\"model\",\"post_id\"]]],[15,0,[30,0,[\"hiddenClasses\"]]],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"title_changes\"]],[[[1,\"      \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n        \"],[10,\"h2\"],[12],[1,[28,[35,10],[[30,0,[\"titleDiff\"]]],null]],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"site\",\"mobileView\"]],[[[41,[30,0,[\"user_changes\"]],[[[1,\"        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n          \"],[1,[28,[35,3],[[30,0,[\"model\",\"user_changes\",\"previous\",\"avatar_template\"]],\"small\"],null]],[1,\"\\n          \"],[1,[30,0,[\"model\",\"user_changes\",\"previous\",\"username\"]]],[1,\"\\n          →\\n          \"],[1,[28,[35,3],[[30,0,[\"model\",\"user_changes\",\"current\",\"avatar_template\"]],\"small\"],null]],[1,\"\\n          \"],[1,[30,0,[\"model\",\"user_changes\",\"current\",\"username\"]]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"wiki_changes\"]],[[[1,\"        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n          \"],[8,[39,9],null,[[\"@icon\",\"@disabled\"],[\"far-edit\",[30,0,[\"wikiDisabled\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"post_type_changes\"]],[[[1,\"        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n          \"],[8,[39,9],null,[[\"@icon\",\"@disabled\"],[\"shield-alt\",[30,0,[\"postTypeDisabled\"]]]],null],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"category_id_changes\"]],[[[1,\"        \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n          \"],[1,[28,[35,10],[[30,0,[\"previousCategory\"]]],null]],[1,\"\\n          →\\n          \"],[1,[28,[35,10],[[30,0,[\"currentCategory\"]]],null]],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null]],[]],null],[41,[30,0,[\"model\",\"tags_changes\"]],[[[1,\"      \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n        \"],[1,[28,[35,11],[\"tagging.changed\"],null]],[1,\"\\n\"],[42,[28,[37,14],[[28,[37,14],[[30,0,[\"previousTagChanges\"]]],null]],null],null,[[[1,\"          \"],[1,[28,[35,15],[[30,1,[\"name\"]]],[[\"style\"],[[52,[30,1,[\"deleted\"]],\"diff-del\"]]]]],[1,\"\\n\"]],[1]],null],[1,\"        → \\n\"],[42,[28,[37,14],[[28,[37,14],[[30,0,[\"currentTagChanges\"]]],null]],null],null,[[[1,\"          \"],[1,[28,[35,15],[[30,2,[\"name\"]]],[[\"style\"],[[52,[30,2,[\"inserted\"]],\"diff-ins\"]]]]],[1,\"\\n\"]],[2]],null],[1,\"      \"],[13],[1,\"\\n\"]],[]],null],[41,[30,0,[\"model\",\"featured_link_changes\"]],[[[1,\"      \"],[10,0],[14,0,\"row\"],[12],[1,\"\\n        \"],[1,[30,0,[\"model\",\"featured_link_changes\",\"previous\"]]],[1,\"\\n        →\\n        \"],[1,[30,0,[\"model\",\"featured_link_changes\",\"current\"]]],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[10,1],[12],[1,\"\\n      \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"post-revisions\",\"div\",[28,[37,5],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[8,[39,16],null,[[\"@class\"],[\"row\"]],[[\"default\"],[[[[1,\"\\n      \"],[1,[28,[35,10],[[30,0,[\"bodyDiff\"]]],null]],[1,\"\\n    \"]],[]]]]],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]],[1,\"\\n\"],[41,[30,0,[\"topicController\"]],[[[1,\"  \"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n    \"],[10,0],[14,1,\"revision-controls\"],[12],[1,\"\\n      \"],[8,[39,17],null,[[\"@class\",\"@action\",\"@icon\",\"@title\",\"@disabled\"],[\"btn-default\",[28,[37,18],[[30,0],\"loadFirstVersion\"],null],\"fast-backward\",\"post.revisions.controls.first\",[30,0,[\"loadFirstDisabled\"]]]],null],[1,\"\\n      \"],[8,[39,17],null,[[\"@class\",\"@action\",\"@icon\",\"@title\",\"@disabled\"],[\"btn-default\",[28,[37,18],[[30,0],\"loadPreviousVersion\"],null],\"backward\",\"post.revisions.controls.previous\",[30,0,[\"loadPreviousDisabled\"]]]],null],[1,\"\\n      \"],[10,0],[14,1,\"revision-numbers\"],[15,0,[52,[51,[30,0,[\"displayRevisions\"]]],\"invisible\"]],[12],[1,\"\\n        \"],[8,[39,19],null,[[\"@condition\",\"@size\"],[[30,0,[\"loading\"]],\"small\"]],[[\"default\"],[[[[1,\"\\n          \"],[1,[28,[35,10],[[30,0,[\"revisionsText\"]]],null]],[1,\"\\n        \"]],[]]]]],[1,\"\\n      \"],[13],[1,\"\\n      \"],[8,[39,17],null,[[\"@class\",\"@action\",\"@icon\",\"@title\",\"@disabled\"],[\"btn-default\",[28,[37,18],[[30,0],\"loadNextVersion\"],null],\"forward\",\"post.revisions.controls.next\",[30,0,[\"loadNextDisabled\"]]]],null],[1,\"\\n      \"],[8,[39,17],null,[[\"@class\",\"@action\",\"@icon\",\"@title\",\"@disabled\"],[\"btn-default\",[28,[37,18],[[30,0],\"loadLastVersion\"],null],\"fast-forward\",\"post.revisions.controls.last\",[30,0,[\"loadLastDisabled\"]]]],null],[1,\"\\n    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,1,\"revision-footer-buttons\"],[12],[1,\"\\n\"],[41,[30,0,[\"displayEdit\"]],[[[1,\"        \"],[8,[39,17],null,[[\"@action\",\"@icon\",\"@class\",\"@label\"],[[28,[37,18],[[30,0],\"editPost\"],null],\"pencil-alt\",\"btn-default\",[30,0,[\"editButtonLabel\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"displayRevert\"]],[[[1,\"        \"],[8,[39,17],null,[[\"@action\",\"@icon\",\"@translatedLabel\",\"@class\",\"@disabled\"],[[28,[37,18],[[30,0],\"revertToVersion\"],null],\"undo\",[30,0,[\"revertToRevisionText\"]],\"btn-danger\",[30,0,[\"loading\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"displayHide\"]],[[[1,\"        \"],[8,[39,17],null,[[\"@action\",\"@icon\",\"@label\",\"@class\",\"@disabled\"],[[28,[37,18],[[30,0],\"hideVersion\"],null],\"far-eye-slash\",\"post.revisions.controls.hide\",\"btn-danger\",[30,0,[\"loading\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"displayShow\"]],[[[1,\"        \"],[8,[39,17],null,[[\"@action\",\"@icon\",\"@label\",\"@class\",\"@disabled\"],[[28,[37,18],[[30,0],\"showVersion\"],null],\"far-eye\",\"post.revisions.controls.show\",\"btn-default\",[30,0,[\"loading\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"displayPermanentlyDeleteButton\"]],[[[1,\"        \"],[8,[39,17],null,[[\"@action\",\"@icon\",\"@label\",\"@class\",\"@disabled\"],[[28,[37,18],[[30,0],\"permanentlyDeleteVersions\"],null],\"far-trash-alt\",\"post.revisions.controls.destroy\",\"btn-danger\",[30,0,[\"loading\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]],null]],[\"t\",\"t\"],false,[\"d-modal-body\",\"d-icon\",\"link-to\",\"bound-avatar-template\",\"plugin-outlet\",\"hash\",\"bound-date\",\"if\",\"unless\",\"disabled-icon\",\"html-safe\",\"i18n\",\"on\",\"each\",\"-track-array\",\"discourse-tag\",\"links-redirect\",\"d-button\",\"action\",\"conditional-loading-spinner\"]]",
    "moduleName": "discourse/templates/modal/history.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
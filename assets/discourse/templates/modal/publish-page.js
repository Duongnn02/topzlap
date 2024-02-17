define("discourse/templates/modal/publish-page", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody>
    {{#if this.unpublished}}
      <p>{{i18n "topic.publish_page.unpublished"}}</p>
    {{else}}
      <ConditionalLoadingSpinner @condition={{this.initializing}}>
        <p class="publish-description">{{i18n
            "topic.publish_page.description"
          }}</p>
  
        <form>
          <div class="controls">
            <label>{{i18n "topic.publish_page.slug"}}</label>
            <TextField
              @value={{this.publishedPage.slug}}
              @onChange={{action "checkSlug"}}
              @onChangeImmediate={{action "startCheckSlug"}}
              @disabled={{this.existing}}
              @class="publish-slug"
            />
          </div>
  
          <div class="controls">
            <label>{{i18n "topic.publish_page.public"}}</label>
  
            <p class="description">
              <Input
                @type="checkbox"
                @checked={{readonly this.publishedPage.public}}
                {{on "click" (action "onChangePublic" value="target.checked")}}
              />
              {{i18n "topic.publish_page.public_description"}}
            </p>
          </div>
        </form>
  
        <div class="publish-url">
          <ConditionalLoadingSpinner @condition={{this.checking}} />
  
          {{#if this.existing}}
            <div class="current-url">
              {{i18n "topic.publish_page.publish_url"}}
              <div>
                <a
                  href={{this.publishedPage.url}}
                  target="_blank"
                  rel="noopener noreferrer"
                >{{this.publishedPage.url}}</a>
              </div>
            </div>
          {{else}}
            {{#if this.showUrl}}
              <div class="valid-slug">
                {{i18n "topic.publish_page.preview_url"}}
                <div class="example-url">{{this.publishedPage.url}}</div>
              </div>
            {{/if}}
  
            {{#if this.invalid}}
              {{i18n "topic.publish_page.invalid_slug"}}
              <span class="invalid-slug">{{this.reason}}.</span>
            {{/if}}
          {{/if}}
  
        </div>
      </ConditionalLoadingSpinner>
    {{/if}}
  </DModalBody>
  
  <div class="modal-footer">
    {{#if this.showUnpublish}}
      <DButton
        @label="topic.publish_page.unpublish"
        @icon="trash-alt"
        @class="btn-danger"
        @isLoading={{this.unpublishing}}
        @action={{action "unpublish"}}
      />
  
      <DButton
        @class="close-publish-page"
        @icon="times"
        @label="close"
        @action={{action "closeModal"}}
      />
    {{else if this.unpublished}}
      <DButton
        @label="topic.publish_page.publishing_settings"
        @action={{action "startNew"}}
      />
    {{else}}
      <DButton
        @label="topic.publish_page.publish"
        @class="btn-primary publish-page"
        @icon="file"
        @disabled={{this.disabled}}
        @isLoading={{this.saving}}
        @action={{action "publish"}}
      />
    {{/if}}
  </div>
  */
  {
    "id": "1UBW8v0Y",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"unpublished\"]],[[[1,\"    \"],[10,2],[12],[1,[28,[35,2],[\"topic.publish_page.unpublished\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[8,[39,3],null,[[\"@condition\"],[[30,0,[\"initializing\"]]]],[[\"default\"],[[[[1,\"\\n      \"],[10,2],[14,0,\"publish-description\"],[12],[1,[28,[35,2],[\"topic.publish_page.description\"],null]],[13],[1,\"\\n\\n      \"],[10,\"form\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n          \"],[10,\"label\"],[12],[1,[28,[35,2],[\"topic.publish_page.slug\"],null]],[13],[1,\"\\n          \"],[8,[39,4],null,[[\"@value\",\"@onChange\",\"@onChangeImmediate\",\"@disabled\",\"@class\"],[[30,0,[\"publishedPage\",\"slug\"]],[28,[37,5],[[30,0],\"checkSlug\"],null],[28,[37,5],[[30,0],\"startCheckSlug\"],null],[30,0,[\"existing\"]],\"publish-slug\"]],null],[1,\"\\n        \"],[13],[1,\"\\n\\n        \"],[10,0],[14,0,\"controls\"],[12],[1,\"\\n          \"],[10,\"label\"],[12],[1,[28,[35,2],[\"topic.publish_page.public\"],null]],[13],[1,\"\\n\\n          \"],[10,2],[14,0,\"description\"],[12],[1,\"\\n            \"],[8,[39,6],[[4,[38,8],[\"click\",[28,[37,5],[[30,0],\"onChangePublic\"],[[\"value\"],[\"target.checked\"]]]],null]],[[\"@type\",\"@checked\"],[\"checkbox\",[28,[37,7],[[30,0,[\"publishedPage\",\"public\"]]],null]]],null],[1,\"\\n            \"],[1,[28,[35,2],[\"topic.publish_page.public_description\"],null]],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,0],[14,0,\"publish-url\"],[12],[1,\"\\n        \"],[8,[39,3],null,[[\"@condition\"],[[30,0,[\"checking\"]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"existing\"]],[[[1,\"          \"],[10,0],[14,0,\"current-url\"],[12],[1,\"\\n            \"],[1,[28,[35,2],[\"topic.publish_page.publish_url\"],null]],[1,\"\\n            \"],[10,0],[12],[1,\"\\n              \"],[10,3],[15,6,[30,0,[\"publishedPage\",\"url\"]]],[14,\"target\",\"_blank\"],[14,\"rel\",\"noopener noreferrer\"],[12],[1,[30,0,[\"publishedPage\",\"url\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],[[[41,[30,0,[\"showUrl\"]],[[[1,\"            \"],[10,0],[14,0,\"valid-slug\"],[12],[1,\"\\n              \"],[1,[28,[35,2],[\"topic.publish_page.preview_url\"],null]],[1,\"\\n              \"],[10,0],[14,0,\"example-url\"],[12],[1,[30,0,[\"publishedPage\",\"url\"]]],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"invalid\"]],[[[1,\"            \"],[1,[28,[35,2],[\"topic.publish_page.invalid_slug\"],null]],[1,\"\\n            \"],[10,1],[14,0,\"invalid-slug\"],[12],[1,[30,0,[\"reason\"]]],[1,\".\"],[13],[1,\"\\n\"]],[]],null]],[]]],[1,\"\\n      \"],[13],[1,\"\\n    \"]],[]]]]],[1,\"\\n\"]],[]]]],[]]]]],[1,\"\\n\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n\"],[41,[30,0,[\"showUnpublish\"]],[[[1,\"    \"],[8,[39,9],null,[[\"@label\",\"@icon\",\"@class\",\"@isLoading\",\"@action\"],[\"topic.publish_page.unpublish\",\"trash-alt\",\"btn-danger\",[30,0,[\"unpublishing\"]],[28,[37,5],[[30,0],\"unpublish\"],null]]],null],[1,\"\\n\\n    \"],[8,[39,9],null,[[\"@class\",\"@icon\",\"@label\",\"@action\"],[\"close-publish-page\",\"times\",\"close\",[28,[37,5],[[30,0],\"closeModal\"],null]]],null],[1,\"\\n\"]],[]],[[[41,[30,0,[\"unpublished\"]],[[[1,\"    \"],[8,[39,9],null,[[\"@label\",\"@action\"],[\"topic.publish_page.publishing_settings\",[28,[37,5],[[30,0],\"startNew\"],null]]],null],[1,\"\\n\"]],[]],[[[1,\"    \"],[8,[39,9],null,[[\"@label\",\"@class\",\"@icon\",\"@disabled\",\"@isLoading\",\"@action\"],[\"topic.publish_page.publish\",\"btn-primary publish-page\",\"file\",[30,0,[\"disabled\"]],[30,0,[\"saving\"]],[28,[37,5],[[30,0],\"publish\"],null]]],null],[1,\"\\n  \"]],[]]]],[]]],[13]],[],false,[\"d-modal-body\",\"if\",\"i18n\",\"conditional-loading-spinner\",\"text-field\",\"action\",\"input\",\"readonly\",\"on\",\"d-button\"]]",
    "moduleName": "discourse/templates/modal/publish-page.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
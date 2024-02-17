define("discourse/templates/modal/feature-topic", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DModalBody @class="feature-topic">
    {{#if this.model.pinned_at}}
      <div class="feature-section">
        <div class="desc">
          {{#if this.model.pinned_globally}}
            <p>
              <ConditionalLoadingSpinner
                @size="small"
                @condition={{this.loading}}
              >
                {{#if this.pinnedGloballyCount}}
                  {{html-safe
                    (i18n
                      "topic.feature_topic.already_pinned_globally"
                      count=this.pinnedGloballyCount
                    )
                  }}
                {{else}}
                  {{html-safe (i18n "topic.feature_topic.not_pinned_globally")}}
                {{/if}}
              </ConditionalLoadingSpinner>
            </p>
            <p>{{i18n "topic.feature_topic.global_pin_note"}}</p>
          {{else}}
            <p>
              <ConditionalLoadingSpinner
                @size="small"
                @condition={{this.loading}}
              >
                {{html-safe this.alreadyPinnedMessage}}
              </ConditionalLoadingSpinner>
            </p>
            <p>{{i18n "topic.feature_topic.pin_note"}}</p>
          {{/if}}
          <p>{{html-safe this.unPinMessage}}</p>
          <p><DButton
              @action={{action "unpin"}}
              @icon="thumbtack"
              @label="topic.feature.unpin"
              @class="btn-primary"
            /></p>
        </div>
      </div>
    {{else}}
      <div class="feature-section">
        <div class="desc">
          <p>
            <ConditionalLoadingSpinner @size="small" @condition={{this.loading}}>
              {{html-safe this.alreadyPinnedMessage}}
            </ConditionalLoadingSpinner>
          </p>
          <p>
            {{i18n "topic.feature_topic.pin_note"}}
          </p>
          {{#if this.site.isMobileDevice}}
            <p>
              {{html-safe this.pinMessage}}
            </p>
            <p class="with-validation">
              <FutureDateInput
                @class="pin-until"
                @clearable={{true}}
                @input={{this.model.pinnedInCategoryUntil}}
                @onChangeInput={{action (mut this.model.pinnedInCategoryUntil)}}
              />
              <PopupInputTip
                @validation={{this.pinInCategoryValidation}}
                @shownAt={{this.pinInCategoryTipShownAt}}
              />
            </p>
          {{else}}
            <p class="with-validation">
              {{html-safe this.pinMessage}}
              <span>
                {{d-icon "far-clock"}}
                <FutureDateInput
                  @class="pin-until"
                  @clearable={{true}}
                  @input={{this.model.pinnedInCategoryUntil}}
                  @onChangeInput={{action (mut this.model.pinnedInCategoryUntil)}}
                />
                <PopupInputTip
                  @validation={{this.pinInCategoryValidation}}
                  @shownAt={{this.pinInCategoryTipShownAt}}
                />
              </span>
            </p>
          {{/if}}
          <p>
            <DButton
              @action={{action "pin"}}
              @icon="thumbtack"
              @label="topic.feature.pin"
              @class="btn-primary"
            />
          </p>
        </div>
      </div>
      {{#if this.canPinGlobally}}
        <div class="feature-section">
          <div class="desc">
            <p>
              <ConditionalLoadingSpinner
                @size="small"
                @condition={{this.loading}}
              >
                {{#if this.pinnedGloballyCount}}
                  {{html-safe
                    (i18n
                      "topic.feature_topic.already_pinned_globally"
                      count=this.pinnedGloballyCount
                    )
                  }}
                {{else}}
                  {{html-safe (i18n "topic.feature_topic.not_pinned_globally")}}
                {{/if}}
              </ConditionalLoadingSpinner>
            </p>
            <p>
              {{i18n "topic.feature_topic.global_pin_note"}}
            </p>
            {{#if this.site.isMobileDevice}}
              <p>
                {{i18n "topic.feature_topic.pin_globally"}}
              </p>
              <p class="with-validation">
                <FutureDateInput
                  @class="pin-until"
                  @clearable={{true}}
                  @input={{this.model.pinnedGloballyUntil}}
                  @onChangeInput={{action (mut this.model.pinnedGloballyUntil)}}
                />
                <PopupInputTip
                  @validation={{this.pinGloballyValidation}}
                  @shownAt={{this.pinGloballyTipShownAt}}
                />
              </p>
            {{else}}
              <p class="with-validation">
                {{i18n "topic.feature_topic.pin_globally"}}
                <span>
                  {{d-icon "far-clock"}}
                  <FutureDateInput
                    @class="pin-until"
                    @clearable={{true}}
                    @input={{this.model.pinnedGloballyUntil}}
                    @onChangeInput={{action (mut this.model.pinnedGloballyUntil)}}
                  />
                  <PopupInputTip
                    @validation={{this.pinGloballyValidation}}
                    @shownAt={{this.pinGloballyTipShownAt}}
                  />
                </span>
              </p>
            {{/if}}
            <p>
              <DButton
                @action={{action "pinGlobally"}}
                @icon="thumbtack"
                @label="topic.feature.pin_globally"
                @class="btn-primary"
              />
            </p>
          </div>
        </div>
      {{/if}}
    {{/if}}
    {{#if this.currentUser.staff}}
      <div class="feature-section">
        <div class="desc">
          <p>
            <ConditionalLoadingSpinner @size="small" @condition={{this.loading}}>
              {{#if this.bannerCount}}
                {{html-safe (i18n "topic.feature_topic.banner_exists")}}
              {{else}}
                {{html-safe (i18n "topic.feature_topic.no_banner_exists")}}
              {{/if}}
            </ConditionalLoadingSpinner>
          </p>
          <p>
            {{i18n "topic.feature_topic.banner_note"}}
          </p>
          <p>
            {{#if this.model.isBanner}}
              {{i18n "topic.feature_topic.remove_banner"}}
            {{else}}
              {{i18n "topic.feature_topic.make_banner"}}
            {{/if}}
          </p>
          <p>
            {{#if this.model.isBanner}}
              <DButton
                @action={{action "removeBanner"}}
                @icon="thumbtack"
                @label="topic.feature.remove_banner"
                @class="btn-primary"
              />
            {{else}}
              <DButton
                @action={{action "makeBanner"}}
                @icon="thumbtack"
                @label="topic.feature.make_banner"
                @class="btn-primary make-banner"
              />
            {{/if}}
          </p>
        </div>
      </div>
    {{/if}}
  </DModalBody>
  <div class="modal-footer">
    <DModalCancel @close={{route-action "closeModal"}} />
  </div>
  */
  {
    "id": "RI8lLeDi",
    "block": "[[[8,[39,0],null,[[\"@class\"],[\"feature-topic\"]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"model\",\"pinned_at\"]],[[[1,\"    \"],[10,0],[14,0,\"feature-section\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"desc\"],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"pinned_globally\"]],[[[1,\"          \"],[10,2],[12],[1,\"\\n            \"],[8,[39,2],null,[[\"@size\",\"@condition\"],[\"small\",[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"pinnedGloballyCount\"]],[[[1,\"                \"],[1,[28,[35,3],[[28,[37,4],[\"topic.feature_topic.already_pinned_globally\"],[[\"count\"],[[30,0,[\"pinnedGloballyCount\"]]]]]],null]],[1,\"\\n\"]],[]],[[[1,\"                \"],[1,[28,[35,3],[[28,[37,4],[\"topic.feature_topic.not_pinned_globally\"],null]],null]],[1,\"\\n\"]],[]]],[1,\"            \"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,2],[12],[1,[28,[35,4],[\"topic.feature_topic.global_pin_note\"],null]],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,2],[12],[1,\"\\n            \"],[8,[39,2],null,[[\"@size\",\"@condition\"],[\"small\",[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n              \"],[1,[28,[35,3],[[30,0,[\"alreadyPinnedMessage\"]]],null]],[1,\"\\n            \"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,2],[12],[1,[28,[35,4],[\"topic.feature_topic.pin_note\"],null]],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[10,2],[12],[1,[28,[35,3],[[30,0,[\"unPinMessage\"]]],null]],[13],[1,\"\\n        \"],[10,2],[12],[8,[39,5],null,[[\"@action\",\"@icon\",\"@label\",\"@class\"],[[28,[37,6],[[30,0],\"unpin\"],null],\"thumbtack\",\"topic.feature.unpin\",\"btn-primary\"]],null],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],[[[1,\"    \"],[10,0],[14,0,\"feature-section\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"desc\"],[12],[1,\"\\n        \"],[10,2],[12],[1,\"\\n          \"],[8,[39,2],null,[[\"@size\",\"@condition\"],[\"small\",[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n            \"],[1,[28,[35,3],[[30,0,[\"alreadyPinnedMessage\"]]],null]],[1,\"\\n          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,2],[12],[1,\"\\n          \"],[1,[28,[35,4],[\"topic.feature_topic.pin_note\"],null]],[1,\"\\n        \"],[13],[1,\"\\n\"],[41,[30,0,[\"site\",\"isMobileDevice\"]],[[[1,\"          \"],[10,2],[12],[1,\"\\n            \"],[1,[28,[35,3],[[30,0,[\"pinMessage\"]]],null]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,2],[14,0,\"with-validation\"],[12],[1,\"\\n            \"],[8,[39,7],null,[[\"@class\",\"@clearable\",\"@input\",\"@onChangeInput\"],[\"pin-until\",true,[30,0,[\"model\",\"pinnedInCategoryUntil\"]],[28,[37,6],[[30,0],[28,[37,8],[[30,0,[\"model\",\"pinnedInCategoryUntil\"]]],null]],null]]],null],[1,\"\\n            \"],[8,[39,9],null,[[\"@validation\",\"@shownAt\"],[[30,0,[\"pinInCategoryValidation\"]],[30,0,[\"pinInCategoryTipShownAt\"]]]],null],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,2],[14,0,\"with-validation\"],[12],[1,\"\\n            \"],[1,[28,[35,3],[[30,0,[\"pinMessage\"]]],null]],[1,\"\\n            \"],[10,1],[12],[1,\"\\n              \"],[1,[28,[35,10],[\"far-clock\"],null]],[1,\"\\n              \"],[8,[39,7],null,[[\"@class\",\"@clearable\",\"@input\",\"@onChangeInput\"],[\"pin-until\",true,[30,0,[\"model\",\"pinnedInCategoryUntil\"]],[28,[37,6],[[30,0],[28,[37,8],[[30,0,[\"model\",\"pinnedInCategoryUntil\"]]],null]],null]]],null],[1,\"\\n              \"],[8,[39,9],null,[[\"@validation\",\"@shownAt\"],[[30,0,[\"pinInCategoryValidation\"]],[30,0,[\"pinInCategoryTipShownAt\"]]]],null],[1,\"\\n            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[10,2],[12],[1,\"\\n          \"],[8,[39,5],null,[[\"@action\",\"@icon\",\"@label\",\"@class\"],[[28,[37,6],[[30,0],\"pin\"],null],\"thumbtack\",\"topic.feature.pin\",\"btn-primary\"]],null],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"],[41,[30,0,[\"canPinGlobally\"]],[[[1,\"      \"],[10,0],[14,0,\"feature-section\"],[12],[1,\"\\n        \"],[10,0],[14,0,\"desc\"],[12],[1,\"\\n          \"],[10,2],[12],[1,\"\\n            \"],[8,[39,2],null,[[\"@size\",\"@condition\"],[\"small\",[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"pinnedGloballyCount\"]],[[[1,\"                \"],[1,[28,[35,3],[[28,[37,4],[\"topic.feature_topic.already_pinned_globally\"],[[\"count\"],[[30,0,[\"pinnedGloballyCount\"]]]]]],null]],[1,\"\\n\"]],[]],[[[1,\"                \"],[1,[28,[35,3],[[28,[37,4],[\"topic.feature_topic.not_pinned_globally\"],null]],null]],[1,\"\\n\"]],[]]],[1,\"            \"]],[]]]]],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,2],[12],[1,\"\\n            \"],[1,[28,[35,4],[\"topic.feature_topic.global_pin_note\"],null]],[1,\"\\n          \"],[13],[1,\"\\n\"],[41,[30,0,[\"site\",\"isMobileDevice\"]],[[[1,\"            \"],[10,2],[12],[1,\"\\n              \"],[1,[28,[35,4],[\"topic.feature_topic.pin_globally\"],null]],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,2],[14,0,\"with-validation\"],[12],[1,\"\\n              \"],[8,[39,7],null,[[\"@class\",\"@clearable\",\"@input\",\"@onChangeInput\"],[\"pin-until\",true,[30,0,[\"model\",\"pinnedGloballyUntil\"]],[28,[37,6],[[30,0],[28,[37,8],[[30,0,[\"model\",\"pinnedGloballyUntil\"]]],null]],null]]],null],[1,\"\\n              \"],[8,[39,9],null,[[\"@validation\",\"@shownAt\"],[[30,0,[\"pinGloballyValidation\"]],[30,0,[\"pinGloballyTipShownAt\"]]]],null],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]],[[[1,\"            \"],[10,2],[14,0,\"with-validation\"],[12],[1,\"\\n              \"],[1,[28,[35,4],[\"topic.feature_topic.pin_globally\"],null]],[1,\"\\n              \"],[10,1],[12],[1,\"\\n                \"],[1,[28,[35,10],[\"far-clock\"],null]],[1,\"\\n                \"],[8,[39,7],null,[[\"@class\",\"@clearable\",\"@input\",\"@onChangeInput\"],[\"pin-until\",true,[30,0,[\"model\",\"pinnedGloballyUntil\"]],[28,[37,6],[[30,0],[28,[37,8],[[30,0,[\"model\",\"pinnedGloballyUntil\"]]],null]],null]]],null],[1,\"\\n                \"],[8,[39,9],null,[[\"@validation\",\"@shownAt\"],[[30,0,[\"pinGloballyValidation\"]],[30,0,[\"pinGloballyTipShownAt\"]]]],null],[1,\"\\n              \"],[13],[1,\"\\n            \"],[13],[1,\"\\n\"]],[]]],[1,\"          \"],[10,2],[12],[1,\"\\n            \"],[8,[39,5],null,[[\"@action\",\"@icon\",\"@label\",\"@class\"],[[28,[37,6],[[30,0],\"pinGlobally\"],null],\"thumbtack\",\"topic.feature.pin_globally\",\"btn-primary\"]],null],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n\"]],[]],null]],[]]],[41,[30,0,[\"currentUser\",\"staff\"]],[[[1,\"    \"],[10,0],[14,0,\"feature-section\"],[12],[1,\"\\n      \"],[10,0],[14,0,\"desc\"],[12],[1,\"\\n        \"],[10,2],[12],[1,\"\\n          \"],[8,[39,2],null,[[\"@size\",\"@condition\"],[\"small\",[30,0,[\"loading\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"bannerCount\"]],[[[1,\"              \"],[1,[28,[35,3],[[28,[37,4],[\"topic.feature_topic.banner_exists\"],null]],null]],[1,\"\\n\"]],[]],[[[1,\"              \"],[1,[28,[35,3],[[28,[37,4],[\"topic.feature_topic.no_banner_exists\"],null]],null]],[1,\"\\n\"]],[]]],[1,\"          \"]],[]]]]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,2],[12],[1,\"\\n          \"],[1,[28,[35,4],[\"topic.feature_topic.banner_note\"],null]],[1,\"\\n        \"],[13],[1,\"\\n        \"],[10,2],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"isBanner\"]],[[[1,\"            \"],[1,[28,[35,4],[\"topic.feature_topic.remove_banner\"],null]],[1,\"\\n\"]],[]],[[[1,\"            \"],[1,[28,[35,4],[\"topic.feature_topic.make_banner\"],null]],[1,\"\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n        \"],[10,2],[12],[1,\"\\n\"],[41,[30,0,[\"model\",\"isBanner\"]],[[[1,\"            \"],[8,[39,5],null,[[\"@action\",\"@icon\",\"@label\",\"@class\"],[[28,[37,6],[[30,0],\"removeBanner\"],null],\"thumbtack\",\"topic.feature.remove_banner\",\"btn-primary\"]],null],[1,\"\\n\"]],[]],[[[1,\"            \"],[8,[39,5],null,[[\"@action\",\"@icon\",\"@label\",\"@class\"],[[28,[37,6],[[30,0],\"makeBanner\"],null],\"thumbtack\",\"topic.feature.make_banner\",\"btn-primary make-banner\"]],null],[1,\"\\n\"]],[]]],[1,\"        \"],[13],[1,\"\\n      \"],[13],[1,\"\\n    \"],[13],[1,\"\\n\"]],[]],null]],[]]]]],[1,\"\\n\"],[10,0],[14,0,\"modal-footer\"],[12],[1,\"\\n  \"],[8,[39,11],null,[[\"@close\"],[[28,[37,12],[\"closeModal\"],null]]],null],[1,\"\\n\"],[13]],[],false,[\"d-modal-body\",\"if\",\"conditional-loading-spinner\",\"html-safe\",\"i18n\",\"d-button\",\"action\",\"future-date-input\",\"mut\",\"popup-input-tip\",\"d-icon\",\"d-modal-cancel\",\"route-action\"]]",
    "moduleName": "discourse/templates/modal/feature-topic.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
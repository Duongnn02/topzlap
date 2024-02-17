define("discourse/templates/about", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DSection @pageClass="about">
    <div class="container">
      <div class="contents clearfix body-page">
  
        <ul class="nav-pills">
          <li class="nav-item-about"><LinkTo @route="about" class="active">{{i18n
                "about.simple_title"
              }}</LinkTo></li>
          {{#if this.faqOverridden}}
            <li class="nav-item-guidelines"><LinkTo @route="guidelines">{{i18n
                  "guidelines"
                }}</LinkTo></li>
            <li class="nav-item-faq"><LinkTo @route="faq">{{i18n
                  "faq"
                }}</LinkTo></li>
          {{else}}
            <li class="nav-item-faq"><LinkTo @route="faq">{{i18n
                  "faq"
                }}</LinkTo></li>
          {{/if}}
          <li class="nav-item-tos"><LinkTo @route="tos">{{i18n
                "tos"
              }}</LinkTo></li>
          <li class="nav-item-privacy"><LinkTo @route="privacy">{{i18n
                "privacy"
              }}</LinkTo></li>
        </ul>
  
        <section class="about description">
          <h2>{{i18n "about.title" title=this.model.title}}</h2>
          <p>{{this.model.description}}</p>
        </section>
  
        <PluginOutlet
          @name="about-after-description"
          @connectorTagName="section"
          @outletArgs={{hash model=this.model}}
        />
  
        {{#if this.model.admins}}
          <section class="about admins">
            <h3>{{d-icon "users"}} {{i18n "about.our_admins"}}</h3>
  
            <AboutPageUsers @users={{this.model.admins}} />
            <div class="clearfix"></div>
          </section>
        {{/if}}
  
        <span>
          <PluginOutlet
            @name="about-after-admins"
            @connectorTagName="section"
            @outletArgs={{hash model=this.model}}
          />
        </span>
  
        {{#if this.model.moderators}}
          <section class="about moderators">
            <h3>{{d-icon "users"}} {{i18n "about.our_moderators"}}</h3>
  
            <div class="users">
              <AboutPageUsers @users={{this.model.moderators}} />
            </div>
            <div class="clearfix"></div>
          </section>
        {{/if}}
  
        <span>
          <PluginOutlet
            @name="about-after-moderators"
            @connectorTagName="section"
            @outletArgs={{hash model=this.model}}
          />
        </span>
  
        {{#if this.model.category_moderators.length}}
          {{#each this.model.category_moderators as |cm|}}
            <section
              class="about category-moderators moderators-{{cm.category.slug}}"
            >
              <h3>{{category-link cm.category}}{{i18n "about.moderators"}}</h3>
              <div class="users">
                <AboutPageUsers @users={{cm.moderators}} />
              </div>
              <div class="clearfix"></div>
            </section>
          {{/each}}
        {{/if}}
        {{#if this.model.can_see_about_stats}}
          <section class="about stats">
            <h3>{{d-icon "far-chart-bar"}} {{i18n "about.stats"}}</h3>
  
            <table class="table">
              <tbody>
                <tr>
                  <th>&nbsp;</th>
                  <th>{{i18n "about.stat.last_day"}}</th>
                  <th>{{i18n "about.stat.last_7_days"}}</th>
                  <th>{{i18n "about.stat.last_30_days"}}</th>
                  <th>{{i18n "about.stat.all_time"}}</th>
                </tr>
                <tr class="about-topic-count">
                  <td class="title">{{i18n "about.topic_count"}}</td>
                  <td>{{number this.model.stats.topics_last_day}}</td>
                  <td>{{number this.model.stats.topics_7_days}}</td>
                  <td>{{number this.model.stats.topics_30_days}}</td>
                  <td>{{number this.model.stats.topic_count}}</td>
                </tr>
                <tr class="about-post-count">
                  <td>{{i18n "about.post_count"}}</td>
                  <td>{{number this.model.stats.posts_last_day}}</td>
                  <td>{{number this.model.stats.posts_7_days}}</td>
                  <td>{{number this.model.stats.posts_30_days}}</td>
                  <td>{{number this.model.stats.post_count}}</td>
                </tr>
                <tr class="about-user-count">
                  <td>{{i18n "about.user_count"}}</td>
                  <td>{{number this.model.stats.users_last_day}}</td>
                  <td>{{number this.model.stats.users_7_days}}</td>
                  <td>{{number this.model.stats.users_30_days}}</td>
                  <td>{{number this.model.stats.user_count}}</td>
                </tr>
                <tr class="about-active-user-count">
                  <td>{{i18n "about.active_user_count"}}</td>
                  <td>{{number this.model.stats.active_users_last_day}}</td>
                  <td>{{number this.model.stats.active_users_7_days}}</td>
                  <td>{{number this.model.stats.active_users_30_days}}</td>
                  <td>&mdash;</td>
                </tr>
                <tr class="about-like-count">
                  <td>{{i18n "about.like_count"}}</td>
                  <td>{{number this.model.stats.likes_last_day}}</td>
                  <td>{{number this.model.stats.likes_7_days}}</td>
                  <td>{{number this.model.stats.likes_30_days}}</td>
                  <td>{{number this.model.stats.like_count}}</td>
                </tr>
                {{#each
                  this.site.displayed_about_plugin_stat_groups
                  as |statGroupName|
                }}
                  <tr class={{concat "about-" statGroupName "-count"}}>
                    <td>{{i18n (concat "about." statGroupName "_count")}}</td>
                    <td>{{number
                        (get this.model.stats (concat statGroupName "_last_day"))
                      }}</td>
                    <td>{{number
                        (get this.model.stats (concat statGroupName "_7_days"))
                      }}</td>
                    <td>{{number
                        (get this.model.stats (concat statGroupName "_30_days"))
                      }}</td>
                    <td>{{number
                        (get this.model.stats (concat statGroupName "_count"))
                      }}</td>
                  </tr>
                {{/each}}
              </tbody>
            </table>
          </section>
        {{/if}}
  
        {{#if this.contactInfo}}
          <section class="about contact">
            <h3>{{d-icon "envelope"}} {{i18n "about.contact"}}</h3>
            <p>{{html-safe this.contactInfo}}</p>
          </section>
        {{/if}}
  
      </div>
    </div>
  </DSection>
  */
  {
    "id": "Lupxu+hX",
    "block": "[[[8,[39,0],null,[[\"@pageClass\"],[\"about\"]],[[\"default\"],[[[[1,\"\\n  \"],[10,0],[14,0,\"container\"],[12],[1,\"\\n    \"],[10,0],[14,0,\"contents clearfix body-page\"],[12],[1,\"\\n\\n      \"],[10,\"ul\"],[14,0,\"nav-pills\"],[12],[1,\"\\n        \"],[10,\"li\"],[14,0,\"nav-item-about\"],[12],[8,[39,1],[[24,0,\"active\"]],[[\"@route\"],[\"about\"]],[[\"default\"],[[[[1,[28,[35,2],[\"about.simple_title\"],null]]],[]]]]],[13],[1,\"\\n\"],[41,[30,0,[\"faqOverridden\"]],[[[1,\"          \"],[10,\"li\"],[14,0,\"nav-item-guidelines\"],[12],[8,[39,1],null,[[\"@route\"],[\"guidelines\"]],[[\"default\"],[[[[1,[28,[35,2],[\"guidelines\"],null]]],[]]]]],[13],[1,\"\\n          \"],[10,\"li\"],[14,0,\"nav-item-faq\"],[12],[8,[39,1],null,[[\"@route\"],[\"faq\"]],[[\"default\"],[[[[1,[28,[35,2],[\"faq\"],null]]],[]]]]],[13],[1,\"\\n\"]],[]],[[[1,\"          \"],[10,\"li\"],[14,0,\"nav-item-faq\"],[12],[8,[39,1],null,[[\"@route\"],[\"faq\"]],[[\"default\"],[[[[1,[28,[35,2],[\"faq\"],null]]],[]]]]],[13],[1,\"\\n\"]],[]]],[1,\"        \"],[10,\"li\"],[14,0,\"nav-item-tos\"],[12],[8,[39,1],null,[[\"@route\"],[\"tos\"]],[[\"default\"],[[[[1,[28,[35,2],[\"tos\"],null]]],[]]]]],[13],[1,\"\\n        \"],[10,\"li\"],[14,0,\"nav-item-privacy\"],[12],[8,[39,1],null,[[\"@route\"],[\"privacy\"]],[[\"default\"],[[[[1,[28,[35,2],[\"privacy\"],null]]],[]]]]],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[10,\"section\"],[14,0,\"about description\"],[12],[1,\"\\n        \"],[10,\"h2\"],[12],[1,[28,[35,2],[\"about.title\"],[[\"title\"],[[30,0,[\"model\",\"title\"]]]]]],[13],[1,\"\\n        \"],[10,2],[12],[1,[30,0,[\"model\",\"description\"]]],[13],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"about-after-description\",\"section\",[28,[37,5],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"admins\"]],[[[1,\"        \"],[10,\"section\"],[14,0,\"about admins\"],[12],[1,\"\\n          \"],[10,\"h3\"],[12],[1,[28,[35,6],[\"users\"],null]],[1,\" \"],[1,[28,[35,2],[\"about.our_admins\"],null]],[13],[1,\"\\n\\n          \"],[8,[39,7],null,[[\"@users\"],[[30,0,[\"model\",\"admins\"]]]],null],[1,\"\\n          \"],[10,0],[14,0,\"clearfix\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[10,1],[12],[1,\"\\n        \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"about-after-admins\",\"section\",[28,[37,5],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"moderators\"]],[[[1,\"        \"],[10,\"section\"],[14,0,\"about moderators\"],[12],[1,\"\\n          \"],[10,\"h3\"],[12],[1,[28,[35,6],[\"users\"],null]],[1,\" \"],[1,[28,[35,2],[\"about.our_moderators\"],null]],[13],[1,\"\\n\\n          \"],[10,0],[14,0,\"users\"],[12],[1,\"\\n            \"],[8,[39,7],null,[[\"@users\"],[[30,0,[\"model\",\"moderators\"]]]],null],[1,\"\\n          \"],[13],[1,\"\\n          \"],[10,0],[14,0,\"clearfix\"],[12],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n      \"],[10,1],[12],[1,\"\\n        \"],[8,[39,4],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"about-after-moderators\",\"section\",[28,[37,5],null,[[\"model\"],[[30,0,[\"model\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n\"],[41,[30,0,[\"model\",\"category_moderators\",\"length\"]],[[[42,[28,[37,9],[[28,[37,9],[[30,0,[\"model\",\"category_moderators\"]]],null]],null],null,[[[1,\"          \"],[10,\"section\"],[15,0,[29,[\"about category-moderators moderators-\",[30,1,[\"category\",\"slug\"]]]]],[12],[1,\"\\n            \"],[10,\"h3\"],[12],[1,[28,[35,10],[[30,1,[\"category\"]]],null]],[1,[28,[35,2],[\"about.moderators\"],null]],[13],[1,\"\\n            \"],[10,0],[14,0,\"users\"],[12],[1,\"\\n              \"],[8,[39,7],null,[[\"@users\"],[[30,1,[\"moderators\"]]]],null],[1,\"\\n            \"],[13],[1,\"\\n            \"],[10,0],[14,0,\"clearfix\"],[12],[13],[1,\"\\n          \"],[13],[1,\"\\n\"]],[1]],null]],[]],null],[41,[30,0,[\"model\",\"can_see_about_stats\"]],[[[1,\"        \"],[10,\"section\"],[14,0,\"about stats\"],[12],[1,\"\\n          \"],[10,\"h3\"],[12],[1,[28,[35,6],[\"far-chart-bar\"],null]],[1,\" \"],[1,[28,[35,2],[\"about.stats\"],null]],[13],[1,\"\\n\\n          \"],[10,\"table\"],[14,0,\"table\"],[12],[1,\"\\n            \"],[10,\"tbody\"],[12],[1,\"\\n              \"],[10,\"tr\"],[12],[1,\"\\n                \"],[10,\"th\"],[12],[1,\" \"],[13],[1,\"\\n                \"],[10,\"th\"],[12],[1,[28,[35,2],[\"about.stat.last_day\"],null]],[13],[1,\"\\n                \"],[10,\"th\"],[12],[1,[28,[35,2],[\"about.stat.last_7_days\"],null]],[13],[1,\"\\n                \"],[10,\"th\"],[12],[1,[28,[35,2],[\"about.stat.last_30_days\"],null]],[13],[1,\"\\n                \"],[10,\"th\"],[12],[1,[28,[35,2],[\"about.stat.all_time\"],null]],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,\"tr\"],[14,0,\"about-topic-count\"],[12],[1,\"\\n                \"],[10,\"td\"],[14,0,\"title\"],[12],[1,[28,[35,2],[\"about.topic_count\"],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"topics_last_day\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"topics_7_days\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"topics_30_days\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"topic_count\"]]],null]],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,\"tr\"],[14,0,\"about-post-count\"],[12],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,2],[\"about.post_count\"],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"posts_last_day\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"posts_7_days\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"posts_30_days\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"post_count\"]]],null]],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,\"tr\"],[14,0,\"about-user-count\"],[12],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,2],[\"about.user_count\"],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"users_last_day\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"users_7_days\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"users_30_days\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"user_count\"]]],null]],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,\"tr\"],[14,0,\"about-active-user-count\"],[12],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,2],[\"about.active_user_count\"],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"active_users_last_day\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"active_users_7_days\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"active_users_30_days\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,\"—\"],[13],[1,\"\\n              \"],[13],[1,\"\\n              \"],[10,\"tr\"],[14,0,\"about-like-count\"],[12],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,2],[\"about.like_count\"],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"likes_last_day\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"likes_7_days\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"likes_30_days\"]]],null]],[13],[1,\"\\n                \"],[10,\"td\"],[12],[1,[28,[35,11],[[30,0,[\"model\",\"stats\",\"like_count\"]]],null]],[13],[1,\"\\n              \"],[13],[1,\"\\n\"],[42,[28,[37,9],[[28,[37,9],[[30,0,[\"site\",\"displayed_about_plugin_stat_groups\"]]],null]],null],null,[[[1,\"                \"],[10,\"tr\"],[15,0,[28,[37,12],[\"about-\",[30,2],\"-count\"],null]],[12],[1,\"\\n                  \"],[10,\"td\"],[12],[1,[28,[35,2],[[28,[37,12],[\"about.\",[30,2],\"_count\"],null]],null]],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[1,[28,[35,11],[[28,[37,13],[[30,0,[\"model\",\"stats\"]],[28,[37,12],[[30,2],\"_last_day\"],null]],null]],null]],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[1,[28,[35,11],[[28,[37,13],[[30,0,[\"model\",\"stats\"]],[28,[37,12],[[30,2],\"_7_days\"],null]],null]],null]],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[1,[28,[35,11],[[28,[37,13],[[30,0,[\"model\",\"stats\"]],[28,[37,12],[[30,2],\"_30_days\"],null]],null]],null]],[13],[1,\"\\n                  \"],[10,\"td\"],[12],[1,[28,[35,11],[[28,[37,13],[[30,0,[\"model\",\"stats\"]],[28,[37,12],[[30,2],\"_count\"],null]],null]],null]],[13],[1,\"\\n                \"],[13],[1,\"\\n\"]],[2]],null],[1,\"            \"],[13],[1,\"\\n          \"],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"contactInfo\"]],[[[1,\"        \"],[10,\"section\"],[14,0,\"about contact\"],[12],[1,\"\\n          \"],[10,\"h3\"],[12],[1,[28,[35,6],[\"envelope\"],null]],[1,\" \"],[1,[28,[35,2],[\"about.contact\"],null]],[13],[1,\"\\n          \"],[10,2],[12],[1,[28,[35,14],[[30,0,[\"contactInfo\"]]],null]],[13],[1,\"\\n        \"],[13],[1,\"\\n\"]],[]],null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\"]],[]]]]]],[\"cm\",\"statGroupName\"],false,[\"d-section\",\"link-to\",\"i18n\",\"if\",\"plugin-outlet\",\"hash\",\"d-icon\",\"about-page-users\",\"each\",\"-track-array\",\"category-link\",\"number\",\"concat\",\"get\",\"html-safe\"]]",
    "moduleName": "discourse/templates/about.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
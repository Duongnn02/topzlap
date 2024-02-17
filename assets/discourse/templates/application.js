define("discourse/templates/application", ["exports", "@ember/template-factory"], function (_exports, _templateFactory) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars"eaimeta@70e063a35619d71f
  var _default = (0, _templateFactory.createTemplateFactory)(
  /*
    <DiscourseRoot>
    <a href="#main-container" id="skip-link">{{i18n "skip_to_main_content"}}</a>
    <DDocument />
    <PluginOutlet
      @name="above-site-header"
      @connectorTagName="div"
      @outletArgs={{hash currentPath=this.router._router.currentPath}}
    />
  
    {{#if this.showSiteHeader}}
      <SiteHeader
        @canSignUp={{this.canSignUp}}
        @showCreateAccount={{route-action "showCreateAccount"}}
        @showLogin={{route-action "showLogin"}}
        @showKeyboard={{route-action "showKeyboardShortcutsHelp"}}
        @toggleMobileView={{route-action "toggleMobileView"}}
        @toggleAnonymous={{route-action "toggleAnonymous"}}
        @logout={{route-action "logout"}}
        @sidebarEnabled={{this.sidebarEnabled}}
        @navigationMenuQueryParamOverride={{this.navigationMenuQueryParamOverride}}
        @showSidebar={{this.showSidebar}}
        @toggleSidebar={{action "toggleSidebar"}}
      />
    {{/if}}
  
    <SoftwareUpdatePrompt />
  
    <PluginOutlet
      @name="below-site-header"
      @connectorTagName="div"
      @outletArgs={{hash currentPath=this.router._router.currentPath}}
    />
  
    <div id="main-outlet-wrapper" class="wrap" role="main">
  
      <div class="sidebar-wrapper">
        {{! empty div allows for animation }}
        {{#if (and this.sidebarEnabled this.showSidebar)}}
          <Sidebar @toggleSidebar={{action "toggleSidebar"}} />
        {{/if}}
      </div>
  
      <div id="main-outlet">
        <PluginOutlet @name="above-main-container" @connectorTagName="div" />
        <div class="container" id="main-container">
          {{#if this.showTop}}
            <CustomHtml @name="top" />
          {{/if}}
          <NotificationConsentBanner />
          <PwaInstallBanner />
          <GlobalNotice />
          <CreateTopicsNotice />
          <PluginOutlet
            @name="top-notices"
            @connectorTagName="div"
            @outletArgs={{hash currentPath=this.router._router.currentPath}}
          />
        </div>
  
        {{outlet}}
  
        <CardContainer />
      </div>
    </div>
  
    <PluginOutlet
      @name="above-footer"
      @connectorTagName="div"
      @outletArgs={{hash showFooter=this.showFooter}}
    />
    {{#if this.showFooter}}
      <CustomHtml
        @name="footer"
        @triggerAppEvent="true"
        @classNames="custom-footer-content"
      />
    {{/if}}
    <PluginOutlet
      @name="below-footer"
      @connectorTagName="div"
      @outletArgs={{hash showFooter=this.showFooter}}
    />
  
    {{outlet "modal"}}
    <DialogHolder />
    <TopicEntrance />
    <ComposerContainer />
  
    {{#if this.showFooterNav}}
      <FooterNav />
    {{/if}}
  </DiscourseRoot>
  */
  {
    "id": "xK5zPNNc",
    "block": "[[[8,[39,0],null,null,[[\"default\"],[[[[1,\"\\n  \"],[10,3],[14,6,\"#main-container\"],[14,1,\"skip-link\"],[12],[1,[28,[35,1],[\"skip_to_main_content\"],null]],[13],[1,\"\\n  \"],[8,[39,2],null,null,null],[1,\"\\n  \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"above-site-header\",\"div\",[28,[37,4],null,[[\"currentPath\"],[[30,0,[\"router\",\"_router\",\"currentPath\"]]]]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"showSiteHeader\"]],[[[1,\"    \"],[8,[39,6],null,[[\"@canSignUp\",\"@showCreateAccount\",\"@showLogin\",\"@showKeyboard\",\"@toggleMobileView\",\"@toggleAnonymous\",\"@logout\",\"@sidebarEnabled\",\"@navigationMenuQueryParamOverride\",\"@showSidebar\",\"@toggleSidebar\"],[[30,0,[\"canSignUp\"]],[28,[37,7],[\"showCreateAccount\"],null],[28,[37,7],[\"showLogin\"],null],[28,[37,7],[\"showKeyboardShortcutsHelp\"],null],[28,[37,7],[\"toggleMobileView\"],null],[28,[37,7],[\"toggleAnonymous\"],null],[28,[37,7],[\"logout\"],null],[30,0,[\"sidebarEnabled\"]],[30,0,[\"navigationMenuQueryParamOverride\"]],[30,0,[\"showSidebar\"]],[28,[37,8],[[30,0],\"toggleSidebar\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n  \"],[8,[39,9],null,null,null],[1,\"\\n\\n  \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"below-site-header\",\"div\",[28,[37,4],null,[[\"currentPath\"],[[30,0,[\"router\",\"_router\",\"currentPath\"]]]]]]],null],[1,\"\\n\\n  \"],[10,0],[14,1,\"main-outlet-wrapper\"],[14,0,\"wrap\"],[14,\"role\",\"main\"],[12],[1,\"\\n\\n    \"],[10,0],[14,0,\"sidebar-wrapper\"],[12],[1,\"\\n\"],[41,[28,[37,10],[[30,0,[\"sidebarEnabled\"]],[30,0,[\"showSidebar\"]]],null],[[[1,\"        \"],[8,[39,11],null,[[\"@toggleSidebar\"],[[28,[37,8],[[30,0],\"toggleSidebar\"],null]]],null],[1,\"\\n\"]],[]],null],[1,\"    \"],[13],[1,\"\\n\\n    \"],[10,0],[14,1,\"main-outlet\"],[12],[1,\"\\n      \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\"],[\"above-main-container\",\"div\"]],null],[1,\"\\n      \"],[10,0],[14,0,\"container\"],[14,1,\"main-container\"],[12],[1,\"\\n\"],[41,[30,0,[\"showTop\"]],[[[1,\"          \"],[8,[39,12],null,[[\"@name\"],[\"top\"]],null],[1,\"\\n\"]],[]],null],[1,\"        \"],[8,[39,13],null,null,null],[1,\"\\n        \"],[8,[39,14],null,null,null],[1,\"\\n        \"],[8,[39,15],null,null,null],[1,\"\\n        \"],[8,[39,16],null,null,null],[1,\"\\n        \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"top-notices\",\"div\",[28,[37,4],null,[[\"currentPath\"],[[30,0,[\"router\",\"_router\",\"currentPath\"]]]]]]],null],[1,\"\\n      \"],[13],[1,\"\\n\\n      \"],[46,[28,[37,18],null,null],null,null,null],[1,\"\\n\\n      \"],[8,[39,19],null,null,null],[1,\"\\n    \"],[13],[1,\"\\n  \"],[13],[1,\"\\n\\n  \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"above-footer\",\"div\",[28,[37,4],null,[[\"showFooter\"],[[30,0,[\"showFooter\"]]]]]]],null],[1,\"\\n\"],[41,[30,0,[\"showFooter\"]],[[[1,\"    \"],[8,[39,12],null,[[\"@name\",\"@triggerAppEvent\",\"@classNames\"],[\"footer\",\"true\",\"custom-footer-content\"]],null],[1,\"\\n\"]],[]],null],[1,\"  \"],[8,[39,3],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"below-footer\",\"div\",[28,[37,4],null,[[\"showFooter\"],[[30,0,[\"showFooter\"]]]]]]],null],[1,\"\\n\\n  \"],[46,[28,[37,18],[\"modal\"],null],null,null,null],[1,\"\\n  \"],[8,[39,20],null,null,null],[1,\"\\n  \"],[8,[39,21],null,null,null],[1,\"\\n  \"],[8,[39,22],null,null,null],[1,\"\\n\\n\"],[41,[30,0,[\"showFooterNav\"]],[[[1,\"    \"],[8,[39,23],null,null,null],[1,\"\\n\"]],[]],null]],[]]]]]],[],false,[\"discourse-root\",\"i18n\",\"d-document\",\"plugin-outlet\",\"hash\",\"if\",\"site-header\",\"route-action\",\"action\",\"software-update-prompt\",\"and\",\"sidebar\",\"custom-html\",\"notification-consent-banner\",\"pwa-install-banner\",\"global-notice\",\"create-topics-notice\",\"component\",\"-outlet\",\"card-container\",\"dialog-holder\",\"topic-entrance\",\"composer-container\",\"footer-nav\"]]",
    "moduleName": "discourse/templates/application.hbs",
    "isStrictMode": false
  });
  _exports.default = _default;
});
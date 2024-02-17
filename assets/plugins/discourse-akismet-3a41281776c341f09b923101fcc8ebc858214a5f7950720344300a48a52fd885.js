define("discourse/plugins/discourse-akismet/discourse-akismet/connectors/flag-modal-bottom/akismet-status",["exports"],(function(e){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var s={setupComponent(e,s){s.set("post",e.post)}}
e.default=s})),define("discourse/plugins/discourse-akismet/discourse-akismet/connectors/topic-above-post-stream/topic-removed-notification",["exports"],(function(e){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
const s="/discourse-akismet/topic-deleted/"
var t={setupComponent(e,t){t.messageBus.subscribe(`${s}${e.model.id}`,(()=>{t.set("akismetFlaggedTopic",!0)}))},teardownComponent(e){e.messageBus.unsubscribe(`${s}${e.model.id}`)}}
e.default=t})),define("discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/flag-modal-bottom/akismet-status",["exports","@ember/template-factory"],(function(e,s){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=(0,s.createTemplateFactory)({id:"OezFbmst",block:'[[[41,[33,1,["akismet_state"]],[[[1,"  "],[10,0],[14,0,"consent_banner alert alert-info"],[12],[1,"\\n    "],[10,1],[12],[1,[28,[35,2],[[28,[37,3],["akismet.post_state.",[33,1,["akismet_state"]]],null]],null]],[13],[1,"\\n  "],[13],[1,"\\n"]],[]],null]],[],false,["if","post","i18n","concat"]]',moduleName:"discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/flag-modal-bottom/akismet-status.hbs",isStrictMode:!1})
e.default=t})),define("discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/topic-above-post-stream/topic-removed-notification",["exports","@ember/template-factory"],(function(e,s){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=(0,s.createTemplateFactory)({id:"BnuSuPOJ",block:'[[[41,[33,1],[[[1,"  "],[10,0],[14,0,"alert alert-info category-read-only-banner"],[12],[1,"\\n    "],[1,[28,[35,2],["akismet.topic_deleted"],null]],[1,"\\n  "],[13],[1,"\\n"]],[]],null]],[],false,["if","akismetFlaggedTopic","i18n"]]',moduleName:"discourse/plugins/discourse-akismet/discourse-akismet/templates/connectors/topic-above-post-stream/topic-removed-notification.hbs",isStrictMode:!1})
e.default=t})),define("discourse/plugins/discourse-akismet/discourse/initializers/add-akismet-state",["exports","discourse/lib/plugin-api"],(function(e,s){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t={name:"add-akismet-state",initialize(){(0,s.withPluginApi)("0.8.31",(e=>{e.includePostAttributes("akismet_state")}))}}
e.default=t})),define("discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-api-error",["exports","@ember/template-factory"],(function(e,s){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=(0,s.createTemplateFactory)({id:"pkWlUW2r",block:'[[[10,0],[14,0,"reviewable-score-reason"],[12],[1,"\\n  "],[1,[28,[35,0],["admin.akismet_api_error"],null]],[1,"\\n  "],[1,[33,1,["error"]]],[1,"\\n  ("],[1,[33,1,["code"]]],[1,")\\n  "],[1,[33,1,["msg"]]],[1,"\\n"],[13]],[],false,["i18n","external_error"]]',moduleName:"discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-api-error.hbs",isStrictMode:!1})
e.default=t})),define("discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-post",["exports","@ember/template-factory"],(function(e,s){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=(0,s.createTemplateFactory)({id:"XmrkvMSw",block:'[[[1,[28,[35,0],null,[["reviewable","tagName"],[[33,1],""]]]],[1,"\\n\\n"],[10,0],[14,0,"post-contents-wrapper"],[12],[1,"\\n  "],[1,[28,[35,2],null,[["user","tagName"],[[33,1,["target_created_by"]],""]]]],[1,"\\n\\n  "],[10,0],[14,0,"post-contents"],[12],[1,"\\n    "],[1,[28,[35,3],null,[["user","tagName"],[[33,1,["target_created_by"]],""]]]],[1,"\\n\\n    "],[10,0],[14,0,"post-body"],[12],[1,"\\n      "],[1,[28,[35,4],[[33,1,["payload","post_cooked"]]],null]],[1,"\\n    "],[13],[1,"\\n\\n    "],[18,1,null],[1,"\\n\\n"],[41,[33,1,["payload","external_error"]],[[[1,"      "],[1,[28,[35,7],null,[["external_error"],[[33,1,["payload","external_error"]]]]]],[1,"\\n"]],[]],null],[1,"  "],[13],[1,"\\n"],[13]],["&default"],false,["reviewable-topic-link","reviewable","reviewable-created-by","reviewable-created-by-name","html-safe","yield","if","reviewable-akismet-api-error"]]',moduleName:"discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-post.hbs",isStrictMode:!1})
e.default=t})),define("discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user",["exports","@ember/template-factory"],(function(e,s){"use strict"
Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0
var t=(0,s.createTemplateFactory)({id:"7oufc+/q",block:'[[[10,0],[14,0,"reviewable-user-info"],[12],[1,"\\n  "],[10,0],[14,0,"reviewable-user-fields"],[12],[1,"\\n    "],[10,0],[14,0,"reviewable-user-details username"],[12],[1,"\\n      "],[10,0],[14,0,"name"],[12],[1,[28,[35,0],["review.user.username"],null]],[13],[1,"\\n      "],[10,0],[14,0,"value"],[12],[1,"\\n"],[41,[33,2,["user_deleted"]],[[[1,"          "],[1,[33,2,["payload","username"]]],[1,"\\n"]],[]],[[[1,"          "],[10,3],[15,6,[28,[37,3],[[28,[37,4],["/u/",[33,2,["payload","username"]],"/summary"],null]],null]],[12],[1,"\\n            "],[1,[33,2,["payload","username"]]],[1,"\\n          "],[13],[1,"\\n"]],[]]],[1,"      "],[13],[1,"\\n    "],[13],[1,"\\n\\n    "],[1,[28,[35,5],null,[["classes","name","value"],["reviewable-user-details name",[28,[37,0],["review.user.name"],null],[33,2,["payload","name"]]]]]],[1,"\\n\\n    "],[1,[28,[35,5],null,[["classes","name","value"],["reviewable-user-details email",[28,[37,0],["review.user.email"],null],[33,2,["payload","email"]]]]]],[1,"\\n\\n    "],[1,[28,[35,5],null,[["classes","name","value"],["reviewable-user-details bio",[28,[37,0],["review.user.bio"],null],[33,2,["payload","bio"]]]]]],[1,"\\n  "],[13],[1,"\\n\\n  "],[18,1,null],[1,"\\n\\n"],[41,[33,2,["payload","external_error"]],[[[1,"    "],[1,[28,[35,7],null,[["external_error"],[[33,2,["payload","external_error"]]]]]],[1,"\\n"]],[]],null],[13]],["&default"],false,["i18n","if","reviewable","get-url","concat","reviewable-field","yield","reviewable-akismet-api-error"]]',moduleName:"discourse/plugins/discourse-akismet/discourse/templates/components/reviewable-akismet-user.hbs",isStrictMode:!1})
e.default=t}))

//# sourceMappingURL=discourse-akismet-408702baf5f61591822ea55712fdfa6b78b5a921900f6873d57c6a8bc0d95146.map
//!

;
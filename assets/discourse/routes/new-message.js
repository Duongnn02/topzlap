define("discourse/routes/new-message", ["exports", "discourse/routes/discourse", "discourse/models/group", "I18n", "discourse/lib/cookie", "@ember/runloop", "@ember/service"], function (_exports, _discourse, _group, _I18n, _cookie, _runloop, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/routes/discourse",0,"discourse/models/group",0,"I18n",0,"discourse/lib/cookie",0,"@ember/runloop",0,"@ember/service"eaimeta@70e063a35619d71f
  var _default = _discourse.default.extend({
    dialog: (0, _service.inject)(),
    beforeModel(transition) {
      const params = transition.to.queryParams;
      const groupName = params.groupname || params.group_name;
      if (this.currentUser) {
        this.replaceWith("discovery.latest").then(e => {
          if (params.username) {
            e.send("createNewMessageViaParams", {
              recipients: params.username,
              topicTitle: params.title,
              topicBody: params.body
            });
          } else if (groupName) {
            // send a message to a group
            _group.default.messageable(groupName).then(result => {
              if (result.messageable) {
                (0, _runloop.next)(() => e.send("createNewMessageViaParams", {
                  recipients: groupName,
                  topicTitle: params.title,
                  topicBody: params.body
                }));
              } else {
                this.dialog.alert(_I18n.default.t("composer.cant_send_pm", {
                  username: groupName
                }));
              }
            }).catch(() => this.dialog.alert(_I18n.default.t("generic_error")));
          } else {
            e.send("createNewMessageViaParams", {
              topicTitle: params.title,
              topicBody: params.body
            });
          }
        });
      } else {
        (0, _cookie.default)("destination_url", window.location.href);
        this.replaceWith("login");
      }
    }
  });
  _exports.default = _default;
});
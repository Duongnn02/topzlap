define("discourse/routes/application", ["exports", "discourse/lib/url", "discourse/models/category", "discourse/models/composer", "discourse/routes/discourse", "I18n", "discourse/mixins/open-composer", "discourse/lib/ajax", "discourse/models/login-method", "discourse-common/lib/get-owner", "discourse-common/lib/get-url", "discourse/lib/logout", "discourse/lib/mobile", "@ember/service", "discourse/lib/computed", "discourse/lib/show-modal"], function (_exports, _url, _category, _composer, _discourse, _I18n, _openComposer, _ajax, _loginMethod, _getOwner, _getUrl, _logout, _mobile, _service, _computed, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/url",0,"discourse/models/category",0,"discourse/models/composer",0,"discourse/routes/discourse",0,"I18n",0,"discourse/mixins/open-composer",0,"discourse/lib/ajax",0,"discourse/models/login-method",0,"discourse-common/lib/get-owner",0,"discourse-common/lib/get-url",0,"discourse/lib/logout",0,"discourse/lib/mobile",0,"@ember/service",0,"discourse/lib/computed",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  function unlessReadOnly(method, message) {
    return function () {
      if (this.site.isReadOnly) {
        this.dialog.alert(message);
      } else {
        this[method]();
      }
    };
  }
  function unlessStrictlyReadOnly(method, message) {
    return function () {
      if (this.site.isReadOnly && !this.site.isStaffWritesOnly) {
        this.dialog.alert(message);
      } else {
        this[method]();
      }
    };
  }
  const ApplicationRoute = _discourse.default.extend(_openComposer.default, {
    siteTitle: (0, _computed.setting)("title"),
    shortSiteDescription: (0, _computed.setting)("short_site_description"),
    documentTitle: (0, _service.inject)(),
    dialog: (0, _service.inject)(),
    composer: (0, _service.inject)(),
    actions: {
      toggleAnonymous() {
        (0, _ajax.ajax)((0, _url.userPath)("toggle-anon"), {
          type: "POST"
        }).then(() => {
          window.location.reload();
        });
      },
      toggleMobileView() {
        _mobile.default.toggleMobileView();
      },
      toggleSidebar() {
        this.controllerFor("application").send("toggleSidebar");
      },
      logout: unlessStrictlyReadOnly("_handleLogout", _I18n.default.t("read_only_mode.logout_disabled")),
      _collectTitleTokens(tokens) {
        tokens.push(this.siteTitle);
        if ((window.location.pathname === (0, _getUrl.default)("/") || window.location.pathname === (0, _getUrl.default)("/login")) && this.shortSiteDescription !== "") {
          tokens.push(this.shortSiteDescription);
        }
        this.documentTitle.setTitle(tokens.join(" - "));
      },
      composePrivateMessage(user, post) {
        const recipients = user ? user.get("username") : "";
        const reply = post ? `${window.location.protocol}//${window.location.host}${post.url}` : null;
        const title = post ? _I18n.default.t("composer.reference_topic_title", {
          title: post.topic.title
        }) : null;

        // used only once, one less dependency
        return this.composer.open({
          action: _composer.default.PRIVATE_MESSAGE,
          recipients,
          archetypeId: "private_message",
          draftKey: _composer.default.NEW_PRIVATE_MESSAGE_KEY,
          draftSequence: 0,
          reply,
          title
        });
      },
      error(err, transition) {
        const xhrOrErr = err.jqXHR ? err.jqXHR : err;
        const exceptionController = this.controllerFor("exception");
        const c = window.console;
        if (c && c.error) {
          c.error(xhrOrErr);
        }
        if (xhrOrErr && xhrOrErr.status === 404) {
          return this.transitionTo("exception-unknown");
        }
        exceptionController.setProperties({
          lastTransition: transition,
          thrown: xhrOrErr
        });
        this.intermediateTransitionTo("exception");
        return true;
      },
      showLogin: unlessStrictlyReadOnly("handleShowLogin", _I18n.default.t("read_only_mode.login_disabled")),
      showCreateAccount: unlessReadOnly("handleShowCreateAccount", _I18n.default.t("read_only_mode.login_disabled")),
      showForgotPassword() {
        this.controllerFor("forgot-password").setProperties({
          offerHelp: null,
          helpSeen: false
        });
        (0, _showModal.default)("forgot-password", {
          title: "forgot_password.title"
        });
      },
      showNotActivated(props) {
        (0, _showModal.default)("not-activated", {
          title: "log_in"
        }).setProperties(props);
      },
      showUploadSelector() {
        document.getElementById("file-uploader").click();
      },
      showKeyboardShortcutsHelp() {
        (0, _showModal.default)("keyboard-shortcuts-help", {
          title: "keyboard_shortcuts_help.title"
        });
      },
      // Close the current modal, and destroy its state.
      closeModal(initiatedBy) {
        const route = (0, _getOwner.getOwner)(this).lookup("route:application");
        let modalController = route.controllerFor("modal");
        const controllerName = modalController.get("name");
        if (controllerName) {
          const controller = (0, _getOwner.getOwner)(this).lookup(`controller:${controllerName}`);
          if (controller && controller.beforeClose) {
            if (false === controller.beforeClose()) {
              return;
            }
          }
        }
        this.render("hide-modal", {
          into: "modal",
          outlet: "modalBody"
        });
        if (controllerName) {
          const controller = (0, _getOwner.getOwner)(this).lookup(`controller:${controllerName}`);
          if (controller) {
            this.appEvents.trigger("modal:closed", {
              name: controllerName,
              controller
            });
            if (controller.onClose) {
              controller.onClose({
                initiatedByCloseButton: initiatedBy === "initiatedByCloseButton",
                initiatedByClickOut: initiatedBy === "initiatedByClickOut",
                initiatedByESC: initiatedBy === "initiatedByESC"
              });
            }
          }
          modalController.set("name", null);
        }
      },
      /**
        Hide the modal, but keep it with all its state so that it can be shown again later.
        This is useful if you want to prompt for confirmation. hideModal, ask "Are you sure?",
        user clicks "No", reopenModal. If user clicks "Yes", be sure to call closeModal.
      **/
      hideModal() {
        $(".d-modal.fixed-modal").modal("hide");
      },
      reopenModal() {
        $(".d-modal.fixed-modal").modal("show");
      },
      editCategory(category) {
        _url.default.routeTo(`/c/${_category.default.slugFor(category)}/edit`);
      },
      checkEmail(user) {
        user.checkEmail();
      },
      changeBulkTemplate(w) {
        const controllerName = w.replace("modal/", "");
        const controller = (0, _getOwner.getOwner)(this).lookup("controller:" + controllerName);
        this.render(w, {
          into: "modal/topic-bulk-actions",
          outlet: "bulkOutlet",
          controller: controller ? controllerName : "topic-bulk-actions"
        });
      },
      createNewTopicViaParams(title, body, category_id, tags) {
        this.openComposerWithTopicParams(this.controllerFor("discovery/topics"), title, body, category_id, tags);
      },
      createNewMessageViaParams() {
        let {
          recipients = [],
          topicTitle = "",
          topicBody = "",
          hasGroups = false
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        this.openComposerWithMessageParams({
          recipients,
          topicTitle,
          topicBody,
          hasGroups
        });
      }
    },
    renderTemplate() {
      this.render("application");
      this.render("modal", {
        into: "application",
        outlet: "modal"
      });
    },
    handleShowLogin() {
      if (this.siteSettings.enable_discourse_connect) {
        const returnPath = encodeURIComponent(window.location.pathname);
        window.location = (0, _getUrl.default)("/session/sso?return_path=" + returnPath);
      } else {
        this._autoLogin("login", {
          notAuto: () => this.controllerFor("login").resetForm()
        });
      }
    },
    handleShowCreateAccount() {
      if (this.siteSettings.enable_discourse_connect) {
        const returnPath = encodeURIComponent(window.location.pathname);
        window.location = (0, _getUrl.default)("/session/sso?return_path=" + returnPath);
      } else {
        this._autoLogin("create-account", {
          modalClass: "create-account",
          signup: true,
          titleAriaElementId: "create-account-title"
        });
      }
    },
    _autoLogin(modal) {
      let {
        modalClass = undefined,
        notAuto = null,
        signup = false,
        titleAriaElementId = null
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const methods = (0, _loginMethod.findAll)();
      if (!this.siteSettings.enable_local_logins && methods.length === 1) {
        this.controllerFor("login").send("externalLogin", methods[0], {
          signup
        });
      } else {
        (0, _showModal.default)(modal, {
          modalClass,
          titleAriaElementId
        });
        notAuto?.();
      }
    },
    _handleLogout() {
      if (this.currentUser) {
        this.currentUser.destroySession().then(response => (0, _logout.default)({
          redirect: response["redirect_url"]
        }));
      }
    }
  });
  var _default = ApplicationRoute;
  _exports.default = _default;
});
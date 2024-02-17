define("discourse/plugins/discourse-assign/discourse-assign/initializers/extend-for-assigns", ["exports", "discourse/helpers/user-avatar", "discourse/lib/plugin-api", "discourse-common/utils/decorators", "discourse-common/lib/icon-library", "discourse/lib/utilities", "virtual-dom", "discourse/widgets/widget", "discourse-common/lib/get-owner", "@ember/template", "discourse-common/lib/get-url", "discourse/components/search-advanced-options", "discourse/controllers/topic-bulk-actions", "@ember/controller", "I18n", "@ember/utils", "discourse/lib/register-topic-footer-dropdown", "discourse/widgets/raw-html"], function (_exports, _userAvatar, _pluginApi, _decorators, _iconLibrary, _utilities, _virtualDom, _widget, _getOwner, _template, _getUrl, _searchAdvancedOptions, _topicBulkActions, _controller, _I18n, _utils, _registerTopicFooterDropdown, _rawHtml) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/helpers/user-avatar",0,"discourse/lib/plugin-api",0,"discourse-common/utils/decorators",0,"discourse-common/lib/icon-library",0,"discourse/lib/utilities",0,"virtual-dom",0,"discourse/widgets/widget",0,"discourse-common/lib/get-owner",0,"@ember/template",0,"discourse-common/lib/get-url",0,"discourse/components/search-advanced-options",0,"discourse/controllers/topic-bulk-actions",0,"@ember/controller",0,"I18n",0,"@ember/utils",0,"discourse/lib/register-topic-footer-dropdown",0,"discourse/widgets/raw-html"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const PLUGIN_ID = "discourse-assign";
  const DEPENDENT_KEYS = ["topic.assigned_to_user", "topic.assigned_to_group", "currentUser.can_assign", "topic.assigned_to_user.username"];
  function titleForState(name) {
    if (name) {
      return _I18n.default.t("discourse_assign.unassign.help", {
        username: name
      });
    } else {
      return _I18n.default.t("discourse_assign.assign.help");
    }
  }
  function defaultTitle(topic) {
    return titleForState(topic.get("topic.assigned_to_user.username") || topic.get("topic.assigned_to_group.name"));
  }
  function includeIsAssignedOnTopic(api) {
    api.modifyClass("model:topic", {
      pluginId: PLUGIN_ID,
      isAssigned() {
        return this.assigned_to_user || this.assigned_to_group;
      }
    });
  }
  function registerTopicFooterButtons(api) {
    (0, _registerTopicFooterDropdown.registerTopicFooterDropdown)({
      id: "reassign",
      action(id) {
        if (!this.get("currentUser.can_assign")) {
          return;
        }
        const taskActions = (0, _getOwner.getOwner)(this).lookup("service:task-actions");
        switch (id) {
          case "unassign":
            {
              this.set("topic.assigned_to_user", null);
              this.set("topic.assigned_to_group", null);
              taskActions.unassign(this.topic.id).then(() => {
                this.appEvents.trigger("post-stream:refresh", {
                  id: this.topic.postStream.firstPostId
                });
              });
              break;
            }
          case "reassign-self":
            {
              this.set("topic.assigned_to_user", null);
              this.set("topic.assigned_to_group", null);
              taskActions.reassignUserToTopic(this.currentUser, this.topic).then(() => {
                this.appEvents.trigger("post-stream:refresh", {
                  id: this.topic.postStream.firstPostId
                });
              });
              break;
            }
          case "reassign":
            {
              taskActions.assign(this.topic, {
                targetType: "Topic",
                isAssigned: this.topic.isAssigned()
              }).set("model.onSuccess", () => {
                this.appEvents.trigger("post-stream:refresh", {
                  id: this.topic.postStream.firstPostId
                });
              });
              break;
            }
        }
      },
      noneItem() {
        const user = this.get("topic.assigned_to_user");
        const group = this.get("topic.assigned_to_group");
        const label = _I18n.default.t("discourse_assign.unassign.title_w_ellipsis");
        const groupLabel = _I18n.default.t("discourse_assign.unassign.title");
        if (user) {
          return {
            id: null,
            name: _I18n.default.t("discourse_assign.reassign_modal.title"),
            label: (0, _template.htmlSafe)(`${(0, _userAvatar.renderAvatar)(user, {
              imageSize: "tiny",
              ignoreTitle: true
            })}<span class="unassign-label">${label}</span>`)
          };
        } else if (group) {
          return {
            id: null,
            name: _I18n.default.t("discourse_assign.reassign_modal.title"),
            label: (0, _template.htmlSafe)(`<span class="unassign-label">${groupLabel}</span> @${group.name}...`)
          };
        }
      },
      dependentKeys: DEPENDENT_KEYS,
      classNames: ["reassign"],
      content() {
        const content = [{
          id: "unassign",
          name: _I18n.default.t("discourse_assign.unassign.help", {
            username: this.topic.assigned_to_user?.username || this.topic.assigned_to_group?.name
          }),
          label: (0, _template.htmlSafe)(`${(0, _iconLibrary.iconHTML)("user-times")} ${_I18n.default.t("discourse_assign.unassign.title")}`)
        }];
        if (this.topic.isAssigned() && this.get("topic.assigned_to_user")?.username !== this.currentUser.username) {
          content.push({
            id: "reassign-self",
            name: _I18n.default.t("discourse_assign.reassign.to_self_help"),
            label: (0, _template.htmlSafe)(`${(0, _iconLibrary.iconHTML)("user-plus")} ${_I18n.default.t("discourse_assign.reassign.to_self")}`)
          });
        }
        content.push({
          id: "reassign",
          name: _I18n.default.t("discourse_assign.reassign.help"),
          label: (0, _template.htmlSafe)(`${(0, _iconLibrary.iconHTML)("group-plus")} ${_I18n.default.t("discourse_assign.reassign.title_w_ellipsis")}`)
        });
        return content;
      },
      displayed() {
        return this.get("currentUser.can_assign") && !this.site.mobileView && this.topic.isAssigned();
      }
    });
    api.registerTopicFooterButton({
      id: "assign",
      icon() {
        return this.topic.isAssigned() ? this.site.mobileView ? "user-times" : null : "user-plus";
      },
      priority: 250,
      translatedTitle() {
        return defaultTitle(this);
      },
      translatedAriaLabel() {
        return defaultTitle(this);
      },
      translatedLabel() {
        return _I18n.default.t("discourse_assign.assign.title");
      },
      action() {
        if (!this.get("currentUser.can_assign")) {
          return;
        }
        const taskActions = (0, _getOwner.getOwner)(this).lookup("service:task-actions");
        if (this.topic.isAssigned()) {
          this.set("topic.assigned_to_user", null);
          this.set("topic.assigned_to_group", null);
          taskActions.unassign(this.topic.id, "Topic").then(() => {
            this.appEvents.trigger("post-stream:refresh", {
              id: this.topic.postStream.firstPostId
            });
          });
        } else {
          taskActions.assign(this.topic).set("model.onSuccess", () => {
            this.appEvents.trigger("post-stream:refresh", {
              id: this.topic.postStream.firstPostId
            });
          });
        }
      },
      dropdown() {
        return this.site.mobileView;
      },
      classNames: ["assign"],
      dependentKeys: DEPENDENT_KEYS,
      displayed() {
        return this.currentUser?.can_assign && !this.topic.isAssigned();
      }
    });
    api.registerTopicFooterButton({
      id: "unassign-mobile-header",
      translatedTitle() {
        return defaultTitle(this);
      },
      translatedAriaLabel() {
        return defaultTitle(this);
      },
      translatedLabel() {
        const user = this.get("topic.assigned_to_user");
        const group = this.get("topic.assigned_to_group");
        const label = _I18n.default.t("discourse_assign.assigned_to_w_ellipsis");
        if (user) {
          return (0, _template.htmlSafe)(`<span class="unassign-label"><span class="text">${label}</span><span class="username">${user.username}</span></span>${(0, _userAvatar.renderAvatar)(user, {
            imageSize: "small",
            ignoreTitle: true
          })}`);
        } else if (group) {
          return (0, _template.htmlSafe)(`<span class="unassign-label">${label}</span> @${group.name}`);
        }
      },
      dropdown() {
        return this.currentUser?.can_assign && this.topic.isAssigned();
      },
      classNames: ["assign"],
      dependentKeys: DEPENDENT_KEYS,
      displayed() {
        // only display the button in the mobile view
        return this.currentUser?.can_assign && this.site.mobileView;
      }
    });
    api.registerTopicFooterButton({
      id: "unassign-mobile",
      icon() {
        return "user-times";
      },
      translatedTitle() {
        return defaultTitle(this);
      },
      translatedAriaLabel() {
        return defaultTitle(this);
      },
      translatedLabel() {
        const label = _I18n.default.t("discourse_assign.unassign.title");
        return (0, _template.htmlSafe)(`<span class="unassign-label"><span class="text">${label}</span></span>`);
      },
      action() {
        if (!this.get("currentUser.can_assign")) {
          return;
        }
        const taskActions = (0, _getOwner.getOwner)(this).lookup("service:task-actions");
        this.set("topic.assigned_to_user", null);
        this.set("topic.assigned_to_group", null);
        taskActions.unassign(this.topic.id).then(() => {
          this.appEvents.trigger("post-stream:refresh", {
            id: this.topic.postStream.firstPostId
          });
        });
      },
      dropdown() {
        return this.currentUser?.can_assign && this.topic.isAssigned();
      },
      classNames: ["assign"],
      dependentKeys: DEPENDENT_KEYS,
      displayed() {
        // only display the button in the mobile view
        return this.currentUser?.can_assign && this.site.mobileView && this.topic.isAssigned();
      }
    });
    api.registerTopicFooterButton({
      id: "reassign-self-mobile",
      icon() {
        return "user-plus";
      },
      translatedTitle() {
        return _I18n.default.t("discourse_assign.reassign.to_self_help");
      },
      translatedAriaLabel() {
        return _I18n.default.t("discourse_assign.reassign.to_self_help");
      },
      translatedLabel() {
        const label = _I18n.default.t("discourse_assign.reassign.to_self");
        return (0, _template.htmlSafe)(`<span class="unassign-label"><span class="text">${label}</span></span>`);
      },
      action() {
        if (!this.get("currentUser.can_assign")) {
          return;
        }
        const taskActions = (0, _getOwner.getOwner)(this).lookup("service:task-actions");
        this.set("topic.assigned_to_user", null);
        this.set("topic.assigned_to_group", null);
        taskActions.reassignUserToTopic(this.currentUser, this.topic).then(() => {
          this.appEvents.trigger("post-stream:refresh", {
            id: this.topic.postStream.firstPostId
          });
        });
      },
      dropdown() {
        return this.currentUser?.can_assign && this.topic.isAssigned();
      },
      classNames: ["assign"],
      dependentKeys: DEPENDENT_KEYS,
      displayed() {
        return (
          // only display the button in the mobile view
          this.site.mobileView && this.currentUser?.can_assign && this.topic.isAssigned() && this.get("topic.assigned_to_user")?.username !== this.currentUser.username
        );
      }
    });
    api.registerTopicFooterButton({
      id: "reassign-mobile",
      icon() {
        return "group-plus";
      },
      translatedTitle() {
        return _I18n.default.t("discourse_assign.reassign.help");
      },
      translatedAriaLabel() {
        return _I18n.default.t("discourse_assign.reassign.help");
      },
      translatedLabel() {
        const label = _I18n.default.t("discourse_assign.reassign.title_w_ellipsis");
        return (0, _template.htmlSafe)(`<span class="unassign-label"><span class="text">${label}</span></span>`);
      },
      action() {
        if (!this.get("currentUser.can_assign")) {
          return;
        }
        const taskActions = (0, _getOwner.getOwner)(this).lookup("service:task-actions");
        taskActions.assign(this.topic, {
          targetType: "Topic",
          isAssigned: this.topic.isAssigned()
        }).set("model.onSuccess", () => {
          this.appEvents.trigger("post-stream:refresh", {
            id: this.topic.postStream.firstPostId
          });
        });
      },
      dropdown() {
        return this.currentUser?.can_assign && this.topic.isAssigned();
      },
      classNames: ["assign"],
      dependentKeys: DEPENDENT_KEYS,
      displayed() {
        // only display the button in the mobile view
        return this.currentUser?.can_assign && this.site.mobileView;
      }
    });
  }
  function initialize(api) {
    var _dec, _dec2, _obj, _dec3, _obj2;
    const siteSettings = api.container.lookup("site-settings:main");
    const currentUser = api.getCurrentUser();
    if (siteSettings.assigns_public || currentUser?.can_assign) {
      api.addNavigationBarItem({
        name: "unassigned",
        customFilter: category => {
          return category?.custom_fields?.enable_unassigned_filter === "true";
        },
        customHref: category => {
          if (category) {
            return (0, _getUrl.default)(category.url) + "/l/latest?status=open&assigned=nobody";
          }
        },
        forceActive: (category, args) => {
          const queryParams = args.currentRouteQueryParams;
          return queryParams && Object.keys(queryParams).length === 2 && queryParams["assigned"] === "nobody" && queryParams["status"] === "open";
        },
        before: "top"
      });
      if (api.getCurrentUser() && api.getCurrentUser().can_assign) {
        api.addPostMenuButton("assign", post => {
          if (post.firstPost) {
            return;
          }
          if (post.assigned_to_user || post.assigned_to_group) {
            return {
              action: "unassignPost",
              icon: "user-times",
              className: "unassign-post",
              title: "discourse_assign.unassign_post.title",
              position: post.assigned_to_user?.id === api.getCurrentUser().id ? "first" : "second-last-hidden"
            };
          } else {
            return {
              action: "assignPost",
              icon: "user-plus",
              className: "assign-post",
              title: "discourse_assign.assign_post.title",
              position: "second-last-hidden"
            };
          }
        });
        api.attachWidgetAction("post", "assignPost", function () {
          const taskActions = (0, _getOwner.getOwner)(this).lookup("service:task-actions");
          taskActions.assign(this.model, {
            isAssigned: false,
            targetType: "Post"
          });
        });
        api.attachWidgetAction("post", "unassignPost", function () {
          const taskActions = (0, _getOwner.getOwner)(this).lookup("service:task-actions");
          taskActions.unassign(this.model.id, "Post").then(() => {
            delete this.model.topic.indirectly_assigned_to[this.model.id];
          });
        });
      }
    }
    api.addPostSmallActionClassesCallback(post => {
      if (post.actionCode.includes("assigned") && !siteSettings.assigns_public) {
        return ["private-assign"];
      }
    });
    api.addAdvancedSearchOptions(api.getCurrentUser() && api.getCurrentUser().can_assign ? {
      inOptionsForUsers: [{
        name: _I18n.default.t("search.advanced.in.assigned"),
        value: "assigned"
      }, {
        name: _I18n.default.t("search.advanced.in.unassigned"),
        value: "unassigned"
      }]
    } : {});
    function assignedToUserPath(assignedToUser) {
      return (0, _getUrl.default)(siteSettings.assigns_user_url_path.replace("{username}", assignedToUser.username));
    }
    function assignedToGroupPath(assignedToGroup) {
      return (0, _getUrl.default)(`/g/${assignedToGroup.name}/assigned/everyone`);
    }
    api.modifyClass("model:bookmark", (_dec = (0, _decorators.default)("assigned_to_user"), _dec2 = (0, _decorators.default)("assigned_to_group"), (_obj = {
      pluginId: PLUGIN_ID,
      assignedToUserPath(assignedToUser) {
        return assignedToUserPath(assignedToUser);
      },
      assignedToGroupPath(assignedToGroup) {
        return assignedToGroupPath(assignedToGroup);
      }
    }, (_applyDecoratedDescriptor(_obj, "assignedToUserPath", [_dec], Object.getOwnPropertyDescriptor(_obj, "assignedToUserPath"), _obj), _applyDecoratedDescriptor(_obj, "assignedToGroupPath", [_dec2], Object.getOwnPropertyDescriptor(_obj, "assignedToGroupPath"), _obj)), _obj)));
    api.modifyClass("component:topic-notifications-button", (_dec3 = (0, _decorators.default)("topic", "topic.details.{notification_level,notifications_reason_id}"), (_obj2 = {
      pluginId: PLUGIN_ID,
      notificationReasonText(topic) {
        if (this.currentUser.never_auto_track_topics && topic.assigned_to_user && topic.assigned_to_user.username === this.currentUser.username) {
          return _I18n.default.t("notification_reason.user");
        }
        return this._super(...arguments);
      }
    }, (_applyDecoratedDescriptor(_obj2, "notificationReasonText", [_dec3], Object.getOwnPropertyDescriptor(_obj2, "notificationReasonText"), _obj2)), _obj2)));
    api.addPostSmallActionIcon("assigned", "user-plus");
    api.addPostSmallActionIcon("assigned_to_post", "user-plus");
    api.addPostSmallActionIcon("assigned_group", "group-plus");
    api.addPostSmallActionIcon("assigned_group_to_post", "group-plus");
    api.addPostSmallActionIcon("unassigned", "user-times");
    api.addPostSmallActionIcon("unassigned_group", "group-times");
    api.addPostSmallActionIcon("unassigned_from_post", "user-times");
    api.addPostSmallActionIcon("unassigned_group_from_post", "group-times");
    api.includePostAttributes("assigned_to_user", "assigned_to_group");
    api.addPostSmallActionIcon("reassigned", "user-plus");
    api.addPostSmallActionIcon("reassigned_group", "group-plus");
    api.addPostTransformCallback(transformed => {
      if (["assigned", "unassigned", "reassigned", "assigned_group", "unassigned_group", "reassigned_group", "assigned_to_post", "assigned_group_to_post", "unassigned_from_post", "unassigned_group_from_post", "details_change", "note_change", "status_change"].includes(transformed.actionCode)) {
        transformed.isSmallAction = true;
        transformed.canEdit = true;
      }
    });
    api.addDiscoveryQueryParam("assigned", {
      replace: true,
      refreshModel: true
    });
    api.addTagsHtmlCallback(function (topic) {
      let params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const [assignedToUser, assignedToGroup, topicNote] = Object.values(topic.getProperties("assigned_to_user", "assigned_to_group", "assignment_note", "assignment_status"));
      const topicAssignee = {
        assignee: assignedToUser || assignedToGroup,
        note: topicNote
      };
      let assignedToIndirectly;
      if (topic.get("indirectly_assigned_to")) {
        assignedToIndirectly = Object.entries(topic.get("indirectly_assigned_to")).map(_ref => {
          let [key, value] = _ref;
          value.assigned_to.assignedToPostId = key;
          return value;
        });
      } else {
        assignedToIndirectly = [];
      }
      const assignedTo = [].concat(topicAssignee, assignedToIndirectly.map(assigned => ({
        assignee: assigned.assigned_to,
        status: assigned.assignment_status,
        note: assigned.assignment_note
      }))).filter(_ref2 => {
        let {
          assignee
        } = _ref2;
        return assignee;
      }).flat();
      if (assignedTo) {
        return assignedTo.map(_ref3 => {
          let {
            assignee,
            note
          } = _ref3;
          let assignedPath;
          if (assignee.assignedToPostId) {
            assignedPath = `/p/${assignee.assignedToPostId}`;
          } else {
            assignedPath = `/t/${topic.id}`;
          }
          const icon = (0, _iconLibrary.iconHTML)(assignee.assign_icon);
          const name = assignee.username || assignee.name;
          const tagName = params.tagName || "a";
          const href = tagName === "a" ? `href="${(0, _getUrl.default)(assignedPath)}" data-auto-route="true"` : "";
          return `<${tagName} class="assigned-to discourse-tag simple" ${href}>${icon}<span title="${(0, _utilities.escapeExpression)(note)}">${name}</span></${tagName}>`;
        }).join("");
      }
    });
    api.addUserMenuGlyph(widget => {
      if (widget.currentUser && widget.currentUser.can_assign) {
        const glyph = {
          label: "discourse_assign.assigned",
          className: "assigned",
          icon: "user-plus",
          href: `${widget.currentUser.path}/activity/assigned`
        };
        if ((0, _widget.queryRegistry)("quick-access-panel")) {
          glyph["action"] = "quickAccess";
          glyph["actionParam"] = "assignments";
        }
        return glyph;
      }
    });
    api.createWidget("assigned-to", {
      html(attrs) {
        let {
          assignedToUser,
          assignedToGroup,
          href
        } = attrs;
        return (0, _virtualDom.h)("p.assigned-to", [assignedToUser ? (0, _iconLibrary.iconNode)("user-plus") : (0, _iconLibrary.iconNode)("group-plus"), (0, _virtualDom.h)("span.assign-text", _I18n.default.t("discourse_assign.assigned_to")), (0, _virtualDom.h)("a", {
          attributes: {
            class: "assigned-to-username",
            href
          }
        }, assignedToUser ? assignedToUser.username : assignedToGroup.name)]);
      }
    });
    api.createWidget("assigned-to-first-post", {
      html(attrs) {
        const topic = attrs.topic;
        const [assignedToUser, assignedToGroup, indirectlyAssignedTo] = [topic.assigned_to_user, topic.assigned_to_group, topic.indirectly_assigned_to];
        const assigneeElements = [];
        const assignedHtml = (username, path, type) => {
          return `<span class="assigned-to--${type}">${(0, _template.htmlSafe)(_I18n.default.t("discourse_assign.assigned_topic_to", {
            username,
            path
          }))}</span>`;
        };
        if (assignedToUser) {
          assigneeElements.push((0, _virtualDom.h)("span.assignee", new _rawHtml.default({
            html: assignedHtml(assignedToUser.username, assignedToUserPath(assignedToUser), "user")
          })));
        }
        if (assignedToGroup) {
          assigneeElements.push((0, _virtualDom.h)("span.assignee", new _rawHtml.default({
            html: assignedHtml(assignedToGroup.name, assignedToGroupPath(assignedToGroup), "group")
          })));
        }
        if (indirectlyAssignedTo) {
          Object.keys(indirectlyAssignedTo).map(postId => {
            const assignee = indirectlyAssignedTo[postId].assigned_to;
            const postNumber = indirectlyAssignedTo[postId].post_number;
            assigneeElements.push((0, _virtualDom.h)("span.assignee", [(0, _virtualDom.h)("a", {
              attributes: {
                class: "assigned-indirectly",
                href: `${topic.url}/${postNumber}`
              }
            }, _I18n.default.t("discourse_assign.assign_post_to_multiple", {
              post_number: postNumber,
              username: assignee.username || assignee.name
            }))]));
          });
        }
        if (!(0, _utils.isEmpty)(assigneeElements)) {
          return (0, _virtualDom.h)("p.assigned-to", [assignedToUser ? (0, _iconLibrary.iconNode)("user-plus") : (0, _iconLibrary.iconNode)("group-plus"), assignedToUser || assignedToGroup ? "" : (0, _virtualDom.h)("span.assign-text", _I18n.default.t("discourse_assign.assigned")), assigneeElements]);
        }
      }
    });
    api.modifyClass("model:group", {
      pluginId: PLUGIN_ID,
      asJSON() {
        return Object.assign({}, this._super(...arguments), {
          assignable_level: this.assignable_level
        });
      }
    });
    api.modifyClass("controller:topic", {
      pluginId: PLUGIN_ID,
      subscribe() {
        this._super(...arguments);
        this.messageBus.subscribe("/staff/topic-assignment", data => {
          const topic = this.model;
          const topicId = topic.id;
          if (data.topic_id === topicId) {
            let post;
            if (data.post_id) {
              post = topic.postStream.posts.find(p => p.id === data.post_id);
            }
            const target = post || topic;
            target.set("assignment_note", data.assignment_note);
            target.set("assignment_status", data.assignment_status);
            if (data.assigned_type === "User") {
              target.set("assigned_to_user_id", data.type === "assigned" ? data.assigned_to.id : null);
              target.set("assigned_to_user", data.assigned_to);
            }
            if (data.assigned_type === "Group") {
              target.set("assigned_to_group_id", data.type === "assigned" ? data.assigned_to.id : null);
              target.set("assigned_to_group", data.assigned_to);
            }
            if (data.post_id) {
              if (data.type === "unassigned") {
                delete topic.indirectly_assigned_to[data.post_number];
              }
              this.appEvents.trigger("post-stream:refresh", {
                id: topic.postStream.posts[0].id
              });
              this.appEvents.trigger("post-stream:refresh", {
                id: data.post_id
              });
            }
            if (topic.closed) {
              this.appEvents.trigger("post-stream:refresh", {
                id: topic.postStream.posts[0].id
              });
            }
          }
          this.appEvents.trigger("header:update-topic", topic);
        });
      },
      unsubscribe() {
        this._super(...arguments);
        if (!this.get("model.id")) {
          return;
        }
        this.messageBus.unsubscribe("/staff/topic-assignment");
      }
    });
    api.decorateWidget("post-contents:after-cooked", dec => {
      const postModel = dec.getModel();
      if (postModel) {
        let assignedToUser, assignedToGroup, postAssignment, href;
        if (dec.attrs.post_number === 1) {
          return dec.widget.attach("assigned-to-first-post", {
            topic: postModel.topic
          });
        } else {
          postAssignment = postModel.topic.indirectly_assigned_to?.[postModel.id]?.assigned_to;
          if (postAssignment?.username) {
            assignedToUser = postAssignment;
          }
          if (postAssignment?.name) {
            assignedToGroup = postAssignment;
          }
        }
        if (assignedToUser || assignedToGroup) {
          href = assignedToUser ? assignedToUserPath(assignedToUser) : assignedToGroupPath(assignedToGroup);
        }
        if (href) {
          return dec.widget.attach("assigned-to", {
            assignedToUser,
            assignedToGroup,
            href
          });
        }
      }
    });
    api.replaceIcon("notification.assigned", "user-plus");
    api.replaceIcon("notification.discourse_assign.assign_group_notification", "group-plus");
    api.modifyClass("controller:preferences/notifications", {
      pluginId: PLUGIN_ID,
      actions: {
        save() {
          this.saveAttrNames.push("custom_fields");
          this._super(...arguments);
        }
      }
    });
    api.addKeyboardShortcut("g a", "", {
      path: "/my/activity/assigned"
    });
  }
  const REGEXP_USERNAME_PREFIX = /^(assigned:)/gi;
  var _default = {
    name: "extend-for-assign",
    initialize(container) {
      const siteSettings = container.lookup("site-settings:main");
      if (!siteSettings.assign_enabled) {
        return;
      }
      const currentUser = container.lookup("current-user:main");
      if (currentUser?.can_assign) {
        _searchAdvancedOptions.default.reopen({
          updateSearchTermForAssignedUsername() {
            const match = this.filterBlocks(REGEXP_USERNAME_PREFIX);
            const userFilter = this.get("searchedTerms.assigned");
            let searchTerm = this.searchTerm || "";
            let keyword = "assigned";
            if (userFilter?.length !== 0) {
              if (match.length !== 0) {
                searchTerm = searchTerm.replace(match[0], `${keyword}:${userFilter}`);
              } else {
                searchTerm += ` ${keyword}:${userFilter}`;
              }
              this._updateSearchTerm(searchTerm);
            } else if (match.length !== 0) {
              searchTerm = searchTerm.replace(match[0], "");
              this._updateSearchTerm(searchTerm);
            }
          }
        });
        _topicBulkActions.default.reopen({
          assignUser: (0, _controller.inject)("assign-user"),
          actions: {
            showReAssign() {
              this.set("assignUser.isBulkAction", true);
              this.set("assignUser.model", {
                username: ""
              });
              this.send("changeBulkTemplate", "modal/assign-user");
            },
            unassignTopics() {
              this.performAndRefresh({
                type: "unassign"
              });
            }
          }
        });
        (0, _topicBulkActions.addBulkButton)("showReAssign", "assign", {
          icon: "user-plus",
          class: "btn-default"
        });
        (0, _topicBulkActions.addBulkButton)("unassignTopics", "unassign", {
          icon: "user-times",
          class: "btn-default"
        });
      }
      (0, _pluginApi.withPluginApi)("0.13.0", api => includeIsAssignedOnTopic(api));
      (0, _pluginApi.withPluginApi)("0.11.0", api => initialize(api));
      (0, _pluginApi.withPluginApi)("0.8.28", api => registerTopicFooterButtons(api));
      (0, _pluginApi.withPluginApi)("0.11.7", api => {
        api.addSearchSuggestion("in:assigned");
        api.addSearchSuggestion("in:unassigned");
      });
      (0, _pluginApi.withPluginApi)("0.12.2", api => {
        api.addGroupPostSmallActionCode("assigned_group");
        api.addGroupPostSmallActionCode("unassigned_group");
        api.addGroupPostSmallActionCode("assigned_group_to_post");
        api.addGroupPostSmallActionCode("unassigned_group_from_post");
      });
      (0, _pluginApi.withPluginApi)("0.12.3", api => {
        api.addUserSearchOption("assignableGroups");
      });
    }
  };
  _exports.default = _default;
});
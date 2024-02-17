define("discourse/controllers/tags-index", ["exports", "@ember/object", "@ember/object/computed", "@ember/controller", "I18n", "discourse/lib/ajax", "discourse-common/utils/decorators", "discourse/lib/ajax-error", "discourse/lib/show-modal", "@ember/service"], function (_exports, _object, _computed, _controller, _I18n, _ajax, _decorators, _ajaxError, _showModal, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"@ember/object/computed",0,"@ember/controller",0,"I18n",0,"discourse/lib/ajax",0,"discourse-common/utils/decorators",0,"discourse/lib/ajax-error",0,"discourse/lib/show-modal",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _controller.default.extend((_dec = (0, _decorators.default)("groupedByCategory", "groupedByTagGroup"), (_obj = {
    dialog: (0, _service.inject)(),
    sortedByCount: true,
    sortedByName: false,
    canAdminTags: (0, _computed.alias)("currentUser.staff"),
    groupedByCategory: (0, _computed.notEmpty)("model.extras.categories"),
    groupedByTagGroup: (0, _computed.notEmpty)("model.extras.tag_groups"),
    init() {
      this._super(...arguments);
      this.sortProperties = ["totalCount:desc", "id"];
    },
    otherTagsTitleKey(groupedByCategory, groupedByTagGroup) {
      if (!groupedByCategory && !groupedByTagGroup) {
        return "tagging.all_tags";
      } else {
        return "tagging.other_tags";
      }
    },
    actionsMapping() {
      return {
        manageGroups: () => this.send("showTagGroups"),
        uploadTags: () => this.send("showUploader"),
        deleteUnusedTags: () => this.send("deleteUnused")
      };
    },
    sortByCount(event) {
      event?.preventDefault();
      this.setProperties({
        sortProperties: ["totalCount:desc", "id"],
        sortedByCount: true,
        sortedByName: false
      });
    },
    sortById(event) {
      event?.preventDefault();
      this.setProperties({
        sortProperties: ["id"],
        sortedByCount: false,
        sortedByName: true
      });
    },
    actions: {
      showUploader() {
        (0, _showModal.default)("tag-upload");
      },
      deleteUnused() {
        (0, _ajax.ajax)("/tags/unused", {
          type: "GET"
        }).then(result => {
          const displayN = 20;
          const tags = result["tags"];
          if (tags.length === 0) {
            this.dialog.alert(_I18n.default.t("tagging.delete_no_unused_tags"));
            return;
          }
          const joinedTags = tags.slice(0, displayN).join(_I18n.default.t("tagging.tag_list_joiner"));
          const more = Math.max(0, tags.length - displayN);
          const tagsString = more === 0 ? joinedTags : _I18n.default.t("tagging.delete_unused_confirmation_more_tags", {
            count: more,
            tags: joinedTags
          });
          const message = _I18n.default.t("tagging.delete_unused_confirmation", {
            count: tags.length,
            tags: tagsString
          });
          this.dialog.deleteConfirm({
            message,
            confirmButtonLabel: "tagging.delete_unused",
            didConfirm: () => {
              return (0, _ajax.ajax)("/tags/unused", {
                type: "DELETE"
              }).then(() => this.send("triggerRefresh")).catch(_ajaxError.popupAjaxError);
            }
          });
        }).catch(_ajaxError.popupAjaxError);
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "otherTagsTitleKey", [_dec], Object.getOwnPropertyDescriptor(_obj, "otherTagsTitleKey"), _obj), _applyDecoratedDescriptor(_obj, "actionsMapping", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "actionsMapping"), _obj), _applyDecoratedDescriptor(_obj, "sortByCount", [_object.action], Object.getOwnPropertyDescriptor(_obj, "sortByCount"), _obj), _applyDecoratedDescriptor(_obj, "sortById", [_object.action], Object.getOwnPropertyDescriptor(_obj, "sortById"), _obj)), _obj)));
  _exports.default = _default;
});
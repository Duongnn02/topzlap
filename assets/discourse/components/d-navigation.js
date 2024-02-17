define("discourse/components/d-navigation", ["exports", "@ember/component", "@ember/template-factory", "discourse/mixins/filter-mode", "discourse/models/nav-item", "discourse-common/utils/decorators", "discourse/lib/notification-levels", "discourse-common/lib/get-owner", "@ember/template", "@ember/service"], function (_exports, _component, _templateFactory, _filterMode, _navItem, _decorators, _notificationLevels, _getOwner, _template, _service) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _obj, _init;
  0; //eaimeta@70e063a35619d71f0,"ember-cli-htmlbars",0,"@ember/component",0,"discourse/mixins/filter-mode",0,"discourse/models/nav-item",0,"discourse-common/utils/decorators",0,"discourse/lib/notification-levels",0,"discourse-common/lib/get-owner",0,"@ember/template",0,"@ember/service"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const __COLOCATED_TEMPLATE__ = (0, _templateFactory.createTemplateFactory)(
  /*
    <BreadCrumbs
    @categories={{this.categories}}
    @category={{this.category}}
    @noSubcategories={{this.noSubcategories}}
    @tag={{this.tag}}
    @additionalTags={{this.additionalTags}}
  />
  
  {{#unless this.additionalTags}}
    {{! nav bar doesn't work with tag intersections }}
    <NavigationBar
      @navItems={{this.navItems}}
      @filterMode={{this.filterMode}}
      @category={{this.category}}
    />
  {{/unless}}
  
  <div class="navigation-controls">
    {{#if (and this.notCategoriesRoute this.site.mobileView this.canBulk)}}
      <BulkSelectToggle @parentController={{"discovery/topics"}} @tagName="" />
    {{/if}}
  
    {{#if this.showCategoryAdmin}}
      <CategoriesAdminDropdown
        @onChange={{action "selectCategoryAdminDropdownAction"}}
        @options={{hash triggerOnChangeOnTab=false}}
      />
    {{/if}}
  
    {{#if (and this.category this.showCategoryEdit)}}
      <DButton
        @class="btn-default edit-category"
        @action={{this.editCategory}}
        @icon="wrench"
        @title="category.edit_title"
      />
    {{/if}}
  
    {{#if this.tag}}
      {{#if this.showToggleInfo}}
        <DButton
          @icon={{if this.currentUser.staff "wrench" "info-circle"}}
          @class="btn-default"
          @ariaLabel="tagging.info"
          @action={{this.toggleInfo}}
          @id="show-tag-info"
        />
      {{/if}}
    {{/if}}
  
    <PluginOutlet
      @name="before-create-topic-button"
      @connectorTagName="div"
      @outletArgs={{hash
        canCreateTopic=this.canCreateTopic
        createTopicDisabled=this.createTopicDisabled
        createTopicLabel=this.createTopicLabel
        additionalTags=this.additionalTags
        category=this.category
        tag=this.tag
      }}
    />
  
    <CreateTopicButton
      @canCreateTopic={{this.canCreateTopic}}
      @action={{action "clickCreateTopicButton"}}
      @disabled={{this.createTopicButtonDisabled}}
      @label={{this.createTopicLabel}}
      @btnClass={{this.createTopicClass}}
      @canCreateTopicOnTag={{this.canCreateTopicOnTag}}
    >
      {{#if this.createTopicButtonDisabled}}
        <DTooltip>{{i18n "topic.create_disabled_category"}}</DTooltip>
      {{/if}}
    </CreateTopicButton>
  
    <PluginOutlet
      @name="after-create-topic-button"
      @connectorTagName="div"
      @outletArgs={{hash
        canCreateTopic=this.canCreateTopic
        createTopicDisabled=this.createTopicDisabled
        createTopicLabel=this.createTopicLabel
        category=this.category
      }}
    />
  
    {{#if this.category}}
      {{#unless this.tag}}
        {{! don't show category notification menu on tag pages }}
        {{#if this.showCategoryNotifications}}
          <CategoryNotificationsButton
            @value={{this.categoryNotificationLevel}}
            @category={{this.category}}
            @onChange={{action "changeCategoryNotificationLevel"}}
          />
        {{/if}}
      {{/unless}}
    {{/if}}
  
    {{#if this.tag}}
      {{#unless this.category}}
        {{! don't show tag notification menu on category pages }}
        {{#if this.showTagNotifications}}
          <TagNotificationsButton
            @onChange={{this.changeTagNotificationLevel}}
            @value={{this.tagNotification.notification_level}}
          />
        {{/if}}
      {{/unless}}
    {{/if}}
  
  </div>
  */
  {
    "id": "q41M6g7l",
    "block": "[[[8,[39,0],null,[[\"@categories\",\"@category\",\"@noSubcategories\",\"@tag\",\"@additionalTags\"],[[30,0,[\"categories\"]],[30,0,[\"category\"]],[30,0,[\"noSubcategories\"]],[30,0,[\"tag\"]],[30,0,[\"additionalTags\"]]]],null],[1,\"\\n\\n\"],[41,[51,[30,0,[\"additionalTags\"]]],[[[1,\"  \"],[8,[39,2],null,[[\"@navItems\",\"@filterMode\",\"@category\"],[[30,0,[\"navItems\"]],[30,0,[\"filterMode\"]],[30,0,[\"category\"]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[10,0],[14,0,\"navigation-controls\"],[12],[1,\"\\n\"],[41,[28,[37,4],[[30,0,[\"notCategoriesRoute\"]],[30,0,[\"site\",\"mobileView\"]],[30,0,[\"canBulk\"]]],null],[[[1,\"    \"],[8,[39,5],null,[[\"@parentController\",\"@tagName\"],[\"discovery/topics\",\"\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"showCategoryAdmin\"]],[[[1,\"    \"],[8,[39,6],null,[[\"@onChange\",\"@options\"],[[28,[37,7],[[30,0],\"selectCategoryAdminDropdownAction\"],null],[28,[37,8],null,[[\"triggerOnChangeOnTab\"],[false]]]]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[28,[37,4],[[30,0,[\"category\"]],[30,0,[\"showCategoryEdit\"]]],null],[[[1,\"    \"],[8,[39,9],null,[[\"@class\",\"@action\",\"@icon\",\"@title\"],[\"btn-default edit-category\",[30,0,[\"editCategory\"]],\"wrench\",\"category.edit_title\"]],null],[1,\"\\n\"]],[]],null],[1,\"\\n\"],[41,[30,0,[\"tag\"]],[[[41,[30,0,[\"showToggleInfo\"]],[[[1,\"      \"],[8,[39,9],null,[[\"@icon\",\"@class\",\"@ariaLabel\",\"@action\",\"@id\"],[[52,[30,0,[\"currentUser\",\"staff\"]],\"wrench\",\"info-circle\"],\"btn-default\",\"tagging.info\",[30,0,[\"toggleInfo\"]],\"show-tag-info\"]],null],[1,\"\\n\"]],[]],null]],[]],null],[1,\"\\n  \"],[8,[39,10],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"before-create-topic-button\",\"div\",[28,[37,8],null,[[\"canCreateTopic\",\"createTopicDisabled\",\"createTopicLabel\",\"additionalTags\",\"category\",\"tag\"],[[30,0,[\"canCreateTopic\"]],[30,0,[\"createTopicDisabled\"]],[30,0,[\"createTopicLabel\"]],[30,0,[\"additionalTags\"]],[30,0,[\"category\"]],[30,0,[\"tag\"]]]]]]],null],[1,\"\\n\\n  \"],[8,[39,11],null,[[\"@canCreateTopic\",\"@action\",\"@disabled\",\"@label\",\"@btnClass\",\"@canCreateTopicOnTag\"],[[30,0,[\"canCreateTopic\"]],[28,[37,7],[[30,0],\"clickCreateTopicButton\"],null],[30,0,[\"createTopicButtonDisabled\"]],[30,0,[\"createTopicLabel\"]],[30,0,[\"createTopicClass\"]],[30,0,[\"canCreateTopicOnTag\"]]]],[[\"default\"],[[[[1,\"\\n\"],[41,[30,0,[\"createTopicButtonDisabled\"]],[[[1,\"      \"],[8,[39,12],null,null,[[\"default\"],[[[[1,[28,[35,13],[\"topic.create_disabled_category\"],null]]],[]]]]],[1,\"\\n\"]],[]],null],[1,\"  \"]],[]]]]],[1,\"\\n\\n  \"],[8,[39,10],null,[[\"@name\",\"@connectorTagName\",\"@outletArgs\"],[\"after-create-topic-button\",\"div\",[28,[37,8],null,[[\"canCreateTopic\",\"createTopicDisabled\",\"createTopicLabel\",\"category\"],[[30,0,[\"canCreateTopic\"]],[30,0,[\"createTopicDisabled\"]],[30,0,[\"createTopicLabel\"]],[30,0,[\"category\"]]]]]]],null],[1,\"\\n\\n\"],[41,[30,0,[\"category\"]],[[[41,[51,[30,0,[\"tag\"]]],[[[41,[30,0,[\"showCategoryNotifications\"]],[[[1,\"        \"],[8,[39,14],null,[[\"@value\",\"@category\",\"@onChange\"],[[30,0,[\"categoryNotificationLevel\"]],[30,0,[\"category\"]],[28,[37,7],[[30,0],\"changeCategoryNotificationLevel\"],null]]],null],[1,\"\\n\"]],[]],null]],[]],null]],[]],null],[1,\"\\n\"],[41,[30,0,[\"tag\"]],[[[41,[51,[30,0,[\"category\"]]],[[[41,[30,0,[\"showTagNotifications\"]],[[[1,\"        \"],[8,[39,15],null,[[\"@onChange\",\"@value\"],[[30,0,[\"changeTagNotificationLevel\"]],[30,0,[\"tagNotification\",\"notification_level\"]]]],null],[1,\"\\n\"]],[]],null]],[]],null]],[]],null],[1,\"\\n\"],[13]],[],false,[\"bread-crumbs\",\"unless\",\"navigation-bar\",\"if\",\"and\",\"bulk-select-toggle\",\"categories-admin-dropdown\",\"action\",\"hash\",\"d-button\",\"plugin-outlet\",\"create-topic-button\",\"d-tooltip\",\"i18n\",\"category-notifications-button\",\"tag-notifications-button\"]]",
    "moduleName": "discourse/components/d-navigation.hbs",
    "isStrictMode": false
  });
  var _default = (0, _component.setComponentTemplate)(__COLOCATED_TEMPLATE__, _component.default.extend(_filterMode.default, (_dec = (0, _decorators.default)("site.categoriesList"), _dec2 = (0, _decorators.default)("category"), _dec3 = (0, _decorators.default)("category.notification_level"), _dec4 = (0, _decorators.default)("tagNotification", "additionalTags"), _dec5 = (0, _decorators.default)("category", "createTopicDisabled"), _dec6 = (0, _decorators.default)("createTopicDisabled", "hasDraft", "categoryReadOnlyBanner", "canCreateTopicOnTag", "tag.id"), _dec7 = (0, _decorators.default)("categoryReadOnlyBanner", "hasDraft"), _dec8 = (0, _decorators.default)("hasDraft"), _dec9 = (0, _decorators.default)("category.can_edit"), _dec10 = (0, _decorators.default)("additionalTags", "category", "tag.id"), _dec11 = (0, _decorators.default)("filterType", "category", "noSubcategories", "tag.id", "router.currentRoute.queryParams", "skipCategoriesNavItem"), _dec12 = (0, _decorators.default)("filterType"), _dec13 = (0, _decorators.default)(), (_obj = {
    router: (0, _service.inject)(),
    dialog: (0, _service.inject)(),
    tagName: "",
    categories(categoriesList) {
      if (this.currentUser?.indirectly_muted_category_ids) {
        return categoriesList.filter(category => !this.currentUser.indirectly_muted_category_ids.includes(category.id));
      } else {
        return categoriesList;
      }
    },
    showCategoryNotifications(category) {
      return category && this.currentUser;
    },
    categoryNotificationLevel(notificationLevel) {
      if (this.currentUser?.indirectly_muted_category_ids?.includes(this.category.id)) {
        return _notificationLevels.NotificationLevels.MUTED;
      } else {
        return notificationLevel;
      }
    },
    showTagNotifications(tagNotification, additionalTags) {
      return tagNotification && !additionalTags;
    },
    categoryReadOnlyBanner(category, createTopicDisabled) {
      if (category && this.currentUser && createTopicDisabled) {
        return category.read_only_banner;
      }
    },
    createTopicButtonDisabled(createTopicDisabled, hasDraft, categoryReadOnlyBanner, canCreateTopicOnTag, tagId) {
      if (tagId && !canCreateTopicOnTag) {
        return true;
      } else if (categoryReadOnlyBanner && !hasDraft) {
        return false;
      }
      return createTopicDisabled;
    },
    createTopicClass(categoryReadOnlyBanner, hasDraft) {
      let classNames = ["btn-default"];
      if (hasDraft) {
        classNames.push("open-draft");
      } else if (categoryReadOnlyBanner) {
        classNames.push("disabled");
      }
      return classNames.join(" ");
    },
    createTopicLabel(hasDraft) {
      return hasDraft ? "topic.open_draft" : "topic.create";
    },
    showCategoryEdit: canEdit => canEdit,
    showToggleInfo(additionalTags, category, tagId) {
      return !additionalTags && !category && tagId !== "none";
    },
    navItems(filterType, category, noSubcategories, tagId, currentRouteQueryParams, skipCategoriesNavItem) {
      return _navItem.default.buildList(category, {
        filterType,
        noSubcategories,
        currentRouteQueryParams,
        tagId,
        siteSettings: this.siteSettings,
        skipCategoriesNavItem
      });
    },
    notCategoriesRoute(filterType) {
      return filterType !== "categories";
    },
    canBulk() {
      const controller = (0, _getOwner.getOwner)(this).lookup("controller:discovery/topics");
      return controller.canBulkSelect;
    },
    actions: {
      changeCategoryNotificationLevel(notificationLevel) {
        this.category.setNotification(notificationLevel);
      },
      selectCategoryAdminDropdownAction(actionId) {
        switch (actionId) {
          case "create":
            this.createCategory();
            break;
          case "reorder":
            this.reorderCategories();
            break;
        }
      },
      clickCreateTopicButton() {
        if (this.categoryReadOnlyBanner && !this.hasDraft) {
          this.dialog.alert({
            message: (0, _template.htmlSafe)(this.categoryReadOnlyBanner)
          });
        } else {
          this.createTopic();
        }
      }
    }
  }, (_applyDecoratedDescriptor(_obj, "categories", [_dec], Object.getOwnPropertyDescriptor(_obj, "categories"), _obj), _applyDecoratedDescriptor(_obj, "showCategoryNotifications", [_dec2], Object.getOwnPropertyDescriptor(_obj, "showCategoryNotifications"), _obj), _applyDecoratedDescriptor(_obj, "categoryNotificationLevel", [_dec3], Object.getOwnPropertyDescriptor(_obj, "categoryNotificationLevel"), _obj), _applyDecoratedDescriptor(_obj, "showTagNotifications", [_dec4], Object.getOwnPropertyDescriptor(_obj, "showTagNotifications"), _obj), _applyDecoratedDescriptor(_obj, "categoryReadOnlyBanner", [_dec5], Object.getOwnPropertyDescriptor(_obj, "categoryReadOnlyBanner"), _obj), _applyDecoratedDescriptor(_obj, "createTopicButtonDisabled", [_dec6], Object.getOwnPropertyDescriptor(_obj, "createTopicButtonDisabled"), _obj), _applyDecoratedDescriptor(_obj, "createTopicClass", [_dec7], Object.getOwnPropertyDescriptor(_obj, "createTopicClass"), _obj), _applyDecoratedDescriptor(_obj, "createTopicLabel", [_dec8], Object.getOwnPropertyDescriptor(_obj, "createTopicLabel"), _obj), _applyDecoratedDescriptor(_obj, "showCategoryEdit", [_dec9], (_init = Object.getOwnPropertyDescriptor(_obj, "showCategoryEdit"), _init = _init ? _init.value : undefined, {
    enumerable: true,
    configurable: true,
    writable: true,
    initializer: function () {
      return _init;
    }
  }), _obj), _applyDecoratedDescriptor(_obj, "showToggleInfo", [_dec10], Object.getOwnPropertyDescriptor(_obj, "showToggleInfo"), _obj), _applyDecoratedDescriptor(_obj, "navItems", [_dec11], Object.getOwnPropertyDescriptor(_obj, "navItems"), _obj), _applyDecoratedDescriptor(_obj, "notCategoriesRoute", [_dec12], Object.getOwnPropertyDescriptor(_obj, "notCategoriesRoute"), _obj), _applyDecoratedDescriptor(_obj, "canBulk", [_dec13], Object.getOwnPropertyDescriptor(_obj, "canBulk"), _obj)), _obj))));
  _exports.default = _default;
});
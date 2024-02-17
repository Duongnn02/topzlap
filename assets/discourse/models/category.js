define("discourse/models/category", ["exports", "discourse-common/utils/decorators", "discourse/lib/notification-levels", "discourse/models/permission-type", "discourse/models/rest", "discourse/models/site", "discourse/models/user", "discourse/lib/ajax", "@ember/object", "discourse-common/lib/get-owner", "discourse-common/lib/get-url"], function (_exports, _decorators, _notificationLevels, _permissionType, _rest, _site, _user, _ajax, _object, _getOwner, _getUrl) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _dec21, _dec22, _dec23, _dec24, _dec25, _dec26, _obj;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/utils/decorators",0,"discourse/lib/notification-levels",0,"discourse/models/permission-type",0,"discourse/models/rest",0,"discourse/models/site",0,"discourse/models/user",0,"discourse/lib/ajax",0,"@ember/object",0,"discourse-common/lib/get-owner",0,"discourse-common/lib/get-url"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const STAFF_GROUP_NAME = "staff";
  const Category = _rest.default.extend((_dec = (0, _decorators.on)("init"), _dec2 = (0, _decorators.default)("required_tag_groups", "minimum_required_tags"), _dec3 = (0, _decorators.default)("id"), _dec4 = (0, _decorators.default)("parentCategory.ancestors"), _dec5 = (0, _decorators.default)("parentCategory.level"), _dec6 = (0, _decorators.default)("subcategories"), _dec7 = (0, _decorators.default)("subcategories"), _dec8 = (0, _decorators.default)("notification_level"), _dec9 = (0, _decorators.default)("isMuted", "subcategories"), _dec10 = (0, _decorators.default)("isMuted", "subcategories"), _dec11 = (0, _decorators.default)("notification_level"), _dec12 = (0, _decorators.default)("name"), _dec13 = (0, _decorators.default)("path"), _dec14 = (0, _decorators.default)("name"), _dec15 = (0, _decorators.default)("url"), _dec16 = (0, _decorators.default)("url"), _dec17 = (0, _decorators.default)("color", "text_color"), _dec18 = (0, _decorators.default)("topic_count"), _dec19 = (0, _decorators.default)("topic_count", "subcategories.[]"), _dec20 = (0, _decorators.default)("default_slow_mode_seconds"), _dec21 = (0, _decorators.default)("notification_level"), _dec22 = (0, _decorators.default)("topics"), _dec23 = (0, _decorators.default)("topics"), _dec24 = (0, _decorators.default)("id", "topicTrackingState.messageCount"), _dec25 = (0, _decorators.default)("id", "topicTrackingState.messageCount"), _dec26 = (0, _decorators.default)("id"), (_obj = {
    permissions: null,
    setupGroupsAndPermissions() {
      const availableGroups = this.available_groups;
      if (!availableGroups) {
        return;
      }
      this.set("availableGroups", availableGroups);
      const groupPermissions = this.group_permissions;
      if (groupPermissions) {
        this.set("permissions", groupPermissions.map(elem => {
          availableGroups.removeObject(elem.group_name);
          return elem;
        }));
      }
    },
    minimumRequiredTags() {
      if (this.required_tag_groups?.length > 0) {
        return this.required_tag_groups.reduce((sum, rtg) => sum + rtg.min_count, 0);
      } else {
        return this.minimum_required_tags > 0 ? this.minimum_required_tags : null;
      }
    },
    availablePermissions() {
      return [_permissionType.default.create({
        id: _permissionType.default.FULL
      }), _permissionType.default.create({
        id: _permissionType.default.CREATE_POST
      }), _permissionType.default.create({
        id: _permissionType.default.READONLY
      })];
    },
    searchContext(id) {
      return {
        type: "category",
        id,
        category: this
      };
    },
    ancestors(parentAncestors) {
      return [...(parentAncestors || []), this];
    },
    level(parentLevel) {
      return (parentLevel || -1) + 1;
    },
    isParent(subcategories) {
      return subcategories && subcategories.length > 0;
    },
    isGrandParent(subcategories) {
      return subcategories && subcategories.some(cat => cat.subcategories && cat.subcategories.length > 0);
    },
    isMuted(notificationLevel) {
      return notificationLevel === _notificationLevels.NotificationLevels.MUTED;
    },
    isHidden(isMuted, subcategories) {
      if (!isMuted) {
        return false;
      } else if (!subcategories) {
        return true;
      }
      if (subcategories.some(cat => !cat.isHidden)) {
        return false;
      }
      return true;
    },
    hasMuted(isMuted, subcategories) {
      if (isMuted) {
        return true;
      } else if (!subcategories) {
        return false;
      }
      if (subcategories.some(cat => cat.hasMuted)) {
        return true;
      }
      return false;
    },
    notificationLevelString(notificationLevel) {
      // Get the key from the value
      const notificationLevelString = Object.keys(_notificationLevels.NotificationLevels).find(key => _notificationLevels.NotificationLevels[key] === notificationLevel);
      if (notificationLevelString) {
        return notificationLevelString.toLowerCase();
      }
    },
    path() {
      return `/c/${Category.slugFor(this)}/${this.id}`;
    },
    url(path) {
      return (0, _getUrl.default)(path);
    },
    fullSlug() {
      return Category.slugFor(this).replace(/\//g, "-");
    },
    nameLower(name) {
      return name.toLowerCase();
    },
    unreadUrl(url) {
      return `${url}/l/unread`;
    },
    newUrl(url) {
      return `${url}/l/new`;
    },
    style(color, textColor) {
      return `background-color: #${color}; color: #${textColor}`;
    },
    moreTopics(topicCount) {
      return topicCount > (this.num_featured_topics || 2);
    },
    totalTopicCount(topicCount, subcategories) {
      if (subcategories) {
        subcategories.forEach(subcategory => {
          topicCount += subcategory.topic_count;
        });
      }
      return topicCount;
    },
    defaultSlowModeMinutes(seconds) {
      return seconds ? seconds / 60 : null;
    },
    isTracked(notificationLevel) {
      return notificationLevel >= _notificationLevels.NotificationLevels.TRACKING;
    },
    save() {
      const id = this.id;
      const url = id ? `/categories/${id}` : "/categories";
      return (0, _ajax.ajax)(url, {
        contentType: "application/json",
        data: JSON.stringify({
          name: this.name,
          slug: this.slug,
          color: this.color,
          text_color: this.text_color,
          secure: this.secure,
          permissions: this._permissionsForUpdate(),
          auto_close_hours: this.auto_close_hours,
          auto_close_based_on_last_post: this.get("auto_close_based_on_last_post"),
          default_slow_mode_seconds: this.default_slow_mode_seconds,
          position: this.position,
          email_in: this.email_in,
          email_in_allow_strangers: this.email_in_allow_strangers,
          mailinglist_mirror: this.mailinglist_mirror,
          parent_category_id: this.parent_category_id,
          uploaded_logo_id: this.get("uploaded_logo.id"),
          uploaded_logo_dark_id: this.get("uploaded_logo_dark.id"),
          uploaded_background_id: this.get("uploaded_background.id"),
          allow_badges: this.allow_badges,
          category_setting_attributes: this.category_setting,
          custom_fields: this.custom_fields,
          topic_template: this.topic_template,
          form_template_ids: this.form_template_ids,
          all_topics_wiki: this.all_topics_wiki,
          allow_unlimited_owner_edits_on_first_post: this.allow_unlimited_owner_edits_on_first_post,
          allowed_tags: this.allowed_tags,
          allowed_tag_groups: this.allowed_tag_groups,
          allow_global_tags: this.allow_global_tags,
          required_tag_groups: this.required_tag_groups,
          sort_order: this.sort_order,
          sort_ascending: this.sort_ascending,
          topic_featured_link_allowed: this.topic_featured_link_allowed,
          show_subcategory_list: this.show_subcategory_list,
          num_featured_topics: this.num_featured_topics,
          default_view: this.default_view,
          subcategory_list_style: this.subcategory_list_style,
          default_top_period: this.default_top_period,
          minimum_required_tags: this.minimum_required_tags,
          navigate_to_first_post_after_read: this.get("navigate_to_first_post_after_read"),
          search_priority: this.search_priority,
          reviewable_by_group_name: this.reviewable_by_group_name,
          read_only_banner: this.read_only_banner,
          default_list_filter: this.default_list_filter
        }),
        type: id ? "PUT" : "POST"
      });
    },
    _permissionsForUpdate() {
      const permissions = this.permissions;
      let rval = {};
      if (permissions.length) {
        permissions.forEach(p => rval[p.group_name] = p.permission_type);
      } else {
        // empty permissions => staff-only access
        rval[STAFF_GROUP_NAME] = _permissionType.default.FULL;
      }
      return rval;
    },
    destroy() {
      return (0, _ajax.ajax)(`/categories/${this.id || this.slug}`, {
        type: "DELETE"
      });
    },
    addPermission(permission) {
      this.permissions.addObject(permission);
      this.availableGroups.removeObject(permission.group_name);
    },
    removePermission(group_name) {
      const permission = this.permissions.findBy("group_name", group_name);
      if (permission) {
        this.permissions.removeObject(permission);
        this.availableGroups.addObject(group_name);
      }
    },
    updatePermission(group_name, type) {
      this.permissions.forEach((p, i) => {
        if (p.group_name === group_name) {
          this.set(`permissions.${i}.permission_type`, type);
        }
      });
    },
    latestTopic(topics) {
      if (topics && topics.length) {
        return topics[0];
      }
    },
    featuredTopics(topics) {
      if (topics && topics.length) {
        return topics.slice(0, this.num_featured_topics || 2);
      }
    },
    unreadTopics(id) {
      return this.topicTrackingState.countUnread({
        categoryId: id
      });
    },
    newTopics(id) {
      return this.topicTrackingState.countNew({
        categoryId: id
      });
    },
    setNotification(notification_level) {
      _user.default.currentProp("muted_category_ids", _user.default.current().calculateMutedIds(notification_level, this.id, "muted_category_ids"));
      const url = `/category/${this.id}/notifications`;
      return (0, _ajax.ajax)(url, {
        data: {
          notification_level
        },
        type: "POST"
      }).then(data => {
        _user.default.current().set("indirectly_muted_category_ids", data.indirectly_muted_category_ids);
        this.set("notification_level", notification_level);
        this.notifyPropertyChange("notification_level");
      });
    },
    isUncategorizedCategory(id) {
      return Category.isUncategorized(id);
    }
  }, (_applyDecoratedDescriptor(_obj, "setupGroupsAndPermissions", [_dec], Object.getOwnPropertyDescriptor(_obj, "setupGroupsAndPermissions"), _obj), _applyDecoratedDescriptor(_obj, "minimumRequiredTags", [_dec2], Object.getOwnPropertyDescriptor(_obj, "minimumRequiredTags"), _obj), _applyDecoratedDescriptor(_obj, "availablePermissions", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "availablePermissions"), _obj), _applyDecoratedDescriptor(_obj, "searchContext", [_dec3], Object.getOwnPropertyDescriptor(_obj, "searchContext"), _obj), _applyDecoratedDescriptor(_obj, "ancestors", [_dec4], Object.getOwnPropertyDescriptor(_obj, "ancestors"), _obj), _applyDecoratedDescriptor(_obj, "level", [_dec5], Object.getOwnPropertyDescriptor(_obj, "level"), _obj), _applyDecoratedDescriptor(_obj, "isParent", [_dec6], Object.getOwnPropertyDescriptor(_obj, "isParent"), _obj), _applyDecoratedDescriptor(_obj, "isGrandParent", [_dec7], Object.getOwnPropertyDescriptor(_obj, "isGrandParent"), _obj), _applyDecoratedDescriptor(_obj, "isMuted", [_dec8], Object.getOwnPropertyDescriptor(_obj, "isMuted"), _obj), _applyDecoratedDescriptor(_obj, "isHidden", [_dec9], Object.getOwnPropertyDescriptor(_obj, "isHidden"), _obj), _applyDecoratedDescriptor(_obj, "hasMuted", [_dec10], Object.getOwnPropertyDescriptor(_obj, "hasMuted"), _obj), _applyDecoratedDescriptor(_obj, "notificationLevelString", [_dec11], Object.getOwnPropertyDescriptor(_obj, "notificationLevelString"), _obj), _applyDecoratedDescriptor(_obj, "path", [_dec12], Object.getOwnPropertyDescriptor(_obj, "path"), _obj), _applyDecoratedDescriptor(_obj, "url", [_dec13], Object.getOwnPropertyDescriptor(_obj, "url"), _obj), _applyDecoratedDescriptor(_obj, "fullSlug", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "fullSlug"), _obj), _applyDecoratedDescriptor(_obj, "nameLower", [_dec14], Object.getOwnPropertyDescriptor(_obj, "nameLower"), _obj), _applyDecoratedDescriptor(_obj, "unreadUrl", [_dec15], Object.getOwnPropertyDescriptor(_obj, "unreadUrl"), _obj), _applyDecoratedDescriptor(_obj, "newUrl", [_dec16], Object.getOwnPropertyDescriptor(_obj, "newUrl"), _obj), _applyDecoratedDescriptor(_obj, "style", [_dec17], Object.getOwnPropertyDescriptor(_obj, "style"), _obj), _applyDecoratedDescriptor(_obj, "moreTopics", [_dec18], Object.getOwnPropertyDescriptor(_obj, "moreTopics"), _obj), _applyDecoratedDescriptor(_obj, "totalTopicCount", [_dec19], Object.getOwnPropertyDescriptor(_obj, "totalTopicCount"), _obj), _applyDecoratedDescriptor(_obj, "defaultSlowModeMinutes", [_dec20], Object.getOwnPropertyDescriptor(_obj, "defaultSlowModeMinutes"), _obj), _applyDecoratedDescriptor(_obj, "isTracked", [_dec21], Object.getOwnPropertyDescriptor(_obj, "isTracked"), _obj), _applyDecoratedDescriptor(_obj, "latestTopic", [_dec22], Object.getOwnPropertyDescriptor(_obj, "latestTopic"), _obj), _applyDecoratedDescriptor(_obj, "featuredTopics", [_dec23], Object.getOwnPropertyDescriptor(_obj, "featuredTopics"), _obj), _applyDecoratedDescriptor(_obj, "unreadTopics", [_dec24], Object.getOwnPropertyDescriptor(_obj, "unreadTopics"), _obj), _applyDecoratedDescriptor(_obj, "newTopics", [_dec25], Object.getOwnPropertyDescriptor(_obj, "newTopics"), _obj), _applyDecoratedDescriptor(_obj, "isUncategorizedCategory", [_dec26], Object.getOwnPropertyDescriptor(_obj, "isUncategorizedCategory"), _obj)), _obj)));
  let _uncategorized;
  Category.reopenClass({
    // Sort subcategories directly under parents
    sortCategories(categories) {
      const children = new Map();
      categories.forEach(category => {
        const parentId = parseInt(category.parent_category_id, 10) || -1;
        const group = children.get(parentId) || [];
        group.pushObject(category);
        children.set(parentId, group);
      });
      const reduce = values => values.flatMap(c => [c, reduce(children.get(c.id) || [])]).flat();
      return reduce(children.get(-1));
    },
    isUncategorized(categoryId) {
      return categoryId === _site.default.currentProp("uncategorized_category_id");
    },
    slugEncoded() {
      let siteSettings = (0, _getOwner.getOwner)(this).lookup("service:site-settings");
      return siteSettings.slug_generation_method === "encoded";
    },
    findUncategorized() {
      _uncategorized = _uncategorized || Category.list().findBy("id", _site.default.currentProp("uncategorized_category_id"));
      return _uncategorized;
    },
    slugFor(category) {
      let separator = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "/";
      let depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3;
      if (!category) {
        return "";
      }
      const parentCategory = (0, _object.get)(category, "parentCategory");
      let result = "";
      if (parentCategory && depth > 1) {
        result = Category.slugFor(parentCategory, separator, depth - 1) + separator;
      }
      const id = (0, _object.get)(category, "id"),
        slug = (0, _object.get)(category, "slug");
      return !slug || slug.trim().length === 0 ? `${result}${id}-category` : result + slug;
    },
    list() {
      return _site.default.currentProp("categoriesList");
    },
    listByActivity() {
      return _site.default.currentProp("sortedCategories");
    },
    _idMap() {
      return _site.default.currentProp("categoriesById");
    },
    findSingleBySlug(slug) {
      if (!this.slugEncoded()) {
        return Category.list().find(c => Category.slugFor(c) === slug);
      } else {
        return Category.list().find(c => Category.slugFor(c) === encodeURI(slug));
      }
    },
    findById(id) {
      if (!id) {
        return;
      }
      return Category._idMap()[id];
    },
    findByIds() {
      let ids = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      const categories = [];
      ids.forEach(id => {
        const found = Category.findById(id);
        if (found) {
          categories.push(found);
        }
      });
      return categories;
    },
    findBySlugAndParent(slug, parentCategory) {
      if (this.slugEncoded()) {
        slug = encodeURI(slug);
      }
      return Category.list().find(category => {
        return category.slug === slug && (category.parentCategory || null) === parentCategory;
      });
    },
    findBySlugPath(slugPath) {
      let category = null;
      for (const slug of slugPath) {
        category = this.findBySlugAndParent(slug, category);
        if (!category) {
          return null;
        }
      }
      return category;
    },
    findBySlugPathWithID(slugPathWithID) {
      let parts = slugPathWithID.split("/").filter(Boolean);
      // slugs found by star/glob pathing in ember do not automatically url decode - ensure that these are decoded
      if (this.slugEncoded()) {
        parts = parts.map(urlPart => decodeURI(urlPart));
      }
      let category = null;
      if (parts.length > 0 && parts[parts.length - 1].match(/^\d+$/)) {
        const id = parseInt(parts.pop(), 10);
        category = Category.findById(id);
      } else {
        category = Category.findBySlugPath(parts);
        if (!category && parts.length > 0 && parts[parts.length - 1].match(/^\d+-category/)) {
          const id = parseInt(parts.pop(), 10);
          category = Category.findById(id);
        }
      }
      return category;
    },
    findBySlug(slug, parentSlug) {
      const categories = Category.list();
      let category;
      if (parentSlug) {
        const parentCategory = Category.findSingleBySlug(parentSlug);
        if (parentCategory) {
          if (slug === "none") {
            return parentCategory;
          }
          category = categories.find(item => {
            return item && item.get("parentCategory") === parentCategory && (!this.slugEncoded() && Category.slugFor(item) === parentSlug + "/" + slug || this.slugEncoded() && Category.slugFor(item) === encodeURI(parentSlug) + "/" + encodeURI(slug));
          });
        }
      } else {
        category = Category.findSingleBySlug(slug);

        // If we have a parent category, we need to enforce it
        if (category && category.get("parentCategory")) {
          return;
        }
      }

      // In case the slug didn't work, try to find it by id instead.
      if (!category) {
        category = categories.findBy("id", parseInt(slug, 10));
      }
      return category;
    },
    fetchVisibleGroups(id) {
      return (0, _ajax.ajax)(`/c/${id}/visible_groups.json`);
    },
    reloadById(id) {
      return (0, _ajax.ajax)(`/c/${id}/show.json`);
    },
    reloadBySlugPath(slugPath) {
      return (0, _ajax.ajax)(`/c/${slugPath}/find_by_slug.json`);
    },
    reloadCategoryWithPermissions(params, store, site) {
      return this.reloadBySlugPath(params.slug).then(result => this._includePermissions(result.category, store, site));
    },
    _includePermissions(category, store, site) {
      const record = store.createRecord("category", category);
      record.setupGroupsAndPermissions();
      site.updateCategory(record);
      return record;
    },
    search(term, opts) {
      let limit = 5;
      let parentCategoryId;
      if (opts) {
        if (opts.limit === 0) {
          return [];
        } else if (opts.limit) {
          limit = opts.limit;
        }
        if (opts.parentCategoryId) {
          parentCategoryId = opts.parentCategoryId;
        }
      }
      const emptyTerm = term === "";
      let slugTerm = term;
      if (!emptyTerm) {
        term = term.toLowerCase();
        slugTerm = term;
        term = term.replace(/-/g, " ");
      }
      const categories = Category.listByActivity();
      const length = categories.length;
      let i;
      let data = [];
      const done = () => {
        return data.length === limit;
      };
      const validCategoryParent = category => {
        return !parentCategoryId || category.get("parent_category_id") === parentCategoryId;
      };
      for (i = 0; i < length && !done(); i++) {
        const category = categories[i];
        if ((emptyTerm && !category.get("parent_category_id") || !emptyTerm && (category.get("name").toLowerCase().startsWith(term) || category.get("slug").toLowerCase().startsWith(slugTerm))) && validCategoryParent(category)) {
          data.push(category);
        }
      }
      if (!done()) {
        for (i = 0; i < length && !done(); i++) {
          const category = categories[i];
          if ((!emptyTerm && category.get("name").toLowerCase().indexOf(term) > 0 || category.get("slug").toLowerCase().indexOf(slugTerm) > 0) && validCategoryParent(category)) {
            if (!data.includes(category)) {
              data.push(category);
            }
          }
        }
      }
      return data.sortBy("read_restricted");
    }
  });
  var _default = Category;
  _exports.default = _default;
});
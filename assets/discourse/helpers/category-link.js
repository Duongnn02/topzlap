define("discourse/helpers/category-link", ["exports", "discourse-common/lib/helpers", "discourse/models/category", "I18n", "discourse/lib/utilities", "@ember/object", "discourse-common/lib/get-url", "@ember/template", "discourse-common/lib/icon-library", "discourse/lib/text-direction"], function (_exports, _helpers, _category, _I18n, _utilities, _object, _getUrl, _template, _iconLibrary, _textDirection) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addExtraIconRenderer = addExtraIconRenderer;
  _exports.categoryBadgeHTML = categoryBadgeHTML;
  _exports.categoryLinkHTML = categoryLinkHTML;
  _exports.defaultCategoryLinkRenderer = defaultCategoryLinkRenderer;
  _exports.replaceCategoryLinkRenderer = replaceCategoryLinkRenderer;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers",0,"discourse/models/category",0,"I18n",0,"discourse/lib/utilities",0,"@ember/object",0,"discourse-common/lib/get-url",0,"@ember/template",0,"discourse-common/lib/icon-library",0,"discourse/lib/text-direction"eaimeta@70e063a35619d71f
  let _renderer = defaultCategoryLinkRenderer;
  function replaceCategoryLinkRenderer(fn) {
    _renderer = fn;
  }
  function categoryStripe(color, classes) {
    let style = color ? "style='background-color: #" + color + ";'" : "";
    return "<span class='" + classes + "' " + style + "></span>";
  }
  let _extraIconRenderers = [];
  function addExtraIconRenderer(renderer) {
    _extraIconRenderers.push(renderer);
  }

  /**
    Generates category badge HTML
  
    @param {Object} category The category to generate the badge for.
    @param {Object} opts
      @param {String}  [opts.url] The url that we want the category badge to link to.
      @param {Boolean} [opts.allowUncategorized] If false, returns an empty string for the uncategorized category.
      @param {Boolean} [opts.link] If false, the category badge will not be a link.
      @param {Boolean} [opts.hideParent] If true, parent category will be hidden in the badge.
      @param {Boolean} [opts.recursive] If true, the function will be called recursively for all parent categories
      @param {Number}  [opts.depth] Current category depth, used for limiting recursive calls
  **/
  function categoryBadgeHTML(category, opts) {
    const {
      site,
      siteSettings
    } = (0, _helpers.helperContext)();
    opts = opts || {};
    if (!category || !opts.allowUncategorized && (0, _object.get)(category, "id") === site.uncategorized_category_id && siteSettings.suppress_uncategorized_badge) {
      return "";
    }
    const depth = (opts.depth || 1) + 1;
    if (opts.recursive && depth <= siteSettings.max_category_nesting) {
      const parentCategory = _category.default.findById(category.parent_category_id);
      const lastSubcategory = !opts.depth;
      opts.depth = depth;
      const parentBadges = categoryBadgeHTML(parentCategory, opts);
      opts.lastSubcategory = lastSubcategory;
      return parentBadges + _renderer(category, opts);
    }
    return _renderer(category, opts);
  }
  function categoryLinkHTML(category, options) {
    let categoryOptions = {};

    // TODO: This is a compatibility layer with the old helper structure.
    // Can be removed once we migrate to `registerUnbound` fully
    if (options && options.hash) {
      options = options.hash;
    }
    if (options) {
      if (options.allowUncategorized) {
        categoryOptions.allowUncategorized = true;
      }
      if (options.link !== undefined) {
        categoryOptions.link = options.link;
      }
      if (options.extraClasses) {
        categoryOptions.extraClasses = options.extraClasses;
      }
      if (options.hideParent) {
        categoryOptions.hideParent = true;
      }
      if (options.categoryStyle) {
        categoryOptions.categoryStyle = options.categoryStyle;
      }
      if (options.recursive) {
        categoryOptions.recursive = true;
      }
    }
    return (0, _template.htmlSafe)(categoryBadgeHTML(category, categoryOptions));
  }
  (0, _helpers.registerUnbound)("category-link", categoryLinkHTML);
  function buildTopicCount(count) {
    return `<span class="topic-count" aria-label="${_I18n.default.t("category_row.topic_count", {
      count
    })}">&times; ${count}</span>`;
  }
  function defaultCategoryLinkRenderer(category, opts) {
    let descriptionText = (0, _object.get)(category, "description_text");
    let restricted = (0, _object.get)(category, "read_restricted");
    let url = opts.url ? opts.url : (0, _getUrl.default)(`/c/${_category.default.slugFor(category)}/${(0, _object.get)(category, "id")}`);
    let href = opts.link === false ? "" : url;
    let tagName = opts.link === false || opts.link === "false" ? "span" : "a";
    let extraClasses = opts.extraClasses ? " " + opts.extraClasses : "";
    let color = (0, _object.get)(category, "color");
    let html = "";
    let parentCat = null;
    let categoryDir = "";
    if (!opts.hideParent) {
      parentCat = _category.default.findById((0, _object.get)(category, "parent_category_id"));
    }
    let siteSettings = (0, _helpers.helperContext)().siteSettings;
    const categoryStyle = opts.categoryStyle || siteSettings.category_style;
    if (categoryStyle !== "none") {
      if (parentCat && parentCat !== category) {
        html += categoryStripe((0, _object.get)(parentCat, "color"), "badge-category-parent-bg");
      }
      html += categoryStripe(color, "badge-category-bg");
    }
    let classNames = "badge-category clear-badge";
    if (restricted) {
      classNames += " restricted";
    }
    let style = "";
    if (categoryStyle === "box") {
      style = `style="color: #${(0, _object.get)(category, "text_color")};"`;
    }
    html += `<span ${style} ` + 'data-drop-close="true" class="' + classNames + '"' + (descriptionText ? 'title="' + descriptionText + '" ' : "") + ">";
    let categoryName = (0, _utilities.escapeExpression)((0, _object.get)(category, "name"));
    if (siteSettings.support_mixed_text_direction) {
      categoryDir = (0, _textDirection.isRTL)(categoryName) ? 'dir="rtl"' : 'dir="ltr"';
    }
    if (restricted) {
      html += (0, _iconLibrary.iconHTML)("lock");
    }
    _extraIconRenderers.forEach(renderer => {
      const iconName = renderer(category);
      if (iconName) {
        html += (0, _iconLibrary.iconHTML)(iconName);
      }
    });
    html += `<span class="category-name" ${categoryDir}>${categoryName}</span>`;
    html += "</span>";
    if (opts.topicCount && categoryStyle !== "box") {
      html += buildTopicCount(opts.topicCount);
    }
    if (href) {
      href = ` href="${href}" `;
    }
    extraClasses = categoryStyle ? categoryStyle + extraClasses : extraClasses;
    let afterBadgeWrapper = "";
    if (opts.topicCount && categoryStyle === "box") {
      afterBadgeWrapper += buildTopicCount(opts.topicCount);
    }
    if (opts.plusSubcategories && opts.lastSubcategory) {
      afterBadgeWrapper += `<span class="plus-subcategories">${_I18n.default.t("category_row.plus_subcategories", {
        count: opts.plusSubcategories
      })}</span>`;
    }
    return `<${tagName} class="badge-wrapper ${extraClasses}" ${href}>${html}</${tagName}>${afterBadgeWrapper}`;
  }
});
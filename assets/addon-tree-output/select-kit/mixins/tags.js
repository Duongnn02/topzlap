define("select-kit/mixins/tags", ["exports", "I18n", "@ember/object/mixin", "discourse/lib/ajax", "discourse-common/lib/get-url", "@ember/utils", "discourse-common/lib/helpers", "discourse/lib/ajax-error", "@ember/object/computed"], function (_exports, _I18n, _mixin, _ajax, _getUrl, _utils, _helpers, _ajaxError, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"@ember/object/mixin",0,"discourse/lib/ajax",0,"discourse-common/lib/get-url",0,"@ember/utils",0,"discourse-common/lib/helpers",0,"discourse/lib/ajax-error",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  var _default = _mixin.default.create({
    searchTags(url, data, callback) {
      return (0, _ajax.ajax)((0, _getUrl.default)(url), {
        quietMillis: 200,
        dataType: "json",
        data
      }).then(json => callback(this, json)).catch(_ajaxError.popupAjaxError);
    },
    selectKitOptions: {
      allowAny: "allowAnyTag"
    },
    allowAnyTag: (0, _computed.reads)("site.can_create_tag"),
    validateCreate(filter, content) {
      if (!filter.length) {
        return;
      }
      const maximum = this.selectKit.options.maximum;
      if (maximum && (0, _helpers.makeArray)(this.value).length >= parseInt(maximum, 10)) {
        this.addError(_I18n.default.t("select_kit.max_content_reached", {
          count: parseInt(maximum, 10)
        }));
        return false;
      }
      const filterRegexp = new RegExp(this.site.tags_filter_regexp, "g");
      filter = filter.replace(filterRegexp, "").trim().toLowerCase();
      if (this.termMatchesForbidden) {
        return false;
      }
      const toLowerCaseOrUndefined = string => {
        return (0, _utils.isEmpty)(string) ? undefined : string.toLowerCase();
      };
      const inCollection = content.map(c => toLowerCaseOrUndefined(this.getValue(c))).filter(Boolean).includes(filter);
      const inSelection = (this.value || []).map(s => toLowerCaseOrUndefined(s)).filter(Boolean).includes(filter);
      if (inCollection || inSelection) {
        return false;
      }
      return true;
    },
    createContentFromInput(input) {
      // See lib/discourse_tagging#clean_tag.
      input = input.trim().replace(/\s+/g, "-").replace(/[\/\?#\[\]@!\$&'\(\)\*\+,;=\.%\\`^\s|\{\}"<>]+/g, "").substring(0, this.siteSettings.max_tag_length);
      if (this.siteSettings.force_lowercase_tags) {
        input = input.toLowerCase();
      }
      return input;
    }
  });
  _exports.default = _default;
});
define("discourse/widgets/search-menu-controls", ["I18n", "discourse/widgets/widget"], function (_I18n, _widget) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/widgets/widget"eaimeta@70e063a35619d71f
  (0, _widget.createWidget)("search-term", {
    tagName: "input",
    buildId: () => "search-term",
    buildKey: () => "search-term",
    buildAttributes(attrs) {
      return {
        type: "text",
        value: attrs.value || "",
        autocomplete: "off",
        placeholder: _I18n.default.t("search.title"),
        "aria-label": _I18n.default.t("search.title")
      };
    },
    input(e) {
      const val = this.attrs.value;

      // remove zero-width chars
      const newVal = e.target.value.replace(/[\u200B-\u200D\uFEFF]/, "");
      if (newVal !== val) {
        this.sendWidgetAction("searchTermChanged", newVal);
      }
    }
  });

  // TODO: No longer used, remove in December 2021
  (0, _widget.createWidget)("search-context", {
    html() {
      return false;
    }
  });
});
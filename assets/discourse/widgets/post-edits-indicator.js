define("discourse/widgets/post-edits-indicator", ["exports", "I18n", "discourse/widgets/widget", "discourse/lib/formatter"], function (_exports, _I18n, _widget, _formatter) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _exports.historyHeat = historyHeat;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/widgets/widget",0,"discourse/lib/formatter"eaimeta@70e063a35619d71f
  function mult(val) {
    return 60 * 50 * 1000 * val;
  }
  function historyHeat(siteSettings, updatedAt) {
    if (!updatedAt) {
      return;
    }

    // Show heat on age
    const rightNow = Date.now();
    const updatedAtTime = updatedAt.getTime();
    if (updatedAtTime > rightNow - mult(siteSettings.history_hours_low)) {
      return "heatmap-high";
    }
    if (updatedAtTime > rightNow - mult(siteSettings.history_hours_medium)) {
      return "heatmap-med";
    }
    if (updatedAtTime > rightNow - mult(siteSettings.history_hours_high)) {
      return "heatmap-low";
    }
  }
  var _default = (0, _widget.createWidget)("post-edits-indicator", {
    tagName: "div.post-info.edits",
    html(attrs) {
      let icon = "pencil-alt";
      const updatedAt = new Date(attrs.updated_at);
      let className = historyHeat(this.siteSettings, updatedAt);
      const date = (0, _formatter.longDate)(updatedAt);
      let title;
      if (attrs.wiki) {
        icon = "far-edit";
        className = `${className || ""} wiki`.trim();
        if (attrs.version > 1) {
          title = _I18n.default.t("post.wiki_last_edited_on", {
            dateTime: date
          });
        } else {
          title = _I18n.default.t("post.wiki.about");
        }
      } else {
        title = _I18n.default.t("post.last_edited_on", {
          dateTime: date
        });
      }
      return this.attach("flat-button", {
        icon,
        translatedTitle: title,
        className,
        action: "onPostEditsIndicatorClick",
        translatedAriaLabel: _I18n.default.t("post.edit_history"),
        translatedLabel: attrs.version > 1 ? attrs.version - 1 : ""
      });
    },
    onPostEditsIndicatorClick() {
      if (this.attrs.wiki && this.attrs.version === 1) {
        this.sendWidgetAction("editPost");
      } else if (this.attrs.canViewEditHistory) {
        this.sendWidgetAction("showHistory");
      }
    }
  });
  _exports.default = _default;
});
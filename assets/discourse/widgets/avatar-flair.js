define("discourse/widgets/avatar-flair", ["discourse-common/lib/icon-library", "discourse/widgets/widget", "discourse/lib/utilities"], function (_iconLibrary, _widget, _utilities) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/icon-library",0,"discourse/widgets/widget",0,"discourse/lib/utilities"eaimeta@70e063a35619d71f
  (0, _widget.createWidget)("avatar-flair", {
    tagName: "div.avatar-flair",
    isIcon(attrs) {
      return attrs.flair_url && !attrs.flair_url.includes("/");
    },
    title(attrs) {
      return attrs.flair_name;
    },
    buildClasses(attrs) {
      let defaultClass = `avatar-flair-${attrs.flair_name} ${attrs.flair_bg_color ? "rounded" : ""}`;
      if (!this.isIcon(attrs)) {
        defaultClass += " avatar-flair-image";
      }
      return defaultClass;
    },
    buildAttributes(attrs) {
      let style = "";
      if (!this.isIcon(attrs)) {
        style += "background-image: url(" + (0, _utilities.escapeExpression)(attrs.flair_url) + "); ";
      }
      if (attrs.flair_bg_color) {
        style += "background-color: #" + (0, _utilities.escapeExpression)(attrs.flair_bg_color) + "; ";
      }
      if (attrs.flair_color) {
        style += "color: #" + (0, _utilities.escapeExpression)(attrs.flair_color) + "; ";
      }
      return {
        style
      };
    },
    html(attrs) {
      if (this.isIcon(attrs)) {
        const icon = (0, _iconLibrary.convertIconClass)(attrs.flair_url);
        return [(0, _iconLibrary.iconNode)(icon)];
      } else {
        return [];
      }
    }
  });
});
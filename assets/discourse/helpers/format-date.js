define("discourse/helpers/format-date", ["discourse/lib/formatter", "@ember/template", "discourse-common/lib/helpers"], function (_formatter, _template, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/lib/formatter",0,"@ember/template",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  /**
    Display logic for dates. It is unbound in Ember but will use jQuery to
    update the dates on a regular interval.
  **/
  (0, _helpers.registerUnbound)("format-date", function (val, params) {
    let leaveAgo,
      format = "medium",
      title = true;
    if (params.leaveAgo) {
      leaveAgo = params.leaveAgo === "true";
    }
    if (params.format) {
      format = params.format;
    }
    if (params.noTitle) {
      title = false;
    }
    if (val) {
      let date = new Date(val);
      return (0, _template.htmlSafe)((0, _formatter.autoUpdatingRelativeAge)(date, {
        format,
        title,
        leaveAgo
      }));
    }
  });
});
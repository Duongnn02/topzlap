define("discourse/helpers/application", ["discourse/lib/formatter", "I18n", "discourse/lib/utilities", "@ember/template", "discourse-common/lib/helpers"], function (_formatter, _I18n, _utilities, _template, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/lib/formatter",0,"I18n",0,"discourse/lib/utilities",0,"@ember/template",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("raw-date", dt => (0, _template.htmlSafe)((0, _formatter.longDate)(new Date(dt))));
  (0, _helpers.registerUnbound)("age-with-tooltip", (dt, params) => (0, _template.htmlSafe)((0, _formatter.autoUpdatingRelativeAge)(new Date(dt), {
    title: true,
    addAgo: params.addAgo || false,
    ...(params.defaultFormat && {
      defaultFormat: params.defaultFormat
    })
  })));
  (0, _helpers.registerUnbound)("number", (orig, params) => {
    orig = Math.round(parseFloat(orig));
    if (isNaN(orig)) {
      orig = 0;
    }
    let title = _I18n.default.toNumber(orig, {
      precision: 0
    });
    if (params.numberKey) {
      title = _I18n.default.t(params.numberKey, {
        number: title,
        count: parseInt(orig, 10)
      });
    }
    let classNames = "number";
    if (params["class"]) {
      classNames += " " + params["class"];
    }
    let result = "<span class='" + classNames + "'";
    let addTitle = params.noTitle ? false : true;

    // Round off the thousands to one decimal place
    const n = (0, _formatter.number)(orig);
    if (n.toString() !== title.toString() && addTitle) {
      result += " title='" + (0, _utilities.escapeExpression)(title) + "'";
    }
    if (params.ariaLabel) {
      const ariaLabel = (0, _utilities.escapeExpression)(params.ariaLabel);
      result += ` aria-label='${ariaLabel}'`;
    }
    result += ">" + n + "</span>";
    return (0, _template.htmlSafe)(result);
  });
});
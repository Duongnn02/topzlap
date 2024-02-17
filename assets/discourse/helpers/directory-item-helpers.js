define("discourse/helpers/directory-item-helpers", ["@ember/template", "discourse/lib/formatter", "discourse-common/lib/helpers", "I18n"], function (_template, _formatter, _helpers, _I18n) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/template",0,"discourse/lib/formatter",0,"discourse-common/lib/helpers",0,"I18n"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("directory-item-label", function (args) {
    // Args should include key/values { item, column }
    const count = args.item.get(args.column.name);
    const translationPrefix = args.column.type === "automatic" ? "directory." : "";
    return (0, _template.htmlSafe)(_I18n.default.t(`${translationPrefix}${args.column.name}`, {
      count
    }));
  });
  (0, _helpers.registerUnbound)("directory-item-value", function (args) {
    // Args should include key/values { item, column }
    return (0, _template.htmlSafe)(`<span class='directory-table__value'>${(0, _formatter.number)(args.item.get(args.column.name))}</span>`);
  });
  (0, _helpers.registerUnbound)("directory-item-user-field-value", function (args) {
    // Args should include key/values { item, column }
    const value = args.item.user && args.item.user.user_fields ? args.item.user.user_fields[args.column.user_field_id] : null;
    const content = value || "-";
    return (0, _template.htmlSafe)(`<span class='directory-table__value--user-field'>${content}</span>`);
  });
  (0, _helpers.registerUnbound)("directory-column-is-automatic", function (args) {
    // Args should include key/values { column }
    return args.column.type === "automatic";
  });
  (0, _helpers.registerUnbound)("directory-column-is-user-field", function (args) {
    // Args should include key/values { column }
    return args.column.type === "user_field";
  });
});
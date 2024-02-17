define("discourse/helpers/raw", ["discourse-common/lib/helpers", "discourse-common/lib/raw-templates", "@ember/template", "discourse-common/lib/raw-handlebars-helpers", "@ember/application"], function (_helpers, _rawTemplates, _template, _rawHandlebarsHelpers, _application) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers",0,"discourse-common/lib/raw-templates",0,"@ember/template",0,"discourse-common/lib/raw-handlebars-helpers",0,"@ember/application"eaimeta@70e063a35619d71f
  function renderRaw(ctx, template, templateName, params) {
    params = Object.assign({}, params);
    params.parent = params.parent || ctx;
    let context = (0, _helpers.helperContext)();
    if (!params.view) {
      const viewClass = context.registry.resolve(`raw-view:${templateName}`);
      if (viewClass) {
        (0, _application.setOwner)(params, (0, _application.getOwner)(context));
        params.view = viewClass.create(params, context);
      }
      if (!params.view) {
        params = Object.assign({}, params, context);
      }
    }
    return (0, _template.htmlSafe)(template(params, _rawHandlebarsHelpers.RUNTIME_OPTIONS));
  }
  (0, _helpers.registerUnbound)("raw", function (templateName, params) {
    templateName = templateName.replace(".", "/");
    const template = (0, _rawTemplates.findRawTemplate)(templateName);
    if (!template) {
      // eslint-disable-next-line no-console
      console.warn("Could not find raw template: " + templateName);
      return;
    }
    return renderRaw(this, template, templateName, params);
  });
});
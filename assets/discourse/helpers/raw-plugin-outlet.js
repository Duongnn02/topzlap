define("discourse/helpers/raw-plugin-outlet", ["discourse-common/lib/raw-handlebars", "@ember/template", "discourse/lib/plugin-connectors"], function (_rawHandlebars, _template, _pluginConnectors) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/raw-handlebars",0,"@ember/template",0,"discourse/lib/plugin-connectors"eaimeta@70e063a35619d71f
  _rawHandlebars.default.registerHelper("raw-plugin-outlet", function (args) {
    const connectors = (0, _pluginConnectors.rawConnectorsFor)(args.hash.name);
    if (connectors.length) {
      const output = connectors.map(c => c.template({
        context: this
      }));
      return (0, _template.htmlSafe)(output.join(""));
    }
  });
});
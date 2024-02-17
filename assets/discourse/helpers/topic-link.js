define("discourse/helpers/topic-link", ["@ember/template", "discourse-common/lib/helpers"], function (_template, _helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"@ember/template",0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("topic-link", (topic, args) => {
    const title = topic.get("fancyTitle");
    const url = topic.linked_post_number ? topic.urlForPostNumber(topic.linked_post_number) : topic.get("lastUnreadUrl");
    const classes = ["title"];
    if (args.class) {
      args.class.split(" ").forEach(c => classes.push(c));
    }
    return (0, _template.htmlSafe)(`<a href='${url}'
        role='heading'
        aria-level='2'
        class='${classes.join(" ")}'
        data-topic-id='${topic.id}'>${title}</a>`);
  });
});
define("discourse/helpers/shorten-url", ["discourse-common/lib/helpers"], function (_helpers) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/helpers"eaimeta@70e063a35619d71f
  (0, _helpers.registerUnbound)("shorten-url", function (url) {
    let matches = url.match(/\//g);
    if (matches && matches.length === 3) {
      url = url.replace(/\/$/, "");
    }
    url = url.replace(/^https?:\/\//, "");
    url = url.replace(/^www\./, "");
    return url.substring(0, 80);
  });
});
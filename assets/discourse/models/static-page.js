define("discourse/models/static-page", ["exports", "@ember/object", "rsvp", "discourse/lib/ajax"], function (_exports, _object, _rsvp, _ajax) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object",0,"rsvp",0,"discourse/lib/ajax"eaimeta@70e063a35619d71f
  const StaticPage = _object.default.extend();
  StaticPage.reopenClass({
    find(path) {
      return new _rsvp.Promise(resolve => {
        // Models shouldn't really be doing Ajax request, but this is a huge speed boost if we
        // preload content.
        const $preloaded = $('noscript[data-path="/' + path + '"]');
        if ($preloaded.length) {
          let text = $preloaded.text();
          text = text.match(/<!-- preload-content: -->((?:.|[\n\r])*)<!-- :preload-content -->/)[1];
          resolve(StaticPage.create({
            path,
            html: text
          }));
        } else {
          (0, _ajax.ajax)(`/${path}.html`, {
            dataType: "html"
          }).then(result => resolve(StaticPage.create({
            path,
            html: result
          })));
        }
      });
    }
  });
  var _default = StaticPage;
  _exports.default = _default;
});
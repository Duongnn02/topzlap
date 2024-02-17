define("discourse/plugins/discourse-akismet/discourse-akismet/connectors/flag-modal-bottom/akismet-status", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    setupComponent(args, component) {
      component.set("post", args.post);
    }
  };
  _exports.default = _default;
});
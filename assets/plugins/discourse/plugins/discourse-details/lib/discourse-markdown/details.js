define("discourse/plugins/discourse-details/lib/discourse-markdown/details", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.setup = setup;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  const rule = {
    tag: "details",
    before(state, tagInfo) {
      const attrs = tagInfo.attrs;
      state.push("bbcode_open", "details", 1);
      state.push("bbcode_open", "summary", 1);
      let token = state.push("text", "", 0);
      token.content = attrs["_default"] || "";
      state.push("bbcode_close", "summary", -1);
    },
    after(state) {
      state.push("bbcode_close", "details", -1);
    }
  };
  function setup(helper) {
    helper.allowList(["summary", "summary[title]", "details", "details[open]", "details.elided"]);
    helper.registerPlugin(md => {
      md.block.bbcode.ruler.push("details", rule);
    });
  }
});
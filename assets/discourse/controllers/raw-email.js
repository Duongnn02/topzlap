define("discourse/controllers/raw-email", ["exports", "@ember/controller", "admin/models/incoming-email", "discourse/mixins/modal-functionality", "discourse/models/post", "@ember/object/computed"], function (_exports, _controller, _incomingEmail, _modalFunctionality, _post, _computed) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"admin/models/incoming-email",0,"discourse/mixins/modal-functionality",0,"discourse/models/post",0,"@ember/object/computed"eaimeta@70e063a35619d71f
  // This controller handles displaying of raw email
  var _default = _controller.default.extend(_modalFunctionality.default, {
    rawEmail: "",
    textPart: "",
    htmlPart: "",
    tab: "raw",
    showRawEmail: (0, _computed.equal)("tab", "raw"),
    showTextPart: (0, _computed.equal)("tab", "text_part"),
    showHtmlPart: (0, _computed.equal)("tab", "html_part"),
    onShow() {
      this.send("displayRaw");
    },
    loadRawEmail(postId) {
      return _post.default.loadRawEmail(postId).then(result => this.setProperties({
        rawEmail: result.raw_email,
        textPart: result.text_part,
        htmlPart: result.html_part
      }));
    },
    loadIncomingRawEmail(incomingEmailId) {
      return _incomingEmail.default.loadRawEmail(incomingEmailId).then(result => this.setProperties({
        rawEmail: result.raw_email,
        textPart: result.text_part,
        htmlPart: result.html_part
      }));
    },
    actions: {
      displayRaw() {
        this.set("tab", "raw");
      },
      displayTextPart() {
        this.set("tab", "text_part");
      },
      displayHtmlPart() {
        this.set("tab", "html_part");
      }
    }
  });
  _exports.default = _default;
});
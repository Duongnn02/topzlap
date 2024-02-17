define("discourse/widgets/footer-nav", ["discourse/lib/utilities", "discourse/widgets/widget"], function (_utilities, _widget) {
  "use strict";

  0; //eaimeta@70e063a35619d71f0,"discourse/lib/utilities",0,"discourse/widgets/widget"eaimeta@70e063a35619d71f
  (0, _widget.createWidget)("footer-nav", {
    tagName: "div.footer-nav-widget",
    html(attrs) {
      const buttons = [];
      buttons.push(this.attach("flat-button", {
        action: "goBack",
        icon: "chevron-left",
        className: "btn-large",
        disabled: !attrs.canGoBack,
        title: "footer_nav.back"
      }));
      buttons.push(this.attach("flat-button", {
        action: "goForward",
        icon: "chevron-right",
        className: "btn-large",
        disabled: !attrs.canGoForward,
        title: "footer_nav.forward"
      }));
      if (this.capabilities.isAppWebview) {
        buttons.push(this.attach("flat-button", {
          action: "share",
          icon: "link",
          className: "btn-large",
          title: "footer_nav.share"
        }));
        buttons.push(this.attach("flat-button", {
          action: "dismiss",
          icon: "chevron-down",
          className: "btn-large",
          title: "footer_nav.dismiss"
        }));
      }
      return buttons;
    },
    dismiss() {
      (0, _utilities.postRNWebviewMessage)("dismiss", true);
    },
    share() {
      (0, _utilities.postRNWebviewMessage)("shareUrl", window.location.href);
    }
  });
});
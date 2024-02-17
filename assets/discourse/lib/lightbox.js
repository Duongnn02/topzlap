define("discourse/lib/lightbox", ["exports", "discourse/lib/utilities", "I18n", "discourse/models/user", "discourse/lib/load-script", "discourse-common/lib/icon-library", "discourse/helpers/loading-spinner", "discourse-common/lib/helpers", "discourse-common/config/environment"], function (_exports, _utilities, _I18n, _user, _loadScript, _iconLibrary, _loadingSpinner, _helpers, _environment) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/utilities",0,"I18n",0,"discourse/models/user",0,"discourse/lib/load-script",0,"discourse-common/lib/icon-library",0,"discourse/helpers/loading-spinner",0,"discourse-common/lib/helpers",0,"discourse-common/config/environment"eaimeta@70e063a35619d71f
  function _default(elem, siteSettings) {
    if (!elem) {
      return;
    }
    const lightboxes = elem.querySelectorAll("*:not(.spoiler):not(.spoiled) a.lightbox");
    if (!lightboxes.length) {
      return;
    }
    const caps = (0, _helpers.helperContext)().capabilities;
    const imageClickNavigation = caps.touch;
    (0, _loadScript.default)("/javascripts/jquery.magnific-popup.min.js").then(function () {
      $(lightboxes).magnificPopup({
        type: "image",
        closeOnContentClick: false,
        removalDelay: (0, _environment.isTesting)() ? 0 : 300,
        mainClass: "mfp-zoom-in",
        tClose: _I18n.default.t("lightbox.close"),
        tLoading: _loadingSpinner.spinnerHTML,
        prependTo: (0, _environment.isTesting)() && document.getElementById("ember-testing"),
        gallery: {
          enabled: true,
          tPrev: _I18n.default.t("lightbox.previous"),
          tNext: _I18n.default.t("lightbox.next"),
          tCounter: _I18n.default.t("lightbox.counter"),
          navigateByImgClick: imageClickNavigation
        },
        ajax: {
          tError: _I18n.default.t("lightbox.content_load_error")
        },
        callbacks: {
          open() {
            if (!imageClickNavigation) {
              const wrap = this.wrap,
                img = this.currItem.img,
                maxHeight = img.css("max-height");
              wrap.on("click.pinhandler", "img", function () {
                wrap.toggleClass("mfp-force-scrollbars");
                img.css("max-height", wrap.hasClass("mfp-force-scrollbars") ? "none" : maxHeight);
              });
            }
            if (caps.isAppWebview) {
              (0, _utilities.postRNWebviewMessage)("headerBg", $(".mfp-bg").css("background-color"));
            }
          },
          change() {
            this.wrap.removeClass("mfp-force-scrollbars");
          },
          beforeClose() {
            this.wrap.off("click.pinhandler");
            this.wrap.removeClass("mfp-force-scrollbars");
            if (caps.isAppWebview) {
              (0, _utilities.postRNWebviewMessage)("headerBg", $(".d-header").css("background-color"));
            }
          }
        },
        image: {
          tError: _I18n.default.t("lightbox.image_load_error"),
          titleSrc(item) {
            const href = item.el.data("download-href") || item.src;
            let src = [(0, _utilities.escapeExpression)(item.el.attr("title")), $("span.informations", item.el).text()];
            if (!siteSettings.prevent_anons_from_downloading_files || _user.default.current()) {
              src.push('<a class="image-source-link" href="' + href + '">' + (0, _iconLibrary.renderIcon)("string", "download") + _I18n.default.t("lightbox.download") + "</a>");
            }
            src.push('<a class="image-source-link" href="' + item.src + '">' + (0, _iconLibrary.renderIcon)("string", "image") + _I18n.default.t("lightbox.open") + "</a>");
            return src.join(" &middot; ");
          }
        }
      });
    });
  }
});
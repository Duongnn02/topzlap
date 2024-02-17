define("discourse/initializers/post-decorations", ["exports", "@ember/runloop", "discourse-common/lib/later", "I18n", "discourse/lib/highlight-syntax", "discourse/lib/lightbox", "discourse-common/lib/icon-library", "discourse/lib/text-direction", "discourse/lib/lazy-load-images", "discourse/lib/plugin-api", "virtual-dom", "discourse/lib/show-modal"], function (_exports, _runloop, _later, _I18n, _highlightSyntax, _lightbox, _iconLibrary, _textDirection, _lazyLoadImages, _pluginApi, _virtualDom, _showModal) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/runloop",0,"discourse-common/lib/later",0,"I18n",0,"discourse/lib/highlight-syntax",0,"discourse/lib/lightbox",0,"discourse-common/lib/icon-library",0,"discourse/lib/text-direction",0,"discourse/lib/lazy-load-images",0,"discourse/lib/plugin-api",0,"virtual-dom",0,"discourse/lib/show-modal"eaimeta@70e063a35619d71f
  var _default = {
    name: "post-decorations",
    initialize(container) {
      (0, _pluginApi.withPluginApi)("0.1", api => {
        const siteSettings = container.lookup("service:site-settings");
        const session = container.lookup("service:session");
        const site = container.lookup("service:site");
        api.decorateCookedElement(elem => {
          return (0, _highlightSyntax.default)(elem, siteSettings, session);
        }, {
          id: "discourse-syntax-highlighting"
        });
        api.decorateCookedElement(elem => {
          return (0, _lightbox.default)(elem, siteSettings);
        }, {
          id: "discourse-lightbox"
        });
        if (siteSettings.support_mixed_text_direction) {
          api.decorateCookedElement(_textDirection.setTextDirections, {
            id: "discourse-text-direction"
          });
        }
        (0, _lazyLoadImages.nativeLazyLoading)(api);
        api.decorateCookedElement(elem => {
          elem.querySelectorAll("audio").forEach(player => {
            player.addEventListener("play", () => {
              const postId = parseInt(elem.closest("article")?.dataset.postId, 10);
              if (postId) {
                api.preventCloak(postId);
              }
            });
          });
        }, {
          id: "discourse-audio"
        });
        const caps = container.lookup("service:capabilities");
        if (caps.isSafari || caps.isIOS) {
          api.decorateCookedElement(elem => {
            elem.querySelectorAll("video").forEach(video => {
              if (video.poster && video.poster !== "" && !video.autoplay) {
                return;
              }
              const source = video.querySelector("source");
              if (source) {
                // In post-cooked.js, we create the video element in a detached DOM
                // then adopt it into to the real DOM.
                // This confuses safari, and preloading/autoplay do not happen.

                // Calling `.load()` tricks Safari into loading the video element correctly
                source.parentElement.load();
              }
            });
          }, {
            id: "safari-video-poster",
            afterAdopt: true,
            onlyStream: true
          });
        }
        const oneboxTypes = {
          amazon: "discourse-amazon",
          githubactions: "fab-github",
          githubblob: "fab-github",
          githubcommit: "fab-github",
          githubpullrequest: "fab-github",
          githubissue: "fab-github",
          githubfile: "fab-github",
          githubgist: "fab-github",
          twitterstatus: "fab-twitter",
          wikipedia: "fab-wikipedia-w"
        };
        api.decorateCookedElement(elem => {
          elem.querySelectorAll(".onebox").forEach(onebox => {
            Object.entries(oneboxTypes).forEach(_ref => {
              let [key, value] = _ref;
              if (onebox.classList.contains(key)) {
                onebox.querySelector(".source").insertAdjacentHTML("afterbegin", (0, _iconLibrary.iconHTML)(value));
              }
            });
          });
        }, {
          id: "onebox-source-icons"
        });
        api.decorateCookedElement(element => {
          element.querySelectorAll(".video-container").forEach(videoContainer => {
            const video = videoContainer.getElementsByTagName("video")[0];
            video.addEventListener("loadeddata", () => {
              (0, _later.default)(() => {
                if (video.videoWidth === 0 || video.videoHeight === 0) {
                  const notice = document.createElement("div");
                  notice.className = "notice";
                  notice.innerHTML = (0, _iconLibrary.iconHTML)("exclamation-triangle") + " " + _I18n.default.t("cannot_render_video");
                  videoContainer.appendChild(notice);
                }
              }, 500);
            });
          });
        }, {
          id: "discourse-video-codecs"
        });
        function _createButton() {
          const openPopupBtn = document.createElement("button");
          openPopupBtn.classList.add("open-popup-link", "btn-default", "btn", "btn-icon", "btn-expand-table", "no-text");
          const expandIcon = (0, _virtualDom.create)((0, _iconLibrary.iconNode)("discourse-expand", {
            class: "expand-table-icon"
          }));
          openPopupBtn.title = _I18n.default.t("fullscreen_table.expand_btn");
          openPopupBtn.append(expandIcon);
          return openPopupBtn;
        }
        function isOverflown(_ref2) {
          let {
            clientWidth,
            scrollWidth
          } = _ref2;
          return scrollWidth > clientWidth;
        }
        function generateModal(event) {
          const table = event.target.parentElement.nextElementSibling;
          const tempTable = table.cloneNode(true);
          (0, _showModal.default)("fullscreen-table").set("tableHtml", tempTable);
        }
        function generatePopups(tables) {
          tables.forEach(table => {
            if (!isOverflown(table.parentNode)) {
              return;
            }
            if (site.isMobileDevice) {
              return;
            }
            const popupBtn = _createButton();
            table.parentNode.classList.add("fullscreen-table-wrapper");
            // Create a button wrapper for case of multiple buttons (i.e. table builder extension)
            const buttonWrapper = document.createElement("div");
            buttonWrapper.classList.add("fullscreen-table-wrapper--buttons");
            buttonWrapper.append(popupBtn);
            popupBtn.addEventListener("click", generateModal, false);
            table.parentNode.insertBefore(buttonWrapper, table);
          });
        }
        api.decorateCookedElement(post => {
          (0, _runloop.schedule)("afterRender", () => {
            const tables = post.querySelectorAll("table");
            generatePopups(tables);
          });
        }, {
          onlyStream: true,
          id: "fullscreen-table"
        });
      });
    }
  };
  _exports.default = _default;
});
define("discourse/plugins/discourse-lazy-videos/lib/lazy-video-attributes", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = getVideoAttributes;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  function getVideoAttributes(cooked) {
    if (!cooked.classList.contains("lazy-video-container")) {
      return {};
    }
    const url = cooked.querySelector("a")?.getAttribute("href");
    const img = cooked.querySelector("img");
    const thumbnail = img?.getAttribute("src");
    const dominantColor = img?.dataset?.dominantColor;
    const title = cooked.dataset.videoTitle;
    const startTime = cooked.dataset.videoStartTime || 0;
    const providerName = cooked.dataset.providerName;
    const id = cooked.dataset.videoId;
    return {
      url,
      thumbnail,
      title,
      providerName,
      id,
      dominantColor,
      startTime
    };
  }
});
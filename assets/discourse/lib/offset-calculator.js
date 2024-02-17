define("discourse/lib/offset-calculator", ["exports", "discourse-common/lib/deprecated"], function (_exports, _deprecated) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = offsetCalculator;
  _exports.headerOffset = headerOffset;
  _exports.minimumOffset = minimumOffset;
  _exports.scrollTopFor = scrollTopFor;
  0; //eaimeta@70e063a35619d71f0,"discourse-common/lib/deprecated"eaimeta@70e063a35619d71f
  function scrollTopFor(y) {
    return y - offsetCalculator();
  }
  function minimumOffset() {
    (0, _deprecated.default)("The minimumOffset() helper is deprecated, please use headerOffset() instead.", {
      since: "2.8.0.beta10",
      dropFrom: "2.9.0.beta2",
      id: "discourse.offset-calculator.minimumOffset"
    });
    const header = document.querySelector("header.d-header"),
      iPadNav = document.querySelector(".footer-nav-ipad .footer-nav"),
      iPadNavHeight = iPadNav ? iPadNav.offsetHeight : 0;

    // if the header has a positive offset from the top of the window, we need to include the offset
    // this covers cases where a site has a custom header above d-header (covers fixed and unfixed)
    const headerWrap = document.querySelector(".d-header-wrap"),
      headerWrapOffset = headerWrap.getBoundingClientRect();
    return header ? header.offsetHeight + headerWrapOffset.top + iPadNavHeight : 0;
  }
  function headerOffset() {
    return parseInt(document.documentElement.style.getPropertyValue("--header-offset"), 10) || 0;
  }
  function offsetCalculator() {
    const min = headerOffset();

    // on mobile, just use the header
    if (document.querySelector("html").classList.contains("mobile-view")) {
      return min;
    }
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;
    const topicBottomOffsetTop = document.getElementById("topic-bottom").offsetTop;

    // the footer is bigger than the window, we can scroll down past the last post
    if (documentHeight - windowHeight > topicBottomOffsetTop) {
      return min;
    }
    const scrollTop = window.scrollY;
    const visibleBottomHeight = scrollTop + windowHeight - topicBottomOffsetTop;
    if (visibleBottomHeight > 0) {
      const bottomHeight = documentHeight - topicBottomOffsetTop;
      const offset = (windowHeight - bottomHeight) * visibleBottomHeight / bottomHeight;
      return Math.max(min, offset);
    }
    return min;
  }
});
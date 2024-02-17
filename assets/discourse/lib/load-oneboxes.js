define("discourse/lib/load-oneboxes", ["exports", "pretty-text/oneboxer", "pretty-text/inline-oneboxer"], function (_exports, _oneboxer, _inlineOneboxer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.loadOneboxes = loadOneboxes;
  0; //eaimeta@70e063a35619d71f0,"pretty-text/oneboxer",0,"pretty-text/inline-oneboxer"eaimeta@70e063a35619d71f
  function loadOneboxes(container, ajax, topicId, categoryId, maxOneboxes, refresh, offline) {
    const oneboxes = {};
    const inlineOneboxes = {};

    // Oneboxes = `a.onebox` -> `a.onebox-loading` -> `aside.onebox`
    // Inline Oneboxes = `a.inline-onebox-loading` -> `a.inline-onebox`

    let loadedOneboxes = container.querySelectorAll(`aside.onebox, a.${_oneboxer.LOADING_ONEBOX_CSS_CLASS}, a.inline-onebox`).length;
    container.querySelectorAll("a.onebox, a.inline-onebox-loading").forEach(link => {
      const isInline = link.classList.contains("inline-onebox-loading");

      // maps URLs to their link elements
      const map = isInline ? inlineOneboxes : oneboxes;
      if (loadedOneboxes < maxOneboxes) {
        if (map[link.href] === undefined) {
          map[link.href] = [];
          loadedOneboxes++;
        }
        map[link.href].push(link);
      } else {
        if (map[link.href] !== undefined) {
          map[link.href].push(link);
        } else if (isInline) {
          link.classList.remove("inline-onebox-loading");
        }
      }
    });
    if (Object.keys(oneboxes).length > 0) {
      _loadOneboxes({
        oneboxes,
        ajax,
        topicId,
        categoryId,
        refresh,
        offline
      });
    }
    if (Object.keys(inlineOneboxes).length > 0) {
      _loadInlineOneboxes(inlineOneboxes, ajax, topicId, categoryId);
    }
    return Object.keys(oneboxes).length + Object.keys(inlineOneboxes).length;
  }
  function _loadInlineOneboxes(inline, ajax, topicId, categoryId) {
    (0, _inlineOneboxer.applyInlineOneboxes)(inline, ajax, {
      categoryId: topicId,
      topicId: categoryId
    });
  }
  function _loadOneboxes(_ref) {
    let {
      oneboxes,
      ajax,
      topicId,
      categoryId,
      refresh,
      offline
    } = _ref;
    Object.values(oneboxes).forEach(onebox => {
      onebox.forEach(elem => {
        (0, _oneboxer.load)({
          elem,
          ajax,
          categoryId,
          topicId,
          refresh,
          offline
        });
      });
    });
  }
});
define("discourse/plugins/discourse-checklist/discourse/initializers/checklist", ["exports", "discourse/lib/plugin-api", "discourse/lib/ajax", "discourse-common/lib/icon-library", "I18n"], function (_exports, _pluginApi, _ajax, _iconLibrary, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.checklistSyntax = checklistSyntax;
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/plugin-api",0,"discourse/lib/ajax",0,"discourse-common/lib/icon-library",0,"I18n"eaimeta@70e063a35619d71f
  function initializePlugin(api) {
    const siteSettings = api.container.lookup("site-settings:main");
    if (siteSettings.checklist_enabled) {
      api.decorateCookedElement(checklistSyntax, {
        id: "checklist"
      });
    }
  }
  function removeReadonlyClass(boxes) {
    boxes.forEach(e => e.classList.remove("readonly"));
  }
  function isWhitespaceNode(node) {
    return node.nodeType === 3 && node.nodeValue.match(/^\s*$/);
  }
  function hasPrecedingContent(node) {
    let sibling = node.previousSibling;
    while (sibling) {
      if (!isWhitespaceNode(sibling)) {
        return true;
      }
      sibling = sibling.previousSibling;
    }
    return false;
  }
  function addUlClasses(boxes) {
    boxes.forEach(val => {
      let parent = val.parentElement;
      if (parent.nodeName === "P" && parent.parentElement.firstElementChild === parent) {
        parent = parent.parentElement;
      }
      if (parent.nodeName === "LI" && parent.parentElement.nodeName === "UL") {
        if (!hasPrecedingContent(val)) {
          parent.classList.add("has-checkbox");
          val.classList.add("list-item-checkbox");
          if (!val.nextSibling) {
            val.insertAdjacentHTML("afterend", "&#8203;"); // Ensure otherwise empty <li> does not collapse height
          }
        }
      }
    });
  }

  function checklistSyntax(elem, postDecorator) {
    const boxes = [...elem.getElementsByClassName("chcklst-box")];
    addUlClasses(boxes);
    if (!postDecorator) {
      return;
    }
    const postWidget = postDecorator.widget;
    const postModel = postDecorator.getModel();
    if (!postModel.can_edit) {
      return;
    }
    boxes.forEach((val, idx) => {
      val.onclick = function (ev) {
        const box = ev.currentTarget;
        const classList = box.classList;
        if (classList.contains("permanent") || classList.contains("readonly")) {
          return;
        }
        const newValue = classList.contains("checked") ? "[ ]" : "[x]";
        const template = document.createElement("template");
        template.innerHTML = (0, _iconLibrary.iconHTML)("spinner", {
          class: "fa-spin"
        });
        box.insertAdjacentElement("afterend", template.content.firstChild);
        box.classList.add("hidden");
        boxes.forEach(e => e.classList.add("readonly"));
        (0, _ajax.ajax)(`/posts/${postModel.id}`, {
          type: "GET",
          cache: false
        }).then(result => {
          const blocks = [];

          // Computing offsets where checkbox are not evaluated (i.e. inside
          // code blocks).
          [
          // inline code
          /`[^`\n]*\n?[^`\n]*`/gm,
          // multi-line code
          /^```[^]*?^```/gm,
          // bbcode
          /\[code\][^]*?\[\/code\]/gm,
          // italic/bold
          /_(?=\S).*?\S_/gm,
          // strikethrough
          /~~(?=\S).*?\S~~/gm].forEach(regex => {
            let match;
            while ((match = regex.exec(result.raw)) != null) {
              blocks.push([match.index, match.index + match[0].length]);
            }
          });
          [
          // italic/bold
          /([^\[\n]|^)\*\S.+?\S\*(?=[^\]\n]|$)/gm].forEach(regex => {
            let match;
            while ((match = regex.exec(result.raw)) != null) {
              // Simulate lookbehind - skip the first character
              blocks.push([match.index + 1, match.index + match[0].length]);
            }
          });

          // make the first run go to index = 0
          let nth = -1;
          let found = false;
          const newRaw = result.raw.replace(/\[(\s|\_|\-|\x|\\?\*)?\]/gi, (match, ignored, off) => {
            if (found) {
              return match;
            }
            nth += blocks.every(b => b[0] >= off + match.length || off > b[1]);
            if (nth === idx) {
              found = true; // Do not replace any further matches
              return newValue;
            }
            return match;
          });
          const save = postModel.save({
            raw: newRaw,
            edit_reason: _I18n.default.t("checklist.edit_reason")
          });
          if (save && save.then) {
            save.then(() => {
              postWidget.attrs.isSaving = false;
              postWidget.scheduleRerender();
            }).finally(() => removeReadonlyClass(boxes));
          } else {
            removeReadonlyClass(boxes);
          }
        }).catch(() => removeReadonlyClass(boxes));
      };
    });
  }
  var _default = {
    name: "checklist",
    initialize: function () {
      (0, _pluginApi.withPluginApi)("0.1", api => initializePlugin(api));
    }
  };
  _exports.default = _default;
});
define("discourse/lib/sidebar/base-custom-sidebar-section", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  /**
   * Base class representing a sidebar section header interface.
   */
  class BaseCustomSidebarSection {
    constructor() {
      let {
        sidebar
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.sidebar = sidebar;
    }

    /**
     * @returns {string} The name of the section header. Needs to be dasherized and lowercase.
     */
    get name() {
      this._notImplemented();
    }

    /**
     * @returns {string} Text for the header
     */
    get text() {
      this._notImplemented();
    }

    /**
     * @returns {Array} Actions for header options button
     */
    get actions() {}

    /**
     * @returns {string} Icon for dropdown header options button
     */
    get actionsIcon() {}

    /**
     * @returns {BaseCustomSidebarSectionLink[]} Links for section
     */
    get links() {}

    /**
     * @returns {Boolean} Whether or not to show the entire section including heading.
     */
    get displaySection() {
      return true;
    }
    _notImplemented() {
      throw "not implemented";
    }
  }
  _exports.default = BaseCustomSidebarSection;
});
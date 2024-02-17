define("discourse/lib/sidebar/custom-community-section-links", ["exports", "discourse/lib/sidebar/base-community-section-link", "discourse/lib/sidebar/route-info-helper"], function (_exports, _baseCommunitySectionLink, _routeInfoHelper) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.addSectionLink = addSectionLink;
  _exports.customSectionLinks = void 0;
  _exports.resetDefaultSectionLinks = resetDefaultSectionLinks;
  _exports.secondaryCustomSectionLinks = void 0;
  0; //eaimeta@70e063a35619d71f0,"discourse/lib/sidebar/base-community-section-link",0,"discourse/lib/sidebar/route-info-helper"eaimeta@70e063a35619d71f
  let customSectionLinks = [];
  _exports.customSectionLinks = customSectionLinks;
  let secondaryCustomSectionLinks = [];

  /**
   * Appends an additional section link to the Community section under the "More..." links drawer.
   *
   * @callback addSectionLinkCallback
   * @param {BaseCommunitySectionLink} baseCommunitySectionLink Factory class to inherit from.
   * @returns {BaseCommunitySectionLink} A class that extends BaseCommunitySectionLink.
   *
   * @param {(addSectionLinkCallback|Object)} args - A callback function or an Object.
   * @param {string} args.name - The name of the link. Needs to be dasherized and lowercase.
   * @param {string=} args.route - The Ember route name to generate the href attribute for the link.
   * @param {string=} args.href - The href attribute for the link.
   * @param {string=} args.title - The title attribute for the link.
   * @param {string} args.text - The text to display for the link.
   * @param {Boolean} [secondary] - Determines whether the section link should be added to the main or secondary section in the "More..." links drawer.
   */
  _exports.secondaryCustomSectionLinks = secondaryCustomSectionLinks;
  function addSectionLink(args, secondary) {
    const links = secondary ? secondaryCustomSectionLinks : customSectionLinks;
    if (typeof args === "function") {
      links.push(args.call(this, _baseCommunitySectionLink.default));
    } else {
      const klass = class extends _baseCommunitySectionLink.default {
        constructor() {
          super(...arguments);
          if (args.href) {
            this.routeInfoHelper = new _routeInfoHelper.default(this.router, args.href);
          }
        }
        get name() {
          return args.name;
        }
        get route() {
          if (args.href) {
            return this.routeInfoHelper.route;
          } else {
            return args.route;
          }
        }
        get models() {
          if (args.href) {
            return this.routeInfoHelper.models;
          }
        }
        get query() {
          if (args.href) {
            return this.routeInfoHelper.query;
          }
        }
        get text() {
          return args.text;
        }
        get title() {
          return args.title;
        }
      };
      links.push(klass);
    }
  }
  function resetDefaultSectionLinks() {
    customSectionLinks.length = 0;
    secondaryCustomSectionLinks.length = 0;
  }
});
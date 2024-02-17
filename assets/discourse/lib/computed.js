define("discourse/lib/computed", ["exports", "I18n", "@ember/object", "discourse-common/lib/get-url", "@ember/template"], function (_exports, _I18n, _object, _getUrl, _template) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.endWith = endWith;
  _exports.fmt = fmt;
  _exports.htmlSafe = htmlSafe;
  _exports.i18n = i18n;
  _exports.propertyEqual = propertyEqual;
  _exports.propertyGreaterThan = propertyGreaterThan;
  _exports.propertyLessThan = propertyLessThan;
  _exports.propertyNotEqual = propertyNotEqual;
  _exports.setting = setting;
  _exports.url = url;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"@ember/object",0,"discourse-common/lib/get-url",0,"@ember/template"eaimeta@70e063a35619d71f
  function addonFmt(str, formats) {
    let cachedFormats = formats;
    if (!Array.isArray(cachedFormats) || arguments.length > 2) {
      cachedFormats = new Array(arguments.length - 1);
      for (let i = 1, l = arguments.length; i < l; i++) {
        cachedFormats[i - 1] = arguments[i];
      }
    }

    // first, replace any ORDERED replacements.
    let idx = 0; // the current index for non-numerical replacements
    return str.replace(/%@([0-9]+)?/g, function (s, argIndex) {
      argIndex = argIndex ? parseInt(argIndex, 10) - 1 : idx++;
      s = cachedFormats[argIndex];
      return typeof s === "string" ? s : s === null ? "(null)" : s === undefined ? "" : "" + s;
    });
  }
  /**
    Returns whether two properties are equal to each other.
  
    @method propertyEqual
    @params {String} p1 the first property
    @params {String} p2 the second property
    @return {Function} discourseComputedProperty function
  **/

  function propertyEqual(p1, p2) {
    return (0, _object.computed)(p1, p2, function () {
      return this.get(p1) === this.get(p2);
    });
  }

  /**
    Returns whether two properties are not equal to each other.
  
    @method propertyNotEqual
    @params {String} p1 the first property
    @params {String} p2 the second property
    @return {Function} discourseComputedProperty function
  **/
  function propertyNotEqual(p1, p2) {
    return (0, _object.computed)(p1, p2, function () {
      return this.get(p1) !== this.get(p2);
    });
  }
  function propertyGreaterThan(p1, p2) {
    return (0, _object.computed)(p1, p2, function () {
      return this.get(p1) > this.get(p2);
    });
  }
  function propertyLessThan(p1, p2) {
    return (0, _object.computed)(p1, p2, function () {
      return this.get(p1) < this.get(p2);
    });
  }

  /**
    Returns i18n version of a string based on a property.
  
    @method i18n
    @params {String} properties* to format
    @params {String} format the i18n format string
    @return {Function} discourseComputedProperty function
  **/
  function i18n() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const format = args.pop();
    return (0, _object.computed)(...args, function () {
      return _I18n.default.t(addonFmt(format, ...args.map(a => this.get(a))));
    });
  }
  /**
    Returns htmlSafe version of a string.
  
    @method htmlSafe
    @params {String} properties* to htmlify
    @return {Function} discourseComputedProperty function
  **/
  function htmlSafe() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return (0, _object.computed)(...args, {
      get() {
        const path = args.pop();
        return (0, _template.htmlSafe)(this.get(path));
      }
    });
  }

  /**
    Uses an Ember String `fmt` call to format a string. See:
    http://emberjs.com/api/classes/Ember.String.html#method_fmt
  
    @method fmt
    @params {String} properties* to format
    @params {String} format the format string
    @return {Function} discourseComputedProperty function
  **/
  function fmt() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    const format = args.pop();
    return (0, _object.computed)(...args, function () {
      return addonFmt(format, ...args.map(a => this.get(a)));
    });
  }

  /**
    Creates a URL using getURL. It takes a fmt string just like
    fmt does.
  
    @method url
    @params {String} properties* to format
    @params {String} format the format string for the URL
    @return {Function} discourseComputedProperty function returning a URL
  **/
  function url() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    const format = args.pop();
    return (0, _object.computed)(...args, function () {
      return (0, _getUrl.default)(addonFmt(format, ...args.map(a => this.get(a))));
    });
  }

  /**
    Returns whether properties end with a string
  
    @method endWith
    @params {String} properties* to check
    @params {String} substring the substring
    @return {Function} discourseComputedProperty function
  **/
  function endWith() {
    const args = Array.prototype.slice.call(arguments, 0);
    const substring = args.pop();
    return (0, _object.computed)(...args, function () {
      return args.map(a => this.get(a)).every(s => {
        const position = s.length - substring.length,
          lastIndex = s.lastIndexOf(substring);
        return lastIndex !== -1 && lastIndex === position;
      });
    });
  }

  /**
    Creates a property from a SiteSetting. In the future the plan is for them to
    be able to update when changed.
  
    @method setting
    @param {String} name of site setting
  **/
  function setting(name) {
    return (0, _object.computed)(function () {
      return this.siteSettings[name];
    });
  }
});
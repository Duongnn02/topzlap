define("discourse/plugins/discourse-local-dates/lib/local-date-markup-generator", ["exports", "@ember/utils"], function (_exports, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = generateDateMarkup;
  0; //eaimeta@70e063a35619d71f0,"@ember/utils"eaimeta@70e063a35619d71f
  function generateDateMarkup(fromDateTime, options, isRange, toDateTime) {
    let text = ``;
    if (isRange) {
      let from = [fromDateTime.date, fromDateTime.time].filter(element => !(0, _utils.isEmpty)(element)).join("T");
      let to = [toDateTime.date, toDateTime.time].filter(element => !(0, _utils.isEmpty)(element)).join("T");
      text += `[date-range from=${from} to=${to}`;
    } else {
      text += `[date=${fromDateTime.date}`;
    }
    if (fromDateTime.time && !isRange) {
      text += ` time=${fromDateTime.time}`;
    }
    if (fromDateTime.format && fromDateTime.format.length) {
      text += ` format="${fromDateTime.format}"`;
    }
    if (options.timezone) {
      text += ` timezone="${options.timezone}"`;
    }
    if (options.countdown) {
      text += ` countdown="${options.countdown}"`;
    }
    if (options.displayedTimezone) {
      text += ` displayedTimezone="${options.displayedTimezone}"`;
    }
    if (options.timezones && options.timezones.length) {
      if (Array.isArray(options.timezones)) {
        text += ` timezones="${options.timezones.join("|")}"`;
      } else {
        text += ` timezones="${options.timezones}"`;
      }
    }
    if (options.recurring && !isRange) {
      text += ` recurring="${options.recurring}"`;
    }
    text += `]`;
    return text;
  }
});
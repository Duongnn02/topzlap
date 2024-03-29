define("select-kit/mixins/utils", ["exports", "@ember/object/mixin", "@ember/object"], function (_exports, _mixin, _object) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"@ember/object/mixin",0,"@ember/object"eaimeta@70e063a35619d71f
  var _default = _mixin.default.create({
    isValidInput(eventKey) {
      // relying on passing the event to the input is risky as it could not work
      // dispatching the event won't work as the event won't be trusted
      // safest solution is to filter event and prefill filter with it
      const nonInputKeysRegex = /F\d+|Arrow.+|Meta|Alt|Control|Shift|Delete|Enter|Escape|Tab|Space|Insert|Backspace/;
      return !nonInputKeysRegex.test(eventKey);
    },
    defaultItem(value, name) {
      if (this.selectKit.valueProperty) {
        const item = {};
        item[this.selectKit.valueProperty] = value;
        item[this.selectKit.nameProperty] = name;
        return item;
      } else {
        return name || value;
      }
    },
    itemForValue(value, content) {
      if (this.selectKit.valueProperty) {
        return content.findBy(this.selectKit.valueProperty, value);
      } else {
        return value;
      }
    },
    getProperty(item, property) {
      let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        definedOnly: true
      };
      const {
        definedOnly
      } = options;
      if (item && typeof property === "string") {
        const attempt = (0, _object.get)(item, property);
        if (attempt) {
          return attempt;
        }
      }
      property = (0, _object.get)(this.selectKit, property);
      if (!item) {
        return null;
      }
      if (!property && definedOnly) {
        return null;
      } else if (!property) {
        return item;
      } else if (typeof property === "string") {
        return (0, _object.get)(item, property);
      } else {
        return property(item);
      }
    },
    getValue(item) {
      return this.getProperty(item, "valueProperty", {
        definedOnly: false
      });
    },
    getName(item) {
      return this.getProperty(item, "nameProperty", {
        definedOnly: false
      });
    },
    findValue(content, item) {
      return this._findInContent(content, item, "valueProperty", "getValue");
    },
    findName(content, item) {
      return this._findInContent(content, item, "nameProperty", "getName");
    },
    _findInContent(content, item, type, getter) {
      const property = (0, _object.get)(this.selectKit, type);
      if (!property) {
        if (content.includes(item)) {
          return item;
        }
      } else if (typeof property === "string") {
        return content.findBy(property, this[getter](item));
      } else {
        const name = this[getter](item);
        return content.find(contentItem => {
          return this[getter](contentItem) === name;
        });
      }
    },
    _isNumeric(input) {
      return !isNaN(parseFloat(input)) && isFinite(input);
    },
    _normalize(input) {
      if (input) {
        input = input.toLowerCase();
        if (typeof input.normalize === "function") {
          input = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        }
      }
      return input;
    }
  });
  _exports.default = _default;
});
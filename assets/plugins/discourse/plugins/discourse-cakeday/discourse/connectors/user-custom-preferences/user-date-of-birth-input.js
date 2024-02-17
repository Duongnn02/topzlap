define("discourse/plugins/discourse-cakeday/discourse/connectors/user-custom-preferences/user-date-of-birth-input", ["exports"], function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71feaimeta@70e063a35619d71f
  var _default = {
    setupComponent(_ref, component) {
      let {
        model
      } = _ref;
      const {
        birthdate
      } = model;
      const months = moment.months().map((month, index) => {
        return {
          name: month,
          value: index + 1
        };
      });
      const days = [...Array(31).keys()].map(d => (d + 1).toString());
      const month = birthdate ? moment(birthdate, "YYYY-MM-DD").month() + 1 : null;
      const day = birthdate ? moment(birthdate, "YYYY-MM-DD").date().toString() : null;
      component.setProperties({
        months,
        days,
        month,
        day
      });
      const updateBirthdate = () => {
        let date = "";
        if (component.month && component.day) {
          date = `1904-${component.month}-${component.day}`;
        }

        // The property that is being serialized when sending the update
        // request to the server is called `date_of_birth`
        model.set("date_of_birth", date);
      };
      component.addObserver("month", updateBirthdate);
      component.addObserver("day", updateBirthdate);
    }
  };
  _exports.default = _default;
});
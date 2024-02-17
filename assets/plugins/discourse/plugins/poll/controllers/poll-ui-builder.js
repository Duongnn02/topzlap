define("discourse/plugins/poll/controllers/poll-ui-builder", ["exports", "@ember/controller", "@ember/object", "@ember/object/computed", "@ember/runloop", "discourse-common/utils/decorators", "discourse/mixins/modal-functionality", "I18n"], function (_exports, _controller, _object, _computed, _runloop, _decorators, _modalFunctionality, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _exports.REGULAR_POLL_TYPE = _exports.PIE_CHART_TYPE = _exports.NUMBER_POLL_TYPE = _exports.MULTIPLE_POLL_TYPE = _exports.BAR_CHART_TYPE = void 0;
  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/controller",0,"@ember/object",0,"@ember/object/computed",0,"@ember/runloop",0,"discourse-common/utils/decorators",0,"discourse/mixins/modal-functionality",0,"I18n"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  const BAR_CHART_TYPE = "bar";
  _exports.BAR_CHART_TYPE = BAR_CHART_TYPE;
  const PIE_CHART_TYPE = "pie";
  _exports.PIE_CHART_TYPE = PIE_CHART_TYPE;
  const REGULAR_POLL_TYPE = "regular";
  _exports.REGULAR_POLL_TYPE = REGULAR_POLL_TYPE;
  const NUMBER_POLL_TYPE = "number";
  _exports.NUMBER_POLL_TYPE = NUMBER_POLL_TYPE;
  const MULTIPLE_POLL_TYPE = "multiple";
  _exports.MULTIPLE_POLL_TYPE = MULTIPLE_POLL_TYPE;
  const ALWAYS_POLL_RESULT = "always";
  const VOTE_POLL_RESULT = "on_vote";
  const CLOSED_POLL_RESULT = "on_close";
  const STAFF_POLL_RESULT = "staff_only";
  var _default = _controller.default.extend(_modalFunctionality.default, (_dec = (0, _decorators.default)("pollType"), _dec2 = (0, _decorators.default)("pollType"), _dec3 = (0, _decorators.default)("pollType"), _dec4 = (0, _decorators.default)("pollOptions.@each.value"), _dec5 = (0, _decorators.default)("site.groups"), _dec6 = (0, _decorators.default)("chartType", "pollType"), _dec7 = (0, _decorators.observes)("pollType", "pollOptionsCount"), _dec8 = (0, _decorators.default)("pollType", "pollResult", "publicPoll", "pollTitle", "pollOptions.@each.value", "pollMin", "pollMax", "pollStep", "pollGroups", "pollAutoClose", "chartType"), _dec9 = (0, _decorators.default)("isNumber", "pollOptionsCount"), _dec10 = (0, _decorators.default)("pollOptions.@each.value"), _dec11 = (0, _decorators.default)("isMultiple", "pollOptionsCount", "isNumber", "pollMin", "pollMax", "pollStep"), _dec12 = (0, _decorators.default)("minMaxValueValidation", "minNumOfOptionsValidation"), (_obj = {
    showAdvanced: false,
    pollType: REGULAR_POLL_TYPE,
    pollTitle: "",
    pollOptions: null,
    pollOptionsText: null,
    pollMin: 1,
    pollMax: 2,
    pollStep: 1,
    pollGroups: null,
    pollAutoClose: null,
    pollResult: ALWAYS_POLL_RESULT,
    chartType: BAR_CHART_TYPE,
    publicPoll: null,
    onShow() {
      this.setProperties({
        showAdvanced: false,
        pollType: REGULAR_POLL_TYPE,
        pollTitle: null,
        pollOptions: [_object.default.create({
          value: ""
        })],
        pollOptionsText: "",
        pollMin: 1,
        pollMax: 2,
        pollStep: 1,
        pollGroups: null,
        pollAutoClose: null,
        pollResult: ALWAYS_POLL_RESULT,
        chartType: BAR_CHART_TYPE,
        publicPoll: false
      });
    },
    pollResults() {
      const options = [{
        name: _I18n.default.t("poll.ui_builder.poll_result.always"),
        value: ALWAYS_POLL_RESULT
      }, {
        name: _I18n.default.t("poll.ui_builder.poll_result.vote"),
        value: VOTE_POLL_RESULT
      }, {
        name: _I18n.default.t("poll.ui_builder.poll_result.closed"),
        value: CLOSED_POLL_RESULT
      }];
      if (this.get("currentUser.staff")) {
        options.push({
          name: _I18n.default.t("poll.ui_builder.poll_result.staff"),
          value: STAFF_POLL_RESULT
        });
      }
      return options;
    },
    isRegular(pollType) {
      return pollType === REGULAR_POLL_TYPE;
    },
    isNumber(pollType) {
      return pollType === NUMBER_POLL_TYPE;
    },
    isMultiple(pollType) {
      return pollType === MULTIPLE_POLL_TYPE;
    },
    showNumber: (0, _computed.or)("showAdvanced", "isNumber"),
    pollOptionsCount(pollOptions) {
      return (pollOptions || []).filter(option => option.value.length > 0).length;
    },
    siteGroups(groups) {
      // prevents group "everyone" to be listed
      return groups.filter(g => g.id !== 0);
    },
    isPie(chartType, pollType) {
      return pollType !== NUMBER_POLL_TYPE && chartType === PIE_CHART_TYPE;
    },
    canRemoveOption: (0, _computed.gt)("pollOptions.length", 1),
    _setPollMinMax() {
      if (this.isMultiple) {
        if (this.pollMin <= 0 || this.pollMin >= this.pollMax || this.pollMin >= this.pollOptionsCount) {
          this.set("pollMin", this.pollOptionsCount > 0 ? 1 : 0);
        }
        if (this.pollMax <= 0 || this.pollMin >= this.pollMax || this.pollMax > this.pollOptionsCount) {
          this.set("pollMax", this.pollOptionsCount);
        }
      } else if (this.isNumber) {
        this.set("pollMax", this.siteSettings.poll_maximum_options);
      }
    },
    pollOutput(pollType, pollResult, publicPoll, pollTitle, pollOptions, pollMin, pollMax, pollStep, pollGroups, pollAutoClose, chartType) {
      let pollHeader = "[poll";
      let output = "";
      const match = this.toolbarEvent.getText().match(/\[poll(\s+name=[^\s\]]+)*.*\]/gim);
      if (match) {
        pollHeader += ` name=poll${match.length + 1}`;
      }
      let step = pollStep;
      if (step < 1) {
        step = 1;
      }
      if (pollType) {
        pollHeader += ` type=${pollType}`;
      }
      if (pollResult) {
        pollHeader += ` results=${pollResult}`;
      }
      if (pollMin && pollType !== REGULAR_POLL_TYPE) {
        pollHeader += ` min=${pollMin}`;
      }
      if (pollMax && pollType !== REGULAR_POLL_TYPE) {
        pollHeader += ` max=${pollMax}`;
      }
      if (pollType === NUMBER_POLL_TYPE) {
        pollHeader += ` step=${step}`;
      }
      if (publicPoll) {
        pollHeader += ` public=true`;
      }
      if (chartType && pollType !== NUMBER_POLL_TYPE) {
        pollHeader += ` chartType=${chartType}`;
      }
      if (pollGroups && pollGroups.length > 0) {
        pollHeader += ` groups=${pollGroups}`;
      }
      if (pollAutoClose) {
        pollHeader += ` close=${pollAutoClose.toISOString()}`;
      }
      pollHeader += "]";
      output += `${pollHeader}\n`;
      if (pollTitle) {
        output += `# ${pollTitle.trim()}\n`;
      }
      if (pollOptions.length > 0 && pollType !== NUMBER_POLL_TYPE) {
        pollOptions.forEach(option => {
          if (option.value.length > 0) {
            output += `* ${option.value.trim()}\n`;
          }
        });
      }
      output += "[/poll]\n";
      return output;
    },
    minNumOfOptionsValidation(isNumber, pollOptionsCount) {
      let options = {
        ok: true
      };
      if (!isNumber) {
        if (pollOptionsCount < 1) {
          return _object.default.create({
            failed: true,
            reason: _I18n.default.t("poll.ui_builder.help.options_min_count")
          });
        }
        if (pollOptionsCount > this.siteSettings.poll_maximum_options) {
          return _object.default.create({
            failed: true,
            reason: _I18n.default.t("poll.ui_builder.help.options_max_count", {
              count: this.siteSettings.poll_maximum_options
            })
          });
        }
      }
      return _object.default.create(options);
    },
    showMinNumOfOptionsValidation(pollOptions) {
      return pollOptions.length !== 1 || pollOptions[0].value !== "";
    },
    minMaxValueValidation(isMultiple, pollOptionsCount, isNumber, pollMin, pollMax, pollStep) {
      pollMin = parseInt(pollMin, 10) || 0;
      pollMax = parseInt(pollMax, 10) || 0;
      pollStep = parseInt(pollStep, 10) || 0;
      if (pollMin < 0) {
        return _object.default.create({
          failed: true,
          reason: _I18n.default.t("poll.ui_builder.help.invalid_min_value")
        });
      }
      if (pollMax < 0 || isMultiple && pollMax > pollOptionsCount) {
        return _object.default.create({
          failed: true,
          reason: _I18n.default.t("poll.ui_builder.help.invalid_max_value")
        });
      }
      if (pollMin > pollMax) {
        return _object.default.create({
          failed: true,
          reason: _I18n.default.t("poll.ui_builder.help.invalid_values")
        });
      }
      if (isNumber) {
        if (pollStep < 1) {
          return _object.default.create({
            failed: true,
            reason: _I18n.default.t("poll.ui_builder.help.min_step_value")
          });
        }
        const optionsCount = (pollMax - pollMin + 1) / pollStep;
        if (optionsCount < 1) {
          return _object.default.create({
            failed: true,
            reason: _I18n.default.t("poll.ui_builder.help.options_min_count")
          });
        }
        if (optionsCount > this.siteSettings.poll_maximum_options) {
          return _object.default.create({
            failed: true,
            reason: _I18n.default.t("poll.ui_builder.help.options_max_count", {
              count: this.siteSettings.poll_maximum_options
            })
          });
        }
      }
      return _object.default.create({
        ok: true
      });
    },
    disableInsert(minMaxValueValidation, minNumOfOptionsValidation) {
      return !minMaxValueValidation.ok || !minNumOfOptionsValidation.ok;
    },
    _comboboxOptions(startIndex, endIndex) {
      return [...Array(endIndex - startIndex).keys()].map(number => ({
        value: number + startIndex,
        name: number + startIndex
      }));
    },
    onOptionsTextChange(e) {
      let idx = 0;
      this.set("pollOptions", e.target.value.split("\n").map(value => _object.default.create({
        idx: idx++,
        value
      })));
    },
    insertPoll() {
      this.toolbarEvent.addText(this.pollOutput);
      this.send("closeModal");
    },
    toggleAdvanced() {
      this.toggleProperty("showAdvanced");
      if (this.showAdvanced) {
        this.set("pollOptionsText", this.pollOptions.map(x => x.value).join("\n"));
      }
    },
    addOption(beforeOption, value, e) {
      if (value !== "") {
        const idx = this.pollOptions.indexOf(beforeOption) + 1;
        const option = _object.default.create({
          value: ""
        });
        this.pollOptions.insertAt(idx, option);
        let lastOptionIdx = 0;
        this.pollOptions.forEach(o => o.set("idx", lastOptionIdx++));
        (0, _runloop.next)(() => {
          const pollOptions = document.getElementsByClassName("poll-options");
          if (pollOptions) {
            const inputs = pollOptions[0].getElementsByTagName("input");
            if (option.idx < inputs.length) {
              inputs[option.idx].focus();
            }
          }
        });
      }
      if (e) {
        e.preventDefault();
      }
    },
    removeOption(option) {
      this.pollOptions.removeObject(option);
    },
    updatePollType(pollType, event) {
      event?.preventDefault();
      this.set("pollType", pollType);
    }
  }, (_applyDecoratedDescriptor(_obj, "pollResults", [_decorators.default], Object.getOwnPropertyDescriptor(_obj, "pollResults"), _obj), _applyDecoratedDescriptor(_obj, "isRegular", [_dec], Object.getOwnPropertyDescriptor(_obj, "isRegular"), _obj), _applyDecoratedDescriptor(_obj, "isNumber", [_dec2], Object.getOwnPropertyDescriptor(_obj, "isNumber"), _obj), _applyDecoratedDescriptor(_obj, "isMultiple", [_dec3], Object.getOwnPropertyDescriptor(_obj, "isMultiple"), _obj), _applyDecoratedDescriptor(_obj, "pollOptionsCount", [_dec4], Object.getOwnPropertyDescriptor(_obj, "pollOptionsCount"), _obj), _applyDecoratedDescriptor(_obj, "siteGroups", [_dec5], Object.getOwnPropertyDescriptor(_obj, "siteGroups"), _obj), _applyDecoratedDescriptor(_obj, "isPie", [_dec6], Object.getOwnPropertyDescriptor(_obj, "isPie"), _obj), _applyDecoratedDescriptor(_obj, "_setPollMinMax", [_dec7], Object.getOwnPropertyDescriptor(_obj, "_setPollMinMax"), _obj), _applyDecoratedDescriptor(_obj, "pollOutput", [_dec8], Object.getOwnPropertyDescriptor(_obj, "pollOutput"), _obj), _applyDecoratedDescriptor(_obj, "minNumOfOptionsValidation", [_dec9], Object.getOwnPropertyDescriptor(_obj, "minNumOfOptionsValidation"), _obj), _applyDecoratedDescriptor(_obj, "showMinNumOfOptionsValidation", [_dec10], Object.getOwnPropertyDescriptor(_obj, "showMinNumOfOptionsValidation"), _obj), _applyDecoratedDescriptor(_obj, "minMaxValueValidation", [_dec11], Object.getOwnPropertyDescriptor(_obj, "minMaxValueValidation"), _obj), _applyDecoratedDescriptor(_obj, "disableInsert", [_dec12], Object.getOwnPropertyDescriptor(_obj, "disableInsert"), _obj), _applyDecoratedDescriptor(_obj, "onOptionsTextChange", [_object.action], Object.getOwnPropertyDescriptor(_obj, "onOptionsTextChange"), _obj), _applyDecoratedDescriptor(_obj, "insertPoll", [_object.action], Object.getOwnPropertyDescriptor(_obj, "insertPoll"), _obj), _applyDecoratedDescriptor(_obj, "toggleAdvanced", [_object.action], Object.getOwnPropertyDescriptor(_obj, "toggleAdvanced"), _obj), _applyDecoratedDescriptor(_obj, "addOption", [_object.action], Object.getOwnPropertyDescriptor(_obj, "addOption"), _obj), _applyDecoratedDescriptor(_obj, "removeOption", [_object.action], Object.getOwnPropertyDescriptor(_obj, "removeOption"), _obj), _applyDecoratedDescriptor(_obj, "updatePollType", [_object.action], Object.getOwnPropertyDescriptor(_obj, "updatePollType"), _obj)), _obj)));
  _exports.default = _default;
});
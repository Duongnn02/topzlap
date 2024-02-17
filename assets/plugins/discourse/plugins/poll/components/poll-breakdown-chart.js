define("discourse/plugins/poll/components/poll-breakdown-chart", ["exports", "@ember/component", "I18n", "discourse/plugins/poll/controllers/poll-ui-builder", "discourse-common/utils/decorators", "discourse/plugins/poll/lib/chart-colors", "@ember/template", "@ember/object/computed", "@ember/runloop"], function (_exports, _component, _I18n, _pollUiBuilder, _decorators, _chartColors, _template, _computed, _runloop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _dec, _dec2, _obj;
  0; //eaimeta@70e063a35619d71f0,"@ember/component",0,"I18n",0,"discourse/plugins/poll/controllers/poll-ui-builder",0,"discourse-common/utils/decorators",0,"discourse/plugins/poll/lib/chart-colors",0,"@ember/template",0,"@ember/object/computed",0,"@ember/runloop"eaimeta@70e063a35619d71f
  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
  var _default = _component.default.extend((_dec = (0, _decorators.default)("optionColors", "index"), _dec2 = (0, _decorators.default)("data", "displayMode"), (_obj = {
    // Arguments:
    group: null,
    options: null,
    displayMode: null,
    highlightedOption: null,
    setHighlightedOption: null,
    classNames: "poll-breakdown-chart-container",
    _optionToSlice: null,
    _previousHighlightedSliceIndex: null,
    _previousDisplayMode: null,
    data: (0, _computed.mapBy)("options", "votes"),
    init() {
      this._super(...arguments);
      this._optionToSlice = {};
    },
    didInsertElement() {
      this._super(...arguments);
      const canvas = this.element.querySelector("canvas");
      this._chart = new window.Chart(canvas.getContext("2d"), this.chartConfig);
    },
    didReceiveAttrs() {
      this._super(...arguments);
      if (this._chart) {
        this._updateDisplayMode();
        this._updateHighlight();
      }
    },
    willDestroy() {
      this._super(...arguments);
      if (this._chart) {
        this._chart.destroy();
      }
    },
    colorStyle(optionColors, index) {
      return (0, _template.htmlSafe)(`background: ${optionColors[index]};`);
    },
    chartConfig(data, displayMode) {
      const transformedData = [];
      let counter = 0;
      this._optionToSlice = {};
      data.forEach((votes, index) => {
        if (votes > 0) {
          transformedData.push(votes);
          this._optionToSlice[index] = counter++;
        }
      });
      const totalVotes = transformedData.reduce((sum, votes) => sum + votes, 0);
      const colors = (0, _chartColors.getColors)(data.length).filter((color, index) => data[index] > 0);
      return {
        type: _pollUiBuilder.PIE_CHART_TYPE,
        plugins: [window.ChartDataLabels],
        data: {
          datasets: [{
            data: transformedData,
            backgroundColor: colors,
            // TODO: It's a workaround for Chart.js' terrible hover styling.
            // It will break on non-white backgrounds.
            // Should be updated after #10341 lands
            hoverBorderColor: "#fff"
          }]
        },
        options: {
          plugins: {
            tooltip: false,
            datalabels: {
              color: "#333",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              borderRadius: 2,
              font: {
                family: getComputedStyle(document.body).fontFamily,
                size: 16
              },
              padding: {
                top: 2,
                right: 6,
                bottom: 2,
                left: 6
              },
              formatter(votes) {
                if (displayMode !== "percentage") {
                  return votes;
                }
                const percent = _I18n.default.toNumber(votes / totalVotes * 100.0, {
                  precision: 1
                });
                return `${percent}%`;
              }
            }
          },
          responsive: true,
          aspectRatio: 1.1,
          animation: {
            duration: 0
          },
          // wrapping setHighlightedOption in next block as hover can create many events
          // prevents two sets to happen in the same computation
          onHover: (event, activeElements) => {
            if (!activeElements.length) {
              (0, _runloop.next)(() => {
                this.setHighlightedOption(null);
              });
              return;
            }
            const sliceIndex = activeElements[0]._index;
            const optionIndex = Object.keys(this._optionToSlice).find(option => this._optionToSlice[option] === sliceIndex);

            // Clear the array to avoid issues in Chart.js
            activeElements.length = 0;
            (0, _runloop.next)(() => {
              this.setHighlightedOption(Number(optionIndex));
            });
          }
        }
      };
    },
    _updateDisplayMode() {
      if (this.displayMode !== this._previousDisplayMode) {
        const config = this.chartConfig;
        this._chart.data.datasets = config.data.datasets;
        this._chart.options = config.options;
        this._chart.update();
        this._previousDisplayMode = this.displayMode;
      }
    },
    _updateHighlight() {
      const meta = this._chart.getDatasetMeta(0);
      if (this._previousHighlightedSliceIndex !== null) {
        const slice = meta.data[this._previousHighlightedSliceIndex];
        meta.controller.removeHoverStyle(slice);
        this._chart.draw();
      }
      if (this.highlightedOption === null) {
        this._previousHighlightedSliceIndex = null;
        return;
      }
      const sliceIndex = this._optionToSlice[this.highlightedOption];
      if (typeof sliceIndex === "undefined") {
        this._previousHighlightedSliceIndex = null;
        return;
      }
      const slice = meta.data[sliceIndex];
      this._previousHighlightedSliceIndex = sliceIndex;
      meta.controller.setHoverStyle(slice);
      this._chart.draw();
    }
  }, (_applyDecoratedDescriptor(_obj, "colorStyle", [_dec], Object.getOwnPropertyDescriptor(_obj, "colorStyle"), _obj), _applyDecoratedDescriptor(_obj, "chartConfig", [_dec2], Object.getOwnPropertyDescriptor(_obj, "chartConfig"), _obj)), _obj)));
  _exports.default = _default;
});
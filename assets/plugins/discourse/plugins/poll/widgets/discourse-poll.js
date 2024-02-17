define("discourse/plugins/poll/widgets/discourse-poll", ["exports", "I18n", "discourse/plugins/poll/controllers/poll-ui-builder", "discourse/widgets/raw-html", "discourse/lib/ajax", "discourse/widgets/post", "discourse/widgets/widget", "discourse/plugins/poll/lib/even-round", "discourse/plugins/poll/lib/chart-colors", "virtual-dom", "discourse-common/lib/icon-library", "discourse/lib/load-script", "discourse/lib/ajax-error", "discourse/lib/formatter", "discourse/lib/round", "discourse/lib/show-modal", "discourse/lib/local-dates"], function (_exports, _I18n, _pollUiBuilder, _rawHtml, _ajax, _post, _widget, _evenRound, _chartColors, _virtualDom, _iconLibrary, _loadScript, _ajaxError, _formatter, _round, _showModal, _localDates) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  0; //eaimeta@70e063a35619d71f0,"I18n",0,"discourse/plugins/poll/controllers/poll-ui-builder",0,"discourse/widgets/raw-html",0,"discourse/lib/ajax",0,"discourse/widgets/post",0,"discourse/widgets/widget",0,"discourse/plugins/poll/lib/even-round",0,"discourse/plugins/poll/lib/chart-colors",0,"virtual-dom",0,"discourse-common/lib/icon-library",0,"discourse/lib/load-script",0,"discourse/lib/ajax-error",0,"discourse/lib/formatter",0,"discourse/lib/round",0,"discourse/lib/show-modal",0,"discourse/lib/local-dates"eaimeta@70e063a35619d71f
  const FETCH_VOTERS_COUNT = 25;
  function optionHtml(option) {
    let siteSettings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const el = document.createElement("span");
    el.innerHTML = option.html;
    (0, _localDates.applyLocalDates)(el.querySelectorAll(".discourse-local-date"), siteSettings);
    return new _rawHtml.default({
      html: `<span>${el.innerHTML}</span>`
    });
  }
  function infoTextHtml(text) {
    return new _rawHtml.default({
      html: `<span class="info-text">${text}</span>`
    });
  }
  function checkUserGroups(user, poll) {
    const pollGroups = poll && poll.groups && poll.groups.split(",").map(g => g.toLowerCase());
    if (!pollGroups) {
      return true;
    }
    const userGroups = user && user.groups && user.groups.map(g => g.name.toLowerCase());
    return userGroups && pollGroups.some(g => userGroups.includes(g));
  }
  (0, _widget.createWidget)("discourse-poll-option", {
    tagName: "li",
    buildAttributes(attrs) {
      return {
        tabindex: 0,
        "data-poll-option-id": attrs.option.id
      };
    },
    html(attrs) {
      const contents = [];
      const {
        option,
        vote
      } = attrs;
      const chosen = vote.includes(option.id);
      if (attrs.isMultiple) {
        contents.push((0, _iconLibrary.iconNode)(chosen ? "far-check-square" : "far-square"));
      } else {
        contents.push((0, _iconLibrary.iconNode)(chosen ? "circle" : "far-circle"));
      }
      contents.push(" ");
      contents.push(optionHtml(option, this.siteSettings));
      return contents;
    },
    click(e) {
      if (!e.target.closest("a")) {
        this.sendWidgetAction("toggleOption", this.attrs.option);
      }
    },
    keyDown(e) {
      if (e.key === "Enter") {
        this.click(e);
      }
    }
  });
  (0, _widget.createWidget)("discourse-poll-load-more", {
    tagName: "div.poll-voters-toggle-expand",
    buildKey: attrs => `load-more-${attrs.optionId}`,
    defaultState() {
      return {
        loading: false
      };
    },
    html(attrs, state) {
      return state.loading ? (0, _virtualDom.h)("div.spinner.small") : (0, _virtualDom.h)("a", (0, _iconLibrary.iconNode)("chevron-down"));
    },
    click() {
      const {
        state,
        attrs
      } = this;
      if (state.loading) {
        return;
      }
      state.loading = true;
      return this.sendWidgetAction("fetchVoters", attrs.optionId).finally(() => state.loading = false);
    }
  });
  (0, _widget.createWidget)("discourse-poll-voters", {
    tagName: "ul.poll-voters-list",
    buildKey: attrs => `poll-voters-${attrs.optionId}`,
    html(attrs) {
      const contents = attrs.voters.map(user => (0, _virtualDom.h)("li", [(0, _post.avatarFor)("tiny", {
        username: user.username,
        template: user.avatar_template
      }), " "]));
      if (attrs.voters.length < attrs.totalVotes) {
        contents.push(this.attach("discourse-poll-load-more", attrs));
      }
      return (0, _virtualDom.h)("div.poll-voters", contents);
    }
  });
  (0, _widget.createWidget)("discourse-poll-standard-results", {
    tagName: "ul.results",
    buildKey: attrs => `poll-standard-results-${attrs.id}`,
    html(attrs) {
      const {
        poll
      } = attrs;
      const options = poll.options;
      if (options) {
        const voters = poll.voters;
        const isPublic = poll.public;
        const ordered = [...options].sort((a, b) => {
          if (a.votes < b.votes) {
            return 1;
          } else if (a.votes === b.votes) {
            if (a.html < b.html) {
              return -1;
            } else {
              return 1;
            }
          } else {
            return -1;
          }
        });
        const percentages = voters === 0 ? Array(ordered.length).fill(0) : ordered.map(o => 100 * o.votes / voters);
        const rounded = attrs.isMultiple ? percentages.map(Math.floor) : (0, _evenRound.default)(percentages);
        return ordered.map((option, idx) => {
          const contents = [];
          const per = rounded[idx].toString();
          const chosen = (attrs.vote || []).includes(option.id);
          contents.push((0, _virtualDom.h)("div.option", (0, _virtualDom.h)("p", [(0, _virtualDom.h)("span.percentage", `${per}%`), optionHtml(option, this.siteSettings)])));
          contents.push((0, _virtualDom.h)("div.bar-back", (0, _virtualDom.h)("div.bar", {
            attributes: {
              style: `width:${per}%`
            }
          })));
          if (isPublic) {
            contents.push(this.attach("discourse-poll-voters", {
              postId: attrs.post.id,
              optionId: option.id,
              pollName: poll.name,
              totalVotes: option.votes,
              voters: attrs.voters && attrs.voters[option.id] || []
            }));
          }
          return (0, _virtualDom.h)("li", {
            className: `${chosen ? "chosen" : ""}`
          }, contents);
        });
      }
    }
  });
  (0, _widget.createWidget)("discourse-poll-number-results", {
    buildKey: attrs => `poll-number-results-${attrs.id}`,
    html(attrs) {
      const {
        poll
      } = attrs;
      const totalScore = poll.options.reduce((total, o) => {
        return total + parseInt(o.html, 10) * parseInt(o.votes, 10);
      }, 0);
      const voters = poll.voters;
      const average = voters === 0 ? 0 : (0, _round.default)(totalScore / voters, -2);
      const averageRating = _I18n.default.t("poll.average_rating", {
        average
      });
      const contents = [(0, _virtualDom.h)("div.poll-results-number-rating", new _rawHtml.default({
        html: `<span>${averageRating}</span>`
      }))];
      if (poll.public) {
        contents.push(this.attach("discourse-poll-voters", {
          totalVotes: poll.voters,
          voters: attrs.voters || [],
          postId: attrs.post.id,
          pollName: poll.name,
          pollType: poll.type
        }));
      }
      return contents;
    }
  });
  (0, _widget.createWidget)("discourse-poll-container", {
    tagName: "div.poll-container",
    buildKey: attrs => `poll-container-${attrs.id}`,
    services: ["dialog"],
    defaultState() {
      return {
        voters: []
      };
    },
    html(attrs, state) {
      const {
        poll
      } = attrs;
      const options = poll.options;
      if (attrs.showResults) {
        const contents = [];
        if (attrs.titleHTML) {
          contents.push(new _rawHtml.default({
            html: attrs.titleHTML
          }));
        }
        if (poll.public) {
          state.voters = poll.preloaded_voters;
        }
        const type = poll.type === "number" ? "number" : "standard";
        const resultsWidget = type === "number" || attrs.poll.chart_type !== _pollUiBuilder.PIE_CHART_TYPE ? `discourse-poll-${type}-results` : "discourse-poll-pie-chart";
        contents.push(this.attach(resultsWidget, Object.assign({}, attrs, {
          voters: state.voters
        })));
        return contents;
      } else if (options) {
        const contents = [];
        if (attrs.titleHTML) {
          contents.push(new _rawHtml.default({
            html: attrs.titleHTML
          }));
        }
        if (!checkUserGroups(this.currentUser, poll)) {
          contents.push((0, _virtualDom.h)("div.alert.alert-danger", _I18n.default.t("poll.results.groups.title", {
            groups: poll.groups
          })));
        }
        contents.push((0, _virtualDom.h)("ul", options.map(option => {
          return this.attach("discourse-poll-option", {
            option,
            isMultiple: attrs.isMultiple,
            vote: attrs.vote
          });
        })));
        return contents;
      }
    },
    fetchVoters(optionId) {
      const {
        attrs,
        state
      } = this;
      let votersCount;
      if (optionId) {
        if (!state.voters) {
          state.voters = {};
        }
        if (!state.voters[optionId]) {
          state.voters[optionId] = [];
        }
        votersCount = state.voters[optionId].length;
      } else {
        if (!state.voters) {
          state.voters = [];
        }
        votersCount = state.voters.length;
      }
      return (0, _ajax.ajax)("/polls/voters.json", {
        data: {
          post_id: attrs.post.id,
          poll_name: attrs.poll.name,
          option_id: optionId,
          page: Math.floor(votersCount / FETCH_VOTERS_COUNT) + 1,
          limit: FETCH_VOTERS_COUNT
        }
      }).then(result => {
        const voters = optionId ? state.voters[optionId] : state.voters;
        const newVoters = optionId ? result.voters[optionId] : result.voters;
        const votersSet = new Set(voters.map(voter => voter.username));
        newVoters.forEach(voter => {
          if (!votersSet.has(voter.username)) {
            votersSet.add(voter.username);
            voters.push(voter);
          }
        });

        // remove users who changed their vote
        if (attrs.poll.type === "regular") {
          Object.keys(state.voters).forEach(otherOptionId => {
            if (optionId !== otherOptionId) {
              state.voters[otherOptionId] = state.voters[otherOptionId].filter(voter => !votersSet.has(voter.username));
            }
          });
        }
        this.scheduleRerender();
      }).catch(error => {
        if (error) {
          (0, _ajaxError.popupAjaxError)(error);
        } else {
          this.dialog.alert(_I18n.default.t("poll.error_while_fetching_voters"));
        }
      });
    }
  });
  (0, _widget.createWidget)("discourse-poll-info", {
    tagName: "div.poll-info",
    multipleHelpText(min, max, options) {
      if (max > 0) {
        if (min === max) {
          if (min > 1) {
            return _I18n.default.t("poll.multiple.help.x_options", {
              count: min
            });
          }
        } else if (min > 1) {
          if (max < options) {
            return _I18n.default.t("poll.multiple.help.between_min_and_max_options", {
              min,
              max
            });
          } else {
            return _I18n.default.t("poll.multiple.help.at_least_min_options", {
              count: min
            });
          }
        } else if (max <= options) {
          return _I18n.default.t("poll.multiple.help.up_to_max_options", {
            count: max
          });
        }
      }
    },
    html(attrs) {
      const {
        poll
      } = attrs;
      const count = poll.voters;
      const contents = [(0, _virtualDom.h)("p", [(0, _virtualDom.h)("span.info-number", count.toString()), (0, _virtualDom.h)("span.info-label", _I18n.default.t("poll.voters", {
        count
      }))])];
      if (attrs.isMultiple) {
        if (attrs.showResults || attrs.isClosed) {
          const totalVotes = poll.options.reduce((total, o) => {
            return total + parseInt(o.votes, 10);
          }, 0);
          contents.push((0, _virtualDom.h)("p", [(0, _virtualDom.h)("span.info-number", totalVotes.toString()), (0, _virtualDom.h)("span.info-label", _I18n.default.t("poll.total_votes", {
            count: totalVotes
          }))]));
        } else {
          const help = this.multipleHelpText(attrs.min, attrs.max, poll.options.length);
          if (help) {
            contents.push(infoTextHtml(help));
          }
        }
      }
      if (!attrs.isClosed && !attrs.showResults && poll.public && poll.results !== "staff_only") {
        contents.push(infoTextHtml(_I18n.default.t("poll.public.title")));
      }
      return contents;
    }
  });
  function clearPieChart(id) {
    let el = document.querySelector(`#poll-results-chart-${id}`);
    el && el.parentNode.removeChild(el);
  }
  (0, _widget.createWidget)("discourse-poll-pie-canvas", {
    tagName: "canvas.poll-results-canvas",
    init(attrs) {
      (0, _loadScript.default)("/javascripts/Chart.min.js").then(() => {
        const data = attrs.poll.options.mapBy("votes");
        const labels = attrs.poll.options.mapBy("html");
        const config = pieChartConfig(data, labels, {
          legendContainerId: `poll-results-legend-${attrs.id}`
        });
        const el = document.getElementById(`poll-results-chart-${attrs.id}`);
        // eslint-disable-next-line no-undef
        this._chart = new Chart(el.getContext("2d"), config);
      });
    },
    willRerenderWidget() {
      this._chart?.destroy();
    },
    buildAttributes(attrs) {
      return {
        id: `poll-results-chart-${attrs.id}`
      };
    }
  });
  (0, _widget.createWidget)("discourse-poll-pie-chart", {
    tagName: "div.poll-results-chart",
    html(attrs) {
      const contents = [];
      if (!attrs.showResults) {
        clearPieChart(attrs.id);
        return contents;
      }
      const chart = this.attach("discourse-poll-pie-canvas", attrs);
      contents.push(chart);
      contents.push((0, _virtualDom.h)(`ul#poll-results-legend-${attrs.id}.pie-chart-legends`));
      return contents;
    }
  });
  const htmlLegendPlugin = {
    id: "htmlLegend",
    afterUpdate(chart, args, options) {
      const ul = document.getElementById(options.containerID);
      ul.innerHTML = "";
      const items = chart.options.plugins.legend.labels.generateLabels(chart);
      items.forEach(item => {
        const li = document.createElement("li");
        li.classList.add("legend");
        li.onclick = () => {
          chart.toggleDataVisibility(item.index);
          chart.update();
        };
        const boxSpan = document.createElement("span");
        boxSpan.classList.add("swatch");
        boxSpan.style.background = item.fillStyle;
        const textContainer = document.createElement("span");
        textContainer.style.color = item.fontColor;
        textContainer.innerHTML = item.text;
        if (!chart.getDataVisibility(item.index)) {
          li.style.opacity = 0.2;
        } else {
          li.style.opacity = 1.0;
        }
        li.appendChild(boxSpan);
        li.appendChild(textContainer);
        ul.appendChild(li);
      });
    }
  };
  function pieChartConfig(data, labels) {
    let opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const aspectRatio = "aspectRatio" in opts ? opts.aspectRatio : 2.2;
    const strippedLabels = labels.map(l => stripHtml(l));
    return {
      type: _pollUiBuilder.PIE_CHART_TYPE,
      data: {
        datasets: [{
          data,
          backgroundColor: (0, _chartColors.getColors)(data.length)
        }],
        labels: strippedLabels
      },
      plugins: [htmlLegendPlugin],
      options: {
        responsive: true,
        aspectRatio,
        animation: {
          duration: 0
        },
        plugins: {
          legend: {
            labels: {
              generateLabels() {
                return labels.map((text, index) => {
                  return {
                    fillStyle: (0, _chartColors.getColors)(data.length)[index],
                    text,
                    index
                  };
                });
              }
            },
            display: false
          },
          htmlLegend: {
            containerID: opts?.legendContainerId
          }
        }
      }
    };
  }
  function stripHtml(html) {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }
  (0, _widget.createWidget)("discourse-poll-buttons", {
    tagName: "div.poll-buttons",
    html(attrs) {
      const contents = [];
      const {
        poll,
        post
      } = attrs;
      const topicArchived = post.get("topic.archived");
      const closed = attrs.isClosed;
      const staffOnly = poll.results === "staff_only";
      const isStaff = this.currentUser && this.currentUser.staff;
      const isAdmin = this.currentUser && this.currentUser.admin;
      const isMe = this.currentUser && post.user_id === this.currentUser.id;
      const dataExplorerEnabled = this.siteSettings.data_explorer_enabled;
      const hideResultsDisabled = !staffOnly && (closed || topicArchived);
      const exportQueryID = this.siteSettings.poll_export_data_explorer_query_id;
      if (attrs.isMultiple && !hideResultsDisabled) {
        const castVotesDisabled = !attrs.canCastVotes;
        contents.push(this.attach("button", {
          className: `cast-votes ${castVotesDisabled ? "btn-default" : "btn-primary"}`,
          label: "poll.cast-votes.label",
          title: "poll.cast-votes.title",
          disabled: castVotesDisabled,
          action: "castVotes"
        }));
        contents.push(" ");
      }
      if (attrs.showResults || hideResultsDisabled) {
        contents.push(this.attach("button", {
          className: "btn-default toggle-results",
          label: "poll.hide-results.label",
          title: "poll.hide-results.title",
          icon: "far-eye-slash",
          disabled: hideResultsDisabled,
          action: "toggleResults"
        }));
      } else {
        let showResultsButton;
        let infoText;
        if (poll.results === "on_vote" && !attrs.hasVoted && !isMe) {
          infoText = infoTextHtml(_I18n.default.t("poll.results.vote.title"));
        } else if (poll.results === "on_close" && !closed) {
          infoText = infoTextHtml(_I18n.default.t("poll.results.closed.title"));
        } else if (poll.results === "staff_only" && !isStaff) {
          infoText = infoTextHtml(_I18n.default.t("poll.results.staff.title"));
        } else {
          showResultsButton = this.attach("button", {
            className: "btn-default toggle-results",
            label: "poll.show-results.label",
            title: "poll.show-results.title",
            icon: "far-eye",
            disabled: poll.voters === 0,
            action: "toggleResults"
          });
        }
        if (showResultsButton) {
          contents.push(showResultsButton);
        }
        if (attrs.hasSavedVote) {
          contents.push(this.attach("button", {
            className: "btn-default remove-vote",
            label: "poll.remove-vote.label",
            title: "poll.remove-vote.title",
            icon: "trash-alt",
            action: "removeVote"
          }));
        }
        if (infoText) {
          contents.push(infoText);
        }
      }
      if (attrs.groupableUserFields.length && poll.voters > 0) {
        const button = this.attach("button", {
          className: "btn-default poll-show-breakdown",
          label: "poll.group-results.label",
          title: "poll.group-results.title",
          icon: "far-eye",
          action: "showBreakdown"
        });
        contents.push(button);
      }
      if (isAdmin && dataExplorerEnabled && poll.voters > 0 && exportQueryID) {
        contents.push(this.attach("button", {
          className: "btn btn-default export-results",
          label: "poll.export-results.label",
          title: "poll.export-results.title",
          icon: "download",
          disabled: poll.voters === 0,
          action: "exportResults"
        }));
      }
      if (poll.close) {
        const closeDate = moment(poll.close);
        if (closeDate.isValid()) {
          const title = closeDate.format("LLL");
          let label;
          if (attrs.isAutomaticallyClosed) {
            const age = (0, _formatter.relativeAge)(closeDate.toDate(), {
              addAgo: true
            });
            label = _I18n.default.t("poll.automatic_close.age", {
              age
            });
          } else {
            const timeLeft = moment().to(closeDate, true);
            label = _I18n.default.t("poll.automatic_close.closes_in", {
              timeLeft
            });
          }
          contents.push(new _rawHtml.default({
            html: `<span class="info-text" title="${title}">${label}</span>`
          }));
        }
      }
      if (this.currentUser && (this.currentUser.id === post.user_id || isStaff) && !topicArchived) {
        if (closed) {
          if (!attrs.isAutomaticallyClosed) {
            contents.push(this.attach("button", {
              className: "btn-default toggle-status",
              label: "poll.open.label",
              title: "poll.open.title",
              icon: "unlock-alt",
              action: "toggleStatus"
            }));
          }
        } else {
          contents.push(this.attach("button", {
            className: "toggle-status btn-danger",
            label: "poll.close.label",
            title: "poll.close.title",
            icon: "lock",
            action: "toggleStatus"
          }));
        }
      }
      return contents;
    }
  });
  var _default = (0, _widget.createWidget)("discourse-poll", {
    tagName: "div",
    buildKey: attrs => `poll-${attrs.id}`,
    services: ["dialog"],
    buildAttributes(attrs) {
      let cssClasses = "poll";
      if (attrs.poll.chart_type === _pollUiBuilder.PIE_CHART_TYPE) {
        cssClasses += " pie";
      }
      return {
        class: cssClasses,
        "data-poll-name": attrs.poll.name,
        "data-poll-type": attrs.poll.type
      };
    },
    defaultState(attrs) {
      const {
        poll
      } = attrs;
      const staffOnly = attrs.poll.results === "staff_only";
      const showResults = poll.results !== "on_close" && this.hasVoted() && !staffOnly;
      return {
        loading: false,
        showResults
      };
    },
    html(attrs, state) {
      const staffOnly = attrs.poll.results === "staff_only";
      const showResults = state.showResults || attrs.post.get("topic.archived") && !staffOnly || this.isClosed() && !staffOnly;
      const newAttrs = Object.assign({}, attrs, {
        canCastVotes: this.canCastVotes(),
        hasVoted: this.hasVoted(),
        isAutomaticallyClosed: this.isAutomaticallyClosed(),
        isClosed: this.isClosed(),
        isMultiple: this.isMultiple(),
        max: this.max(),
        min: this.min(),
        showResults
      });
      return (0, _virtualDom.h)("div", [this.attach("discourse-poll-container", newAttrs), this.attach("discourse-poll-info", newAttrs), this.attach("discourse-poll-buttons", newAttrs)]);
    },
    min() {
      let min = parseInt(this.attrs.poll.min, 10);
      if (isNaN(min) || min < 0) {
        min = 1;
      }
      return min;
    },
    max() {
      let max = parseInt(this.attrs.poll.max, 10);
      const numOptions = this.attrs.poll.options.length;
      if (isNaN(max) || max > numOptions) {
        max = numOptions;
      }
      return max;
    },
    isAutomaticallyClosed() {
      const {
        poll
      } = this.attrs;
      return poll.close && moment.utc(poll.close) <= moment();
    },
    isClosed() {
      const {
        poll
      } = this.attrs;
      return poll.status === "closed" || this.isAutomaticallyClosed();
    },
    isMultiple() {
      const {
        poll
      } = this.attrs;
      return poll.type === "multiple";
    },
    hasVoted() {
      const {
        vote
      } = this.attrs;
      return vote && vote.length > 0;
    },
    canCastVotes() {
      const {
        state,
        attrs
      } = this;
      if (this.isClosed() || state.showResults || state.loading) {
        return false;
      }
      const selectedOptionCount = attrs.vote.length;
      if (this.isMultiple()) {
        return selectedOptionCount >= this.min() && selectedOptionCount <= this.max();
      }
      return selectedOptionCount > 0;
    },
    toggleStatus() {
      const {
        state,
        attrs
      } = this;
      const {
        post,
        poll
      } = attrs;
      if (this.isAutomaticallyClosed()) {
        return;
      }
      this.dialog.yesNoConfirm({
        message: _I18n.default.t(this.isClosed() ? "poll.open.confirm" : "poll.close.confirm"),
        didConfirm: () => {
          state.loading = true;
          const status = this.isClosed() ? "open" : "closed";
          (0, _ajax.ajax)("/polls/toggle_status", {
            type: "PUT",
            data: {
              post_id: post.id,
              poll_name: poll.name,
              status
            }
          }).then(() => {
            poll.set("status", status);
            if (poll.results === "on_close") {
              state.showResults = status === "closed";
            }
            this.scheduleRerender();
          }).catch(error => {
            if (error) {
              (0, _ajaxError.popupAjaxError)(error);
            } else {
              this.dialog.alert(_I18n.default.t("poll.error_while_toggling_status"));
            }
          }).finally(() => {
            state.loading = false;
          });
        }
      });
    },
    toggleResults() {
      this.state.showResults = !this.state.showResults;
    },
    removeVote() {
      const {
        attrs,
        state
      } = this;
      state.loading = true;
      return (0, _ajax.ajax)("/polls/vote", {
        type: "DELETE",
        data: {
          post_id: attrs.post.id,
          poll_name: attrs.poll.name
        }
      }).then(_ref => {
        let {
          poll
        } = _ref;
        attrs.poll.setProperties(poll);
        attrs.vote.length = 0;
        attrs.hasSavedVote = false;
        this.appEvents.trigger("poll:voted", poll, attrs.post, attrs.vote);
      }).catch(error => (0, _ajaxError.popupAjaxError)(error)).finally(() => {
        state.loading = false;
      });
    },
    exportResults() {
      const {
        attrs
      } = this;
      const queryID = this.siteSettings.poll_export_data_explorer_query_id;

      // This uses the Data Explorer plugin export as CSV route
      // There is detection to check if the plugin is enabled before showing the button
      (0, _ajax.ajax)(`/admin/plugins/explorer/queries/${queryID}/run.csv`, {
        type: "POST",
        data: {
          // needed for data-explorer route compatibility
          params: JSON.stringify({
            poll_name: attrs.poll.name,
            post_id: attrs.post.id.toString() // needed for data-explorer route compatibility
          }),

          explain: false,
          limit: 1000000,
          download: 1
        }
      }).then(csvContent => {
        const downloadLink = document.createElement("a");
        const blob = new Blob([csvContent], {
          type: "text/csv;charset=utf-8;"
        });
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.setAttribute("download", `poll-export-${attrs.poll.name}-${attrs.post.id}.csv`);
        downloadLink.click();
        downloadLink.remove();
      }).catch(error => {
        if (error) {
          (0, _ajaxError.popupAjaxError)(error);
        } else {
          this.dialog.alert(_I18n.default.t("poll.error_while_exporting_results"));
        }
      });
    },
    showLogin() {
      this.register.lookup("route:application").send("showLogin");
    },
    _toggleOption(option) {
      const {
        vote
      } = this.attrs;
      const chosenIdx = vote.indexOf(option.id);
      if (chosenIdx !== -1) {
        vote.splice(chosenIdx, 1);
      } else {
        vote.push(option.id);
      }
    },
    toggleOption(option) {
      const {
        attrs
      } = this;
      if (this.isClosed()) {
        return;
      }
      if (!this.currentUser) {
        return this.showLogin();
      }
      if (!checkUserGroups(this.currentUser, this.attrs.poll)) {
        return;
      }
      const {
        vote
      } = attrs;
      if (!this.isMultiple() && vote.length === 1 && vote[0] === option.id) {
        return this.removeVote();
      }
      if (!this.isMultiple()) {
        vote.length = 0;
      }
      this._toggleOption(option);
      if (!this.isMultiple()) {
        return this.castVotes().catch(() => this._toggleOption(option));
      }
    },
    castVotes() {
      if (!this.canCastVotes()) {
        return;
      }
      if (!this.currentUser) {
        return this.showLogin();
      }
      const {
        attrs,
        state
      } = this;
      state.loading = true;
      return (0, _ajax.ajax)("/polls/vote", {
        type: "PUT",
        data: {
          post_id: attrs.post.id,
          poll_name: attrs.poll.name,
          options: attrs.vote
        }
      }).then(_ref2 => {
        let {
          poll
        } = _ref2;
        attrs.hasSavedVote = true;
        attrs.poll.setProperties(poll);
        this.appEvents.trigger("poll:voted", poll, attrs.post, attrs.vote);
        if (attrs.poll.results !== "on_close") {
          state.showResults = true;
        }
        if (attrs.poll.results === "staff_only") {
          if (this.currentUser && this.currentUser.staff) {
            state.showResults = true;
          } else {
            state.showResults = false;
          }
        }
      }).catch(error => {
        if (error) {
          (0, _ajaxError.popupAjaxError)(error);
        } else {
          this.dialog.alert(_I18n.default.t("poll.error_while_casting_votes"));
        }
      }).finally(() => {
        state.loading = false;
      });
    },
    showBreakdown() {
      (0, _showModal.default)("poll-breakdown", {
        model: this.attrs,
        panels: [{
          id: "percentage",
          title: "poll.breakdown.percentage"
        }, {
          id: "count",
          title: "poll.breakdown.count"
        }]
      });
    }
  });
  _exports.default = _default;
});
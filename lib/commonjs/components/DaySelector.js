"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _CalendarContext = require("../CalendarContext");
var _Day = _interopRequireWildcard(require("./Day"));
var _utils = require("../utils");
var _WeekDays = _interopRequireDefault(require("./WeekDays"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const DaySelector = () => {
  const {
    mode,
    date,
    startDate,
    endDate,
    dates,
    currentDate,
    onSelectDate,
    displayFullDays,
    minDate,
    maxDate,
    disabledDates,
    firstDayOfWeek,
    theme,
    height
  } = (0, _CalendarContext.useCalendarContext)();
  const {
    year,
    month,
    hour,
    minute
  } = (0, _utils.getParsedDate)(currentDate);
  const daysGrid = (0, _react.useMemo)(() => {
    const today = new Date();
    const {
      fullDaysInMonth
    } = (0, _utils.getDaysInMonth)(currentDate, displayFullDays, firstDayOfWeek);
    return (0, _utils.getMonthDays)(currentDate, displayFullDays, minDate, maxDate, firstDayOfWeek, disabledDates).map((day, index) => {
      if (day) {
        let leftCrop = day.dayOfMonth === 1;
        let rightCrop = day.dayOfMonth === fullDaysInMonth;
        const isFirstDayOfMonth = day.dayOfMonth === 1;
        const isLastDayOfMonth = ((day === null || day === void 0 ? void 0 : day.dayOfMonth) || 0) - (((day === null || day === void 0 ? void 0 : day.dayOfMonth) || 0) - day.day) === fullDaysInMonth;
        const isToday = (0, _utils.areDatesOnSameDay)(day.date, today);
        let inRange = false;
        let isSelected = false;
        if (mode === 'range') {
          rightCrop = false;
          const selectedStartDay = (0, _utils.areDatesOnSameDay)(day.date, startDate);
          const selectedEndDay = (0, _utils.areDatesOnSameDay)(day.date, endDate);
          isSelected = selectedStartDay || selectedEndDay;
          inRange = (0, _utils.isDateBetween)(day.date, {
            startDate,
            endDate
          });
          if (selectedStartDay) {
            leftCrop = true;
          }
          if (selectedEndDay) {
            rightCrop = true;
          }
          if (index % 7 === 0 && !selectedStartDay) {
            leftCrop = false;
          }
          if (index % 7 === 6 && !selectedEndDay) {
            rightCrop = false;
          }
          if (isFirstDayOfMonth && selectedEndDay || isLastDayOfMonth && selectedStartDay || (0, _dayjs.default)(startDate).format('DDMMYYYY') === (0, _dayjs.default)(endDate).format('DDMMYYYY')) {
            inRange = false;
          }
        } else if (mode === 'multiple') {
          const safeDates = dates || [];
          isSelected = safeDates.some(d => (0, _utils.areDatesOnSameDay)(day.date, d));
          const yesterday = (0, _dayjs.default)(day.date).add(-1, 'day');
          const tomorrow = (0, _dayjs.default)(day.date).add(1, 'day');
          const yesterdaySelected = safeDates.some(d => (0, _utils.areDatesOnSameDay)(d, yesterday));
          const tomorrowSelected = safeDates.some(d => (0, _utils.areDatesOnSameDay)(d, tomorrow));
          if (isSelected) {
            if (tomorrowSelected && yesterdaySelected) {
              inRange = true;
            }
            if (tomorrowSelected && !yesterdaySelected) {
              inRange = true;
              leftCrop = true;
            }
            if (yesterdaySelected && !tomorrowSelected) {
              inRange = true;
              rightCrop = true;
            }
            if (isFirstDayOfMonth && !tomorrowSelected) {
              inRange = false;
            }
            if (isLastDayOfMonth && !yesterdaySelected) {
              inRange = false;
            }
            if (inRange && !leftCrop && !rightCrop) {
              isSelected = false;
            }
          }
        } else if (mode === 'single') {
          isSelected = (0, _utils.areDatesOnSameDay)(day.date, date);
        }
        return {
          ...day,
          isToday,
          isSelected,
          inRange,
          leftCrop,
          rightCrop
        };
      } else {
        return null;
      }
    });
  },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  [mode, month, year, displayFullDays, firstDayOfWeek, minDate, maxDate, disabledDates, date, startDate, endDate, dates]);
  const handleSelectDate = (0, _react.useCallback)(selectedDate => {
    const newDate = (0, _utils.getDate)(selectedDate).hour(hour).minute(minute);
    onSelectDate((0, _utils.getFormated)(newDate));
  }, [onSelectDate, hour, minute]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container,
    testID: "day-selector"
  }, /*#__PURE__*/_react.default.createElement(_WeekDays.default, {
    firstDayOfWeek: firstDayOfWeek,
    theme: theme
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.daysContainer,
    testID: "days"
  }, daysGrid === null || daysGrid === void 0 ? void 0 : daysGrid.map((day, index) => {
    return day ? /*#__PURE__*/_react.default.createElement(_Day.default, {
      key: index,
      date: day.date,
      text: day.text,
      disabled: day.disabled,
      isCurrentMonth: day.isCurrentMonth,
      theme: theme,
      isToday: day.isToday,
      isSelected: day.isSelected,
      inRange: day.inRange,
      leftCrop: day.leftCrop,
      rightCrop: day.rightCrop,
      onSelectDate: handleSelectDate,
      height: height
    }) : /*#__PURE__*/_react.default.createElement(_Day.EmptyDay, {
      key: index,
      height: height
    });
  })));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 5,
    width: '100%'
  },
  daysContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'flex-start'
  }
});
var _default = exports.default = DaySelector;
//# sourceMappingURL=DaySelector.js.map
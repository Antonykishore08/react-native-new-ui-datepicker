"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("./utils");
var _CalendarContext = _interopRequireDefault(require("./CalendarContext"));
var _enums = require("./enums");
var _Calendar = _interopRequireDefault(require("./components/Calendar"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _localeData = _interopRequireDefault(require("dayjs/plugin/localeData"));
var _relativeTime = _interopRequireDefault(require("dayjs/plugin/relativeTime"));
var _localizedFormat = _interopRequireDefault(require("dayjs/plugin/localizedFormat"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
_dayjs.default.extend(_localeData.default);
_dayjs.default.extend(_relativeTime.default);
_dayjs.default.extend(_localizedFormat.default);
const DateTimePicker = props => {
  const {
    mode = 'single',
    locale = 'en',
    displayFullDays = false,
    timePicker = false,
    firstDayOfWeek,
    buttonPrevIcon,
    buttonNextIcon,
    // startYear,
    // endYear,
    minDate,
    maxDate,
    disabledDates,
    date,
    startDate,
    endDate,
    dates,
    onChange,
    initialView = 'day',
    height,
    ...rest
  } = props;
  _dayjs.default.locale(locale);
  const initialCalendarView = (0, _react.useMemo)(() => mode !== 'single' && initialView === 'time' ? 'day' : initialView, [mode, initialView]);
  const firstDay = firstDayOfWeek && firstDayOfWeek > 0 && firstDayOfWeek <= 6 ? firstDayOfWeek : 0;
  let currentDate = (0, _dayjs.default)();
  if (mode === 'single' && date) {
    currentDate = (0, _dayjs.default)(date);
  }
  if (mode === 'range' && startDate) {
    currentDate = (0, _dayjs.default)(startDate);
  }
  if (mode === 'multiple' && dates && dates.length > 0) {
    currentDate = (0, _dayjs.default)(dates[0]);
  }
  if (minDate && currentDate.isBefore(minDate)) {
    currentDate = (0, _dayjs.default)(minDate);
  }
  let currentYear = currentDate.year();
  const [state, dispatch] = (0, _react.useReducer)((prevState, action) => {
    switch (action.type) {
      case _enums.CalendarActionKind.SET_CALENDAR_VIEW:
        return {
          ...prevState,
          calendarView: action.payload
        };
      case _enums.CalendarActionKind.CHANGE_CURRENT_DATE:
        return {
          ...prevState,
          currentDate: action.payload
        };
      case _enums.CalendarActionKind.CHANGE_CURRENT_YEAR:
        return {
          ...prevState,
          currentYear: action.payload
        };
      case _enums.CalendarActionKind.CHANGE_SELECTED_DATE:
        const {
          date: selectedDate
        } = action.payload;
        return {
          ...prevState,
          date: selectedDate,
          currentDate: date
        };
      case _enums.CalendarActionKind.CHANGE_SELECTED_RANGE:
        const {
          startDate: start,
          endDate: end
        } = action.payload;
        return {
          ...prevState,
          startDate: start,
          endDate: end
        };
      case _enums.CalendarActionKind.CHANGE_SELECTED_MULTIPLE:
        const {
          dates: selectedDates
        } = action.payload;
        return {
          ...prevState,
          dates: selectedDates
        };
    }
  }, {
    date,
    startDate,
    endDate,
    dates,
    calendarView: initialCalendarView,
    currentDate,
    currentYear
  });
  (0, _react.useEffect)(() => {
    if (mode === 'single') {
      const newDate = (date && (timePicker ? date : (0, _utils.getStartOfDay)(date))) ?? minDate;
      dispatch({
        type: _enums.CalendarActionKind.CHANGE_SELECTED_DATE,
        payload: {
          date: newDate
        }
      });
    } else if (mode === 'range') {
      dispatch({
        type: _enums.CalendarActionKind.CHANGE_SELECTED_RANGE,
        payload: {
          startDate,
          endDate
        }
      });
    } else if (mode === 'multiple') {
      dispatch({
        type: _enums.CalendarActionKind.CHANGE_SELECTED_MULTIPLE,
        payload: {
          dates
        }
      });
    }
  }, [mode, date, startDate, endDate, dates, minDate, timePicker]);
  const setCalendarView = (0, _react.useCallback)(view => {
    dispatch({
      type: _enums.CalendarActionKind.SET_CALENDAR_VIEW,
      payload: view
    });
  }, []);
  const onSelectDate = (0, _react.useCallback)(selectedDate => {
    if (onChange) {
      if (mode === 'single') {
        const newDate = timePicker ? selectedDate : (0, _utils.getStartOfDay)(selectedDate);
        dispatch({
          type: _enums.CalendarActionKind.CHANGE_CURRENT_DATE,
          payload: newDate
        });
        onChange({
          date: newDate
        });
      } else if (mode === 'range') {
        const sd = state.startDate;
        const ed = state.endDate;
        let isStart = true;
        if (sd && !ed && (0, _utils.dateToUnix)(selectedDate) >= (0, _utils.dateToUnix)(sd)) {
          isStart = false;
        }
        onChange({
          startDate: isStart ? (0, _utils.getStartOfDay)(selectedDate) : sd,
          endDate: !isStart ? (0, _utils.getEndOfDay)(selectedDate) : undefined
        });
      } else if (mode === 'multiple') {
        const safeDates = state.dates || [];
        const newDate = (0, _utils.getStartOfDay)(selectedDate);
        const exists = safeDates.some(ed => (0, _utils.areDatesOnSameDay)(ed, newDate));
        const newDates = exists ? safeDates.filter(ed => !(0, _utils.areDatesOnSameDay)(ed, newDate)) : [...safeDates, newDate];
        newDates.sort((a, b) => (0, _dayjs.default)(a).isAfter((0, _dayjs.default)(b)) ? 1 : -1);
        onChange({
          dates: newDates,
          datePressed: newDate,
          change: exists ? 'removed' : 'added'
        });
      }
    }
  }, [onChange, mode, state.startDate, state.endDate, state.dates, timePicker]);
  const onSelectMonth = (0, _react.useCallback)(month => {
    const newDate = (0, _utils.getDate)(state.currentDate).month(month);
    dispatch({
      type: _enums.CalendarActionKind.CHANGE_CURRENT_DATE,
      payload: (0, _utils.getFormated)(newDate)
    });
    dispatch({
      type: _enums.CalendarActionKind.SET_CALENDAR_VIEW,
      payload: 'day'
    });
  }, [state.currentDate]);
  const onSelectYear = (0, _react.useCallback)(year => {
    const newDate = (0, _utils.getDate)(state.currentDate).year(year);
    dispatch({
      type: _enums.CalendarActionKind.CHANGE_CURRENT_DATE,
      payload: (0, _utils.getFormated)(newDate)
    });
    dispatch({
      type: _enums.CalendarActionKind.SET_CALENDAR_VIEW,
      payload: 'day'
    });
  }, [state.currentDate]);
  const onChangeMonth = (0, _react.useCallback)(month => {
    const newDate = (0, _utils.getDate)(state.currentDate).add(month, 'month');
    dispatch({
      type: _enums.CalendarActionKind.CHANGE_CURRENT_DATE,
      payload: (0, _utils.getFormated)(newDate)
    });
  }, [state.currentDate]);
  const onChangeYear = (0, _react.useCallback)(year => {
    dispatch({
      type: _enums.CalendarActionKind.CHANGE_CURRENT_YEAR,
      payload: year
    });
  }, []);
  const memoizedTheme = (0, _react.useMemo)(() => rest, [JSON.stringify(rest)] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const memoizedValue = (0, _react.useMemo)(() => ({
    ...state,
    locale,
    mode,
    displayFullDays,
    timePicker,
    minDate,
    maxDate,
    disabledDates,
    firstDayOfWeek: firstDay,
    height,
    theme: memoizedTheme,
    setCalendarView,
    onSelectDate,
    onSelectMonth,
    onSelectYear,
    onChangeMonth,
    onChangeYear
  }), [locale, mode, displayFullDays, timePicker, minDate, maxDate, disabledDates, firstDay, height, memoizedTheme, setCalendarView, onSelectDate, onSelectMonth, onSelectYear, onChangeMonth, onChangeYear, state]);
  return /*#__PURE__*/_react.default.createElement(_CalendarContext.default.Provider, {
    value: memoizedValue
  }, /*#__PURE__*/_react.default.createElement(_Calendar.default, {
    buttonPrevIcon: buttonPrevIcon,
    buttonNextIcon: buttonNextIcon,
    height: height
  }));
};
var _default = exports.default = DateTimePicker;
//# sourceMappingURL=DateTimePicker.js.map
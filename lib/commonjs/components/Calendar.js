"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CalendarContext = require("../CalendarContext");
var _Header = _interopRequireDefault(require("./Header"));
var _YearSelector = _interopRequireDefault(require("./YearSelector"));
var _MonthSelector = _interopRequireDefault(require("./MonthSelector"));
var _DaySelector = _interopRequireDefault(require("./DaySelector"));
var _TimeSelector = _interopRequireDefault(require("./TimeSelector"));
var _enums = require("../enums");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const CalendarView = {
  year: /*#__PURE__*/_react.default.createElement(_YearSelector.default, null),
  month: /*#__PURE__*/_react.default.createElement(_MonthSelector.default, null),
  day: /*#__PURE__*/_react.default.createElement(_DaySelector.default, null),
  time: /*#__PURE__*/_react.default.createElement(_TimeSelector.default, null)
};
const styles = _reactNative.StyleSheet.create({
  container: {
    width: '100%'
  }
});
const Calendar = ({
  buttonPrevIcon,
  buttonNextIcon,
  height
}) => {
  const {
    calendarView,
    theme
  } = (0, _CalendarContext.useCalendarContext)();
  const calendarContainerStyle = (0, _react.useMemo)(() => ({
    height: height || _enums.CALENDAR_HEIGHT,
    alignItems: 'center'
  }), [height]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container,
    testID: "calendar"
  }, /*#__PURE__*/_react.default.createElement(_Header.default, {
    buttonPrevIcon: buttonPrevIcon,
    buttonNextIcon: buttonNextIcon,
    theme: theme
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: calendarContainerStyle
  }, CalendarView[calendarView]));
};
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(Calendar);
//# sourceMappingURL=Calendar.js.map
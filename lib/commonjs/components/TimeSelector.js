"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CalendarContext = require("../CalendarContext");
var _Wheel = _interopRequireDefault(require("./TimePicker/Wheel"));
var _enums = require("../enums");
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const createNumberList = num => Array.from({
  length: num
}, (_, index) => index < 10 ? `0${index}` : `${index}`);
const hours = createNumberList(24);
const minutes = createNumberList(60);
const TimeSelector = () => {
  const {
    date,
    onSelectDate,
    theme
  } = (0, _CalendarContext.useCalendarContext)();
  const {
    hour,
    minute
  } = (0, _react.useMemo)(() => (0, _utils.getParsedDate)(date), [date]);
  const handleChangeHour = (0, _react.useCallback)(value => {
    const newDate = (0, _utils.getDate)(date).hour(value);
    onSelectDate((0, _utils.getFormated)(newDate));
  }, [date, onSelectDate]);
  const handleChangeMinute = (0, _react.useCallback)(value => {
    const newDate = (0, _utils.getDate)(date).minute(value);
    onSelectDate((0, _utils.getFormated)(newDate));
  }, [date, onSelectDate]);
  const timePickerContainerStyle = (0, _react.useMemo)(() => ({
    ...styles.timePickerContainer,
    flexDirection: _reactNative.I18nManager.getConstants().isRTL ? 'row-reverse' : 'row'
  }), []);
  const timePickerTextStyle = (0, _react.useMemo)(() => ({
    ...styles.timePickerText,
    ...(theme === null || theme === void 0 ? void 0 : theme.timePickerTextStyle)
  }), [theme === null || theme === void 0 ? void 0 : theme.timePickerTextStyle]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container,
    testID: "time-selector"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: timePickerContainerStyle
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.wheelContainer
  }, /*#__PURE__*/_react.default.createElement(_Wheel.default, {
    value: hour,
    items: hours,
    setValue: handleChangeHour,
    theme: theme
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: timePickerTextStyle
  }, ":"), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.wheelContainer
  }, /*#__PURE__*/_react.default.createElement(_Wheel.default, {
    value: minute,
    items: minutes,
    setValue: handleChangeMinute,
    theme: theme
  }))));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wheelContainer: {
    flex: 1
  },
  timePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: _enums.CALENDAR_HEIGHT / 2,
    height: _enums.CALENDAR_HEIGHT / 2
  },
  timePickerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 5
  }
});
var _default = exports.default = TimeSelector;
//# sourceMappingURL=TimeSelector.js.map
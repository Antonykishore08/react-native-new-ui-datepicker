"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _CalendarContext = require("../../CalendarContext");
var _MonthButton = _interopRequireDefault(require("./MonthButton"));
var _YearButton = _interopRequireDefault(require("./YearButton"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _react = require("react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Selectors = () => {
  const {
    mode,
    date,
    calendarView,
    setCalendarView,
    theme,
    timePicker
  } = (0, _CalendarContext.useCalendarContext)();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.selectorContainer
  }, calendarView !== 'year' ? /*#__PURE__*/React.createElement(_MonthButton.default, null) : null, /*#__PURE__*/React.createElement(_YearButton.default, null)), timePicker && mode === 'single' && calendarView !== 'year' ? /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    onPress: () => setCalendarView(calendarView === 'time' ? 'day' : 'time'),
    accessibilityRole: "button",
    accessibilityLabel: (0, _dayjs.default)(date).format('HH:mm')
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.textContainer, theme === null || theme === void 0 ? void 0 : theme.headerTextContainerStyle]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [styles.text, theme === null || theme === void 0 ? void 0 : theme.headerTextStyle]
  }, (0, _dayjs.default)(date).format('HH:mm')))) : null);
};
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(Selectors);
const styles = _reactNative.StyleSheet.create({
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textContainer: {
    marginHorizontal: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 5
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15
  }
});
//# sourceMappingURL=Selectors.js.map
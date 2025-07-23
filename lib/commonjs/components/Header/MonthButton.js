"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _dayjs = _interopRequireDefault(require("dayjs"));
var _reactNative = require("react-native");
var _CalendarContext = require("../../CalendarContext");
var _react = require("react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MonthButton = () => {
  const {
    currentDate,
    calendarView,
    setCalendarView,
    theme,
    locale
  } = (0, _CalendarContext.useCalendarContext)();
  const currentMonthText = (0, _dayjs.default)(currentDate).locale(locale).format('MMMM');
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    onPress: () => setCalendarView(calendarView === 'month' ? 'day' : 'month'),
    testID: "btn-month",
    accessibilityRole: "button",
    accessibilityLabel: currentMonthText
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.textContainer, theme === null || theme === void 0 ? void 0 : theme.headerTextContainerStyle]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [styles.text, theme === null || theme === void 0 ? void 0 : theme.headerTextStyle]
  }, currentMonthText)));
};
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(MonthButton);
const styles = _reactNative.StyleSheet.create({
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
//# sourceMappingURL=MonthButton.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _CalendarContext = require("../../CalendarContext");
var _utils = require("../../utils");
var _dayjs = _interopRequireDefault(require("dayjs"));
var _react = require("react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const YearButton = () => {
  const {
    currentDate,
    calendarView,
    setCalendarView,
    theme,
    currentYear,
    onChangeYear
  } = (0, _CalendarContext.useCalendarContext)();
  const years = (0, _utils.getYearRange)(currentYear);
  return /*#__PURE__*/React.createElement(_reactNative.Pressable, {
    onPress: () => {
      setCalendarView(calendarView === 'year' ? 'day' : 'year');
      onChangeYear((0, _utils.getDateYear)(currentDate));
    },
    testID: "btn-year",
    accessibilityRole: "button",
    accessibilityLabel: (0, _dayjs.default)(currentDate).format('YYYY')
  }, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.textContainer, theme === null || theme === void 0 ? void 0 : theme.headerTextContainerStyle]
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: [styles.text, theme === null || theme === void 0 ? void 0 : theme.headerTextStyle]
  }, calendarView === 'year' ? `${years[0]} - ${years[years.length - 1]}` : (0, _dayjs.default)(currentDate).format('YYYY'))));
};
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(YearButton);
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
//# sourceMappingURL=YearButton.js.map
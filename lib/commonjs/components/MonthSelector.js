"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _CalendarContext = require("../CalendarContext");
var _utils = require("../utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const MonthSelector = () => {
  var _getMonths;
  const {
    currentDate,
    onSelectMonth,
    theme
  } = (0, _CalendarContext.useCalendarContext)();
  const {
    month
  } = (0, _utils.getParsedDate)(currentDate);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container,
    testID: "month-selector"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.monthsContainer
  }, (_getMonths = (0, _utils.getMonths)()) === null || _getMonths === void 0 ? void 0 : _getMonths.map((item, index) => {
    const activeItemStyle = index === month ? {
      borderColor: (theme === null || theme === void 0 ? void 0 : theme.selectedItemColor) || '#0047FF',
      backgroundColor: (theme === null || theme === void 0 ? void 0 : theme.selectedItemColor) || '#0047FF'
    } : null;
    const textStyle = index === month ? {
      color: '#fff',
      ...(theme === null || theme === void 0 ? void 0 : theme.selectedTextStyle)
    } : theme === null || theme === void 0 ? void 0 : theme.calendarTextStyle;
    return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      key: index,
      style: styles.monthCell,
      onPress: () => onSelectMonth(index),
      accessibilityRole: "button",
      accessibilityLabel: item
    }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.month, theme === null || theme === void 0 ? void 0 : theme.monthContainerStyle, activeItemStyle]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      key: index,
      style: textStyle
    }, item)));
  })));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  monthCell: {
    width: '33.3%'
  },
  month: {
    paddingVertical: 15,
    margin: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF'
  }
});
var _default = exports.default = MonthSelector;
//# sourceMappingURL=MonthSelector.js.map
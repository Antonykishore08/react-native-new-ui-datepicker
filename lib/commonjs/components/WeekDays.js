"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _utils = require("../utils");
const WeekDays = ({
  firstDayOfWeek,
  theme
}) => {
  var _getWeekdaysMin;
  return /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.weekDaysContainer, theme === null || theme === void 0 ? void 0 : theme.weekDaysContainerStyle],
    testID: "week-days"
  }, (_getWeekdaysMin = (0, _utils.getWeekdaysMin)(firstDayOfWeek)) === null || _getWeekdaysMin === void 0 ? void 0 : _getWeekdaysMin.map((item, index) => /*#__PURE__*/React.createElement(_reactNative.View, {
    key: index,
    style: styles.weekDayCell
  }, /*#__PURE__*/React.createElement(_reactNative.Text, {
    style: theme === null || theme === void 0 ? void 0 : theme.weekDaysTextStyle
  }, item))));
};
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(WeekDays);
const styles = _reactNative.StyleSheet.create({
  weekDaysContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 5,
    marginBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E5E5E5'
  },
  weekDayCell: {
    width: '14.2%',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=WeekDays.js.map
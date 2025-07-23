import { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getWeekdaysMin } from '../utils';
const WeekDays = ({
  firstDayOfWeek,
  theme
}) => {
  var _getWeekdaysMin;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.weekDaysContainer, theme === null || theme === void 0 ? void 0 : theme.weekDaysContainerStyle],
    testID: "week-days"
  }, (_getWeekdaysMin = getWeekdaysMin(firstDayOfWeek)) === null || _getWeekdaysMin === void 0 ? void 0 : _getWeekdaysMin.map((item, index) => /*#__PURE__*/React.createElement(View, {
    key: index,
    style: styles.weekDayCell
  }, /*#__PURE__*/React.createElement(Text, {
    style: theme === null || theme === void 0 ? void 0 : theme.weekDaysTextStyle
  }, item))));
};
export default /*#__PURE__*/memo(WeekDays);
const styles = StyleSheet.create({
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
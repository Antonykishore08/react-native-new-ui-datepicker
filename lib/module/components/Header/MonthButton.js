import dayjs from 'dayjs';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCalendarContext } from '../../CalendarContext';
import { memo } from 'react';
const MonthButton = () => {
  const {
    currentDate,
    calendarView,
    setCalendarView,
    theme,
    locale
  } = useCalendarContext();
  const currentMonthText = dayjs(currentDate).locale(locale).format('MMMM');
  return /*#__PURE__*/React.createElement(Pressable, {
    onPress: () => setCalendarView(calendarView === 'month' ? 'day' : 'month'),
    testID: "btn-month",
    accessibilityRole: "button",
    accessibilityLabel: currentMonthText
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.textContainer, theme === null || theme === void 0 ? void 0 : theme.headerTextContainerStyle]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.text, theme === null || theme === void 0 ? void 0 : theme.headerTextStyle]
  }, currentMonthText)));
};
export default /*#__PURE__*/memo(MonthButton);
const styles = StyleSheet.create({
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
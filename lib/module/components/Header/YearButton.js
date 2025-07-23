import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useCalendarContext } from '../../CalendarContext';
import { getDateYear, getYearRange } from '../../utils';
import dayjs from 'dayjs';
import { memo } from 'react';
const YearButton = () => {
  const {
    currentDate,
    calendarView,
    setCalendarView,
    theme,
    currentYear,
    onChangeYear
  } = useCalendarContext();
  const years = getYearRange(currentYear);
  return /*#__PURE__*/React.createElement(Pressable, {
    onPress: () => {
      setCalendarView(calendarView === 'year' ? 'day' : 'year');
      onChangeYear(getDateYear(currentDate));
    },
    testID: "btn-year",
    accessibilityRole: "button",
    accessibilityLabel: dayjs(currentDate).format('YYYY')
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.textContainer, theme === null || theme === void 0 ? void 0 : theme.headerTextContainerStyle]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.text, theme === null || theme === void 0 ? void 0 : theme.headerTextStyle]
  }, calendarView === 'year' ? `${years[0]} - ${years[years.length - 1]}` : dayjs(currentDate).format('YYYY'))));
};
export default /*#__PURE__*/memo(YearButton);
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
//# sourceMappingURL=YearButton.js.map
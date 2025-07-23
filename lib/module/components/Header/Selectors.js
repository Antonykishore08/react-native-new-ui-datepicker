import { Pressable, StyleSheet, View, Text } from 'react-native';
import { useCalendarContext } from '../../CalendarContext';
import MonthButton from './MonthButton';
import YearButton from './YearButton';
import dayjs from 'dayjs';
import { memo } from 'react';
const Selectors = () => {
  const {
    mode,
    date,
    calendarView,
    setCalendarView,
    theme,
    timePicker
  } = useCalendarContext();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(View, {
    style: styles.selectorContainer
  }, calendarView !== 'year' ? /*#__PURE__*/React.createElement(MonthButton, null) : null, /*#__PURE__*/React.createElement(YearButton, null)), timePicker && mode === 'single' && calendarView !== 'year' ? /*#__PURE__*/React.createElement(Pressable, {
    onPress: () => setCalendarView(calendarView === 'time' ? 'day' : 'time'),
    accessibilityRole: "button",
    accessibilityLabel: dayjs(date).format('HH:mm')
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.textContainer, theme === null || theme === void 0 ? void 0 : theme.headerTextContainerStyle]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.text, theme === null || theme === void 0 ? void 0 : theme.headerTextStyle]
  }, dayjs(date).format('HH:mm')))) : null);
};
export default /*#__PURE__*/memo(Selectors);
const styles = StyleSheet.create({
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
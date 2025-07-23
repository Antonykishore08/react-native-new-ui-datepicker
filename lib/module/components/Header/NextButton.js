import React, { memo } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../../CalendarContext';
import { YEAR_PAGE_SIZE } from '../../utils';
const arrow_right = require('../../assets/images/arrow_right.png');
const NextButton = ({
  icon
}) => {
  const {
    currentYear,
    onChangeMonth,
    onChangeYear,
    calendarView,
    theme
  } = useCalendarContext();
  return /*#__PURE__*/React.createElement(Pressable, {
    disabled: calendarView === 'time',
    onPress: () => calendarView === 'day' ? onChangeMonth(1) : calendarView === 'month' ? onChangeYear(currentYear + 1) : calendarView === 'year' && onChangeYear(currentYear + YEAR_PAGE_SIZE),
    testID: "btn-next",
    accessibilityRole: "button",
    accessibilityLabel: "Next"
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.iconContainer, styles.next, theme === null || theme === void 0 ? void 0 : theme.headerButtonStyle]
  }, icon || /*#__PURE__*/React.createElement(Image, {
    source: arrow_right,
    style: {
      width: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      height: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      tintColor: theme === null || theme === void 0 ? void 0 : theme.headerButtonColor
    }
  })));
};
export default /*#__PURE__*/memo(NextButton);
const styles = StyleSheet.create({
  iconContainer: {
    padding: 4
  },
  next: {
    marginLeft: 3
  }
});
//# sourceMappingURL=NextButton.js.map
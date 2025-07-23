import React, { memo } from 'react';
import { View, Image, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../../CalendarContext';
import { YEAR_PAGE_SIZE } from '../../utils';
const arrow_left = require('../../assets/images/arrow_left.png');
const PrevButton = ({
  icon,
  theme
}) => {
  const {
    currentYear,
    onChangeMonth,
    onChangeYear,
    calendarView
  } = useCalendarContext();
  return /*#__PURE__*/React.createElement(Pressable, {
    disabled: calendarView === 'time',
    onPress: () => calendarView === 'day' ? onChangeMonth(-1) : calendarView === 'month' ? onChangeYear(currentYear - 1) : calendarView === 'year' && onChangeYear(currentYear - YEAR_PAGE_SIZE),
    testID: "btn-prev",
    accessibilityRole: "button",
    accessibilityLabel: "Prev"
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.iconContainer, styles.prev, theme === null || theme === void 0 ? void 0 : theme.headerButtonStyle]
  }, icon || /*#__PURE__*/React.createElement(Image, {
    source: arrow_left,
    style: {
      width: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      height: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      tintColor: theme === null || theme === void 0 ? void 0 : theme.headerButtonColor
    }
  })));
};
export default /*#__PURE__*/memo(PrevButton);
const styles = StyleSheet.create({
  iconContainer: {
    padding: 4
  },
  prev: {
    marginRight: 3
  }
});
//# sourceMappingURL=PrevButton.js.map
import React, { useCallback } from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import { getDateYear, getYearRange } from '../utils';
const YearSelector = () => {
  const {
    currentDate,
    currentYear,
    date,
    onSelectYear,
    theme
  } = useCalendarContext();
  const selectedYear = getDateYear(date);
  const generateCells = useCallback(() => {
    const years = getYearRange(currentYear);
    const activeYear = getDateYear(currentDate);
    const column = years.map(year => {
      const activeItemStyle = year === selectedYear ? {
        borderColor: (theme === null || theme === void 0 ? void 0 : theme.selectedItemColor) || '#0047FF',
        backgroundColor: (theme === null || theme === void 0 ? void 0 : theme.selectedItemColor) || '#0047FF'
      } : year === activeYear ? {
        borderColor: (theme === null || theme === void 0 ? void 0 : theme.selectedItemColor) || '#0047FF'
      } : {};
      const textStyle = year === selectedYear ? {
        color: '#fff',
        ...(theme === null || theme === void 0 ? void 0 : theme.selectedTextStyle)
      } : year === activeYear ? {
        color: (theme === null || theme === void 0 ? void 0 : theme.selectedItemColor) || '#0047FF',
        fontWeight: 'bold'
      } : {
        ...(theme === null || theme === void 0 ? void 0 : theme.calendarTextStyle)
      };
      return /*#__PURE__*/React.createElement(Pressable, {
        key: year,
        onPress: () => onSelectYear(year),
        style: styles.yearCell,
        accessibilityRole: "button",
        accessibilityLabel: year.toString()
      }, /*#__PURE__*/React.createElement(View, {
        style: [styles.year, theme === null || theme === void 0 ? void 0 : theme.yearContainerStyle, activeItemStyle]
      }, /*#__PURE__*/React.createElement(Text, {
        key: year,
        style: textStyle
      }, year)));
    });
    return column;
  }, [onSelectYear, selectedYear, currentYear, currentDate, theme]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container,
    testID: "year-selector"
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.years
  }, generateCells()));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: '100%'
  },
  yearCell: {
    width: '33.3%'
  },
  years: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  year: {
    paddingVertical: 15,
    margin: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF'
  }
});
export default YearSelector;
//# sourceMappingURL=YearSelector.js.map
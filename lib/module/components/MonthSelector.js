import React from 'react';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import { getParsedDate, getMonths } from '../utils';
const MonthSelector = () => {
  var _getMonths;
  const {
    currentDate,
    onSelectMonth,
    theme
  } = useCalendarContext();
  const {
    month
  } = getParsedDate(currentDate);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container,
    testID: "month-selector"
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.monthsContainer
  }, (_getMonths = getMonths()) === null || _getMonths === void 0 ? void 0 : _getMonths.map((item, index) => {
    const activeItemStyle = index === month ? {
      borderColor: (theme === null || theme === void 0 ? void 0 : theme.selectedItemColor) || '#0047FF',
      backgroundColor: (theme === null || theme === void 0 ? void 0 : theme.selectedItemColor) || '#0047FF'
    } : null;
    const textStyle = index === month ? {
      color: '#fff',
      ...(theme === null || theme === void 0 ? void 0 : theme.selectedTextStyle)
    } : theme === null || theme === void 0 ? void 0 : theme.calendarTextStyle;
    return /*#__PURE__*/React.createElement(Pressable, {
      key: index,
      style: styles.monthCell,
      onPress: () => onSelectMonth(index),
      accessibilityRole: "button",
      accessibilityLabel: item
    }, /*#__PURE__*/React.createElement(View, {
      style: [styles.month, theme === null || theme === void 0 ? void 0 : theme.monthContainerStyle, activeItemStyle]
    }, /*#__PURE__*/React.createElement(Text, {
      key: index,
      style: textStyle
    }, item)));
  })));
};
const styles = StyleSheet.create({
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
export default MonthSelector;
//# sourceMappingURL=MonthSelector.js.map
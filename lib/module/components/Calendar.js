import React, { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import Header from './Header';
import YearSelector from './YearSelector';
import MonthSelector from './MonthSelector';
import DaySelector from './DaySelector';
import TimeSelector from './TimeSelector';
import { CALENDAR_HEIGHT } from '../enums';
const CalendarView = {
  year: /*#__PURE__*/React.createElement(YearSelector, null),
  month: /*#__PURE__*/React.createElement(MonthSelector, null),
  day: /*#__PURE__*/React.createElement(DaySelector, null),
  time: /*#__PURE__*/React.createElement(TimeSelector, null)
};
const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
});
const Calendar = ({
  buttonPrevIcon,
  buttonNextIcon,
  height
}) => {
  const {
    calendarView,
    theme
  } = useCalendarContext();
  const calendarContainerStyle = useMemo(() => ({
    height: height || CALENDAR_HEIGHT,
    alignItems: 'center'
  }), [height]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container,
    testID: "calendar"
  }, /*#__PURE__*/React.createElement(Header, {
    buttonPrevIcon: buttonPrevIcon,
    buttonNextIcon: buttonNextIcon,
    theme: theme
  }), /*#__PURE__*/React.createElement(View, {
    style: calendarContainerStyle
  }, CalendarView[calendarView]));
};
export default /*#__PURE__*/memo(Calendar);
//# sourceMappingURL=Calendar.js.map
import React, { useCallback, useMemo } from 'react';
import { Text, View, StyleSheet, I18nManager } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import Wheel from './TimePicker/Wheel';
import { CALENDAR_HEIGHT } from '../enums';
import { getParsedDate, getDate, getFormated } from '../utils';
const createNumberList = num => Array.from({
  length: num
}, (_, index) => index < 10 ? `0${index}` : `${index}`);
const hours = createNumberList(24);
const minutes = createNumberList(60);
const TimeSelector = () => {
  const {
    date,
    onSelectDate,
    theme
  } = useCalendarContext();
  const {
    hour,
    minute
  } = useMemo(() => getParsedDate(date), [date]);
  const handleChangeHour = useCallback(value => {
    const newDate = getDate(date).hour(value);
    onSelectDate(getFormated(newDate));
  }, [date, onSelectDate]);
  const handleChangeMinute = useCallback(value => {
    const newDate = getDate(date).minute(value);
    onSelectDate(getFormated(newDate));
  }, [date, onSelectDate]);
  const timePickerContainerStyle = useMemo(() => ({
    ...styles.timePickerContainer,
    flexDirection: I18nManager.getConstants().isRTL ? 'row-reverse' : 'row'
  }), []);
  const timePickerTextStyle = useMemo(() => ({
    ...styles.timePickerText,
    ...(theme === null || theme === void 0 ? void 0 : theme.timePickerTextStyle)
  }), [theme === null || theme === void 0 ? void 0 : theme.timePickerTextStyle]);
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container,
    testID: "time-selector"
  }, /*#__PURE__*/React.createElement(View, {
    style: timePickerContainerStyle
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.wheelContainer
  }, /*#__PURE__*/React.createElement(Wheel, {
    value: hour,
    items: hours,
    setValue: handleChangeHour,
    theme: theme
  })), /*#__PURE__*/React.createElement(Text, {
    style: timePickerTextStyle
  }, ":"), /*#__PURE__*/React.createElement(View, {
    style: styles.wheelContainer
  }, /*#__PURE__*/React.createElement(Wheel, {
    value: minute,
    items: minutes,
    setValue: handleChangeMinute,
    theme: theme
  }))));
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wheelContainer: {
    flex: 1
  },
  timePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: CALENDAR_HEIGHT / 2,
    height: CALENDAR_HEIGHT / 2
  },
  timePickerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 5
  }
});
export default TimeSelector;
//# sourceMappingURL=TimeSelector.js.map
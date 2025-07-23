import React, { useCallback, useMemo, useState } from 'react';
import { Text, View, StyleSheet, I18nManager } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import Wheel from './TimePicker/Wheel';
import { getParsedDate, getDate, getFormated } from '../utils';
const createNumberList = num => Array.from({
  length: num
}, (_, index) => index < 10 ? `0${index}` : `${index}`);
const hours12 = createNumberList(12).map((h, i) => (i + 1).toString().padStart(2, '0'));
const minutes = createNumberList(60);
const amPmOptions = ['AM', 'PM'];
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
  const isPM = hour >= 12;
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const [amPm, setAmPm] = useState(isPM ? 'PM' : 'AM');
  const handleChangeHour = useCallback(value => {
    let newHour = value + 1;
    if (amPm === 'PM' && newHour !== 12) newHour += 12;
    if (amPm === 'AM' && newHour === 12) newHour = 0;
    const newDate = getDate(date).hour(newHour);
    onSelectDate(getFormated(newDate));
  }, [date, onSelectDate, amPm]);
  const handleChangeMinute = useCallback(value => {
    const newDate = getDate(date).minute(value);
    onSelectDate(getFormated(newDate));
  }, [date, onSelectDate]);
  const handleChangeAmPm = useCallback(index => {
    const newPeriod = amPmOptions[index];
    setAmPm(newPeriod);
    let newHour = hour12;
    if (newPeriod === 'PM' && newHour !== 12) newHour += 12;
    if (newPeriod === 'AM' && newHour === 12) newHour = 0;
    const newDate = getDate(date).hour(newHour);
    onSelectDate(getFormated(newDate));
  }, [date, onSelectDate, hour12]);
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
    style: {}
  }, /*#__PURE__*/React.createElement(Wheel, {
    value: hour12 - 1,
    items: hours12,
    setValue: handleChangeHour,
    theme: theme
  })), /*#__PURE__*/React.createElement(Text, {
    style: timePickerTextStyle
  }, ":"), /*#__PURE__*/React.createElement(View, {
    style: {}
  }, /*#__PURE__*/React.createElement(Wheel, {
    value: minute,
    items: minutes,
    setValue: handleChangeMinute,
    theme: theme
  })), /*#__PURE__*/React.createElement(View, {
    style: {
      paddingLeft: 10
    }
  }, /*#__PURE__*/React.createElement(Wheel, {
    value: amPm === 'AM' ? 0 : 1,
    items: amPmOptions,
    setValue: handleChangeAmPm,
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
    flex: 1,
    minWidth: 60,
    alignItems: 'center'
  },
  amPmWheelContainer: {
    flex: 0.8,
    minWidth: 50,
    alignItems: 'center'
  },
  timePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16
  },
  timePickerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 5
  }
});
export default TimeSelector;
//# sourceMappingURL=TimeSelector.js.map
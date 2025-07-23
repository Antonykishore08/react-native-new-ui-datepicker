import React, { useCallback, useMemo, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  I18nManager,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import Wheel from './TimePicker/Wheel';
import { CALENDAR_HEIGHT } from '../enums';
import { getParsedDate, getDate, getFormated } from '../utils';

const createNumberList = (num: number) =>
  Array.from({ length: num }, (_, index) =>
    index < 10 ? `0${index}` : `${index}`
  );

const hours12 = createNumberList(12).map((_, i) =>
  (i + 1).toString().padStart(2, '0')
);
const hours24 = createNumberList(24);
const minutes = createNumberList(60);
const amPmOptions = ['AM', 'PM'];

const TimeSelector = () => {
  const { date, onSelectDate, theme,is24Hours } = useCalendarContext();
  const { hour, minute } = useMemo(() => getParsedDate(date), [date]);

  const isPM = hour >= 12;
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  const [amPm, setAmPm] = useState<'AM' | 'PM'>(isPM ? 'PM' : 'AM');

  const handleChangeHour = useCallback(
    (value: number) => {
      let newHour = is24Hours ? value : value + 1;
      if (!is24Hours) {
        if (amPm === 'PM' && newHour !== 12) newHour += 12;
        if (amPm === 'AM' && newHour === 12) newHour = 0;
      }
      const newDate = getDate(date).hour(newHour);
      onSelectDate(getFormated(newDate));
    },
    [date, onSelectDate, amPm, is24Hours]
  );

  const handleChangeMinute = useCallback(
    (value: number) => {
      const newDate = getDate(date).minute(value);
      onSelectDate(getFormated(newDate));
    },
    [date, onSelectDate]
  );

  const handleChangeAmPm = useCallback(
    (index: number) => {
      const newPeriod = amPmOptions[index] as 'AM' | 'PM';
      setAmPm(newPeriod);
      let newHour = hour12;
      if (newPeriod === 'PM' && newHour !== 12) newHour += 12;
      if (newPeriod === 'AM' && newHour === 12) newHour = 0;
      const newDate = getDate(date).hour(newHour);
      onSelectDate(getFormated(newDate));
    },
    [date, onSelectDate, hour12]
  );

  const timePickerContainerStyle: ViewStyle = useMemo(
    () => ({
      ...styles.timePickerContainer,
      flexDirection: I18nManager.getConstants().isRTL ? 'row-reverse' : 'row',
    }),
    []
  );

  const timePickerTextStyle: TextStyle = useMemo(
    () => ({ ...styles.timePickerText, ...theme?.timePickerTextStyle }),
    [theme?.timePickerTextStyle]
  );

  return (
    <View style={styles.container} testID="time-selector">
      <View style={timePickerContainerStyle}>
        <View style={styles.wheelContainer}>
          <Wheel
            value={is24Hours ? hour : hour12 - 1}
            items={is24Hours ? hours24 : hours12}
            setValue={handleChangeHour}
            theme={theme}
            infiniteScroll={true}
          />
        </View>

        <Text style={timePickerTextStyle}>:</Text>

        <View style={styles.wheelContainer}>
          <Wheel
            value={minute}
            items={minutes}
            setValue={handleChangeMinute}
            theme={theme}
            infiniteScroll={true}
          />
        </View>

        {!is24Hours && (
          <View style={styles.amPmWheelContainer}>
            <Wheel
              value={amPm === 'AM' ? 0 : 1}
              items={amPmOptions}
              setValue={handleChangeAmPm}
              theme={theme}
              infiniteScroll={false}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelContainer: {
    
  
    
  },
  amPmWheelContainer: {
  
    paddingLeft: 10,
  },
  timePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  timePickerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
});

export default TimeSelector;

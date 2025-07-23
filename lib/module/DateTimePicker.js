import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import { getFormated, getDate, dateToUnix, getEndOfDay, getStartOfDay, areDatesOnSameDay } from './utils';
import CalendarContext from './CalendarContext';
import { CalendarActionKind } from './enums';
import Calendar from './components/Calendar';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
const DateTimePicker = props => {
  const {
    mode = 'single',
    locale = 'en',
    displayFullDays = false,
    timePicker = false,
    firstDayOfWeek,
    buttonPrevIcon,
    buttonNextIcon,
    // startYear,
    // endYear,
    minDate,
    maxDate,
    disabledDates,
    date,
    startDate,
    endDate,
    dates,
    onChange,
    initialView = 'day',
    height,
    ...rest
  } = props;
  dayjs.locale(locale);
  const initialCalendarView = useMemo(() => mode !== 'single' && initialView === 'time' ? 'day' : initialView, [mode, initialView]);
  const firstDay = firstDayOfWeek && firstDayOfWeek > 0 && firstDayOfWeek <= 6 ? firstDayOfWeek : 0;
  let currentDate = dayjs();
  if (mode === 'single' && date) {
    currentDate = dayjs(date);
  }
  if (mode === 'range' && startDate) {
    currentDate = dayjs(startDate);
  }
  if (mode === 'multiple' && dates && dates.length > 0) {
    currentDate = dayjs(dates[0]);
  }
  if (minDate && currentDate.isBefore(minDate)) {
    currentDate = dayjs(minDate);
  }
  let currentYear = currentDate.year();
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case CalendarActionKind.SET_CALENDAR_VIEW:
        return {
          ...prevState,
          calendarView: action.payload
        };
      case CalendarActionKind.CHANGE_CURRENT_DATE:
        return {
          ...prevState,
          currentDate: action.payload
        };
      case CalendarActionKind.CHANGE_CURRENT_YEAR:
        return {
          ...prevState,
          currentYear: action.payload
        };
      case CalendarActionKind.CHANGE_SELECTED_DATE:
        const {
          date: selectedDate
        } = action.payload;
        return {
          ...prevState,
          date: selectedDate,
          currentDate: date
        };
      case CalendarActionKind.CHANGE_SELECTED_RANGE:
        const {
          startDate: start,
          endDate: end
        } = action.payload;
        return {
          ...prevState,
          startDate: start,
          endDate: end
        };
      case CalendarActionKind.CHANGE_SELECTED_MULTIPLE:
        const {
          dates: selectedDates
        } = action.payload;
        return {
          ...prevState,
          dates: selectedDates
        };
    }
  }, {
    date,
    startDate,
    endDate,
    dates,
    calendarView: initialCalendarView,
    currentDate,
    currentYear
  });
  useEffect(() => {
    if (mode === 'single') {
      const newDate = (date && (timePicker ? date : getStartOfDay(date))) ?? minDate;
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_DATE,
        payload: {
          date: newDate
        }
      });
    } else if (mode === 'range') {
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_RANGE,
        payload: {
          startDate,
          endDate
        }
      });
    } else if (mode === 'multiple') {
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_MULTIPLE,
        payload: {
          dates
        }
      });
    }
  }, [mode, date, startDate, endDate, dates, minDate, timePicker]);
  const setCalendarView = useCallback(view => {
    dispatch({
      type: CalendarActionKind.SET_CALENDAR_VIEW,
      payload: view
    });
  }, []);
  const onSelectDate = useCallback(selectedDate => {
    if (onChange) {
      if (mode === 'single') {
        const newDate = timePicker ? selectedDate : getStartOfDay(selectedDate);
        dispatch({
          type: CalendarActionKind.CHANGE_CURRENT_DATE,
          payload: newDate
        });
        onChange({
          date: newDate
        });
      } else if (mode === 'range') {
        const sd = state.startDate;
        const ed = state.endDate;
        let isStart = true;
        if (sd && !ed && dateToUnix(selectedDate) >= dateToUnix(sd)) {
          isStart = false;
        }
        onChange({
          startDate: isStart ? getStartOfDay(selectedDate) : sd,
          endDate: !isStart ? getEndOfDay(selectedDate) : undefined
        });
      } else if (mode === 'multiple') {
        const safeDates = state.dates || [];
        const newDate = getStartOfDay(selectedDate);
        const exists = safeDates.some(ed => areDatesOnSameDay(ed, newDate));
        const newDates = exists ? safeDates.filter(ed => !areDatesOnSameDay(ed, newDate)) : [...safeDates, newDate];
        newDates.sort((a, b) => dayjs(a).isAfter(dayjs(b)) ? 1 : -1);
        onChange({
          dates: newDates,
          datePressed: newDate,
          change: exists ? 'removed' : 'added'
        });
      }
    }
  }, [onChange, mode, state.startDate, state.endDate, state.dates, timePicker]);
  const onSelectMonth = useCallback(month => {
    const newDate = getDate(state.currentDate).month(month);
    dispatch({
      type: CalendarActionKind.CHANGE_CURRENT_DATE,
      payload: getFormated(newDate)
    });
    dispatch({
      type: CalendarActionKind.SET_CALENDAR_VIEW,
      payload: 'day'
    });
  }, [state.currentDate]);
  const onSelectYear = useCallback(year => {
    const newDate = getDate(state.currentDate).year(year);
    dispatch({
      type: CalendarActionKind.CHANGE_CURRENT_DATE,
      payload: getFormated(newDate)
    });
    dispatch({
      type: CalendarActionKind.SET_CALENDAR_VIEW,
      payload: 'day'
    });
  }, [state.currentDate]);
  const onChangeMonth = useCallback(month => {
    const newDate = getDate(state.currentDate).add(month, 'month');
    dispatch({
      type: CalendarActionKind.CHANGE_CURRENT_DATE,
      payload: getFormated(newDate)
    });
  }, [state.currentDate]);
  const onChangeYear = useCallback(year => {
    dispatch({
      type: CalendarActionKind.CHANGE_CURRENT_YEAR,
      payload: year
    });
  }, []);
  const memoizedTheme = useMemo(() => rest, [JSON.stringify(rest)] // eslint-disable-line react-hooks/exhaustive-deps
  );
  const memoizedValue = useMemo(() => ({
    ...state,
    locale,
    mode,
    displayFullDays,
    timePicker,
    minDate,
    maxDate,
    disabledDates,
    firstDayOfWeek: firstDay,
    height,
    theme: memoizedTheme,
    setCalendarView,
    onSelectDate,
    onSelectMonth,
    onSelectYear,
    onChangeMonth,
    onChangeYear
  }), [locale, mode, displayFullDays, timePicker, minDate, maxDate, disabledDates, firstDay, height, memoizedTheme, setCalendarView, onSelectDate, onSelectMonth, onSelectYear, onChangeMonth, onChangeYear, state]);
  return /*#__PURE__*/React.createElement(CalendarContext.Provider, {
    value: memoizedValue
  }, /*#__PURE__*/React.createElement(Calendar, {
    buttonPrevIcon: buttonPrevIcon,
    buttonNextIcon: buttonNextIcon,
    height: height
  }));
};
export default DateTimePicker;
//# sourceMappingURL=DateTimePicker.js.map
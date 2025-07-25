import React, { useCallback, useEffect, useMemo, useReducer } from 'react';
import {
  getFormated,
  getDate,
  dateToUnix,
  getEndOfDay,
  getStartOfDay,
  areDatesOnSameDay,
} from './utils';
import CalendarContext from './CalendarContext';
import { CalendarViews, CalendarActionKind } from './enums';
import type {
  DateType,
  CalendarAction,
  LocalState,
  DatePickerBaseProps,
  CalendarThemeProps,
  HeaderProps,
  SingleChange,
  RangeChange,
  MultiChange,
} from './types';
import Calendar from './components/Calendar';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export interface DatePickerSingleProps
  extends CalendarThemeProps,
    HeaderProps,
    DatePickerBaseProps {
  mode: 'single';
  date?: DateType;
  onChange?: SingleChange;
}

export interface DatePickerRangeProps
  extends CalendarThemeProps,
    HeaderProps,
    DatePickerBaseProps {
  mode: 'range';
  startDate?: DateType;
  endDate?: DateType;
  onChange?: RangeChange;
}

export interface DatePickeMultipleProps
  extends CalendarThemeProps,
    HeaderProps,
    DatePickerBaseProps {
  mode: 'multiple';
  dates?: DateType[];
  onChange?: MultiChange;
}

const DateTimePicker = (
  props: DatePickerSingleProps | DatePickerRangeProps | DatePickeMultipleProps
) => {
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
    is24Hours = false,
    ...rest
  } = props;
  dayjs.locale(locale);

  const initialCalendarView: CalendarViews = useMemo(
    () => (mode !== 'single' && initialView === 'time' ? 'day' : initialView),
    [mode, initialView]
  );

  const firstDay =
    firstDayOfWeek && firstDayOfWeek > 0 && firstDayOfWeek <= 6
      ? firstDayOfWeek
      : 0;

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

  const [state, dispatch] = useReducer(
    (prevState: LocalState, action: CalendarAction) => {
      switch (action.type) {
        case CalendarActionKind.SET_CALENDAR_VIEW:
          return {
            ...prevState,
            calendarView: action.payload,
          };
        case CalendarActionKind.CHANGE_CURRENT_DATE:
          return {
            ...prevState,
            currentDate: action.payload,
          };
        case CalendarActionKind.CHANGE_CURRENT_YEAR:
          return {
            ...prevState,
            currentYear: action.payload,
          };
        case CalendarActionKind.CHANGE_SELECTED_DATE:
          const { date: selectedDate } = action.payload;
          return {
            ...prevState,
            date: selectedDate,
            currentDate: date,
          };
        case CalendarActionKind.CHANGE_SELECTED_RANGE:
          const { startDate: start, endDate: end } = action.payload;
          return {
            ...prevState,
            startDate: start,
            endDate: end,
          };
        case CalendarActionKind.CHANGE_SELECTED_MULTIPLE:
          const { dates: selectedDates } = action.payload;
          return {
            ...prevState,
            dates: selectedDates,
          };
      }
    },
    {
      date,
      startDate,
      endDate,
      dates,
      calendarView: initialCalendarView,
      currentDate,
      currentYear,
    }
  );

  useEffect(() => {
    if (mode === 'single') {
      const newDate =
        (date && (timePicker ? date : getStartOfDay(date))) ?? minDate;

      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_DATE,
        payload: { date: newDate },
      });
    } else if (mode === 'range') {
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_RANGE,
        payload: { startDate, endDate },
      });
    } else if (mode === 'multiple') {
      dispatch({
        type: CalendarActionKind.CHANGE_SELECTED_MULTIPLE,
        payload: { dates },
      });
    }
  }, [mode, date, startDate, endDate, dates, minDate, timePicker,is24Hours]);

  const setCalendarView = useCallback((view: CalendarViews) => {
    dispatch({ type: CalendarActionKind.SET_CALENDAR_VIEW, payload: view });
  }, []);

  const onSelectDate = useCallback(
    (selectedDate: DateType) => {
      if (onChange) {
        if (mode === 'single') {
          const newDate = timePicker
            ? selectedDate
            : getStartOfDay(selectedDate);

          dispatch({
            type: CalendarActionKind.CHANGE_CURRENT_DATE,
            payload: newDate,
          });

          (onChange as SingleChange)({
            date: newDate,
          });
        } else if (mode === 'range') {
          const sd = state.startDate;
          const ed = state.endDate;
          let isStart: boolean = true;

          if (sd && !ed && dateToUnix(selectedDate) >= dateToUnix(sd!)) {
            isStart = false;
          }

          (onChange as RangeChange)({
            startDate: isStart ? getStartOfDay(selectedDate) : sd,
            endDate: !isStart ? getEndOfDay(selectedDate) : undefined,
          });
        } else if (mode === 'multiple') {
          const safeDates = (state.dates as DateType[]) || [];
          const newDate = getStartOfDay(selectedDate);

          const exists = safeDates.some((ed) => areDatesOnSameDay(ed, newDate));

          const newDates = exists
            ? safeDates.filter((ed) => !areDatesOnSameDay(ed, newDate))
            : [...safeDates, newDate];

          newDates.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1));

          (onChange as MultiChange)({
            dates: newDates,
            datePressed: newDate,
            change: exists ? 'removed' : 'added',
          });
        }
      }
    },
    [onChange, mode, state.startDate, state.endDate, state.dates, timePicker,is24Hours]
  );

  const onSelectMonth = useCallback(
    (month: number) => {
      const newDate = getDate(state.currentDate).month(month);
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
      dispatch({
        type: CalendarActionKind.SET_CALENDAR_VIEW,
        payload: 'day',
      });
    },
    [state.currentDate]
  );

  const onSelectYear = useCallback(
    (year: number) => {
      const newDate = getDate(state.currentDate).year(year);
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
      dispatch({
        type: CalendarActionKind.SET_CALENDAR_VIEW,
        payload: 'day',
      });
    },
    [state.currentDate]
  );

  const onChangeMonth = useCallback(
    (month: number) => {
      const newDate = getDate(state.currentDate).add(month, 'month');
      dispatch({
        type: CalendarActionKind.CHANGE_CURRENT_DATE,
        payload: getFormated(newDate),
      });
    },
    [state.currentDate]
  );

  const onChangeYear = useCallback((year: number) => {
    dispatch({
      type: CalendarActionKind.CHANGE_CURRENT_YEAR,
      payload: year,
    });
  }, []);

  const memoizedTheme = useMemo(
    () => rest,
    [JSON.stringify(rest)] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const memoizedValue = useMemo(
    () => ({
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
      onChangeYear,
      is24Hours
    }),
    [
      locale,
      mode,
      displayFullDays,
      timePicker,
      minDate,
      maxDate,
      disabledDates,
      firstDay,
      height,
      memoizedTheme,
      setCalendarView,
      onSelectDate,
      onSelectMonth,
      onSelectYear,
      onChangeMonth,
      onChangeYear,
      state,
      is24Hours
    ]
  );

  return (
    <CalendarContext.Provider value={memoizedValue}>
      <Calendar
        buttonPrevIcon={buttonPrevIcon}
        buttonNextIcon={buttonNextIcon}
        height={height}
      />
    </CalendarContext.Provider>
  );
};

export default DateTimePicker;

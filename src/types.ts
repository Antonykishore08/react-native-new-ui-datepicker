import type { Dayjs } from 'dayjs';
import type { CalendarActionKind, CalendarViews } from './enums';
import type { TextStyle, ViewStyle } from 'react-native';
import type { ReactNode } from 'react';

export type DateType = string | number | Dayjs | Date | null | undefined;

export type ModeType = 'single' | 'range' | 'multiple';

export type HeaderButtonPositions = 'around' | 'right' | 'left';

export type LocalState = {
  date: DateType;
  startDate: DateType;
  endDate: DateType;
  dates: DateType[];
  calendarView: CalendarViews;
  currentDate: DateType; // used for latest state of calendar based on Month and Year
  currentYear: number;
};

export type CalendarAction = {
  type: CalendarActionKind;
  payload: any;
};

export type CalendarThemeProps = {
  headerButtonsPosition?: HeaderButtonPositions;
  headerContainerStyle?: ViewStyle;
  headerTextContainerStyle?: ViewStyle;
  headerTextStyle?: TextStyle;
  headerButtonStyle?: ViewStyle;
  headerButtonColor?: string;
  headerButtonSize?: number;
  dayContainerStyle?: ViewStyle;
  todayContainerStyle?: ViewStyle;
  todayTextStyle?: TextStyle;
  monthContainerStyle?: ViewStyle;
  yearContainerStyle?: ViewStyle;
  weekDaysContainerStyle?: ViewStyle;
  weekDaysTextStyle?: TextStyle;
  calendarTextStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
  selectedItemColor?: string;
  timePickerContainerStyle?: ViewStyle;
  timePickerTextStyle?: TextStyle;
  timePickerIndicatorStyle?: ViewStyle;
  timePickerDecelerationRate?: 'normal' | 'fast' | number;
  selectedRangeBackgroundColor?: string;
};

export type HeaderProps = {
  buttonPrevIcon?: ReactNode;
  buttonNextIcon?: ReactNode;
};

export interface IDayObject {
  text: string;
  day: number;
  date: string;
  disabled: boolean;
  isCurrentMonth: boolean;
  dayOfMonth?: number;
  inRange: boolean;
  leftCrop: boolean;
  rightCrop: boolean;
}

export type SingleChange = (params: { date: DateType }) => void;

export type RangeChange = (params: {
  startDate: DateType;
  endDate: DateType;
}) => void;

export type MultiChange = (params: {
  dates: DateType[];
  datePressed: DateType;
  change: 'added' | 'removed';
}) => void;

export interface DatePickerBaseProps {
  mode?: ModeType;
  locale?: string | ILocale; // If ILocale is required, define it somewhere
  startYear?: number;
  endYear?: number;
  minDate?: DateType;
  maxDate?: DateType;
  disabledDates?: DateType[] | ((date: DateType) => boolean);
  firstDayOfWeek?: number;
  displayFullDays?: boolean;
  timePicker?: boolean;
  is24Hours?: boolean;
  date?: DateType;
  dates?: DateType[];
  startDate?: DateType;
  endDate?: DateType;
  onChange?: SingleChange | RangeChange | MultiChange;
  initialView?: CalendarViews;
  height?: number;
}

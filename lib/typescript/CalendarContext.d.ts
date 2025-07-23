import { CalendarViews } from './enums';
import type { DateType, DatePickerBaseProps, CalendarThemeProps } from './types';
export interface CalendarContextType extends DatePickerBaseProps {
    locale: string | ILocale;
    displayFullDays: boolean;
    firstDayOfWeek: number;
    theme: CalendarThemeProps;
    calendarView: CalendarViews;
    currentDate: DateType;
    currentYear: number;
    setCalendarView: (value: CalendarViews) => void;
    onSelectDate: (date: DateType) => void;
    onSelectMonth: (month: number) => void;
    onSelectYear: (year: number) => void;
    onChangeMonth: (value: number) => void;
    onChangeYear: (value: number) => void;
}
declare const CalendarContext: import("react").Context<CalendarContextType>;
export declare const useCalendarContext: () => CalendarContextType;
export default CalendarContext;
//# sourceMappingURL=CalendarContext.d.ts.map
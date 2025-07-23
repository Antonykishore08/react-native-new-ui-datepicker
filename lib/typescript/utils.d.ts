import dayjs from 'dayjs';
import type { DateType, IDayObject } from './types';
export declare const CALENDAR_FORMAT = "YYYY-MM-DD HH:mm";
export declare const DATE_FORMAT = "YYYY-MM-DD";
export declare const YEAR_PAGE_SIZE = 12;
export declare const getMonths: () => dayjs.MonthNames;
export declare const getMonthName: (month: number) => string | undefined;
export declare const getWeekdays: () => dayjs.WeekdayNames;
export declare const getWeekdaysShort: () => dayjs.WeekdayNames;
export declare const getWeekdaysMin: (firstDayOfWeek: number) => dayjs.WeekdayNames;
export declare const getFormated: (date: DateType) => string;
export declare const getDateMonth: (date: DateType) => number;
export declare const getDateYear: (date: DateType) => number;
export declare const getToday: () => string;
export declare function areDatesOnSameDay(a: DateType, b: DateType): boolean;
export declare function isDateBetween(date: DateType, { startDate, endDate, }: {
    startDate?: DateType;
    endDate?: DateType;
}): boolean;
export declare function isDateDisabled(date: dayjs.Dayjs, { minDate, maxDate, disabledDates, }: {
    minDate?: DateType;
    maxDate?: DateType;
    disabledDates?: DateType[] | ((date: DateType) => boolean) | undefined;
}): boolean;
export declare const getFormatedDate: (date: DateType, format: string) => string;
export declare const getDate: (date: DateType) => dayjs.Dayjs;
export declare const getYearRange: (year: number) => number[];
export declare function getDaysInMonth(date: DateType, displayFullDays: boolean | undefined, firstDayOfWeek: number): {
    prevMonthDays: number;
    prevMonthOffset: number;
    daysInCurrentMonth: number;
    daysInNextMonth: number;
    fullDaysInMonth: number;
};
export declare function getFirstDayOfMonth(date: DateType, firstDayOfWeek: number): number;
export declare function getStartOfDay(date: DateType): DateType;
export declare function getEndOfDay(date: DateType): DateType;
export declare function dateToUnix(date: DateType): number;
/**
 * Get detailed date object
 *
 * @param date Get detailed date object
 *
 * @returns parsed date object
 */
export declare const getParsedDate: (date: DateType) => {
    year: number;
    month: number;
    hour: number;
    minute: number;
};
/**
 * Calculate month days array based on current date
 *
 * @param datetime - The current date that selected
 * @param displayFullDays
 * @param minDate - min selectable date
 * @param maxDate - max selectable date
 * @param disabledDates - array of disabled dates, or a function that returns true for a given date
 * @param firstDayOfWeek - first day of week, number 0-6, 0 – Sunday, 6 – Saturday
 *
 * @returns days array based on current date
 */
export declare const getMonthDays: (datetime: DateType, displayFullDays: boolean, minDate: DateType, maxDate: DateType, firstDayOfWeek: number, disabledDates: DateType[] | ((date: DateType) => boolean) | undefined) => IDayObject[];
export declare function addColorAlpha(color: string | undefined, opacity: number): string;
//# sourceMappingURL=utils.d.ts.map
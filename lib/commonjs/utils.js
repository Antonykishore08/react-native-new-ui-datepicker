"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.YEAR_PAGE_SIZE = exports.DATE_FORMAT = exports.CALENDAR_FORMAT = void 0;
exports.addColorAlpha = addColorAlpha;
exports.areDatesOnSameDay = areDatesOnSameDay;
exports.dateToUnix = dateToUnix;
exports.getDateYear = exports.getDateMonth = exports.getDate = void 0;
exports.getDaysInMonth = getDaysInMonth;
exports.getEndOfDay = getEndOfDay;
exports.getFirstDayOfMonth = getFirstDayOfMonth;
exports.getParsedDate = exports.getMonths = exports.getMonthName = exports.getMonthDays = exports.getFormatedDate = exports.getFormated = void 0;
exports.getStartOfDay = getStartOfDay;
exports.getYearRange = exports.getWeekdaysShort = exports.getWeekdaysMin = exports.getWeekdays = exports.getToday = void 0;
exports.isDateBetween = isDateBetween;
exports.isDateDisabled = isDateDisabled;
var _dayjs = _interopRequireDefault(require("dayjs"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CALENDAR_FORMAT = exports.CALENDAR_FORMAT = 'YYYY-MM-DD HH:mm';
const DATE_FORMAT = exports.DATE_FORMAT = 'YYYY-MM-DD';
const YEAR_PAGE_SIZE = exports.YEAR_PAGE_SIZE = 12;
const getMonths = () => _dayjs.default.months();
exports.getMonths = getMonths;
const getMonthName = month => _dayjs.default.months()[month];
exports.getMonthName = getMonthName;
const getWeekdays = () => _dayjs.default.weekdays();
exports.getWeekdays = getWeekdays;
const getWeekdaysShort = () => _dayjs.default.weekdaysShort();
exports.getWeekdaysShort = getWeekdaysShort;
const getWeekdaysMin = firstDayOfWeek => {
  let days = _dayjs.default.weekdaysMin();
  if (firstDayOfWeek > 0) {
    days = [...days.slice(firstDayOfWeek, days.length), ...days.slice(0, firstDayOfWeek)];
  }
  return days;
};
exports.getWeekdaysMin = getWeekdaysMin;
const getFormated = date => (0, _dayjs.default)(date).format(CALENDAR_FORMAT);
exports.getFormated = getFormated;
const getDateMonth = date => (0, _dayjs.default)(date).month();
exports.getDateMonth = getDateMonth;
const getDateYear = date => (0, _dayjs.default)(date).year();
exports.getDateYear = getDateYear;
const getToday = () => (0, _dayjs.default)().format(DATE_FORMAT);
exports.getToday = getToday;
function areDatesOnSameDay(a, b) {
  if (!a || !b) {
    return false;
  }
  const date_a = (0, _dayjs.default)(a).format(DATE_FORMAT);
  const date_b = (0, _dayjs.default)(b).format(DATE_FORMAT);
  return date_a === date_b;
}
function isDateBetween(date, {
  startDate,
  endDate
}) {
  if (!startDate || !endDate) {
    return false;
  }
  return (0, _dayjs.default)(date) <= endDate && (0, _dayjs.default)(date) >= startDate;
}
function isDateDisabled(date, {
  minDate,
  maxDate,
  disabledDates
}) {
  if (minDate && date < getDate(minDate)) {
    return true;
  }
  if (maxDate && date > getDate(maxDate)) {
    return true;
  }
  if (disabledDates) {
    if (Array.isArray(disabledDates)) {
      const isDisabled = disabledDates.some(disabledDate => areDatesOnSameDay(date, disabledDate));
      return isDisabled;
    } else if (disabledDates instanceof Function) {
      return disabledDates(date);
    }
  }
  return false;
}
const getFormatedDate = (date, format) => (0, _dayjs.default)(date).format(format);
exports.getFormatedDate = getFormatedDate;
const getDate = date => (0, _dayjs.default)(date, DATE_FORMAT);
exports.getDate = getDate;
const getYearRange = year => {
  const endYear = YEAR_PAGE_SIZE * Math.ceil(year / YEAR_PAGE_SIZE);
  let startYear = endYear === year ? endYear : endYear - YEAR_PAGE_SIZE;
  if (startYear < 0) {
    startYear = 0;
  }
  return Array.from({
    length: YEAR_PAGE_SIZE
  }, (_, i) => startYear + i);
};
exports.getYearRange = getYearRange;
function getDaysInMonth(date, displayFullDays, firstDayOfWeek) {
  const daysInCurrentMonth = (0, _dayjs.default)(date).daysInMonth();
  const prevMonthDays = (0, _dayjs.default)(date).add(-1, 'month').daysInMonth();
  const firstDay = (0, _dayjs.default)(date).date(1 - firstDayOfWeek);
  const prevMonthOffset = firstDay.day() % 7;
  const daysInPrevMonth = displayFullDays ? prevMonthOffset : 0;
  const monthDaysOffset = prevMonthOffset + daysInCurrentMonth;
  const daysInNextMonth = displayFullDays ? monthDaysOffset > 35 ? 42 - monthDaysOffset : 35 - monthDaysOffset : 0;
  const fullDaysInMonth = daysInPrevMonth + daysInCurrentMonth + daysInNextMonth;
  return {
    prevMonthDays,
    prevMonthOffset,
    daysInCurrentMonth,
    daysInNextMonth,
    fullDaysInMonth
  };
}
function getFirstDayOfMonth(date, firstDayOfWeek) {
  const d = getDate(date);
  return d.date(1 - firstDayOfWeek).day();
}
function getStartOfDay(date) {
  return (0, _dayjs.default)(date).startOf('day');
}
function getEndOfDay(date) {
  return (0, _dayjs.default)(date).endOf('day');
}
function dateToUnix(date) {
  return (0, _dayjs.default)(date).unix();
}

/**
 * Get detailed date object
 *
 * @param date Get detailed date object
 *
 * @returns parsed date object
 */
const getParsedDate = date => {
  return {
    year: (0, _dayjs.default)(date).year(),
    month: (0, _dayjs.default)(date).month(),
    hour: (0, _dayjs.default)(date).hour(),
    minute: (0, _dayjs.default)(date).minute()
  };
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
exports.getParsedDate = getParsedDate;
const getMonthDays = (datetime = (0, _dayjs.default)(), displayFullDays, minDate, maxDate, firstDayOfWeek, disabledDates) => {
  const date = getDate(datetime);
  const {
    prevMonthDays,
    prevMonthOffset,
    daysInCurrentMonth,
    daysInNextMonth
  } = getDaysInMonth(datetime, displayFullDays, firstDayOfWeek);
  const prevDays = displayFullDays ? Array.from({
    length: prevMonthOffset
  }, (_, index) => {
    const day = index + (prevMonthDays - prevMonthOffset + 1);
    const thisDay = date.add(-1, 'month').date(day);
    return generateDayObject(day, thisDay, minDate, maxDate, disabledDates, false, index + 1);
  }) : Array(prevMonthOffset).fill(null);
  const currentDays = Array.from({
    length: daysInCurrentMonth
  }, (_, index) => {
    const day = index + 1;
    const thisDay = date.date(day);
    return generateDayObject(day, thisDay, minDate, maxDate, disabledDates, true, prevMonthOffset + day);
  });
  const nextDays = Array.from({
    length: daysInNextMonth
  }, (_, index) => {
    const day = index + 1;
    const thisDay = date.add(1, 'month').date(day);
    return generateDayObject(day, thisDay, minDate, maxDate, disabledDates, false, daysInCurrentMonth + prevMonthOffset + day);
  });
  return [...prevDays, ...currentDays, ...nextDays];
};

/**
 * Generate day object for displaying inside day cell
 *
 * @param day - number of day
 * @param date - calculated date based on day, month, and year
 * @param minDate - min selectable date
 * @param maxDate - max selectable date
 * @param disabledDates - array of disabled dates, or a function that returns true for a given date
 * @param isCurrentMonth - define the day is in the current month
 *
 * @returns days object based on current date
 */
exports.getMonthDays = getMonthDays;
const generateDayObject = (day, date, minDate, maxDate, disabledDates, isCurrentMonth, dayOfMonth) => {
  return {
    text: day.toString(),
    day: day,
    date: getFormatedDate(date, DATE_FORMAT),
    disabled: isDateDisabled(date, {
      minDate,
      maxDate,
      disabledDates
    }),
    isCurrentMonth,
    dayOfMonth
  };
};
function addColorAlpha(color, opacity) {
  //if it has an alpha, remove it
  if (!color) {
    color = '#000000';
  }
  if (color.length > 7) {
    color = color.substring(0, color.length - 2);
  }

  // coerce values so ti is between 0 and 1.
  const _opacity = Math.round(Math.min(Math.max(opacity, 0), 1) * 255);
  let opacityHex = _opacity.toString(16).toUpperCase();

  // opacities near 0 need a trailing 0
  if (opacityHex.length === 1) {
    opacityHex = '0' + opacityHex;
  }
  return color + opacityHex;
}
//# sourceMappingURL=utils.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CalendarContext = require("../CalendarContext");
var _utils = require("../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const YearSelector = () => {
  const {
    currentDate,
    currentYear,
    date,
    onSelectYear,
    theme
  } = (0, _CalendarContext.useCalendarContext)();
  const selectedYear = (0, _utils.getDateYear)(date);
  const generateCells = (0, _react.useCallback)(() => {
    const years = (0, _utils.getYearRange)(currentYear);
    const activeYear = (0, _utils.getDateYear)(currentDate);
    const column = years.map(year => {
      const activeItemStyle = year === selectedYear ? {
        borderColor: (theme === null || theme === void 0 ? void 0 : theme.selectedItemColor) || '#0047FF',
        backgroundColor: (theme === null || theme === void 0 ? void 0 : theme.selectedItemColor) || '#0047FF'
      } : year === activeYear ? {
        borderColor: (theme === null || theme === void 0 ? void 0 : theme.selectedItemColor) || '#0047FF'
      } : {};
      const textStyle = year === selectedYear ? {
        color: '#fff',
        ...(theme === null || theme === void 0 ? void 0 : theme.selectedTextStyle)
      } : year === activeYear ? {
        color: (theme === null || theme === void 0 ? void 0 : theme.selectedItemColor) || '#0047FF',
        fontWeight: 'bold'
      } : {
        ...(theme === null || theme === void 0 ? void 0 : theme.calendarTextStyle)
      };
      return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
        key: year,
        onPress: () => onSelectYear(year),
        style: styles.yearCell,
        accessibilityRole: "button",
        accessibilityLabel: year.toString()
      }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
        style: [styles.year, theme === null || theme === void 0 ? void 0 : theme.yearContainerStyle, activeItemStyle]
      }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
        key: year,
        style: textStyle
      }, year)));
    });
    return column;
  }, [onSelectYear, selectedYear, currentYear, currentDate, theme]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container,
    testID: "year-selector"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.years
  }, generateCells()));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    width: '100%'
  },
  yearCell: {
    width: '33.3%'
  },
  years: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  year: {
    paddingVertical: 15,
    margin: 2,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF'
  }
});
var _default = exports.default = YearSelector;
//# sourceMappingURL=YearSelector.js.map
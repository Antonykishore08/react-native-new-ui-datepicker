"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _CalendarContext = require("../../CalendarContext");
var _utils = require("../../utils");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const arrow_right = require('../../assets/images/arrow_right.png');
const NextButton = ({
  icon
}) => {
  const {
    currentYear,
    onChangeMonth,
    onChangeYear,
    calendarView,
    theme
  } = (0, _CalendarContext.useCalendarContext)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    disabled: calendarView === 'time',
    onPress: () => calendarView === 'day' ? onChangeMonth(1) : calendarView === 'month' ? onChangeYear(currentYear + 1) : calendarView === 'year' && onChangeYear(currentYear + _utils.YEAR_PAGE_SIZE),
    testID: "btn-next",
    accessibilityRole: "button",
    accessibilityLabel: "Next"
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.iconContainer, styles.next, theme === null || theme === void 0 ? void 0 : theme.headerButtonStyle]
  }, icon || /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: arrow_right,
    style: {
      width: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      height: (theme === null || theme === void 0 ? void 0 : theme.headerButtonSize) || 18,
      tintColor: theme === null || theme === void 0 ? void 0 : theme.headerButtonColor
    }
  })));
};
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(NextButton);
const styles = _reactNative.StyleSheet.create({
  iconContainer: {
    padding: 4
  },
  next: {
    marginLeft: 3
  }
});
//# sourceMappingURL=NextButton.js.map
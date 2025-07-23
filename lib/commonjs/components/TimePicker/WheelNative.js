"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _wheelPicker = _interopRequireDefault(require("./wheel-picker"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const WheelNative = ({
  value,
  setValue = () => {},
  items,
  theme
}) => {
  const containerStyle = (0, _react.useMemo)(() => ({
    ...styles.container,
    ...(theme === null || theme === void 0 ? void 0 : theme.timePickerContainerStyle)
  }), [theme === null || theme === void 0 ? void 0 : theme.timePickerContainerStyle]);
  const itemTextStyle = (0, _react.useMemo)(() => ({
    ...styles.timePickerText,
    ...(theme === null || theme === void 0 ? void 0 : theme.timePickerTextStyle)
  }), [theme === null || theme === void 0 ? void 0 : theme.timePickerTextStyle]);
  return /*#__PURE__*/_react.default.createElement(_wheelPicker.default, {
    selectedIndex: value,
    options: items,
    onChange: setValue,
    containerStyle: containerStyle,
    itemTextStyle: itemTextStyle,
    selectedIndicatorStyle: {
      ...(theme === null || theme === void 0 ? void 0 : theme.timePickerIndicatorStyle)
    },
    itemHeight: 45,
    decelerationRate: theme === null || theme === void 0 ? void 0 : theme.timePickerDecelerationRate
  });
};
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(WheelNative);
const styles = _reactNative.StyleSheet.create({
  container: {
    display: 'flex',
    ..._reactNative.Platform.select({
      web: {
        userSelect: 'none'
      }
    })
  },
  timePickerText: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
//# sourceMappingURL=WheelNative.js.map
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _PrevButton = _interopRequireDefault(require("./PrevButton"));
var _NextButton = _interopRequireDefault(require("./NextButton"));
var _Selectors = _interopRequireDefault(require("./Selectors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Header = ({
  buttonPrevIcon,
  buttonNextIcon,
  theme
}) => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.headerContainer, theme === null || theme === void 0 ? void 0 : theme.headerContainerStyle],
    accessibilityRole: "header"
  }, (theme === null || theme === void 0 ? void 0 : theme.headerButtonsPosition) === 'left' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, /*#__PURE__*/_react.default.createElement(_PrevButton.default, {
    icon: buttonPrevIcon,
    theme: theme
  }), /*#__PURE__*/_react.default.createElement(_NextButton.default, {
    icon: buttonNextIcon
  })), /*#__PURE__*/_react.default.createElement(_Selectors.default, null)) : (theme === null || theme === void 0 ? void 0 : theme.headerButtonsPosition) === 'right' ? /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_Selectors.default, null), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.row
  }, /*#__PURE__*/_react.default.createElement(_PrevButton.default, {
    icon: buttonPrevIcon,
    theme: theme
  }), /*#__PURE__*/_react.default.createElement(_NextButton.default, {
    icon: buttonNextIcon
  }))) : /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_PrevButton.default, {
    icon: buttonPrevIcon,
    theme: theme
  }), /*#__PURE__*/_react.default.createElement(_Selectors.default, null), /*#__PURE__*/_react.default.createElement(_NextButton.default, {
    icon: buttonNextIcon
  })));
};
const styles = _reactNative.StyleSheet.create({
  headerContainer: {
    marginBottom: 5
  },
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row'
  }
});
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(Header);
//# sourceMappingURL=index.js.map
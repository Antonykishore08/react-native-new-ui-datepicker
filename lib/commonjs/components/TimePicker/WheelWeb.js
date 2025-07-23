"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _react = _interopRequireWildcard(require("react"));
var _AnimatedMath = require("./AnimatedMath");
var _enums = require("../../enums");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const WheelWeb = ({
  value,
  setValue = () => {},
  items,
  theme
}) => {
  const displayCount = 5;
  const translateY = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const renderCount = displayCount * 2 < items.length ? displayCount * 8 : displayCount * 2 - 1;
  const circular = items.length >= displayCount;
  const height = 130;
  const radius = height / 2;
  const valueIndex = (0, _react.useMemo)(() => items.indexOf(('0' + value).slice(-2)), [items, value]);
  const panResponder = (0, _react.useMemo)(() => {
    return _reactNative.PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: () => {
        translateY.setValue(0);
      },
      onPanResponderMove: (evt, gestureState) => {
        translateY.setValue(gestureState.dy);
        evt.stopPropagation();
      },
      onPanResponderRelease: (_, gestureState) => {
        translateY.extractOffset();
        let newValueIndex = valueIndex - Math.round(gestureState.dy / (radius * 2 / displayCount));
        if (circular) {
          newValueIndex = (newValueIndex + items.length) % items.length;
        } else {
          if (newValueIndex < 0) {
            newValueIndex = 0;
          } else if (newValueIndex >= items.length) {
            newValueIndex = items.length - 1;
          }
        }
        const newValue = items[newValueIndex] || '00';
        if (newValue === ('0' + value).slice(-2)) {
          translateY.setOffset(0);
          translateY.setValue(0);
        } else {
          setValue(parseInt(newValue));
        }
      }
    });
  }, [circular, displayCount, radius, setValue, value, valueIndex, items, translateY]);
  const displayValues = (0, _react.useMemo)(() => {
    const centerIndex = Math.floor(renderCount / 2);
    return Array.from({
      length: renderCount
    }, (_, index) => {
      let targetIndex = valueIndex + index - centerIndex;
      if (targetIndex < 0 || targetIndex >= items.length) {
        if (!circular) {
          return 0;
        }
        targetIndex = (targetIndex + items.length) % items.length;
      }
      return items[targetIndex] || 0;
    });
  }, [renderCount, valueIndex, items, circular]);
  const animatedAngles = (0, _react.useMemo)(() => {
    //translateY.setValue(0);
    translateY.setOffset(0);
    const currentIndex = displayValues.indexOf(('0' + value).slice(-2));
    return displayValues && displayValues.length > 0 ? displayValues.map((_, index) => translateY.interpolate({
      inputRange: [-radius, radius],
      outputRange: [-radius + radius * 2 / displayCount * (index - currentIndex), radius + radius * 2 / displayCount * (index - currentIndex)],
      extrapolate: 'extend'
    }).interpolate({
      inputRange: [-radius, radius],
      outputRange: [-Math.PI / 2, Math.PI / 2],
      extrapolate: 'clamp'
    })) : [];
  }, [displayValues, radius, value, displayCount, translateY]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    style: [styles.container]
  }, panResponder.panHandlers), displayValues === null || displayValues === void 0 ? void 0 : displayValues.map((displayValue, index) => {
    const animatedAngle = animatedAngles[index];
    return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.Text, {
      key: `${displayValue}-${index}`,
      style: [{
        ...styles.timePickerText,
        ...(theme === null || theme === void 0 ? void 0 : theme.timePickerTextStyle)
      },
      // eslint-disable-next-line react-native/no-inline-styles
      {
        position: 'absolute',
        height: 25,
        transform: animatedAngle ? [{
          translateY: _reactNative.Animated.multiply(radius, (0, _AnimatedMath.sin)(animatedAngle))
        }, {
          rotateX: animatedAngle.interpolate({
            inputRange: [-Math.PI / 2, Math.PI / 2],
            outputRange: ['-89deg', '89deg'],
            extrapolate: 'clamp'
          })
        }] : [],
        opacity: displayValue !== ('0' + value).slice(-2) ? 0.3 : 1
      }]
    }, displayValue);
  }));
};
const styles = _reactNative.StyleSheet.create({
  container: {
    minWidth: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: _enums.CALENDAR_HEIGHT / 2,
    ..._reactNative.Platform.select({
      web: {
        cursor: 'pointer',
        userSelect: 'none'
      }
    })
  },
  contentContainer: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  timePickerText: {
    fontSize: 24,
    fontWeight: 'bold'
  }
});
var _default = exports.default = /*#__PURE__*/(0, _react.memo)(WheelWeb, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value && prevProps.setValue === nextProps.setValue;
});
//# sourceMappingURL=WheelWeb.js.map
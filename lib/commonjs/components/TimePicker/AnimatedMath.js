"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalize = normalize;
exports.sin = sin;
var _reactNative = require("react-native");
const FACTORIAL_3 = 3 * 2;
const FACTORIAL_5 = 5 * 4 * FACTORIAL_3;
const FACTORIAL_7 = 7 * 6 * FACTORIAL_5;
function sin(animated) {
  const normalized = normalize(animated);
  const square = _reactNative.Animated.multiply(normalized, normalized);
  const pow3 = _reactNative.Animated.multiply(normalized, square);
  const pow5 = _reactNative.Animated.multiply(pow3, square);
  const pow7 = _reactNative.Animated.multiply(pow5, square);
  return _reactNative.Animated.add(_reactNative.Animated.add(normalized, _reactNative.Animated.multiply(pow3, -1 / FACTORIAL_3)), _reactNative.Animated.add(_reactNative.Animated.multiply(pow5, 1 / FACTORIAL_5), _reactNative.Animated.multiply(pow7, -1 / FACTORIAL_7)));
}
function normalize(animated) {
  return _reactNative.Animated.add(_reactNative.Animated.modulo(_reactNative.Animated.add(animated, Math.PI), Math.PI * 2), -Math.PI).interpolate({
    inputRange: [-Math.PI, -Math.PI / 2, Math.PI / 2, Math.PI],
    outputRange: [0, -Math.PI / 2, Math.PI / 2, 0]
  });
}
//# sourceMappingURL=AnimatedMath.js.map
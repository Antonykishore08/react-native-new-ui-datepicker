"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _wheelPicker = _interopRequireDefault(require("./wheel-picker.style"));
var _wheelPickerItem = _interopRequireDefault(require("./wheel-picker-item"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const WheelPicker = ({
  selectedIndex,
  options,
  onChange,
  selectedIndicatorStyle = {},
  containerStyle = {},
  itemStyle = {},
  itemTextStyle = {},
  itemHeight = 40,
  scaleFunction = x => 1.0 ** x,
  rotationFunction = x => 1 - Math.pow(1 / 2, x),
  opacityFunction = x => Math.pow(1 / 3, x),
  visibleRest = 2,
  decelerationRate = 'fast',
  containerProps = {},
  flatListProps = {}
}) => {
  const flatListRef = (0, _react.useRef)(null);
  const [scrollY] = (0, _react.useState)(new _reactNative.Animated.Value(selectedIndex * itemHeight));
  const containerHeight = (1 + visibleRest * 2) * itemHeight;
  const paddedOptions = (0, _react.useMemo)(() => {
    const array = [...options];
    for (let i = 0; i < visibleRest; i++) {
      array.unshift(null);
      array.push(null);
    }
    return array;
  }, [options, visibleRest]);
  const offsets = (0, _react.useMemo)(() => [...Array(paddedOptions.length)].map((_, i) => i * itemHeight), [paddedOptions, itemHeight]);
  const currentScrollIndex = (0, _react.useMemo)(() => _reactNative.Animated.add(_reactNative.Animated.divide(scrollY, itemHeight), visibleRest), [visibleRest, scrollY, itemHeight]);
  const handleMomentumScrollEnd = event => {
    // Due to list bounciness when scrolling to the start or the end of the list
    // the offset might be negative or over the last item.
    // We therefore clamp the offset to the supported range.
    const offsetY = Math.min(itemHeight * (options.length - 1), Math.max(event.nativeEvent.contentOffset.y, 0));
    let index = Math.floor(Math.floor(offsetY) / itemHeight);
    const last = Math.floor(offsetY % itemHeight);
    if (last > itemHeight / 2) {
      index++;
    }
    if (index !== selectedIndex) {
      onChange(index);
    }
  };
  (0, _react.useEffect)(() => {
    if (selectedIndex < 0 || selectedIndex >= options.length) {
      throw new Error(`Selected index ${selectedIndex} is out of bounds [0, ${options.length - 1}]`);
    }
  }, [selectedIndex, options]);

  /**
   * If selectedIndex is changed from outside (not via onChange) we need to scroll to the specified index.
   * This ensures that what the user sees as selected in the picker always corresponds to the value state.
   */
  (0, _react.useEffect)(() => {
    var _flatListRef$current;
    (_flatListRef$current = flatListRef.current) === null || _flatListRef$current === void 0 || _flatListRef$current.scrollToIndex({
      index: selectedIndex,
      animated: _reactNative.Platform.OS === 'ios'
    });
  }, [selectedIndex, itemHeight]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, _extends({
    style: [_wheelPicker.default.container, {
      height: containerHeight
    }, containerStyle]
  }, containerProps), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [_wheelPicker.default.selectedIndicator, selectedIndicatorStyle, {
      transform: [{
        translateY: -itemHeight / 2
      }],
      height: itemHeight
    }]
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.FlatList, _extends({}, flatListProps, {
    ref: flatListRef,
    style: _wheelPicker.default.scrollView,
    showsVerticalScrollIndicator: false,
    onScroll: _reactNative.Animated.event([{
      nativeEvent: {
        contentOffset: {
          y: scrollY
        }
      }
    }], {
      useNativeDriver: true
    }),
    onMomentumScrollEnd: handleMomentumScrollEnd,
    snapToOffsets: offsets,
    decelerationRate: decelerationRate,
    initialScrollIndex: selectedIndex,
    getItemLayout: (_, index) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index
    }),
    data: paddedOptions,
    keyExtractor: (_, index) => index.toString(),
    renderItem: ({
      item: option,
      index
    }) => /*#__PURE__*/_react.default.createElement(_wheelPickerItem.default, {
      key: `option-${index}`,
      index: index,
      option: option,
      style: itemStyle,
      textStyle: itemTextStyle,
      height: itemHeight,
      currentScrollIndex: currentScrollIndex,
      scaleFunction: scaleFunction,
      rotationFunction: rotationFunction,
      opacityFunction: opacityFunction,
      visibleRest: visibleRest
    })
  })));
};
var _default = exports.default = WheelPicker;
//# sourceMappingURL=wheel-picker.js.map
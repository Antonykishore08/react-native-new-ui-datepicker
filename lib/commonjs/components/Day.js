"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.daySize = exports.EmptyDay = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _enums = require("../enums");
var _utils = require("../utils");
var _lodash = require("lodash");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const daySize = exports.daySize = 46;
const EmptyDay = exports.EmptyDay = /*#__PURE__*/_react.default.memo(({
  height
}) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
  style: styles(height || _enums.CALENDAR_HEIGHT).dayCell
}));
function Day({
  date,
  text,
  disabled,
  isCurrentMonth,
  isToday,
  isSelected,
  inRange,
  leftCrop,
  rightCrop,
  onSelectDate,
  theme,
  height
}) {
  const onPress = _react.default.useCallback(() => onSelectDate(date), [onSelectDate, date]);
  const {
    calendarTextStyle,
    dayContainerStyle,
    selectedItemColor = '#0047FF',
    selectedTextStyle,
    todayContainerStyle,
    todayTextStyle,
    selectedRangeBackgroundColor
  } = theme;
  const style = styles(height || _enums.CALENDAR_HEIGHT);
  const rangeBackground = selectedRangeBackgroundColor ?? (0, _utils.addColorAlpha)(selectedItemColor, 0.15);
  const isCrop = inRange && (leftCrop || rightCrop) && !(leftCrop && rightCrop);
  const containerStyle = _reactNative.StyleSheet.flatten([style.dayContainer, isCurrentMonth || isCrop ? dayContainerStyle : style.disabledDay, isToday && {
    borderWidth: 2,
    borderColor: selectedItemColor,
    ...todayContainerStyle
  }, isSelected && {
    borderColor: selectedItemColor,
    backgroundColor: selectedItemColor
  }]);
  const textStyle = _reactNative.StyleSheet.flatten([isSelected ? {
    color: '#fff',
    ...selectedTextStyle
  } : isToday ? {
    ...calendarTextStyle,
    color: selectedItemColor,
    ...todayTextStyle
  } : calendarTextStyle]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.dayCell
  }, inRange && !isCrop && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.rangeRoot, {
      backgroundColor: rangeBackground
    }]
  }), isCrop && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, leftCrop && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.rangeRoot, {
      left: '50%',
      backgroundColor: rangeBackground
    }]
  }), rightCrop && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [style.rangeRoot, {
      right: '50%',
      backgroundColor: rangeBackground
    }]
  })), /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
    disabled: disabled,
    onPress: onPress,
    style: containerStyle,
    testID: date,
    accessibilityRole: "button",
    accessibilityLabel: text
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: style.dayTextContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: textStyle
  }, text))));
}
const styles = height => _reactNative.StyleSheet.create({
  dayCell: {
    position: 'relative',
    width: '14.25%',
    height: height / 7
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1.5,
    borderRadius: 100
  },
  dayTextContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  disabledDay: {
    opacity: 0.3
  },
  rangeRoot: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 2,
    bottom: 2
  }
});
const customComparator = (prevProps, nextProps) => Object.is(prevProps.date, nextProps.date) && Object.is(prevProps.text, nextProps.text) && prevProps.disabled === nextProps.disabled && prevProps.isCurrentMonth === nextProps.isCurrentMonth && prevProps.isToday === nextProps.isToday && prevProps.isSelected === nextProps.isSelected && prevProps.inRange === nextProps.inRange && prevProps.leftCrop === nextProps.leftCrop && prevProps.rightCrop === nextProps.rightCrop && prevProps.onSelectDate === nextProps.onSelectDate && prevProps.height === nextProps.height && (0, _lodash.isEqual)(prevProps.theme, nextProps.theme);
var _default = exports.default = /*#__PURE__*/_react.default.memo(Day, customComparator);
//# sourceMappingURL=Day.js.map
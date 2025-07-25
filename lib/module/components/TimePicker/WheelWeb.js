function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import { Animated, PanResponder, StyleSheet, View, Platform } from 'react-native';
import React, { memo, useMemo, useRef } from 'react';
import { sin } from './AnimatedMath';
import { CALENDAR_HEIGHT } from '../../enums';
const WheelWeb = ({
  value,
  setValue = () => {},
  items,
  theme
}) => {
  const displayCount = 5;
  const translateY = useRef(new Animated.Value(0)).current;
  const renderCount = displayCount * 2 < items.length ? displayCount * 8 : displayCount * 2 - 1;
  const circular = items.length >= displayCount;
  const height = 130;
  const radius = height / 2;
  const valueIndex = useMemo(() => items.indexOf(('0' + value).slice(-2)), [items, value]);
  const panResponder = useMemo(() => {
    return PanResponder.create({
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
  const displayValues = useMemo(() => {
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
  const animatedAngles = useMemo(() => {
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
  return /*#__PURE__*/React.createElement(View, _extends({
    style: [styles.container]
  }, panResponder.panHandlers), displayValues === null || displayValues === void 0 ? void 0 : displayValues.map((displayValue, index) => {
    const animatedAngle = animatedAngles[index];
    return /*#__PURE__*/React.createElement(Animated.Text, {
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
          translateY: Animated.multiply(radius, sin(animatedAngle))
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
const styles = StyleSheet.create({
  container: {
    minWidth: 30,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: CALENDAR_HEIGHT / 2,
    ...Platform.select({
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
export default /*#__PURE__*/memo(WheelWeb, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value && prevProps.setValue === nextProps.setValue;
});
//# sourceMappingURL=WheelWeb.js.map
import React, { memo, useMemo } from 'react';
import { StyleSheet, Platform } from 'react-native';
import WheelPicker from './wheel-picker';
const WheelNative = ({
  value,
  setValue = () => {},
  items,
  theme
}) => {
  const containerStyle = useMemo(() => ({
    ...styles.container,
    ...(theme === null || theme === void 0 ? void 0 : theme.timePickerContainerStyle)
  }), [theme === null || theme === void 0 ? void 0 : theme.timePickerContainerStyle]);
  const itemTextStyle = useMemo(() => ({
    ...styles.timePickerText,
    ...(theme === null || theme === void 0 ? void 0 : theme.timePickerTextStyle)
  }), [theme === null || theme === void 0 ? void 0 : theme.timePickerTextStyle]);
  return /*#__PURE__*/React.createElement(WheelPicker, {
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
export default /*#__PURE__*/memo(WheelNative);
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    ...Platform.select({
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
import React, { memo } from 'react';
import { Platform } from 'react-native';
import WheelNative from './WheelNative';
import WheelWeb from './WheelWeb';
const Wheel = props => {
  const Component = Platform.OS === 'web' ? WheelWeb : WheelNative;
  return /*#__PURE__*/React.createElement(Component, props);
};
export default /*#__PURE__*/memo(Wheel);
//# sourceMappingURL=Wheel.js.map
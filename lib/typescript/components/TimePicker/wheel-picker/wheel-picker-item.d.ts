import React from 'react';
import { StyleProp, TextStyle, Animated, ViewStyle } from 'react-native';
interface ItemProps {
    textStyle: StyleProp<TextStyle>;
    style: StyleProp<ViewStyle>;
    option: string | null;
    height: number;
    index: number;
    currentScrollIndex: Animated.AnimatedAddition<number>;
    visibleRest: number;
    rotationFunction: (x: number) => number;
    opacityFunction: (x: number) => number;
    scaleFunction: (x: number) => number;
}
declare const _default: React.NamedExoticComponent<ItemProps>;
export default _default;
//# sourceMappingURL=wheel-picker-item.d.ts.map
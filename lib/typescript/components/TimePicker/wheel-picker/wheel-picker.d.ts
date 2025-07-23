import React from 'react';
import { StyleProp, TextStyle, ViewStyle, ViewProps, FlatListProps } from 'react-native';
interface Props {
    selectedIndex: number;
    options: string[];
    onChange: (index: number) => void;
    selectedIndicatorStyle?: StyleProp<ViewStyle>;
    itemTextStyle?: TextStyle;
    itemStyle?: ViewStyle;
    itemHeight?: number;
    containerStyle?: ViewStyle;
    containerProps?: Omit<ViewProps, 'style'>;
    scaleFunction?: (x: number) => number;
    rotationFunction?: (x: number) => number;
    opacityFunction?: (x: number) => number;
    visibleRest?: number;
    decelerationRate?: 'normal' | 'fast' | number;
    flatListProps?: Omit<FlatListProps<string | null>, 'data' | 'renderItem'>;
}
declare const WheelPicker: React.FC<Props>;
export default WheelPicker;
//# sourceMappingURL=wheel-picker.d.ts.map
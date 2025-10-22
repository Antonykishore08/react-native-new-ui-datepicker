import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  StyleProp,
  TextStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  ViewStyle,
  View,
  ViewProps,
  FlatListProps,
  FlatList,
  Platform,
} from 'react-native';
import styles from './wheel-picker.style';
import WheelPickerItem from './wheel-picker-item';

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
  infiniteScroll?: boolean;
}

const REPEAT_COUNT = 80;

const WheelPicker: React.FC<Props> = ({
  selectedIndex,
  options,
  onChange,
  selectedIndicatorStyle = {},
  containerStyle = {},
  itemStyle = {},
  itemTextStyle = {},
  itemHeight = 40,
  scaleFunction = () => 1,
  rotationFunction = () => 0,
  opacityFunction = (x: number) => Math.pow(1 / 3, x),
  visibleRest = 2,
  decelerationRate = 'fast',
  containerProps = {},
  flatListProps = {},
  infiniteScroll = true,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const [scrollY] = useState(new Animated.Value(0));

  const containerHeight = (1 + visibleRest * 2) * itemHeight;
  const middleBatch = infiniteScroll ? Math.floor(REPEAT_COUNT / 2) : 0;

  const extendedOptions = useMemo(() => {
    if (!infiniteScroll) return options;
    const repeated: string[] = [];
    for (let i = 0; i < REPEAT_COUNT; i++) {
      repeated.push(...options);
    }
    return repeated;
  }, [options, infiniteScroll]);

  const paddedOptions = useMemo(() => {
    const fillers = Array(visibleRest).fill(null);
    return [...fillers, ...extendedOptions, ...fillers];
  }, [extendedOptions, visibleRest]);

  const offsets = useMemo(
    () => Array.from({ length: paddedOptions.length }, (_, i) => i * itemHeight),
    [paddedOptions.length, itemHeight]
  );

  const currentScrollIndex = useMemo(
    () => Animated.add(Animated.divide(scrollY, itemHeight), visibleRest),
    [scrollY, itemHeight, visibleRest]
  );

  const initialIndex = useMemo(
    () => middleBatch * options.length + selectedIndex,
    [middleBatch, options.length, selectedIndex]
  );

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    let index = Math.round(offsetY / itemHeight);
    const realIndex = infiniteScroll ? index % options.length : index;

    if (realIndex !== selectedIndex) {
      onChange(realIndex);
    }

    if (infiniteScroll) {
      const middleIndex = middleBatch * options.length + realIndex;
      if (Math.abs(index - middleIndex) > options.length) {
        requestAnimationFrame(() => {
          flatListRef.current?.scrollToIndex({
            index: middleIndex,
            animated: false,
          });
        });
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index: initialIndex,
        animated: false,
      });
    }, 500);
  }, [initialIndex]);

  return (
    <View
      style={[styles.container, { height: containerHeight }, containerStyle]}
      {...containerProps}
    >
      <View
        style={[
          styles.selectedIndicator,
          selectedIndicatorStyle,
          {
            transform: [{ translateY: -itemHeight / 2 }],
            height: itemHeight,
          },
        ]}
      />
      <Animated.FlatList<string | null>
        {...flatListProps}
        ref={flatListRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToOffsets={offsets}
        decelerationRate={decelerationRate}
        initialScrollIndex={initialIndex}
        maxToRenderPerBatch={50}
        windowSize={10}
        initialNumToRender={visibleRest * 2 + 1}
        removeClippedSubviews={false}
        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}
        data={paddedOptions}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item: option, index }) => (
          <WheelPickerItem
            index={index}
            option={option}
            style={itemStyle}
            textStyle={itemTextStyle}
            height={itemHeight}
            currentScrollIndex={currentScrollIndex}
            scaleFunction={scaleFunction}
            rotationFunction={rotationFunction}
            opacityFunction={(x) => (x === 0 ? 1 : Math.max(0.5, 1 - Math.abs(x) / visibleRest))}
            visibleRest={visibleRest}
          />
        )}
      />
    </View>
  );
};

export default WheelPicker;



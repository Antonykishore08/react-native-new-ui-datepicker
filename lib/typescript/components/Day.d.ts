import React from 'react';
import { CalendarThemeProps, IDayObject } from '../types';
export declare const daySize = 46;
interface Props extends Omit<IDayObject, 'day'> {
    isToday: boolean;
    isSelected: boolean;
    onSelectDate: (date: string) => void;
    theme: CalendarThemeProps;
    height?: number;
}
export declare const EmptyDay: React.MemoExoticComponent<({ height }: {
    height?: number | undefined;
}) => JSX.Element>;
declare function Day({ date, text, disabled, isCurrentMonth, isToday, isSelected, inRange, leftCrop, rightCrop, onSelectDate, theme, height, }: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof Day>;
export default _default;
//# sourceMappingURL=Day.d.ts.map
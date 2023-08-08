import Box from "./Box";
import {
  AlignItems,
  Cols,
  JustifyContent,
  Margin,
  getAlignItemsClasses,
  getColsClasses,
  getJustifyContentClasses,
  getMarginEndClasses,
  getMarginStartClasses,
} from "./Grid";

export const baseStackClasses = "" as const;

export const orientationsClassesMap = {
  vertical: "vstack",
  horizontal: "hstack",
} as const;

export const gapsClassesMap = {
  "0": ["gap-0", "row-gap-0", "column-gap-0"],
  "1": ["gap-1", "row-gap-1", "column-gap-1"],
  "2": ["gap-2", "row-gap-2", "column-gap-2"],
  "3": ["gap-3", "row-gap-3", "column-gap-3"],
  "4": ["gap-4", "row-gap-4", "column-gap-4"],
  "5": ["gap-5", "row-gap-5", "column-gap-5"],
  "sm-0": ["gap-sm-0", "row-gap-sm-0", "column-gap-sm-0"],
  "sm-1": ["gap-sm-1", "row-gap-sm-1", "column-gap-sm-1"],
  "sm-2": ["gap-sm-2", "row-gap-sm-2", "column-gap-sm-2"],
  "sm-3": ["gap-sm-3", "row-gap-sm-3", "column-gap-sm-3"],
  "sm-4": ["gap-sm-4", "row-gap-sm-4", "column-gap-sm-4"],
  "sm-5": ["gap-sm-5", "row-gap-sm-5", "column-gap-sm-5"],
  "md-0": ["gap-md-0", "row-gap-md-0", "column-gap-md-0"],
  "md-1": ["gap-md-1", "row-gap-md-1", "column-gap-md-1"],
  "md-2": ["gap-md-2", "row-gap-md-2", "column-gap-md-2"],
  "md-3": ["gap-md-3", "row-gap-md-3", "column-gap-md-3"],
  "md-4": ["gap-md-4", "row-gap-md-4", "column-gap-md-4"],
  "md-5": ["gap-md-5", "row-gap-md-5", "column-gap-md-5"],
  "lg-0": ["gap-lg-0", "row-gap-lg-0", "column-gap-lg-0"],
  "lg-1": ["gap-lg-1", "row-gap-lg-1", "column-gap-lg-1"],
  "lg-2": ["gap-lg-2", "row-gap-lg-2", "column-gap-lg-2"],
  "lg-3": ["gap-lg-3", "row-gap-lg-3", "column-gap-lg-3"],
  "lg-4": ["gap-lg-4", "row-gap-lg-4", "column-gap-lg-4"],
  "lg-5": ["gap-lg-5", "row-gap-lg-5", "column-gap-lg-5"],
  "xl-0": ["gap-xl-0", "row-gap-xl-0", "column-gap-xl-0"],
  "xl-1": ["gap-xl-1", "row-gap-xl-1", "column-gap-xl-1"],
  "xl-2": ["gap-xl-2", "row-gap-xl-2", "column-gap-xl-2"],
  "xl-3": ["gap-xl-3", "row-gap-xl-3", "column-gap-xl-3"],
  "xl-4": ["gap-xl-4", "row-gap-xl-4", "column-gap-xl-4"],
  "xl-5": ["gap-xl-5", "row-gap-xl-5", "column-gap-xl-5"],
  "xxl-0": ["gap-xxl-0", "row-gap-xxl-0", "column-gap-xxl-0"],
  "xxl-1": ["gap-xxl-1", "row-gap-xxl-1", "column-gap-xxl-1"],
  "xxl-2": ["gap-xxl-2", "row-gap-xxl-2", "column-gap-xxl-2"],
  "xxl-3": ["gap-xxl-3", "row-gap-xxl-3", "column-gap-xxl-3"],
  "xxl-4": ["gap-xxl-4", "row-gap-xxl-4", "column-gap-xxl-4"],
  "xxl-5": ["gap-xxl-5", "row-gap-xxl-5", "column-gap-xxl-5"],
} as const;

export const getGapClasses = (gap?: Gap | Gap[], index = 0) => {
  return `${
    Array.isArray(gap)
      ? gap.map((gap) => gapsClassesMap[gap]?.[index]).join(" ")
      : gapsClassesMap[gap!]?.[index]
  }`;
};

export const getRowGapClasses = (rowGap?: Gap | Gap[]) => {
  return getGapClasses(rowGap, 2);
};

export const getColumnGapClasses = (columnGap?: Gap | Gap[]) => {
  return getGapClasses(columnGap, 2);
};

export const getStackClasses = <OrientationType extends Orientation>(
  props: StackProps<OrientationType>
) => {
  return `${baseStackClasses} ${
    orientationsClassesMap[props.orientation || "vertical"]
  } ${"cols" in props && getColsClasses(props.cols)} ${getGapClasses(
    props.gap
  )} ${getRowGapClasses(props.rowGap)} ${getColumnGapClasses(
    props.columnGap
  )} ${getAlignItemsClasses(props.alignItems)} ${getJustifyContentClasses(
    props.justifyContent
  )} ${props.className}`;
};

export type Orientation = keyof typeof orientationsClassesMap;
export type Gap = keyof typeof gapsClassesMap;

export type StackProps<OrientationType extends Orientation> =
  JSX.IntrinsicElements["div"] & {
    orientation?: OrientationType;
    gap?: Gap | Gap[];
    rowGap?: Gap | Gap[];
    columnGap?: Gap | Gap[];
    alignItems?: AlignItems | AlignItems[];
    justifyContent?: JustifyContent | JustifyContent[];
    children: React.ReactNode;
  } & (OrientationType extends "vertical"
      ? {
          orientation?: OrientationType;
          cols?: Cols | Cols[];
        }
      : {
          orientation?: OrientationType;
        });

export const Stack = <OrientationType extends Orientation>(
  props: StackProps<OrientationType>
) => {
  const domProps = { ...props };
  delete domProps.orientation;
  delete domProps.gap;
  delete domProps.rowGap;
  delete domProps.columnGap;
  delete domProps.alignItems;
  delete domProps.justifyContent;
  "cols" in domProps && delete domProps.cols;

  return <Box as="div" {...domProps} className={getStackClasses(props)} />;
};

export const baseStackItemClasses = "" as const;

export const getStackItemClasses = (props: StackItemProps) => {
  return `${baseStackItemClasses} ${getColsClasses(
    props.cols
  )} ${getMarginStartClasses(props.marginStart)} ${getMarginEndClasses(
    props.marginEnd
  )} ${props.className}`;
};

export type StackItemProps = JSX.IntrinsicElements["div"] & {
  cols: Cols | Cols[];
  marginStart?: Margin | Margin[];
  marginEnd?: Margin | Margin[];
};

export const StackItem = (props: StackItemProps) => {
  const domProps = { ...props } as Partial<StackItemProps>;
  delete domProps.cols;
  delete domProps.marginStart;
  delete domProps.marginEnd;

  return <Box as="div" {...domProps} className={getStackItemClasses(props)} />;
};

Stack.Item = StackItem;

export default Stack;

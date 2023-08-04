import Box from "./Box";
import Container, { ContainerProps } from "./Container";

export type GridProps = ContainerProps & {
  children: React.ReactNode;
};

export const Grid = (props: GridProps) => {
  return <Container {...props} />;
};

export const rowBaseClasses = "row";

export const rowColsClassesMap = {
  "1": "row-cols-1",
  "2": "row-cols-2",
  "3": "row-cols-3",
  "4": "row-cols-4",
  "5": "row-cols-5",
  "6": "row-cols-6",
  auto: "row-cols-auto",
  "xs-1": "row-cols-xs-1",
  "xs-2": "row-cols-xs-2",
  "xs-3": "row-cols-xs-3",
  "xs-4": "row-cols-xs-4",
  "xs-5": "row-cols-xs-5",
  "xs-6": "row-cols-xs-6",
  "xs-auto": "row-cols-xs-auto",
  "sm-1": "row-cols-sm-1",
  "sm-2": "row-cols-sm-2",
  "sm-3": "row-cols-sm-3",
  "sm-4": "row-cols-sm-4",
  "sm-5": "row-cols-sm-5",
  "sm-6": "row-cols-sm-6",
  "sm-auto": "row-cols-sm-auto",
  "md-1": "row-cols-md-1",
  "md-2": "row-cols-md-2",
  "md-3": "row-cols-md-3",
  "md-4": "row-cols-md-4",
  "md-5": "row-cols-md-5",
  "md-6": "row-cols-md-6",
  "md-auto": "row-cols-md-auto",
  "lg-1": "row-cols-lg-1",
  "lg-2": "row-cols-lg-2",
  "lg-3": "row-cols-lg-3",
  "lg-4": "row-cols-lg-4",
  "lg-5": "row-cols-lg-5",
  "lg-6": "row-cols-lg-6",
  "lg-auto": "row-cols-lg-auto",
  "xl-1": "row-cols-xl-1",
  "xl-2": "row-cols-xl-2",
  "xl-3": "row-cols-xl-3",
  "xl-4": "row-cols-xl-4",
  "xl-5": "row-cols-xl-5",
  "xl-6": "row-cols-xl-6",
  "xl-auto": "row-cols-xl-auto",
  "xxl-1": "row-cols-xxl-1",
  "xxl-2": "row-cols-xxl-2",
  "xxl-3": "row-cols-xxl-3",
  "xxl-4": "row-cols-xxl-4",
  "xxl-5": "row-cols-xxl-5",
  "xxl-6": "row-cols-xxl-6",
  "xxl-auto": "row-cols-xxl-auto",
} as const;

const guttersClassesMap = {
  "0": ["g-0", "gx-0", "gy-0"],
  "1": ["g-1", "gx-1", "gy-1"],
  "2": ["g-2", "gx-2", "gy-2"],
  "3": ["g-3", "gx-3", "gy-3"],
  "4": ["g-4", "gx-4", "gy-4"],
  "5": ["g-5", "gx-5", "gy-5"],
  "sm-0": ["g-sm-0", "gx-sm-0", "gy-sm-0"],
  "sm-1": ["g-sm-1", "gx-sm-1", "gy-sm-1"],
  "sm-2": ["g-sm-2", "gx-sm-2", "gy-sm-2"],
  "sm-3": ["g-sm-3", "gx-sm-3", "gy-sm-3"],
  "sm-4": ["g-sm-4", "gx-sm-4", "gy-sm-4"],
  "sm-5": ["g-sm-5", "gx-sm-5", "gy-sm-5"],
  "md-0": ["g-md-0", "gx-md-0", "gy-md-0"],
  "md-1": ["g-md-1", "gx-md-1", "gy-md-1"],
  "md-2": ["g-md-2", "gx-md-2", "gy-md-2"],
  "md-3": ["g-md-3", "gx-md-3", "gy-md-3"],
  "md-4": ["g-md-4", "gx-md-4", "gy-md-4"],
  "md-5": ["g-lg-5", "gx-lg-5", "gy-lg-5"],
  "lg-0": ["g-lg-0", "gx-lg-0", "gy-lg-0"],
  "lg-1": ["g-lg-1", "gx-lg-1", "gy-lg-1"],
  "lg-2": ["g-lg-2", "gx-lg-2", "gy-lg-2"],
  "lg-3": ["g-lg-3", "gx-lg-3", "gy-lg-3"],
  "lg-4": ["g-lg-4", "gx-lg-4", "gy-lg-4"],
  "lg-5": ["g-lg-5", "gx-lg-5", "gy-lg-5"],
  "xl-0": ["g-xl-0", "gx-xl-0", "gy-xl-0"],
  "xl-1": ["g-xl-1", "gx-xl-1", "gy-xl-1"],
  "xl-2": ["g-xl-2", "gx-xl-2", "gy-xl-2"],
  "xl-3": ["g-xl-3", "gx-xl-3", "gy-xl-3"],
  "xl-4": ["g-xl-4", "gx-xl-4", "gy-xl-4"],
  "xl-5": ["g-xl-5", "gx-xl-5", "gy-xl-5"],
  "xxl-0": ["g-xxl-0", "gx-xxl-0", "gy-xxl-0"],
  "xxl-1": ["g-xxl-1", "gx-xxl-1", "gy-xxl-1"],
  "xxl-2": ["g-xxl-2", "gx-xxl-2", "gy-xxl-2"],
  "xxl-3": ["g-xxl-3", "gx-xxl-3", "gy-xxl-3"],
  "xxl-4": ["g-xxl-4", "gx-xxl-4", "gy-xxl-4"],
  "xxl-5": ["g-xxl-5", "gx-xxl-5", "gy-xxl-5"],
} as const;

export const alignItemsClassesMap = {
  baseline: "align-items-baseline",
  center: "align-items-center",
  end: "align-items-end",
  start: "align-items-start",
  stretch: "align-items-stretch",
  "sm-baseline": "align-items-sm-baseline",
  "sm-center": "align-items-sm-center",
  "sm-end": "align-items-sm-end",
  "sm-start": "align-items-sm-start",
  "sm-stretch": "align-items-sm-stretch",
  "md-baseline": "align-items-md-baseline",
  "md-center": "align-items-md-center",
  "md-end": "align-items-md-end",
  "md-start": "align-items-md-start",
  "md-stretch": "align-items-md-stretch",
  "lg-baseline": "align-items-lg-baseline",
  "lg-center": "align-items-lg-center",
  "lg-end": "align-items-lg-end",
  "lg-start": "align-items-lg-start",
  "lg-stretch": "align-items-lg-stretch",
  "xl-baseline": "align-items-xl-baseline",
  "xl-center": "align-items-xl-center",
  "xl-end": "align-items-xl-end",
  "xl-start": "align-items-xl-start",
  "xl-stretch": "align-items-xl-stretch",
  "xxl-baseline": "align-items-xxl-baseline",
  "xxl-center": "align-items-xxl-center",
  "xxl-end": "align-items-xxl-end",
  "xxl-start": "align-items-xxl-start",
  "xxl-stretch": "align-items-xxl-stretch",
} as const;

export const justifyContentsClassesMap = {
  around: "justify-content-around",
  between: "justify-content-between",
  center: "justify-content-center",
  end: "justify-content-end",
  evenly: "justify-content-evenly",
  start: "justify-content-start",
  "sm-around": "justify-content-sm-around",
  "sm-between": "justify-content-sm-between",
  "sm-center": "justify-content-sm-center",
  "sm-end": "justify-content-sm-end",
  "sm-evenly": "justify-content-sm-evenly",
  "sm-start": "justify-content-sm-start",
  "md-around": "justify-content-md-around",
  "md-between": "justify-content-md-between",
  "md-center": "justify-content-md-center",
  "md-end": "justify-content-md-end",
  "md-evenly": "justify-content-md-evenly",
  "md-start": "justify-content-md-start",
  "lg-around": "justify-content-lg-around",
  "lg-between": "justify-content-lg-between",
  "lg-center": "justify-content-lg-center",
  "lg-end": "justify-content-lg-end",
  "lg-evenly": "justify-content-lg-evenly",
  "lg-start": "justify-content-lg-start",
  "xl-around": "justify-content-xl-around",
  "xl-between": "justify-content-xl-between",
  "xl-center": "justify-content-xl-center",
  "xl-end": "justify-content-xl-end",
  "xl-evenly": "justify-content-xl-evenly",
  "xl-start": "justify-content-xl-start",
  "xxl-around": "justify-content-xxl-around",
  "xxl-between": "justify-content-xxl-between",
  "xxl-center": "justify-content-xxl-center",
  "xxl-end": "justify-content-xxl-end",
  "xxl-evenly": "justify-content-xxl-evenly",
  "xxl-start": "justify-content-xxl-start",
} as const;

export const getAlignItemsClasses = (
  alignItems?: AlignItems | AlignItems[]
) => {
  return `${
    Array.isArray(alignItems)
      ? alignItems.map((alignItem) => alignItemsClassesMap[alignItem]).join(" ")
      : alignItemsClassesMap[alignItems!]
  }`;
};

export const getJustifyContentClasses = (
  justifyContent?: JustifyContent | JustifyContent[]
) => {
  return `${
    Array.isArray(justifyContent)
      ? justifyContent
          .map((justifyContent) => justifyContentsClassesMap[justifyContent])
          .join(" ")
      : justifyContentsClassesMap[justifyContent!]
  }`;
};

export const getRowClasses = (props: GridRowProps) => {
  return `${rowBaseClasses} ${
    Array.isArray(props.rowCols)
      ? props.rowCols.map((rowCol) => rowColsClassesMap[rowCol]).join(" ")
      : rowColsClassesMap[props.rowCols!]
  } ${
    Array.isArray(props.gutters)
      ? props.gutters.map((gutter) => guttersClassesMap[gutter][0]).join(" ")
      : guttersClassesMap[props.gutters!]?.[0]
  } ${
    Array.isArray(props.gutterXs)
      ? props.gutterXs.map((gutter) => guttersClassesMap[gutter][1]).join(" ")
      : guttersClassesMap[props.gutterXs!]?.[1]
  } ${
    Array.isArray(props.gutterYs)
      ? props.gutterYs.map((gutter) => guttersClassesMap[gutter][2]).join(" ")
      : guttersClassesMap[props.gutterYs!]?.[2]
  } ${getAlignItemsClasses(props.alignItems)} ${getJustifyContentClasses(
    props.justifyContent
  )}
  ${props.className}`;
};

export type RowCols = keyof typeof rowColsClassesMap;
export type Gutter = keyof typeof guttersClassesMap;
export type AlignItems = keyof typeof alignItemsClassesMap;
export type JustifyContent = keyof typeof justifyContentsClassesMap;

export type GridRowProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
  rowCols?: RowCols | RowCols[];
  gutterXs?: Gutter | Gutter[];
  gutterYs?: Gutter | Gutter[];
  gutters?: Gutter | Gutter[];
  alignItems?: AlignItems | AlignItems[];
  justifyContent?: JustifyContent | JustifyContent[];
};

export const GridRow = (props: GridRowProps) => {
  const domProps = { ...props };
  delete domProps.rowCols;
  delete domProps.gutterXs;
  delete domProps.gutterYs;
  delete domProps.gutters;
  delete domProps.alignItems;
  delete domProps.justifyContent;

  return <Box as="div" {...domProps} className={getRowClasses(props)} />;
};

export const colBaseClasses = "col";

export const basicColsClassesMap = {
  "1": "col-1",
  "2": "col-2",
  "3": "col-3",
  "4": "col-4",
  "5": "col-5",
  "6": "col-6",
  "7": "col-7",
  "8": "col-8",
  "9": "col-9",
  "10": "col-10",
  "11": "col-11",
  "12": "col-12",
} as const;

export const colsClassesMap = {
  ...basicColsClassesMap,
  auto: "col-auto",
  "sm-1": "col-sm-1",
  "sm-2": "col-sm-2",
  "sm-3": "col-sm-3",
  "sm-4": "col-sm-4",
  "sm-5": "col-sm-5",
  "sm-6": "col-sm-6",
  "sm-7": "col-sm-7",
  "sm-8": "col-sm-8",
  "sm-9": "col-sm-9",
  "sm-10": "col-sm-10",
  "sm-11": "col-sm-11",
  "sm-12": "col-sm-12",
  "sm-auto": "col-sm-auto",
  "md-1": "col-md-1",
  "md-2": "col-md-2",
  "md-3": "col-md-3",
  "md-4": "col-md-4",
  "md-5": "col-md-5",
  "md-6": "col-md-6",
  "md-7": "col-md-7",
  "md-8": "col-md-8",
  "md-9": "col-md-9",
  "md-10": "col-md-10",
  "md-11": "col-md-11",
  "md-12": "col-md-12",
  "md-auto": "col-md-auto",
  "lg-1": "col-lg-1",
  "lg-2": "col-lg-2",
  "lg-3": "col-lg-3",
  "lg-4": "col-lg-4",
  "lg-5": "col-lg-5",
  "lg-6": "col-lg-6",
  "lg-7": "col-lg-7",
  "lg-8": "col-lg-8",
  "lg-9": "col-lg-9",
  "lg-10": "col-lg-10",
  "lg-11": "col-lg-11",
  "lg-12": "col-lg-12",
  "lg-auto": "col-lg-auto",
  "xl-1": "col-xl-1",
  "xl-2": "col-xl-2",
  "xl-3": "col-xl-3",
  "xl-4": "col-xl-4",
  "xl-5": "col-xl-5",
  "xl-6": "col-xl-6",
  "xl-7": "col-xl-7",
  "xl-8": "col-xl-8",
  "xl-9": "col-xl-9",
  "xl-10": "col-xl-10",
  "xl-11": "col-xl-11",
  "xl-12": "col-xl-12",
  "xl-auto": "col-xl-auto",
  "xxl-1": "col-xxl-1",
  "xxl-2": "col-xxl-2",
  "xxl-3": "col-xxl-3",
  "xxl-4": "col-xxl-4",
  "xxl-5": "col-xxl-5",
  "xxl-6": "col-xxl-6",
  "xxl-7": "col-xxl-7",
  "xxl-8": "col-xxl-8",
  "xxl-9": "col-xxl-9",
  "xxl-10": "col-xxl-10",
  "xxl-11": "col-xxl-11",
  "xxl-12": "col-xxl-12",
  "xxl-auto": "col-xxl-auto",
} as const;

export const alignSelfsClassesMap = {
  auto: "align-self-auto",
  baseline: "align-self-baseline",
  center: "align-self-center",
  start: "align-self-start",
  stretch: "align-self-stretch",
  "sm-auto": "align-self-sm-auto",
  "sm-baseline": "align-self-sm-baseline",
  "sm-center": "align-self-sm-center",
  "sm-start": "align-self-sm-start",
  "sm-stretch": "align-self-sm-stretch",
  "md-auto": "align-self-md-auto",
  "md-baseline": "align-self-md-baseline",
  "md-center": "align-self-md-center",
  "md-start": "align-self-md-start",
  "md-stretch": "align-self-md-stretch",
  "lg-auto": "align-self-lg-auto",
  "lg-baseline": "align-self-lg-baseline",
  "lg-center": "align-self-lg-center",
  "lg-start": "align-self-lg-start",
  "lg-stretch": "align-self-lg-stretch",
  "xl-auto": "align-self-xl-auto",
  "xl-baseline": "align-self-xl-baseline",
  "xl-center": "align-self-xl-center",
  "xl-start": "align-self-xl-start",
  "xl-stretch": "align-self-xl-stretch",
  "xxl-auto": "align-self-xxl-auto",
  "xxl-baseline": "align-self-xxl-baseline",
  "xxl-center": "align-self-xxl-center",
  "xxl-start": "align-self-xxl-start",
  "xxl-stretch": "align-self-xxl-stretch",
} as const;

export const ordersClassesMap = {
  "0": "order-0",
  "1": "order-1",
  "2": "order-2",
  "3": "order-3",
  "4": "order-4",
  "5": "order-5",
  first: "order-first",
  last: "order-last",
  "sm-0": "order-sm-0",
  "sm-1": "order-sm-1",
  "sm-2": "order-sm-2",
  "sm-3": "order-sm-3",
  "sm-4": "order-sm-4",
  "sm-5": "order-sm-5",
  "sm-first": "order-sm-first",
  "sm-last": "order-sm-last",
  "md-0": "order-md-0",
  "md-1": "order-md-1",
  "md-2": "order-md-2",
  "md-3": "order-md-3",
  "md-4": "order-md-4",
  "md-5": "order-md-5",
  "md-first": "order-md-first",
  "md-last": "order-md-last",
  "lg-0": "order-lg-0",
  "lg-1": "order-lg-1",
  "lg-2": "order-lg-2",
  "lg-3": "order-lg-3",
  "lg-4": "order-lg-4",
  "lg-5": "order-lg-5",
  "lg-first": "order-lg-first",
  "lg-last": "order-lg-last",
  "xl-0": "order-xl-0",
  "xl-1": "order-xl-1",
  "xl-2": "order-xl-2",
  "xl-3": "order-xl-3",
  "xl-4": "order-xl-4",
  "xl-5": "order-xl-5",
  "xl-first": "order-xl-first",
  "xl-last": "order-xl-last",
  "xxl-0": "order-xxl-0",
  "xxl-1": "order-xxl-1",
  "xxl-2": "order-xxl-2",
  "xxl-3": "order-xxl-3",
  "xxl-4": "order-xxl-4",
  "xxl-5": "order-xxl-5",
  "xxl-first": "order-xxl-first",
  "xxl-last": "order-xxl-last",
} as const;

const offsetsClassesMap = {
  "0": "offset-0",
  "1": "offset-1",
  "2": "offset-2",
  "3": "offset-3",
  "4": "offset-4",
  "5": "offset-5",
  "6": "offset-6",
  "7": "offset-7",
  "8": "offset-8",
  "9": "offset-9",
  "10": "offset-10",
  "11": "offset-11",
  "sm-0": "offset-sm-0",
  "sm-1": "offset-sm-1",
  "sm-2": "offset-sm-2",
  "sm-3": "offset-sm-3",
  "sm-4": "offset-sm-4",
  "sm-5": "offset-sm-5",
  "sm-6": "offset-sm-6",
  "sm-7": "offset-sm-7",
  "sm-8": "offset-sm-8",
  "sm-9": "offset-sm-9",
  "sm-10": "offset-sm-10",
  "sm-11": "offset-sm-11",
  "md-0": "offset-md-0",
  "md-1": "offset-md-1",
  "md-2": "offset-md-2",
  "md-3": "offset-md-3",
  "md-4": "offset-md-4",
  "md-5": "offset-md-5",
  "md-6": "offset-md-6",
  "md-7": "offset-md-7",
  "md-8": "offset-md-8",
  "md-9": "offset-md-9",
  "md-10": "offset-md-10",
  "md-11": "offset-md-11",
  "lg-0": "offset-lg-0",
  "lg-1": "offset-lg-1",
  "lg-2": "offset-lg-2",
  "lg-3": "offset-lg-3",
  "lg-4": "offset-lg-4",
  "lg-5": "offset-lg-5",
  "lg-6": "offset-lg-6",
  "lg-7": "offset-lg-7",
  "lg-8": "offset-lg-8",
  "lg-9": "offset-lg-9",
  "lg-10": "offset-lg-10",
  "lg-11": "offset-lg-11",
  "xl-0": "offset-xl-0",
  "xl-1": "offset-xl-1",
  "xl-2": "offset-xl-2",
  "xl-3": "offset-xl-3",
  "xl-4": "offset-xl-4",
  "xl-5": "offset-xl-5",
  "xl-6": "offset-xl-6",
  "xl-7": "offset-xl-7",
  "xl-8": "offset-xl-8",
  "xl-9": "offset-xl-9",
  "xl-10": "offset-xl-10",
  "xl-11": "offset-xl-11",
  "xxl-0": "offset-xxl-0",
  "xxl-1": "offset-xxl-1",
  "xxl-2": "offset-xxl-2",
  "xxl-3": "offset-xxl-3",
  "xxl-4": "offset-xxl-4",
  "xxl-5": "offset-xxl-5",
  "xxl-6": "offset-xxl-6",
  "xxl-7": "offset-xxl-7",
  "xxl-8": "offset-xxl-8",
  "xxl-9": "offset-xxl-9",
  "xxl-10": "offset-xxl-10",
  "xxl-11": "offset-xxl-11",
} as const;

export const marginsClassesMap = {
  auto: ["ms-auto", "me-auto"],
  "sm-auto": ["ms-sm-auto", "me-sm-auto"],
  "md-auto": ["ms-md-auto", "me-md-auto"],
  "lg-auto": ["ms-lg-auto", "me-lg-auto"],
  "xl-auto": ["ms-xl-auto", "me-xl-auto"],
  "xxl-auto": ["ms-xxl-auto", "me-xxl-auto"],
} as const;

export const getColsClasses = (cols?: Cols | Cols[]) => {
  return `${
    Array.isArray(cols)
      ? cols.map((col) => colsClassesMap[col]).join(" ")
      : colsClassesMap[cols!]
  }`;
};

export const getMarginStartClasses = (
  marginStart?: Margin | Margin[],
  index = 0
) => {
  return `${
    Array.isArray(marginStart)
      ? marginStart
          .map((marginStart) => marginsClassesMap[marginStart]?.[index])
          .join(" ")
      : marginsClassesMap[marginStart!]?.[index]
  }`;
};

export const getMarginEndClasses = (marginEnd?: Margin | Margin[]) => {
  return getMarginStartClasses(marginEnd, 1);
};

export const getColClasses = (props: GridColProps) => {
  return `${colBaseClasses} ${getColsClasses(props.cols)} ${
    Array.isArray(props.alignSelf)
      ? props.alignSelf
          .map((alignSelf) => alignSelfsClassesMap[alignSelf])
          .join(" ")
      : alignSelfsClassesMap[props.alignSelf!]
  } ${
    Array.isArray(props.order)
      ? props.order.map((order) => ordersClassesMap[order]).join(" ")
      : ordersClassesMap[props.order!]
  } ${
    Array.isArray(props.offset)
      ? props.offset.map((offset) => offsetsClassesMap[offset]).join(" ")
      : offsetsClassesMap[props.offset!]
  } ${getMarginStartClasses(props.marginStart)} ${getMarginEndClasses(
    props.marginEnd
  )} ${props.className}`;
};

export type Cols = keyof typeof colsClassesMap;
export type AlignSelf = keyof typeof alignSelfsClassesMap;
export type Order = keyof typeof ordersClassesMap;
export type Offset = keyof typeof offsetsClassesMap;
export type Margin = keyof typeof marginsClassesMap;

export type GridColProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
  cols?: Cols | Cols[];
  alignSelf?: AlignSelf | AlignSelf[];
  order?: Order | Order[];
  offset?: Offset | Offset[];
  marginStart?: Margin | Margin[];
  marginEnd?: Margin | Margin[];
};

export const GridCol = (props: GridColProps) => {
  const domProps = { ...props };
  delete domProps.cols;
  delete domProps.alignSelf;
  delete domProps.order;
  delete domProps.offset;
  delete domProps.marginStart;
  delete domProps.marginEnd;

  return <Box as="div" {...domProps} className={getColClasses(props)} />;
};

Grid.Row = GridRow;
Grid.Col = GridCol;

export default Grid;

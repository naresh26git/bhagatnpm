import Box from "./Box";

export const baseClasses = "" as const;

export const hiddenForsClassesMap = {
  auto: "d-none",
  sm: "d-sm-none",
  md: "d-md-none",
  lg: "d-lg-none",
  xl: "d-xl-none",
  xxl: "d-xxl-none",
  print: "d-print-none",
} as const;

export const shownForsClassesMap = {
  auto: "d-block",
  sm: "d-sm-block",
  md: "d-md-block",
  lg: "d-lg-block",
  xl: "d-xl-block",
  xxl: "d-xxl-block",
  print: "d-print-block",
};

export const getHiddenForClasses = (hiddenFor?: HiddenFor | HiddenFor[]) => {
  return `${
    Array.isArray(hiddenFor)
      ? hiddenFor.map((hiddenFor) => hiddenForsClassesMap[hiddenFor]).join(" ")
      : hiddenForsClassesMap[hiddenFor!]
  }`;
};

export const getShownForClasses = (shownFor?: ShownFor | ShownFor[]) => {
  return `${
    Array.isArray(shownFor)
      ? shownFor.map((shownFor) => shownForsClassesMap[shownFor]).join(" ")
      : shownForsClassesMap[shownFor!]
  }`;
};

export const getClasses = (props: HiddenProps) => {
  return `${baseClasses} ${getHiddenForClasses(
    props.hiddenFor
  )} ${getShownForClasses(props.shownFor)} ${props.className}`;
};

export type HiddenFor = keyof typeof hiddenForsClassesMap;
export type ShownFor = keyof typeof shownForsClassesMap;

export type HiddenProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
  hiddenFor?: HiddenFor | HiddenFor[];
  shownFor?: ShownFor | ShownFor[];
};

export const Hidden = (props: HiddenProps) => {
  const domProps = { ...props };
  delete domProps.hiddenFor;
  delete domProps.shownFor;

  return <Box as="div" {...domProps} className={getClasses(props)} />;
};

export default Hidden;

import React from "react";
import Box from "./Box";

export const floatBaseClasses = "" as const;

export const floatStartsClassesMap = {
  auto: "float-start",
  sm: "float-sm-start",
  md: "float-md-start",
  lg: "float-lg-start",
  xl: "float-xl-start",
  xxl: "float-xxl-start",
} as const;

export const floatEndsClassesMap = {
  auto: "float-end",
  sm: "float-sm-end",
  md: "float-md-end",
  lg: "float-lg-end",
  xl: "float-xl-end",
  xxl: "float-xxl-end",
} as const;

export const floatNonesClassesMap = {
  auto: "float-none",
  sm: "float-sm-none",
  md: "float-md-none",
  lg: "float-lg-none",
  xl: "float-xl-none",
  xxl: "float-xxl-none",
} as const;

export const getFloatClasses = (props: FloatProps) => {
  return `
  ${floatBaseClasses}
  ${
    Array.isArray(props.start)
      ? props.start.map((start) => floatStartsClassesMap[start]).join(" ")
      : props.start === true
      ? floatStartsClassesMap["auto"]
      : floatStartsClassesMap[props.start!]
  }
  ${
    Array.isArray(props.end)
      ? props.end.map((end) => floatEndsClassesMap[end]).join(" ")
      : props.end === true
      ? floatEndsClassesMap["auto"]
      : floatEndsClassesMap[props.end!]
  }
  ${
    Array.isArray(props.none)
      ? props.none.map((none) => floatNonesClassesMap[none]).join(" ")
      : props.none === true
      ? floatNonesClassesMap["auto"]
      : floatNonesClassesMap[props.none!]
  }
  ${props.className}`;
};

export type FloatStart = keyof typeof floatStartsClassesMap;
export type FloatEnd = keyof typeof floatEndsClassesMap;
export type FloatNone = keyof typeof floatNonesClassesMap;

export type FloatProps = JSX.IntrinsicElements["div"] & {
  start?: true | FloatStart | FloatStart[];
  end?: true | FloatStart | FloatStart[];
  none?: true | FloatStart | FloatStart[];
  children?: React.ReactNode;
};

export const Float = (props: FloatProps) => {
  const domProps = { ...props };
  delete domProps.start;
  delete domProps.end;
  delete domProps.none;

  return <Box as="div" {...domProps} className={getFloatClasses(props)} />;
};

export const floatClearfixBaseClasses = "clearfix" as const;

export const getFloatClearfixClasses = (props: FloatClearfixProps) => {
  return `${floatClearfixBaseClasses} ${props.className}`;
};

export type FloatClearfixProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
};

export const FloatClearfix = (props: FloatClearfixProps) => {
  const domProps = { ...props };

  return (
    <Box as="div" {...domProps} className={getFloatClearfixClasses(props)} />
  );
};

Float.Clearfix = FloatClearfix;

export default Float;

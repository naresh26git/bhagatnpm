import React from "react";
import { basicColsClassesMap } from "./Grid";

export const baseClasses = "" as const;

export const backgroundsClassesMap = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  success: "bg-success",
  danger: "bg-danger",
  warning: "bg-warning",
  info: "bg-info",
  light: "bg-light",
  dark: "bg-dark",
} as const;

export const animationsClassesMap = {
  none: "placeholder",
  wave: "placeholder-wave",
  glow: "placeholder-glow",
} as const;

export const sizeClassesMap = {
  large: "placeholder-lg",
  small: "placeholder-sm",
  "extra-small": "placeholder-xs",
} as const;

export const getClasses = <Key extends SkeletonAsKeys>(
  props: SkeletonProps<Key>
) => {
  return `${baseClasses} ${animationsClassesMap[props.animate || "none"]} ${
    backgroundsClassesMap[props.background!]
  } ${sizeClassesMap[props.size!]} ${basicColsClassesMap[props.cols!]} ${
    props.className
  } `;
};

export type SkeletonAsKeys = keyof JSX.IntrinsicElements;

export type SkeletonProps<Key extends SkeletonAsKeys> = {
  as?: Key;
} & JSX.IntrinsicElements[Key] & {
    animate?: keyof typeof animationsClassesMap;
    background?: keyof typeof backgroundsClassesMap;
    cols?: keyof typeof basicColsClassesMap;
    size?: keyof typeof sizeClassesMap;
  };

export const Skeleton = <Key extends SkeletonAsKeys>(
  props: SkeletonProps<Key>
) => {
  const Element = (props.as || "span") as React.ElementType;

  const elementProps = { ...props };
  delete elementProps.as;
  delete elementProps.size;

  return <Element {...elementProps} className={getClasses(props)} />;
};

export default Skeleton;

import React from "react";
import Box from "./Box";

export const baseClasses = "btn";

export const outlineVariantsClassesMap = {
  "outline-primary": "btn-outline-primary",
  "outline-secondary": "btn-outline-secondary",
  "outline-success": "btn-outline-success",
  "outline-danger": "btn-outline-danger",
  "outline-warning": "btn-outline-warning",
  "outline-info": "btn-outline-info",
  "outline-light": "btn-outline-light",
  "outline-dark": "btn-outline-dark",
} as const;

export const variantsClassesMap = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  success: "btn-success",
  danger: "btn-danger",
  warning: "btn-warning",
  info: "btn-info",
  light: "btn-light",
  dark: "btn-dark",
  link: "btn-link",
  ...outlineVariantsClassesMap,
} as const;

export const sizesClassesMap = {
  lg: "btn-lg",
  sm: "btn-sm",
} as const;

export const getClasses = (props: ButtonProps) => {
  return `${baseClasses} ${variantsClassesMap[props.variant!]} ${
    sizesClassesMap[props.size!]
  } ${props.className}`;
};

export type ButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: keyof typeof variantsClassesMap;
  size?: keyof typeof sizesClassesMap;
};

export const Button = (props: ButtonProps) => {
  const domProps = { ...props };
  delete domProps.size;
  delete domProps.variant;

  return <Box as="button" {...domProps} className={getClasses(props)} />;
};

export type ToggleButtonProps = ButtonProps &
  JSX.IntrinsicElements["label"] & {
    variant?: keyof typeof outlineVariantsClassesMap;
  };

export const ToggleButton = (props: ToggleButtonProps) => {
  const id = React.useId();

  const domProps = { ...props };
  delete domProps.size;
  delete domProps.variant;

  return (
    <>
      <Box
        as="input"
        type="checkbox"
        className="btn-check"
        id={id}
        autoComplete="off"
      ></Box>
      <Box
        as="label"
        className={getClasses({ variant: "outline-primary", ...props })}
        htmlFor={id}
        {...domProps}
      />
      <Box as="br" />
    </>
  );
};

Button.ToggleButton = ToggleButton;

export default Button;

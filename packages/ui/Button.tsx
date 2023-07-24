import Box from "./Box";

export const baseClasses = "btn";

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
  "outline-primary": "btn-outline-primary",
  "outline-secondary": "btn-outline-secondary",
  "outline-success": "btn-outline-success",
  "outline-danger": "btn-outline-danger",
  "outline-warning": "btn-outline-warning",
  "outline-info": "btn-outline-info",
  "outline-light": "btn-outline-light",
  "outline-dark": "btn-outline-dark",
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

export default Button;

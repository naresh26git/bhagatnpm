import Box from "./Box";

export const baseClasses = "" as const;

export const maxWidthsClassesMap = {
  sm: "container-sm",
  md: "container-md",
  lg: "container-lg",
  xl: "container-xl",
  xxl: "container-xxl",
  fluid: "container-fluid",
} as const;

export const getClasses = (props: ContainerProps) => {
  return `${baseClasses} ${
    maxWidthsClassesMap[props.maxWidth!] ?? "container"
  } ${props.className}`;
};

export type ContainerProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
  maxWidth?: keyof typeof maxWidthsClassesMap;
};

export const Container = (props: ContainerProps) => {
  const domProps = { ...props };
  delete domProps.maxWidth;

  return <Box as="div" {...domProps} className={getClasses(props)} />;
};

export default Container;

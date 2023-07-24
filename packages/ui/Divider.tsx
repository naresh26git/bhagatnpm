import Box from "./Box";

export const baseClasses = "" as const;

export const orientationsClassesMap = {
  horizontal: "w-100 border-bottom",
  vertical: "h-100 border-right",
} as const;

export const getClasses = (props: DividerProps) => {
  return `${orientationsClassesMap[props.orientation || "horizontal"]} ${
    props.className
  }`;
};

export type DividerProps = JSX.IntrinsicElements["div"] & {
  orientation?: keyof typeof orientationsClassesMap;
  children?: undefined;
};

// TODO: Use bootstrap hr and className="vr"
export const Divider = (props: DividerProps) => {
  const domProps = { ...props };
  delete domProps.orientation;

  return <Box as="div" {...domProps} className={getClasses(props)} />;
};

export default Divider;

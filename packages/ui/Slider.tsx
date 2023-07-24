import Box from "./Box";

export const baseClasses = "form-range" as const;

export const getClasses = (props: SliderProps) => {
  return `${baseClasses} ${props.className}`;
};

export type SliderProps = Omit<JSX.IntrinsicElements["input"], "type"> & {
  label?: string;
};

export const Slider = (props: SliderProps) => {
  const domProps = { ...props };
  delete domProps.label;

  return props.label ? (
    <>
      <Box as="label" htmlFor={props.label} className="form-label">
        {props.label}
      </Box>
      <Box
        as="input"
        {...domProps}
        type="range"
        className={getClasses(props)}
        id={props.id || props.label}
      />
    </>
  ) : (
    <Box as="input" {...domProps} type="range" className={getClasses(props)} />
  );
};

export default Slider;

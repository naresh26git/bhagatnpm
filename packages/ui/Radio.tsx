import React from "react";
import Box from "./Box";

const baseClasses = "form-check-input";

const getClasses = (props: CheckProps) => {
  return `${baseClasses} ${props.className}`;
};

export type RadioProps = Omit<JSX.IntrinsicElements["input"], "type"> & {
  label: React.ReactNode;
  id: React.ReactNode;
};

export const Radio = (props: RadioProps) => {
  const checkProps = { ...props };

  return checkProps.label ? (
    <Box as="div" className="form-check">
      <Check {...checkProps} />
      <Box as="label" className="form-check-label" htmlFor={props.id}>
        {props.label}
      </Box>
    </Box>
  ) : (
    <Check {...checkProps} />
  );
};

export type CheckProps = Omit<RadioProps, "label">;

export const Check = (props: CheckProps) => {
  const domProps = { ...props };
  return (
    <Box as="input" {...domProps} type="radio" className={getClasses(props)} />
  );
};

export default Radio;

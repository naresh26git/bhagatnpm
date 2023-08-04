import React from "react";
import Box from "./Box";

export const baseClasses = "form-control";

export const getClasses = (props: TextFieldProps) => {
  return `${baseClasses} ${props.className}`;
};

export type TextFieldProps = JSX.IntrinsicElements["input"] & {
  label?: React.ReactNode;
  type?: React.ReactNode;
};

export const TextField = (props: TextFieldProps) => {
  const domProps = { ...props };
  delete domProps.children;
  delete domProps.label;

  return (
    <Box as="div" className="mb-3">
      <Box
        as="label"
        className="form-control-label"
        htmlFor={props.id ?? "textfield"}
      >
        {props.label}
      </Box>
      <Box
        as="input"
        id={props.id ?? "textfield"}
        type={props.type}
        className={getClasses(props)}
        {...domProps}
      />
    </Box>
  );
};

export default TextField;

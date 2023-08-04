import React from "react";
import Box from "./Box";

const baseClasses = "form-check-input";

const getClasses = (props: CheckProps) => {
  return `${baseClasses} ${props.className}`;
};

export type SwitchProps = Omit<
  JSX.IntrinsicElements["input"],
  "type" | "role"
> & {
  label?: React.ReactNode;
};

export const Switch = (props: SwitchProps) => {
  const checkProps = { ...props };
  delete checkProps.label;

  return props.label ? (
    <Box as="div" className="form-check form-switch">
      <Check {...checkProps} />
      <Box
        as="label"
        className="form-check-label"
        htmlFor={props.id ?? "checkbox"}
      >
        {props.label}
      </Box>
    </Box>
  ) : (
    <Check {...checkProps} />
  );
};

export type CheckProps = Omit<SwitchProps, "label">;

export const Check = (props: CheckProps) => {
  const domProps = { ...props };

  return (
    <Box
      as="input"
      id="switch"
      {...domProps}
      type="checkbox"
      role="switch"
      className={getClasses(props)}
    />
  );
};

export default Switch;

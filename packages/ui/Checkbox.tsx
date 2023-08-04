import React from "react";
import Box from "./Box";

const baseClasses = "form-check-input";

const getClasses = (props: CheckProps) => {
  return `${baseClasses} ${props.className}`;
};

export type CheckboxProps = Omit<JSX.IntrinsicElements["input"], "type"> & {
  label?: React.ReactNode;
};

export const Checkbox = React.forwardRef<
  CheckboxIndeterminateHandle,
  CheckboxProps
>((props, checkRef) => {
  const checkProps = { ...props };
  delete checkProps.label;

  return props.label ? (
    <Box as="div" className="form-check">
      <Check {...checkProps} ref={checkRef} />
      <Box
        as="label"
        className="form-check-label"
        htmlFor={props.id ?? "checkbox"}
      >
        {props.label}
      </Box>
    </Box>
  ) : (
    <Check {...checkProps} ref={checkRef} />
  );
});

export type CheckboxIndeterminateHandle = {
  indeterminateOn: () => void;
  indeterminateOff: () => void;
};

export type CheckProps = Omit<CheckboxProps, "label">;

export const Check = React.forwardRef<CheckboxIndeterminateHandle, CheckProps>(
  (props, ref) => {
    const domRef = React.useRef<HTMLInputElement>(null);

    const domProps = { ...props };

    React.useImperativeHandle(
      ref,
      () => ({
        indeterminateOn: () => {
          if (domRef.current) {
            domRef.current.indeterminate = true;
          }
        },
        indeterminateOff: () => {
          if (domRef.current) {
            domRef.current.indeterminate = false;
          }
        },
      }),
      []
    );

    return (
      <Box.WithRef
        as="input"
        id="checkbox"
        {...domProps}
        ref={domRef}
        type="checkbox"
        className={getClasses(props)}
      />
    );
  }
);

export default Checkbox;

import React from "react";
import Box from "./Box";

export const baseClasses = "form-select";

export const getClasses = (props: SelectProps) => {
  return `${baseClasses}  ${props.className}`;
};

export type SelectProps = JSX.IntrinsicElements["select"] & {
  children: React.ReactNode;
  label?: React.ReactNode;
};

export const Select = (props: SelectProps) => {
  const domProps = { ...props };
  delete domProps.label;

  return props.label ? (
    <Box as="div">
      <Box
        as="label"
        className="form-check-label"
        htmlFor={props.id ?? "select"}
      >
        {props.label}
      </Box>
      <Box as="select" className={getClasses(props)} {...domProps} />
    </Box>
  ) : (
    <Box as="select" className={getClasses(props)} {...domProps} />
  );
};

export const selectOptionBaseClasses = "";

export const getSelectOptionClasses = (props: SelectOptionProps) => {
  return `${selectOptionBaseClasses} ${props.className}`;
};

export type SelectOptionProps = JSX.IntrinsicElements["option"] & {};

export const SelectOption = (props: SelectOptionProps) => {
  return (
    <Box as="option" className={getSelectOptionClasses(props)} {...props} />
  );
};

Select.Option = SelectOption;

export default Select;

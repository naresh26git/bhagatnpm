import React from "react";
import Box from "./Box";

export const baseClasses = "alert alert-dismissible fade show";

export const variantsClassesMap = {
  primary: "alert-primary",
  secondary: "alert-secondary",
  success: "alert-success",
  danger: "alert-danger",
  warning: "alert-warning",
  info: "alert-info",
  light: "alert-light",
  dark: "alert-dark",
} as const;

export const getClasses = (props: AlertProps) => {
  return `${baseClasses} ${variantsClassesMap[props.variant || "primary"]} ${
    props.className
  }`;
};

export type AlertProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
  variant?: keyof typeof variantsClassesMap;
};

export const Alert = (props: AlertProps) => {
  const domProps = { ...props };
  delete domProps.variant;

  return (
    <Box as="div" className={getClasses(props)} role="alert" {...domProps} />
  );
};

export const alertLinkBaseClasses = "alert-link";

export const getAlertLinkClasses = (props: AlertLinkProps) => {
  return `${alertLinkBaseClasses} ${props.className}`;
};

export type AlertLinkProps = JSX.IntrinsicElements["a"] & {};

export const AlertLink = (props: AlertLinkProps) => {
  return <Box as="a" className={getAlertLinkClasses(props)} {...props} />;
};

export const AlertHeadingBaseClasses = "alert-heading";

export const getAlertHeadingClasses = (props: AlertHeadingProps) => {
  return `${AlertHeadingBaseClasses} ${props.className}`;
};

export type AlertHeadingProps = JSX.IntrinsicElements["h4"] & {
  children: React.ReactNode;
};

export const AlertHeading = (props: AlertHeadingProps) => {
  return <Box as="h4" className={getAlertHeadingClasses(props)} {...props} />;
};

export const AlertCloseBaseClasses = "btn-close";

export const getAlertCloseClasses = (props: AlertCloseProps) => {
  return `${AlertCloseBaseClasses} ${props.className}`;
};

export type AlertCloseProps = JSX.IntrinsicElements["button"] & {};

export const AlertClose = (props: AlertCloseProps) => {
  return (
    <Box
      as="button"
      className={getAlertCloseClasses(props)}
      {...props}
      data-bs-dismiss="alert"
      aria-label="Close"
    />
  );
};

Alert.Link = AlertLink;
Alert.Heading = AlertHeading;
Alert.Close = AlertClose;

export default Alert;

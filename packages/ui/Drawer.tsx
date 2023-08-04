import React from "react";
import Box from "./Box";
import Button, { ButtonProps } from "./Button";
import { useDrawer } from "./hooks/UseDrawer";

export const baseClasses = "";

export const screensClassesMap = {
  normal: "offcanvas",
  sm: "offcanvas-sm",
  md: "offcanvas-md",
  lg: "offcanvas-lg",
  xl: "offcanvas-xl",
  xxl: "offcanvas-xxl",
} as const;

export const positionsClassesMap = {
  start: "offcanvas-start",
  end: "offcanvas-end",
  top: "offcanvas-top",
  bottom: "offcanvas-bottom",
} as const;

export const getClasses = (props: DrawerProps) => {
  return `${baseClasses} ${screensClassesMap[props.screen || "normal"]} ${
    positionsClassesMap[props.position || "start"]
  } ${props.className}`;
};

export type DrawerProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
  allowBodyScroll?: boolean;
  backdrop?: boolean | "static";
  screen?: keyof typeof screensClassesMap;
  position?: keyof typeof positionsClassesMap;
} & ReturnType<typeof useDrawer>;

export const Drawer = (props: DrawerProps) => {
  const domProps = { ...props };
  delete domProps.allowBodyScroll;
  delete domProps.backdrop;
  delete domProps.screen;
  delete domProps.position;

  return (
    <Box
      as="div"
      className={getClasses(props)}
      {...props}
      tabIndex={-1}
      aria-labelledby="offcanvasLabel"
      data-bs-backdrop={props.backdrop || true}
      data-bs-scroll={Boolean(props.allowBodyScroll)}
    />
  );
};

export const drawerCloseBaseClasses = "btn-close";

export const drawerCloseClasses = (props: DrawerCloseProps) => {
  return `${drawerCloseBaseClasses} ${props.className}`;
};

export type DrawerCloseProps = JSX.IntrinsicElements["button"] & {};

export const DrawerClose = (props: DrawerCloseProps) => {
  return (
    <Box
      as="button"
      className={drawerCloseClasses(props)}
      {...props}
      data-bs-dismiss="offcanvas"
      aria-label="Close"
    />
  );
};

export type DrawerToggleButtonProps = ButtonProps &
  ReturnType<typeof useDrawer>;

export const DrawerToggleButton = (props: DrawerToggleButtonProps) => {
  const { id, ...restOfProps } = props;

  return (
    <Button
      {...restOfProps}
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target={`#${id}`}
      aria-controls="offcanvasExample"
    />
  );
};

export const drawerHeaderBaseClasses = "offcanvas-header";

export const getDrawerHeaderClasses = (props: DrawerHeaderProps) => {
  return `${drawerHeaderBaseClasses} ${props.className}`;
};

export type DrawerHeaderProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
};

export const DrawerHeader = (props: DrawerHeaderProps) => {
  return <Box as="div" className={getDrawerHeaderClasses(props)} {...props} />;
};

export const DrawerTitleBaseClasses = "offcanvas-title";

export const getDrawerTitleClasses = (props: DrawerTitleProps) => {
  return `${DrawerTitleBaseClasses} ${props.className}`;
};

export type DrawerTitleProps = JSX.IntrinsicElements["h5"] & {
  children: React.ReactNode;
};

export const DrawerTitle = (props: DrawerTitleProps) => {
  return (
    <Box
      as="h5"
      className={getDrawerTitleClasses(props)}
      {...props}
      id="offcanvasLabel"
    />
  );
};

export const drawerBodyBaseClasses = "offcanvas-body";

export const getDrawerBodyClasses = (props: DrawerBodyProps) => {
  return `${drawerBodyBaseClasses} ${props.className}`;
};

export type DrawerBodyProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
};

export const DrawerBody = (props: DrawerBodyProps) => {
  return <Box as="div" className={getDrawerBodyClasses(props)} {...props} />;
};

Drawer.Header = DrawerHeader;
Drawer.Title = DrawerTitle;
Drawer.Body = DrawerBody;
Drawer.Close = DrawerClose;
Drawer.ToggleButton = DrawerToggleButton;

export default Drawer;

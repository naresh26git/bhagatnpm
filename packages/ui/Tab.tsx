import React from "react";
import Box from "./Box";

export const baseClasses = "nav nav-tabs";

export const getClasses = (props: TabProps) => {
  return `${baseClasses}  ${props.className}`;
};

export type TabProps = JSX.IntrinsicElements["ul"] & {
  children: React.ReactNode;
};

export const Tab = (props: TabProps) => {
  const domProps = { ...props };

  return (
    <Box as="ul" className={getClasses(props)} {...domProps} role="tablist" />
  );
};

export const tabPillsBaseClasses = "nav nav-pills";

export const getTabPillsClasses = (props: TabPillsProps) => {
  return `${tabPillsBaseClasses}  ${props.className}`;
};

export type TabPillsProps = JSX.IntrinsicElements["ul"] & {
  children: React.ReactNode;
};

export const TabPills = (props: TabPillsProps) => {
  const domProps = { ...props };

  return <Box as="ul" className={getClasses(props)} {...domProps} />;
};

export const tabUnderlinedBaseClasses = "nav nav-underlined";

export const getTabUnderlinedClasses = (props: TabUnderlinedProps) => {
  return `${tabUnderlinedBaseClasses}  ${props.className}`;
};

export type TabUnderlinedProps = JSX.IntrinsicElements["ul"] & {
  children: React.ReactNode;
};

export const TabUnderlined = (props: TabUnderlinedProps) => {
  const domProps = { ...props };

  return <Box as="ul" className={getClasses(props)} {...domProps} />;
};

export const tabItemBaseClasses = "nav-item";

export const getTabItemClasses = (props: TabItemProps) => {
  return `${tabItemBaseClasses}  ${props.className}`;
};

export type TabItemProps = JSX.IntrinsicElements["li"] & {
  children: React.ReactNode;
};

export const TabItem = (props: TabItemProps) => {
  const domProps = { ...props };

  return (
    <Box
      as="li"
      className={getTabItemClasses(props)}
      {...domProps}
      role="presentation"
    />
  );
};

export const tabLinkBaseClasses = "nav-link";

export const getTabLinkClasses = (props: TabLinkProps) => {
  return `${tabLinkBaseClasses}  ${props.className}`;
};

export type TabLinkProps = JSX.IntrinsicElements["a"] & {
  children: React.ReactNode;
  id: string;
};

export const TabLink = (props: TabLinkProps) => {
  const { id, ...restOfProps } = props;

  return (
    <Box
      as="a"
      className={getTabLinkClasses(props)}
      {...restOfProps}
      role="tab"
      data-bs-toggle="tab"
      data-bs-target={`#${id}`}
    />
  );
};

export const tabButtonBaseClasses = "nav-link";

export const getTabButtonClasses = (props: TabButtonProps) => {
  const className = `${tabButtonBaseClasses} ${props.className}`;
  console.log({ className, tabButtonBaseClasses, props });

  return className;
};

export type TabButtonProps = JSX.IntrinsicElements["button"] & {
  children: React.ReactNode;
  id: string;
};

export const TabButton = (props: TabButtonProps) => {
  const { id, ...restOfProps } = props;

  return (
    <Box
      as="button"
      className={getTabButtonClasses(props)}
      {...restOfProps}
      id={`${id}-tab`}
      data-bs-toggle="tab"
      data-bs-target={`#${id}-tab-pane`}
      type="button"
      role="tab"
    />
  );
};

export const tabContentBaseClasses = "tab-content";

export const getTabContentClasses = (props: TabContentProps) => {
  return `${tabContentBaseClasses}  ${props.className}`;
};

export type TabContentProps = JSX.IntrinsicElements["div"] & {};

export const TabContent = (props: TabContentProps) => {
  const domProps = { ...props };
  return <Box as="div" className={getTabContentClasses(props)} {...domProps} />;
};

export const tabPaneBaseClasses = "tab-pane fade";

export const getTabPaneClasses = (props: TabPaneProps) => {
  return `${tabPaneBaseClasses} ${props.className}`;
};

export type TabPaneProps = JSX.IntrinsicElements["div"] & {
  id: string;
};

export const TabPane = (props: TabPaneProps) => {
  const { id, ...restOfProps } = props;

  return (
    <Box
      as="div"
      className={getTabPaneClasses(props)}
      {...restOfProps}
      id={`${id}-tab-pane`}
      role="tabpanel"
      tabIndex={0}
    />
  );
};

Tab.Item = TabItem;
Tab.Link = TabLink;
Tab.Button = TabButton;
Tab.Pills = TabPills;
Tab.Underlined = TabUnderlined;
Tab.Content = TabContent;
Tab.Pane = TabPane;

export default Tab;

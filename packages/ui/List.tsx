import React from "react";
import Box from "./Box";

export const baseClasses = "list-group ";

export const getClasses = (props: ListProps) => {
  return `${baseClasses}  ${props.className}`;
};

export type ListProps = JSX.IntrinsicElements["ul"] & {
  children: React.ReactNode;
};

export const List = (props: ListProps) => {
  const domProps = { ...props };

  return <Box as="ul" className={getClasses(props)} {...domProps} />;
};

export const horizontalListBaseClasses = "list-group list-group-horizontal";

export const getHorizontalListClasses = (props: HorizontalListProps) => {
  return `${horizontalListBaseClasses}  ${props.className}`;
};

export type HorizontalListProps = JSX.IntrinsicElements["ul"] & {
  children: React.ReactNode;
};

export const HorizontalList = (props: HorizontalListProps) => {
  const domProps = { ...props };

  return (
    <Box as="ul" className={getHorizontalListClasses(props)} {...domProps} />
  );
};

export const numberedListBaseClasses = "list-group list-group-numbered";

export const getNumberedListClasses = (props: NumberedListProps) => {
  return `${numberedListBaseClasses}  ${props.className}`;
};

export type NumberedListProps = JSX.IntrinsicElements["ol"] & {
  children: React.ReactNode;
};

export const NumberedList = (props: NumberedListProps) => {
  const domProps = { ...props };

  return (
    <Box as="ol" className={getNumberedListClasses(props)} {...domProps} />
  );
};

export const listUnBorderedBaseClasses = "list-group list-group-flush";
export const getListUnBorderedClasses = (props: ListProps) => {
  return `${listUnBorderedBaseClasses}  ${props.className}`;
};
export const ListUnBordered = (props: ListProps) => {
  const domProps = { ...props };
  return (
    <Box as="ol" className={getListUnBorderedClasses(props)} {...domProps} />
  );
};
export const listItemBaseClasses = "list-group-item";

export const variantsClassesMap = {
  primary: "list-group-item-primary",
  secondary: "list-group-item-secondary",
  success: "list-group-item-success",
  danger: "list-group-item-danger",
  warning: "list-group-item-warning",
  info: "list-group-item-info",
  light: "list-group-item-light",
  dark: "list-group-item-dark",
} as const;

export const getListItemClasses = (props: ListItemProps) => {
  return `${listItemBaseClasses} ${variantsClassesMap[props.variant!]} ${
    props.className
  }`;
};

export type ListItemProps = JSX.IntrinsicElements["li"] & {
  variant?: keyof typeof variantsClassesMap;
};

export const ListItem = (props: ListItemProps) => {
  return <Box as="li" className={getListItemClasses(props)} {...props} />;
};

export const ListItemLinkBaseClasses = "list-group-item list-group-item-action";

export type ListItemLinkProps = JSX.IntrinsicElements["a"] & {
  variant?: keyof typeof variantsClassesMap;
};

export const getListItemLinkClasses = (props: ListItemLinkProps) => {
  return `${ListItemLinkBaseClasses} ${variantsClassesMap[props.variant!]} ${
    props.className
  }`;
};

export const ListItemLink = (props: ListItemLinkProps) => {
  return <Box as="a" className={getListItemLinkClasses(props)} {...props} />;
};

export const ListItemButtonBaseClasses =
  "list-group-item list-group-item-action";

export type ListItemButtonProps = JSX.IntrinsicElements["button"] & {
  variant?: keyof typeof variantsClassesMap;
};

export const getListItemButtonClasses = (props: ListItemButtonProps) => {
  return `${ListItemButtonBaseClasses} ${variantsClassesMap[props.variant!]} ${
    props.className
  }`;
};

export const ListItemButton = (props: ListItemButtonProps) => {
  return (
    <Box
      as="button"
      type="button"
      className={getListItemButtonClasses(props)}
      {...props}
    />
  );
};

List.Horizontal = HorizontalList;
List.UnBordered = ListUnBordered;
List.Numbered = NumberedList;
List.Item = ListItem;
ListItem.Link = ListItemLink;
ListItem.Button = ListItemButton;

export default List;

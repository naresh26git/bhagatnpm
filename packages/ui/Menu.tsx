import React from "react";
import Box from "./Box";
import Button, { ButtonProps } from "./Button";

export const MenuContext = React.createContext<MenuProps | null>(null);

export const useMenu = () => {
  const context = React.useContext(MenuContext);

  if (!context)
    throw new Error(
      "MenuContext is only accessible to the child components of the Menu component"
    );

  return {
    props: context,
  };
};

export type OptionAsKeys = "a" | "button" | "h6" | "hr";

export type OptionCommonType<Key extends OptionAsKeys> =
  JSX.IntrinsicElements[Key] & {
    as?: Key;
    id: string;
    label: React.ReactNode;
    icon?: React.ReactNode;
  };

export type Option<Key extends OptionAsKeys = "a"> = Key extends "a" | "button"
  ? OptionCommonType<Key> & {
      status?: keyof typeof menuDropdownItemStatusClassesMap;
    }
  : Key extends "hr"
  ? Partial<OptionCommonType<Key>>
  : Key extends OptionAsKeys
  ? OptionCommonType<Key>
  : OptionCommonType<"a">;

export type MenuProps = {
  trigger: React.ReactNode;
  dropdown: React.ReactNode;
  options: Option<OptionAsKeys>[];
  isSplitButton?: boolean;
};

export const Menu = (props: MenuProps) => {
  return (
    <MenuContext.Provider value={props}>
      {props.isSplitButton ? (
        <div className="btn-group">
          {props.trigger}

          {props.dropdown}
        </div>
      ) : (
        <>
          {props.trigger}

          {props.dropdown}
        </>
      )}
    </MenuContext.Provider>
  );
};

export const baseMenuTriggerClasses = "btn dropdown-toggle";

export const getMenuTriggerClasses = (props: MenuTriggerProps) => {
  return `${baseMenuTriggerClasses} ${props.className}`;
};

export type MenuTriggerProps = Partial<ButtonProps>;

export const MenuTrigger = (props: MenuTriggerProps) => {
  const menu = useMenu();
  const buttonProps = {
    ...props,
  };

  return (
    <Button
      {...buttonProps}
      type="button"
      className={getMenuTriggerClasses({
        ...props,
        className: `${
          menu.props.isSplitButton ? "dropdown-toggle-split" : ""
        } ${props.className}`,
      })}
      data-bs-toggle="dropdown"
      aria-expanded="false"
      tabIndex={0}
    />
  );
};

export const menuDropdownBaseClasses = "dropdown-menu" as const;

export const getMenuDropdownClasses = (props: MenuDropdownProps) => {
  return `${menuDropdownBaseClasses} ${props.className}`;
};

export type MenuDropdownProps = Omit<JSX.IntrinsicElements["ul"], "children">;

export const MenuDropdown = (props: MenuDropdownProps) => {
  const menu = useMenu();

  const domProps = { ...props };

  return (
    <Box as="ul" {...domProps} className={getMenuDropdownClasses(props)}>
      {menu.props.options.map((option) => (
        <MenuItem {...option} key={option.id} />
      ))}
    </Box>
  );
};

export const baseMenuDropdownItemClasses = "text-nowrap";

export const menuDropdownItemStatusClassesMap = {
  active: "active",
} as const;

export const menuDropdownItemVariantClassesMap = {
  a: "dropdown-item",
  button: "dropdown-item",
  h6: "dropdown-header",
  hr: "dropdown-divider",
} as const;

export const getMenuDropdownItemClasses = <Key extends OptionAsKeys>(
  props: Option<Key>
) => {
  return `${baseMenuDropdownItemClasses} ${
    menuDropdownItemVariantClassesMap[props.as || "a"]
  } ${
    menuDropdownItemStatusClassesMap[(props as Option<"a" | "button">).status!]
  } ${props.className}`;
};

const MenuItem = <Key extends OptionAsKeys>(props: Option<Key>) => {
  const elementProps = { ...props };
  delete elementProps.icon;
  delete elementProps.label;

  const Element = (props.as || "a") as React.ElementType;

  return (
    <Box as="li">
      {props.as === "hr" ? (
        <Element
          {...elementProps}
          className={getMenuDropdownItemClasses(props)}
        />
      ) : (
        <Element
          {...elementProps}
          className={getMenuDropdownItemClasses(props)}
          href="#"
        >
          {props.icon ? (
            <span style={{ marginRight: 16 }}>{props.icon}</span>
          ) : null}
          <span>{props.label}</span>
        </Element>
      )}
    </Box>
  );
};

Menu.Trigger = MenuTrigger;
Menu.Dropdown = MenuDropdown;

export default Menu;

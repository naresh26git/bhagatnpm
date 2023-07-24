import {
  NavbarContext,
  NavbarContextValue,
  useNavbarContext,
} from "./hooks/UseNavbar";
import Box from "./Box";
import Button, { ButtonProps } from "./Button";
import Link, { LinkProps } from "./Link";

export const navbarBaseClasses = "navbar text-bg-tertiary" as const;

export const expandsClassesMap = {
  sm: "navbar-expand-sm",
  md: "navbar-expand-md",
  lg: "navbar-expand-lg",
  xl: "navbar-expand-xl",
  xxl: "navbar-expand-xxl",
} as const;

export const positionsClassesMap = {
  top: "fixed-top",
  bottom: "fixed-bottom",
  "sticky-top": "sticky-top",
  "sticky-bottom": "sticky-bottom",
} as const;

export const getNavbarClasses = (props: NavbarProps) => {
  return `${navbarBaseClasses} ${expandsClassesMap[props.expanded!]} ${
    positionsClassesMap[props.position!]
  } ${props.className}`;
};

export type NavbarProps = JSX.IntrinsicElements["nav"] &
  NavbarContextValue & {
    children: React.ReactNode;
    expanded?: keyof typeof expandsClassesMap;
    position?: keyof typeof positionsClassesMap;
  };

export const Navbar = (props: NavbarProps) => {
  const domProps = { ...props } as Partial<NavbarProps>;
  delete domProps.id;
  delete domProps.expanded;
  delete domProps.position;

  return (
    <NavbarContext.Provider value={props}>
      <Box as="nav" {...domProps} className={getNavbarClasses(props)} />
    </NavbarContext.Provider>
  );
};

export const navbarBrandBaseClasses = "navbar-brand" as const;

export const getNavbarBrandClasses = <Component extends React.ElementType>(
  props: NavbarBrandProps<Component>
) => {
  return `${navbarBrandBaseClasses} ${props.className}`;
};

export type NavbarBrandProps<Component extends React.ElementType> =
  LinkProps<Component> & {
    children?: React.ReactNode;
  };

export const NavbarBrand = <Component extends React.ElementType>(
  props: NavbarBrandProps<Component>
) => {
  const linkProps = { ...props };

  return <Link {...linkProps} className={getNavbarBrandClasses(props)} />;
};

export const navbarTogglerBaseClasses = "navbar-toggler" as const;

export const getNavbarTogglerClasses = (props: NavbarTogglerProps) => {
  return `${navbarTogglerBaseClasses} ${props.className}`;
};

export type NavbarTogglerProps = ButtonProps & {
  children: React.ReactNode;
};

export const NavbarToggler = (props: NavbarTogglerProps) => {
  const { id } = useNavbarContext();

  const buttonProps = { ...props };

  return (
    <Button
      {...buttonProps}
      className={getNavbarTogglerClasses(props)}
      type="button"
      data-bs-toggle="collapse"
      data-bs-target={`#${id}`}
      aria-controls={id}
      aria-expanded="false"
      aria-label="Toggle navigation"
      id={undefined}
    />
  );
};

export const navbarCollapseBaseClasses = "collapse navbar-collapse" as const;

export const getNavbarCollapseClasses = (props: NavbarCollapseProps) => {
  return `${navbarCollapseBaseClasses} ${props.className}`;
};

export type NavbarCollapseProps = JSX.IntrinsicElements["div"] & {
  children: React.ReactNode;
};

export const NavbarCollapse = (props: NavbarCollapseProps) => {
  const { id } = useNavbarContext();

  const domProps = { ...props };

  return (
    <Box
      as="div"
      {...domProps}
      className={getNavbarCollapseClasses(props)}
      id={id}
    />
  );
};

export const navbarLinksBaseClasses = "navbar-nav" as const;

export const getNavbarLinksClasses = (props: NavbarLinksProps) => {
  return `${navbarLinksBaseClasses} ${props.className}`;
};

export type NavbarLinksProps = JSX.IntrinsicElements["ul"] & {
  children: React.ReactNode;
};

export const NavbarLinks = (props: NavbarLinksProps) => {
  const domProps = { ...props };

  return <Box as="ul" {...domProps} className={getNavbarLinksClasses(props)} />;
};

export const navbarLinkItemBaseClasses = "nav-item" as const;

export const getNavbarLinkItemClasses = (props: NavbarLinkItemProps) => {
  return `${navbarLinkItemBaseClasses} ${props.className}`;
};

export type NavbarLinkItemProps = JSX.IntrinsicElements["li"] & {
  children: React.ReactNode;
};

export const NavbarLinkItem = (props: NavbarLinkItemProps) => {
  const domProps = { ...props };

  return (
    <Box as="li" {...domProps} className={getNavbarLinkItemClasses(props)} />
  );
};

export const navbarLinkBaseClasses = "nav-link" as const;

export const getNavbarLinkClasses = <Component extends React.ElementType>(
  props: NavbarLinkProps<Component>
) => {
  return `${navbarLinkBaseClasses} ${props.className}`;
};

export type NavbarLinkProps<Component extends React.ElementType> =
  LinkProps<Component> & {
    children?: React.ReactNode;
  };

export const NavbarLink = <Component extends React.ElementType>(
  props: NavbarLinkProps<Component>
) => {
  const linkProps = { ...props };

  return <Link {...linkProps} className={getNavbarLinkClasses(props)} />;
};

Navbar.Brand = NavbarBrand;
Navbar.Toggler = NavbarToggler;
Navbar.Collapse = NavbarCollapse;
Navbar.Links = NavbarLinks;
Navbar.LinkItem = NavbarLinkItem;
Navbar.Link = NavbarLink;

export default Navbar;

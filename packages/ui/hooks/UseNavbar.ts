import React from "react";

export type NavbarContextValue = {
  id: string;
};

export const NavbarContext = React.createContext<NavbarContextValue | null>(
  null
);

export const useNavbarContext = () => {
  const context = React.useContext(NavbarContext);

  if (!context) throw new Error("");

  return context;
};

const _idNavbarPrefix = "navbar";
export const useNavbar = (): NavbarContextValue => {
  const id = React.useId();

  return {
    id: `${_idNavbarPrefix}-${id}`,
  };
};

import React from "react";

const _idDrawerPrefix = "drawer";
export const useDrawer = () => {
  const id = React.useId();

  return {
    id: `${_idDrawerPrefix}-${id}`,
  };
};
